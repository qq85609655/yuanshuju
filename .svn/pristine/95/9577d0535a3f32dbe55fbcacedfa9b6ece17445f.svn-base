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
 * 注册显示图元的提示信息功能。此插件实现功能优先级较低。
 */
Dep.framework.editor.plugin.containers.canvas.FigureOverlay = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.FigureOverlay",
	/**
	 * 初始化对象
	 */
	init : function(container) {
        var me = this, canvas=null;
        me.setContainer(container)
//        me.container = container;
        canvas = container.getCanvas();
        container.on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE, me.initEvent
            .bind(me));

	},
	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */
	initEvent : function(editor) {
		var me = this;
		// TODO 监听图元聚焦事件，显示图元提示信息。 
	}
	
});