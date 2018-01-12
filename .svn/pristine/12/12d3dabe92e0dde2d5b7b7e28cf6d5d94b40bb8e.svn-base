if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.base) {
	Dep.framework.editor.base = {};
}
/**
 * 数据管理器，管理编辑器内所有的数据.
 */
Dep.framework.editor.base.Layer = Dep.framework.editor.base.EventSource.extend(
		{
			NAME : "Dep.framework.editor.base.Layer",

			layouted : false,
			/**
			 * 初始化日志类
			 */
			logger : log4javascript
					.getDefaultLogger("Dep.framework.editor.base.Layer"),

			layer : null,
			/**
			 * @property 模型管理器。 Dep.framework.editor.manager.ModelManager
			 */
			modelManager : null,

			/**
			 * @property 各种数据集合map
			 */
			storeManager : null,

			/**
			 * @property 根据图元类型存储所有怎删改查图元
			 */
			cacheManager : null,

			/**
			 * 图层是否可见
			 */
			visible : false,
			/**
			 * 图层是否可编辑器
			 */
			editable : false,

			/**
			 * @event modelUpdated 此数据管理器
			 * @param {Ext.data.Store}
			 *            模型所在store
			 * @param {Dep.framework.editor.model.BaseFigureModel}
			 *            修改的模型对象
			 * @param {String}
			 *            操作类型，可能为以下值： Ext.data.Model.EDIT Ext.data.Model.REJECT
			 *            Ext.data.Model.COMMIT
			 * @param {String[]}
			 *            修改的属性名称
			 */

			/**
			 * @event modelRemoved 此数据管理器
			 * @param {Ext.data.Store}
			 *            模型所在store
			 * @param {Dep.framework.editor.model.BaseFigureModel}
			 *            移除的模型对象
			 * @param {Number}
			 *            模型所在位置
			 * @param {Boolean}
			 *            isMove `true` if the child node is being removed so it
			 *            can be moved to another position in this Store.
			 */

			/**
			 * 初始化数据管理器
			 * 
			 * @param {Dep.framework.editor.manager.ModelManager}modelManager
			 */
			init : function(editor, modelManager, config) {
				var me = this;
				me._super();
				me.editor = editor;
				me._initConfig(config);
				me.setModelManager(modelManager);
				me.cacheManager = new Dep.framework.editor.manager.BaseManager();
				me.storeManager = new Dep.framework.editor.manager.BaseManager();
				// 初始化图层管理的store
				me.initStore();
				// me.getModelManager()
				// .on(Dep.framework.editor.EVENT.EDITOR.MODEL_LOADED,
				// me.initStore, me);
			},
			/**
			 * 初始化图层信息
			 * 
			 * @param {Object}
			 *            config
			 * @private
			 */
			_initConfig : function(config) {
				var me = this;
				if (config && typeof config === 'object') {
					var i;
					// 拷贝属性
					for (i in config) {
						me[i] = config[i];
					}
				}
			},

			/**
			 * 模型加载完成后，加载相应的store类。
			 * 
			 * @param {Dep.framework.editor.manager.ModelManager}
			 *            事件源
			 * @param {Dep.framework.editor.model.BaseFigureModel}
			 *            model 加载的model
			 */
			initStore : function(/* eventSource, model */) {
				var me = this, getAllProxy, getViewProxy, store, fTypes, proxyClass = "Dep.framework.editor.model.proxy.FigureAjaxProxy",model;
				fTypes = me.getModelManager().getTypesByGroup(me
						._getFGroupsArray());
				for (var i in fTypes) {
//					console.log("初始化图元的store，图元类型为：" + fTypes[i]);
					model = me.getModelManager().get(fTypes[i]);
					if (!model.fType) {
						// TODO
						return;
					}
					// //此图层没有配置该类图元，不创建store
					// if (!me._hasFigureType(type)) {
					// return;
					// }
					// 创建模型store
					if (!model.persistentViewData) {
						proxyClass = "Dep.framework.editor.model.proxy.NoneViewDataAjaxProxy";
					}
					getAllProxy = (model.api && model.api.getAll) ? Ext.create(
							proxyClass, {
								url : model.api.getAll
							}) : null;

					getViewProxy = (model.api && model.api.getAllView) ? Ext
							.create(proxyClass, {
										url : model.api.getAllView
									}) : null;

					store = Ext.create(
							"Dep.framework.editor.model.store.FigureStore", {
								model : model.getName(),
								// 请求代理
								proxy : getAllProxy,
								getAllProxy : getAllProxy,
								getViewProxy : getViewProxy,
								autoload : false
							});
					// 设置store的唯一标识
					store.fType = model.fType;
					// 设置store所属图层
					store.layerType = me.type;
					// 设置store是否是port
					store.isPort = model.isPort;
					store.isConnection = model.isConnection;
					store.on("add", me._onStoreAdd, me);
					store.on("remove", me._onStoreRemove, me);
					// store.on("bulkremove", me._onStoreBulkRemove, me);
					store.on("update", me._onStoreUpdate, me);
					store.on("load", me._onStoreLoad, me);
					store.on("clear", me._onStoreClear, me);
					me.getStoreManager().put(model.fType, store);
					me.cacheManager
							.put(
									model.fType,
									new Dep.framework.editor.manager.DataChangeManager());
				}
			},
			/**
			 * 标明当前layer处于loadAll模式下
			 * @param {} flag
			 */
			setLoadAllMode : function(flag) {
				this.loadMode = flag;
			},
			/**
			 * 获取是否处于loadAll模式下
			 * @return {}
			 */
			getLoadAllMode : function() {
				return this.loadMode;
			},
			/**
			 * 传递模型添加事件
			 * 
			 * @param args
			 *            参考事件定义
			 */
			_onStoreAdd : function(store, records, index, eOpts) {
				var me = this, fType = store.fType, manager = me
						.getCacheManager().get(fType);

				// 设置模型的可见性及可编辑性
				for (var i in records) {
					records[i].setVisible(me.visible);
					records[i].setEditable(me.editable);
					// 设置图元所属图层
					records[i].setFigureGroup(me.type);
				}
				// 添加到缓存,标识新添加的数据
				manager.addNewDatas(records);
				if (!me.getLoadAllMode()) {
					me.fireEvent("modelCreated", me, store, records, index,
							eOpts);
				}
			},
			/**
			 * 传递模型移除事件
			 * 
			 * @param args
			 *            参考事件定义
			 */
			_onStoreRemove : function(store, record, index, isMove, eOpts) {
				var me = this, fType = store.fType, manager = me
						.getCacheManager().get(fType);
				// 添加到缓存
				manager.addDeleteDatas(record);
				me.logger.debug("监听到移除数据事件：" + fType);

				if (!me.getLoadAllMode()) {
					me.fireEvent("modelRemoved", me, store, record, index,
							isMove, eOpts);
				}
			},
			// /**
			// * 大量模型移除事件
			// * @param args 参考事件定义
			// */
			// _onStoreBulkRemove : function(store, records, indexes, isMove,
			// eOpts) {
			// var me = this, length = records.length;
			// for (var i = 0; i < length; i++) {
			// me
			// ._onStoreRemove(store, records[i], indexes, isMove,
			// eOpts);
			// }
			//
			// },
			/**
			 * 传递模型更新事件
			 * 
			 * @param args
			 *            参考事件定义
			 */
			_onStoreUpdate : function(store, record, operation, eOpts) {
				var me = this, fType = store.fType, manager = me
						.getCacheManager().get(fType);
				// 添加到缓存
				manager.addUpdateDatas(record);

				if (!me.getLoadAllMode()) {
					me.fireEvent("modelUpdated", me, store, record, operation,
							eOpts);
				}

			},
			/**
			 * 传递模型load事件
			 * 
			 * @param args
			 *            参考事件定义
			 */
			_onStoreLoad : function(store, records, successful, eOpts) {
				var me = this, fType = store.fType, manager = me
						.getCacheManager().get(fType);
				// 清除缓存
				manager.clear();
				store.setVisible(me.visible);
				store.setEditable(me.editable);
				store.each(function(record) {
							// 设置图元所属图层
							record.setFigureGroup(me.type);
							//表明該模型不是新建的模型
							record.setIsNew(false);
						});
				me.logger.debug("重新加载了数据：" + fType);

				if (!me.getLoadAllMode()) {
					me.fireEvent("modelLoaded", me, fType, store);
				}
			},
			/**
			 * 传递模型load事件
			 * 
			 * @param args
			 *            参考事件定义
			 */
			_onStoreClear : function(store) {
				var me = this, fType = store.fType, manager = me
						.getCacheManager().get(fType);
				// 清除缓存
				if (manager) {
					manager.clear();
				}
				store.setVisible(me.visible);
				store.setEditable(me.editable);

				if (!me.getLoadAllMode()) {
					me.fireEvent("fTypeClear", me, fType, store);
//					me.fireEvent("modelLoaded", me, fType, store);
				}
			},

			/**
			 * 
			 * @return {Dep.framework.editor.manager.BaseManager} 返回模型管理器
			 */
			getModelManager : function() {
				var me = this;
				return me.modelManager;

			},

			/**
			 * 
			 * @return {Dep.framework.editor.manager.BaseManager} 设置模型管理器
			 */
			setModelManager : function(modelManager) {
				var me = this;
				me.modelManager = modelManager;
			},
			/**
			 * 
			 * @return {Dep.framework.editor.manager.BaseManager} 获取store管理器
			 */
			getStoreManager : function() {
				var me = this;
				if (!me.storeManager) {
					me.storeManager = new Dep.framework.editor.manager.BaseManager();
				}
				return me.storeManager;

			},
			/**
			 * 添加数据
			 * 
			 * @param {String}
			 *            fType 图元类型（fType）
			 * @param
			 *            {Dep.framework.editor.model.BaseFigureModel[]/Dep.framework.editor.model.BaseFigureModel...}
			 *            添加一个或多个模型对象.
			 *  @param {boolean}是否是新增模型   
			 * @param        
			 */
			add : function(fType, records, isNew) {
				var me = this, store, record, isModel, models = [];
				if (!records) {
					records = {};
				}
				// 获取store添加模型数据
				store = me.getStoreManager().get(fType);

				if (!store) {
					throw "[Dep.framework.editor.base.Layer#add]:图元类型没有定义！";
				}
				if (records instanceof Array) {
					for (var i in records) {
						record = records[i];
						models = models.concat(me._add(store, record, isNew));
					}
				} else {
					models = models.concat(me._add(store, records, isNew));
				}
				if (models.length > 0) {
					me.fireEvent("beforeModeladdToCanvas", models, fType, me);
					store.add(models);
				}
				return models;
			},
			/**
			 * 根据json串添加图元，要求json中必须要有fType属性。
			 */
			addRecordsFromJson : function(records) {
				var me = this,store,models = [];
				if (!records) {
					return;
				}
				if (records instanceof Array) {
					for (var i in records) {
						record = records[i];
						if (!record.fType) {
							throw "[Dep.framework.editor.base.Layer#addRecordsFromJson]:图元类型没有定义！" + record;
						}
						store = me.getStoreManager().get(record.fType);
						if(!store) {
							throw "[Dep.framework.editor.base.Layer#addRecordsFromJson]:图元类型没有定义,检查配置文件！" + record.fType;
						}
						models = me._add(store, record, true);
						if (models) {
							me.fireEvent("beforeModeladdToCanvas", models, record.fType, me);
							store.add(models);
						}
					}
				} else {
					if (!records.fType) {
						throw "[Dep.framework.editor.base.Layer#addRecordsFromJson]:图元类型没有定义！" + record;
					}
					store = me.getStoreManager().get(records.fType);
					if(!store) {
						throw "[Dep.framework.editor.base.Layer#addRecordsFromJson]:图元类型没有定义,检查配置文件！" + record.fType;
					}
					models = me._add(store, records, true);
					if (models) {
						me.fireEvent("beforeModeladdToCanvas", models, records.fType, me);
						store.add(models);
					}
					
				}
			},
			/**
			 * 根据json字符串，加载某一类型的数据。
			 */
			addTypeRecordsFromJson : function(fType,records,isNew) {
				var me = this,store,models = [];
				if (!records) {
					return;
				}
				store = me.getStoreManager().get(fType);
				if (!records instanceof Array) {
					records = [records];//转换为数组
				}
				if (records.length == 0) {
					return models;
				}
				var result = store.proxy.reader.read(records);//使用代理读取数据
				if (result.success) {
					records = result.records;
					if (records){
						for (var i in records) {
							if (isNew) {
								records[i].isNew = isNew;
							} else {
								records[i].isNew = true;
							}
						}
					}
					models = models.concat(records);
					me.fireEvent("beforeModeladdToCanvas", models, fType, me);
					store.add(models);
				}
				
			},

			/**
			 * 逐个添加model
			 */
			_add : function(store, record, isNew) {
				var me = this, isModel = false, models = [];

				if (record instanceof Ext.data.Model) {
					isModel = true;
				}
				if (store && isModel) {

					if (isNew) {
//						record.isNew = isNew;
						record.setIsNew(isNew);
					} else {
						record.setIsNew(true);
//						record.isNew = true;
					}
					models.push(record);
				} else if (store && !isModel) {
					var result = store.proxy.reader.read([record]);
					if (result.success) {
						records = result.records;

						for (var i in records) {
							if (isNew) {
//								records[i].isNew = isNew;
								records[i].setIsNew(isNew);
							} else {
								records[i].setIsNew(true);
//								records[i].isNew = true;
							}
						}
						models = models.concat(records);
					}
				}
				return models;

			},
			/**
			 * 添加数据
			 * 
			 * @param {String}
			 *            type 图元类型（fType）
			 * @param
			 *            {Dep.framework.editor.model.BaseFigureModel[]/Dep.framework.editor.model.BaseFigureModel...}
			 *            添加一个或多个模型对象.
			 */
			create : function(type, record) {
				var me = this;
				if (!record) {
					record = {};
				}
				// 获取store添加模型数据
				store = me.getStoreManager().get(type);

				if (!store) {
					throw "[Dep.framework.editor.base.Layer#add]:图元类型没有定义！";
				}
				return me._create(store, record);
			},
			/**
			 * 创建模型对象
			 */
			_create : function(store, record) {
				var me = this, isModel = false, models = [];

				if (record instanceof Ext.data.Model) {
					return record;
				}
				var result = store.proxy.reader.read([record]);
				if (result.success) {
					records = result.records;
					//	store.add(records);
					models = models.concat(records);
				}
				if (models.length > 0) {
					return models[0];
				} else {
					me.logger.error("创建模型失败，没有读取到数据");
					return null;
				}
			},
			/**
			 * 克隆model
			 */
			clone : function(records) {
				var me = this, isModel = false, models = [];
				if (!records) {
					records = {};
				}
				if (records instanceof Array) {
					for (var i in records) {
						record = records[i];// 批量克隆
						models = models.concat(me._clone(record));
					}
				} else {// 单条数据克隆
					models = models.concat(me._clone(records));
				}
				return models;

			},
			/**
			 * 逐个克隆model
			 */
			_clone : function(record) {
				var me = this, models = [], store;
				if (!record.getFType) {
					throw "[Dep.framework.editor.base.Layer#add]:图元类型没有定义！";
				}
				// 获取store添加模型数据
				store = me.getStoreManager().get(record.getFType());

				if (!store) {
					throw "[Dep.framework.editor.base.Layer#add]:图元类型没有定义！";
				}
				if (!record instanceof Ext.data.Model) {
					return;
				}
				var result = store.proxy.reader.read([record
						.getPersistentAttributes()]);
				if (result.success) {
					records = result.records;
					if (records && records[0]) {

						records[0].updateId();
						models = models.concat(records[0]);
					}
				}
				return models;

			},

			/**
			 * 删除数据
			 * 
			 * @param {String}
			 *            type 图元类型（fType）
			 * @param
			 *            {Dep.framework.editor.model.BaseFigureModel[]/Dep.framework.editor.model.BaseFigureModel...}
			 *            删除一个或多个模型对象.
			 */
			remove : function(type, records) {
				var store;
				if (!records) {
					return false;
				}
				// 获取store添加模型数据
				store = this.getStoreManager().get(type);
				if (store) {
					store.remove(records);
					return true;
				}
				throw "[Dep.framework.editor.base.Layer#remove]:图元类型没有定义！";
			},

			/**
			 * 清除指定类型的数据
			 * 
			 * @param {String/String[]}
			 *            type 图元类型（fType）
			 */
			clear : function(type) {
				var store, me = this, types = type;
				if (!Ext.isArray(types)) {
					// 转换为数组
					types = [type];
				}
				// 获取store添加模型数据
				length = types.length;
				for (var i = 0; i < length; i++) {
					// 获取store添加模型数据
					store = me.getDatasByType(types[i]);
					if (store) {
						store.removeAll();
					}
				}
			},

			/**
			 * 清除所有类型数据
			 */
			clearAll : function() {
				var me = this, store;
				var stores = me.getStoreManager().values();
				for (var i = 0; i < stores.length; i++) {
					store = stores[i];
					if (store && store.count()>0) {
						store.removeAll();
						me.fireEvent("fTypeClear", me, store.fType);
//						store.setVisible(me.visible);
//						store.setEditable(me.editable);
					}
				}
				// // 清空缓存
				// this.getCacheManager().removeAll();
			},

			/**
			 * 清除所有缓存数据
			 */
			clearCache : function() {
				this.getCacheManager().removeAll();
			},
			/**
			 * 使用代理加载数据
			 * 
			 * @param {String/String[]}
			 *            types 图元类型
			 * @param {Boolean}
			 *            [view=false] `true` ：仅加载界面数据, `false`加载业务数据和图形数据
			 * @param {Ext.data.Operation}
			 */
			load : function(type, operation, view) {
				var me = this, store, types, length;
				if (type == null) {
					return;
				}
				if (view) {// 如果仅加载图形数据
					me.loadView(type, operation);
					return;
				}
				types = type;
				if (!Ext.isArray(types)) {
					// 转换为数组
					types = [type];
				}
				// 获取store添加模型数据
				length = types.length;
				for (var i = 0; i < length; i++) {
					store = me.getDatasByType(types[i]);
					store.setProxy(store.getAllProxy);
					if (store) {
						store.load(operation);
					}
				}
			},

			/**
			 * 使用代理加载图层所有数据
			 * 
			 * @param {Boolean}[view=false]
			 *            `true` ：仅加载界面数据, `false`加载业务数据和图形数据
			 * @param {Boolean}@param
			 *            {Ext.data.Operation}
			 */
			loadAll : function(view, map) {
				var me = this, deferred, deferreds = [];
				me.setLoadAllMode(true);
				var stores = me.getStoreManager().values();
				for (var i = 0; i < stores.length; i++) {
					// 创建deffer对象
					deferred = me._createLoadDeferred(stores[i], view, map);
					// 存入数组
					deferreds.push(deferred);
				}

				/*$.when(deferreds).then(function(records) {
							me.logger.debug('Do something with result');
							me.fireEvent("layerLoadData", me, records);
						}, function(error) {
							me.logger.debug('Do something on failure');
							Dep.framework.editor.util.Msg
									.error('数据加载失败！', '错误');
						})*//*
				 * .always(function() { me.logger.debug('不管成功失败，do
				 * it！'); })
				 */

				// 等待所有store加载完毕之后发送事件
				Deft.Promise.all(deferreds).then({
							success : function(records) {
								me.logger.debug('Do something with result');
								me.fireEvent("layerLoadData", me, records);
								me.setLoadAllMode(false);
							},
							failure : function(error) {
								me.setLoadAllMode(false);
								me.logger.debug('Do something on failure');
								Dep.framework.editor.util.Msg.error('数据加载失败！',
										'错误');
							}
						})/*
				 * .always(function() { me.logger.debug('不管成功失败，do
				 * it！'); })
				 */.done();
			},
			/**
			 * @param {Dep.framework.editor.model.store.FigureStore}
			 *            store 需要加载数据的store
			 * @param {Boolean}[view=false]
			 *            `true` ：仅加载界面数据, `false`加载业务数据和图形数据
			 */
			_createLoadDeferred : function(store, view, map) {
				var deferred, me = this;
				if (!store) {
					return;
				}
				deferred = Ext.create('Deft.Deferred');
				//				deferred = $.Deferred();
				if (view) {// 使用view 代理
					if (store.getViewProxy) {
						store.setProxy(store.getViewProxy);
					} else {
						return deferred.resolve(null);
					}
				} else {// 使用data代理
					if (store.getAllProxy) {
						store.setProxy(store.getAllProxy);
					} else {
						return deferred.resolve(null);
					}
				}
				if (map) {
					var fType = store.fType, paramObj = map.get(fType);
				}
				store.load({
							params : paramObj ? paramObj : {},
							callback : function(records, operation, success) {
								if (success) {
									deferred.resolve(records);
								} else {
									deferred.reject("数据加载失败!");
								}
							}
						});
				return deferred.promise;
			},
			/**
			 * 加载业务数据
			 * 
			 * @param {String}
			 *            type 图元类型
			 * @param {String}
			 *            datas 数据
			 * @param {Boolean}
			 *            [append=false] `true` ：添加新数据, `false`移除旧数据添加
			 */
			loadByData : function(type, data, append) {
				var store;
				if (type == null) {
					return;
				}
				// 不支持多个图元
				if (Ext.isArray(type)) {
					return;
				}
				// 获取store添加模型数据
				store = this.getStoreManager().get(type);
				if(!store) {
					throw "[Dep.framework.editor.base.Layer#loadByData]:找不到对应的图元管理器";
				}
				store.loadData(data, append);
			},

			/**
			 * 加载图形数据,注意:后台传输的数据结构不变。
			 * 
			 * @param {String/String[]}
			 *            type 图元类型
			 * @param {Ext.data.Operation}
			 */
			loadView : function(type, operation) {
				var me = this, store, types, length;
				if (type == null) {
					return;
				}
				types = type;
				if (!Ext.isArray(types)) {
					// 转换为数组
					types = [type];
				}
				// 获取store添加模型数据
				length = types.length;
				for (var i = 0; i < length; i++) {
					store = me.getDatasByType(types[i]);
					store.setProxy(store.getViewProxy);
					if (store) {
						store.load(operation);
					}
				}
			},

			/**
			 * 根据图元fType属性获取相应的store
			 * 
			 * @return Ext.data.Store
			 */
			getDatasByType : function(type) {
				var store;
				// 获取store
				store = this.getStoreManager().get(type);
				return store;
			},

			/**
			 * 
			 * @return {Dep.framework.editor.manager.BaseManager} 返回缓存对象
			 */
			getCacheManager : function() {
				var me = this;
				return me.cacheManager;
			},

			/**
			 * 根据所有图元增加、修改、更新的图元，根据图元类型分类
			 * 
			 * @return {Dep.framework.editor.manager.BaseManager} 返回缓存对象
			 */
			getAllCUDDatas : function() {
				return this.getCacheManager();
			},
			/**
			 * 根据图元类型获取所有增加、修改、更新的图元
			 * 
			 * @param {String}fType
			 *            图元唯一标识
			 * @return {Dep.framework.editor.manager.BaseManager} 返回缓存对象
			 */
			getCUDDatasByType : function(fType) {
				var me = this;
				return me.getCacheManager().get(fType);
			},

			/**
			 * 设置可编辑性
			 */
			setEditable : function(editable) {// TODO 方法需要改进
				var me = this, length, keys = me.getStoreManager().keys(), key, store;
				me.editable = editable;
				me.updateFigures();
			},

			/**
			 * 设置可见性
			 */
			setVisible : function(visible) {// TODO 方法需要改进
				var me = this, length, keys = me.getStoreManager().keys(), key, store;
				me.visible = visible;
				me.updateFigures();
			},
			/**
			 * 更新图元
			 */
			updateFigures : function() {// TODO 方法需要改进
				var me = this, length, keys = me.getStoreManager().keys(), key, store;
				length = keys.length;
				// 设置所有的图元为不可见
				for (var i = 0; i < length; i++) {
					key = keys[i];
					store = me.getStoreManager().get(key);
					if (!store || !store.setVisible) {
						me.logger
								.error("[Dep.framework.editor.base.Layer#_updateVisibleFigures]没有找到图元配置信息，图元类型为："
										+ key);
						continue;
					}
					store.setVisible(me.visible);
					store.setEditable(me.editable);
				}
			},

			/**
			 * 
			 * @return {String[]} 获取显示的图元类型
			 */
			getVisibleFType : function() {
				var me = this;
				return me.visibleFTypes;
			},

			/**
			 * 获取当前编辑图层
			 * 
			 * @return lType
			 */
			getFigureTypes : function() {
				var me = this, groupAr = me._getFGroupsArray();
				types = me.getModelManager().getTypesByGroup(groupAr);
				return types;
			},

			/**
			 * 获取当前编辑图层
			 * 
			 * @return lType
			 */
			_getFGroupsArray : function() {
				var me = this, groups = [];
				var fGroups = me.getFigureGroup();
				if (!fGroups) {
					return groups;
				}
				var groupAr = fGroups.split(',');
				return groupAr;
			},

			/**
			 * 获取当前编辑图层
			 * 
			 * @return lType
			 */
			_hasFigureType : function(fType) {
				var me = this, types = me.getFigureTypes(), length = types.length;

				for (var i = 0; i < length; i++) {
					if (fType == types[i]) {
						return true;
					}
				}
				return false;
			},

			/**
			 * 获取当前图层的所有数据
			 * 
			 * @param {Boolean}
			 *            includePort true -返回数据包含port； false-返回数据不包含port
			 * @param {Boolean}
			 *            includeConnection true -返回数据包含connection；
			 *            false-返回数据不包含connection
			 * @return {Dep.framework.editor.model.BaseFigureModel[]}
			 */
			getAllDatas : function(includePort, includeConnection) {
				var me = this, storeManager = me.getStoreManager(), stores = storeManager
						.values(), records = [];
				var length = stores.length, store = null;
				for (var i = 0; i < length; i++) {
					store = stores[i];
					if (store.isPort && !includePort) {// 排除port
						continue;
					}
					if (store.isConnection && !includeConnection) {// 排除connection
						continue;
					}

					if (!store.getAllRecords) {
						continue;
					}
					records = records.concat(store.getAllRecords());
				}
				return records;
			},
			/**
			 * 获取当前图层的所有数据
			 * 
			 * @return {Dep.framework.editor.model.BaseFigureModel[]}
			 */
			getAllConnectionDatas : function() {
				var me = this, storeManager = me.getStoreManager(), stores = storeManager
				.values(), records = [];
				var length = stores.length, store = null;
				for (var i = 0; i < length; i++) {
					store = stores[i];
					if (!store.isConnection ) {//不是连接
						continue;
					}
					
					if (!store.getAllRecords) {
						continue;
					}
					records = records.concat(store.getAllRecords());
				}
				return records;
			},

			/**
			 * 
			 * @return {Array}获取编辑的数据类型
			 */
			getEditableFType : function() {
				var me = this;
				return me.editableFTyeps;
			},

			getFigureGroup : function() {
				var me = this;
				return me.fGroups;
			},
			setFigureGroup : function(fGroups) {
				var me = this;
				me.fGroups = fGroups;
			},
			getType : function() {
				var me = this;
				return me.type;
			},
			setType : function(type) {
				var me = this;
				me.type = type;
			},
			getName : function() {
				var me = this;
				return me.name;
			},
			setName : function(name) {
				var me = this;
				me.name = name;
			},
			getDescription : function() {
				var me = this;
				return me.desc;
			},
			setDescription : function(desc) {
				var me = this;
				me.desc = desc;
			},
			getLayout : function() {
				var me = this;
				return me.layout;
			},
			setLayout : function(layout) {
				var me = this;
				me.layout = layout;
			},

			isLayouted : function() {
				var me = this;
				return me.layouted;
			},
			setIsLayouted : function(layouted) {
				var me = this;
				me.layouted = layouted;
			}

		});
