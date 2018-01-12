/**
 * 视口类。
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
if (!Dep.framework.editor.base) {
	Dep.framework.editor.base = {};
}
/**
 * 视口类
 */
Dep.framework.editor.base.CanvasOutline = Dep.framework.editor.base.EventSource
		.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "Dep.framework.editor.base.CanvasOutline",
			/**
			 * 独立的视口类
			 * 
			 * @param parentPanel
			 *            视口窗体渲染依赖的panel
			 * @param relateCanvas
			 *            视口关联的画布
			 * @param scales
			 *            缩放因子,用来标识视口是在画布的基础上缩放多少后的结果
			 */
			init : function(parentPanel, relateCanvas, scales) {
				var me = this, canvas = null;
				me.parentPanel = parentPanel;
				me.relateCanvas = relateCanvas;
				me.scales = scales;

				me._initOutLine();
				me._initEvents();
//				parentPanel.hide();
			},
			/**
			 * 初始化视口及sizer
			 */
			_initOutLine : function() {
				var me = this, canvas = me.getRelateCanvas(), parentPanle = me
						.getParentPanel(), scrollLeft = canvas.getScrollLeft(), scrollTop = canvas
						.getScrollTop(), scales = me.getScales();
				/*
				 * //视口上绑定一个画布,其大小直接与该视口绑定的panel一样大,即视口中不会出现scrollbar,
				 * 也就是说视口中的画布应该被用户完全看到,不存在隐藏的画布部分
				 */
				me.outline = new draw2d.Canvas(parentPanle.getId() + "-body",
						canvas.getWidth() / scales, canvas.getHeight() / scales);
				// me.outline.getEditPolicy().removeAll();
				// 视口中用来表示当前画布展示部分的窗体
				me.sizer = new draw2d.shape.basic.OutlineSizer();
				// 将sizer添加到视口画布上,默认放在最顶部的位置
				me.outline.add(me.sizer, 0, 0);

				// 根据当前关联画布的scroll位置,重新定位sizer的位置.从而确保sizer的中的视图与用户在画布中看到的一致
				// me.rePositionSizer( );
			},
			/**
			 * 初始化事件监听
			 */
			_initEvents : function() {
				var me = this, factor = null, figure = null, attr = null;
				// sizer类的move事件,当sizer对象移动的时候,视口关联的画布应该要做出相应的移动
				me.getSizer().on(Dep.framework.editor.EVENT.OUTLINE.SIZERMOVED,
						function(sizer, diff) {
							me.getRelateCanvas().rePosition(diff,
									me.getScales(), me.getOutline());
						});
				// 画布缩放的时候,实时变化视口的大小,从而保证视口中展示用户看到的所有图元
				me.getRelateCanvas().on('zoom', function(canvas, factorObj) {
							me.resizeSizer();
						});

				// 监听画布的添加图元事件;
				me.getRelateCanvas().on("figure:add",
						function(canvas, figureObj) {
							me._synAddFigure(figureObj);
						});
				// 同步删除图元
				me.getRelateCanvas().on("figure:remove",
						function(canvas, figureObj) {
							me._synRemoveFigure(figureObj);
						});

				/*
				 * 以下的事件都是在body上经行的绑定,其实可以更加细化到视口窗中,但是有以下几种情形:
				 * 1.如果鼠标up只是绑定在视口窗,则鼠标移动出去后松开无法关闭视口框;
				 * 2.如果鼠标move只绑定在视口窗,则当鼠标移动出视口窗范围再回来后,sizer会出现跳跃的移动
				 */
				// 监听全局鼠标弹起事件,事件触发时如果sizer处于拖动状态,则关闭视口,并进行一系列的destroy操作
				/*Ext.getBody().on('mouseup', function(e) {
							if (me.isSizerMoving()) {
								me.sizeMoveEnd(e);
								me.getParentPanel().hide();
								me.sizerOldWidth = null;
							}
							me.getRelateCanvas().html.css({
										"cursor" : "default"
									});
							// 还原鼠标样式
							this.setStyle('cursor', "default");
						});

				// 监听全局的鼠标移动事件,事件触发时如果sizer处于拖动状态,则执行sizer的移动事件
				Ext.getBody().on('mousemove', function(e) {
							if (me.isSizerMoving()) {
								me.sizeMoveing(e);
								this.setStyle('cursor', "hand");
								me.getRelateCanvas().html.css({
											"cursor" : "hand"
										});
							}
						});*/
				// 定义视口窗中的鼠标样式未none,即不显示鼠标
				me.getParentPanel().getEl().on("mousemove", function(e) {
					// 因为panel里面又嵌套有一层div.Ext没有提供获得内层div的el的方法,只好用Jquery的方法了/(ㄒoㄒ)/~~
					$("#" + me.getParentPanel().getId() + "-body").css(
							"cursor", "hand");
				});
			},
			/**
			 * 当画布上添加一个图元时,视口上同步添加一个图元
			 * 
			 * @param {}
			 *            figureObj 画布添加的图元对象
			 */
			_synAddFigure : function(figureObj) {
				var me = this, figure = figureObj.figure, scales = me
						.getScales(), newFigure = null, newFigure = me
						._getCloneAndScaleFigure(figure);

						if(! newFigure){
						   return;
						}
				// 将缩小后的新图元添加到视口画布上,此时其子图元也添加到画布上了,但是没有进行缩放
				me.getOutline().add(newFigure, figure.getX() / scales,
						figure.getY() / scales);
				// 遍历新图元的所有子图元,进行缩放然后重布局
				newFigure.getChildren().each(function(i, e) {
					e.locator.relocate(i, me._getCloneAndScaleFigure(e.figure,
									true));
				});
				// 通过事件关联新旧图元
				me._addFigureEventListener(figure, newFigure, scales);
			},
			/**
			 * 将原有图元复制后按比例缩小(坐标,大小等)
			 * 
			 * @param {}
			 *            figure 需要复制的图元
			 * @param {}
			 *            clone 是否克隆 在修改子图元时不需要克隆
			 * @return {}
			 */
			_getCloneAndScaleFigure : function(figure, clone) {
				if (!figure) {
					return null;
				}
				var me = this, scales = me.getScales(), newFigure = null, newWidth, newHeight, newX, newY, targetPort = null, sourcePort = null;
				// 如果没有配这个参数,则复制新图元,
				if (!clone) {
					// 图元克隆会同时克隆子图元
					newFigure = figure.clone();
//					newFigure.setUserData(figure.getUserData())
				} else { // 还使用原来的图元,这里这个方法主要是对图元进行缩放
					newFigure = figure;
				}
				// 保持同步图元的id一致.以便查找图元
				newFigure.setId(figure.getId());
				// 椭圆形图元需要修改其半径和定点坐标

				if (newFigure instanceof draw2d.shape.node.Node) {
					newWidth = figure.getWidth() / scales;
					newHeight = figure.getHeight() / scales;
					newX = figure.getAbsoluteX() / scales;
					newY = figure.getAbsoluteY() / scales;
					// rx,ry表示水平和垂直坐标上的半径,cxcy表示圆心位置.椭圆需要修改圆心和半径
					newFigure.setWidth(newWidth);
					newFigure.setHeight(newHeight);
					newFigure.setPosition(newX, newY);
				} else if (newFigure instanceof draw2d.shape.basic.Line) {
					// 线性图元需要重新设置其端点
					// 首先获取线性图元关联的节点id,然后从视口中找到对应的图元
					// targetPort = me.getOutline().getFigure(
					// figure.getFigureGroup(),figure.getSource().getId());
					// sourcePort = me.getOutline().getFigure(
					// figure.getFigureGroup(),figure.getTarget().getId());
					if (!figure.getTarget() || figure.getSource()) {
						return null;
					}
					targetPort = me.getOutline()
							.getFigure(figure.getFigureGroup(),
									figure.getTarget().getId());
					sourcePort = me.getOutline()
							.getFigure(figure.getFigureGroup(),
									figure.getSource().getId());

					if (!targetPort) {
						targetPort = figure.getTarget().getParent()
								.getHybridPort();
					}
					if (!sourcePort) {
						sourcePort = figure.getSource().getParent()
								.getHybridPort();
					}
					// 设置视口上的线性图元的两端节点
					if (targetPort && sourcePort) {
						// 设置两端的节点
						newFigure.setTarget(targetPort);
						newFigure.setSource(sourcePort);
						// 设置装饰物
						if (figure.getTargetDecorator()) {
							newFigure
									.setTargetDecorator(figure
											.getTargetDecorator().clone()
											.Scale(scales));
						}
						if (figure.getSourceDecorator()) {
							newFigure
									.setSourceDecorator(figure
											.getSourceDecorator().clone()
											.Scale(scales));
						}
						// 设置路由形式
						if (figure.getRouter()) {
							newFigure.setRouter(figure.getRouter().clone());
						}
					}
					// newFigure.setVertices(me.translateVertices(figure.getVertices()));
				}
				newFigure.setEditable(false);
				return newFigure
			},
			/**
			 * 根据视口和画布的缩放比例,转换线性图元的每个拐点坐标
			 * 
			 * @param {draw2d.util.ArrayList}
			 *            oldVertices
			 * @return {draw2d.util.ArrayList}
			 */
			translateVertices : function(oldVertices) {
				var me = this, newVertices = new draw2d.util.ArrayList(), scale = me
						.getScales(), str = "", heander = "";
				if (!(oldVertices instanceof draw2d.util.ArrayList)) {
					return newVertices;
				}
				oldVertices.each(function(n, vertices) {
							newVertices.add(new draw2d.geo.Point(vertices.x
											/ scale, vertices.y / scale));
						});
				newVertices.each(function(n, vertices) {
							if (n == 0) {
								heander = "M";
							} else {
								heander = "L";
							}
							str += (heander + vertices.x + " " + vertices.y + " ");
						});

				return str;
			},
			/**
			 * 添加对画布上图元的事件监听,从而保持画布图元和视口图元的同步
			 * 
			 * @param figure
			 * @param newFigure
			 * @param scales
			 * @private
			 */
			_addFigureEventListener : function(figure, newFigure, scales) {

				var me = this, zoom = null, port = null, label = null, oldVertices = [];
				// 监听X坐标改变事件
				figure.on("change:x", function() {
							zoom = me.getRelateCanvas().getZoom();
							newFigure.setX((figure.getX() / scales) / zoom);
						});
				// 监听Y坐标改变事件
				figure.on("change:y", function() {
							zoom = me.getRelateCanvas().getZoom();
							newFigure.setY((figure.getY() / scales) / zoom);
						});

				// 监听长宽变化事件
				figure.on("change:dimension", function() {
							newFigure.setDimension(figure.getWidth() / scales,
									figure.getHeight() / scales);
						});

				// 图元隐藏展示事件
				figure.on("show", function() {
							newFigure.setVisible(true);
						});
				figure.on("hide", function() {
							newFigure.setVisible(false);
						});
				figure.on("addport", function(figure, obj) {
							port = me._getCloneAndScaleFigure(obj.port);
							newFigure.addPort(port, obj.locator);
							newFigure.layoutPorts();
							port.setVisible(false);
						});
				/*figure.on("addlabel", function(figure, obj) {
							label = newFigure.getLabel();
							label.setFontSize(label.getFontSize()
									/ me.getScales());
							newFigure.addLabelToFigure();
							newFigure.getLabel().setText(figure.getLabel()
									.getText());
						});
				figure.on("changeLabel", function(figure, name) {
					newFigure.getLabel().setText(name);
						// newFigure.repaint();
					});*/

				figure.on("removeport", function(figure, obj) {
							port = me.getOutline().getFigure(
									figure.getFigureGroup(), obj.port.getId());
							newFigure.removePort(port);
							me.getOutline().getGroupManager().removeFigure(
									port.getGroupType(), port);
						});

				if (figure instanceof draw2d.shape.basic.Line) {
					figure.on("change:vertices", function(figure, obj) {
								newFigure.svgPathString = me
										.translateVertices(figure.getVertices())
								newFigure.repaint();
							});
				}
			},
			/**
			 * 当画布删除一个图元时,视口保持同步删除
			 * 
			 * @param {}
			 *            figureObj
			 */
			_synRemoveFigure : function(figureObj) {
				var me = this, outLine = me.getOutline(), figure = figureObj.figure, figureID = figure
						.getId(), delFigure = outLine.getFigure(figure
								.getFigureGroup(), figureID);
				if (delFigure) {
					outLine.remove(delFigure);
				}
			},
			/**
			 * 根据页面和画布的比例调整sizer的大小
			 * 
			 * @param containerPanel
			 */
			resizeSizer : function(containerPanel) {
				// 缓存画布依赖的窗口
				if (containerPanel) {
					this.containerPanel = containerPanel;
				}
				// 因为下面的计算要依赖画布使用的窗口,所以如果该属性为空,则直接返回
				if (!this.containerPanel) {
					return;
				}
				var me = this, canvas = me.getRelateCanvas(), zoom = canvas
						.getZoom(), containerPanel = this.containerPanel, canvasWidth = canvas
						.getWidth()
						/ zoom, canvasHeight = canvas.getHeight() / zoom, containerWidth = containerPanel
						.getWidth(), containerHeight = containerPanel
						.getHeight(), widthPercent = containerWidth
						/ canvasWidth, heightPercent = containerHeight
						/ canvasHeight, outline = me.getOutline(), outLineWidth = outline
						.getWidth(), outLineHeight = outline.getHeight(), sizer = me
						.getSizer(), sizerWidth = outLineWidth * widthPercent, sizerHeight = outLineHeight
						* heightPercent;
				sizer.setDimension(sizerWidth, sizerHeight);
			},
			/**
			 * TODO 需要考虑画布的缩放 在移动画布的时候更新sizer的位置
			 * 
			 * @param diff
			 *            包含滚动条相对位置的对象
			 */
			rePositionSizer : function() {
				var me = this, canvas = me.getRelateCanvas(), zoom = canvas
						.getZoom(), scrollLeft = canvas.getViewBoxX()
				/* / zoom */, scrollTop = canvas.getViewBoxY() /* / zoom */, scales = me
						.getScales(), sizerX = scrollLeft / scales, sizeY = scrollTop
						/ scales;
				me.getSizer().setPosition(sizerX, sizeY);
			},
			/**
			 * 当视口窗体弹出的时候,调用此方法. 为sizer的移动做准备工作
			 * 
			 * @param event
			 * @param canvasPanel
			 */
			sizeMoveStart : function(event, canvasPanel) {
				var me = this;
				// 修改标志位,表明当前系统处于移动视口的sizer状态
				me.sizeMoving = true;
				// 缓存鼠标按下的位置,用来计算鼠标移动过程中的位移,从而设置sizer的位置
				me.sizeMovingStartX = event.getX();
				me.sizeMovingStartY = event.getY();
				// 根据画布所在panel计算sizer的形状以及相对位置
				me.resizeSizer(canvasPanel);
				me.rePositionSizer();

				me.getSizer().onDragStart(event.getX(), event.getY());
			},
			/**
			 * 当视口鼠标Up时,调用此方法,做一些清理工作
			 * 
			 * @param event
			 */
			sizeMoveEnd : function(event) {
				var me = this;
				me.sizeMoving = false;
			},
			/**
			 * 鼠标移动过程中,sizer跟随鼠标移动
			 * 
			 * @param event
			 */
			sizeMoveing : function(event) {
				var me = this, differX = event.getX() - me.sizeMovingStartX, differY = event
						.getY()
						- me.sizeMovingStartY;
				me.getSizer().onDrag(differX, differY);
			},
			/**
			 * 获取视口关联的画布
			 */
			getRelateCanvas : function() {
				if (this.relateCanvas) {
					return this.relateCanvas;
				} else {
					throw "未指定视口关联的画布";
				}
			},
			/**
			 * 获取视口的父id,用来创建视口上的同步画布
			 * 
			 * @return {}
			 */
			getParentPanel : function() {
				if (this.parentPanel) {
					return this.parentPanel;
				} else {
					throw "未指定视口的父id";
				}
			},
			/**
			 * 获取视口中的画布组件
			 * 
			 * @returns {Dep.framework.editor.base.CanvasOutline|*}
			 */
			getOutline : function() {
				if (this.outline) {
					return this.outline;
				} else {
					throw "视口画布未初始化";
				}
			},

			/**
			 * 获取视口内的矩形框
			 * 
			 * @returns {draw2d.shape.basic.OutlineSizer|*}
			 */
			getSizer : function() {
				if (this.sizer) {
					return this.sizer;
				} else {
					throw "视口内的矩形框未初始化";
				}
			},
			/**
			 * 获取缩放因子
			 * 
			 * @returns {*}
			 */
			getScales : function() {
				if (this.scales) {
					return this.scales;
				} else {
					this.scales = this.getRelateCanvas().getWidth()
							/ this.getOutline.getWidth();
					return this.scales;
				}
			},
			/**
			 * 判断当前是否处于sizer移动的状态中
			 * 
			 * @return {boolean}
			 */
			isSizerMoving : function() {
				return this.sizeMoving;
			}
		});