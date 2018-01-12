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
 * @author HeYuqing CanvasLayoutPlugin.js 2015年4月24日 上午9:26:35 注册画布的布局插件
 */

Dep.framework.editor.plugin.containers.canvas.CanvasLayoutPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.CanvasLayoutPlugin",
	/**
	 * 图元排序事件
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container);
		me.canvas = container.getCanvas();
		figures = null;
		
		me.container.regiestActions([{
			name : Dep.framework.editor.ACTION.CANVAS.LAYOUT.DEFAULT,
			description : Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.DEFAULT,
			icon : Dep.framework.editor.PATH + "img/canvas/soduku.png",
			functionality : Ext.Function.bind(me._doLayout, me, [null,
							Dep.framework.editor.I18N.LAYOUT.SODUKU]),
			group : Dep.framework.editor.I18N.Edit.GROUP.LAYOUT
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.LAYOUT.REFRESH,
			description : Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.REFRESH,
			icon : Dep.framework.editor.PATH + "img/canvas/refreshLayout.png",
			functionality : Ext.Function.bind(me._refreshLayout, me),
			group : Dep.framework.editor.I18N.Edit.GROUP.LAYOUT
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.LAYOUT.HORI,
			description : Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.HORI,
			icon : Dep.framework.editor.PATH + "img/canvas/defaultLayout.png",
			functionality : Ext.Function.bind(me._doLayout, me, [null,
							Dep.framework.editor.I18N.LAYOUT.HORIZONTAL]),
			group : Dep.framework.editor.I18N.Edit.GROUP.LAYOUT
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.LAYOUT.VERTTREE,
			description : Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.VERTTREE,
			icon : Dep.framework.editor.PATH + "img/canvas/vertTree.png",
			functionality : Ext.Function.bind(me._doLayout, me, [null,
							Dep.framework.editor.I18N.LAYOUT.VERTTREE]),
			group : Dep.framework.editor.I18N.Edit.GROUP.LAYOUT
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.LAYOUT.CIRCLE,
			description : Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.CIRCLE,
			icon : Dep.framework.editor.PATH + "img/canvas/XXX.png",
			functionality : Ext.Function.bind(me._doLayout, me, [null,
							Dep.framework.editor.I18N.LAYOUT.CIRCLE]),
			group : Dep.framework.editor.I18N.Edit.GROUP.LAYOUT
		}, {
			name : Dep.framework.editor.ACTION.CANVAS.LAYOUT.DOLAY,
			description : Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.DOLAY,
			icon : Dep.framework.editor.PATH + "img/canvas/XXX.png",
			functionality : Ext.Function.bind(me._doLayout, me),
			group : Dep.framework.editor.I18N.Edit.GROUP.LAYOUT
		}]);
		container.registLayout(Dep.framework.editor.I18N.LAYOUT.SODUKU,draw2d.command.CanvasSudokuLayoutCommand);
		container.registLayout(Dep.framework.editor.I18N.LAYOUT.VERTTREE,draw2d.command.CommandVerticalTreeLayout);
		container.registLayout(Dep.framework.editor.I18N.LAYOUT.HORIZONTAL,draw2d.command.CanvasHorizontalLayoutCommand);
		container.registLayout(Dep.framework.editor.I18N.LAYOUT.CIRCLE,draw2d.command.CanvasCircleLayoutCommand);
		
		container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent.bind(me));
	},

	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */
	initEvent : function(editor) {
	},
	/**
	 * Dep.framework.editor.I18N.LAYOUT.SODUKU 九宫格布局; Dep.framework.editor.I18N.LAYOUT.CIRCLE 圆形布局
	 * Dep.framework.editor.I18N.LAYOUT.HORIZONTAL 水平布局 根据不同的布局方式,调用不同的命令对画布上的图元经行布局排序
	 * 不对线性图元经行布局操作
	 * 
	 * @param canvas
	 */
	_doLayout : function(figures, layoutType) {
		var me = this,container=me.getContainer(), commandName = "", command = null,figure=null;
		commandName=container.getLayout(layoutType);
		if(! commandName){
		  commandName = draw2d.command.CanvasSudokuLayoutCommand;
		}
	/*	switch (layoutType) {
			case Dep.framework.editor.I18N.LAYOUT.SODUKU :
				commandName = draw2d.command.CanvasSudokuLayoutCommand;
				break;
			case Dep.framework.editor.I18N.LAYOUT.VERTTREE :
				commandName = draw2d.command.CommandVerticalTreeLayout;
				break;
			case Dep.framework.editor.I18N.LAYOUT.HORIZONTAL :
				commandName = draw2d.command.CanvasHorizontalLayoutCommand;
				break;
			case Dep.framework.editor.I18N.LAYOUT.CIRCLE :
				commandName = draw2d.command.CanvasCircleLayoutCommand;
				break;
			default :
				commandName = draw2d.command.CanvasSudokuLayoutCommand;
				break;
		};*/

		if (!(figures instanceof draw2d.util.ArrayList)) {
			figures = me._getLayoutNodes();
		}
		if (commandName) {
			command = new commandName(me.getContainer().getCanvasPanel(),
					figures);
		} else {
			throw "未能确定command";
		}
		me.getContainer().executeCommand(command);
//		me.canvas.setCurrentSelection(figures.get(0));
	},
	/**
	 * 刷新布局
	 */
	_refreshLayout : function() {
				var me = this, container = me.getContainer();
				container.getEditor().executeActionSpanContainer(
						'Dep.framework.editor.plugin.containers.Layer',
						'refreshLayout');
			},

	/**
	 * 从当前编辑图层中取出所有布局的节点
	 * 
	 * @return {draw2d.util.ArrayList}
	 */
	_getLayoutNodes : function() {
		var me = this, shape = null, editor = me.getContainer().getEditor(), editLayer = editor
				.getDataManager().getCurrentEditLayer(), modelList = editLayer
				.getAllDatas(false, false), nodes = new draw2d.util.ArrayList();
		$.each(modelList, function(n, model) {
					shape = model.getShape();
					if (shape instanceof Dep.framework.editor.figure.BaseNode) {
						nodes.add(shape);
					}
				})
		return nodes;
	}
});