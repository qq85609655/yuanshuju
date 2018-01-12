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
Dep.framework.editor.plugin.containers.canvas.CanvasAddFigure = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.CanvasAddFigure",
	
	panel : null, //画布依赖的panel
	
	/**
	 * 初始化视口插件
	 */
	init : function(container) {
		var me = this, canvas = container.getCanvas();
		me.setContainer(container);
		me.setMethod();
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
	},	
	/**
	 * 更新方法
	 * @param container
	 */
	setMethod : function(){
		var me = this,canvas = me.getContainer();
		canvas.addFigureToCanvas= function(rec){
			try{//捕获异常，
				var me = this, viewModel = rec.getViewData(), viewData = null, figure = null, figureGroup = rec
						.getFigureGroup();
				if (!viewModel.get('viewData')) {
					// 默认图形数据
					viewData = {};
				} else {

					viewData = Ext.JSON.decode(viewModel.get('viewData'));
				}
				figure = rec.getShape();
				// TODO 为测试暂时的代码,以后需要替换为所有节点类的基类
//				figure.setId(rec.getId());
				if (figure instanceof Dep.framework.editor.figure.BaseNode) {
					me.getCanvas().add(figure,
							Number(viewData.x ? viewData.x : 0),
							Number(viewData.y ? viewData.y : 0));
					// 添加图元label
					figure.addLabelToFigure();
					figure.initDefaultPorts();
				} else if (figure instanceof draw2d.Port) {// 添加port
					me._addPortToFigure(viewData, figure, figureGroup);
				} else if (figure instanceof draw2d.Connection) { // 添加线条
					me._addConnectionToCanvas(viewData, figure, figureGroup,
							rec.isRecurrenceVerticle);
				} else {
					me.getCanvas().add(figure,
							Number(viewData.x ? viewData.x : 0),
							Number(viewData.y ? viewData.y : 0));
				}
				}catch(e){
//					console.error("有图元添加到画布失败。失败原因：" +e);
				}
		};
	}
});