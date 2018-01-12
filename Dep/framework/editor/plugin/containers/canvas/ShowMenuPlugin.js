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
if (!Dep.framework.editor.plugin.containers.canvas) {
	Dep.framework.editor.plugin.containers.canvas = {};
}

/**
 * 展示图元菜单 根据选中图元的菜单配置信息来展示其菜单
 */
Dep.framework.editor.plugin.containers.canvas.ShowMenuPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.ShowMenuPlugin",
	/**
	 * 是否默认创建添加port菜单
	 * 
	 * @type Boolean
	 */
	CREATEPORTMENU : false,
	/**
	 * 默认的添加port菜单的图片
	 * 
	 * @type String
	 */
	defaultPortIcon : "",
	/**
	 * 初始化插件
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container);
		// me.container = container;
		me.canvas = container.getCanvas();
		// TODO 实现可参考JBPM shapemenu.js
		container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent.bind(me));
		me.container.regiestActions([{
					name : "remove",
					description : Dep.framework.editor.I18N.DESCRIPTION.MODEL.REMOVE,
					icon : Dep.framework.editor.PATH + "images/remvoe.png",
					functionality : me.removeModel.bind(me)
				}]);
	},
	/**
	 * 测试代码
	 * @param {}
	 *            figure
	 */
	removeModel : function(figure) {
		var me = this, model = figure.getUserData(), isdeleteable = figure.isDeleteable
				? figure.isDeleteable()
				: "", portList = null;
		if (/* figure instanceof Dep.framework.editor.figure.BaseNode && */!isdeleteable) {
			me.getContainer().getEditor().executeAction(
					Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, model.fType, model);
			if (figure instanceof Dep.framework.editor.figure.BaseNode) {
				//如果该图元为节点图元,则判断该图元是否有业务节点,如果有的话,一起删除
				portList = figure.getBussPortList();
				if (portList.getSize() > 0) {
					portList.each(function(n, port) {
								me.removeModel(port);
							});
				}
			}
		} else {
			Dep.framework.editor.util.Msg.info(isdeleteable);
		}

	},
	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */
	initEvent : function(editor) {
		var me = this;
		me.getCanvas().on("contextmenu", function(canvas, args) {
					if (args.figure) {
						me.displayContextMenu(args.figure, args.x, args.y);
					}
				});
		// me.container.regiestOnEvent("ca_contextmenu", this.showMenu);
	},
	
	
	/**
    *
    */
   displayContextMenu : function(figure, x, y) {
       var me = this, model = figure.getUserData(), statusEnumMap = me
           ._getStatusEnums(model)/* 由图元解析其配置文件中statuEnums数组,然后将状态名作为key缓存 */;
       // 确定当前图元的状态
       var bussData = model.getBussData();
       if (!bussData) {
    	   console.error("没有业务数据");
    	   return;
       }
       //取业务状态属性
       var status = /*figure.getStatus()*/bussData.get(model.statusFieldName), contextMenus = model.contextMenus, statusMenuConfig = null, enableMenusMap = null, menu = new Ext.menu.Menu();
       if (!contextMenus) {
           return;
       }
       if (status) {
           statusMenuConfig = statusEnumMap[status];
           if (statusMenuConfig) {
        	   enableMenusMap = me._getEnableMenus(statusMenuConfig.enableMenus);
           }
       }
       me.currentEditFigure = figure;
       me.createMenus(menu, contextMenus, enableMenusMap);
       if (me.CREATEPORTMENU) {
			me._createPortMenus(menu, model.port);
		}
       menu.showAt(x, y);
   },
   /**
    *创建菜单
    */
   createMenus : function(menu, menuConfigs, statusMenuMap) {
       var me = this, subMenu;
       if (!menuConfigs) {
           return;
       }
       for (i in menuConfigs) {
           menuConfig = menuConfigs[i];
           if (!statusMenuMap) {
        	   menuConfig.hidden = false;//没有状态控制，模块是全部显示
           }else {
        	   if (statusMenuMap[menuConfig.name]) {//设置为显示
        		   menuConfig.hidden = false;
        	   }else {
        		   menuConfig.hidden = true;
        	   }
           }
           if (menuConfig.type == "group") {
               var subMenus = new Ext.menu.Menu();
               var config = Ext.apply({},menuConfig);
               me.createMenus(subMenus, config.menus,
                   statusMenuMap);
               var groupMenu = Ext.create("Ext.menu.Item", {
                   text : config.name,
                   hidden:config.hidden,
                   icon : config.icon,
                   menu:subMenus
               });
//               groupMenu.add(subMenus);
               menu.add(groupMenu);
               continue;
           }
           subMenu = me._createMenuItem(menuConfig);
           menu.add(subMenu);
       }
   },
   /**
    *
    */
   _getEnableMenus : function(enableMenus) {
       var enableMenuMap = {};
       if (!enableMenus){
    	   return enableMenuMap;
       }
       for ( var i in enableMenus) {
           var enableMenu = enableMenus[i];
           enableMenuMap[enableMenu] = enableMenu;
       }
       return enableMenuMap;
   },
   /**
    * 从模型对象中获取图元的状态配置
    *
    * @param {}
       *            model
    * @return {}
    */
   _getStatusEnums : function(model) {
       var me = this, statuEnums = model.statuEnums, i = 0, statusObj = null, statuEnumMap = {};
       if (!statuEnums) {
           return statuEnumMap;
       }
       for (i in statuEnums) {
           statusObj = statuEnums[i];
           if (statusObj && statusObj.code/* menuObj. type=="nomal" */) {// 处理默认的菜单配置项
               statuEnumMap[statusObj.code] = statusObj;
           }
       }
       return statuEnumMap;
   },

   /**
    * 根据配置生成一个menuItem对象
    *
    * @param {}
       *            menuConfig 菜单配置对象
    * @return {Ext.menu.Item}
    */
   _createMenuItem : function(menuConfig) {
       var me = this, action = null;
       if (!menuConfig || ! menuConfig.action) {
           return null;
       }

       action = me.getAction(menuConfig.action);
       if(!action) {
    	   return null;
       }
		// TODO action获取还未做
		return new Ext.menu.Item({
					text : menuConfig.name,
					 hidden:menuConfig.hidden,
					// disabled : true,
					handler : function() {
						// 此菜单的回调函数,默认参数为当前上下文菜单依赖的图元
						action.functionality.call(me, me.currentEditFigure);
					},
					icon : menuConfig.icon
		});
   },
	
	
	
	/**
	 * 将一个菜单组的所有菜单配置项整理到一个对象中方便取用
	 * 
	 * @param {}
	 *            menuConfig
	 * @return {}
	 */
	_createGroupMenuMap : function(menuConfig) {
		var me = this, menuObj = {}, menuMap = {}, i = 0;
		for (i in menuConfig.menus) {
			menuObj = menuConfig.menus[i];
			if (menuObj.name) {
				menuMap[menuObj.name] = menuObj;
			}
		}
		return menuMap;
	},
	/**
	 * 创建添加port的菜单
	 * 
	 * @param {}
	 *            shapeMenu
	 * @param {}
	 *            portConfig
	 */
	_createPortMenus : function(shapeMenu, portConfig) {
		var me = this, /* 创建一个添加port的父菜单,添加各种port的菜单均为此菜单的子菜单 */subMenu = null, menuSparator = new Ext.menu.Separator(), menuItem = new Ext.menu.Item(
				{
					text : "添加端口",
					icon : me.defaultPortIcon
				}), menu = new Ext.menu.Menu();

		if (!portConfig) {
			return;
		}
		if ($.isArray(portConfig) && portConfig.length > 0) {
			$.each(portConfig, function(n, config) {
						// 创建添加某一类port的菜单
						subMenu = me._createPortMenu(config);
						menu.add(subMenu);
					});
		}
		menuItem.setMenu(menu);
		// 添加一个分隔符
		shapeMenu.add(menuSparator);
		shapeMenu.add(menuItem);
	},
	/**
	 * 创建添加一种类型的port的菜单
	 * 
	 * @param {}
	 *            config
	 * @return {}
	 */
	_createPortMenu : function(config) {
		var me = this;
		return new Ext.menu.Item({
					text : config.name,
					handler : function() {
						me._addPortToFigure.call(me, config);
					},
					icon : config.icon
				});
	},
	/**
	 * 调用图元自己的方法添加port
	 * 
	 * @param {}
	 *            config
	 */
	_addPortToFigure : function(config) {
		var me = this, figure = me.getCurrentEditFigure();
		me.getContainer().getEditor().executeAction(
				Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null, config.fType, {
					"viewData" : {
						viewData : Ext.JSON.encode($.extend({
									parentId : figure.getId()
								}, config))
					},
					"bussData" : {}
				});
	},
	/**
	 * 获取当前编辑的图元,即展示的是那个图元的菜单
	 * 
	 * @return {}
	 */
	getCurrentEditFigure : function() {
		if (this.currentEditFigure) {
			return this.currentEditFigure;
		} else {
			throw "当前编辑的图元为空";
		}

	},
	/**
	 * 获取action
	 * 
	 * @param {}
	 *            name
	 * @return {}
	 */
	getAction : function(name) {
		return this.getContainer().getAction(name);
	},
	/**
	 * 获取该类关联的画布类
	 * 
	 * @returns {*}
	 */
	getCanvas : function() {
		if (this.canvas) {
			return this.canvas;
		} else {
			throw "该类关联的画布类未指定!";
		}
	}

});