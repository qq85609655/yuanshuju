if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.manager) {
	Dep.framework.editor.manager = {};
}
/**
 * 模型管理器，用于管理编辑器所有的模型对象（模型的构造函数）
 */
Dep.framework.editor.manager.ModelManager = Dep.framework.editor.manager.BaseManager
		.extend({
			/**
			 * 名称
			 */
			NAME: "Dep.framework.editor.manager.ModelManager",
			/**
			 * @property {String} DEFAULT_GROUP_NAME 默认图形分组名称
			 */
			DEFAULT_GROUP_NAME: "default",
			/**
			 * 初始化日志类
			 */
			logger : log4javascript
					.getDefaultLogger("Dep.framework.editor.manager.ModelManager"),
			/**
			 * @property {Dep.framework.editor.manager.BaseManager} groupManager 根据groupId属性进行业务图元分组管理。
			 */
			groupManager : null,

			/**
			 * 初始化模型管理器
			 */
			init : function() {
				var me = this;
				me._super();
				me.groupManager = new Dep.framework.editor.manager.BaseManager();

			},
			/**
			 * 初始化图元模型,由外部调用
			 * @param {Object[]} 图元配置集合
			 */
			initModels : function(figures) {
				var me = this, figureConfig;

				if (!figures) {
					// TODO 写日志,没有配置任何图元信息
					return;
				}
				// me.storeManager = new Dep.framework.editor.manager.BaseManager();
				for ( var figureIndex in figures) {
					figureConfig = figures[figureIndex];
					try{
					me._initModel(figureConfig);
					}catch(e){
						console.log('图元模型初始化失败，失败的组件名称为：' +figureConfig.fType);
						console.log(e);
					}
				}
			},
			
			
			
			/**
			 * @private
			 * 根据配置信息初始化模型
			 * 
			 * @param {Object}figureConfig 图元json配置对象
			 */
			_initModel : function(figureConfig) {
				var me = this, figure, model, viewModel = null, dataModel = null, groupModels, proxy, store;
				if (!figureConfig) {
					return;
				}
				//加载模型需要的JS文件
				if (figureConfig.jsfiles){
					me._loadJsFiles(figureConfig.jsfiles);
				}
				
				if (!figureConfig.fType) {
					// TODO 没有指定图元类型。
					me.logger.error("有图元没有指定图元类型，加载失败！" + figureConfig.fName);
					return;
//					throw "图元没有指定图元类型" + figureConfig.fName;
				}
				
				// 创建数据模型
				me._createDataModel(figureConfig);
				// 创建视图模型
				me._createViewModel(figureConfig);
				// 移除模型属性
				figureConfig.businessModel = undefined;
				figureConfig.viewModel = undefined;
				
				// 创建模型
				model = me._createModel(figureConfig);
				// 模型分组
				if (!figureConfig.groupId) {
					figureConfig.groupId = me.DEFAULT_GROUP_NAME;
				}
				groupModels = me.getGroupManager()
						.get(figureConfig.groupId);
				if (groupModels == null) {
					groupModels = new Array();
				}
				//fType属性作为关键字存储
				groupModels.push(figureConfig.fType);
				me.groupManager.put(figureConfig.groupId, groupModels);

				// 存放入模型管理器
				me.put(figureConfig.fType, model);
				
			
				// 发出事件，模型加载
				me.fireEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_LOADED, model);

				me.logger
						.debug("model manager init comp===============================");
			
			},
			
			/**
			 * 加载模型需要的JS文件
			 */
			_loadJsFiles:function(jsFiles) {
				var me = this;
				if(!jsFiles){
					return;
				}
				for (var file in jsFiles) {
					Ext.Loader.loadScriptFile(jsFiles[file], Ext.emptyFn
					, null, me, true);
				}

			},
			/**
			 * @private
			 * 根据配置创建模型
			 * 
			 * @param {Object}figureConfig
			 *            图元配置信息。
			 *  @return 业务图元数据模型
			 */
			_createModel : function(figureConfig) {
				var model,proxy = "Dep.framework.editor.model.proxy.FigureAjaxProxy";
				// 创建模型
				if (!figureConfig.extend) {//如果没有配置父类，使用默认类作为父类
					figureConfig.extend = 'Dep.framework.editor.model.BaseFigureModel';
				}
				if (!figureConfig.fields) {//如果没有配置field，配置默认field
					figureConfig.fields = [ {
						name : 'id', // id，所有的模型均有此属性
						type : 'String'
					},{
						name : 'name', // 名称，所有的模型均有此属性
						type : 'String'
					} ];
				}
				// TODO 需要添加判断
				figureConfig.hasOne = [ {
					model : figureConfig.fName + 'View',
					name : 'viewData', // 访问view的方法
					associationKey : 'viewData',
					foreignKey : "id"
				}, {
					model : figureConfig.fName + 'Data',
					name : 'bussData', // 访问data的方法
					associationKey : 'bussData',
					foreignKey : "id"
				} ];
				// 设置数据模型代理
				if (figureConfig.api) {
					if (!figureConfig.persistentViewData) {
						proxy = "Dep.framework.editor.model.proxy.NoneViewDataAjaxProxy";
					}
					figureConfig.proxy = Ext.create(
							proxy, {
								api : figureConfig.api
							});
				}
//				if (!figureConfig.shape) {
//					figureConfig.shape = 'Dep.framework.editor.figure.BaseNode';
//				}
				model = Ext.define(figureConfig.fName, figureConfig);
//				// 拷贝其他配置属性
				Ext.apply(model, figureConfig);
				return model;
			},
			
			/**
			 * @private
			 * 根据配置创建图形模型
			 * 
			 * @param {Obejct} figureConfig
			 *            图元配置信息。
			 */
			_createViewModel : function(figureConfig) {
				var viewModel = null, proxy = null;
				if (figureConfig.viewModel) {

					proxy = (figureConfig.viewModel.api) ? Ext
							.create("Dep.framework.editor.model.proxy.BaseAjaxProxy") : null;
					viewModel = Ext.define(figureConfig.fName + 'View', {
						extend : 'Dep.framework.editor.model.ModelView',
						fields : figureConfig.viewModel.fields,
						validations : figureConfig.viewModel.validations,//校验
						// proxy : proxy,
						belongsTo : {
							model : figureConfig.fName,
							primaryKey : 'id',
							foreignKey : 'id'
						}
					});
					if (proxy) {
						viewModel.setProxy(proxy);
					}
				}
				return viewModel;
			},
			/**
			 *  @private
			 * 初始化数据模型
			 * 
			  * @param {Obejct} figureConfig
			 *            图元配置信息。
			 */
			_createDataModel : function(figureConfig) {
				var dataModel = null, proxy = null;
				if (figureConfig.businessModel) {
					proxy = (figureConfig.businessModel.api) ? Ext.create(
							"Dep.framework.editor.model.proxy.BaseAjaxProxy", {
								api : figureConfig.businessModel.api
							}) : null;

					dataModel = Ext.define(figureConfig.fName + 'Data', {
						extend : 'Dep.framework.editor.model.ModelData',
						fields : figureConfig.businessModel.fields,
						validations : figureConfig.businessModel.validations,//校验
						// proxy : proxy,
						belongsTo : {
							model : figureConfig.fName,
							primaryKey : 'id',
							foreignKey : 'id'
						}
					});
					if (proxy) {
						dataModel.setProxy(proxy);
					}
				}
				return dataModel;

			},
			/**
			 * @return {Dep.framework.editor.manager.BaseManager}返回模型分组管理器
			 */
			getGroupManager : function() {
				var me = this;
				if (!me.groupManager) {
					// TODO 国际化
					throw "[ModelManager#getGroupManager]:模型管理器（ModelManager）内的group管理器没有初始化！";
				}
				return me.groupManager;
			},

			/**
			 * @param {String/String[]}
			 * @return {String[]}根据图元组获取所有的图元类型，返回图元唯一标识（fType）的集合
			 */
			getTypesByGroup : function(group) {
				var result = [], me = this, length, types,groups;
				if (!group) {
					return result;
				}
				groups = group;
				if (!Ext.isArray(groups)) {//如果不为数组group
					groups = [group];
				}
				
				length = groups.length;
				for (var i = 0; i < length; i++) {
					types = me.getGroupManager().get(groups[i]);
					if (types) {
						result =result.concat(me.getGroupManager().get(groups[i]));
					}
				}
				return result;
			}

		});