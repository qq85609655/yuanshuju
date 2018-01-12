/**
 * container 为根容器，即editor 此插件需要： 1.根据编辑器的配置信息初始化界面信息。 2.初始化事件监听。
 * 
 * 此容器插件关联的配置文件为-》Dep/framework/editor/defaultconfig/ViewToolBar.json文件。配置文件详情： {
 * "padding" : "5 10 5 10", "details": [ {
 * 
 * "lType": "topo", //图层类型，与图层插件中的记录type属性对应，即此配置供拓扑图图层使用 "items": [ { "action":
 * "figures_alignLeft" //图形的操作命令：左对齐 },{ "action": "figures_alignCenterH"
 * //图形的操作命令：水平居中对齐 },{ "action": "figures_alignRight" //图形的操作命令：右对齐 },{
 * "action": "figures_alignTop" //图形的操作命令：上对齐 },{ "action":
 * "figures_alignCenterV" //图形的操作命令：垂直居中对齐 },{ "action": "figures_alignBottom"
 * //图形的操作命令：下对齐 },{ "action": "canvas_enlarged" //图形的操作命令：放大 },{ "action":
 * "canvas_reduce" //图形的操作命令：缩小 },{ "action": "canvas_reversion"
 * //图形的操作命令：恢复原始大小 },{ "action": "editor_undo", //图形的操作命令：回退
 * "container":"Dep.framework.editor.base.Editor" },{ "action": "editor_redo", //图形的操作命令：前进
 * "container":"Dep.framework.editor.base.Editor" },{ "action": "canvas_exportsvg" //图形的操作命令：导出svg图 } ] } ] }
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
Dep.framework.editor.plugin.containers.ViewToolBar = Dep.framework.editor.plugin.ContainerPlugin.extend({
	NAME : "Dep.framework.editor.plugin.containers.ViewToolBar",
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.plugin.containers.ViewToolBar"),
	/**
	 * @property {Dep.framework.editor.manager.BaseManager} toolBarConfig 工具条原始配置信息
	 */
	toolBarConfig : null,
	/**
	 * @property {Dep.framework.editor.manager.BaseManager} toolBarComManager 工具条配置信息转换成的组件配置信息
	 */
	toolBarComConfig : null,
	/**
	 * 初始化图形工具条容器插件
	 * 
	 * @param {pluginData}
	 *            pluginData 插件配置信息
	 */
	init : function(parent, pluginData) {
		var me = this, configs;
		me._super(parent, pluginData);
		me._initData(pluginData);
		me._initView(pluginData);
		// 监听
		me.getEditor().on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
				me._initEvents.bind(me));
	},
	/**
	 * 初始化配置信息
	 * 
	 * @param configs
	 * @private
	 */
	_initData : function(pluginData) {
		var me = this, config, configs;
		// 缓存toolbar配置信息
		me.toolBarConfig = new Dep.framework.editor.manager.BaseManager();
		me.toolBarComConfig = new Dep.framework.editor.manager.BaseManager();
		// 根据分组缓存各个action
		me.groupAction = new Dep.framework.editor.manager.BaseManager();
		configs = pluginData.details;
		if ((!configs) || (!configs instanceof Array)) {
			throw "[Dep.framework.editor.plugin.containers.ViewToolBar#_initData]图形工具条没有配置任何信息！";
		}

		for (var i in configs) {
			config = configs[i];
			if (!config.lType) {
				config.lType = "default";
			}
			me.toolBarConfig.put(config.lType, config);
		}
	},

	/**
	 * 初始化界面panel
	 * 
	 * @private
	 */
	_initView : function(pluginData) {
		var me = this, containerPanel, panel, parentContainer = me
				.getParentContainer();
		if (parentContainer && (parentContainer instanceof Dep.framework.editor.plugin.containers.Canvas)) {
			containerPanel = parentContainer.getContainerPanel();
			// 创建panel
			panel = Ext.create("Ext.toolbar.Toolbar", {
						autoScroll : true,
						border : '0 0 0 0',
						padding : pluginData.padding
								? pluginData.padding
								: "5 5 5 5"

					});
			  me.setContainerPanel(panel);
			me.setToolBarPanel(panel);
			// 添加到画布
			containerPanel.insertDocked(top, panel);
			return;
		}

		throw "[Dep.framework.editor.plugin.containers.ViewToolBar#_initData]找不到正确的父容器对象!";
	},
	/**
	 * 设置业务工具条panel
	 * 
	 * @param panel
	 */
	setToolBarPanel : function(panel) {
		var me = this;
		me.toolBarPanel = panel;
	},
	/**
	 * 获取业务工具条panel
	 * 
	 * @return {Panel}
	 */
	getToolBarPanel : function() {
		var me = this;
		return me.toolBarPanel;
	},
	/**
	 * @private 在容器加载完成之后注册事件。
	 *          注意，必须要在容器加载完成之后注册事件，否则有可能会发生容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */
	_initEvents : function(editor) {
		var me = this;
		me.regiestOnEvent(Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER,
				me.changeToolBarCom.bind(me), me, "Dep.framework.editor.plugin.containers.Layer");
	},

	/**
	 * 根据图层的不同更新工具条配置信息
	 * 
	 * @param{Object} layerObj 返回的图层对象
	 */
	changeToolBarCom : function(layerObj) {
		var me = this, config, comConfig;
		me.getToolBarPanel().removeAll(false);
		me.getToolBarPanel().hide();
		if (!layerObj) {
			me.logger.debug("[Dep.framework.editor.plugin.containers.ViewToolBar#changeGridCfg]没有选中任何图层！");
			return;
		}

		if (!layerObj.type) {
			layerObj.type = 'default';
		}
		// 先从缓存获取
		comConfig = this.getToolBarComConfig().get(layerObj.type);
		// 缓存没有，读取配置信息
		try {
			if (!comConfig) {
				config = me.toolBarConfig.get(layerObj.type);

				if (!config) {// 如果没有配置，取默认配置
					config = me.toolBarConfig.get('default');
				}
				if(!config){
					me.logger.debug("[Dep.framework.editor.plugin.containers.ViewToolBar#changeGridCfg]当前图层没有配置图形工具信息！");
					return;
				}
				comConfig = me._parseConfigToComConfig(config);
				this.getToolBarComConfig().put(layerObj.type, comConfig);
			}
		} catch (err) {
			me.logger.error(err);
		} finally {
			// 更新界面,移除所有控件，但是不销毁控件

			// 填写新控件
			if (!comConfig) {
				// me.getToolBarPanel().hide();
				return;
			}
			if (comConfig.length == 0) {
				// me.getToolBarPanel().hide();
				return;
			}
			me.getToolBarPanel().add(comConfig);
			me.getToolBarPanel().show();
		}
	},
	/**
	 * @private 解析图形工具条配置信息为图形工具条组件
	 * @param config
	 * 
	 * @return {Array}
	 */
	_parseConfigToComConfig : function(config) {
		if (!config) {
			me.logger.info( "[Dep.framework.editor.plugin.containers.ViewToolBar#changeToolBarCom]此图层没有配置图形工具信息!");
			return;
		}
		var me = this, comConfig, action, comConfigs = [], items = config.items;
		if (!(items instanceof Array)) {
			me.logger.error( "[Dep.framework.editor.plugin.containers.ViewToolBar#changeToolBarCom]配置信息不正确，无法切换图形!");
			return;
		}
		for (var i in items) {
			comConfig = items[i];
			if (!comConfig.container) {
				comConfig.container = 'Dep.framework.editor.plugin.containers.Canvas';
			}
			action = me._getConfigAction(comConfig);
			if (!action) {// 没有找到对应的action
				continue;
			}

			me.classifyGroupByAction(action);
		}

		me.getGroupAction().each(function(k, actionGroup) {
					$.each(actionGroup, function(n, action) {
								comConfig = me._transActonToCom(action);
								if (!comConfig) {// 生成控件失败
									return;
								}
								comConfigs.push(comConfig);
							});
					comConfigs.push(me.getSeparator());
				});

		me.getGroupAction().removeAll();
		// 删掉最后一个分隔符
		return comConfigs.slice(0, comConfigs.length - 1);

	},

	/**
	 * 根据action的所属的分组来缓存action
	 * 
	 * @param {}
	 *            action
	 */
	classifyGroupByAction : function(action) {
		var me = this, group = action.group, groupObj = me.getGroupAction()
				.get(group);
		if (groupObj) {
			groupObj.push(action);
		} else {
			groupObj = [action];
			me.getGroupAction().put(group, groupObj);
		}
	},
	/**
	 * 获取一个分隔符
	 * 
	 * @return {}
	 */
	getSeparator : function() {
		var sep = Ext.create('Ext.toolbar.Separator');
		return sep;
	},
	/**
	 * @private 根据组件的配置信息找出组件的action配置
	 * @param comConfig
	 *            组件配置信息
	 * @return {Object} 根据配置条目信息的action配置，获取
	 */
	_getConfigAction : function(comConfig) {
		var me = this, contaienr, action;
		contaienr = me.getEditor().getContainer(comConfig.container);
		if (!comConfig.action) {// 没有配置action
			return null;
		}
		action = contaienr.getAction(comConfig.action);
		return action;
	},
	/**
	 * @private 根据action的配置信息创建图元对象
	 * @param action
	 *            action对象
	 * @return {Component} 返回组件对象
	 */
	_transActonToCom : function(action) {
		var com = Ext.create('Ext.button.Button', {
					tooltip : action.description,
					icon : action.icon,
					handler : action.functionality
				});
		return com;
	},

	/**
	 * 设置配置信息
	 * 
	 * @param {Object}toolBarConfig
	 */
	setToolBarConfig : function(toolBarConfig) {
		var me = this;
		me.toolBarConfig = toolBarConfig;
	},
	/**
	 * 获取配置信息
	 * 
	 * @return {Object}
	 */
	getToolBarConfig : function() {
		var me = this;
		return me.toolBarConfig;
	},

	/**
	 * 设置工具条配置信息
	 * 
	 * @param {Object}toolBarComConfig
	 */
	setToolBarComConfig : function(toolBarComConfig) {
		var me = this;
		me.toolBarComConfig = toolBarComConfig;
	},
	/**
	 * 获取工具条配置信息
	 * 
	 * @return {Object}
	 */
	getToolBarComConfig : function() {
		var me = this;
		return me.toolBarComConfig;
	},
	/**
	 * 获取根据分组对action的分类
	 * 
	 * @return {}
	 */
	getGroupAction : function() {
		return this.groupAction;
	}

});