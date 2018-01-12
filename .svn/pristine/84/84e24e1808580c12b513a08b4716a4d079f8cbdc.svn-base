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
if (!Dep.framework.editor.plugin.containers.toolbox) {
	Dep.framework.editor.plugin.containers.toolbox = {};
}
/**
 * 此插件负责：
 * 渲染查询工具条界面
 * 根据条件查询工具条
 * 
 */
Dep.framework.editor.plugin.containers.toolbox.QueryToolItem = Dep.framework.editor.plugin.BasePlugin.extend({
	NAME : "Dep.framework.editor.plugin.containers.toolbox.QueryToolItem",
	container : null,
	editor : null,
	/**
	 * @param {Editor}
	 *            container 编辑器
	 */
	init : function(container) {
		var me = this;
		me.container = container;
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
		// TODO
	}

});