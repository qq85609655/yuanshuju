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
 * 画布中选中图元
 * 
 */
Dep.framework.editor.plugin.containers.canvas.SelectFigure = Dep.framework.editor.plugin.BasePlugin
		.extend({
			/**
			 * 插件名称
			 */
			NAME : "Dep.framework.editor.plugin.containers.canvas.SelectFigure",
			svgData:null,
			/**
			 * 
			 */
			init : function(container) {
				var me = this, canvas = null;
				me.setContainer(container);
				canvas = container.getCanvas();
				container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent
						.bind(me));
			},

			/**
			 * 在容器加载完成之后注册事件。
			 * 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
			 * 
			 * @param {Editor}
			 *            editor 编辑器
			 */
			initEvent : function(editor) {
				var me = this;
				me.getContainer().regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.SELECT,me._onSelectFigure.bind(me),me,"Dep.framework.editor.plugin.containers.Canvas");
				// TODO
			},
			/**
			 * 画布中图元选中
			 * 
			 * @param canvas
			 *            画布对象
			 * @private
			 */
			_onSelectFigure : function(canvas,fg) {
				var me = this,editor =me.getEditor(),container = me.getContainer();
				console.log(fg);
				if(fg!=null && (fg.getFType()!="compLine"&&fg.getFType()!="line"&&fg.getFType()!="mdtype"&&fg.getFType()!="lettertype")){
					container.executeActionSpanContainer ("Dep.framework.editor.plugin.containers.Layer","updateFgBussData", fg.getId(),fg);
				}
			}
		});