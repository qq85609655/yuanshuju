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
			 * 根据配置初始化界面
			 */
			initView : function(pluginData) {
				var me = this, id = null;
				// 画布容器
				me.containerPanel = Ext.create(
						"Dep.framework.editor.view.CanvasViewPort", {});
				// 画布panel
				me.canvasPanel = Ext.create("Ext.panel.Panel", {
						// autoScroll : true
						});
				// me.getEditor().regiestContainer(me.getClassName(), me);

				me.getEditor().getEditorView().addToRegion(
						me.getContainerPanel(), 'center');
				// 添加画布容器到编辑器中心
				me.getContainerPanel().addToRegion(me.canvasPanel, 'center');
				id = me.canvasPanel.getId();
				me.canvas = new draw2d.Canvas(id + '-body', 3000, 1800, me);
			},
			/**
			 * 初始化事件监听
			 */
			initEvents : function() {
				var me = this;
				me.raiseEvent(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE);
				/**
				 * 发出窗口调整事件
				 */
				me.getCanvasPanel().on(
						'resize',
						function(panel, width, height, oldWidth, oldHeight,
								eOpts) {
							me
									.raiseEvent(
											Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE,
											panel, width, height, oldWidth,
											oldHeight);

						});
				// 由于事件注册和监听先后顺序不确定,为保证视口能正确初始化位置,需要在视口类和画布容器中添加此事件
				me.getCanvasPanel().fireEvent('resize', me.getCanvasPanel());
				me.getEditor().regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_SELECT,function(model){
				   var figure=model.getShape();
				   me.getCanvas().setCurrentSelection(figure);
				});
				// 监听编辑器的发出的图元添加事件,向画布中添加图元
				me.getEditor().regiestOnEvent(
						Dep.framework.editor.EVENT.EDITOR.MODEL_ADDED,
						function(layer, store, records, position) {
							$.each(records, function(n, rec) {
										me.addFigureToCanvas(rec);
									});
//							me
//									.getEditor()
//									.executeActionSpanContainer(
//											'Dep.framework.editor.plugin.containers.Layer',
//											'refreshLayout');
							if (!me.getCanvas().isDblClicked()) {
								me
										.raiseEvent(
												Dep.framework.editor.EVENT.CANVAS.AFTERADDAFIGURE,
												layer, store, records, position);
							}
						});

				// 监听所有图元加载完成事件,然后根据图元依赖顺序向画布中添加图元
				me.getEditor().regiestOnEvent(
						Dep.framework.editor.EVENT.EDITOR.DM_LAYER_LOAD_DATA,
						me._onLayerLoadData.bind(me), me);

				// 当store重新加载时,监听其load事件,将重新加载的数据添加到画布上来.
				me.getEditor().regiestOnEvent(
						Dep.framework.editor.EVENT.EDITOR.DM_DATA_LOAD,
						function(layer, figureType, store) {
							me.getCanvas().setCurrentSelection(null);
							me.getCanvas().removeFigureByType(layer.type,
									figureType);
							store.each(function(rec) {
										me.addFigureToCanvas(rec);
									});
//							me
//									.getEditor()
//									.executeActionSpanContainer(
//											'Dep.framework.editor.plugin.containers.Layer',
//											'refreshLayout');
							me
									.raiseEvent(
											Dep.framework.editor.EVENT.CANVAS.AFTERREDRAWFIGURE,
											layer, figureType, store);
						});
				// 监听编辑器的图元删除事件,从画布中删除图元
				me.getEditor().regiestOnEvent(
						Dep.framework.editor.EVENT.EDITOR.MODEL_DELETED,
						function(layer, store, rec, position) {
							me.remvoeFigureFromCanvas(rec);
						});
				me.getEditor().regiestOnEvent(
						Dep.framework.editor.EVENT.EDITOR.DM_FTYPE_CLEAR,
						function(layer, fType, dm) {
							me.getCanvas()
									.removeFigureByType(layer.type, fType);
						});
				// 切换图层时,将表示画布中选择的图元置空
				me.regiestOnEvent(
						Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER,
						function() {
							me.getCanvas().setCurrentSelection(null);
						}, me, "Dep.framework.editor.plugin.containers.Layer");

				// 监听业务列表的选中事件,在画布中同步选中对应的图元
				me.regiestOnEvent(Dep.framework.editor.EVENT.BL.ROWSELECT,
						me._onBussListSelected.bind(me), me,
						"Dep.framework.editor.plugin.containers.BussList");

				// 监听工具箱发出的事件,通知画布进入添加链接状态,此状态下不可以拖动图元
				// me.regiestOnEvent(Dep.framework.editor.EVENT.TOOLBOX.INADDLINKSTATE,
				// me._onInAddLinkAddState.bind(me), me,
				// "Dep.framework.editor.plugin.containers.toolbox");
				// // 监听工具箱发出的事件,通知画布从添加链接状态退出
				// me.regiestOnEvent(Dep.framework.editor.EVENT.TOOLBOX.OUTADDLINKSTATE,
				// me._onOutAddLinkState.bind(me), me,
				// "Dep.framework.editor.plugin.containers.toolbox");

				// 监听单击图元工具箱上图元模型
				me.regiestOnEvent(
						Dep.framework.editor.EVENT.TOOLBOX.GRIDITEMCLICKED,
						me._onToolBoxGridItemClicked.bind(me), me,
						"Dep.framework.editor.plugin.containers.toolbox");
				// 监听双击图元工具箱上图元模型
				me
						.regiestOnEvent(
								Dep.framework.editor.EVENT.TOOLBOX.GRIDITEMDBLCLICKED,
								function(panel, record, item, index, e, eOpts) {
									me._onToolBoxGridItemClicked(panel, record,
											item, index, e, eOpts, true);
								}, me,
								"Dep.framework.editor.plugin.containers.toolbox");
				// 单击画布时,通过画布中缓存的图元模型添加模型
				me.getCanvas().on("click",
						function(canvas, eventObj, bussData) {
							me._clickToAddFigure(canvas, eventObj, bussData);
							me.raiseEvent(
									Dep.framework.editor.EVENT.CANVAS.CLICK,
									canvas
											.getBestFigure(eventObj.x,
													eventObj.y), canvas);
						});

				// 在添加每个图元时添加对该图元的事件监听,用来更新模型中的数据
				me.getCanvas().on("figure:add", function(canvas, figureObj) {
							me._addFigureChangeEvents(figureObj.figure);
						});
				// 在画布上选中一个图元时,发出图元选中事件传递两个参数,一个是画布,一个是被选中的图元
				me.getCanvas().on("select", function(canvas, selectFigure) {
					// 将选中的第一个图元的状态设置为编辑状态
					if (selectFigure instanceof draw2d.shape.composite.Group) {
						return;
					}
					if (selectFigure && selectFigure.setEditingIcon) {
						selectFigure.setEditingIcon();
					}
					// me
					// .raiseEvent(Dep.framework.editor.EVENT.CANVAS.SELECT,
					// canvas,
					// canvas.getSelection().getAll().asArray());
					me.raiseEvent(Dep.framework.editor.EVENT.CANVAS.SELECT,
							canvas, selectFigure);
				});
				// 监听画布的添加连接事件,此事件由toolbox调用画布发出.以便画布切换策略来通过拖动添加连接
				me.getCanvas().on(
						Dep.framework.editor.EVENT.CANVAS.ADDCONNECTION,
						function(canvas, config) {
							me._prepareToAddConnection(canvas, config)
						});
				// 监听draw2d原生命令堆栈的执行事件,将此事件传入的command由命令编辑器的命令堆栈拦截执行,从而纳入编辑器的重做/撤销管理中来
				me.getCanvas().getCommandStack().on("commandexecute",
						function(stack, command) {
							me.executeCommand(command);
						});
				// obj结构：{x : x,y : y,shiftKey : shiftKey,ctrlKey :
				// ctrlKey,figure : figure}
				me.getCanvas().on("dblclick", function(canvas, obj) {
					me.raiseEvent(Dep.framework.editor.EVENT.CANVAS.DBCLICK,
							obj, canvas);
				});
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
				me.getCanvas().setCurrentSelection(figure);
				}catch(e){
					console.error("有图元添加到画布失败。失败原因：" +e);
				}
				// me
				// .raiseEvent(
				// Dep.framework.editor.EVENT.CANVAS.CLICKTOADDFIGURE,
				// rec);
			},
			/**
			 * 向图元中添加port图元
			 * 
			 * @param {}
			 *            viewData port图元的图形信息
			 * @param {}
			 *            port 添加的port对象
			 */
			_addPortToFigure : function(viewData, port, figureGroup) {
				var me = this, parentFigure = me.getCanvas().getFigure(
						figureGroup, viewData.parentId), locatorClassName = null, locator = null;
				if (viewData.locator) {
					locatorClassName = eval(config.locator);
					locator = new locatorClassName();
				}
				parentFigure.addBussInputPort(port, locator,
						Number(viewData.MAX));
				if (viewData.x && viewData.y) {
					port.setPosition(Number(viewData.x), Number(viewData.y));
				}
			},
			/**
			 * 向画布中添加链接图元
			 * 
			 * @param {}
			 *            viewData 链接图元的信息
			 * @param {}
			 *            conn 链接图元对象
			 */
			_addConnectionToCanvas : function(viewData, conn, figureGroup,
					recurrenceVerticles) {
				var me = this, canvas = me.getCanvas(), model = conn
				.getUserData();
				//从图形数据获取，图形数据中没有，从业务数据中获取。
				var targetNodeId = viewData.targetNodeId?viewData.targetNodeId:(model.connectionRelationKeys?model.getBussProperties(model.connectionRelationKeys.destKey):null);
				var srcNodeId = viewData.srcNodeId?viewData.srcNodeId:(model.connectionRelationKeys?model.getBussProperties(model.connectionRelationKeys.srcKey):null);
				var targetPort = canvas
						.getFigure(figureGroup, viewData.targetPortId), targetNode = canvas
						.getFigure(figureGroup, targetNodeId), sourceNode = canvas
						.getFigure(figureGroup, srcNodeId), sourcePort = null;
				if(!targetNode ){
					throw "连线关联目的节点信息找不到。无法添加。目的节点ID为：" + targetNodeId;
				}
				if(!sourceNode){
					throw "连线关联源节点信息找不到。无法添加。源节点ID为：" + srcNodeId;
				}
				if (!targetNode.getCanvas()) {
					me.getCanvas().add(targetNode);
				}
				if (!sourceNode.getCanvas()) {
					me.getCanvas().add(sourceNode);
				}
				if (!targetNode) {
					throw "无法获取链接需要的节点";
					return;
				}
				if (!targetPort) {// 如果找不到port，则添加到默认port
					targetPort = targetNode.getHybridPort();
				}
				if (targetPort && sourceNode && sourceNode._getFreeOutputPort) {
					if (conn.isNoBussConnection = "true") {// 如果是非业务图元，直接添加到默认port
						sourcePort = sourceNode.getHybridPort();
					} else if (sourceNode._getFreeOutputPort) {// 业务图元动态创建输出port
						sourcePort = sourceNode._getFreeOutputPort();
						sourceNode.addPort(sourcePort,
								sourceNode.defaultOutputLocator);
						sourceNode.layoutPorts();
					}
				} else {
					throw "图元未正确创建";
				}
				if (sourcePort) {
					conn.setSource(sourcePort);
					conn.setTarget(targetPort);
				} else {
					throw "图元未正确创建";
				}
				if (conn.DEFAULTTARGETDECORATOR) {
					conn.setTargetDecorator(conn.DEFAULTTARGETDECORATOR);
				}
				me.getCanvas().add(conn);
				if(conn && conn.rePaintRouter){
				   conn.rePaintRouter();
				}
				// 如果图形信息中配置有该链接的各个拐点信息,则重现去拐点
				if (recurrenceVerticles && recurrenceVerticles == "false") {
					return;
				}
				if (viewData.vertices) {
					conn.vertices = new draw2d.util.ArrayList(viewData.vertices.data);
					conn.svgPathString = viewData.svgPathString;
					conn.repaint();
				}
			},
			/**
			 * 在添加一个图元时,监听图元修改事件来更新模型中的数据
			 * 
			 * @param figure
			 * @private
			 */
			_addFigureChangeEvents : function(figure) {
				var me = this, model = null, persistViewAttr = null, viewData = null;
				// 监听图元修改事件,只有符合用户需要的图元信息才会保存
				if (!figure.getUserData()) {
					return;
				}
				figure.on("change", function(figure, param) {
							model = figure.getUserData();
							persistViewAttr = model.persistentViewAttributes;
							if (!persistViewAttr || persistViewAttr.length <= 0) {
								persistViewAttr = me.DEFAULTATT;
							}
							if (Ext.Array.indexOf(persistViewAttr, param) >= 0) {
								viewData = figure.getPersistentAttributes();
								// model.getViewData().set("viewData", viewData)
								model.updateViewProperties("viewData", Ext.JSON
												.encode(viewData));
							}
						});
			},
			/**
			 * 准备添加链接,在画布上完成添加操作后,发出事件有数据管理器添加一条链接业务对象,成功后再向画布上添加链接
			 * 
			 * @param canvas
			 * @param config
			 *            source : this, target : dropTarget, model :
			 *            canvas.getCurrentLinkModel()
			 * @private
			 */
			_prepareToAddConnection : function(canvas, config) {
				var me = this, toolboxModel = config.model, sourcePort = config.source, targetPort = config.target, srcNodeId = sourcePort
						.getParent().getId(), destNodeId = targetPort
						.getParent().getId(), jmxPortId = targetPort.getId();
				//如果连接的源节点ID和目的节点ID相同，且不允许连接自身。不允许添加
				if(srcNodeId === destNodeId && !toolboxModel.enableConnectSelf){
					me.logger.debug('不能试图添加自身连接。');
					return;
				}
				var linkModel = canvas.getCurrentModel(), connectionRelationKeys = linkModel
						.get('connectionRelationKeys'), srcKey = "startNodeId", destKey = "endNodeId";

				if (connectionRelationKeys) {// 如果有配置
					srcKey = connectionRelationKeys.srcKey
							? connectionRelationKeys.srcKey
							: srcKey;
					destKey = connectionRelationKeys.destKey
							? connectionRelationKeys.destKey
							: destKey;
				}
				// if (connectionConfig.length > 0 &&
				// connectionConfig[0].srcKey) {
				// srcKey = connectionConfig[0].srcKey;
				// }
				// if (connectionConfig.length > 0 &&
				// connectionConfig[0].destKey) {
				// destKey = connectionConfig[0].destKey;
				// }

				/*
				 * var model = me.getEditor().getDataManager().create(null,
				 * toolboxModel.get('fType'), { "viewData" : { viewData :
				 * Ext.JSON.encode({ srcNodeId : srcNodeId, targetPortId :
				 * jmxPortId, targetNodeId : destNodeId, shape :
				 * toolboxModel.get("shape") }) }, "bussData" : { startClusterId :
				 * srcNodeId, sourceName : config.sourceName, targetName :
				 * config.targetName, endClusterId : destNodeId } });
				 * me.raiseEvent(
				 * Dep.framework.editor.EVENT.CANVAS.CLICKTOADDFIGURE, model);
				 */
				var bussData = {
					sourceName : config.sourceName,
					targetName : config.targetName
				}, modelData = null;
				bussData[srcKey] = srcNodeId;
				bussData[destKey] = destNodeId;
				modelData = {
					"viewData" : {
						viewData : Ext.JSON.encode({
									srcNodeId : srcNodeId,
									targetPortId : jmxPortId,
									targetNodeId : destNodeId,
									shape : toolboxModel.get("shape")
								})
					},
					"bussData" : bussData
					/*
					 * { srcKey : srcNodeId, sourceName : config.sourceName,
					 * targetName : config.targetName, destKey : destNodeId }
					 */
				}
				me.getEditor().executeAction(
						Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
						toolboxModel.get('fType'), modelData);
			},

			/**
			 * 在监听到模型的删除事件后,将图元从画布中删除
			 * 
			 * @param {}
			 *            rec
			 */
			remvoeFigureFromCanvas : function(rec) {
				var me = this, canvas = me.getCanvas(), figure = rec.getShape();
				if (figure) {
					canvas.remove(figure);
				} else {
					throw "删除图元失败,图元id为:" + id;
				}
			},
			/**
			 * 当业务列表框中某行数据被选中的时候,画布也同步选中对应的图元
			 * 
			 * @param {Array}
			 *            modelList 选中的模型集合,可能选中多个模型
			 */
			_onBussListSelected : function(modelList) {
				var me = this, figure = null, figureArray = new draw2d.util.ArrayList(), canvas = me
						.getCanvas(), selections = canvas.getSelection()
						.getAll(), tempArray = [];
				if (modelList.length <= 0) {
					canvas.setCurrentSelection(null);
					return;
				}
				$.each(modelList, function(n, model) {
							figure = model.getShape();
							if (figure instanceof draw2d.Figure) {
								figureArray.add(figure);
								if (!(selections.contains(figure))) {// 新增选中图元
									tempArray.push(figure);
								}
							}
						});
				// 这个判断是为了保证每次选中的图元跟上次不一样的时候才会去调用画布的方法,从而避免递归
				if (tempArray.length > 0
						|| figureArray.getSize() != selections.getSize()) {
					canvas.setCurrentSelection(figureArray);
				}
			},
			/**
			 * 监听画布grid中的itemclick事件,当用户单击某个图元的时候,修改画布中缓存的数据,用户可以通过添加单击画布来添加图元
			 * 
			 * @param {}
			 *            panel
			 * @param {}
			 *            record
			 * @param {}
			 *            item
			 * @param {}
			 *            index
			 * @param {}
			 *            e
			 * @param {}
			 *            eOpts
			 */
			_onToolBoxGridItemClicked : function(panel, record, item, index, e,
					eOpts, dblClick) {
				var me = this, isConnection = record.get("isConnection");
				if (!dblClick) {
					dblClick = false;
				}
				if (isConnection == "true") {
					me.getCanvas().initAddLink(record, dblClick);
				} else {
					me.getCanvas().getOutOfAddLinkState(record, dblClick);
				}
			},
			/**
			 * 用户通过单击来添加图元
			 * 
			 * @param {}
			 *            canvas
			 * @param {}
			 *            eventObj
			 */
			_clickToAddFigure : function(canvas, eventObj, bussData) {
				var me = this, currentModel = canvas.getCurrentModel();
				// 如果没有模型,说明没有选择任何图元,直接返回
				if (!currentModel) {
					return;
				}
				// 如果选择的模型是线性图元的,则不在这里添加
				if (currentModel.get('isConnection') == "true") {
					return;
				}
				// 通过editor的事件添加图元
				if (currentModel.get('fType')/* && currentModel.get('shape')*/) {
					// var model = me.getEditor().getDataManager().create(null,
					// currentModel.get('fType'), {
					// "viewData" : {
					// viewData : Ext.JSON.encode({
					// x : eventObj.x,
					// y : eventObj.y,
					// shape : currentModel
					// .get('shape')
					// })
					// },
					// "bussData" : bussData ? bussData : {}
					// });
					// me.raiseEvent(
					// Dep.framework.editor.EVENT.CANVAS.CLICKTOADDFIGURE,
					// model, eventObj);

					me.getEditor().executeAction(
							Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
							currentModel.get('fType'), {
								"viewData" : {
									viewData : Ext.JSON.encode({
												x : eventObj.x,
												y : eventObj.y,
												shape : currentModel
														.get('shape')
											})
								},
								"bussData" : bussData ? bussData : {}
							});
				}
				// 如果不是双击的图元工具箱,则将缓存的模型置空
				if (!canvas.isDblClicked()) {
					canvas.setCurrentModel(null);
				}
			},
			/**
			 * 
			 * @param {}
			 *            layer
			 * @param {}
			 *            records
			 */
			_onLayerLoadData : function(layer, records) {
				var me = this, storeManager = layer.getStoreManager(), connList = [], portList = [], nodeList = [];
				storeManager.each(function(n, store) {
							if (store.isPort == "true") {
								portList.push(store);
							} else if (store.isConnection == "true") {
								connList.push(store);
							} else {
								nodeList.push(store);
							}
						});
				$.each(nodeList, function(n, store) {
							store.each(me.addFigureToCanvas, me);
						});
				$.each(portList, function(n, store) {
							store.each(me.addFigureToCanvas, me);
						});
				$.each(connList, function(n, store) {
					me
							.raiseEvent(
									Dep.framework.editor.EVENT.CANVAS.BEFORERENDERFIGURE,
									store);
					store.each(me.addFigureToCanvas, me);
					//整个图层添加数据时，有必要layout
					me.getEditor().executeActionSpanContainer(
							'Dep.framework.editor.plugin.containers.Layer',
							'refreshLayout');
				});
				//

				/*
				 * $.each(connList, function(n, store) { me .raiseEvent(
				 * Dep.framework.editor.EVENT.CANVAS.BEFORERENDERFIGURE, store);
				 * store.each(me.addFigureToCanvas, me); });
				 */
				me.getEditor().executeActionSpanContainer(
						'Dep.framework.editor.plugin.containers.Layer',
						'refreshLayout');
				me
						.raiseEvent(
								Dep.framework.editor.EVENT.CANVAS.AFTERLAYERFIGUREDRAWED,
								layer);
			},
			/**
			 * 获取画布容器中用来缓存画布布局对象的map
			 */
			getCanvasLayOutMap : function() {
				var me = this;
				if (!me.canvasLayoutMap) {
					me.canvasLayoutMap = new Ext.util.HashMap();
				}
				return me.canvasLayoutMap
			},
			/**
			 * 向布局容器中注册布局
			 * 
			 * @param {}
			 *            type 布局类型
			 * @param {}
			 *            name 布局类名
			 */
			registLayout : function(type, name) {
				var me = this;
				if (!type || !name) {
					return;
				}
				me.getCanvasLayOutMap().add(type, name);
			},
			/**
			 * 根据布局类型获取布局类名
			 * 
			 * @param {}
			 *            type
			 */
			getLayout : function(type) {
				return this.getCanvasLayOutMap().get(type);
			},
			/**
			 * 获取画布
			 * 
			 * @return {}
			 */
			getCanvas : function() {
				if (this.canvas) {
					return this.canvas;
				} else {
					throw "画布未创建";
				}
			},
			/**
			 * 获去画布依赖的panel
			 * 
			 * @return {}
			 */
			getCanvasPanel : function() {
				if (this.canvasPanel) {
					return this.canvasPanel;
				} else {
					throw "画布依赖的Panel未创建";
				}
			},
			/**
			 * 获去画布依赖的panel
			 * 
			 * @return {}
			 */
			getKeyEventPanel : function() {
				if (this.canvasPanel) {
					return this.canvasPanel;
				} else {
					throw "画布依赖的Panel未创建";
				}
			}
		});