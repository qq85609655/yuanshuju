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
 * 鼠标样式控制 主要有两种样式,一直是默认的鼠标样式,另一种是手型鼠标样式,用来拖动视口移动画布
 */
Dep.framework.editor.plugin.containers.canvas.MouseType = Dep.framework.editor.plugin.BasePlugin
		.extend({
			/**
			 * 插件名称
			 */
			NAME : "Dep.framework.editor.plugin.containers.canvas.MouseType",
			/**
			 * 绑定一系列排序事件
			 */
			init : function(container) {
				var me = this, canvas = null;
				me.setContainer(container)
				canvas = container.getCanvas();
				me.container.regiestActions([{
					name : Dep.framework.editor.ACTION.MOUSE.NORMAL,
					description : Dep.framework.editor.I18N.DESCRIPTION.MOUSE.DEFAULT,
					icon : Dep.framework.editor.PATH + "img/canvas/mouse.png",
					functionality : Ext.Function
							.bind(
									me.backToCanvas,
									me,
									[
											canvas,
											Dep.framework.editor.ACTION.CANVAS.ALIGNLEFT]),
					group : Dep.framework.editor.I18N.Edit.GROUP.CANVAS
				}, {
					name : Dep.framework.editor.ACTION.MOUSE.HAND,
					description : Dep.framework.editor.I18N.DESCRIPTION.MOUSE.HAND,
					icon : Dep.framework.editor.PATH + "img/canvas/hand.png",
					functionality : Ext.Function
							.bind(
									me.changeOutLineVisibility,
									me,
									[
											canvas,
											Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH]),
					group : Dep.framework.editor.I18N.Edit.GROUP.CANVAS
				}, {
					name : Dep.framework.editor.ACTION.MOUSE.OUTLINE,
					description : Dep.framework.editor.I18N.DESCRIPTION.MOUSE.OUTLINE,
					icon : Dep.framework.editor.PATH + "img/canvas/outLine.png",
					functionality : Ext.Function
							.bind(
									me.showHideOutLineWin,
									me,
									[
											canvas,
											Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH]),
					group : Dep.framework.editor.I18N.Edit.GROUP.CANVAS
				}]);
				container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE,
						me.initEvent.bind(me));
			},
			/**
			 * 返回画布编辑状态 当用户单击图元工具箱中的某个图元时,编辑器进入添加图元状态,单击此btn时,返回画布编辑状态
			 * 
			 * @param {}
			 *            canvas
			 */
			backToCanvas : function(canvas) {
				var me = this;
				canvas.getOutOfAddLinkState(null, false);
				// me.getContainer().raiseEvent(Dep.framework.editor.EVENT.CANVAS.AFTERADDAFIGURE);
				me.getContainer().raiseEvent(Dep.framework.editor.EVENT.CANVAS.MOUSETYPEDEFAULT );
			},
			/**
			 * 切换视口可见性
			 * 
			 * @param {}
			 *            canvas
			 */
			changeOutLineVisibility : function(canvas) {
				var me = this;
				canvas.initDragDropCanvas();
				me.getContainer().raiseEvent(Dep.framework.editor.EVENT.CANVAS.MOUSETYPEHAND);
			},
			/**
			 * 展示或者隐藏视口窗
			 */
			showHideOutLineWin : function(){
			   var me=this;
			  	me.getContainer().raiseEvent(Dep.framework.editor.EVENT.CANVAS.SHOWHIDEOUTLINE);
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
				// TODO
			}
		});