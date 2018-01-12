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
 * 注册图元对齐功能
 * 包含左对齐，右对齐，中间对齐，上对齐，下对齐。
 */
Dep.framework.editor.plugin.containers.canvas.FigureAlign = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.FigureAlign",
	/**
	 *绑定一系列排序事件
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container)
		canvas = container.getCanvas();
		me.container.regiestActions([{
			name : Dep.framework.editor.ACTION.CANVAS.ALIGNLEFT,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.LEFT,
			icon : Dep.framework.editor.PATH + "img/canvas/alignLeft.png",
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ALIGNLEFT]),
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNLEFT),
			group : Dep.framework.editor.I18N.Edit.GROUP.ALIGNH
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.CENTERH,
			icon : Dep.framework.editor.PATH + "img/canvas/alignCenterH.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ALIGNH
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.ALIGNRIGHT,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.RIGHT,
			icon : Dep.framework.editor.PATH + "img/canvas/alignRight.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNRIGHT),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ALIGNRIGHT]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ALIGNH
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.ALIGNTOP,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.TOP,
			icon : Dep.framework.editor.PATH + "img/canvas/alignTop.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNTOP),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ALIGNTOP]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ALIGNV
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERV,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.CENTERV,
			icon : Dep.framework.editor.PATH + "img/canvas/alignCenterV.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERV),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERV]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ALIGNV
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.BOTTOM,
			icon : Dep.framework.editor.PATH + "img/canvas/alignBottom.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM]),
			group : Dep.framework.editor.I18N.Edit.GROUP.ALIGNV
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEH,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.DISTRIBUTEH,
			icon : Dep.framework.editor.PATH + "img/canvas/distributeH.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEH]),
			group : Dep.framework.editor.I18N.Edit.GROUP.DISTRIBUTE
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEV,
			description : Dep.framework.editor.I18N.DESCRIPTION.ALIGN.DISTRIBUTEV,
			icon : Dep.framework.editor.PATH + "img/canvas/distributeV.png",
			//                functionality:me.alignFigure.bind(me, canvas,Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM),
			functionality : Ext.Function.bind(me.alignFigure, me, [canvas,
							Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEV]),
			group : Dep.framework.editor.I18N.Edit.GROUP.DISTRIBUTE
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
	 * 根据不同的排序规则来创建不同的command进行排序
	 * @param canvas
	 * @param alignType
	 */
	alignFigure : function(canvas, alignType) {
		var me = this, figures = canvas.getSelection().getAll(), commandName = "", command = null;
		switch (alignType) {
			case Dep.framework.editor.ACTION.CANVAS.ALIGNLEFT :
				commandName = draw2d.command.CommandAlignLeft;
				break;
			case Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH :
				commandName = draw2d.command.CommandAlignHCenter;
				break;
			case Dep.framework.editor.ACTION.CANVAS.ALIGNRIGHT :
				commandName = draw2d.command.CommandAlignRight;
				break;
			case Dep.framework.editor.ACTION.CANVAS.ALIGNTOP :
				commandName = draw2d.command.CommandAlignTop;
				break;
			case Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERV :
				commandName = draw2d.command.CommandAlignVCenter;
				break;
			case Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM :
				commandName = draw2d.command.CommandAlignBottom;
				break;
			case Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEH :
				commandName = draw2d.command.CommandDistributedHorizontal;
				break;
			case Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEV :
				commandName = draw2d.command.CommandDistributedvertical;
				break;
		};

		if (commandName) {
			command = new commandName(canvas, figures);
		} else {
			throw "未能确定command"
		}
		me.getContainer().executeCommand(command);
	}
});