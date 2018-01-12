/**
 * container 为根容器，即editor 此插件需要： 1.根据编辑器的配置信息初始化界面信息。 2.初始化画布的事件
 * 此容器插件关联的配置文件为-》cuseditor/Canvas.json文件
 * {该配置文件用来配置画布容器中的各个插件和子容器,各个插件和子容器都是相互独立的,每一个都可以独立配进来,各个插件和子容器通过事件通讯,其具体配置如下:
 * "containers": [//子容器配置项 { //图元工具箱子容器 "name":
 * "Dep.framework.editor.plugin.containers.toolbox", //子容器名称,作为子容器的唯一标识不可重复
 * "src": "Dep/framework/editor/plugin/containers/ToolBox.js",
 * //该子容器对应的js文件所在的位置 "config": "ToolBox.json" //该子容器的配置信息 }, {
 * //图形工具栏,具体配置信息参见图元工具箱 "name":
 * "Dep.framework.editor.plugin.containers.ViewToolBar", "src":
 * "Dep/framework/editor/plugin/containers/ViewToolBar.js", "config":
 * "ViewToolBar.json" }, { //业务工具栏,具体配置信息参见图元工具箱 "name":
 * Dep.framework.editor.plugin.containers.BussToolBar, "src":
 * "Dep/framework/editor/plugin/containers/BussToolBar.js", "config":
 * "BussToolBar.json" }], //所有插件类 "plugins": [{//粘贴板插件 "src":
 * "Dep/framework/editor/plugin/containers/canvas/ClipboardPlugin.js",
 * //该插件js文件的位置 "name":
 * "Dep.framework.editor.plugin.containers.canvas.ClipboardPlugin"
 * //该插件的名称,作为插件的唯一标识,不可重复 },{ // 导出图片插件 "src":
 * "Dep/framework/editor/plugin/containers/canvas/ExportToImg.js", "name":
 * "Dep.framework.editor.plugin.containers.canvas.ExportToImg" },{//图元排序 "src":
 * "Dep/framework/editor/plugin/containers/canvas/FigureAlign.js", "name":
 * "Dep.framework.editor.plugin.containers.canvas.FigureAlign" },{//图元组合 "src":
 * "Dep/framework/editor/plugin/containers/canvas/FigureGroups.js", "name":
 * "Dep.framework.editor.plugin.containers.canvas.FigureGroups"
 * },{//图元提示(tips),已启用 "src":
 * "Dep/framework/editor/plugin/containers/canvas/FigureOverlay.js", "name":
 * "Dep.framework.editor.plugin.containers.canvas.FigureOverlay" },{//图元放大缩小插件
 * "src": "Dep/framework/editor/plugin/containers/canvas/FigureZoom.js", "name":
 * "Dep.framework.editor.plugin.containers.canvas.FigureZoom" },{//展示图元上下文菜单
 * "src": "Dep/framework/editor/plugin/containers/canvas/ShowMenuPlugin.js",
 * "name": "Dep.framework.editor.plugin.containers.canvas.ShowMenuPlugin"
 * },{//视口插件 "src":
 * "Dep/framework/editor/plugin/containers/canvas/OutlinePlugin.js", "name":
 * "Dep.framework.editor.plugin.containers.canvas.OutlinePlugin" },{//画布布局
 * "src": "Dep/framework/editor/plugin/containers/canvas/CanvasLayoutPlugin.js",
 * "name": "Dep.framework.editor.plugin.containers.canvas.CanvasLayoutPlugin" }] }
 */
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
Dep.framework.editor.plugin.containers.Canvas = Dep.framework.editor.plugin.ContainerPlugin
		.extend({
			/**
			 * 类名
			 * 
			 * @property String
			 */
			NAME : "Dep.framework.editor.plugin.containers.Canvas",
			/**
			 * 需要持久化的数据
			 * 
			 * @property {String[]},
			 */
			DEFAULTATT : ["x", "y", "dimension"],
			
			/**
			 * 初始化日志类
			 */
			logger : log4javascript.getDefaultLogger("Dep.framework.editor.plugin.containers.Canvas"),
			/**
			 * 初始化
			 * 
			 * @param editor
			 * @param {Object
			 *            }pluginData 插件配置信息
			 */
			init : function(editor, pluginData) {
				var me = this;
				me._super(editor, pluginData);
				me.setEditor(editor);
				me.pluginData = pluginData;
				me.initView(pluginData);
				me.getCanvasLayOutMap();
				me.editor
						.regiestOnEvent(
								Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
								me.initEvents.bind(me));
			},
			/**
			 * 根据模型管理器传过来的图形模型数据向画布中添加图元
			 * 
			 * @param viewModel
			 *            图形模型
			 */
			addFigureToCanvas : function(rec) {
				try{//捕获异常，
				var me = this, viewModel = rec.getViewData(), viewData = null, figure = null, figureGroup = rec
						.getFigureGroup();
				if (!viewModel.get('viewData')) {
					// Dep.framework.editor.util.Msg
					// .info(Dep.framework.editor.I18N.CANVAS.VIEWDATAISNONE);
					// return;
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
//				me.getCanvas().setCurrentSelection(figure);
				}catch(e){
					console.error("有图元添加到画布失败。失败原因：" +e);
				}
				// me
				// .raiseEvent(
				// Dep.framework.editor.EVENT.CANVAS.CLICKTOADDFIGURE,
				// rec);
			}
		});