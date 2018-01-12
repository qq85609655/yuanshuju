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
 * 注册图元导出svg图片功能
 * 
 */
Dep.framework.editor.plugin.containers.canvas.LayerToTop = Dep.framework.editor.plugin.BasePlugin
		.extend({
			/**
			 * 插件名称
			 */
			NAME : "Dep.framework.editor.plugin.containers.canvas.LayerToTop",
			svgData:null,
			/**
			 * 
			 */
			init : function(container) {
				var me = this, canvas = null;
				me.setContainer(container)
				canvas = container.getCanvas();
				me.container.regiestActions([ {
					name : "layer_toTop",
					description : "返回最顶图层",
					icon : "Dep/metadata/resource/img/layer_toTop.png",
					functionality : Ext.Function.bind(me._layerToTop, me,
							[ canvas ]),
					group : "changeLayer"
				} ]);

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
				// TODO
			},
			/**
			 * 返回最上层图层
			 * 
			 * @param canvas
			 *            画布对象
			 * @private
			 */
			_layerToTop : function(canvas) {
				var me = this,editor =me.getEditor(),container = me.getContainer();
//				container.raiseEventSpanContainer("Dep.framework.editor.plugin.containers.Layer","backToTopLayer");
				container.executeActionSpanContainer ("Dep.framework.editor.plugin.containers.Layer","backToTopLayer", null);
			}
		});