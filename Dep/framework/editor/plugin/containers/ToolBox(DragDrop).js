/**
 * 以拖拽的形式实现图元的添加功能，此插件弃用，代码备份
 * @editor HeYuqing container 为根容器，即editor 此插件需要： 1.根据编辑器的配置信息初始化界面信息。
 *         2.初始化事件监听。 3. TODO 以后可以根据图层来缓存图片数据,不需要每次都去创建
 *         此容器插件关联的配置文件为-》cuseditor目录/ToolBox.json 文件。配置文件详情：
 该文件主要用来配置编辑器中图元工具箱中的内容,本插件的加载与否由 Canvas.json
 中的containers属性来配置,如果在该属性下添加图元工具箱的配置,则系统加载图元工
 具箱,否则不加载 如需加载图元工具箱,各系统用户均应当在上述目录下完成对图元工具
 箱的配置,其具体配置说明如下:
    "plugins": [{"src": "Dep/framework/editor/plugin/containers/toolbox/QueryToolItem.js","name": "Dep.framework.editor.plugin.containers.toolbox.QueryToolItem"}],
    //查询某个图元,暂未实现
	"title": "图元工具箱", //图元工具箱窗口的默认title名称,可以不配置
    "detail": [   //每个图层对应一套图元工具箱的配置,根据不同的图层展示不同的图元
        {
            "title": "#{XXXX}",  //动态切换图元工具箱的title
            "lType": "topo",   //当前图元工具箱的配置所属的图层
            "fTypes": "LogicNode,DataNode"  //当前配置允许展示的工具图元类型,如果没有配置,则默认展示此配置下图层中的所有图元(port除外)
        },
        {
            "title": "#{XXXX}",
            "lType": "pubsub",
            "fTypes": "PubResource,SubResource"
        }
    ]
}
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
Dep.framework.editor.plugin.containers.toolbox = Dep.framework.editor.plugin.ContainerPlugin.extend({
	NAME : "Dep.framework.editor.plugin.containers.toolbox",
	// 图元工具箱中的图片默认长宽
	IMGWIDTH : 60,
	IMGHEIGHT : 60,
	// TODO 用来缓存图片对象
	IMGMAP : {},
	defaultTitle : Dep.framework.editor.I18N.TOOLBOX.TITLE,
	/**
	 * 初始化
	 */
	init : function(canvas, pluginData) {
		var me = this;
		me._super(canvas, pluginData);
		me.setCanvasContainer(canvas);
		me.pluginData = pluginData;
		me.initView(pluginData);
		me.getEditor().regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
				me.initEvents.bind(me));
		me.initCacheData(pluginData);
	},
	/**
	 * 初始化事件监听
	 */
	initEvents : function() {
		var me = this, layerContainer = null;
		// 监听图层切换事件,根据切换的图层展示不同的图元
		me.regiestOnEvent(Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER, me.onLayerChanged
						.bind(me), me, "Dep.framework.editor.plugin.containers.Layer");
		me.regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE, function(
						/* evnetSouce, */panel) {
					/*
					 * //每次画布依赖的panel变化时,画布上跟随展示的miniBtn也跟随移动位置,
					 * 但是视口所在的窗口暂时不会移动位置,只有在鼠标单击该btn的时候,才会先重新计算sizer的形状和位置,
					 * 然后再将视口的位置动态的移动画布panel最右下方.
					 */
					me.rePositionToolBox(panel);
				}, me, "Dep.framework.editor.plugin.containers.Canvas");
		me.getCanvasContainer().getCanvasPanel().fireEvent('resize',
				me.getCanvasContainer().getCanvasPanel());
	},

	/**
	 * 初始创建图形工具箱并展示
	 * 
	 * @param pluginData
	 */
	initView : function(pluginData) {
		var me = this, canvasPanel = me.getCanvasContainerPanel();
		//如果配置的有默认title,则修改系统默认title
		if (pluginData.title) {
			me.defaultTitle = pluginData.title;
		}
		me.toolBoxWin = Ext.create('Dep.framework.editor.view.ToolBox', {
					title : me.defaultTitle,
					constrainTo : canvasPanel.getEl(),
					collapsible : true,
					floatParent : canvasPanel,
					items : []
				});
		me.toolBoxWin.show();
		me.rePositionToolBox();
		me.bindDragDrop();
	},
	/**
	 * 当画布所在的窗口移动时,始终保证该视口在画布的右下方
	 * 
	 * @param {}
	 *            panel 父窗口
	 */
	rePositionToolBox : function(panel) {
		var me = this, canvasPanel = me.getCanvasContainerPanel(), canvasPanelPosition = canvasPanel
				.getPosition();
		// 将图元工具箱定位到画布窗口的左上方
		me.getToolBoxWin().setPosition(canvasPanelPosition[0],
				canvasPanelPosition[1], false);
	},
	/**
	 * 当用户切换图层 的时候,根据当前编辑图层的fGroups属性获得当前编辑图层包含的所有图元组
	 * 根据每个图元组,从modelManager中获得该图元组的图元配置集合, 然后根据图元配置集合去填充工具条
	 * 
	 * @param layerObj
	 *            图层容器对象
	 */
	onLayerChanged : function(layerObj) {
		this.currentEditLayer = layerObj;
		if (!layerObj) {// 如果未选中任何图层,则只是清空图元工具箱
			this.clearAllFiguresFromToolBox();
			return;
		}
		var me = this, figureGroups = layerObj.fGroups, figureTypeArray = null, modelManager = me
				.getEditor().getModelManager(), i = 0, figureType = null, figureConfigArray = null, figureConfig = null;
		// 先清除图形工具箱中的所有图元
		me.clearAllFiguresFromToolBox();
		// 解析figureGroups属性,将所有的图元组解析出来
		if (figureGroups) {
			figureTypeArray = figureGroups.split(",");
		}
		// 遍历所有的图元组集合,从modelManager中取出每个图元组的配置,然后重新填充工具箱
		$.each(figureTypeArray, function(n, figureType) {
					//首先查看缓存数据中是否有该图层的配置
					if (me.cacheData[figureType]) {
						//根据图层取出该图层对应的配置对象
						tempObj = me.cacheData[figureType];
						//如果系统配置有当前图层展示的图元,则使用该图元来填充图元工具箱
						if (tempObj.fTypes) {
							figureConfigArray = tempObj.fTypes.split(",");
						}
						//如果当前图层配置对象有title属性,则修改图元工具箱的title属性
						if (tempObj.title) {
							me.getToolBoxWin().setTitle(tempObj.title);
						} else {
							//如果没有配置title,则使用默认title
							me.getToolBoxWin().setTitle(me.defaultTitle);
						}
					}
					if (!figureConfigArray || figureConfigArray.length <= 0) {
						/*//如果在配置文件中没有配置当前图层在图元工具箱中展示的图元,则默认展示所有该图层下的图元,
						根据图元组,从模型管理器中获取该图元组下的所有图元的标识*/
						figureConfigArray = modelManager
								.getTypesByGroup(figureType);
					}
					if (figureConfigArray.length <= 0) {//当前编辑图层没有配置的图元
						alert("当前图层没有配置图元工具箱");//TODO  以后建立统一的提示窗口
					} else {
						$.each(figureConfigArray, function(n, figureConfig) {
									// 根据图元标识,从模型管理器中取得图元的配置信息
									me.reFillToolBox(modelManager
											.get(figureConfig));
								});
					}

				});
		// 重新绑定拖动效果
		me.bindDragDrop();
	},

	/**
	 * 根据图元组的配置重新填充图元工具箱
	 * 
	 * @param figureConfigArray
	 *            图元配置集合
	 */
	reFillToolBox : function(figureModel) {
		var me = this, toolBox = me.getToolBoxWin(), img = null;

		if (!figureModel) {
			throw "未正确获取图元配置信息";
		}
		if (figureModel.isPort === "true") {
			return;
		}
		img = Ext.create("Dep.framework.editor.view.Img", figureModel);
		toolBox.add(img);
		if (figureModel.isConnection === "true") {
			img.getEl().on('click', function(comp) {
						if (me.currentLink == comp) { // 两次都单击同一个link图标,表示退出添加连接状态
							me.raiseEvent(Dep.framework.editor.EVENT.TOOLBOX.OUTADDLINKSTATE,
									null);
							me.currentLink = null;
							return;
						}
						me.raiseEvent(Dep.framework.editor.EVENT.TOOLBOX.INADDLINKSTATE,
								figureModel);
						me.currentLink = comp;
					});
		}
	},
	/**
	 * 将图形工具箱清空,以便重新填充
	 */
	clearAllFiguresFromToolBox : function() {
		var me = this, toolBox = me.getToolBoxWin(), imgs = Ext.ComponentQuery
				.query('JHEImg', toolBox);
		$.each(imgs, function(n, img) {
					toolBox.remove(img);
				});
	},
	/**
	 * 缓存每个图层的配置信息
	 * @param {} pluginData
	 */
	initCacheData : function(pluginData) {
		var me = this, detail = pluginData.detail;
		me.cacheData = {};
		if ($.isArray(detail)) {
			$.each(detail, function(n, obj) {
						if (obj.lType) {
							me.cacheData[obj.lType] = obj;
						}
					});
		}
	},

	/**
	 * 根据图层类型获取该图层在图元工具箱中的配置对象
	 * @param lType
	 * @returns {*}
	 */
	getCacheDataByLType : function(lType) {
		return me.cacheData[lType];
	},
	/**
	 * 每次重新填充工具箱后,都要重新设置画布的拖动效果,否则新添加的图元在不支持拖动
	 */
	bindDragDrop : function() {
		var me = this, canvas = me.getCanvasContainer().getCanvas(), html = canvas
				.getHtmlContainer(), pos = null, action = null, className = null;
		html.droppable({
			accept : '.dragDropArea',// '.x-component-default',
			// //拖动对象所在的div
			// scope : html,
			over : function(event, ui) {
				canvas.onDragEnter(ui.draggable); // 空方法
			},
			out : function(event, ui) {
				canvas.onDragLeave(ui.draggable); // 空方法
			},
			drop : function(event, ui) {
				event = canvas._getEvent(event);
				pos = canvas.fromDocumentToCanvasCoordinate(event.clientX,
						event.clientY);
				var img = Ext.ComponentQuery.query('#' + ui.draggable[0].id)[0];
				if (img && img.fType && img.shape) {
					if (eval(img.isConnection)) {//线性图元不可以通过拖动来添加
						return;
					}
					me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL,
							me.currentEditLayer.type, img.fType, {
								"viewData" : {
									viewData : Ext.JSON.encode({
												"color" : 90,
												"size" : 80,
												x : pos.getX(),
												y : pos.getY(),
												shape : img.shape
											})
								},
								"bussData" : {}
							});
				}

			}
		});
		$('.dragDropArea').draggable({
			appendTo : "body",
			stack : "body",
			zIndex : 27000,
			helper : "clone",
			drag : function(event, ui) {
				event = canvas._getEvent(event);
				var pos = canvas.fromDocumentToCanvasCoordinate(event.clientX,
						event.clientY);
				canvas.onDrag(ui.draggable, pos.getX(), pos.getY()); // 空方法
			},
			stop : function(e, ui) {
				canvas.isInExternalDragOperation = false;
			},
			start : function(e, ui) {
				canvas.isInExternalDragOperation = true;
				$(ui.helper).addClass("shadow");
			}
		});
	},
	/**
	 * 获取图元工具箱窗口
	 * 
	 * @returns {Ext.window.Window|*}
	 */
	getToolBoxWin : function() {
		if (this.toolBoxWin) {
			return this.toolBoxWin;
		} else {
			throw "工具箱窗口未初始化";
		}
	},
	/**
	 * 获取画布容器所在的窗口
	 * 
	 * @returns {*}
	 */
	getCanvasContainerPanel : function() {
		var me = this, canvasPanel = me.getCanvasContainer().getCanvasPanel();
		if (canvasPanel) {
			return canvasPanel;
		} else {
			throw "画布窗口未创建!";
		}
	},
	/**
	 * 设置当前工具箱所属 的画布容器
	 * 
	 * @param canvas
	 */
	setCanvasContainer : function(canvas) {
		this.canvas = canvas;
	},
	/**
	 * 获取当前工具箱所属 的画布容器
	 * 
	 * @returns {*}
	 */
	getCanvasContainer : function() {
		if (this.canvas) {
			return this.canvas;
		} else {
			throw "画布插件未设置";
		}
	}
});