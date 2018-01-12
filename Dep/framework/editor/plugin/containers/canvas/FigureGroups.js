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
 * 注册图元分组功能
 * 包含组合，反组合。
 */
Dep.framework.editor.plugin.containers.canvas.FigureGroups = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.FigureGroups",
	/**
	 * 绑定组合和反组合事件以及其快捷键
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container)
		//        me.container = container;
		canvas = container.getCanvas();

		//TODO 具体代码参考JBPM grouping.js
		me.container.regiestActions([{
					name : Dep.framework.editor.ACTION.CANVAS.GROUP,
					description : Dep.framework.editor.I18N.DESCRIPTION.GROUP.GROUP,
					icon : Dep.framework.editor.PATH + "img/canvas/shape_group.png",
					keyCodes : [{
								metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
								keyCode : Dep.framework.editor.KEYCODE.G,
								keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
							}],
					functionality : Ext.Function.bind(me.group, me, [canvas]),
					group : Dep.framework.editor.I18N.Edit.GROUP.GROUP
				}, {
					name : Dep.framework.editor.ACTION.CANVAS.UNGROUP,
					description : Dep.framework.editor.I18N.DESCRIPTION.GROUP.UNGROUP,
					icon : Dep.framework.editor.PATH + "img/canvas/shape_ungroup.png",
					keyCodes : [{
								metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
								keyCode : Dep.framework.editor.KEYCODE.U,
								keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
							}],
					functionality : Ext.Function.bind(me.unGroup, me, [canvas]),
					group : Dep.framework.editor.I18N.Edit.GROUP.GROUP
				}]);

		container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent.bind(me));

	},
	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */
	initEvent : function(editor) {
		// TODO  画布中选中图元时,更改btn的状态
		//        ungroupButton.prop("disabled",!(figure instanceof draw2d.shape.composite.Group) );
		//        groupButton.prop("disabled", !(canvas.getSelection().getAll().getSize()>=2) );
	},
	/**
	 *
	 * @param canvas
	 */
	group : function(canvas) {
		var me = this, figures = canvas.getSelection().getAll()
		this.getContainer().executeCommand(new draw2d.command.CommandGroup(
				canvas, figures));
	},
	/**
	 *
	 * @param canvas
	 */
	unGroup : function(canvas) {
		var me = this, groupFigure = canvas.getSelection().getAll()
				.getFirstElement();
		if (groupFigure instanceof draw2d.shape.composite.Group) {
			this.getContainer()
					.executeCommand(new draw2d.command.CommandUngroup(canvas,
							groupFigure));
		} else {
			throw "未能正确获取组合图元";
		}

	}
});