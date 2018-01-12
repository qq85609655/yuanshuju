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
 * 注册画布缩放功能
 * 包含放大，缩小。
 */
Dep.framework.editor.plugin.containers.canvas.FigureZoom = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.FigureZoom",
	/**
	 * 绑定画布放大缩小事件
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container)
		//        me.container = container;
		canvas = container.getCanvas();

		//TODO 具体代码参考JBPM view.js
		me.container.regiestActions([{
			name : Dep.framework.editor.ACTION.CANVAS.ENLARGE,
			description : Dep.framework.editor.I18N.DESCRIPTION.ZOOM.ENLARGE,
			icon : Dep.framework.editor.PATH + "img/canvas/zoomEnlarge.png",
			keyCodes : [{
						metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
						keyCode : Dep.framework.editor.KEYCODE.UP,
						keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
					}],
			functionality : Ext.Function.bind(me.zoomCanvas, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ENLARGE]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ZOOM
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.REDUCE,
			description : Dep.framework.editor.I18N.DESCRIPTION.ZOOM.REDUCE,
			icon : Dep.framework.editor.PATH + "img/canvas/zoomReduce.png",
			keyCodes : [{
						metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
						keyCode : Dep.framework.editor.KEYCODE.DOWN,
						keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
					}],
			functionality : Ext.Function.bind(me.zoomCanvas, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.REDUCE]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ZOOM
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.REVERSION,
			description : Dep.framework.editor.I18N.DESCRIPTION.ZOOM.REVERSION,
			icon : Dep.framework.editor.PATH + "img/canvas/zoomReversion.png",
			//            keyCodes : [ {
			//                metaKeys : [ Dep.framework.editor.KEYCODE.META_KEY_CTRL ],
			//                keyCode : Dep.framework.editor.KEYCODE.V,
			//                keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
			//            } ],
			functionality : Ext.Function.bind(me.zoomCanvas, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.REVERSION]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ZOOM
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
		var me = this;
		// TODO
	},
	/**
	 *
	 * @param canvas
	 */
	zoomCanvas : function(canvas, alignType) {
		var me = this, figures = canvas.getSelection().getAll(), commandName = "", command = null, zoomFactor;
		switch (alignType) {
			case Dep.framework.editor.ACTION.CANVAS.ENLARGE :
				commandName = draw2d.command.CommandEnlarge;
				break;
			case Dep.framework.editor.ACTION.CANVAS.REDUCE :
				commandName = draw2d.command.CommandReduce;
				break;
			case Dep.framework.editor.ACTION.CANVAS.REVERSION :
				commandName = draw2d.command.CommandEnlarge;
				zoomFactor = 1;
				break;
			default :
				commandName = draw2d.command.CommandEnlarge;
				break;
		};
		if (commandName) {
			command = new commandName(canvas, zoomFactor);
		} else {
			throw "未能确定command"
		}
		me.getContainer().executeCommand(command);
	}
});