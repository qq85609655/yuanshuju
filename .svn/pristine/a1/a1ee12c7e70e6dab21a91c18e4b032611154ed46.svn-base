/**
 * container 为根容器，即editor 
 * 此插件需要： 
 * 1.根据编辑器的配置信息初始化界面信息。如初始化工具条。 
 * 2.根据工具条配置初始化工具事件。
 * 
 * 此容器插件关联的配置文件为-》cuseditor目录/BussToolBar.json文件。配置文件详情：
 *    
 *     //所有图层的业务工具条使用同一个json配置文件，根据当前编辑图层的不同显示不同工具条。

  {  

	"padding" : "5 10 5 10",  //工具条的样式
	
    "details": [
        {
            "lType": "topo",   //图层类型，不同图层的业务工具条不一样
            
             "items" : [{
                  "xtype": "textfield",  //控件类型输入框
                  "uniqueID" : "name",   //当前容器中的唯一命名，供工具条中的relationsCom属性配置查找用。
                  "name": "name",        //控件名称
                  "fieldLabel" : "名称",   //控件显示名
                  "labelAlign": "right",  //控件显示名的位置，居右
             
             },{
                  "xtype": "combo",
                  "uniqueID" : "fType",
                  "name": "logicNodeName",
                  "fieldLabel" : "图元类型",
                  "displayField" : "name",
                  "labelAlign": "right",
                  "valueField": "id",
                  "url": "test/getComboxValues.do",    //下拉框中的数据集请求URL
                  "listeners": {"click": "actionName","click": "actionName"}  //下拉框的事件名，此处配置的名称与业务系统中事件注册名称一致，供业务系统使用
             },{
                  "xtype": "button",
                  "uniqueID" : "search",
                  "name": "search",
                  "text" : "查询",
                  "icon":"",
                  "action": "TEST",  //按钮的事件名，此处配置的名称与业务系统中事件注册名称一致，供业务系统使用
                  //与当前按钮有关的控件集合，此按钮在查询时通过此配置中的uniqueID可以找到当前容器中的控件并取得值，供查询使用
                  "relationsCom": [{"uniqueID":"name","paramName":"name","type": "String"},{"uniqueID":"fType","paramName":"fType","type": "String"}]  
             }],
        }, {
           
            "lType": "pub",
            "items" : []
        },
    ]
   }
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
Dep.framework.editor.plugin.containers.BussToolBar = Dep.framework.editor.plugin.ContainerPlugin
		.extend({
			NAME : "Dep.framework.editor.plugin.containers.BussToolBar",
			/**
			 * 初始化日志类
			 */
			logger : log4javascript.getDefaultLogger(Dep.framework.editor.plugin.containers.BussToolBar),
			/**
			 * @property {Dep.framework.editor.manager.BaseManager} toolBarConfig 工具条原始配置信息
			 */				
			toolBarConfig : null,
			/**
			 * @property {Dep.framework.editor.manager.BaseManager} toolBarComManager 工具条配置信息转换成的组件配置信息
			 */				
			toolBarComManager : null,
			/**
			 * 初始化业务工具条容器插件
			 * @param {Object}  pluginData  插件配置信息
			 */			
			init : function(parent, pluginData) {
				var me = this, configs;
				me._super(parent, pluginData);
				
				me._initData(pluginData);
				me._initView(pluginData);
				// 监听
				me.getEditor().on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
						me.initEvent.bind(me));
				
				
			},
			
			/**
			 * 初始化配置信息
			 * @param {Object} pluginData 插件配置信息
			 * @private
			 */
			_initData : function(pluginData) {
				var me = this, config, configs;
				// 缓存toolbar配置信息
				me.toolBarConfig = new Dep.framework.editor.manager.BaseManager();
				me.toolBarComManager = new Dep.framework.editor.manager.BaseManager();
				me.storeManager = new Dep.framework.editor.manager.BaseManager();
				configs = pluginData.details;
				if ((!configs) || (!configs instanceof Array)) {
					throw "[Dep.framework.editor.plugin.BussToolBar#_initData]业务工具条没有配置任何信息！";
				}

				for ( var i in configs) {
					config = configs[i];
					if (!config.lType) {
						config.lType = "default";
					}
					me.toolBarConfig.put(config.lType, config);
//					me.toolBarComManager.put(config.lType,me._parseConfigToComConfig(config.lType,config));
				}
			},
			
			/**
			 * 初始化界面panel
			 * @param {Object} pluginData 插件配置信息
			 * @private
			 */
			_initView : function(pluginData) {
				var me = this, containerPanel, panel, parentContainer = me
						.getParentContainer();
				if (parentContainer
						&& (parentContainer instanceof Dep.framework.editor.plugin.containers.Canvas)) {
					containerPanel = parentContainer.getContainerPanel();
					// 创建panel
					panel = Ext.create("Ext.toolbar.Toolbar", {
						autoScroll : true,
						border : '0 0 0 0',
						padding : pluginData.padding ? pluginData.padding
								: "5 5 5 5"

					});
					me.setContainerPanel(panel);
					me.setToolBarPanel(panel);
					// 添加到画布
					containerPanel.insertDocked('top', panel);
					return;
				}
				throw "[Dep.framework.editor.plugin.BussToolBar#_initData]找不到正确的父容器对象!";
			},

			/**
			 * 在容器加载完成之后注册事件。
			 * 注意，必须要在容器加载完成之后注册事件，否则有可能会发生容器还没有安装，但是试图向容器注册事情的现象。
			 * 
			 * @param {Editor} editor 编辑器
			 */
			initEvent : function(editor) {
				var me = this;
				me.regiestOnEvent(Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER,
						me.changeToolBarCom.bind(me), me, "Dep.framework.editor.plugin.containers.Layer");
			},

			/**
			 * 根据图层的不同更改工具条控件。
			 * @param{Dep.framework.editor.base.Layer} layerObj 返回的图层对象
			 * 
			 */
			changeToolBarCom : function(layerObj) {
				var me = this, config,components;
				me.getToolBarPanel().removeAll(false);
				me.getToolBarPanel().hide();
				if (!layerObj) {
					me.logger
							.debug("[Dep.framework.editor.plugin.containers.ViewToolBar#changeGridCfg]没有选中任何图层！");
					return;
				}

				if (!layerObj.type) {
					layerObj.type = 'default';
				}
				// 先从缓存获取
				components = this.getToolBarComManager().get(layerObj.type);
				// 缓存没有，读取配置信息
				try {
					if (!components) {
						config = me.toolBarConfig.get(layerObj.type);
                        //解析配置信息
						components = me._parseConfigToComConfig(layerObj.type,config);
                        //缓存组件
						this.getToolBarComManager()
								.put(layerObj.type, components);
					}
				} catch (err) {
					me.logger.error(err);
				} finally {
					// 更新界面,移除所有控件，但是不销毁控件

					// 填写新控件
					if (!components) {
//						me.getToolBarPanel().hide();
						return;
					}
					if (components.size == 0) {
//						me.getToolBarPanel().hide();
						return;
					}
					me.getToolBarPanel().add(components.values());
					me.getToolBarPanel().show();
				}
			},

        /**
         * 解析工具条配置信息为工具条组件
         * @param {String} lType 图层唯一标识
         * @param {Object} config 配置信息
         * @return {Dep.framework.editor.manager.BaseManager}
         * @private
         */
			_parseConfigToComConfig : function(lType,config) {
				var me = this,components = new Dep.framework.editor.manager.BaseManager(); 
				if (!config) {
					return components;
				}
				var comConfig, action, comConfigs = [], items = config.items,uniqueID, component;
				
				if (!config) {
					throw "[Dep.framework.editor.plugin.BussToolBar#changeToolBarCom]没有配置信息，无法切换图形!";
				}
			
				if (!(items instanceof Array)) {
					throw "[Dep.framework.editor.plugin.BussToolBar#changeToolBarCom]配置信息不正确，无法切换图形!";
				}
				for ( var i in items) {
					comConfig = items[i];
					uniqueID = comConfig.uniqueID;
					if (!uniqueID) {
//						throw "[Dep.framework.editor.plugin.BussToolBar#changeToolBarCom]必须配置组件的uniqueID属性!";
						uniqueID = draw2d.util.UUID.create();
						comConfig.uniqueID = uniqueID;
					}
					if (!comConfig.container) {
						comConfig.container = 'Dep.framework.editor.plugin.containers.Canvas';
					}
					component = me._transConfigToCom(lType,comConfig);
					if (!component) {// 生成控件失败
						continue;
					}
					components.put(uniqueID,component);
				}
				return components;

			},
        /**
         * 转换组件配置信息
         * @param {String} lType 图层唯一标识
         * @param {Object} config 组件配置信息
         * @return {Component}
         * @private
         */
			_transConfigToCom : function(lType,config) {
				var me = this,component, action;
				me._initComAction(config);
				component = Ext.ComponentManager.create(config);
				// 拷贝其他属性
				Ext.applyIf(component, config);
				//拷贝图层属性
				component.lType = lType;
				// 如果为button控件
				if (component instanceof Ext.button.Button && component.action) {
					if (component.action) {
						component.setHandler(me
								._getResponseAction(component.action));
					}
				}
				if (component.eventListeners && component.eventListeners instanceof Array) {
					Ext.Array.each(component.eventListeners, function(obj, index, se) {
						component.on(obj.eventName,me
								._getResponseAction(obj.action));
					});
				}				
				//如果为combox控件
				if (component instanceof Ext.form.field.ComboBox ) {
					me._initComboxStore(lType,component);
				}
				// 配置action
				return component;

			},
        /**
         * 初始化组件的监听事件
         * @param component 控件对象
         * @private
         */
			_initComAction : function(config) {
				if (!config) {
					return;
				}
				var me = this,listeners = config.listeners,actionName;
				if (!listeners) {
					return;
				}
				for (var eventName in listeners) {
					actionName = listeners[eventName];
					listeners[eventName] = me._getResponseAction(actionName);
				}
				return listeners;
			},
        /**
         * 初始化combox组件的store
         * @param {String} lType 图层类型
         * @param component  控件对象
         * @private
         */
			_initComboxStore : function(lType,component) {
				var me = this,url;
				if (!component) {
					return;
				}
				url = component.url;
				if (!url) {
					return;
				}
				
				component.bindStore(me._getComboStore(lType,component.uniqueID,url));
			},


        /**
         * 构造combox的store，并缓存
         * @param {String} layerId 图层Id
         * @param {String} unicodeId 唯一标示
         * @param {String} url store请求数据的URL
         * @return {}
         * @private
         */
	        _getComboStore:function (layerId,unicodeId,url) {
	            var me = this, store;
	            if (!url) {
	            	 me.logger
	                 .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_getComboStore]没有配置URL！");
	            	 return  null;
	            }
	            store = me.getStoreManager().get(layerId + unicodeId);
	            if (store) {
	                return store;
	            }
	            store = Ext.create('Ext.data.Store', {
	                model:'Dep.framework.editor.model.CommonStoreModel'/*Ext.create('Dep.framework.editor.model.CommonStoreModel',{})*/,
	                proxy:Ext.create('Dep.framework.editor.model.proxy.BaseAjaxProxy', {
	                    url:url
	                })
	            });
	            me.getStoreManager().put(layerId + unicodeId, store);
	            //监听load事件
	            store.on('load',function (store) {
	            	me.getToolBarPanel().doAutoRender();
	            });
	            //测试。。。。。。。。。
	            store.load();
	            return store;
	        },
        /**
         * 根据action的唯一标识，获取响应函数
         * @param {String} actionKey  action在容器内的唯一标识。同一个容器内部不能重复。
         * @return {Function}
         * @private
         */
			_getResponseAction : function(actionKey) {
				if (!actionKey) {
					return Ext.emptyFn;
				}
				var me = this;
				return function() {
					var component = this,lType = component.lType;
					if (!lType) {
						//TODO
						return;
					}
					var relations = component.relationsCom, params = {}, relationCom, value, key,components;
					if (!relations instanceof Array) {
						relations = [ relations ];
					}
					// 例如:{"uniqueID":"name","paramName":"name","type":
					// "String"}
					for ( var i in relations) {
						relation = relations[i];
						key = relation.uniqueID;
						if (!key) {
							continue;
						}
						// 从组件管理器中获取组件
						components = me.getToolBarComManager().get(lType);
						if(!components){
							continue ;
						}
						relationCom = components.get(key);
						if(!relationCom){  
							continue ;
						}
						// 获取组件的值,如果控件存在，则获取其中的属性
						value = relationCom.getValue();
						if (relation.paramName) {
							key = relation.paramName;
						}
						params[key] = value;							
					}
					me.executeAction(actionKey, params,component);
				};
			},
			/**
			 * 设置业务工具条panel
			 * @param panel
			 *            
			 */
			setToolBarPanel : function(panel) {
				var me = this;
				me.toolBarPanel = panel;
			},

			/**
			 * 获取业务工具条panel
			 * @return {Panel}
			 */
			getToolBarPanel : function() {
				var me = this;
				return me.toolBarPanel;
			},

			/**
			 * 设置工具条组件管理器
			 * @param {Object}toolBarComManager
			 *            
			 */
			setToolBarComManager : function(toolBarComManager) {
				var me = this;
				me.toolBarComManager = toolBarComManager;
			},
			/**
			 * 获取工具条组件管理器
			 * @return {Object}
			 */
			getToolBarComManager : function() {
				var me = this;
				return me.toolBarComManager;
			},
			
			/**
			 * 获取store 管理器，管理是以图层+组件唯一标识作为主键管理。
	         * @return {Object}
	         */
	        getStoreManager:function () {
	            var me = this;
	            return me.storeManager;
	        }
		});