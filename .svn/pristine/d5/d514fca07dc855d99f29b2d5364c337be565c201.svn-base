/**
 * @editor HeYuqing container 为根容器，即editor 此插件需要： 1.根据编辑器的配置信息初始化界面信息。
 *         2.初始化事件监听。 3. TODO 以后可以根据图层来缓存图片数据,不需要每次都去创建
 *         此容器插件关联的配置文件为-》cuseditor目录/ToolBox.json 文件。配置文件详情：
 *         该文件主要用来配置编辑器中图元工具箱中的内容,本插件的加载与否由 Canvas.json
 *         中的containers属性来配置,如果在该属性下添加图元工具箱的配置,则系统加载图元工 具箱,否则不加载
 *         如需加载图元工具箱,各系统用户均应当在上述目录下完成对图元工具 箱的配置,其具体配置说明如下: "plugins": [{"src":
 *         "Dep/framework/editor/plugin/containers/toolbox/QueryToolItem.js","name":
 *         "Dep.framework.editor.plugin.containers.toolbox.QueryToolItem"}],
 *         //查询某个图元,暂未实现 "title": "图元工具箱", //图元工具箱窗口的默认title名称,可以不配置 "detail": [
 *         //每个图层对应一套图元工具箱的配置,根据不同的图层展示不同的图元 { "title": "#{XXXX}",
 *         //动态切换图元工具箱的title "lType": "topo", //当前图元工具箱的配置所属的图层 "fTypes":
 *         "LogicNode,DataNode"
 *         //当前配置允许展示的工具图元类型,如果没有配置,则默认展示此配置下图层中的所有图元(port除外) }, { "title":
 *         "#{XXXX}", "lType": "pubsub", "fTypes": "PubResource,SubResource" } ] }
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
Dep.framework.editor.plugin.containers.toolbox = Dep.framework.editor.plugin.ContainerPlugin
		.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "Dep.framework.editor.plugin.containers.toolbox",
			/**
			 * 初始化日志类
			 */
			logger : log4javascript
					.getDefaultLogger("Dep.framework.editor.plugin.containers.toolbox"),
			/**
			 * @property IMGWIDTH 默认图片宽度
			 */
			IMGWIDTH : 60,
			/**
			 * @property IMGHEIGHT 默认图片高度
			 */
			IMGHEIGHT : 60,
			/**
			 * @property IMGMAP 用来缓存图片对象
			 */
			IMGMAP : {},
			/**
			 * @property defaultTitle 默认的工具箱title
			 */
			defaultTitle : Dep.framework.editor.I18N.TOOLBOX.TITLE,
			/**
			 * 初始化工具箱容器插件
			 * 
			 * @param {Object}
			 *            pluginData 插件配置信息
			 */
			init : function(canvas, pluginData) {
				var me = this;
				me._super(canvas, pluginData);
				me.gridList = new draw2d.util.ArrayList();
				me.setCanvasContainer(canvas);
				me.pluginData = pluginData;
				me._initView(pluginData);
				me
						.getEditor()
						.regiestOnEvent(
								Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
								me._initEvents.bind(me));
				me.initCacheData(pluginData);
			},
			/**
			 * @private 初始化事件监听
			 */
			_initEvents : function() {
				var me = this, layerContainer = null;
				// 监听图层切换事件,根据切换的图层展示不同的图元
				me.regiestOnEvent(
						Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER,
						me.onLayerChanged.bind(me), me,
						"Dep.framework.editor.plugin.containers.Layer");
				// 根据画布窗口的panel大小调整工具箱位置
				me.regiestOnEvent(
						Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE,
						function(
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

				// 单击toolbox图标并添加完图元后,将工具箱中的grid选中第一个,即[选择]的位置
				me.regiestOnEvent(
						Dep.framework.editor.EVENT.CANVAS.AFTERADDAFIGURE,
						/*function() {
							// grid没有的话，不设置selection
							(me.getCurrentGrid()) ? me.getCurrentGrid()
									.getSelectionModel().select(0) : null;
						}*/me.clearSelection, me, "Dep.framework.editor.plugin.containers.Canvas");

				me.regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.MOUSETYPEDEFAULT ,
						me.clearSelection, me,
						"Dep.framework.editor.plugin.containers.Canvas");
				me.regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.MOUSETYPEHAND, me.clearSelection,
						me, "Dep.framework.editor.plugin.containers.Canvas");

			},

			/**
			 * @private 初始创建图形工具箱并展示
			 * 
			 * @param {Object}
			 *            pluginData
			 */
			_initView : function(pluginData) {
				var me = this, canvasPanel = me.getCanvasContainerPanel();
				// 如果配置的有默认title,则修改系统默认title
				if (pluginData.title) {
					me.defaultTitle = pluginData.title;
				}
				// me.gridPanel =
				// Ext.create("Dep.framework.editor.view.ToolBoxGrid");
				me.toolBoxWin = Ext.create('Dep.framework.editor.view.ToolBox',
						{
							title : me.defaultTitle,
							constrainTo : canvasPanel.getEl(),
							collapsible : true,
							height : pluginData.height
									? pluginData.height
									: 300,// 设置高度
							floatParent : canvasPanel,
							items : [/* me.gridPanel */]
						});
				me.toolBoxWin.show();
				me.toolBoxWin.hide();
				me.rePositionToolBox();
				// 解决多个编辑器时各个tab页切换toolbox不隐藏的bug
				/*
				 * getCanvasContainer获取该插件的父插件,即画布容易插件;
				 * getEditor获取画布容器中缓存的编辑器对象,即根对象;
				 * getParentPanel方法获取编辑器容器中缓存的父窗口,即编辑器的挂载窗口.
				 */
				me.getCanvasContainer().getEditor().getParentPanel().on({
							"activate" : function() {
								// 不能直接显示toolbox，需要根据当前编辑图层配置渲染toolbox
								me.onLayerChanged(me.currentEditLayer);
								// this.toolBoxWin.show();
							},
							"deactivate" : function() {
								this.toolBoxWin.hide();
							},
							scope : me
						});
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
			 * @param {}
			 *            layerObj 图层容器对象
			 */
			onLayerChanged : function(layerObj) {
				this.currentEditLayer = layerObj;
				if (!layerObj) {// 如果未选中任何图层,则只是清空图元工具箱
					this.clearAllFiguresFromToolBox();
					return;
				}
				var me = this, figureGroups = layerObj.fGroups, modelManager = me
						.getEditor().getModelManager(), figureConfigs, order;
				// 先清除图形工具箱中的所有图元
				me.clearAllFiguresFromToolBox();
				// 解析figureGroups属性,将所有的图元组解析出来
				if (figureGroups) {
					layerFigureGroupArray = figureGroups.split(",");
					me.getToolBoxWin().show();
				} else {
					Dep.framework.editor.util.Msg
							.success(Dep.framework.editor.I18N.TOOLBOX.NOCONFIG);
					return;
				}
				// 根据图层id获取该图层 在图元工具箱中的配置对象
				var config = me.getCacheDataByLType(layerObj.type);
				if (!config) {
					// 没有配置，隐藏工具箱
					me.getToolBoxWin().hide();// 隐藏
					console.log("未能获取关于此图层的工具箱配置,图层id为:" + layerObj.type);
					return;
				}
				// 获取当前图形需要展示的图元组集合
				var displayGroups = config.displayGroups;

				// 遍历图元组数组
				$.each(displayGroups, function(n, groupObj) {
					// 获取每个图元对象中的title
					title = groupObj.title ? groupObj.title : "";
					// 获取图元组对象中当前展示的图元组集合
					figureGroups = groupObj.figureGroups;
					if (!figureGroups) {
						return;
					}
					// 获取图元组对象中当前展示的图元组集合
					figureGroupArray = figureGroups.split(",");
					if (!figureGroupArray || figureGroupArray.length <= 0) {
						return;
					}
					// 将图元工具箱中配置的展示图元组和图层中配置的图元组进行比对,筛除不属于当前图层的图元组
					me.validataDisplsyGroups(figureGroupArray,
							layerFigureGroupArray);
					var grid = me.getGridPanel();
					// 遍历图元组集合,根据每个图元组的名称获取其下的所有图元类型
					figureConfigArray = modelManager
							.getTypesByGroup(figureGroupArray);
					if (groupObj.filter) {
						filterList = groupObj.filter.split(",");
						// 如果用户配置有过滤信息,则根据过滤配置来过滤图元
						if (filterList && filterList.length > 0) {
							figureConfigArray = figureConfigArray.filter(
									function(obj) {
										return filterList.indexOf(obj) == -1;
									});
						}
					}
					// 对工具箱进行排序
					figureConfigs = [];
					order = groupObj.order;
					if (!Ext.isArray(order)) {
						order = null;
					}
					if (order) {
						$.each(order, function(n, fType) {
									if (figureConfigArray.indexOf(fType) != -1) {
										figureConfigs.push(fType);// 放入新数组
										// figureConfigArray.remove(fType);//从原有数组中移除
									}

								});
						var tempFigures = [];
						$.each(figureConfigArray, function(n, fType) {
									if (figureConfigs.indexOf(fType) == -1) {// 没有排序的图元，需要清理出来
										tempFigures.push(fType);// 放入新数组
									}

								});
						figureConfigArray = tempFigures;
					}

					// 用来排序
					figureConfigs = figureConfigArray ? figureConfigs
							.concat(figureConfigArray) : figureConfigs;
					// 对工具箱排序完毕
					$.each(figureConfigs, function(n, figureConfig) {
								// 根据图元标识,从模型管理器中取得图元的配置信息
								configModel = modelManager.get(figureConfig);
								if (!configModel) {
									me.logger.error("未能从模型管理器中找到图元信息，图元标识为："
											+ figureConfig + "请检查图元配置！");
									return;
								}
								me.reFillToolBox(
										modelManager.get(figureConfig), grid);
							});

					// $.each(figureGroupArray, function(n, figureGroup) {
					// if (!figureGroup) {
					// return;
					// }
					// //获取当前图元组下的所有图元类型集合
					// figureConfigArray = modelManager
					// .getTypesByGroup(figureGroup);
					// //根据过滤配置过滤图元
					// if (groupObj.filter) {
					// filterList = groupObj.filter.split(",");
					// // 如果用户配置有过滤信息,则根据过滤配置来过滤图元
					// if (filterList && filterList.length > 0) {
					// figureConfigArray = figureConfigArray.filter(
					// function(obj) {
					// return filterList.indexOf(obj) == -1;
					// });
					// }
					// }
					//
					// //遍历当前图元组下的所有图元,将它们添加到图元工具箱中
					// $.each(figureConfigArray, function(n, figureConfig) {
					// // 根据图元标识,从模型管理器中取得图元的配置信息
					// configModel = modelManager
					// .get(figureConfig);
					// if (!configModel) {
					// me.logger
					// .error("未能从模型管理器中找到图元信息，图元标识为："
					// + figureConfig
					// + "请检查图元配置！");
					// return;
					// }
					// me.reFillToolBox(modelManager
					// .get(figureConfig), grid);
					// });
					// });
					grid.setTitle(title);
					me.gridList.add(grid);
					me.getToolBoxWin().add(grid);
				});
				me.getToolBoxWin().doLayout();
			},
			/**
			 * 
			 * @param {}
			 *            validateArray
			 * @param {}
			 *            standardArray
			 */
			validataDisplsyGroups : function(validateArray, standardArray) {
				var data = {};
				$.each(standardArray, function(n, groupName) {
							data[groupName] = groupName;
						});
				$.each(validateArray, function(n, groupName) {
							if (!data[groupName]) {
								validateArray.splice(n, 1);
								n = n - 1;
							}
						});
				return validateArray;
			},
			/**
			 * 根据图元组的配置重新填充图元工具箱
			 * 
			 * @param figureModel
			 *            图元模型对象
			 * 
			 */
			reFillToolBox : function(figureModel, grid) {
				var me = this, store = grid.getStore();
				if (!figureModel) {
					throw "未正确获取图元配置信息";
				}
				// port图元暂时不会添加到图元工具箱中
				if (figureModel.isPort === "true") {
					return;
				}
				store.add(figureModel);
			},
			/**
			 * 将图形工具箱清空,以便重新填充
			 */
			clearAllFiguresFromToolBox : function() {
				var me = this;
				me.gridList.each(function(n, grid) {
							grid.getStore().removeAll();
							grid.destroy();
						});
				me.gridList.clear();
				me.getToolBoxWin().hide();
			},
			/**
			 * 缓存每个图层的配置信息
			 * 
			 * @param {}
			 *            pluginData
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
			 * 
			 * @param {String}
			 *            lType 图层类型
			 * @returns {*}
			 */
			getCacheDataByLType : function(lType) {
				return this.cacheData[lType];
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
				var me = this, canvasPanel = me.getCanvasContainer()
						.getCanvasPanel();
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
			},
			/**
			 * 
			 */
			clearSelection : function() {
				var me = this,  selectedModel = me.getCurrentRecord(),grid=me.getCurrentGrid();
				if(grid){
				   grid.getSelectionModel().deselect(selectedModel);
				}
				if (me.currentLockItem && me.currentLockItemInnerHTML) {
					me.currentLockItem.firstChild.firstChild.innerHTML = me.currentLockItemInnerHTML
				}
			},
			/**
			 * 获取工具箱Panel对象
			 * 
			 * @return {Dep.framework.editor.view.ToolBoxGrid}
			 */
			getGridPanel : function() {
				var me = this, grid = Ext
						.create("Dep.framework.editor.view.ToolBoxGrid"), store = grid
						.getStore();
				/*
				 * store.add({ img :
				 * 'Dep/framework/editor/img/toolbox/mouse.svg', description :
				 * "选择" });
				 */
				// 单击图元工具箱上的图元模型事件
				grid.on("itemclick", function(panel, record, item, index, e,
						eOpts) {
					if (me.currentLockItem && me.currentLockItemInnerHTML) {
						me.currentLockItem.firstChild.firstChild.innerHTML = me.currentLockItemInnerHTML
					}
					me.currentLockItem = null;
					me.currentLockItemInnerHTML = null;
					me.raiseEvent(
							Dep.framework.editor.EVENT.TOOLBOX.GRIDITEMCLICKED,
							panel, record, item, index, e, eOpts);
					me.setCurrentGrid(grid);
					me.setCurrentRecord(record);
				});
				// 双击图元工具箱上的图元模型事件
				grid.on("itemdblclick", function(panel, record, item, index, e,
						eOpts) {
					if (me.currentLockItem && me.currentLockItemInnerHTML) {
						me.currentLockItem.firstChild.firstChild.innerHTML = me.currentLockItemInnerHTML
					}
					me.currentLockItem = item;
					me.currentLockItemInnerHTML = item.firstChild.firstChild.innerHTML;
					item.firstChild.firstChild.innerHTML += "&nbsp;&nbsp;<img style='vertical-align: middle;width:10; height:12;' src='Dep/framework/editor/img/toolbox/lock.svg' />";
					me
							.raiseEvent(
									Dep.framework.editor.EVENT.TOOLBOX.GRIDITEMDBLCLICKED,
									panel, record, item, index, e, eOpts);
					me.setCurrentGrid(grid);
					me.setCurrentRecord(record);
				});
				// 每个gird刚打开时默认选中第一个选项
				grid.on("afterlayout", function(panel, record, item, index, e,
								eOpts) {
//							grid.getSelectionModel().select(0);
						});
				return grid;
			},
			/**
			 * 获取当前图元工具箱中处于展示状态的grid
			 * 
			 * @return {Dep.framework.editor.view.ToolBoxGrid}
			 */
			getCurrentGrid : function() {
				if (this.currentGrid
						&& this.currentGrid instanceof Dep.framework.editor.view.ToolBoxGrid) {
					return this.currentGrid;
					//				} else {
					//					throw "未正确获取当前展示的grid";
				}
			},
			/**
			 * 设置当前图元工具箱中处于展示状态的grid
			 * 
			 * @param {}
			 *            grid
			 */
			setCurrentGrid : function(grid) {
				this.currentGrid = grid;
			},
			getCurrentRecord:function(rec){
			 return   this.currentRecourd;
			},
			setCurrentRecord:function(rec){
			   this.currentRecourd=rec;
			}
		});