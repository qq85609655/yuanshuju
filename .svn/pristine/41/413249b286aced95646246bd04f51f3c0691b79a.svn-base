/**
 * @editor yhy 单独的分页工具条
 */
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
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
Dep.framework.editor.plugin.containers.PagingToolBar = Dep.framework.editor.plugin.ContainerPlugin
		.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "Dep.framework.editor.plugin.containers.PagingToolBar",
			/**
			 * 初始化日志类
			 */
			logger : log4javascript
					.getDefaultLogger("Dep.framework.editor.plugin.containers.PagingToolBar"),
			/**
			 * 初始化容器插件
			 * 
			 * @param {Object}
			 *            pluginData 插件配置信息
			 */
			init : function(canvas, pluginData) {
				var me = this;
				me._super(canvas, pluginData);
				me._initView(pluginData);
				me
						.getEditor()
						.regiestOnEvent(
								Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
								me._initEvents.bind(me));
				me.initCacheData(pluginData);
			},
			/**
			 * @private 初始化事件监听
			 */
			_initEvents : function() {
				var me = this;
				me.regiestOnEvent(
						Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER,
						me.onLayerChanged.bind(me), me,
						"Dep.framework.editor.plugin.containers.Layer");
			},

			/**
			 * @private 初始创建图形工具箱并展示
			 * 
			 * @param {Object}
			 *            pluginData
			 */
			_initView : function(pluginData) {

				var me = this, containerPanel, panel, parentContainer = me
						.getParentContainer();
				if (parentContainer
						&& (parentContainer instanceof Dep.framework.editor.plugin.containers.Canvas)) {
					containerPanel = parentContainer.getContainerPanel();
					// 创建panel
					panel = Ext.create('Ext.toolbar.Paging',
						{
						store:Ext.create('Ext.data.Store',{
							fields : [{
								name : 'id',
								type : 'string'
							}, {
								name : 'name',
								type : 'string'
							}]
						}),
						displayInfo : true,
						inputItemWidth :50,
						dock: 'bottom'
//						refreshText : demp.wording.pagingbar.refreshBt,
//						beforePageText :demp.wording.pagingbar.beforePage ,
//						afterPageText :demp.wording.pagingbar.afterPage,
//						displayMsg : demp.wording.pagingbar.displayMsg,
//						emptyMsg : demp.wording.pagingbar.emptyMsg
						});
					me.setContainerPanel(panel);
					me.setPagingToolBar(panel);
					// 添加到画布
					containerPanel.insertDocked('bottom', panel);
					return;
				}
				throw "[Dep.framework.editor.plugin.PagingToolBar#_initView]找不到正确的父容器对象!";
			},
			/**
			 * 当用户切换图层 的时候,根据当前编辑图层的fGroups属性获得当前编辑图层包含的所有图元组
			 * 根据每个图元组,从modelManager中获得该图元组的图元配置集合, 然后根据图元配置集合去填充工具条
			 * 
			 * @param {}
			 *            layerObj 图层容器对象
			 */
			onLayerChanged : function(layerObj) {
				var me = this,config;
				me.currentEditLayer = layerObj;
				me.getPagingToolBar().hide();
				if (!layerObj) {
					me.logger
							.debug("[Dep.framework.editor.plugin.containers.PagingToolBar#onLayerChanged]没有选中任何图层！");
					return;
				}

				if (!layerObj.type) {
					layerObj.type = 'default';
				}
				// 先从缓存获取
				config = me.getCacheDataByLType(layerObj.type);
				if(!config || !config.displayFType) {
					me.logger
					.debug("[Dep.framework.editor.plugin.containers.PagingToolBar#onLayerChanged]没有配置信息！");
			
					return;
				}
				
				layer = me.getEditor().getDataManager().getLayer(layerObj.type);
				if (layer) {
					var store = layer.getStoreManager().get(config.displayFType);
					if(store){
						me.bindStore(store);
						me.getPagingToolBar().show();
					}
					
				}
				
			},
			
			bindStore:function(store) {
				var me = this;
				store.removeListener('beforeload');
				store.on('beforeload',function(store){
					//将事件发送出去
					 Ext.apply(store.proxy.extraParams, store.lastOptions.params); 
					me.raiseEvent('beforeLoad',store,me.currentEditLayer);
				});
				//绑定store
				me.getPagingToolBar().bindStore(store);
				
			},
			
			
			setPagingToolBar:function(panel) {
				var me = this;
				me.pagingToolBar = panel;
				
			},
			getPagingToolBar:function(panel) {
				var me = this;
				return me.pagingToolBar;
				
			},
			/**
			 * 缓存每个图层的配置信息
			 * 
			 * @param {}
			 *            pluginData
			 */
			initCacheData : function(pluginData) {
				var me = this, detail = pluginData.details;
				me.cacheData = {};
				if ($.isArray(detail)) {
					$.each(detail, function(n, obj) {
								if (obj.lType) {
									me.cacheData[obj.lType] = obj;
								}
							});
				}
			},

			/**
			 * 根据图层类型获取该图层在图元工具箱中的配置对象
			 * 
			 * @param {String}
			 *            lType 图层类型
			 * @returns {*}
			 */
			getCacheDataByLType : function(lType) {
				return this.cacheData[lType];
			}
		});