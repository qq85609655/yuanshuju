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
Dep.framework.editor.base.BasePluginContainer = Dep.framework.editor.base.EventSource.extend({
	NAME : "Dep.framework.editor.base.BasePluginContainer",
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.base.BasePluginContainer"),
	/**
	 * @cfg 配置信息
	 */
	config : null,
	/**
	 * @property 管理容器内所有插件
	 */
	pluginManager : null,

	/**
	 * @property 管理所有的子容器
	 */
	childrenContainer : null,

	/**
	 * @property 父容器
	 */
	parentContainer : null,

	/**
	 * @property action 管理器
	 */
	actionContainer : null,
	/**
	 * 容器关联的编辑器
	 */
	editor : null,

	/**
	 * @param {parent}
	 *            parent 容器
	 */
	init : function(parent, pluginData) {
		var me = this;
		me._super();
		me.setParentContainer(parent);
		// me.initEventListener();
		me.pluginManager = new Dep.framework.editor.manager.PluginManager();
		me.childrenContainer = new Dep.framework.editor.manager.ContainerManager();
		me.actionContainer = new Dep.framework.editor.manager.BaseManager();

		// 所有插件安装完毕之后，注册键盘事件监听
		if (me instanceof Dep.framework.editor.base.Editor) {
			me.regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
				me.initKeyEvents.bind(me));
		} else {
			me.regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
					me.initKeyEvents.bind(me),me,'Dep.framework.editor.base.Editor');
		}
	},

	/**
	 * 获取类名
	 * 
	 * @return {}
	 */
	getClassName : function() {
		return this.NAME;
	},

	/**
	 * 安装容器插件
	 * 
	 * @param {Dep.framework.editor.base.Editor}
	 *            parent 编辑器的
	 * @param {Object}
	 *            pluginDatas 插件配置信息
	 */
	installPlugins : function(parent, pluginDatas) {
		var me = this,number;
		// TODO 如果是开发模式，单个加载JS文件，如果是发布模型，每个容器的仅有一个plugin压缩JS文件
		if (!pluginDatas instanceof Array) {
			me.logger.error('插件需要是数组对象,失败的插件为：' +parent.NAME);
			return;
		}
		me.logger.debug('[#installPlugins]安装插件配置信息为：==============================');
		me.logger.debug(pluginDatas);
		number = pluginDatas.length;
		for (var i = 0; i < number;i++) {
			me.installPlugin(parent, pluginDatas[i]);
		}
	},

	/**
	 * 安装单个插件
	 * 
	 * @param {Dep.framework.editor.base.Editor}
	 *            editor 编辑器的
	 * @param {Object}
	 *            pluginData 插件配置信息
	 */
	installPlugin : function(parent, pluginData) {
		
		var me = this, plugClassName = null, plugin = null;
		try {
		// TODO 校验数据
		// TODO 如果是开发模式，单个加载JS文件，如果是发布模型，每个容器都仅有一个plugin压缩JS文件
		// Ext.loadScript(pluginData.src);
		// 压缩模式时，插件文件不在此加载
		if (pluginData.src) {
			Ext.Loader.loadScriptFile(pluginData.src, Ext.emptyFn, null, me,
					true);
		}
		//判断名称属性，名称是不要配置项
		if (!pluginData.name) {
			me.logger.error('name属性是插件的必要属性' );
			return;
		}
		
		if (typeof pluginData.name == 'string') {
			plugClassName = eval(pluginData.name);
		}
		
		//查看关联的类是否已经加载
		if (!plugClassName) {
			me.logger.error('找不到该插件，无法初始化，插件名称为：' + pluginData.name );
			return;
		}
		// 创建插件类
		plugin = new plugClassName(me, pluginData);
		// // 初始化插件类
		// plugin.init(me, pluginData);

		if (plugin instanceof Dep.framework.editor.plugin.ContainerPlugin) {
			// 如果是容器插件，安装子插件
			if (pluginData.plugins && plugin.installPlugins) {
				// 插件容器继续安装子插件,作用域为插件容器
				plugin.installPlugins(plugin, pluginData.plugins);
			}
			// 如果是容器插件，注册到编辑器容器中
			if (me.getEditor().regiestContainer) {
				me.getEditor().regiestContainer(plugin.getClassName(), plugin);
			}
			// 同时作为子容器存放。
			me.childrenContainer.put(plugin.getClassName(), plugin);
		}

		// 存入插件管理器中
		me.pluginManager.put(pluginData.name, plugin);
		} catch (e) {//安装插件失败时，写日志，继续安装其他插件
			console.error('安装插件失败，失败的插件为：' + (pluginData ? pluginData.name: '未知'));
			me.logger.error(e);
			console.error(e);
		}
	},

	/**
	 * 注册事件监听
	 * 
	 * @parm {String} containerId 容器注册路径。以编辑器类根目录
	 * @parm {String} eventName 事件名称
	 * @parm {String} action 响应函数
	 * @parm {container} context 上下文，即scope
	 */
	regiestOnEvent : function(eventName, action, context, containerId) {
		var me = this;
		if (!containerId) {
			me.on(eventName, action, context);
			return true;
		}
		// TODO 向其他容器注册事件。
		if (me.getEditor() && me.getEditor().getContainer
				&& me.getEditor().getContainer(containerId)) {
			me.getEditor().getContainer(containerId).on(eventName, action,
					context);
			return true;
		}
		return false;
	},

	/**
	 * 发出事件
	 * 
	 * @parm {String} eventName 事件名称
	 * @parm {Object...} args 事件源 （可以多个参数）
	 */
	raiseEvent : function(eventName, args) {
		var me = this,
		// 取参数
		newArgs = Array.prototype.slice.call(arguments);
		me.fireEvent.apply(me, newArgs);
		return true;

	},

	/**
	 * 跨容器发出事件
	 * 
	 * @parm {String} containerId 容器编号
	 * @parm {String} eventName 事件名称
	 * @parm {Object...} args 事件源
	 */
	raiseEventSpanContainer : function(containerId, eventName, args) {
		var me = this, container,
		// 取参数
		newArgs = Array.prototype.slice.call(arguments, 1);
		if (!containerId) {
			me.fireEvent.apply(me, newArgs);
			return true;
		}
		// 向其他容器提出发送事件的请求。
		if (me.getEditor() && me.getEditor().getContainer
				&& me.getEditor().getContainer(containerId)) {
			container = me.getEditor().getContainer(containerId);
			container.fireEvent.apply(container, newArgs);
			return true;
		}
		return false;

	},

	/**
	 * 注册action
	 * 
	 * @parm {String} actionKey action名
	 * @parm {Obj} action action对象
	 */
	regiestAction : function(actionKey, action) {
		var me = this, key = null, doAction = null;
		if (typeof actionKey == "object") {
			key = actionKey.name;
			doAction = actionKey;
		} else {
			key = actionKey;
			doAction = action;
		}
		if (me.actionContainer.get(key)) {//判断是否已经存在同key的action
			throw "[Dep.framework.editor.base.BasePluginContainer#regiestAction]同名的action已经存在,action名称为："+key;
		}
		me.actionContainer.put(key, doAction);
	},
	/**
	 * 同时注册多个事件
	 * 
	 * @param actions
	 * @return true： 注册成功； false：注册失败
	 */
	regiestActions : function(actions) {
		var me = this;
		// 如果不是一个集合,则返回false
		if (!Ext.isArray(actions)) {
			return false;
		}
		Ext.each(actions, function(action) {
					me.regiestAction(action);
				}, me);
		return true;

	},
	/**
	 * 获取action
	 * 
	 * @param {String}
	 *            actionKey action主键
	 * @return {Object} action action对象
	 */
	getAction : function(actionKey) {
		var me = this;
		return me.actionContainer.get(actionKey);
	},
	/**
	 * 执行命令
	 * 
	 * @param {draw2d.command.Command}
	 *            command 命令
	 */
	executeCommand : function(command) {
		if (typeof command === "undefined"){
			me.logger.debug('[#regiestAction]执行的命令不能为空');
			return ;
		}

		// nothing to do
		if (command === null)
			return; // silently

		// return if the command can't execute or it doesn't change the model
		// => Empty command
		if (command.canExecute() === false)
			return;

		command.execute();
		//
		this.fireEvent(Dep.framework.editor.EVENT.EXCUTE_COMMAND, command);
	},

	/**
	 * 执行action
	 * 
	 * @param {String}
	 *            action key
	 * @param {Object...}
	 *            执行action参数,可以有多个
	 */
	executeAction : function(actionKey, param) {
		var me = this, action, newArgs = Array.prototype.slice.call(arguments,
				1);
		if (typeof actionKey === "undefined") {
			throw "[Dep.framework.editor.base.BasePluginContainer#executeAction] actionKey参数不能为空！";
		}
		action = me.getActionManager().get(actionKey);
		if (!action) {
			me.logger.warn("[Dep.framework.editor.base.BasePluginContainer#executeAction] 没有找到:" + actionKey);
			return;
		}
		if (action.functionality) {
			action.functionality.apply(me, newArgs)/* .bind(context) */;
		}
	},
	
	/**
	 * 跨容器执行action
	 * 
	 * @param {String}
	 *            action key
	 * @param {Object...}
	 *            执行action参数,可以有多个
	 */
	executeActionSpanContainer : function(containerId,actionKey, param) {
		var me = this, container,
		// 取参数
		newArgs = Array.prototype.slice.call(arguments, 1);
		if (!containerId) {
			me.executeAction.apply(me, newArgs);
			return true;
		}
		// 向其他容器提出发送事件的请求。
		if (me.getEditor() && me.getEditor().getContainer
				&& me.getEditor().getContainer(containerId)) {
			container = me.getEditor().getContainer(containerId);
			container.executeAction.apply(container, newArgs);
			return true;
		}
		return false;
		
	},

	/**
	 * 获取action
	 * 
	 * @return {Object} action 管理器
	 */
	getActionManager : function() {
		var me = this;
		if (!me.actionContainer) {
			throw "[Dep.framework.editor.base.BasePluginContainer#getActonManager]获取不到action管理类！";
		}
		return me.actionContainer;
	},

	/**
	 * 设置父容器
	 * 
	 * @param {Container}container
	 *            父容器
	 */
	setParentContainer : function(container) {
		var me = this;
		me.parentContainer = container;
	},

	/**
	 * @return 返回父容器对象
	 */
	getParentContainer : function() {
		var me = this;
		if (!me.parentContainer) {
			throw "[Dep.framework.editor.base.BasePluginContainer#getParentContainer]没有父容器！";
		}
		return me.parentContainer;
	},

	/**
	 * 初始化键盘监听
	 */
	initKeyEvents : function() {
		var me = this,containerPanel = null;
		// 事件队列
		me._eventsQueue = [];
//		// 键盘监听集合
//		me.eventListeners = new Dep.framework.editor.manager.BaseManager();

		// 监听键盘事件
		if(me.getContainerPanel){
			containerPanel = me.getContainerPanel();
		}
		if(!containerPanel){
			return;
		}
		var domElement = containerPanel.getEl( );
		if (!domElement) {
			return;
		}
		var dom = Ext.getDom(domElement);
		if (!dom) {//获取容器的dom对象
			return;
		}
		console.log(me.NAME);
		/*document.documentElement*/dom.addEventListener(Dep.framework.editor.EVENT.EVENT_KEYUP,
				me._catchKeyUpEvents.bind(me), false);
		/*document.documentElement*/dom.addEventListener(Dep.framework.editor.EVENT.EVENT_KEYDOWN,
				me._catchKeyDownEvents.bind(me), false);

		//Enable Key up and down Event
		me._keydownEnabled = true;
		me._keyupEnabled = true;
		// 注册action事件监听
		me._registerActionOnKeyEvents();

	},
	/**
	 * 捕捉键盘up事件
	 * 
	 * @param event
	 *            键盘up事件名
	 * @private
	 */
	_catchKeyUpEvents : function(event) {
		var me = this;
		if (!me._keyupEnabled) {
			return;
		}
		/* assure we have the current event. */
		if (!event)
			event = window.event;

		/* Create key up event type */
		var keyUpEvent = this._createKeyCombEvent(event,
				Dep.framework.editor.KEYCODE.KEY_ACTION_UP);

		me.logger.debug("[#_catchKeyUpEvents]Key Event to handle: %0:", keyUpEvent);

		/* forward to dispatching. */
		me._handleEvents({
					type : keyUpEvent,
					event : event
				});
	},

	/**
	 * 捕捉键盘down事件
	 * 
	 * @param {Event}e键盘down事件名
	 * @private
	 */
	_catchKeyDownEvents : function(event) {
		var me = this;
		if (!me._keydownEnabled) {
			return;
		}
		// 確保获取了实际事件对象
		if (!event)
			event = window.event;

		// 创建键盘按下事件对象。
		var keyDownEvent = me._createKeyCombEvent(event,
				Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN);

		me.logger.debug("[#_catchKeyDownEvents]Key Event to handle: %0;", keyDownEvent);

		// 处理事件
		me._handleEvents({
					type : keyDownEvent,
					event : event
				});
	},

	/**
	 * @private
	 * 
	 * @param {Event}
	 *            keyEvent
	 * @param {String}
	 *            keyAction
	 * @return {String}返回创建的事件唯一标识
	 */
	_createKeyCombEvent : function(keyEvent, keyAction) {

		var pressedKey = keyEvent.which || keyEvent.keyCode;

		// 事件名
		var eventName = "key.event";

		// action类型（up/down）
		if (keyAction) {
			eventName += "." + keyAction;
		}

		// 是否按下ctrl按钮
		if (keyEvent.ctrlKey || keyEvent.metaKey) {
			eventName += "." + Dep.framework.editor.KEYCODE.META_KEY_CTRL;
		}

		// 是否按下alt按钮
		if (keyEvent.altKey) {
			eventName += "." + Dep.framework.editor.KEYCODE.META_KEY_ALT;
		}

		// 是否按下shift按钮
		if (keyEvent.shiftKey) {
			eventName += "." + Dep.framework.editor.KEYCODE.META_KEY_SHIFT;
		}

		// 返回事件名
		return eventName + "." + pressedKey;
	},
	/**
	 * @private
	 * @param {Event}event
	 * @param {Object}obj
	 * @return {Boolean}
	 */
	_handleEvents : function(event, obj) {
		var me = this;
		me.logger.debug("[#_handleEvents]Dispatching event type:", event.type, obj);

		/**
		 * 事件立即执行
		 */
		if (event.forceExecution) {
			me._executeEventImmediately({
						event : event,
						arg : obj
					});
		} else {// 放入队列
			me._eventsQueue.push({
						event : event,
						arg : obj
					});
		}

		if (!me._queueRunning) {// 执行事件循环处理函数
			me._executeEvents();
		}

		return false;
	},

	/**
	 * 立即执行事件
	 * 
	 * @param {Event}eventObj
	 * @private
	 */
	_executeEventImmediately : function(eventObj) {
		var me = this;
		// 发出事件处理响应
		me.fireEvent(eventObj.event.type, eventObj.arg);
	},
	/**
	 * 处理事件响应
	 * 
	 * @private
	 */
	_executeEvents : function() {
		var me = this;
		me._queueRunning = true;
		while (me._eventsQueue.length > 0) {
			var val = me._eventsQueue.shift();
			me._executeEventImmediately(val);
		}
		me._queueRunning = false;
	},

	/**
	 * @private
	 * 注册action的事件监听
	 */
	_registerActionOnKeyEvents : function() {
		var me = this, actions = me.getActionManager().values(), action;
		for (var i in actions) {
			action = actions[i];
			if (action.keyCodes) {
				action.keyCodes.forEach(function(keyComb) {
							var eventName = me._getEventNameByKeyComb(keyComb);
							// 注册事件
							me.regiestOnEvent(eventName, action.functionality);

						}.bind(me));
			}

		}
		// IE中没有forEach方法
		// actions.forEach(function(action) {}.bind(me));
	},
	/**
	 * 根據keycode设置，获取相应的响应函数
	 * @param keyComb
	 * @return {String}
	 * @private
	 */
	_getEventNameByKeyComb : function(keyComb) {
		var me = this;
		var eventName = "key.event";

		eventName += '.' + keyComb.keyAction;

		if (keyComb.metaKeys) {
			// 是否按下ctrl建
			if (keyComb.metaKeys.indexOf(Dep.framework.editor.KEYCODE.META_KEY_CTRL) > -1) {
				eventName += "." + Dep.framework.editor.KEYCODE.META_KEY_CTRL;
			}

			// 是否按下alt键
			if (keyComb.metaKeys.indexOf(Dep.framework.editor.KEYCODE.META_KEY_ALT) > -1) {
				eventName += '.' + Dep.framework.editor.KEYCODE.META_KEY_ALT;
			}

			// 是否按下shift键
			if (keyComb.metaKeys.indexOf(Dep.framework.editor.KEYCODE.META_KEY_SHIFT) > -1) {
				eventName += '.' + Dep.framework.editor.KEYCODE.META_KEY_SHIFT;
			}
		}

		// 设置keycode
		if (keyComb.keyCode) {
			eventName += '.' + keyComb.keyCode;
		}

		me.logger.debug("[#_getEventNameByKeyComb]Register Plugin on Key Event:", eventName);
		return eventName;

	},

	/**
	 * 设置此容器插件所属编辑器类
	 * 
	 * @param {}
	 *            editor
	 */
	setEditor : function(editor) {
		this.editor = editor;
	},
	/**
	 * 获取此容器插件所属编辑器类
	 * 
	 * @return {}
	 */
	getEditor : function() {
		var me = this, editor;
		if (me.editor) {
			editor = me.editor;
		} else if (me instanceof Dep.framework.editor.base.Editor) {
			editor = me;
		} else if (me.getParentContainer() instanceof Dep.framework.editor.base.Editor) {
			editor = me.getParentContainer();
		} else {
			editor = me.getParentContainer().getEditor();
		}
		if (editor) {
			me.setEditor(editor);
		}
		return editor;
	},
	/**
	 * 根据插件名称获取插件实体
	 * 
	 * @param name
	 *            插件名称
	 * @returns {Dep.framework.editor.plugin.BasePlugin}
	 */
	getPluginByName : function(name) {
		var me = this;
		if (me.pluginManager) {
			return me.pluginManager.get(name);
		} else {
			throw "插件管理器未初始化";
		}
	}
});