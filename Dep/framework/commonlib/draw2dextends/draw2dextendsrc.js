/**
 * @author HeYuqing
 * draw2d.js 
 * 2015年4月3日 上午10:57:10
 * 这里主要是对draw2d的命名空间以及公共/全局方法的管理
 */
draw2d = draw2d || {};
//新增画布布局策略
draw2d.policy = draw2d.policy || {};
draw2d.policy.canvas = draw2d.policy.canvas || {};
draw2d.policy.canvas.layout = draw2d.policy.canvas.layout || {};

/**
 * 截取队列中的前num项数据,返回截取数据的集合
 * 
 * @param {}
 *            start 截取项开始的索引
 * @param {}
 *            end 截取项结束的索引
 * @return {draw2d.util.ArrayList} 返回截取的数据集
 */
draw2d.util.ArrayList.prototype.slice = function(start, end) {
	var tempArray = this.data.slice(start, end);
	return new draw2d.util.ArrayList(tempArray);
};
/**
 * 清空数据
 */
draw2d.util.ArrayList.prototype.clear = function() {
	this.data = [];
};
/**
 * @author HeYuqing
 * FigureManager.js 
 * 2015年4月23日 下午3:55:57
 * 图形管理器
 * 该管理器持有一个二维数组,保存每种类型的图元的实例,同时提供根据图元id获取图元的方式
 */
draw2d.util.FigureManager = Class.extend({

			/**
			 * 类名
			 * @type String
			 */
			NAME : "draw2d.util.FigureManager",
			/**
			 * 初始化对象
			 */
			init : function() {
				var me = this;
				me.figuresMap = new draw2d.util.HashMap();
				me.figureIdsMap = new draw2d.util.HashMap();
			},
			/**
			 * 将一个图元编辑到管理器中
			 * @param figure
			 */
			addFigure : function(figure) {
				var me = this, figureType = figure.getFigureType(), figureList = me
						.getFiguresMap().get(figureType);
				//按照该图元的id保存图元

				me.getFigureIdsMap().put(figure.getId(), figure);
				if (!figureType) {
					console.log("在向图元管理器注册时未获取到该图元的类名");
					return;
					//            throw "未获取到该图元的类名";
				}
				//按图元的类型保存图元
				if (figureList) {
					figureList.add(figure);
				} else {
					//如果该图元所属分类为创建,则创建该分类集合并将图元添加进去
					me.getFiguresMap().put(figureType,
							new draw2d.util.ArrayList([figure]));
				}
			},

			/**
			 * 将一个图元移除管理器
			 * @param figure
			 */
			removeFigure : function(figure) {
				var me = this, figureId = figure.getId(), figureType = figure
						.getFigureType(), figureList = null;
				me.getFigureIdsMap().remove(figureId);
				if (!figureType) {
					//        	console.log("未获取到该图元的类名");
					return;
				}
				figureList = me.getFiguresMap().get(figureType);
				figureList.remove(figure);
			},

			/**
			 * 图元id变化时更新idmap
			 * @param oldId
			 * @param figure
			 */
			updateFigureID : function(oldId, figure) {
				this.getFigureIdsMap().remove(oldId);
				this.getFigureIdsMap().put(figure.getId(), figure);
			},
			/**
			 * 根据类名获取管理器内该类的所有图元
			 * @param figureType
			 * @returns {*}
			 */
			getFigureListByFigureType : function(figureType) {
				return this.getFiguresMap().get(figureType);
			},
			/**
			 * 根据图元id获取图元实例
			 * @param id
			 * @returns {*}
			 */
			getFigureById : function(id) {
				return this.getFigureIdsMap().get(id);
			},
			/**
			 * 获取缓存所有图元id的集合
			 * @returns {draw2d.util.HashMap|*}
			 */
			getFigureIdsMap : function() {
				if (this.figureIdsMap) {
					return this.figureIdsMap;
				} else {
					throw "未正确创建图元id集合";
				}
			},
			/**
			 * 获取缓存所有图元集合的map
			 * @returns {draw2d.util.HashMap|*}
			 */
			getFiguresMap : function() {
				if (this.figuresMap) {
					return this.figuresMap;
				} else {
					throw "未正确创建图元figure集合";
				}
			}
		});
/**
 * @author HeYuqing GroupManager.js 2015年4月23日 下午3:55:57 图形管理器
 *         该管理器持有一个二维数组,保存每种类型的图元的实例,同时提供根据图元id获取图元的方式
 */
draw2d.util.GroupManager = Class.extend({

	/**
	 * 类名
	 * 
	 * @type String
	 */
	NAME : "draw2d.util.GroupManager",
	/**
	 * 初始化对象
	 */
	init : function() {
		var me = this;
		me.groupsMap = new draw2d.util.HashMap();
	},
	/**
	 * 
	 * @param {}
	 *            groupType 图层
	 * @param {}
	 *            figure 图元
	 */
	addFigure : function(groupType, figure) {
		var me = this, figureMng = me.groupsMap.get(groupType)/* 获取该图层内图元的缓存 */;
		if (figureMng) {
			figureMng.addFigure(figure);
		} else {
			figureMng = new draw2d.util.FigureManager();
			figureMng.addFigure(figure);
			me.groupsMap.put(groupType, figureMng);
		}
	},

	/**
	 * 将一个图元移除管理器
	 * 
	 * @param {}
	 *            groupType
	 * @param {}
	 *            figure
	 */

	removeFigure : function(groupType, figure) {
		var me = this, figureMng = me.getFigureMngByGroupType(groupType);
		if (figureMng) {
			figureMng.removeFigure(figure);
		}
	},

	/**
	 * 图元id变化时更新id map
	 * 
	 * @param {}
	 *            groupType
	 * @param {}
	 *            oldId
	 * @param {}
	 *            figure
	 */

	updateFigureID : function(groupType, oldId, figure) {
		var me = this, figureMng = me.getFigureMngByGroupType(groupType);
		figureMng.updateFigureID(oldId, figure);
	},
	/**
	 * 根据类名获取管理器内该类的所有图元
	 * 
	 * @param {}
	 *            groupType
	 * @param {}
	 *            type
	 */
	getFigureListByFigureType : function(groupType, type) {
		var me = this, figureMng = me.getFigureMngByGroupType(groupType);
		if (figureMng) {
			return figureMng.getFigureListByFigureType(type);
		} else {
			return null;
		}
	},
	/**
	 * 根据图元id获取图元实例
	 * 
	 * @param {}
	 *            groupType
	 * @param {}
	 *            id
	 * @return {}
	 */
	getFigureById : function(groupType, id) {
		var me = this, figureMng = me.getFigureMngByGroupType(groupType);
		if (!figureMng) {
			return null;
		}
		return figureMng.getFigureById(id);
	},
	/**
	 * 根据图元id获取图元实例 弃用
	 * 
	 * @param {}
	 *            groupType
	 * @param {}
	 *            id
	 * @return {}
	 */
	// getFigureByViewId : function(groupType,id) {
	// var me = this, figureMng = me.getFigureMngByGroupType(groupType);
	// return figureMng.getFigureViewIdsMap().get(id);
	// },
	/**
	 * 获取缓存所有图元id的集合
	 * 
	 * @param {}
	 *            groupType
	 * @return {}
	 */
	getFigureIdsMap : function(groupType) {
		var me = this, figureMng = me.getFigureMngByGroupType(groupType);
		if (figureMng.figureIdsMap) {
			return figureMng.figureIdsMap;
		} else {
			throw "未正确创建图元id集合";
		}
	},
	/**
	 * 
	 * @param {}
	 *            groupType
	 * @return {}
	 */
	// getFigureViewIdsMap : function(groupType) {
	// var me = this, figureMng = me.getFigureMngByGroupType(groupType);
	// if (figureMng.figureViewIdsMap) {
	// return figureMng.figureViewIdsMap;
	// } else {
	// throw "未正确创建图元view id集合";
	// }
	// },
	/**
	 * 获取缓存所有图元集合的map
	 * 
	 * @returns {draw2d.util.HashMap|*}
	 */
	getFiguresMap : function(groupType) {
		var me = this, figureMng = me.getFigureMngByGroupType(groupType);
		if (figureMng.figuresMap) {
			return figureMng.figuresMap;
		} else {
			throw "未正确创建图元figure集合";
		}
	},
	/**
	 * 根据图层类型,获取该图层的图元缓存管理器
	 * 
	 * @param {}
	 *            groupType
	 */
	getFigureMngByGroupType : function(groupType) {
		var me = this, figureMng = me.groupsMap.get(groupType);
		if (!figureMng) {
			// throw "无法获取到正确的图层缓存器,请校验图层类型正确性";
			return null;
		}
		return figureMng;
	}
});
/**
 * @author HeYuqing HashMap.js 2015年4月23日 下午4:05:44 一个工具类实现map类型的数据结构
 */
draw2d.util.HashMap = Class.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.util.HashMap",
			/**
			 * 数据个数
			 * 
			 * @type Number
			 */
			size : 0,
			/**
			 * 用来缓存数据
			 * 
			 * @type
			 */
			entry : null,
			/**
			 * 对象初始化方法
			 * 
			 * @param {}
			 *            config
			 */
			init : function(config) {
				var me = this;
				me.size = 0;
				me.entry = {};
			},
			/**
			 * 存
			 */
			put : function(key, value) {
				if (!this.containsKey(key)) {
					this.size++;
				}
				this.entry[key] = value;
			},

			clear : function() {
				var me = this;
				me.size = 0;
				me.entry = {};

			},
			/**
			 * 取
			 */
			get : function(key) {
				if (this.containsKey(key)) {
					return this.entry[key];
				} else {
					return null;
				}
			},

			/**
			 * 删除
			 */
			remove : function(key) {
				if (delete this.entry[key]) {
					this.size--;
				}
			},

			/**
			 * 删除所有数据
			 */
			removeAll : function(key) {
				var me = this;
				me.entry = {};
			},

			/** 是否包含 Key * */
			containsKey : function(key) {
				return (key in this.entry);
			},

			/**
			 * 是否包含 value
			 */
			containsValue : function(value) {
				for (var prop in this.entry) {
					if (this.entry[prop] == value) {
						return true;
					}
				}
				return false;
			},

			/**
			 * 所有 Value
			 */
			values : function() {
				var values = [];
				for (var prop in this.entry) {
					values.push(this.entry[prop]);
				}
				return values;
			},

			/**
			 * 所有 Key
			 */
			keys : function() {
				var keys = [];
				for (var prop in this.entry) {
					keys.push(prop);
				}
				return keys;
			},

			/**
			 * Map Size
			 */
			getSize : function() {
				return this.size;
			},
			/**
			 * 遍历map调用func
			 * 
			 * @param {}
			 *            func
			 */
			each : function(func) {
				for (var item in this.entry) {
					if (func(item, this.entry[item]) === false)
						break;
				}
			}
		});
/**
 * 覆盖画布的初始化方法,实现个性化定制画布
 * 
 * @param {}
 *            canvasId 画布依赖的div的id
 * @param {}
 *            width 画布宽度
 * @param {}
 *            height 画布高度
 */
draw2d.Canvas.prototype.init = function(canvasId, width, height, container) {

	var _this = this/* ,width=1800,height=3000 */;
	_this.setContainer(container);
	// Hook the canvas calculation for IE8
	//
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseInt(RegExp.$1);
			if (rv === 8) {
				this.fromDocumentToCanvasCoordinate = this._fromDocumentToCanvasCoordinate_IE8_HACK;
			}
		}
	}

	// 在原来的基础上修改其ScrollArea,由原来的document.body改为画布所在 的div
	this.setScrollArea("#" + canvasId);
	this.canvasId = canvasId;
	this.html = $("#" + canvasId);
	this.html.css({
				"cursor" : "default"
			});
	// 缓存设置的画布的宽高 ,原来画布的宽高直接关联在其绑定的div的宽高上,现在将其独立出来
	if (typeof width !== "undefined") {
		this.initialWidth = width;
		this.initialHeight = height;
		this.setWidth(width);
		this.setHeight(height);
	} else {
		// 默认使用画布关联的div的宽高
		this.initialWidth = this.getHtmlWidth();
		this.initialHeight = this.getHtmlHeight();
	}

	// avoid the "highlighting" in iPad, iPhone if the user tab/touch on the
	// canvas.
	// .... I don't like this.
	this.html.css({
				"-webkit-tap-highlight-color" : "rgba(0,0,0,0)"
			});

	// Drag&Drop Handling from foreign DIV into the Canvas
	// Only available in combination with jQuery-UI
	//
	// Create the droppable area for the css class "draw2d_droppable"
	// This can be done by a palette of toolbar or something else.
	// For more information see : http://jqueryui.com/demos/droppable/
	//
	if (typeof this.html.droppable !== "undefined") {
		this.html.droppable({
					accept : '.dragDropArea',
					over : function(event, ui) {
						_this.onDragEnter(ui.draggable);
					},
					out : function(event, ui) {
						_this.onDragLeave(ui.draggable);
					},
					drop : function(event, ui) {
						event = _this._getEvent(event);
						var pos = _this.fromDocumentToCanvasCoordinate(
								event.clientX, event.clientY);
						_this.onDrop(ui.draggable, pos.getX(), pos.getY(),
								event.shiftKey, event.ctrlKey);
					}
				});

		// Create the jQuery-Draggable for the palette -> canvas drag&drop
		// interaction
		//
		$(".dragDropArea").draggable({
			appendTo : "body",
			stack : "body",
			zIndex : 27000,
			helper : "clone",
			drag : function(event, ui) {
				event = _this._getEvent(event);
				var pos = _this.fromDocumentToCanvasCoordinate(event.clientX,
						event.clientY);
				_this.onDrag(ui.draggable, pos.getX(), pos.getY(),
						event.shiftKey, event.ctrlKey);
			},
			stop : function(e, ui) {
			},
			start : function(e, ui) {
				$(ui.helper).addClass("shadow");
			}
		});
	}

	// painting stuff
	//
	if (typeof height !== "undefined") {
		this.paper = Raphael(canvasId, width, height);
	} else {
		this.paper = Raphael(canvasId, this.getWidth(), this.getHeight());
	}
	this.paper.canvas.style.position = "absolute";

	// Status handling
	//
	this.zoomFactor = 1.0; // range [0.001..10]
	this.selection = new draw2d.Selection();
	this.currentDropTarget = null;
	this.currentHoverFigure = null;

	// eventhandling since version 5.0.0
	this.eventSubscriptions = {};

	this.editPolicy = new draw2d.util.ArrayList();

	// internal document with all figures, ports, ....
	//
	this.figures = new draw2d.util.ArrayList();
	this.lines = new draw2d.util.ArrayList(); // crap - why are connections
	// not just figures. Design by
	// accident
	this.commonPorts = new draw2d.util.ArrayList();
	this.dropTargets = new draw2d.util.ArrayList();

	// all visible resize handles which can be drag&drop around. Selection
	// handles like AntRectangleSelectionFeedback
	// are not part of this collection. Required for hitTest only
	this.resizeHandles = new draw2d.util.ArrayList();

	// The CommandStack for undo/redo operations
	// 
	this.commandStack = new draw2d.command.CommandStack();

	// INTERSECTION/CROSSING handling for connections and lines
	//
	this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList();
	this.lineIntersections = new draw2d.util.ArrayList();

	this.installEditPolicy(new draw2d.policy.canvas.DefaultKeyboardPolicy()); // Handles
	//	this.installEditPolicy(new draw2d.policy.canvas.DefaultEditorKeyboardPolicy()); // Handles
	// the
	// ke3yboard
	// interaction
	this
			.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy()); // Responsible
	// for
	// selection
	// handling
	this
			.installEditPolicy(new draw2d.policy.canvas.ConnectionInterceptorPolicy());// Responsible
	// for
	// port,
	// connection
	// and
	// drop
	// operations

	// Calculate all intersection between the different lines
	//
	this.commandStack.addEventListener(function(event) {
				if (event.isPostChangeEvent() === true) {
					_this.calculateConnectionIntersection();
					_this.linesToRepaintAfterDragDrop.each(function(i, line) {
								line.svgPathString = null;
								line.repaint();
							});
					_this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList();
				}
			});

	// DragDrop status handling
	//
	this.mouseDown = false;
	this.mouseDownX = 0;
	this.mouseDownY = 0;
	this.mouseDragDiffX = 0;
	this.mouseDragDiffY = 0;

	this.html.bind("mouseup touchend", function(event) {
				if (_this.mouseDown === false) {
					return;
				}

				event = _this._getEvent(event);
				_this.calculateConnectionIntersection();

				_this.mouseDown = false;
				var pos = _this.fromDocumentToCanvasCoordinate(event.clientX,
						event.clientY);
				_this.editPolicy.each(function(i, policy) {
							policy.onMouseUp(_this, pos.x, pos.y,
									event.shiftKey, event.ctrlKey);
						});

				_this.mouseDragDiffX = 0;
				_this.mouseDragDiffY = 0;
			});

	this.html.bind("mousemove touchmove", function(event) {
				event = _this._getEvent(event);
				if (_this.mouseDown === false) {
					var pos = _this.fromDocumentToCanvasCoordinate(
							event.clientX, event.clientY);
					// mouseEnter/mouseLeave events for Figures. Don't use the
					// Raphael or DOM native functions.
					// Raphael didn't work for Rectangle with transparent fill
					// (events only fired for the border line)
					// DOM didn't work well for lines. No eclipse area - you
					// must hit the line exact to retrieve the event.
					// In this case I implement my own stuff...again and again.
					//
					// don't break the main event loop if one element fires an
					// error during enter/leave event.
					try {
						var hover = _this.getBestFigure(pos.x, pos.y);
						if (hover !== _this.currentHoverFigure
								&& _this.currentHoverFigure !== null) {
							_this.currentHoverFigure.onMouseLeave();
						}
						if (hover !== _this.currentHoverFigure
								&& hover !== null) {
							hover.onMouseEnter(event.clientX, event.clientY);
						}
						if (hover == _this.currentHoverFigure && hover !== null
								&& hover.onMouseMove) {
							hover.onMouseMove(event.clientX, event.clientY);
						}
						_this.currentHoverFigure = hover;

					} catch (exc) {
						// just write it to the console
						console.log(exc);
					}

					_this.editPolicy.each(function(i, policy) {
								policy.onMouseMove(_this, pos.x, pos.y,
										event.shiftKey, event.ctrlKey);
							});
				} else {
					var diffXAbs = (event.clientX - _this.mouseDownX)
							* _this.zoomFactor;
					var diffYAbs = (event.clientY - _this.mouseDownY)
							* _this.zoomFactor;
					_this.editPolicy.each(function(i, policy) {
								policy.onMouseDrag(_this, diffXAbs, diffYAbs,
										diffXAbs - _this.mouseDragDiffX,
										diffYAbs - _this.mouseDragDiffY);
							});
					_this.mouseDragDiffX = diffXAbs;
					_this.mouseDragDiffY = diffYAbs;
				}
			});

	this.html.bind("mousedown touchstart", function(event) {
				try {
					var pos = null;
					switch (event.which) {
						case 1 : // touch pressed
						case 0 : // Left mouse button pressed
							event.preventDefault();
							event = _this._getEvent(event);
							_this.mouseDownX = event.clientX;
							_this.mouseDownY = event.clientY;
							_this.mouseDragDiffX = 0;
							_this.mouseDragDiffY = 0;
							pos = _this.fromDocumentToCanvasCoordinate(
									event.clientX, event.clientY);
							_this.mouseDown = true;
							_this.editPolicy.each(function(i, policy) {
										policy.onMouseDown(_this, pos.x, pos.y,
												event.shiftKey, event.ctrlKey);
									});
							break;
						case 3 : // Right mouse button pressed
							event.preventDefault();
							event = _this._getEvent(event);
							pos = _this.fromDocumentToCanvasCoordinate(
									event.clientX, event.clientY);
							_this.onRightMouseDown(pos.x, pos.y,
									event.shiftKey, event.ctrlKey);
							break;
						case 2 :
							// Middle mouse button pressed
							break;
						default :
							// You have a strange mouse
					}
				} catch (exc) {
					console.log(exc);
				}
			});

	// Catch the dblclick and route them to the Canvas hook.
	//
	this.html.bind("dblclick", function(event) {
				event = _this._getEvent(event);

				_this.mouseDownX = event.clientX;
				_this.mouseDownY = event.clientY;
				var pos = _this.fromDocumentToCanvasCoordinate(event.clientX,
						event.clientY);
				_this
						.onDoubleClick(pos.x, pos.y, event.shiftKey,
								event.ctrlKey);
			});

	// Catch the click event and route them to the canvas hook
	//
	this.html.bind("click", function(event) {
				if (_this.canvasContainer
						&& _this.canvasContainer.getContainerPanel) {
					_this.canvasContainer.getContainerPanel().focus();
				}
				event = _this._getEvent(event);

				// fire only the click event if we didn't move the mouse
				// (drag&drop)
				//
				if (_this.mouseDownX === event.clientX
						|| _this.mouseDownY === event.clientY) {
					var pos = _this.fromDocumentToCanvasCoordinate(
							event.clientX, event.clientY);
					_this.onClick(pos.x, pos.y, event.shiftKey, event.ctrlKey);
				}
			});

	// Catch the keyUp and CTRL-key and route them to the Canvas hook.
	//
	this.keyupCallback = function(event) {
		// don't initiate the delete command if the event comes from an INPUT
		// field. In this case the user want delete
		// a character in the input field and not the related shape
		var target = $(event.target);
		if (!target.is("input") && !target.is("textarea")) {
			_this.editPolicy.each(function(i, policy) {
						if (policy instanceof draw2d.policy.canvas.KeyboardPolicy) {
							policy.onKeyUp(_this, event.keyCode,
									event.shiftKey, event.ctrlKey);
						}
					});
		}
	};
	$(document).bind("keyup", this.keyupCallback);

	// Catch the keyDown and CTRL-key and route them to the Canvas hook.
	//
	this.keydownCallback = function(event) {
		// don't initiate the delete command if the event comes from an INPUT
		// field. In this case the user want delete
		// a character in the input field and not the related shape
		var target = $(event.target);
		if (!target.is("input") && !target.is("textarea")) {
			_this.editPolicy.each(function(i, policy) {
						if (policy instanceof draw2d.policy.canvas.KeyboardPolicy) {
							policy.onKeyDown(_this, event.keyCode,
									event.shiftKey, event.ctrlKey);
						}
					});
		}
	};
	$(document).bind("keydown", this.keydownCallback);
	/*
	 * // 滚动条移动事件,可以由视口来监听从而维护视口与画布的联动
	 * 在目前的设计下,不需要由视口监听此事件,视口只需要在每次弹出的时候获取当前的scroll位置更新sizer的位置即可 此代码可保留
	 */
	this.html.bind("scroll", function(event) {
		// event = _this._getEvent(event);
		var scrollLeft = _this.getScrollLeft(), scrollTop = _this
				.getScrollTop();
			// _this.fireEvent(Dep.framework.editor.EVENT.CANVAS.CANVASSCROLL,{scrollLeft:scrollLeft,scrollTop:scrollTop});
		});
	this.groupManager = new draw2d.util.GroupManager();
};
/**
 * 获取画布类的编辑策略集合
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getEditPolicy = function() {
	return this.editPolicy;
};

/**
 * 获取画布的真实宽度
 * 
 * @returns {*}
 */
draw2d.Canvas.prototype.getWidth = function() {
	return this.width
};
/**
 * 设置画布的宽度
 * 
 * @param width
 */
draw2d.Canvas.prototype.setWidth = function(width) {
	this.width = width;
};
/**
 * 获取画布高度
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getHeight = function() {
	return this.height;
};
/**
 * 设置画布的高度
 * 
 * @param {}
 *            height
 */
draw2d.Canvas.prototype.setHeight = function(height) {
	this.height = height;
};
/**
 * 获取画布所在的div所在的高度
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getHtmlHeight = function() {
	return this.html.height();
};
/**
 * 获取画布所在的div所在的宽度
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getHtmlWidth = function() {
	return this.html.width();
};

/**
 * 通过鼠标来拖动画布
 * @param {} dx 鼠标在水平方向上移动的绝对值
 * @param {} dy 鼠标在垂直方向上移动的绝对值
 * @param {} dx2 鼠标在水平方向上移动的相对值
 * @param {} dy2 鼠标在垂直方向上移动的相对值
 * 绝对值:一次拖动过程中,鼠标位置相对于鼠标按下位置的位移;
 * 相对值:一次拖动过程中,鼠标每一次移动相对于上一次移动的位移;
 */
draw2d.Canvas.prototype.onMouseMoveCanvas = function(dx, dy, dx2, dy2) {
	var me = this, zoom = me.getZoom(), oldX = me.getViewBoxX(), oldY = me
			.getViewBoxY(), viewBoxWidth = (me.initialWidth * (zoom)) | 0, viewBoxHeight = (me.initialHeight * (zoom))
			| 0, newX, newY;
	me.changeMouseType("hand");
	newX = oldX - dx2;
	newY = oldY - dy2;
	if (newX < 0 || newY < 0) {
		return;
	}
	me.setViewBoxX(newX);
	me.setViewBoxY(newY);
	me.paper.setViewBox(newX, newY, viewBoxWidth, viewBoxHeight);
	me.fireEvent("canvas_move", {
				dx : dx,
				dy : dy,
				dx2 : dx2,
				dy2 : dy2
			});
};
/**
 * 移动视口的时候移动画布 画布中需要移动的位置,其实就是sizer在视口中的坐标然后放大一定倍数
 * 
 * @param {}
 *            diff sizer的坐标
 * @param {}
 *            scales 缩放因子
 * @param {}
 *            outline 视口对象,暂时没用,保留
 */
draw2d.Canvas.prototype.rePosition = function(diff, scales, outline) {
	var me = this, zoom = me.getZoom(), x = diff.x * scales, y = diff.y
			* scales;
	var viewBoxWidth = (me.initialWidth * (zoom)) | 0;
	var viewBoxHeight = (me.initialHeight * (zoom)) | 0;
	me.setViewBoxX(x);
	me.setViewBoxY(y);
	me.paper.setViewBox(x, y, viewBoxWidth, viewBoxHeight);
};
/**
 * 重写添加方法,添加图元索引
 * 
 * @param {}
 *            figure
 * @param {}
 *            x
 * @param {}
 *            y
 */
draw2d.Canvas.prototype.add = function(figure, x, y) {
	if (figure.getCanvas() === this) {
		return;
	}

	if (figure instanceof draw2d.shape.basic.Line) {
		this.lines.add(figure);
		this.linesToRepaintAfterDragDrop = this.lines;
	} else {
		this.figures.add(figure);
		if (typeof y !== "undefined") {
			figure.setPosition(x, y);
		} else if (typeof x !== "undefined") {
			figure.setPosition(x);
		}
	}
	figure.setCanvas(this);

	// important inital call
	figure.getShapeElement();

	// init a repaint of the figure. This enforce that all properties
	// ( color, dim, stroke,...) will be set.
	figure.repaint();
	// fire the figure:add event before the "move" event and after the
	// figure.repaint() call!
	// - the move event can only be fired if the figure part of the canvas.
	// and in this case the notification event should be fired to the listener
	// before
	this.fireEvent("figure:add", {
				figure : figure
			});

	// fire the event that the figure is part of the canvas
	figure.fireEvent("added");

	// ...now we can fire the initial move event
	figure.fireEvent("move");

	// this._addFigureEventListeners(figure);
	this.getGroupManager().addFigure(figure.getFigureGroup(), figure);

	return this;
};
/**
 * 重新删除方法,删除图元索引
 * 
 * @param {}
 *            figure
 * @return {}
 */
draw2d.Canvas.prototype.remove = function(figure) {
	var _this = this;
	this.editPolicy.each(function(i, policy) {
				if (typeof policy.unselect === "function") {
					policy.unselect(_this, figure);
				}
			});

	if (figure instanceof draw2d.shape.basic.Line) {
		this.lines.remove(figure);
	} else {
		this.figures.remove(figure);
	}
	figure.setCanvas(null);

	if (figure instanceof draw2d.Connection) {
		figure.disconnect();
	}

	this.fireEvent("figure:remove", {
				figure : figure
			});
	this.getGroupManager().removeFigure(figure.getFigureGroup(), figure);
	return this;
};
draw2d.Canvas.prototype.removeAll = function() {
	var me = this, figureListClone = me.figures.clone();
	figureListClone.each(function(i, figure) {
				if (figure) {
					me.remove(figure);
				}
			});
},
/**
 * 获取图元管理器
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getGroupManager = function() {
	if (this.groupManager) {
		return this.groupManager;
	} else {
		throw "图元索引管理器未创建";
	}

};
/**
 * @method 根据id查询线性图元 直接从map中去
 * @param {String}
 *            id The id of the line.
 * 
 * @type draw2d.shape.basic.Line
 */
draw2d.Canvas.prototype.getLine = function(figureGroup, id) {
	return this.getGroupManager().getFigureById(figureGroup, id);
};

/**
 * @method 根据id查询图元 直接从map里面取图元
 * @param {String}
 *            id The id of the figure.
 * @return {draw2d.Figure}
 */
draw2d.Canvas.prototype.getFigure = function(figureGroup, id) {
	return this.getGroupManager().getFigureById(figureGroup, id);
};
draw2d.Canvas.prototype.getFigureById = function(id) {
	var figure = null;
	this.figures.each(function(i, e) {
				if (e.id === id) {
					figure = e;
					return false;
				}
			});
	return figure;
};
/**
 * @method 根据id查询图元 直接从map里面取图元
 * @param {String}
 *            id The id of the figure.
 * @return {draw2d.Figure}
 */
//draw2d.Canvas.prototype.getFigureByViewId = function(figureGroup,id) {
//		return this.getGroupManager().getFigureByViewId(figureGroup,id);
//};
/**
 * 鼠标右击事件 在原来基础上,发出的画布事件中添加了figure参数
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 * @param {}
 *            shiftKey
 * @param {}
 *            ctrlKey
 */
draw2d.Canvas.prototype.onRightMouseDown = function(x, y, shiftKey, ctrlKey) {
	var figure = this.getBestFigure(x, y);

	while ((figure !== null && figure.getParent() !== null)
			&& !(figure instanceof draw2d.Port)) {
		figure = figure.getParent();
	}
	//先选中，然后响应右击事件，防止右击事件响应完了之后又响应选中事件。
	//导致例如右击菜单显示后又消失了。
	this.setCurrentSelection(figure);
	// 计算出全局的位置
	var point = this.fromCanvasToDocumentCoordinate(x, y);
	this.fireEvent("contextmenu", {
				x : point.x,
				y : point.y,
				shiftKey : shiftKey,
				ctrlKey : ctrlKey,
				figure : figure
			});
	if (figure !== null) {
		// this.setCurrentSelection(figure);
		figure.fireEvent("contextmenu", {
					x : x,
					y : y
				});
		figure.onContextMenu(x, y);

		// forward the event to all installed policies of the figure
		// soft migration from onHookXYZ to Policies.
		// since 4.4.0
		figure.editPolicy.each(function(i, policy) {
					policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
				});
	}

	// forward the event to all install policies as well.
	// (since 4.4.0)
	this.editPolicy.each(function(i, policy) {
				policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
			});
};
/**
 * 删除画布上某一类型的所有图元
 * 
 * @param {String}
 *            group
 * @param {}
 *            figureType
 */
draw2d.Canvas.prototype.removeFigureByType = function(group, figureType) {
	var me = this, figureList, type = '';
	/*
	 if (group) {
	 type = type + group;
	 }
	 if (figureType) {用图元分组和图元类型作为唯一标识
	 type = type + figureType;
	 }*/
	figureList = me.getGroupManager().getFigureListByFigureType(group,
			figureType), figureListClone = null;
	if (figureList != null && figureList instanceof draw2d.util.ArrayList) {
		figureListClone = figureList.clone();
		figureListClone.each(function(n, figure) {
			me.remove(figure);
				//					 me.getGroupManager().removeFigure(group,figure);
			});
	}
};
/**
 * 表示当前画布进入添加link的状态
 * 
 * @param {}
 *            figureModel
 */
draw2d.Canvas.prototype.initAddLink = function(figureModel, dblClick) {
	var me = this;
	me.setAddLinkState(true);
	me.setDblClicked(dblClick);
	me.setCurrentModel(figureModel);
	var clonePolicy = me.editPolicy.clone();
	clonePolicy.grep(function(p) {
		if (p instanceof draw2d.policy.canvas.SingleSelectionPolicy/*p.NAME === "draw2d.policy.canvas.BoundingboxSelectionPolicy"*/) {
			me.uninstallEditPolicy(p);
		}
		return true;
	});
	if (!me.tempAddlinkPolicy) {
		me.tempAddlinkPolicy = new draw2d.policy.canvas.AddLinkPolicy();
	}
	me.installEditPolicy(me.tempAddlinkPolicy);
	me.changeMouseType("default");
};

draw2d.Canvas.prototype.initDragDropCanvas = function() {
	var me = this;
	me.setAddLinkState(false);
	me.setDblClicked(false);
	me.setCurrentModel(null);
	var clonePolicy = me.editPolicy.clone();
	clonePolicy.grep(function(p) {
				if (p instanceof draw2d.policy.canvas.SingleSelectionPolicy) {
					me.uninstallEditPolicy(p);
				}
				return true;
			});
	if (!me.tempDragDropCanvasPolicy) {
		me.tempDragDropCanvas = new draw2d.policy.canvas.DragDropCanvasPolicy();
	}
	me.installEditPolicy(me.tempDragDropCanvas);
	me.changeMouseType("hand");
};
/**
 * 表示添加链接的状态结束
 * 
 * @param {}
 *            figureModel
 */
draw2d.Canvas.prototype.getOutOfAddLinkState = function(record, dblClick) {
	var me = this;
	me.setAddLinkState(false);
	me.setDblClicked(dblClick);
	me.setCurrentModel(record);
	var clonePolicy = me.editPolicy.clone();
	clonePolicy.grep(function(p) {
				if (p instanceof draw2d.policy.canvas.SingleSelectionPolicy) {
					me.uninstallEditPolicy(p);
				}
				return true;
			});
	if (!me.tempSelectPolicy) {
		me.tempSelectPolicy = new draw2d.policy.canvas.BoundingboxSelectionPolicy();
	}
	me.installEditPolicy(me.tempSelectPolicy);
	me.changeMouseType("default");
};
draw2d.Canvas.prototype.changeMouseType = function(type) {
	this.html.css({
				"cursor" : type
			});
};

/**
 * 设置当前添加的link模型
 * 
 * @param {}
 *            model
 */
draw2d.Canvas.prototype.setCurrentModel = function(model) {
	this.currentModel = model;
};

/**
 * 获取当前处于添加状态的link的模型
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getCurrentModel = function() {
	return this.currentModel;
};
/**
 * 标明是否双击图元工具箱了
 * 
 * @param {}
 *            flag
 */
draw2d.Canvas.prototype.setDblClicked = function(flag) {
	this.dblClicked = flag;
};
/**
 * 获取 是否双击图元工具箱了
 * 
 * @return {}
 */
draw2d.Canvas.prototype.isDblClicked = function() {
	return this.dblClicked;
};
/**
 * 设置画布是否处于等待添加链接的状态,该状态下不可以拖动图元,而只能通过拖拽的方式添加link
 * 
 * @param {}
 *            flag
 */
draw2d.Canvas.prototype.setAddLinkState = function(flag) {
	this.inAddLinkState = flag;
};
/**
 * 获取当前画布是否处于添加link状态
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getAddLinkState = function() {
	return this.inAddLinkState;
};
/**
 * 在原来方法的基础上,添加对视口xy坐标的设置
 * 
 * @param {}
 *            zoomFactor
 * @param {}
 *            animated
 */
draw2d.Canvas.prototype.setZoom = function(zoomFactor, animated) {
	var _this = this;
	var _zoom = function(z) {
		_this.zoomFactor = Math.min(Math.max(0.01, z), 10);

		var viewBoxWidth = (_this.initialWidth * (_this.zoomFactor)) | 0;
		var viewBoxHeight = (_this.initialHeight * (_this.zoomFactor)) | 0;
		var viewBoxX = _this.getViewBoxX();
		var viewBoxY = _this.getViewBoxY();
		_this.paper.setViewBox(viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight);

		_this.fireEvent("zoom", {
					factor : _this.zoomFactor
				});
	};

	if (animated) {
		var myTweenable = new Tweenable();
		myTweenable.tween({
					from : {
						'x' : this.zoomFactor
					},
					to : {
						'x' : zoomFactor
					},
					duration : 300,
					easing : "easeOutSine",
					step : function(params) {
						_zoom(params.x);
					}
				});
	} else {
		_zoom(zoomFactor);
	}
};
/**
 * 设置画布视口的X坐标
 * 
 * @param {}
 *            x
 */
draw2d.Canvas.prototype.setViewBoxX = function(x) {
	this.viewBoxX = x;
};
/**
 * 获取画布视口的X坐标
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getViewBoxX = function() {
	return this.viewBoxX ? this.viewBoxX : 0;
};
/**
 * 设置画布的Y坐标
 * 
 * @param {}
 *            y
 */
draw2d.Canvas.prototype.setViewBoxY = function(y) {
	this.viewBoxY = y;
};
/**
 * 获取画布的Ｙ坐标
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getViewBoxY = function() {
	return this.viewBoxY ? this.viewBoxY : 0;
};
/**
 * 将浏览器中某点的坐标转换为画布中的坐标,即将以浏览器原点为基准的坐标转换为以画布原点为基准的坐标
 * 修改画布的坐标转换方法,原来使用的是scroll方法,现在要用到视口的x和y坐标
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 * @return {draw2d.geo.Point}
 */
draw2d.Canvas.prototype.fromDocumentToCanvasCoordinate = function(x, y) {
	return new draw2d.geo.Point((x - this.getAbsoluteX()) * this.zoomFactor /* viewbox本身是用来缩放的,所以其坐标不需要在通过缩放因子来缩放了 */
					+ this.getViewBoxX(), (y - this.getAbsoluteY())
					* this.zoomFactor + this.getViewBoxY());
};
draw2d.Canvas.prototype._fromDocumentToCanvasCoordinate_IE8_HACK = function(x,
		y) {
	return new draw2d.geo.Point((x - this.getAbsoluteX()) * this.zoomFactor,
			(y - this.getAbsoluteY()) * this.zoomFactor);
};
/**
 * 将画布中的坐标转换为全局(浏览器)的坐标,即将以画布原点(0,0)为基准的坐标转换为以浏览器页面为基准的坐标
 * 修改画布的坐标转换方法,原来使用的是scroll方法,现在要用到视口的x和y坐标
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 * @return {}
 */
draw2d.Canvas.prototype.fromCanvasToDocumentCoordinate = function(x, y) {
	return new draw2d.geo.Point(((x * (1 / this.zoomFactor))
					+ this.getAbsoluteX() - this.getViewBoxX()),
			((y * (1 / this.zoomFactor)) + this.getAbsoluteY() - this
					.getViewBoxY()));
};
draw2d.Canvas.prototype.onDoubleClick = function(x, y, shiftKey, ctrlKey) {

	// check if a line has been hit
	//
	var figure = this.getBestFigure(x, y);

	if (figure !== null) {
		figure.fireEvent("dblclick", {
					x : x,
					y : y,
					shiftKey : shiftKey,
					ctrlKey : ctrlKey
				});
		figure.onDoubleClick();
		this.fireEvent("dblclick", {
					x : x,
					y : y,
					shiftKey : shiftKey,
					ctrlKey : ctrlKey,
					figure : figure
				});
	}

	// forward the event to all install policies as well.
	// (since 4.0.0)
	this.editPolicy.each(function(i, policy) {
				policy.onDoubleClick(figure, x, y, shiftKey, ctrlKey);
			});
};
draw2d.Canvas.prototype.setContainer = function(container) {
	if (container) {
		this.canvasContainer = container;
	} else {
		this.canvasContainer = null;
	}

};
draw2d.Canvas.prototype.getContainer = function() {
	if (this.canvasContainer) {
		return this.canvasContainer;
	} else {
		console.log("没有设置container");
		throw ("没有设置container");
	}

};
/**
 * 重写getBestFigure方法
 * 
 * @return {}
 */
draw2d.Canvas.prototype.getBestFigure = function(x, y, figureToIgnore) {

	if (!$.isArray(figureToIgnore)) {
		if (figureToIgnore instanceof draw2d.Figure) {
			figureToIgnore = [figureToIgnore];
		} else {
			figureToIgnore = [];
		}
	}

	var result = null;
	var testFigure = null;
	var i = 0;
	var children = null;

	// ResizeHandles first
	for (i = 0, len = this.resizeHandles.getSize(); i < len; i++) {
		testFigure = this.resizeHandles.get(i);
		if (testFigure.isVisible() === true
				&& testFigure.hitTest(x, y) === true
				&& $.inArray(testFigure, figureToIgnore) === -1) {
			return testFigure;
		}
	}

	// Checking ports
	for (i = 0, len = this.commonPorts.getSize(); i < len; i++) {
		testFigure = this.commonPorts.get(i);
		if ($.inArray(testFigure, figureToIgnore) === -1) {
			if (testFigure.isVisible() === true
					&& testFigure.hitTest(x, y) === true) {
				return testFigure;
			}
		}
	}

	// tool method to check recursive a figure for hitTest
	//
	var checkRecursive = function(children) {
		children.each(function(i, e) {
					var c = e.figure;
					//检查子对象
					checkRecursive(c.children);
					//add BY YUAN
					if (result && c.eventIgnoreChildren) {//检查子对象被点击，但是忽略子对象的事件，直接返回父对象。
						return result = c;
					}
					//add end BY YUAN
					if (result === null && c.isVisible() === true
							&& c.hitTest(x, y) === true
							&& $.inArray(c, figureToIgnore) === -1) {
						result = c;
					}
					return result === null; // break the each-loop if we found an element
				});
	};

	//  Check now the common objects.
	//  run reverse to aware the z-oder of the figures
	for (i = (this.figures.getSize() - 1); i >= 0; i--) {
		var figure = this.figures.get(i);
		// check first a children of the figure
		//
		checkRecursive(figure.children);
		//add BY YUAN
		if (result && figure.eventIgnoreChildren) {//检查子对象被点击，但是忽略子对象的事件，直接返回父对象。
			return result = figure;
		}
		//add end BY YUAN
		// ...and the figure itself
		//
		if (result === null && figure.isVisible() === true
				&& figure.hitTest(x, y) === true
				&& $.inArray(figure, figureToIgnore) === -1) {
			result = figure;
		}

		if (result !== null) {
			return result;
		}
	}

	// Check the children of the lines as well
	// Not selectable/draggable. But should receive onClick/onDoubleClick events 
	// as well.
	var count = this.lines.getSize();
	for (i = 0; i < count; i++) {
		var line = this.lines.get(i);
		// check first a children of the figure
		//
		checkRecursive(line.children);

		if (result !== null) {
			return result;
		}
	}

	// A line is the last option in the priority queue for a "Best" figure
	//
	result = this.getBestLine(x, y, figureToIgnore);
	if (result !== null) {
		return result;
	}

	return result;
};
/**
 * @author HeYuqing
 * Connection.js 
 * 2015年4月3日 下午2:15:57
 * 此文件存放对连接类的扩展
 */
/**
 * 所有计算路由形式的router中都会获取线性图元的两个位置,即起点和终点坐标.
 * 原来的代码中获取的是线性图元两端的port的绝对位置,
 * 这里获取的是由两个端点连线与两个Node边框的交点.
 * 从而实现当node移动的时候,其与线性图元的交点是动态变化的
 * @return {}
 */
//draw2d.Connection.prototype.getStartPoint = function() {
//	var me = this, node = me.getSourceNode();
//	return this.getBoundingPoint(node);
//};
///**
// * 参见 getStartPoint
// * @return {}
// */	
//draw2d.Connection.prototype.getEndPoint = function() {
//	var me = this, node = me.getTargetNode();
//	return this.getBoundingPoint(node);
//};
/**
 * 计算此链接与链接两端的node的交点坐标
 * @param {} figure
 * @return {}
 */
draw2d.Connection.prototype.getBoundingPoint = function(figure) {
	var me = this, startPoint = me.getSource().getAbsolutePosition(), endPoint = me
			.getTarget().getAbsolutePosition(), tempLine = new draw2d.shape.basic.PolyLine(
			{
				startX : startPoint.x,
				startY : startPoint.y,
				endX : endPoint.x,
				endY : endPoint.y
			});
	var box = figure.getAbsoluteBounds();
	var result = box.intersectionWithLine(startPoint, endPoint);
	var point = result.first();
	if (!point) {
		point = endPoint;
	}
	return point;
};
/**
 * 设置当前链接的目的节点
 * @param {} node
 */
draw2d.Connection.prototype.setTargetNode = function(node) {
	if (node.getHybridPort(0)) {
		this.setTarget(node.getHybridPort(0));
	} else if (node.getInputPort(0)) {
		this.setTarget(node.getInputPort(0));
	} else {
		throw "当前节点无法作为此链接的端点";
	}
};
/**
 * 获取当前链接管理的目的节点
 * 
 * @return {}
 */
draw2d.Connection.prototype.getTargetNode = function() {
	if (this.getTarget()) {
		return this.getTarget().getParent();
	} else {
		return null;
	}
};
/**
 * 设置当前链接的源节点
 * @param {} node
 */
draw2d.Connection.prototype.setSourceNode = function(node) {
	if (node.getHybridPort(0)) {
		this.setSource(node.getHybridPort(0));
	} else if (node.getOutputPort(0)) {
		this.setTarget(node.getOutputPort(0));
	} else {
		throw "当前节点无法作为此链接的端点";
	}
};
/**
 * 获取当前链接关联的源节点
 * @return {}
 */
draw2d.Connection.prototype.getSourceNode = function() {
	if (this.getSource()) {
		return this.getSource().getParent();
	} else {
		return null;
	}
};

/**
 * @method
 * Don't call them manually. This will be done by the framework.<br>
 * Will be called if the object are moved via drag and drop.
 * Sub classes can override this method to implement additional stuff. Don't forget to call
 * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
 * @private
 * @param {Number} dx the x difference between the start of the drag drop operation and now
 * @param {Number} dy the y difference between the start of the drag drop operation and now
 * @param {Number} dx2 The x diff since the last call of this dragging operation
 * @param {Number} dy2 The y diff since the last call of this dragging operation
 **/
draw2d.Connection.prototype.onDrag = function(dx, dy, dx2, dy2) {

	if (this.command === null) {
		return;
	}
	//删除以下代码 ============
	//    this.command.setTranslation(dx,dy);
	//    
	//    var count = this.getVertices().getSize()-1;
	//    for(var i=1; i<count;i++){
	//        this.getVertex(i).translate(dx2, dy2);
	//        
	//    }
	//删除完毕 ============
	var _this = this;

	// notify all installed policies
	//
	this.editPolicy.each(function(i, e) {
				if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
					//将dx, dy, dx2, dy2参数传递给策略
					e.onDrag(_this.canvas, _this, dx, dy, dx2, dy2);
				}
			});

	this.svgPathString = null;
	this.repaint();

	// Update the resize handles if the user change the position of the
	// element via an API call.
	//
	this.editPolicy.each(function(i, e) {
				if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
					e.moved(_this.canvas, _this);
				}
			});

	this.fireEvent("move");
};

/**
 * 缓存一个图元的右下角坐标
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 * @return {}
 */
draw2d.Figure.prototype.setPosition = function(x, y) {
	if (x instanceof draw2d.geo.Point) {
		this.x = x.x;
		this.y = x.y;
	} else {
		this.x = x;
		this.y = y;
	}

	var oldPos = {
		x : this.x,
		y : this.y
	};

	var _this = this;

	this.editPolicy.each(function(i, e) {
				if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
					var newPos = e.adjustPosition(_this, _this.x, _this.y);
					_this.x = newPos.x;
					_this.y = newPos.y;
				}
			});

	var diffPos = {
		x : oldPos.x - this.x,
		y : oldPos.y - this.y
	};
	this.repaint();
	this.editPolicy.each(function(i, e) {
				if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
					e.moved(_this.canvas, _this);
				}
			});

	this.fireEvent("move");
	this.fireEvent("change:x");
	this.fireEvent("change:y");
	this.setRightBottomPoint(x, y);
	return this;
};
/**
 * 设置底部坐标,仅仅为了排序用
 * 
 * @param {}
 *            x
 * @param {}
 *            y
 */
draw2d.Figure.prototype.setRightBottomPoint = function(x, y) {
	var tempX, tempY;
	if (x instanceof draw2d.geo.Point) {
		tempX = x.x;
		tempY = x.y;
	} else {
		tempX = x;
		tempY = y;
	}
	this.tx = tempX + this.getWidth();
	this.by = tempY + this.getHeight();
};
/**
 * 获右下角的x坐标
 * 
 * @return {}
 */
draw2d.Figure.prototype.getTopX = function() {
	if (this.tx) {
		return this.tx;
	} else {
		throw "tx 未赋值";
	}
};
/**
 * 获取节点右下角的Y坐标
 * 
 * @return {}
 */
draw2d.Figure.prototype.getBottomY = function() {
	if (this.by) {
		return this.by;
	} else {
		throw "by 未赋值";
	}
};
/**
 * 获取图元上次被应用的属性.即该图元当前展示的样式的属性集合
 * 
 * @return {}
 */
draw2d.Figure.prototype.getLastAppliedAttributes = function() {
	// 所有图元初始化时均会初始化此对象,只有在repaint方法时才会向此对象中存放属性
	return this.lastAppliedAttributes;
};
/**
 * 获取类名
 * 
 * @return {}
 */
draw2d.Figure.prototype.getClassName = function() {
	if (this.NAME) {
		return this.NAME;
	} else {
		throw "当前图元类名未初始化!";
	}
};
/**
 * 表明此图元时视口上的图元,则其不可以拖动,不可以选中,不可以改变大小也不可以被选中
 * 
 * @param {}
 *            flag
 */
draw2d.Figure.prototype.setEditable = function(flag) {
	this.setSelectable(!!flag);
	this.setDeleteable(!!flag);
	this.setResizeable(!!flag);
	this.setDraggable(!!flag);
};
/**
 * 获取该图元的所有子类
 * 
 * @return {}
 */
draw2d.Figure.prototype.getChildren = function() {
	return this.children;
};
/**
 * 重写setId方法,在修改图元id时,同步修改画布的图元管理器中的该图元的索引
 * 
 * @param {}
 *            newId
 * @return {}
 */
draw2d.Figure.prototype.setId = function(newId) {
	var me = this, canvas = me.getCanvas(), figureManeger = null, oldId = null;
	// 如果没有设置画布,则先不管理
	if (canvas && canvas instanceof draw2d.Canvas) {
		figureManeger = canvas.getGroupManager();
		oldId = me.getId();
		figureManeger.updateFigureID(me.getFigureGroup(), oldId, me);
	}
	me.id = newId;
	return me;
};
/**
 * 获取图元持久化的属性
 * 
 * @return {string}
 */
draw2d.Figure.prototype.getPersistentAttributes = function() {
	var memento = {
		shape : this.NAME,
		id : this.id,
		x : this.getX(),
		y : this.getY(),
		width : this.width,
		height : this.height,
		alpha : this.alpha
	};
	return memento;
};
/**
 * 设置图元的业务属性对象,在原有的基础上 根据模型的编辑状态来设置图元的编辑状态,同时设置该图元是否可见
 * 
 * @param {}
 *            rec 模型对象
 * @return {draw2d.Figure}
 */
draw2d.Figure.prototype.setUserData = function(rec) {
	this.userData = rec;
	this.fireEvent("change:userData");
	// 根据模型的编辑状态来确定图元的编辑状态
	if (rec && rec instanceof Dep.framework.editor.model.BaseFigureModel) {
		this.setEditable(rec.getEditable())
		this.setVisible(rec.getVisible());
	}
	return this;
};
/**
 * 
 * @return {}
 */
draw2d.Figure.prototype.getFigureType = function() {
	var userData = this.getUserData();
	if (userData
			&& userData instanceof Dep.framework.editor.model.BaseFigureModel) {
		return userData.getFType();
	}
	return null;
};
/**
 * 
 * @return {}
 */
draw2d.Figure.prototype.getFigureViewId = function() {
	var userData = this.getUserData();
	if (userData
			&& userData instanceof Dep.framework.editor.model.BaseFigureModel) {
		return userData.getViewId();
	}
	return null;
};
/**
 * 
 * @return {}
 */
draw2d.Figure.prototype.getFigureGroup = function() {
	var userData = this.getUserData();
	if (userData
			&& userData instanceof Dep.framework.editor.model.BaseFigureModel) {
		return userData.getFigureGroup();
	}
	return null;
};
/**
 * 重新布局各个子图元的位置
 */
draw2d.Figure.prototype.relocate = function() {
	this.children.each(function(i, obj) {
				obj.locator.relocate(i, obj.figure);
			});
};

draw2d.Port.prototype.getFigureGroup = function() {
	var me = this, parent = me.getParent();
	return parent.getFigureGroup();
};

/**
 * @author HeYuqing BussInputPort.js 2015年4月27日 上午9:41:48 业务含义的输入端口,主要要求如下:
 *         1.每个图元上可以添加多个输入端口; 2.输入端口可以通过鼠标拖动的形式在所依附的图元边框上自由移动;
 *         3.输入端口可以像普通图元一样编辑; 4.用户自己通过配置添加输入端口; 5.选中该输入端口时显示其名称
 */
draw2d.BussInputPort = draw2d.InputPort.extend({

	/**
	 * 类名
	 * 
	 * @type String
	 */
	NAME : "draw2d.BussInputPort",

	/**
	 * 最大允许连接线条数目
	 * 
	 * @type Number
	 */
	MAXFANIN : 10,
	/**
	 * @constructor 创建一个输入端口的的基类,移除在其父类figure和Port中安装的两个策略 然后安装两个自定义的策略:
	 *              1.BoundingMovePolicy 用来保证该port只能在其依附的父图元上移动;
	 *              2.RectangleSelectionFeedbackPolicy 定义该图元被选中后的样式
	 * @param {Object}
	 *            [attr] the configuration of the shape
	 */
	init : function(attr, setter, getter) {
		var me = this;
		me._super($.extend({
							bgColor : "#356922",
							stroke : 1,
							color : "#ffffff",
							selectable : true
						}, attr), setter, getter);

		me.locator = new draw2d.layout.locator.OutputPortLocator();
		// 因为会对该数组进行删除操作,所以需要从克隆的数组中拿到引用
		var clonePolicy = me.editPolicy.clone();
		clonePolicy.grep(function(p) {
			if (p.NAME === "draw2d.policy.port.IntrusivePortsFeedbackPolicy") {
				me.uninstallEditPolicy(p);
			} else if (p.NAME === "draw2d.policy.figure.RectangleSelectionFeedbackPolicy") {
				me.uninstallEditPolicy(p);
			}
			return true;
		});
		me.maxFanIn = me.MAXFANIN;
		me.name = "dafdads";
		// 安装两个自定义的策略
		me.installEditPolicy(new draw2d.policy.port.BoundingMovePolicy());
		me.installEditPolicy(new draw2d.policy.port.PortSelectionPolicy());
	},
	/**
	 * 获取该port的最大连接数
	 * 
	 * @returns {number|*}
	 */
	getMaxFanIn : function() {
		return this.maxFanIn;
	},
	/**
	 * 设置该port最大连接数
	 * 
	 * @param num
	 */
	setMaxFanIn : function(num) {
		this.maxFanIn = Math.max(1, num);
	},
	/**
	 * 创建command.这个方法以后需要重写.
	 * 
	 * @param {}
	 *            request
	 * @return {}
	 */
	createCommand : function(request) {
		// the port has its own implementation of the CommandMove
		//
		if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
			if (!this.isDraggable()) {
				return null;
			}
			return new draw2d.command.CommandMove(this);
		}

		// Connect request between two ports
		//
		if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {
			return new draw2d.command.CommandConnect(request.canvas,
					request.source, request.target, request.source);
		}

		return null;
	},

	/**
	 * 展示port图元的提示信息
	 */
	showTips : function() {
		var me = this, position = me.getAbsolutePosition(), width = me
				.getWidth(), height = me.getHeight();
		position.x += (width / 2);
		position.y -= (height / 2);
		me.getTips().setPosition(position);
		me.getTips().setVisible(true);
	},
	/**
	 * 隐藏port图元的提示信息
	 */
	hideTips : function() {
		this.getTips().setVisible(false);
	},
	/**
	 * 获取port图元的tips对象
	 * 
	 * @return {}
	 */
	getTips : function() {
		var me = this, userData = me.getUserData(), name = userData
				.getBussData().get("name");
		if (!me.tips) {
			me.tips = new draw2d.shape.basic.FigureLabel(name);
			me.getCanvas().addFigure(me.getTips());
		}
		me.tips.setText(name);
		return me.tips;
	},
	/**
	 * 将该方法从port中分离出来,直接去继承Figure类的方法,实现其可拖动的效果
	 * 
	 * @param {Number}
	 *            x the x-coordinate of the mouse event
	 * @param {Number}
	 *            y the y-coordinate of the mouse event
	 * @param {Boolean}
	 *            shiftKey true if the shift key has been pressed during this
	 *            event
	 * @param {Boolean}
	 *            ctrlKey true if the ctrl key has been pressed during the event
	 * 
	 * @return {boolean}
	 */
	onDragStart : function(x, y, shiftKey, ctrlKey) {

		this.isInDragDrop = false;

		this.command = this
				.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));

		if (this.command !== null) {
			this.ox = this.getX();
			this.oy = this.getY();
			this.isInDragDrop = true;

			// notify all installed policies
			//
			var _this = this;
			this.editPolicy.each(function(i, e) {
				if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
					e.onDragStart(_this.canvas, _this, x, y, shiftKey, ctrlKey);
				}
			});

			return true;
		}
		return false;
	},

	/**
	 * 将该方法从port中分离出来,直接去继承Figure类的方法,实现其可拖动的效果
	 * 
	 * @param {Number}
	 *            dx the x difference between the start of the drag drop
	 *            operation and now
	 * @param {Number}
	 *            dy the y difference between the start of the drag drop
	 *            operation and now
	 * @param {Number}
	 *            dx2 The x diff since the last call of this dragging operation
	 * @param {Number}
	 *            dy2 The y diff since the last call of this dragging operation
	 */
	onDrag : function(dx, dy, dx2, dy2) {

		var _this = this, pos = null;

		_this.setGlow(false);
		this.editPolicy.each(function(i, e) {
					if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
						var newPos = e.adjustPosition(_this, _this.ox + dx,
								_this.oy + dy);
						dx = newPos.x - _this.ox;
						dy = newPos.y - _this.oy;
					}
				});
		this.editPolicy.each(function(i, e) {
					if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
						e.onDrag(_this.canvas, _this);
						if (e.reCaculatePostion) {
							// 调用策略类来重新计算位置
							newPos = e.reCaculatePostion(_this, dx, dy, dx2,
									dy2);
						}
					}
				});
		if (this.getCanSnapToHelper()) {
			newPos = this.getCanvas().snapToHelper(this, newPos);
		}

		this.setPosition(newPos);
		this.fireEvent("move");
		this.fireEvent("change:x");
		this.fireEvent("change:y");
		return;
	},
	/**
	 * 父类Port中此方法拦截在拖动过程中的事件,这里修改属性使得在拖动过程中的事件可以发出,然后由Connection监听到后跟随port移动.
	 * 
	 * @param {}
	 *            event
	 * @param {}
	 *            args
	 */
	fireEvent : function(event, args) {
		if (this.isInDragDrop) {
			var temp = this.isInDragDrop;
			this.isInDragDrop = false;
		}

		this._super(event, args);
		if (temp) {
			this.isInDragDrop = temp;
		}
	},
	/**
	 * 将该方法从port中分离出来,直接去继承Figure类的方法,实现其可拖动的效果
	 * 
	 * @param {Number}
	 *            x the x-coordinate of the mouse event
	 * @param {Number}
	 *            y the y-coordinate of the mouse event
	 * @param {Boolean}
	 *            shiftKey true if the shift key has been pressed during this
	 *            event
	 * @param {Boolean}
	 *            ctrlKey true if the ctrl key has been pressed during the event
	 */
	onDragEnd : function(x, y, shiftKey, ctrlKey) {
		var _this = this;
		this.command.setPosition(this.x, this.y);
		this.isInDragDrop = false;

		this.canvas.getCommandStack().execute(this.command);
		this.command = null;
		this.editPolicy.each(function(i, e) {
					if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
						e.onDragEnd(_this.canvas, _this, x, y, shiftKey,
								ctrlKey);
					}
				});

		this.fireEvent("move");
		this.fireEvent("change:x");
		this.fireEvent("change:y");

		if (this.parent) {
			this.parent.layoutPorts();
		}
		return;
	},
	/**
	 * 校验连接数是否已经超出最大连接数 如果当前链接数小于最大连接数,返回true,否则返回false
	 * 
	 * @returns {boolean}
	 */
	validateConnections : function() {
		var me = this, conn = me.getConnections().getSize(), maxFanIn = me
				.getMaxFanIn();
		return conn < maxFanIn;
	},
	/**
	 * 获取持久化对象
	 */
	getPersistentAttributes : function() {
		var memento = {
			shape : this.NAME,
			id : this.id,
			x : this.getX(),
			y : this.getY(),
			width : this.width,
			height : this.height,
			alpha : this.alpha,
			visible : this.isVisible(),
			locator : this.getLocator() ? this.getLocator().NAME : "",
			parentId : this.getParent() ? this.getParent().getId() : "",
			bgColor : this.bgColor.hash(),
			color : this.color.hash(),
			stroke : this.stroke
		};
		return memento;
	}
});
/**
 * @author HeYuqing BussOutPutPort.js 2015年4月27日 上午9:42:14 业务含义的输出端口
 */
draw2d.BussOutputPort = draw2d.OutputPort.extend({

			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.BussOutputPort",

			/**
			 * @constructor Create a new OutputPort element
			 * 
			 * @param {Object}
			 *            [attr] the configuration of the shape
			 */
			init : function(attr, setter, getter) {
				this._super($.extend({
									bgColor : "#000000",
									stroke : 1,
									color : "#000000",
									selectable : false
								}, attr), setter, getter);

				// responsive for the arrangement of the port
				// calculates the x/y coordinates in relation to the parent node
				this.locator = new draw2d.layout.locator.OutputPortLocator();
				this.setMaxFanOut(1);
			},

			/**
			 * 在基类的基础上,添加对inputport连接数据的校验
			 * 
			 * @param {}
			 *            dropTarget
			 * @param {}
			 *            x
			 * @param {}
			 *            y
			 * @param {}
			 *            shiftKey
			 * @param {}
			 *            ctrlKey
			 */
			onDrop : function(dropTarget, x, y, shiftKey, ctrlKey) {

				var _this = this, canvas = _this.parent.getCanvas();
				if (!(dropTarget instanceof draw2d.Port)) {
					return false;;
				}
				_this.setGlow(false);
				// 判断
				if (!(dropTarget instanceof draw2d.BussInputPort)) {
					return;
				}
				if (dropTarget.getParent() == this.getParent()) {
					return;
				}
				if (!dropTarget.validateConnections()) {
					// TODO 这里可以适当的添加一些提醒
					Dep.framework.editor.util.Msg.info("超出最大链接数");
					return false;
				}

				// 发出画布事件,由画布向数据管理器提交添加请求
				canvas.fireEvent(
						Dep.framework.editor.EVENT.CANVAS.ADDCONNECTION, {
							source : this,
							target : dropTarget,
							model : canvas.getCurrentModel(),
							sourceName : this.getParent().getName(),
							targetName : dropTarget.getParent().getName()
						});
				_this.setVisible(false);

			}
		});
/**
 * @author HeYuqing
 * NoBussHybridPort.js 
 * 2015年5月8日 上午10:49:45
 * TODO
 */
draw2d.NoBussHybridPort = draw2d.HybridPort.extend({

			/**
			 * 类名
			 * @type String
			 */
			NAME : "draw2d.NoBussHybridPort",

			/**
			 * @constructor
			 * Create a new HybridPort element
			 * 
			 * @param {Object} [attr] the configuration of the shape
			 */
			init : function(attr, setter, getter) {
				this._super(attr, setter, getter);
			},

			/**
			 * 拖动完成后的方法
			 * @param {} dropTarget
			 * @param {} x
			 * @param {} y
			 * @param {} shiftKey
			 * @param {} ctrlKey
			 */
			onDrop : function(dropTarget, x, y, shiftKey, ctrlKey) {

				// Ports accepts only Ports as DropTarget
				//
				if (dropTarget instanceof Dep.framework.editor.figure.BaseNode) {
					dropTarget = dropTarget.getHybridPort();
				} else if (dropTarget instanceof draw2d.HybridPort) {

				} else {
					dropTarget = null;
				}
				if (!dropTarget) {
					return;
				}
				var me = this, canvas = me.getCanvas();
				canvas.fireEvent(
						Dep.framework.editor.EVENT.CANVAS.ADDCONNECTION, {
							source : this,
							target : dropTarget,
							model : canvas.getCurrentModel(),
							sourceName : this.getParent().getName(),
							targetName : dropTarget.getParent().getName()
						});

				//		var request = new draw2d.command.CommandType(draw2d.command.CommandType.CONNECT);
				//		request.canvas = this.parent.getCanvas();
				//		request.source = this;
				//		request.target = dropTarget;
				//		var command = this.createCommand(request);
				//		var conn=new Dep.framework.editor.figure.NoBussConnection();
				//		conn.setTargetDecorator(conn.DEFAULTTARGETDECORATOR);
				//		command.setConnection(conn);
				//		if (command !== null) {
				//			this.parent.getCanvas().getCommandStack().execute(command);
				//		}
				//		

				this.setGlow(false);
			},

			/**
			 * 创建一个命令用来添加连接
			 * @param {} request
			 * @return {}
			 */
			createCommand : function(request) {
				// the port has its own implementation of the CommandMove
				//
				if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
					if (!this.isDraggable()) {
						return null;
					}
					return new draw2d.command.CommandMove(this);
				}

				// Connect request between two ports
				//
				if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {
					return new draw2d.command.CommandConnect(request.canvas,
							request.source, request.target, request.source);
				}
				return null;
			}
		});
/**
 * 对原始command基类的扩展,添加设置和获取画布方法
 * 非必须的
 * @param canvas
 */
draw2d.command.Command.prototype.setCanvas = function(canvas) {
	this.canvas = canvas;
};
/**
 * 获取当前命令关联的画布类
 * @return {}
 */
draw2d.command.Command.prototype.getCanvas = function() {
	if (this.canvas) {
		return this.canvas;
	} else {
		throw "该command未指定canvas";
	}
}
/**
 * 获取该命令的类名
 * @return {}
 */
draw2d.command.Command.prototype.getClassName = function() {
	if (this.NAME) {
		return this.NAME;
	} else {
		throw "该command未指定NAME";
	}
};
/**
 * 给命令添加发事件的方法
 * @param {} event
 * @param {} args
 */
draw2d.command.Command.prototype.fireEvent = function(event, args) {
	try {
		if (typeof this.eventSubscriptions[event] === 'undefined') {
			return;
		}

		// avoid recursion
		if (this._inEvent === true) {
			return;
		}
		this._inEvent = true;
		var subscribers = this.eventSubscriptions[event];
		for (var i = 0; i < subscribers.length; i++) {
			subscribers[i](this, args);
		}
	} finally {
		this._inEvent = false;

		// fire a generic change event if an attribute has changed
		// required for some DataBinding frameworks or for the Backbone.Model compatibility
		// the event "change" with the corresponding attribute name as additional parameter
		if (event.substring(0, 7) === "change:") {
			this.fireEvent("change", event.substring(7));
		}
	}
};

/**
 * @method
 * 给命令添加监听某个事件的方法
 * @param {String}   event 事件名
 * @param {Function} callback 事件回调函数. 
 * @param {draw2d.Figure} 上下文执行环境
 */
draw2d.command.Command.prototype.on = function(event, callback, context) {
	var events = event.split(" ");
	// the "context" param is add to be compatible with Backbone.Model.
	// The project "backbone.ModelBinder" used this signature and we want use this
	if (context) {
		callback = $.proxy(callback, context);
		callback.___originalCallback = callback;
	}

	for (var i = 0; i < events.length; i++) {
		if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
			this.eventSubscriptions[events[i]] = [];
		}
		this.eventSubscriptions[events[i]].push(callback);
	}
	return this;
};
/**
 * 移除某个事件的监听
 * @param {} eventOrFunction
 * @return {}
 */
draw2d.command.Command.prototype.off = function(eventOrFunction) {
	if (typeof eventOrFunction === "undefined") {
		this.eventSubscriptions = {};
	} else if (typeof eventOrFunction === 'string') {
		this.eventSubscriptions[eventOrFunction] = [];
	} else {
		for (var event in this.eventSubscriptions) {
			this.eventSubscriptions[event] = $.grep(
					this.eventSubscriptions[event], function(callback) {
						if (typeof callback.___originalCallback !== "undefined") {
							return callback.___originalCallback !== eventOrFunction;
						}
						return callback !== eventOrFunction;
					});
		}
	}

	return this;
};
/**
 * @author He Yuqing 图元排序的基类
 */
draw2d.command.CommandAlign = draw2d.command.Command.extend({

			/**
			 * 类名
			 * @type String
			 */
			NAME : "draw2d.command.CommandAlign",
			/**
			 * 命令集合,用来缓存该命令下的所有子命令
			 * @type 
			 */
			redoStack : null,
			/**
			 * * 初始化
			 * @param canvas指定对哪个画布经行排序
			 * @param figures需要排序的图元结合
			 */
			init : function(canvas, figures) {
				var me = this, i = 0, nodes = null /*保存除线性图元外的所有节点图元*/, figure = null;
				me.setCanvas(canvas);
				nodes = figures.clone();
				// 不对线性图元经行排序
				for (i = 0; i < nodes.getSize(); i++) {
					figure = nodes.get(i);
					if (figure instanceof draw2d.shape.basic.Line) {
						figure.unselect();
						nodes.remove(figure);
						i--;
					}
				}
				// 缓存所有需要排序的图元
				me.setFigures(nodes);
				me.redoStack = new draw2d.util.ArrayList();
				me.canUndo = false;
				me.getMoveCommand();
			},

			/**
			 * 执行
			 */
			execute : function() {
				this.redo();
			},

			/**
			 * 重做,遍历redoStacker,取出每一个command然后执行重做操作
			 */
			redo : function() {
				var me = this;
				if (!me.canUndo) {
					me.getRedoStack().each(function(i, command) {
								command.redo();
							});
					me.getCanvas().addSelection(me.getFigures());
					me.canUndo = true;
				}
			},

			/**
			 * 撤销 遍历redoStacker,取出每一个command然后执行撤销操作
			 */
			undo : function() {
				var me = this;
				if (me.canUndo) {
					me.getRedoStack().each(function(i, command) {
								command.undo();
							});
					me.getCanvas().addSelection(me.getFigures());
					me.canUndo = false;
				}
			},

			/**
			 * 获取各个图元移动的command,由各个子类中根据不同的排序方式生成不同的moveCommand
			 */
			getMoveCommand : function() { // 由子类实现
				throw "在对齐操作中此方法不应该被调用,请检查" + this.getClassName()
						+ "类中是否重写了getMoveCommand函数";
			},

			/**
			 * 获取当前类的类名
			 * @returns {string}
			 */
			getClassName : function() {
				return this.NAME;
			},
			/**
			 * 设置需要排序的图元集合
			 */
			setFigures : function(figures) {
				this.figures = figures
			},
			/**
			 * 获取需要排序的图元
			 * @returns {draw2d.util.ArrayList}
			 */
			getFigures : function() {
				if (this.figures) {
					return this.figures;
				} else {
					throw "当前command中没有图元集合";
				}
			},
			/**
			 * 获取缓存的操作队列
			 *
			 * @return {}
			 */
			getRedoStack : function() {
				if (this.redoStack) {
					return this.redoStack;
				} else {
					throw "redoStack 未初始化"
				}
			}

		});
/**
 * @author He Yuqing
 * 将所有的选中的图元经行底部对齐排列操作
 */
draw2d.command.CommandAlignBottom = draw2d.command.CommandAlign.extend({

	/**
	 * 类名
	 */
	NAME : "draw2d.command.CommandAlignBottom",

	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},

	/**
	 * 获取对图元经行排列时的command
	 */
	getMoveCommand : function() {
		var me = this, referenceFigure = null, y = null, i = 0, figure = null, command = null, figures = me
				.getFigures();
		// 选中的对象少于一个时不执行此操作
		if (figures.isEmpty() || figures.getSize <= 1) {
			return;
		}
		//按照图元的右下角Y坐标排序,大的在后面
		figures.sort('by');
		referenceFigure = figures.getLastElement();
		//获取最大的Y坐标,也就是位置最靠下的图元的Y坐标.可以简单理解为划出一条底线
		y = referenceFigure.by;
		for (i = 0; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			//图元的X坐标不变,y坐标由最大的Y坐标减去图元的高度来确定
			command.setPosition(figure.getX(), y - figure.getHeight());
			me.getRedoStack().add(command);
		}
	}
});
/**
 * @author He Yuqing
 * 对选中的图元执行水平居中对齐操作
 */
draw2d.command.CommandAlignHCenter = draw2d.command.CommandAlign.extend({
	/**
	 * 类名
	 */
	NAME : "draw2d.command.CommandAlignHCenter",
	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},

	/**
	 * 获取对图元经行排列时的command
	 */
	getMoveCommand : function() {
		var me = this, referenceFigure = null, minddleLength = null, figureX = null, i = 0, figure = null, command = null, figures = me
				.getFigures(), leftX, rightX;
		if (figures.isEmpty() || figures.getSize <= 1) {// 选中的对象少于一个时不执行此操作
			return;
		}
		figures.sort('x');
		//获得所有排序图元中最左边的X坐标
		leftX = figures.getFirstElement().getX();
		figures.sort('tx');
		//索取所有排序图元中最右边的X坐标
		rightX = figures.getLastElement().getTopX();
		//计算所有图元分布的长度
		minddleLength = rightX - leftX;
		for (i = 0; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			//获取此图元移动后的中心点
			figureX = (minddleLength - figure.getWidth()) / 2;
			//垂直方向不变,水平方向上移动到所有图元分布区域的中心点
			command.setPosition(leftX + parseInt(figureX), figure.getY());
			me.getRedoStack().add(command);
		}
	}
});
/**
 * @author He Yuqing
 * 对所有图元经行左对齐排序操作
 */
draw2d.command.CommandAlignLeft = draw2d.command.CommandAlign.extend({

	/**
	 * 类名
	 */
	NAME : "draw2d.command.CommandAlignLeft",

	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},
	/**
	 * 获取对图元经行排列时的command
	 */
	getMoveCommand : function() {
		var me = this, referenceFigure = null, x = null, i = 0, figure = null, command = null, figures = me
				.getFigures();
		// 选中的对象少于一个时不执行此操作
		if (figures.isEmpty() || figures.getSize <= 1) {
			return;
		}
		//将所有图元按照左上角的X坐标排序,大的在后面
		figures.sort('x');
		//获取最左边的图元,即X坐标最小的图元
		referenceFigure = figures.getFirstElement();
		//取得最小的X坐标值
		x = referenceFigure.x;
		//第一个不动,从1开始计数
		for (i = 1; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			//所有图元Y坐标不变,X坐标置为排序图元中最左边图元的X坐标
			command.setPosition(x, figure.getY());
			me.getRedoStack().add(command);
		}
	}
});
/**
 * @author He Yuqing
 * 对选中的所有图元进行右对齐排序
 */
draw2d.command.CommandAlignRight = draw2d.command.CommandAlign.extend({
	/**
	 * 类名
	 */
	NAME : "draw2d.command.CommandAlignRight",
	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},
	/**
	 * 获取对图元经行排列时的command
	 */
	getMoveCommand : function() {
		var me = this, referenceFigure = null, x = null, i = 0, figure = null, command = null, figures = me
				.getFigures();
		// 选中的对象少于一个时不执行此操作
		if (figures.isEmpty() || figures.getSize <= 1) {
			return;
		}
		//将所有图元按照右下角X坐标排序,大的在后面
		figures.sort('tx');
		//获取右下角X坐标最大的图元,即所有图元中最靠右的图元
		referenceFigure = figures.getLastElement();
		//取得所有图元中最靠右的X坐标值
		x = referenceFigure.tx;
		for (i = 0; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			//所有图元Y坐标不变,右下角X坐标置为所有图元中最右边的X坐标,因为是右下角的X坐标,需要减去宽度计算出左上角的坐标,即图元真正的position
			command.setPosition(x - figure.getWidth(), figure.getY());
			me.getRedoStack().add(command);
		}
	}
});
/**
 * @author He Yuqing
 * 对所有选中的图元进行顶部对齐排序
 */
draw2d.command.CommandAlignTop = draw2d.command.CommandAlign.extend({

	/**
	 * 类名
	 */
	NAME : "draw2d.command.CommandAlignTop",
	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},
	/**
	 * 获取对图元经行排列时的command
	 */
	getMoveCommand : function() {
		var me = this, referenceFigure = null, y = null, i = 0, figure = null, command = null, figures = me
				.getFigures();
		// 选中的对象少于一个时不执行此操作
		if (figures.isEmpty() || figures.getSize <= 1) {
			return;
		}
		//对所有图元的左上角的Y坐标排序
		figures.sort('y'); // 大的在后面
		//所得所有图元中最小的Y坐标,即最靠上的坐标
		referenceFigure = figures.getFirstElement();
		y = referenceFigure.y;
		for (i = 1; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			//所有图元的X坐标不变,Y坐标置为最靠上的Y坐标
			command.setPosition(figure.getX(), y);
			me.getRedoStack().add(command);
		}
	}
});
/**
 * @author He Yuqing
 * 将所有选中的图元经行垂直居中排序
 */
draw2d.command.CommandAlignVCenter = draw2d.command.CommandAlign.extend({
	/**
	 * 类名
	 */
	NAME : "draw2d.command.CommandAlignVCenter",

	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},

	getMoveCommand : function() {
		var me = this, referenceFigure = null, mindleLength = null, figureX = null, i = 0, figure = null, command = null, figures = me
				.getFigures(), topY, bottomY;
		// 选中的对象少于一个时不执行此操作
		if (figures.isEmpty() || figures.getSize <= 1) {
			return;
		}
		//将所有图元按照左上角的Y坐标进行排序,获取最小的Y坐标,即最靠上的Y坐标
		figures.sort('y');
		topY = figures.getFirstElement().getY();
		//将所有图元按照右上角的坐标排序,获取最大的Y坐标,即最靠下的Y坐标
		figures.sort('by');
		bottomY = figures.getLastElement().getBottomY();
		//获取所有图元的一个分部区间
		mindleLength = bottomY - topY;
		for (i = 0; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			/*计算出在垂直方向上,最高点距离当前图元左上角的y坐标的距离
			figureY = (mindleLength/2 - figure.getHeight()/2) ;*/
			figureY = (mindleLength - figure.getHeight()) / 2;
			command.setPosition(figure.getX(), topY + parseInt(figureY));
			me.getRedoStack().add(command);
		}
	}
});
/**
 * @author He Yuqing
 * 对画布执行放大操作,本质上的改变view,画布的大小未发生变化
 */
draw2d.command.CommandEnlarge = draw2d.command.Command.extend({

			/**
			 * 类名
			 */
			NAME : "draw2d.command.CommandEnlarge",
			/**
			 * 默认的缩放因子
			 */
			ZOOMFACTOR : 1.1,

			/**
			 * 初始化方法,参见基类
			 * @param canvas
			 * @param figures
			 */
			init : function(canvas, num/*缩放因子,用来标识将画布经行多大倍数的缩放*/) {
				var me = this;
				me.setCanvas(canvas);
				//缓存当前画布的缩放因子,用来redo
				me.oldZoomFactor = me.getCanvas().getZoom();
				//设置缩放因子,默认为在原来的基础上缩小
				if (num) {
					me.zoomFactor = num;
				} else {
					me.zoomFactor = me.oldZoomFactor / me.ZOOMFACTOR;
				}
			},

			/**
			 * 执行命令
			 */
			execute : function() {
				this.redo();
			},

			/**
			 * 重做
			 */
			redo : function() {
				this.getCanvas().setZoom(this.zoomFactor);
			},

			/**
			 * 撤销
			 */
			undo : function() {
				this.getCanvas().setZoom(this.oldZoomFactor);
			}
		});
/**
 * @author He Yuqing
 * 对画布执行缩小操作,本质上的改变view,画布的大小未发生变化
 */
draw2d.command.CommandReduce = draw2d.command.Command.extend({

			NAME : "draw2d.command.CommandReduce",
			/**
			 * 默认的缩放因子
			 */
			ZOOMFACTOR : 1.1,

			/**
			 * 初始化方法,参见基类
			 * @param canvas
			 * @param figures
			 */
			init : function(canvas) {
				var me = this;
				me.setCanvas(canvas);
				me.oldZoomFactor = me.canvas.getZoom();
				//放大缩放因子,使画布变小
				me.zoomFactor = me.oldZoomFactor * 1.1;
			},

			execute : function() {
				this.redo();
			},

			redo : function() {
				this.canvas.setZoom(this.zoomFactor);
			},

			undo : function() {
				this.canvas.setZoom(this.oldZoomFactor);
			}
		});
/**
 * @author HeYuqing CommandMoveByCenter.js 2015年4月24日 上午11:59:05
 *         通过设置图元的中心点,装换后设置图元的位置
 */
draw2d.command.CommandMoveByCenter = draw2d.command.CommandMove.extend({

			/**
			 * 类名
			 */
			NAME : "draw2d.command.CommandMoveByCenter",

			/**
			 * 初始化方法,参见基类
			 * 
			 * @param canvas
			 * @param figures
			 */
			init : function(figure, x, y) {
				this._super(figure, x, y);
			},

			/**
			 * @method Set the initial position of the element
			 * 
			 * @param {Number}
			 *            x the new initial x position
			 * @param {Number}
			 *            y the new initial y position
			 */
			setStartPosition : function(x, y) {
				this.oldX = x - this.figure.getWidth() / 2;
				this.oldY = y - this.figure.getHeight() / 2;
			},

			/**
			 * @method Set the target/final position of the figure move command.
			 * 
			 * @param {Number}
			 *            x the new x position
			 * @param {Number}
			 *            y the new y position
			 */
			setPosition : function(x, y) {
				this.newX = x - this.figure.getWidth() / 2;
				this.newY = y - this.figure.getHeight() / 2;
			}
		});
/**
 * @author HeYuqing CanvasLayoutCommand.js 2015年4月24日 上午9:54:17 画布布局类的基类
 */
draw2d.command.CanvasLayoutCommand = draw2d.command.CommandAlign.extend({

			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.command.CanvasLayoutCommand",

			/**
			 * 默认每行排列的图元个数
			 * 
			 * @type Number
			 */
			DEFAULTNUM : 5,
			/**
			 * 画布依赖的panel,用来获取画布当前可见的宽和高
			 * 
			 * @type
			 */
			canvasPanel : null,
			/**
			 * 初始化方法
			 * 
			 * @param {}
			 *            canvas 需要排序的画布对象
			 * @param {}
			 *            figures 画布上所有需要排序的对象集合
			 * @param {}
			 *            num 每行的图元个数
			 */
			init : function(canvasPanel, figures, num) {
				this.canvasPanel = canvasPanel;
				if (!(figures instanceof draw2d.util.ArrayList)
						&& $.isArray(figures)) {
					figures = new draw2d.util.ArrayList(figures);
				}
				this._super(null, figures);
			},

			/**
			 * 获取对图元经行排列时的command
			 */
			getMoveCommand : function() {
				throw "子类应实现此方法创建图元移动的Command结合,出错的Command为"
						+ this.getClassName();
			},
			/**
			 * 获取画布当前可见的宽度
			 * 
			 * @return {}
			 */
			getCanvasViewWidth : function() {
				if (this.canvasPanel && this.canvasPanel.getWidth) {
					return this.canvasPanel.getWidth();
				} else {
					throw "未正确设置画布依赖的panel";
				}
			},
			/**
			 * 获取画布当前可见的高度
			 * 
			 * @return {}
			 */
			getCanvasViewHeight : function() {
				if (this.canvasPanel && this.canvasPanel.getHeight) {
					return this.canvasPanel.getHeight();
				} else {
					throw "未正确设置画布依赖的panel";
				}
			},

			/**
			 * 重做,遍历redoStacker,取出每一个command然后执行重做操作
			 */
			redo : function() {
				var me = this;
				if (!me.canUndo) {
					me.getRedoStack().each(function(i, command) {
								command.redo();
							});
					me.canUndo = true;
				}
			},

			/**
			 * 撤销 遍历redoStacker,取出每一个command然后执行撤销操作
			 */
			undo : function() {
				var me = this;
				if (me.canUndo) {
					me.getRedoStack().each(function(i, command) {
								command.undo();
							});
					me.canUndo = false;
				}
			},
			/**
			 * 获取所有排序图元中的最大宽度
			 * 
			 * @return {}
			 */
			getMaxWidth : function() {
				var me = this, figures = me.getFigures(), maxWidth = 0;
				figures.each(function(n, figure) {
							if (maxWidth < figure.getWidth()) {
								maxWidth = figure.getWidth();
							}
						});
				return maxWidth;
			},
			/**
			 * 获得所有排序图元中的最大高度
			 * 
			 * @return {}
			 */
			getMaxHeight : function() {
				var me = this, figures = me.getFigures(), maxheight = 0;
				figures.each(function(n, figure) {
							if (maxheight < figure.getHeight()) {
								maxheight = figure.getHeight();
							}
						});
				return maxheight;
			}
		});
/**
 * @author HeYuqing CanvasSudokuLayoutCommand.js 2015年4月24日 上午11:31:55 九宫格布局
 *         按照所有选中图元中的最大宽度和最大高度将画布划分为一个个九宫格,然后将各个图元填充到每个格子的最中间
 */
draw2d.command.CanvasSudokuLayoutCommand = draw2d.command.CanvasLayoutCommand
		.extend({
			/**
			 * 类名
			 *
			 * @type String
			 */
			NAME : "draw2d.command.CanvasSudokuLayoutCommand",
			/**
			 * 图元集合中最大的宽度
			 * @type Number
			 */
			maxWidth : 0,
			/**
			 * 图元集合中最大的高度
			 * @type Number
			 */
			maxHeight : 0,
			/**
			 * 行间距
			 * @type Number
			 */
			ROWGAP : 25,
			/**
			 * 列间距
			 * @type Number
			 */
			COLUMNGAP : 15,
			/**
			 * 初始位置,可以简单理解为原点
			 * @type 
			 */
			initPosition : {
				x : 100,
				y : 100
			},
			/**
			 * 初始化方法
			 *
			 * @param {}
			 *            canvas 需要排序的画布对象
			 * @param {}
			 *            figures 画布上所有需要排序的对象集合
			 */
			init : function(canvasPanel, figures) {
				this._super(canvasPanel, figures);
				//				
			},
			/**
			 * 获取对图元经行排列时的command
			 */
			getMoveCommand : function() {
				var me = this, figures = me.getFigures(), canvasViewWidth = me
						.getCanvasViewWidth(), figureNum = figures.getSize(), columnNum = 0, rowNum = 0, command = null, rowIndex = 0, colIndex = 0, x = 0, y = 0;
				me.maxHeight = this.getMaxHeight();
				me.maxWidth = this.getMaxWidth();
				//计算列数,也就说计算每一行有几个图元.鉴于所有图元都要看得到,所以需要向下取整;
				columnNum = Math.floor(canvasViewWidth
						/ (me.maxWidth + me.COLUMNGAP));
				//计算行数, 由图元总数除以每一行的个数,然后向上取整
				rowNum = Math.ceil(figureNum / columnNum);

				figures.each(function(n, figure) {
							command = new draw2d.command.CommandMoveByCenter(figure);
							//向下取整获得当前图元所在的行数.行列均从零开始计数
							rowIndex = Math.floor(n / columnNum);
							//取余数获得列数
							colIndex = n % columnNum;
							//这里设置的是图元的中心位置,由command负责转换
							x = me.initPosition.x + (colIndex - 1)
									* me.maxWidth + me.maxWidth / 2
									+ me.COLUMNGAP * colIndex;
							y = me.initPosition.y + (rowIndex - 1)
									* me.maxHeight + me.maxHeight / 2
									+ me.ROWGAP * rowIndex;
							command.setPosition(x, y);
							me.getRedoStack().add(command);
						});
			}

		});
/**
 * @author HeYuqing CanvasHorizontalLayoutCommand.js 2015年4月24日 上午9:55:36 TODO此类未实现
 */
draw2d.command.CanvasHorizontalLayoutCommand = draw2d.command.CanvasLayoutCommand
		.extend({

			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.command.CanvasHorizontalLayoutCommand",

			/**
			 * 默认每行排列的图元个数
			 * 
			 * @type Number
			 */
			DEFAULTNUM : 5,
			/**
			 * 列与列之间的间距
			 * 
			 * @type Number
			 */
			COLUMNSPACE : 10,
			/**
			 * 行间距
			 * 
			 * @type Number
			 */
			ROWSPACE : 10,

			/**
			 * 排列图元时初始位置
			 * 
			 * @type
			 */
			INITPOSITION : {
				x : 100,
				y : 100
			},
			/**
			 * 初始化方法
			 * 
			 * @param {}
			 *            canvas 需要排序的画布对象
			 * @param {}
			 *            figures 画布上所有需要排序的对象集合
			 * @param {}
			 *            num 每行的图元个数
			 */
			init : function(canvas, figures, num) {
				this._super(canvas, figures);
				if (num) {
					this.DEFAULTNUM = num;
				}
			},

			/**
			 * 获取对图元经行排列时的command
			 */
			getMoveCommand : function() {
				var me = this, figures = me.getFigures(), size = null, step = 0, i = 0, tempList = null, positionY = me.INITPOSITION.y, positionX = me.INITPOSITION.x;
				if (figures instanceof draw2d.util.ArrayList) {

					size = figures.getSize();
					step = (size / me.DEFAULTNUM) + 1;
					for (i; i <= (size / me.DEFAULTNUM); i++) {
						tempList = figures.slice(i * me.DEFAULTNUM, (i + 1)
										* me.DEFAULTNUM);
						//TODO 这个类没有完成,先做其他layout的实现了
						me.repositionFigures(tempList, positionX, positionY);
					}
				}
			},
			/**
			 * 根据每一行图元开始的位置来排列一队图元
			 * @param {} figures 需要排列的图元集合
			 * @param {} startX 排序开始的x坐标
			 * @param {} startY 排序开始的Y坐标
			 * @return {number} 本行排序完成后,最靠下的一个X坐标
			 */
			repositionFigures : function(figures, startX, startY) {

				var me = this, lineWidth = 0/*保存这一队图元中高度最大的图元用来确定最靠下的X坐标*/, x = 0, previousWidth = 0;
				figures.each(function(n, figure) {
							command = new draw2d.command.CommandMove(figure);
							//新的图元的x坐标需要在原始坐标的基础上,加上前面所有图元的宽度综合以及间隔综合
							x = startX + previousWidth + n * me.COLUMNSPACE;
							//重新计算所有图元的宽度综合,以便下一个图元使用
							previousWidth = previousWidth + figure.getWidth();

							command.setPosition(x, startY);
							//比较当前图元的高度与最大高度,如果当前图元的高度比最大高度达,则将此图元的高度赋给最大高度
							if (lineWidth < figure.getHeight()) {
								lineWidth = figure.getHeight();
							}
							//将移动Command加入命令集合
							me.getRedoStack().add(command);
						});
				//返回本行图元集合最大的X坐标,也就是最靠下的X坐标值
				return startX + lineWidth;
			}

		});
/**
 * @author HeYuqing
 * CanvasCircleLayoutCommand.js 
 * 2015年4月24日 上午9:55:14
 * TODO
 */
draw2d.command.CanvasCircleLayoutCommand = draw2d.command.CommandAlign.extend({

	/**
	 * 类名
	 */
	NAME : "draw2d.command.CanvasCircleLayoutCommand",

	/**
	 * 初始化方法,参见基类
	 * @param canvas
	 * @param figures
	 */
	init : function(canvas, figures) {
		this._super(canvas, figures);
	},

	/**
	 * 获取对图元经行排列时的command
	 */
	getMoveCommand : function() {
		var me = this, referenceFigure = null, y = null, i = 0, figure = null, command = null, figures = me
				.getFigures();
		// 选中的对象少于一个时不执行此操作
		if (figures.isEmpty() || figures.getSize <= 1) {
			return;
		}
		//按照图元的右下角Y坐标排序,大的在后面
		figures.sort('by');
		referenceFigure = figures.getLastElement();
		//获取最大的Y坐标,也就是位置最靠下的图元的Y坐标.可以简单理解为划出一条底线
		y = referenceFigure.by;
		for (i = 0; i < figures.getSize(); i++) {
			figure = figures.get(i);
			command = new draw2d.command.CommandMove(figure);
			//图元的X坐标不变,y坐标由最大的Y坐标减去图元的高度来确定
			command.setPosition(figure.getX(), y - figure.getHeight());
			me.getRedoStack().add(command);
		}
	}
});
/**
 * 重写命令堆栈的初始化方法
 */
draw2d.command.CommandStack.prototype.init = function() {
	this.undostack = [];
	this.redostack = [];
	this.maxundo = 50;
	this.transactionCommand = null;
	this.eventListeners = new draw2d.util.ArrayList();
	this.eventSubscriptions = {};
};
/**
 * 覆盖命令堆栈的执行方法,在执行时发出事件,由编辑器监听后处理各个命令
 * @param {} command
 */
draw2d.command.CommandStack.prototype.execute = function(command) {
	this.fireEvent("commandexecute", command)
};
/**
 * 给命令堆栈添加一个发出事件的方法
 * @param {} event
 * @param {} args
 */
draw2d.command.CommandStack.prototype.fireEvent = function(event, args) {
	try {
		if (typeof this.eventSubscriptions[event] === 'undefined') {
			return;
		}

		// avoid recursion
		if (this._inEvent === true) {
			return;
		}
		this._inEvent = true;
		var subscribers = this.eventSubscriptions[event];
		for (var i = 0; i < subscribers.length; i++) {
			subscribers[i](this, args);
		}
	} finally {
		this._inEvent = false;

		// fire a generic change event if an attribute has changed
		// required for some DataBinding frameworks or for the Backbone.Model compatibility
		// the event "change" with the corresponding attribute name as additional parameter
		if (event.substring(0, 7) === "change:") {
			this.fireEvent("change", event.substring(7));
		}
	}
};
/**
 * @method
 * 给命令添加监听某个事件的方法
 * @param {String}   event 事件名
 * @param {Function} callback 事件回调函数. 
 * @param {draw2d.Figure} 上下文执行环境
 */
draw2d.command.CommandStack.prototype.on = function(event, callback, context) {
	var events = event.split(" ");
	// the "context" param is add to be compatible with Backbone.Model.
	// The project "backbone.ModelBinder" used this signature and we want use this
	if (context) {
		callback = $.proxy(callback, context);
		callback.___originalCallback = callback;
	}

	for (var i = 0; i < events.length; i++) {
		if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
			this.eventSubscriptions[events[i]] = [];
		}
		this.eventSubscriptions[events[i]].push(callback);
	}
	return this;
};
/**
 * 移除某个事件的监听
 * @param {} eventOrFunction
 * @return {}
 */
draw2d.command.CommandStack.prototype.off = function(eventOrFunction) {
	if (typeof eventOrFunction === "undefined") {
		this.eventSubscriptions = {};
	} else if (typeof eventOrFunction === 'string') {
		this.eventSubscriptions[eventOrFunction] = [];
	} else {
		for (var event in this.eventSubscriptions) {
			this.eventSubscriptions[event] = $.grep(
					this.eventSubscriptions[event], function(callback) {
						if (typeof callback.___originalCallback !== "undefined") {
							return callback.___originalCallback !== eventOrFunction;
						}
						return callback !== eventOrFunction;
					});
		}
	}

	return this;
};
/**
 * @author HeYuqing CommandVerticalTreeLayout.js 2015年5月20日 上午10:34:16 树形布局的基类
 */
draw2d.command.CommandVerticalTreeLayout = draw2d.command.CanvasLayoutCommand
		.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.command.CommandVerticalTreeLayout",
			/**
			 * 最左上角位置距离画布顶部的距离
			 * 
			 * @type Number
			 */
			MARGIN_TOP : 200,
			/**
			 * 最左上角位置距离画布左边的位置
			 * 
			 * @type Number
			 */
			MARGIN_LEFT : 200,

			/**
			 * 图元直接的水平间隔
			 * 
			 * @type Number
			 */
			HORGAP : 40,
			/**
			 * 图元直接的垂直间隔
			 * 
			 * @type Number
			 */
			VERGAP : 60,
			/**
			 * 两棵树直接的距离
			 * 
			 * @type Number
			 */
			TREEGAP : 50,
			/**
			 * 所有节点的集合
			 */
			treeNodeMap : null,
			/**
			 * 构造函数
			 */
			init : function(canvasPanel, figures) {
				this.treeNodeMap = new draw2d.util.HashMap();
				this._super(canvasPanel, figures);
			},

			/**
			 * 继承父类结构
			 */
			getMoveCommand : function() {
				var me = this, treeMap = me.initTrees(), previousRootNode = null, rootNodes = me
						.getRootNodes();
				rootNodes.each(function(k, rootNode) {
							rootNode.clsssifyNodesByDepth();
							me.layoutRootNodes(rootNode, previousRootNode);
							previousRootNode = rootNode;
						});
			},
			/**
			 * 调用节点方法生成各个图元移动的command
			 */
			layoutRootNodes : function(rootNode, previousRootNode) {
				var me = this, baseX = 0;
				if (previousRootNode) {
					me.MARGIN_LEFT += previousRootNode.getBaseWidth()
							+ me.TREEGAP;
					//		} else {
					//			baseX = me.MARGIN_LEFT;
				}
				var commands = rootNode.getMoveCommand(me.MARGIN_LEFT,
						me.MARGIN_TOP, me.VERGAP, me.HORGAP);
				$.each(commands, function(n, command) {
							me.getRedoStack().add(command);
						});
			},
			/**
			 * 根据图元之间的关联关系,将图元之间的关系用treeNode的样式关联起来并缓存起来
			 */
			initTrees : function() {
				var me = this, figures = this.getFigures(), treeNode = null, upstreamNode = null, upstreamNodes = null, downTreeNode = null, downstreamNodes = null, figureId = null;
				me.getTreeNodeMap().clear();
				figures.each(function(n, figure) {
							treeNode = new draw2d.geo.TreeNode(figure);
							me.addTreeNode(treeNode);
							// 获取该图元的上游图元
							upstreamNodes = figure.getUpstreamNodes();
							// 确保该图元只有一个上游图元,否则无法构建树形结构
							if (upstreamNodes.getSize() == 1) {
								// upstreamNode是图元,要根据图元的id找到图元对应的treenode,这里可能找不到,因为该node可能还未创建
								upstreamNode = upstreamNodes.getFirstElement();
								// 获取上游图元的id
								figureId = upstreamNode.getId();
								// 根据上游图元的id查找器对应的treeNode并将该treeNode设置为当前图元对应treeNode的父节点,如果父节点未创建,则设置为null,
								treeNode
										.setParentNode(me.getTreeNode(figureId));
								me.buildRelation(me.getTreeNode(figureId),
										treeNode);
							} else if (upstreamNodes.getSize() > 1) {
								//						throw "无法确定该节点的唯一父节点";
								Dep.framework.editor.util.Msg
										.info("请确保每个节点只有一个父节点");
								return false;
							}
							// 获取下游图元的集合
							downstreamNodes = figure.getDownstreamNodes();
							treeNode.getChildrenNodes().clear();
							downstreamNodes.each(function(g, downstreamNode) {
										figureId = downstreamNode.getId();
										// 首先查看其子节点是否已创建
										downTreeNode = me.getTreeNode(figureId);
										if (!downTreeNode) {
											return;
										}
										me
												.buildRelation(treeNode,
														downTreeNode);
									});
						});
				return this.getTreeNodeMap();
			},
			/**
			 * 根据参数建立图元之间的父子关系
			 * 
			 * @param {}
			 *            parentNode
			 * @param {}
			 *            childNode
			 */
			buildRelation : function(parentNode, childNode) {
				if (!parentNode) {
					return;
				}
				parentNode.addChildNode(childNode);
				childNode.setParentNode(parentNode);
			},
			/**
			 * 从所有节点缓存中筛选出根节点
			 * 
			 * @returns {draw2d.util.ArrayList}
			 */
			getRootNodes : function() {
				var me = this, treeNodeMap = me.getTreeNodeMap(), rootNodes = new draw2d.util.ArrayList();
				treeNodeMap.each(function(n, treeNode) {
							if (!treeNode.getParentNode()) {
								rootNodes.add(treeNode);
							}
						});
				return rootNodes;
			},

			/**
			 * 添加一个节点
			 * 
			 * @param {draw2d.geo.TreeNode}
			 *            treeNode
			 */
			addTreeNode : function(treeNode) {
				this.treeNodeMap.put(treeNode.getId(), treeNode);
			},

			/**
			 * 根据id查询节点
			 * 
			 * @param {}
			 *            id
			 * @return {draw2d.geo.TreeNode}
			 */
			getTreeNode : function(id) {
				if (!id) {
					throw "未找到正确的节点";
				}
				return this.getTreeNodeMap().get(id);
			},
			/**
			 * 获取节点结合
			 * 
			 * @returns {draw2d.util.ArrayList}
			 */
			getTreeNodeMap : function() {
				return this.treeNodeMap;
			}

		});
/**
 * @author He Yuqing 将所有的选中的图元进行水平分散对齐
 */
draw2d.command.CommandDistributedHorizontal = draw2d.command.CommandAlign
		.extend({

			/**
			 * 类名
			 */
			NAME : "draw2d.command.CommandDistributedHorizontal",

			/**
			 * 初始化方法,参见基类
			 * 
			 * @param canvas
			 * @param figures
			 */
			init : function(canvas, figures) {
				this._super(canvas, figures);
			},

			/**
			 * 获取对图元经行排列时的command
			 */
			getMoveCommand : function() {
				var me = this, referenceFigure = null, tempX = null, maxWidth = null, sumOfFigureWidth = 0, num = null, gap = 0, command = null, figures = me
						.getFigures(), repostionX = 0;
				// 选中的对象少于一个时不执行此操作
				if (figures.isEmpty() || figures.getSize <= 1) {
					return;
				}
				// 计算所有图元的在水平方向上的跨度
				figures.sort('tx');
				referenceFigure = figures.getLastElement();
				tempX = referenceFigure.tx;
				figures.sort('x');
				referenceFigure = figures.getFirstElement();
				maxWidth = tempX - referenceFigure.getX();

				// 计算所有图元宽度总和
				figures.each(function(n, figure) {
							sumOfFigureWidth += figure.getWidth();
						});
				// 获取图元个数
				num = figures.getSize();
				// 计算图元水平方向上的间隔
				gap = (maxWidth - sumOfFigureWidth) / num;

				// 每个图元新的X坐标值
				repostionX = referenceFigure.getX();

				figures.each(function(k, figure) {
							command = new draw2d.command.CommandMove(figure);
							// 图元的X坐标不变,y坐标由最大的Y坐标减去图元的高度来确定
							command.setPosition(repostionX + k * gap, figure
											.getY());
							me.getRedoStack().add(command);
							repostionX += figure.getWidth();
						});
			}
		});
/**
 * @author He Yuqing 将所有的选中的图元进行垂直分散对齐
 */
draw2d.command.CommandDistributedvertical = draw2d.command.CommandAlign.extend(
		{

			/**
			 * 类名
			 */
			NAME : "draw2d.command.CommandDistributedvertical",

			/**
			 * 初始化方法,参见基类
			 * 
			 * @param canvas
			 * @param figures
			 */
			init : function(canvas, figures) {
				this._super(canvas, figures);
			},

			/**
			 * 获取对图元经行排列时的command
			 */
			getMoveCommand : function() {
				var me = this, referenceFigure = null, tempY = null, maxHeight = null, sumOfFigureHeight = 0, num = null, gap = 0, command = null, figures = me
						.getFigures(), repostionY = 0;
				// 选中的对象少于一个时不执行此操作
				if (figures.isEmpty() || figures.getSize <= 1) {
					return;
				}
				// 计算所有图元的在垂直方向上的跨度
				figures.sort('by');
				referenceFigure = figures.getLastElement();
				tempY = referenceFigure.by;
				figures.sort('y');
				referenceFigure = figures.getFirstElement();
				maxHeight = tempY - referenceFigure.getY();

				// 计算所有图元宽度总和
				figures.each(function(n, figure) {
							sumOfFigureHeight += figure.getHeight();
						});
				// 获取图元个数
				num = figures.getSize();
				// 计算图元水平方向上的间隔
				gap = (maxHeight - sumOfFigureHeight) / num;

				// 每个图元新的X坐标值
				repostionY = referenceFigure.getY();

				figures.each(function(k, figure) {
							command = new draw2d.command.CommandMove(figure);
							// 图元的X坐标不变,y坐标由最大的Y坐标减去图元的高度来确定
							command.setPosition(figure.getX(), repostionY + k
											* gap);
							me.getRedoStack().add(command);
							repostionY += figure.getHeight();
						});
			}
		});
/**
 * @author HeYuqing
 * Decorator.js 
 * 线性图元装饰类补充方法
 * 2015年4月13日 下午2:25:26
 * TODO
 */
/**
 * 复制一个装饰类.
 * 根据类名创建一个新的对象,然后根据原来类的宽高以及背景色等设置新的实例,然后return
 * @return {draw2d.decoration.connection.Decorator} 复制好的类
 */
draw2d.decoration.connection.Decorator.prototype.clone = function() {
	var me = this, className = eval(this.getClassName()), cloneDec = new className(
			me.getWidth(), me.getHeight());
	cloneDec.setColor(this.getColor());
	cloneDec.setBackgroundColor(this.getBackgroundColor());
	return cloneDec;
};
/**
 * 获取装饰类的类名
 * @return {string}
 */
draw2d.decoration.connection.Decorator.prototype.getClassName = function() {
	if (this.NAME) {
		return this.NAME;
	} else {
		throw "当前类未设置类名";
	}
};
/**
 * 获取装饰类的宽度
 * @return {number}
 */
draw2d.decoration.connection.Decorator.prototype.getWidth = function() {
	if (this.width) {
		return this.width;
	}
};
/**
 * 获取装饰类的宽度
 * @return {number}
 */
draw2d.decoration.connection.Decorator.prototype.getHeight = function() {
	if (this.height) {
		return this.height;
	}
};
/**
 * 获取装饰类的边框颜色 
 * @return {draw2d.util.Color}
 */
draw2d.decoration.connection.Decorator.prototype.getColor = function() {
	if (this.color) {
		return this.color;
	} else {
		throw "未能正确获取装饰类的颜色";
	}
};
/**
 * 获取装饰类的背景色
 * @return {draw2d.util.Color}
 */
draw2d.decoration.connection.Decorator.prototype.getBackgroundColor = function() {
	if (this.backgroundColor) {
		return this.backgroundColor;
	} else {
		throw "未能正确获取装饰类的背景颜色";
	}
};
/**
 * 对装饰类进行缩放
 * @param {} num
 */
draw2d.decoration.connection.Decorator.prototype.Scale = function(num) {
	this.setDimension(this.getWidth() / num, this.getHeight() / num);
	return this;
};
/**
 * @author HeYuqing TreeNode.js 2015年5月19日 下午4:42:03 表示一个树形布局的节点
 */
draw2d.geo.TreeNode = Class.extend({

	/**
	 * 类名
	 * 
	 * @type String
	 */
	NAME : "draw2d.geo.TreeNode",
	/**
	 * 以该节点为根节点的树形结构在X轴方向上的跨度,即长度
	 * 
	 * @type Number
	 */
	baseWidth : 0,
	/**
	 * 以该节点为根节点的树形结构在Y轴方向上的跨度,即高度
	 * 
	 * @type Number
	 */
	baseHeight : 0,
	/**
	 * 以该节点为根节点的树形结构中所有图元中X坐标最小值
	 * 
	 * @type Number
	 */
	baseX : 0,
	/**
	 * 
	 * @type Number
	 */
	baseY : 0,
	/**
	 * 该节点的父节点
	 * 
	 * @type draw2d.geo.TreeNode
	 */
	parentNode : null,
	/**
	 * 该节点的子节点集合
	 * 
	 * @type draw2d.util.ArrayList
	 */
	childNodes : null,
	/**
	 * 该节点的标识
	 */
	id : null,
	/**
	 * 该节点在树形结构中的层次,根节点为0级
	 * 
	 * @type Number
	 */
	depth : 0,
	/**
	 * 
	 * @param {}
	 *            figure
	 */
	init : function(figure, parentNode, childNodes) {
		var me = this;
		me.childNodes = new draw2d.util.ArrayList();
		me.depth = 0;
		me.baseWidth = 0;
		me.baseHeight = 0;
		if (figure instanceof draw2d.shape.node.Node) {
			me.figure = figure;
			this.setId(figure.getId());
		}
		if (parentNode instanceof draw2d.geo.TreeNode) {
			me.setParentNode(parentNode);
		}
		if ($.isArray(childNodes)) {
			this.childNodes = new draw2d.util.ArrayList(childNodes);
		}
		if (childNodes instanceof draw2d.util.ArrayList) {
			this.childNodes = childNodes;
		}
	},
	/**
	 * 获取当前节点下的所有叶子节点,即没有子节点的节点
	 */
	getAllLeafNodes : function() {
		var me = this, leafNodes = [];
		if (me.isLeaf()) {
			leafNodes.push(me);
		}
		me.getChildrenNodes().each(function(k, childNode) {
					leafNodes = leafNodes.concat(childNode.getAllLeafNodes());
				});
		return leafNodes;
	},
	/**
	 * 将一棵树按照层次划分,返回一个数组,该数字的下标代表depth,对象是包含该depth所有节点的集合
	 * 
	 * @return {[]}
	 */
	clsssifyNodesByDepth : function() {
		var me = this, list = new draw2d.util.ArrayList(), array = new Array();
		array[0] = list;
		list.add(me);
		if (me.getChildrenNodes().getSize() > 0) {
			array[1] = new draw2d.util.ArrayList();
			me.getChildrenNodes().each(function(k, childNode) {
						// array[1].add(childNode);
						childArray = childNode.clsssifyNodesByDepth();
						me.mixtureArrays(array, childArray);
					});
		}
		me.setDepthArray(array);
		return array;
	},

	/**
	 * 混淆父子节点的 按层次划分的数组
	 * 
	 * @param {}
	 *            array
	 * @param {}
	 *            subArray
	 */
	mixtureArrays : function(array, subArray) {
		$.each(subArray, function(m, list) {
					if (list instanceof draw2d.util.ArrayList) {
						if (array[m + 1]) {
							array[m + 1].addAll(list);
						} else {
							array[m + 1] = list;
						}
					}
				});
	},

	/**
	 * 真正生成命令
	 * 
	 * @param {}
	 *            baseX
	 * @param {}
	 *            baseY
	 * @param {}
	 *            verGap
	 * @param {}
	 *            horGap
	 * @return {}
	 */
	getMoveCommand : function(baseX, baseY, verGap, horGap) {
		var me = this, commands = [], command = null, baseWidth = 0, baseHeight = 0, childNodes = me
				.getChildrenNodes(), childCommand = [], previousChildNode = null, figure = me
				.getFigure(), tempX = baseX;
		command = new draw2d.command.CommandMoveByCenter(figure);
		me.setBaseX(baseX);
		me.setBaseY(baseY)
		baseWidth = me.getBaseWidth();
		baseHeight = me.getBaseHeight();
		command.setPosition(baseX + (baseWidth - figure.getWidth()) / 2, baseY
						+ me.getDepth() * verGap);
		// figure.setPosition(baseX + (baseWidth - figure.getWidth()) / 2, baseY
		// + me.getDepth() * verGap);
		commands.push(command);

		if (childNodes.getSize() > 0) {
			childNodes.each(function(n, childNode) {
						if (previousChildNode) {
							tempX = tempX + previousChildNode.getBaseWidth();
							baseX = me.tempX + previousChildNode.getBaseWidth();
						}
						childCommand = childNode.getMoveCommand(baseX + horGap
										* n, baseY + me.getFigureHeight(),
								verGap, horGap);
						commands = commands.concat(childCommand);
						previousChildNode = childNode;
						me.tempX = baseX;
					});
		}
		return commands;
	},
	/**
	 * 获取该节点在树形结构中的层级
	 * 
	 * @return {}
	 */
	getDepth : function() {
		var me = this, parentNode = me.getParentNode();
		if (parentNode) {
			me.depth = parentNode.getDepth() + 1;
		}
		return me.depth;
	},
	/**
	 * 判断该节点是否根节点,如果该节点有父节点,则不是根节点,反之则为根节点
	 * 
	 * @returns {boolean}
	 */
	isRoot : function() {
		if (this.getParentNode()) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 判断该节点是否为最下层的叶子节点
	 * 
	 * @returns {boolean}
	 */
	isLeaf : function() {
		var me = this, size = me.getChildrenNodes().getSize();
		if (size > 0) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 获取该node关联的图元对象
	 * 
	 * @returns {*}
	 */
	getFigure : function() {
		return this.figure;
	},
	getFigureWidth : function() {
		return this.getFigure().getWidth();
	},
	getFigureHeight : function() {
		return this.getFigure().getHeight();
	},
	/**
	 * 设置该节点父节点
	 * 
	 * @param node
	 */
	setParentNode : function(node) {
		this.parentNode = node;
	},
	/**
	 * 获取该节点的父节点
	 * 
	 * @returns {draw2d.geo.TreeNode}
	 */
	getParentNode : function() {
		return this.parentNode;
	},
	/**
	 * 添加一个子节点
	 * 
	 * @param node
	 */
	addChildNode : function(node) {
		if (this.getChildrenNodes().contains(node)) {
			return;
		}
		this.childNodes.add(node);
	},
	/**
	 * 获取所有的子节点集合
	 * 
	 * @returns {draw2d.util.ArrayList}
	 */
	getChildrenNodes : function() {
		return this.childNodes;
	},
	/**
	 * 设置最大宽度
	 * 
	 * @param width
	 */
	setBaseWidth : function(width) {
		this.baseWidth = width;
	},
	/**
	 * 获取最大宽度
	 * 
	 * @returns {*}
	 */
	getBaseWidth : function() {
		var me = this;
		if (this.getChildrenNodes().getSize() <= 0) {
			me.baseWidth = me.getFigureWidth();
		} else {
			// me.baseWidth = me.getSumWidthByDepth();
			me.baseWidth = 0;
			this.getChildrenNodes().each(function(n, node) {
						me.baseWidth += (node.getBaseWidth() + 40);
					});
			// me.baseWidth += me.getFigureWidth();
			if (me.baseWidth < me.getFigureWidth()) {
				me.baseWidth = me.getFigureWidth();
			}
		}

		return me.baseWidth;
	},
	/**
	 * 设置最大高度
	 * 
	 * @param height
	 */
	setBaseHeight : function(height) {
		this.baseHeight = height;
	},
	/**
	 * 获取最大高度
	 * 
	 * @returns {*}
	 */
	getBaseHeight : function() {
		var me = this, childNodes = me.getChildrenNodes();
		if (childNodes.getSize() <= 0) {
			me.baseHeight = me.getFigureHeight();
		} else {
			me.baseHeight = me.getSumHeightByDepth();
			// childNodes.each(function(n, node) {
			// me.baseHeight += node.getBaseHeight();
			// });
			// me.baseHeight += me.getFigureHeight()
		}
		return me.baseHeight;
	},
	/**
	 * 获取以该节点未根节点的树的高度
	 * 
	 * @return {}
	 */
	getSumHeightByDepth : function() {
		var me = this, depthArray = me.getDepthArray(), maxHeight = me
				.getFigureHeight();
		$.each(depthArray, function(n, array) {
					maxHeight += me.getEachHeightByDepth(array);
				});
		return maxHeight;
	},
	/**
	 * 获取每一层的最高节点
	 * 
	 * @param {}
	 *            array
	 * @return {}
	 */
	getEachHeightByDepth : function(array) {
		var me = this, tempWidth = 0, width = 0;
		array.each(function(k, node) {
					width = node.getFigureHeight();
					tempWidth = tempWidth > width ? tempWidth : width;
				});
		return tempWidth;
	},

	/**
	 * 获取以该节点为根节点时,该树的最大宽度
	 * 
	 * @return {}
	 */
	getSumWidthByDepth : function() {
		var me = this, depthArray = me.getDepthArray(), maxWidth = me
				.getFigureWidth(), tempWidth = 0;
		$.each(depthArray, function(n, array) {
					tempWidth = me.getEachWidthByDepth(array);
					maxWidth = maxWidth > tempWidth ? maxWidth : tempWidth;
				});
		return maxWidth;
	},
	/**
	 * 获取每一层的最大宽度
	 * 
	 * @param {}
	 *            array
	 * @return {}
	 */
	getEachWidthByDepth : function(array) {
		var me = this, tempWidth = 0, width = 0;
		array.each(function(k, node) {
			width = node.getFigureWidth();
			tempWidth += width;
				// tempWidth=tempWidth>width?tempWidth:width;
			});
		return tempWidth;
	},
	/**
	 * 设置该节点的id
	 * 
	 * @param id
	 */
	setId : function(id) {
		this.id = id;
	},
	/**
	 * 获取该节点的id
	 * 
	 * @returns {null}
	 */
	getId : function() {
		if (this.id) {
			return this.id;
		} else if (this.figure) {
			return this.figure.getId();
		} else {
			throw "未正确获取id";
		}
	},
	/**
	 * 设置以按照节点层级分类的数组
	 * 
	 * @param {}
	 *            array
	 */
	setDepthArray : function(array) {
		this.depthArray = array;
	},
	/**
	 * 获取以按照节点层级分类的数组
	 * 
	 * @return {}
	 */
	getDepthArray : function() {
		return this.depthArray;
	},
	setBaseX : function(baseX) {
		this.baseX = baseX
	},
	getBaseX : function() {
		return this.baseX;
	},
	setBaseY : function(baseY) {
		this.baseY = baseY
	},
	getBaseY : function() {
		return this.baseY;
	}
});
/**
 * @author HeYuqing
 * ConnectionRouter.js 
 * 路由基类的扩展方法
 * 2015年4月13日 下午2:33:51
 * TODO
 */
/**
 * 复制一个router类
 * 因为装饰类的关键代码在其paint方法中.所以初始化的时候什么参数都不需要
 * @return {}
 */
draw2d.layout.connection.ConnectionRouter.prototype.clone = function() {
	var me = this, className = eval(this.getClassName());
	return new className();

};
/**
 * 获取装饰类的类名
 * @return {}
 */
draw2d.layout.connection.ConnectionRouter.prototype.getClassName = function() {
	if (this.NAME) {
		return this.NAME;
	} else {
		throw "当前类未设置类名";
	}
};
/**
 * @author HeYuqing
 * FigureStatusIconLocator.js 
 * 2015年4月22日 上午11:15:40
 * 用来定位表示图元状态的小图标在图元上的相对位置
 */
draw2d.layout.locator.FigureStatusIconLocator = draw2d.layout.locator.Locator
		.extend({
					/**
					 * 类名
					 * @type String
					 */
					NAME : "draw2d.layout.locator.FigureStatusIconLocator",

					/**
					 * @constructor
					 */
					init : function() {
						this._super();
					},

					/**
					 * @method
					 * 重新计算子图元的位置,这里是将子图元放到父图元的右下方位置
					 *
					 * @param {Number} index child index of the target
					 * @param {draw2d.Figure} target The figure to relocate
					 **/
					relocate : function(index, target) {
						var parent = target.getParent();
						var boundingBox = parent.getBoundingBox();
						var targetBoundingBox = target.getBoundingBox();
						target.setPosition(
								((boundingBox.w - targetBoundingBox.w) | 0)
										+ 0.5,
								((boundingBox.h - (targetBoundingBox.h)) | 0)
										+ 0.5);
					}
				});
/**
 * @author HeYuqing FigureLabelLocator.js 2015年4月22日 上午11:15:40 用来定位图元名称的label位置
 */
draw2d.layout.locator.FigureLabelLocator = draw2d.layout.locator.Locator
		.extend({
					/**
					 * 类名
					 * 
					 * @type String
					 */
					NAME : "draw2d.layout.locator.FigureLabelLocator",

					/**
					 * @constructor
					 */
					init : function() {
						this._super();
					},

					/**
					 * @method 重新计算图元的位置,这里是将子图元放到父图元的下方
					 * 
					 * @param {Number}
					 *            index child index of the target
					 * @param {draw2d.Figure}
					 *            target The figure to relocate
					 */
					relocate : function(index, target) {
						var parent = target.getParent();
						var boundingBox = parent.getBoundingBox();
						var targetBoundingBox = target.getBoundingBox();
						target.setPosition(
								((boundingBox.w - targetBoundingBox.w) / 2)
										+ 0.5, (boundingBox.h + 0.5));
					}
				});
draw2d.layout.anchor.DepFanConnectionAnchor = draw2d.layout.anchor.FanConnectionAnchor
		.extend({

					NAME : "draw2d.layout.anchor.DepFanConnectionAnchor",

					/**
					 * 扩展父类方法，在计算anchor时，留出20的高度，不让连线覆盖label
					 */
					getBox : function() {
						var box = this.getOwner().getParent().getBoundingBox();
						box.setHeight(box.getHeight() + 20);
						return box;
					}
					,

				});
/**
 * 此路由基于InteractiveManhattanConnectionRouter修改，修改点如下：
 * 1. 安装策略添加了LineDragDropPolicy策略
 * 2. 路由计算顶点完成之后，添加intersectionsRepaint方法绘制线条的svg路径。（绘制桥）
 */
draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter = draw2d.layout.connection.ManhattanBridgedConnectionRouter
		.extend({
			NAME : "draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter",

			/**
			 * @constructor 
			 * Creates a new Router object.
			 * 
			 */
			init : function() {
				this._super();

			},
			/**
			 * 安装此策略时调用此方法完成策略初始化
			 * @param {} conn
			 */
			onInstall : function(conn) {
				conn
						.installEditPolicy(new draw2d.policy.line.OrthogonalSelectionFeedbackPolicy());
				//        conn.installEditPolicy(new draw2d.policy.line.LineDragDropPolicy());
				if (!conn._routingMetaData) {
					conn._routingMetaData = {
						routedByUserInteraction : false,
						fromDir : -1,
						toDir : -1
					};
				}
			},
			/**
			 * 卸载策略时调用此方法移除此策略的影响
			 * @param {} conn
			 */
			onUninstall : function(conn) {
				delete conn._routingMetaData;
			},

			/**
			 * @method
			 * Layout the hands over connection in a manhattan like layout
			 * 
			 * @param {draw2d.Connection} conn the connection to layout
			 * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
			 */
			route : function(conn, oldVertices) {
				if (oldVertices.getSize() === 0
						|| conn._routingMetaData.routedByUserInteraction === false) {
					this._super(conn, oldVertices);
					conn._routingMetaData.fromDir = conn.getSource()
							.getConnectionDirection(conn, conn.getTarget());
					conn._routingMetaData.toDir = conn.getTarget()
							.getConnectionDirection(conn, conn.getSource());
				} else {
					this._cusRoute(conn, oldVertices);
					this.intersectionsRepaint(conn);
				}

			},
			/**
			 * @method
			 * Layout the hands over connection in a manhattan like layout
			 * 
			 * @param {draw2d.Connection} conn the connection to layout
			 * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
			 */
			_cusRoute : function(conn, oldVertices) {
				this.halfRoute(conn, oldVertices);
			},

			/**
			 * @method
			 * The routing algorithm if the user has changed at least on of the vertices manually.
			 * This kind of routing just align the start and end vertices to the new source/target port
			 * location.
			 * The vertices between keep untouched. Modification of this vertices are done by the
			 * draw2d.policy.line.OrthogonalSelectionFeedbackPolicy
			 * 
			 * @param {draw2d.Connection} conn the connection to route
			 * @param {draw2d.util.ArrayList} oldVertices the vertices of the routing before
			 */
			halfRoute : function(conn, oldVertices) {

				var vertexCount = oldVertices.getSize();

				var fromPt = conn.getStartPoint();
				var fromDir = conn.getSource().getConnectionDirection(conn,
						conn.getTarget());

				var toPt = conn.getEndPoint();
				var toDir = conn.getTarget().getConnectionDirection(conn,
						conn.getSource());

				var max = Math.max;
				var min = Math.min;

				// the port orientation has been changed. This can happen if the node rotates. In this case
				// we must recalculate the routing.
				if (conn._routingMetaData.fromDir !== fromDir
						|| conn._routingMetaData.toDir !== toDir) {
					conn._routingMetaData.routedByUserInteraction = false;
					this._cusRoute(conn, oldVertices);
				}

				//  go back to the default if no routing is possible anymore
				//
				if ((fromDir === 1) && (toDir === 3) && (fromPt.x > toPt.x)
						&& (vertexCount <= 4)) {
					conn._routingMetaData.routedByUserInteraction = false;
					this._cusRoute(conn, oldVertices);
				}

				// transfer the old vertices into the connection
				//
				oldVertices.each(function(i, vertex) {
							conn.addPoint(vertex);
						});

				// The SOURCE port (labeled with p0) has been moved/changed.
				//
				if (!fromPt.equals(oldVertices.get(0))) {
					var p1 = oldVertices.get(1);
					var p2 = oldVertices.get(2);
					conn.setVertex(0, fromPt);
					switch (fromDir) {
						//          .
						//   p0     . p1
						//   +------+
						//          .
						//          .
						//
						case draw2d.geo.Rectangle.DIRECTION_RIGHT :
							conn.setVertex(1, max(fromPt.x + 10, p1.x),
									fromPt.y);// p1
							conn.setVertex(2, max(fromPt.x + 10, p1.x), p2.y); // p2
							break;
						//   .       
						//   . p1     p0
						//   +------+
						//   .       
						//   .       
						//
						case draw2d.geo.Rectangle.DIRECTION_LEFT :
							conn.setVertex(1, min(fromPt.x - 10, p1.x),
									fromPt.y);// p1
							conn.setVertex(2, min(fromPt.x - 10, p1.x), p2.y); // p2
							break;
						//     ...+....
						//     p1 |      
						//        |  
						//        |  
						//     p0 +  
						//
						case draw2d.geo.Rectangle.DIRECTION_UP :
							conn.setVertex(1, fromPt.x,
									min(fromPt.y - 10, p1.y)); // p1
							conn.setVertex(2, p2.x, min(fromPt.y - 10, p1.y)); // p2
							break;
						//        +
						//     p0 |      
						//        |  
						//     p1 |  
						//    ....+....  
						//
						case draw2d.geo.Rectangle.DIRECTION_DOWN :
							conn.setVertex(1, fromPt.x,
									max(fromPt.y + 10, p1.y)); // p1
							conn.setVertex(2, p2.x, max(fromPt.y + 10, p1.y)); // p2
							break;
					}
				}
				//////////////////////////////////////////////////////////////////
				// the TARGET port ( labeled with p0) has moved
				//
				if (!toPt.equals(oldVertices.get(vertexCount - 1))) {
					var p1 = oldVertices.get(vertexCount - 2);
					var p2 = oldVertices.get(vertexCount - 3);
					conn.setVertex(vertexCount - 1, toPt); // p0

					switch (toDir) {
						//               .
						//      p0       . p1
						//    +----------+ 
						//               .
						//               .
						case draw2d.geo.Rectangle.DIRECTION_RIGHT :
							conn.setVertex(vertexCount - 2, max(toPt.x + 10,
											p1.x), toPt.y); // p1
							conn.setVertex(vertexCount - 3, max(toPt.x + 10,
											p1.x), p2.y); // p2
							break;

						//    .
						//    .
						//    . p1         p0
						//    +----------+ 
						//    .
						//    .
						//
						case draw2d.geo.Rectangle.DIRECTION_LEFT :
							conn.setVertex(vertexCount - 2, min(toPt.x - 10,
											p1.x), toPt.y); // p1
							conn.setVertex(vertexCount - 3, min(toPt.x - 10,
											p1.x), p2.y); // p2
							break;

						//     ...+....
						//     p1 |      
						//        |  
						//        |  
						//     p0 +  
						//
						case draw2d.geo.Rectangle.DIRECTION_UP :
							conn.setVertex(vertexCount - 2, toPt.x, max(toPt.y
													+ 10, p1.y)); // p1
							conn.setVertex(vertexCount - 3, p2.x, max(toPt.y
													+ 10, p1.y)); // p2
							break;

						//        +    
						//     p0 |      
						//        |  
						//     p1 |  
						//     ...+...
						//
						case draw2d.geo.Rectangle.DIRECTION_DOWN :
							conn.setVertex(vertexCount - 2, toPt.x, max(toPt.y
													+ 10, p1.y)); // p1
							conn.setVertex(vertexCount - 3, p2.x, max(toPt.y
													+ 10, p1.y)); // p2
							break;
					}
				}
			},

			/**
			 * Callback method for the PolyLine or Connection to verify that a segment is deletable.
			 * @param index
			 * @returns {Boolean}
			 * @since 4.2.3
			 */
			canRemoveSegmentAt : function(conn, index) {

				var segmentCount = conn.getVertices().getSize() - 1; // segmentCount is one less than vertex count

				// The first and last segment isn't deletable
				//
				if ((index <= 0) || (index >= segmentCount)) {
					return false;
				}

				// a connection need at least three strokes
				//
				if (segmentCount < 4) {
					return false;
				}

				var fromPt = conn.getStartPoint();
				var fromDir = conn.getSource().getConnectionDirection(conn,
						conn.getTarget());

				var toPt = conn.getEndPoint();
				var toDir = conn.getTarget().getConnectionDirection(conn,
						conn.getSource());

				if (segmentCount <= 5) {
					//     ___
					//    |   |      From
					//    | 1 |-----+
					//    |___|     |
					//              |
					//   +----------+
					//   |
					//   |    ___
					//   |   |   |
					//   +---| 2 |    To
					//       |___|
					// the connection needs at least 5 segments if the routing is like this above
					//
					if ((fromDir === draw2d.geo.Rectangle.DIRECTION_RIGHT)
							&& (toDir === draw2d.geo.Rectangle.DIRECTION_LEFT)
							&& (fromPt.x >= toPt.x)) {
						return false;
					}

					//     ___
					//    |   |        To
					//    | 2 |-----+
					//    |___|     |
					//              |
					//   +----------+
					//   |
					//   |    ___
					//   |   |   |
					//   +---| 1 |    From
					//       |___|
					//
					if ((fromDir == draw2d.geo.Rectangle.DIRECTION_LEFT)
							& (toDir == draw2d.geo.Rectangle.DIRECTION_RIGHT)
							&& (fromPt.x <= toPt.x)) {
						return false;
					}

					//                          ___
					//      +_______           |   |
					//      | from  |          | 2 |
					//     _+_      |          |___| 
					//    |   |     |       To   +
					//    | 1 |     |____________|
					//    |___|     
					//
					if ((fromDir == draw2d.geo.Rectangle.DIRECTION_UP)
							& (toDir == draw2d.geo.Rectangle.DIRECTION_DOWN)
							&& (fromPt.y <= toPt.y)) {
						return false;
					}

					//                          ___
					//      +_______           |   |
					//      | to    |          | 1 |
					//     _+_      |          |___| 
					//    |   |     |     from   +
					//    | 2 |     |____________|
					//    |___|     
					//
					if ((fromDir == draw2d.geo.Rectangle.DIRECTION_DOWN)
							& (toDir == draw2d.geo.Rectangle.DIRECTION_UP)
							&& (fromPt.y >= toPt.y)) {
						return false;
					}

					// unable to make the decision on the easy way. calculate the route again and
					// check if the segment count of the new routed connection allows a removal
					//
					var tmpConn = new draw2d.Connection();
					tmpConn.lineSegments = new draw2d.util.ArrayList();
					tmpConn.vertices = new draw2d.util.ArrayList();
					tmpConn.sourcePort = conn.sourcePort;
					tmpConn.targetPort = conn.targetPort;
					tmpConn._routingMetaData = {
						routedByUserInteraction : false,
						fromDir : -1,
						toDir : -1
					};
					this._cusRoute(tmpConn, new draw2d.util.ArrayList());
					var curSegmentCount = conn.getVertices().getSize() - 1;
					var minSegmentCount = tmpConn.getVertices().getSize() - 1;
					if (curSegmentCount <= minSegmentCount) {
						return false;
					}
				}

				return true;
			},

			/**
			 * @method 
			 * Tweak or enrich the polyline persistence data with routing information
			 * 
			 * @since 2.10.0
			 * @param {draw2d.shape.basic.PolyLine} line
			 * @param {Object} memento The memento data of the polyline
			 * @returns {Object}
			 */
			getPersistentAttributes : function(line, memento) {
				memento.vertex = [];

				line.getVertices().each(function(i, e) {
							memento.vertex.push({
										x : e.x,
										y : e.y
									});
						});
				memento.routingMetaData = $.extend({}, line._routingMetaData);

				return memento;
			},

			/**
			 * @method 
			 * set the attributes for the polyline with routing information of the interactive manhattan router.
			 * 
			 * @since 4..0.0
			 * @param {Object} memento
			 */
			setPersistentAttributes : function(line, memento) {
				// restore the points from the JSON data and add them to the polyline
				//
				if (typeof memento.vertex !== "undefined") {

					line.oldPoint = null;
					line.lineSegments = new draw2d.util.ArrayList();
					line.vertices = new draw2d.util.ArrayList();

					$.each(memento.vertex, function(i, e) {
								line.addPoint(e.x, e.y);
							});
				}

				if (typeof memento.routingMetaData !== "undefinied") {
					line._routingMetaData = $.extend({},
							memento.routingMetaData);
				}
			},

			/**
			 * @method 
			 * set the attributes for the polyline with routing information of the interactive manhattan router.
			 * 
			 * @since 4..0.0
			 * @param {Object} memento
			 */
			intersectionsRepaint : function(conn) {
				// calculate the path string for the SVG rendering
				//    	conn.getCanvas().calculateConnectionIntersection();
				var intersectionsASC = conn.getCanvas().getIntersection(conn)
						.sort("x");
				var intersectionsDESC = intersectionsASC.clone().reverse();

				var intersectionForCalc = intersectionsASC;
				var i = 0;

				// ATTENTION: we cast all x/y coordinates to int and add 0.5 to avoid subpixel rendering of
				//            the connection. The 1px or 2px lines look much clearer than before.
				//
				var ps = conn.getVertices();
				var p = ps.get(0);
				var path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5];
				var oldP = p;
				for (i = 1; i < ps.getSize(); i++) {
					p = ps.get(i);

					// check for intersection and paint a bridge if required
					// line goes from left to right
					//
					var bridgeWidth = 5;
					var bridgeCode = this.BRIDGE_HORIZONTAL_LR;

					// line goes from right->left. Inverse the bridge and the bridgeWidth
					//
					if (oldP.x > p.x) {
						intersectionForCalc = intersectionsDESC;
						bridgeCode = this.BRIDGE_HORIZONTAL_RL;
						bridgeWidth = -bridgeWidth;
					}

					intersectionForCalc.each(function(ii, interP) {
						if (interP.justTouching == false
								&& draw2d.shape.basic.Line.hit(1, oldP.x,
										oldP.y, p.x, p.y, interP.x, interP.y) === true) {
							// we draw only horizontal bridges. Just a design decision
							//
							if (Math.abs(p.y - interP.y) < 2) {
								path.push(" L", ((interP.x - bridgeWidth) | 0)
												+ 0.5, " ", (interP.y | 0)
												+ 0.5);
								path.push(bridgeCode);
							}
						}

					});

					path.push(" L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
					oldP = p;
				}

				conn.svgPathString = path.join("");
			}
		});
/**
 * draw2d自带的麦哈顿路由算法有bug，在原有路由的基础上，修改代码，添加注释。
 */
draw2d.layout.connection.DepManhattanConnectionRouter = draw2d.layout.connection.ConnectionRouter
		.extend({
			NAME : "draw2d.layout.connection.DepManhattanConnectionRouter",

			MINDIST : 20,
			TOL : 0.1,
			TOLxTOL : 0.01,
			TOGGLE_DIST : 5,

			/**
			 * @constructor 
			 * Creates a new Router object.
			 * 
			 */
			init : function() {
				this._super();
			},

			/**
			 * @method
			 * Callback method if the router has been assigned to a connection.
			 * 
			 * @param {draw2d.Connection} connection The assigned connection
			 * @template
			 * @since 2.7.2
			 */
			onInstall : function(connection) {
				connection
						.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

			},

			/**
			 * @method
			 * Layout the hands over connection in a manhattan like layout
			 * 
			 * @param {draw2d.Connection} conn
			 * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
			 */
			route : function(conn, oldVertices) {
				var fromPt = conn.getStartPoint();
				var tempCon = conn.clone();

				//	   var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

				var toPt = conn.getEndPoint();
				//	   var toDir   = conn.getTarget().getConnectionDirection(conn, conn.getSource());
				var yDiff = fromPt.y - toPt.y;
				var toDir = 0, fromDir = 0;
				if (yDiff < 0) {
					fromDir = toDir = draw2d.geo.Rectangle.DIRECTION_DOWN;
				} else {
					fromDir = toDir = draw2d.geo.Rectangle.DIRECTION_UP;
				}

				// calculate the lines between the two points.
				//
				this._route(conn, fromPt, fromDir, toPt, toDir);
				this._paint(conn);
			},

			/**
			 * @method
			 * Internal routing algorithm.
			 * 
			 * @private
			 * @param {draw2d.Connection} conn
			 * @param {draw2d.geo.Point} fromPt
			 * @param {Number} fromDir
			 * @param {draw2d.geo.Point} toPt
			 * @param {Number} toDir
			 */
			_route : function(conn, fromPt, fromDir, toPt, toDir) {
				conn.addPoint(fromPt);
				// fromPt is an x,y to start from.  
				// fromDir is an angle that the first link must 
				//
				var UP = draw2d.geo.Rectangle.DIRECTION_UP;
				var RIGHT = draw2d.geo.Rectangle.DIRECTION_RIGHT;
				var DOWN = draw2d.geo.Rectangle.DIRECTION_DOWN;
				var LEFT = draw2d.geo.Rectangle.DIRECTION_LEFT;

				var xDiff = fromPt.x - toPt.x;
				var yDiff = fromPt.y - toPt.y;
				var point;
				var dir;
				//如果起点和终点位置一样
				if (((xDiff * xDiff) < (this.TOLxTOL))
						&& ((yDiff * yDiff) < (this.TOLxTOL))) {
					//仅添加终点
					conn.addPoint(new draw2d.geo.Point(toPt.x, toPt.y));
					return;
				}
				//线条起点向左
				if (fromDir === LEFT) { //如果起点在终点右边  且起点和终点在同一条水平线上  且终点箭头向左
				//		      if ((xDiff > 0) && ((yDiff * yDiff) < this.TOL) && (toDir === RIGHT))
					if ((xDiff > 0) && ((yDiff * yDiff) < this.TOL)
							&& (toDir === LEFT)) { //添加终点（即为直线）
						point = toPt;
						dir = toDir;
					} else { //如果起点和终点在同一条竖线上
						if (xDiff < 0) { //向左20添加一个点
							point = new draw2d.geo.Point(fromPt.x
											- this.MINDIST, fromPt.y);
						}//否则（如果终点在起点下方 且 终点箭头向下） 或者（终点在起点上方且终点箭头向上）
						//		         else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) 
						else if (((yDiff > 0) && (toDir === UP))
								|| ((yDiff < 0) && (toDir === DOWN))) {
							//在终点竖线方向和起点的水平方向上添加一个点
							point = new draw2d.geo.Point(toPt.x, fromPt.y);
						}//否则如果起点和终点方向一样，都是向左
						else if (fromDir == toDir) { //在起点的左侧减去20添加
						//		            var pos = Math.min(fromPt.x, toPt.x) - this.MINDIST;
							var pos = Math.max(fromPt.x, toPt.x) - this.MINDIST;
							point = new draw2d.geo.Point(pos, fromPt.y);
						} else {//否则在起点和终点水平位置中间添加一个点
							point = new draw2d.geo.Point(
									fromPt.x - (xDiff / 2), fromPt.y);
						}
						//如果终点在起点的下方，方向向上
						if (yDiff > 0) {
							dir = UP;
						}
						//否则方向向下
						else {
							dir = DOWN;
						}
					}
				}//如果起点方向向右
				else if (fromDir === RIGHT) {
					//		      if ((xDiff < 0) && ((yDiff * yDiff) < this.TOL)&& (toDir === LEFT))
					//如果起点和终点在同一水平线上且起点在终点的左侧且终点箭头向右
					if ((xDiff < 0) && ((yDiff * yDiff) < this.TOL)
							&& (toDir === RIGHT)) { //添加终点
						point = toPt;
						dir = toDir;
					} else {//否则如果起点在终点右边
						if (xDiff > 0) {//右侧20的位置添加一个点
							point = new draw2d.geo.Point(fromPt.x
											+ this.MINDIST, fromPt.y);
						}
						//		         else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP)))
						else if (((yDiff > 0) && (toDir === UP))
								|| ((yDiff < 0) && (toDir === DOWN))) {//否则如果起点在终点左边；（起点在终点下方且终点箭头向下）或者（起点在终点的上方且终点箭头向上），在起点水平位置和终点竖直位置的交叉点添加一个点
							point = new draw2d.geo.Point(toPt.x, fromPt.y);
						} else if (fromDir === toDir) {//否则如果起点在终点左边且起点和终点都是向右，在起点右侧20添加一个点
						//		            var pos = Math.max(fromPt.x, toPt.x) + this.MINDIST;
							var pos = Math.min(fromPt.x, toPt.x) + this.MINDIST;
							point = new draw2d.geo.Point(pos, fromPt.y);
						} else {//否则如果起点在终点左边，起点和终点中间加一个点，点的水平位置同起点。
							point = new draw2d.geo.Point(
									fromPt.x - (xDiff / 2), fromPt.y);
						}
						//如果起点在终点的下方，下一个路由的起点方向向上
						if (yDiff > 0) {
							dir = UP;
						} else { //否则向下
							dir = DOWN;
						}
					}
				} //如果起点位置向下
				else if (fromDir === DOWN) {//如果起点和终点在同一竖线上且起点在终点的上方且终点箭头方向想下
				//		      if (((xDiff * xDiff) < this.TOL) && (yDiff < 0)&& (toDir === UP)) 
					if (((xDiff * xDiff) < this.TOL) && (yDiff < 0)
							&& (toDir === UP)) {//添加终点（直线）
						point = toPt;
						dir = toDir;
					} else {//发走如果起点在终点的下方
						if (yDiff > 0) {
							//在起点下方20添加一个点
							point = new draw2d.geo.Point(fromPt.x, fromPt.y
											+ this.MINDIST);
						}
						//		         else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT)))
						else if (((xDiff > 0) && (toDir === LEFT))
								|| ((xDiff < 0) && (toDir === RIGHT))) {//否则如果起点在终点的上方； 如果（起点在终点的右边且终点箭头向左）或者起点在终点的左边且终点箭头向右，在起点下方和终点相同的水平位置添加一个点
							point = new draw2d.geo.Point(fromPt.x, toPt.y);
						}
						//		         else if (fromDir === toDir) 
						//		         {//否则如果起点在终点的上方且终点方向向下，在起点下方20添加点
						////		            var pos = Math.max(fromPt.y, toPt.y) + this.MINDIST;
						//		            var pos = Math.min(fromPt.y, toPt.y) + this.MINDIST;
						//		            point = new draw2d.geo.Point(fromPt.x, pos);
						//		         } 
						else {//在起点和终点中间添加一个点，x位置同起点
							point = new draw2d.geo.Point(fromPt.x, fromPt.y
											- (yDiff / 2));
						}
						//如果起点在终点的右边，下一个箭头向左
						if (xDiff > 0) {
							dir = LEFT;
						} else {//否则向右
							dir = RIGHT;
						}
					}
				} //如果起点方向向上
				else if (fromDir === UP) { //如果起点和终点的在同一竖直线上且起点在终点的下方且终点箭头向上。
				//		      if (((xDiff * xDiff) < this.TOL) && (yDiff > 0) && (toDir === DOWN))
					if (((xDiff * xDiff) < this.TOL) && (yDiff > 0)
							&& (toDir === UP)) {//添加终点坐标
						point = toPt;
						dir = toDir;
					} else {//否则如果起点在终点的上方
						if (yDiff < 0) {//在起点上方20添加一个点
							point = new draw2d.geo.Point(fromPt.x, fromPt.y
											- this.MINDIST);
						} //否则如果起点在终点的下方； （起点在终点的右边且终点箭头向左）或者（起点在终点左边且终点箭头向右）
						//		         else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) 
						else if (((xDiff > 0) && (toDir === LEFT))
								|| ((xDiff < 0) && (toDir === RIGHT))) {//在起点x方向和终点y方向交叉点添加一个点。
							point = new draw2d.geo.Point(fromPt.x, toPt.y);
						}
						//		         else if (fromDir === toDir) 
						//		         {//如果起点在终点的下方，且起点和终点方向都是向上。在起点的上方20处添加一个点。
						////		            var pos = Math.min(fromPt.y, toPt.y) - this.MINDIST;
						//		            var pos = Math.max(fromPt.y, toPt.y) - this.MINDIST;
						//		            point = new draw2d.geo.Point(fromPt.x, pos);
						//		         } 
						else {//否则在起点和中间添加一个点
							point = new draw2d.geo.Point(fromPt.x, fromPt.y
											- (yDiff / 2));
						}
						//如果起点在终点的右边，下一个计算点向左。
						if (xDiff > 0) {
							dir = LEFT;
						} else {//否则向右
							dir = RIGHT;
						}
					}
				}
				this._route(conn, point, dir, toPt, toDir);
			}

		});
draw2d.layout.connection.DepSplineConnectionRouter = draw2d.layout.connection.SplineConnectionRouter
		.extend({

					NAME : "draw2d.layout.connection.DepSplineConnectionRouter",

					/**
					 * @constructor Creates a new Router object
					 */
					init : function() {
						this._super();

						this.spline = new draw2d.util.spline.CubicSpline();
						this.MINDIST = 50, this.cheapRouter = null;
					},

					/**
					 * @method
					 * Layout the hands over connection with the cubic spline calculation and manhattan routing
					 * 
					 * @param {draw2d.Connection} conn
					 * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
					 */
					route : function(conn, oldVertices) {
						var i = 0;
						var fromPt = conn.getStartPoint();
						var fromDir = 2;

						var toPt = conn.getEndPoint();
						var toDir = 0;

						this._route(conn, toPt, toDir, fromPt, fromDir);

						var ps = conn.getVertices();

						conn.oldPoint = null;
						conn.lineSegments = new draw2d.util.ArrayList();
						conn.vertices = new draw2d.util.ArrayList();

						var splinePoints = this.spline.generate(ps, 8);
						splinePoints.each(function(i, e) {
									conn.addPoint(e);
								});

						// calculate the path string for the SVG rendering
						//
						var ps = conn.getVertices();
						length = ps.getSize();
						var p = ps.get(0);
						var path = ["M", p.x, " ", p.y];
						for (i = 1; i < length; i++) {
							p = ps.get(i);
							path.push("L", p.x, " ", p.y);
						}
						conn.svgPathString = path.join("");
					}
				});
var ROUTER_RECTS = null;

draw2d.layout.connection.DepMazeConnectionRouter = draw2d.layout.connection.MazeConnectionRouter
		.extend({
					NAME : "draw2d.layout.connection.DepMazeConnectionRouter",

					/**
					 * @constructor Creates a new Router object.
					 * 
					 */
					init : function() {
						this._super();
					},

					/**
					 * @method Layout the hands over connection in a manhattan
					 *         like layout
					 * 
					 * @param {draw2d.Connection}
					 *            conn
					 * @param {draw2d.util.ArrayList}
					 *            oldVertices old/existing vertices of the
					 *            Connection
					 */
					route : function(conn, oldVertices) {

						var fromPt = conn.getStartPoint();
						var fromDir = 2;

						var toPt = conn.getEndPoint();
						var toDir = 0;

						// calculate the lines between the two points.
						//
						this._route(conn, toPt, toDir, fromPt, fromDir);
						conn.getVertices().reverse();
						this._paint(conn);
					}

				});
/**
 * @author yhy LineDragDropPolicy
 */
draw2d.policy.line.LineDragDropPolicy = draw2d.policy.figure.DragDropEditPolicy
		.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.policy.line.LineDragDropPolicy",

			/**
			 * @constructor Creates a new Router object
			 */
			init : function() {
				this._super();
			},

			/**
			 * @method Called by the framework if the related shape has init a
			 *         drag&drop operation
			 * 
			 * @param {draw2d.Canvas}
			 *            canvas The host canvas
			 * @param {draw2d.Figure}
			 *            figure The related figure
			 * @param {Number}
			 *            x the x-coordinate of the mouse up event
			 * @param {Number}
			 *            y the y-coordinate of the mouse up event
			 * @param {Boolean}
			 *            shiftKey true if the shift key has been pressed during
			 *            this event
			 * @param {Boolean}
			 *            ctrlKey true if the ctrl key has been pressed during
			 *            the event
			 * @template
			 */
			onDragStart : function(canvas, figure, x, y, shiftKey, ctrlKey) {
				var me = this;
				if (x == 0 && y == 0) {
					return;
				}
				// 获取拖拽的线段
				me.selectionSegment = me.getRelationSegment(figure, x
								+ figure.getAbsoluteX(), y
								+ figure.getAbsoluteY());

				figure.isMoving = false;
			},
			/**
			 * 获取拖拽的线段的算法
			 */
			getRelationSegment : function(figure, px, py) {
				for (var i = 0; i < figure.lineSegments.getSize(); i++) {
					var segment = figure.lineSegments.get(i);
					// 测试点击的点是否在线段上
					if (draw2d.shape.basic.Line.hit(5, segment.start.x,
							segment.start.y, segment.end.x, segment.end.y, px,
							py)) {
						return {
							index : i,
							start : segment.start,
							end : segment.end
						};
					}
				}
			},

			/**
			 * @method Called by the framework during drag a figure.
			 * 
			 * @param {draw2d.Canvas}
			 *            canvas The host canvas
			 * @param {draw2d.Figure}
			 *            figure The related figure
			 * @template
			 */
			onDrag : function(canvas, figure, dx, dy, dx2, dy2) {
				var me = this;
				// 如果没有选对，不拖拽
				if (!me.selectionSegment) {
					return;
				}
				/*
				 * if (me.selectionSegment.index == 0 ||
				 * me.selectionSegment.index == figure.lineSegments.getSize()-1) {
				 * return; //第一条线段和最后一条线段不允许拖拽 }
				 */
				if (me.selectionSegment.index == figure.lineSegments.getSize()
						- 1) {
					return; // 最后一条线段不允许拖拽
				}
				if (Math.abs(me.selectionSegment.start.x
						- me.selectionSegment.end.x) < 3) {// 给予一定的误差，当前为2
					if (me.selectionSegment.index == 0) {// 如果是第一条线段，仅改变sourcePort的位置，然后让其发送事件更新point以及重新路由。
						var sourcePort = figure.getSource();
						var newX = sourcePort.getX() + dy2;
						var parent = sourcePort.getParent();
						var maxX = parent.getWidth();
						if (newX < 0) {
							newX = 0;
						}
						if (newX > maxX) {
							newX = maxX;
						}
						sourcePort.setX(newX);
						sourcePort.fireEvent("move");
						sourcePort.fireEvent("change:x");
					} else if (me.selectionSegment.index == figure.lineSegments
							.getSize()
							- 1) {// 如果是最后一条线段，仅改变targetPort的位置，然后让其发送事件更新point以及重新路由。
						var targetPort = figure.getTarget();
						var newX = targetPort.getX() + dy2;
						var parent = targetPort.getParent();
						var maxX = parent.getWidth();
						if (newX < 0) {
							newX = 0;
						}
						if (newX > maxX) {
							newX = maxX;
						}
						targetPort.setX(newX);
						targetPort.fireEvent("move");
						targetPort.fireEvent("change:x");
					} else {
						// 仅更新x坐标，Y坐标不变
						figure.setVertex(me.selectionSegment.index,
								me.selectionSegment.start.x + dx2,
								me.selectionSegment.start.y);
						figure.setVertex(me.selectionSegment.index + 1,
								me.selectionSegment.end.x + dx2,
								me.selectionSegment.end.y);
					}
				} else if (Math.abs(me.selectionSegment.start.y
						- me.selectionSegment.end.y) < 3) {// 给予一定的误差，当前为2
					if (me.selectionSegment.index == 0) {
						var sourcePort = figure.getSource();
						var newY = sourcePort.getY() + dy2;
						var parent = sourcePort.getParent();
						var maxY = parent.getHeight();
						if (newY < 0) {
							newY = 0;
						}
						if (newY > maxY) {
							newY = maxY;
						}
						sourcePort.setY(newY);
						sourcePort.fireEvent("move");
						sourcePort.fireEvent("change:y");
					} else if (me.selectionSegment.index == figure.lineSegments
							.getSize()
							- 1) {// 如果是最后一条线段，仅改变targetPort的位置，然后让其发送事件更新point以及重新路由。
						var targetPort = figure.getTarget();
						var newY = targetPort.getY() + dy2;
						var parent = targetPort.getParent();
						var maxY = parent.getHeight();
						if (newY < 0) {
							newY = 0;
						}
						if (newY > maxY) {
							newY = maxY;
						}
						targetPort.setY(newY);
						targetPort.fireEvent("move");
						targetPort.fireEvent("change:y");
					} else {
						// 仅更新Y坐标，X坐标不变
						figure.setVertex(me.selectionSegment.index,
								me.selectionSegment.start.x,
								me.selectionSegment.start.y + dy2);
						figure.setVertex(me.selectionSegment.index + 1,
								me.selectionSegment.end.x,
								me.selectionSegment.end.y + dy2);
					}
				}
				figure._routingMetaData.routedByUserInteraction = true;
				figure.routingRequired = true;
				return true;
			},

			/**
			 * @method Called by the framework if the drag drop operation ends.
			 * 
			 * @param {draw2d.Canvas}
			 *            canvas The host canvas
			 * @param {draw2d.Figure}
			 *            figure The related figure
			 * @param {Number}
			 *            x the x-coordinate of the mouse up event
			 * @param {Number}
			 *            y the y-coordinate of the mouse up event
			 * @param {Boolean}
			 *            shiftKey true if the shift key has been pressed during
			 *            this event
			 * @param {Boolean}
			 *            ctrlKey true if the ctrl key has been pressed during
			 *            the event
			 * @template
			 */
			onDragEnd : function(canvas, figure, x, y, shiftKey, ctrlKey) {
				if (figure instanceof draw2d.Connection) {
					var redrawConnection = new draw2d.util.ArrayList();
					// 重新计算交点
					canvas.calculateConnectionIntersection();
					// 刷新线条
					canvas.lineIntersections.each(function(i, inter) {
								if (!redrawConnection.contains(inter.line))
									redrawConnection.add(inter.line);
								if (!redrawConnection.contains(inter.other))
									redrawConnection.add(inter.other);
							});

					redrawConnection.each(function(i, line) {
								line.svgPathString = null;
								line.repaint();
							});
					/**
					 * 获取链接两端的节点,在拖动完成后重新布局/绑定port,从而避免拖动完成后移动节点无法带动link移动的bug
					 */
					var targetNode = figure.getTargetNode(), sourceNode = figure
							.getSourceNode();
					targetNode.portRelayoutRequired = true;
					sourceNode.portRelayoutRequired = true;
					targetNode.layoutPorts();
					sourceNode.layoutPorts();
				}

				// figure.shape.attr({
				// cursor : "default"
				// });
				figure.isMoving = false;
			},

			/**
			 * @method Callback if the figure has moved
			 * 
			 * @param {draw2d.Canvas}
			 *            canvas The host canvas
			 * @param {draw2d.Figure}
			 *            figure The related figure
			 * 
			 * @template
			 */
			moved : function(canvas, figure) {
			}

		});
/**
 * @author HeYuqing AddLinkPolicy.js 2015年4月28日 下午4:25:04 TODO
 */
draw2d.policy.canvas.AddLinkPolicy = draw2d.policy.canvas.SingleSelectionPolicy
		.extend({

			NAME : "draw2d.policy.canvas.AddLinkPolicy",

			/**
			 * @constructor Creates a new selection policy for a canvas.
			 */
			init : function() {
				this._super();
			},

			/**
			 * @inheritdoc
			 */
			select : function(canvas, figure) {
				if (canvas.getSelection().contains(figure)) {
					return; // nothing to to
				}

				var oldSelection = canvas.getSelection().getPrimary();

				if (figure !== null) {
					figure.select(true); // primary selection
				}

				if (oldSelection !== figure) {
					canvas.getSelection().setPrimary(figure);

					// inform all selection listeners about the new selection.
					//
					canvas.fireEvent("select", figure);
				}
			},

			/**
			 * @method 鼠标左键按下时调用此方法,有画布调用
			 * @param {draw2d.Canvas}
			 *            canvas
			 * @param {Number}
			 *            x the x-coordinate of the mouse down event
			 * @param {Number}
			 *            y the y-coordinate of the mouse down event
			 * @param {Boolean}
			 *            shiftKey true if the shift key has been pressed during
			 *            this event
			 * @param {Boolean}
			 *            ctrlKey true if the ctrl key has been pressed during
			 *            the event
			 */
			onMouseDown : function(canvas, x, y, shiftKey, ctrlKey) {
				try {
					var _this = this;

					//获取缓存模型对象,表明当前需要添加的是什么链接
					var currentModel = canvas.getCurrentModel();
					// 如果画布中缓存的图元模型为空,则不进行添加操作
					if (!currentModel) {
						return;
					}
					this.x = x;
					this.y = y;
					var currentSelection = canvas.getSelection().getAll();
					var figure = canvas.getBestFigure(x, y);
					_this.currentEditFigure = null;
					if (!figure) {
						return;
					}
					while (figure !== null && figure.getComposite() !== null) {
						var delegate = figure.getComposite()
								.delegateSelectionHandling(figure);
						if (delegate === figure) {
							break;
						}
						figure = delegate;
					}

					while ((figure !== null && figure.getParent() !== null)
							&& !(figure instanceof draw2d.Port)) {
						figure = figure.getParent();
					}

					if (figure !== null) {
						// 校验当前链接是否允许在当前节点上建立链接
						if (!_this._valivateOutPutFigureByLinkModel(canvas,
								figure)) {
							// TODO 以后这里可以添加提醒
							return
						};
						_this.currentEditFigure = figure;
						figure.onAddLinkStart(x, y, shiftKey, ctrlKey);
					}
					currentSelection.each(function(i, figure) {
								_this.unselect(canvas, figure);
							});
				} catch (exc) {
					console.log(exc);
				}
			},

			/**
			 * @method
			 * 当鼠标按下然后移动时调用此方法
			 * @param {draw2d.Canvas}
			 *            canvas
			 * @param {Number}
			 *            dx The x diff between start of dragging and this event
			 * @param {Number}
			 *            dy The y diff between start of dragging and this event
			 * @param {Number}
			 *            dx2 The x diff since the last call of this dragging
			 *            operation
			 * @param {Number}
			 *            dy2 The y diff since the last call of this dragging
			 *            operation
			 * @template
			 */
			onMouseDrag : function(canvas, dx, dy, dx2, dy2) {
				try {
					if (this.currentEditFigure) {
						this.currentEditFigure.onAddLinkDrag(dx, dy, dx2, dy2);
					}
				} catch (exc) {
					console.log(exc);
				}
			},

			/**
			 * @method
			 * 当鼠标弹起时调用此方法
			 * @param {draw2d.Canvas}
			 *            canvas
			 * @param {Number}
			 *            x the x-coordinate of the mouse down event
			 * @param {Number}
			 *            y the y-coordinate of the mouse down event
			 * @param {Boolean}
			 *            shiftKey true if the shift key has been pressed during
			 *            this event
			 * @param {Boolean}
			 *            ctrlKey true if the ctrl key has been pressed during
			 *            the event
			 */
			onMouseUp : function(canvas, x, y, shiftKey, ctrlKey) {
				try {
					var _this = this;
					// 如果非双击图元工具箱后的添加,则将画布上缓存的模型置空

					if (!_this.currentEditFigure) {
						if (!canvas.isDblClicked()) {
							canvas.getOutOfAddLinkState(null, false);
						}
						return;
					}
					var currentSelection = canvas.getSelection().getAll();
					var figure = canvas.getBestFigure(x, y);

					if (!figure) {
						_this.currentEditFigure.onAddLinkDrop(null, x, y,
								shiftKey, ctrlKey);
						return;
					}

					while (figure !== null && figure.getComposite() !== null) {
						var delegate = figure.getComposite()
								.delegateSelectionHandling(figure);
						if (delegate === figure) {
							break;
						}
						figure = delegate;
					}

					while ((figure !== null && figure.getParent() !== null)
							&& !(figure instanceof draw2d.Port)) {
						figure = figure.getParent();
					}

					if (figure !== null) {
						// 判断当前drop的图元是否符合链接的要求
						if (!_this._valivateFigureByLinkModel(canvas, figure)) {
							// TODO 以后这里可以添加提醒
							_this.currentEditFigure.onAddLinkDrop(null, x, y,
									shiftKey, ctrlKey);
							if (!canvas.isDblClicked()) {
								canvas.getOutOfAddLinkState(null, false);
							}
							return
						};
						// _this.currentEditFigure = figure;
						_this.currentEditFigure.onAddLinkDrop(figure, x, y,
								shiftKey, ctrlKey);
						if (!canvas.isDblClicked()) {
							canvas.getOutOfAddLinkState(null, false);
						}
					}
				} catch (exc) {
					console.log(exc);
				}
			},
			/**
			 * 校验当前选中的图元是否允许建立当前选中的链接
			 * 
			 * @param {}
			 *            figure
			 * @return {}
			 */
			_valivateOutPutFigureByLinkModel : function(canvas, figure) {
				var _this = this, linkModel = canvas.getCurrentModel(), connectionConfig = linkModel
						.get('connectionConfig'), fType = figure
						.getFigureType(), flag = false;
				// 如果不存在此配置项,则默认可以在所有节点上添加此链接
				if (!connectionConfig) {
					return true;
				} else {
					// 根据配置项校验当前图元是否在链接允许连接的图元范围内
					$.each(connectionConfig, function(n, config) {
								if (fType == config.sourceNodeType) {
									flag = true;
									return false;
								}
							});
				}
				return flag;
			},
			/**
			 * 判断当前链接允许连接的图元是否包含figure
			 * 
			 * @param {}
			 *            figure 需要校验的图元
			 * @return {Boolean}
			 */
			_valivateFigureByLinkModel : function(canvas, figure) {
				var _this = this, linkModel = canvas.getCurrentModel(), connectionConfig = linkModel
						.get('connectionConfig'), fType = figure
						.getFigureType(), flag = false;
				if (!connectionConfig) {
					return true;
				} else {
					$.each(connectionConfig, function(n, config) {
						if (config.destPortType && fType == config.destPortType) {

							flag = true;
							return false;
						} else {
							if (!(figure instanceof Dep.framework.editor.figure.BaseNode)) {
								fType = figure.getParent().getFigureType();
							}
							if (config.destNodeType
									&& fType == config.destNodeType) {
								flag = true;
								return false;
							}
						}
					});
				}
				return flag;
			}

		});
/**
 * @author HeYuqing AddLinkPolicy.js 2015年4月28日 下午4:25:04 TODO
 */
draw2d.policy.canvas.DragDropCanvasPolicy = draw2d.policy.canvas.SingleSelectionPolicy
		.extend({

					NAME : "draw2d.policy.canvas.DragDropCanvasPolicy",

					/**
					 * @constructor Creates a new selection policy for a canvas.
					 */
					init : function() {
						this._super();
					},

					/**
					 * @inheritdoc
					 */
					select : function(canvas, figure) {
						if (canvas.getSelection().contains(figure)) {
							return; // nothing to to
						}

						var oldSelection = canvas.getSelection().getPrimary();

						if (figure !== null) {
							figure.select(true); // primary selection
						}

						if (oldSelection !== figure) {
							canvas.getSelection().setPrimary(figure);

							// inform all selection listeners about the new
							// selection.
							//
							canvas.fireEvent("select", figure);
						}
					},

					onMouseDown : function(canvas, x, y, shiftKey, ctrlKey) {
						try {
							var _this = this;
							this.x = x;
							this.y = y;
						} catch (exc) {
							console.log(exc);
						}
					},

					onMouseDrag : function(canvas, dx, dy, dx2, dy2) {
						try {
							canvas.onMouseMoveCanvas(dx, dy, dx2, dy2);
						} catch (exc) {
							console.log(exc);
						}
					},
					onMouseUp : function(canvas, x, y, shiftKey, ctrlKey) {
						try {
							var _this = this;

						} catch (exc) {
							console.log(exc);
						}
					}
				});
/**
 * 扩展此方法,在port展示光晕的同时 展示其label
 * 
 * @param {}
 *            canvas
 * @param {}
 *            figure
 * @param {}
 *            x
 * @param {}
 *            y
 * @param {}
 *            shiftKey
 * @param {}
 *            ctrlKey
 */
draw2d.policy.port.IntrusivePortsFeedbackPolicy.prototype.onDragStart = function(
		canvas, figure, x, y, shiftKey, ctrlKey) {
	var start = 0;
	var allPorts = canvas.getAllPorts().clone();
	allPorts.each(function(i, element) {
				element.__beforeInflate = element.getWidth();
				start = element.__beforeInflate;
			});

	// animate the resize of the ports
	//
	allPorts.grep(function(p) {
				return (p.NAME != figure.NAME && p.parent !== figure.parent)
						|| (p instanceof draw2d.HybridPort)
						|| (figure instanceof draw2d.HybridPort);
			});
	this.tweenable = new Tweenable();
	this.tweenable.tween({
				from : {
					'size' : start / 2
				},
				to : {
					'size' : start
				},
				duration : 200,
				easing : "easeOutSine",
				step : function(params) {
					allPorts.each(function(i, element) {
								// IMPORTANT shortcut to avoid rendering
								// errors!!
								// performance shortcut to avoid a lot of events
								// and recalculate/routing of all related
								// connections
								// for each setDimension call. Additional the
								// connection is following a port during
								// Drag&Drop operation
								element.shape.attr({
											rx : params.size,
											ry : params.size
										});

								element.width = element.height = params.size
										* 2;
								// element.setDimension(params.size,
								// params.size);
								if (element.showTips) {
									element.showTips();
								}
							});

				}
			});

	this.connectionLine = new draw2d.shape.basic.Line();
	this.connectionLine.setCanvas(canvas);
	this.connectionLine.getShapeElement();
	this.connectionLine.setDashArray("- ");
	this.connectionLine.setColor("#30c48a");

	this.onDrag(canvas, figure);
};
/**
 * 
 * @param {}
 *            canvas
 * @param {}
 *            figure
 * @param {}
 *            x
 * @param {}
 *            y
 * @param {}
 *            shiftKey
 * @param {}
 *            ctrlKey
 */
draw2d.policy.port.IntrusivePortsFeedbackPolicy.prototype.onDragEnd = function(
		canvas, figure, x, y, shiftKey, ctrlKey) {
	this.tweenable.stop(false);
	this.tweenable = null;
	canvas.getAllPorts().each(function(i, element) {
		// IMPORTANT shortcut to avoid rendering errors!!
		// performance shortcut to avoid a lot of events and recalculate/routing
		// of all related connections
		// for each setDimension call. Additional the connection is following a
		// port during Drag&Drop operation
		element.shape.attr({
					rx : element.__beforeInflate / 2,
					ry : element.__beforeInflate / 2
				});
		if (element.hideTips) {
			element.hideTips();
		}
		element.width = element.height = element.__beforeInflate;
			// element.setDimension(element.__beforeInflate,
			// element.__beforeInflate);
		});
	this.connectionLine.setCanvas(null);
	this.connectionLine = null;
};
/**
 * @author HeYuqing BoundingMovePolicy.js 2015年4月27日 上午10:57:20 限制port只能沿着其父类的边框移动
 */
draw2d.policy.port.BoundingMovePolicy = draw2d.policy.port.PortFeedbackPolicy
		.extend({

			/**
			 * 类名
			 * @type String
			 */
			NAME : "draw2d.policy.port.BoundingMovePolicy",

			/**
			 * 表明当前port只允许上下移动
			 * 
			 * @type Number
			 */
			UPDOWN : 2,
			/**
			 * 表明当前port只允许左右移动
			 * 
			 * @type Number
			 */
			LEFTRIGHT : 1,

			/**
			 * 表明当前port位于父图元左上角
			 * 
			 * @type String
			 */
			TOPLEFT : "topleft",
			/**
			 * 表明当前port位于父图元右上角
			 * 
			 * @type String
			 */
			TOPRIGHT : "topright",
			/**
			 * 表明当前port位于父图元左下角
			 * 
			 * @type String
			 */
			BOTTOMLEFT : "bottomleft",
			/**
			 * 表明当前port位于父图元右下角
			 * 
			 * @type String
			 */
			BOTTOMRIGHT : "bottomright",
			/**
			 * @constructor Creates a new Router object
			 */
			init : function() {
				this._super();
			},

			/**
			 * 根据port在其父图元中的位置,限制port的移动范围 draw2d.geo.Rectangle.DIRECTION_UP =0;
			 * draw2d.geo.Rectangle.DIRECTION_RIGHT =1;
			 * draw2d.geo.Rectangle.DIRECTION_DOWN =2;
			 * draw2d.geo.Rectangle.DIRECTION_LEFT =3;
			 * 
			 * @param {}
			 *            port
			 * @param {}
			 *            dx
			 * @param {}
			 *            dy
			 * @return {}
			 */
			reCaculatePostion : function(port, dx, dy, dx2, dy2) {
				var me = this, parent = port.getParent(), minX = 0, maxX = minX
						+ parent.getWidth(), minY = 0, maxY = parent
						.getHeight()
						+ minY, x = port.getX(), y = port.getY(), ox = port.ox, oy = port.oy, pos = null, direct = null, realX = 0, realY = 0;
				if (x == 0 || x == parent.getWidth()) {
					direct = me.UPDOWN;
				} else if (y == 0 || y == parent.getHeight()) {
					direct = me.LEFTRIGHT;
				}
				if (me.getSpecialPosition(port, parent, dx2, dy2)) {
					if (Math.abs(dx2) > Math.abs(dy2)) {
						direct = me.LEFTRIGHT;
					} else if (Math.abs(dx2) < Math.abs(dy2)) {
						direct = me.UPDOWN;
					}
				}
				if (!direct) {
					if (x < y) {
						if (x > maxX / 2) {
							x = maxX;
						} else {
							x = 0;
						}
					} else {
						if (y > maxY / 2) {
							y = maxY;
						} else {
							y = 0;
						}
					}
					pos = new draw2d.geo.Point(x, y);
					return pos;
				}
				switch (direct) {
					/*
					 * //当port位置位于图元的上方或者下方时,只允许该port在水平方向上左右移动移动而不允许在垂直方向上移动
					 * 也就是说只允许X坐标发生改变而不允许Y坐标发生变化
					 */

					case me.LEFTRIGHT : {
						realX = ox + dx;
						// 当port的实际X坐标大于图元的最大X坐标或者小于图元的最小X坐标时,以图元的最大/最小坐标为准
						if (realX > maxX) {
							realX = maxX;
						} else if (realX < minX) {
							realX = minX;
						}
						pos = new draw2d.geo.Point(realX, oy);
						break;
					}
						/* 当port位置位于图元的左边或者右边时,同理,只允许port在垂直方向上移动 */
					case me.UPDOWN : {
						realY = oy + dy;
						if (realY > maxY) {
							realY = maxY;
						} else if (realY < minY) {
							realY = minY;
						}
						pos = new draw2d.geo.Point(ox, realY);
						break;
					}
					default : {
						pos = new draw2d.geo.Point(ox + dx, oy + dy)
					}

				}
				return pos;
			},
			/**
			 * 获取节点的特殊位置,判断port是否位于其父图元的四个顶点上()
			 * 
			 * @param {}
			 *            port
			 * @param {}
			 *            parent
			 * @return {}
			 */
			getSpecialPosition : function(port, parent) {
				var me = this, position = false, x = port.getX(), y = port
						.getY(), width = parent.getWidth(), height = parent
						.getHeight();
				if (x == y && y == 0) {
					position = me.TOPLEFT;
				} else if (x == width && y == 0) {
					position = me.TOPRIGHT;
				} else if (x == 0 && y == height) {
					position = me.BOTTOMLEFT;
				} else if (x == width && y == height) {
					position = me.BOTTOMRIGHT;
				}
				if (position) {
					port.ox = x;
					port.oy = y;
				}
				return position;
			}

		});
/**
 * @author HeYuqing PortSelectionPolicy.js 2015年4月27日 下午2:10:42 端口选中样式
 */
draw2d.policy.port.PortSelectionPolicy = draw2d.policy.figure.SelectionFeedbackPolicy
		.extend({
					/**
					 * 类名
					 * 
					 * @type String
					 */
					NAME : "draw2d.port.figure.PortSelectionPolicy",
					/**
					 * @constructor Creates a selection feedback for a shape.
					 */
					init : function() {
						this._super();
					},

					/**
					 * @inheritdoc
					 */
					onSelect : function(canvas, figure, isPrimarySelection) {
						if (figure instanceof draw2d.Port) {
							figure.setGlow(true);
						}
					},

					/**
					 * @inheritdoc
					 */
					onUnselect : function(canvas, figure) {
						if (figure instanceof draw2d.Port) {
							figure.setGlow(false);
						}
					}

				});
/**
 * @author HeYuqing OutlineSizer.js 2015年4月8日 下午5:50:43 用来在视口中展示一个矩形框,代表当前画布中的视口
 *         参考vectorFigure的代码.因为从该图元开始,其热paint方法中添加有 "fill"属性来填充图元颜色
 */
draw2d.shape.basic.OutlineSizer = draw2d.shape.node.Node.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : " draw2d.shape.basic.OutlineSizer",

			/**
			 * @constructor Creates a new figure element which are not assigned
			 *              to any canvas.
			 * 
			 * @param {Object}
			 *            [attr] the configuration of the shape
			 */
			init : function(attr, setter, getter) {
				this.stroke = 1;
				this.radius = 0;
				this.color = new draw2d.util.Color("#303030");
				this.strokeBeforeGlow = this.stroke;
				this.glowIsActive = false;

				this._super(attr, setter, getter);
				// 保证sizer不会被选中后不会出现resize框
				this.setSelectable(false);
			},

			/**
			 * 卸载默认的编辑策略,使得sizer移动的时候不会改变透明化
			 */
			reInstallEditPolicy : function(canvas) {
				var me = this;
				me.editPolicy.each(function(i, policy) {
							me.uninstallEditPolicy(policy);
						});
				// 给sizer添加一个限制其移动范围的策略,确保整个sizer在移动过程中始终可见
				me.installEditPolicy(new draw2d.policy.figure.RegionEditPolicy(
						0, 0, canvas.getWidth(), canvas.getHeight()));
			},
			/**
			 * 在基类的基础上,重新定义sizer的策略
			 * 
			 * @param {}
			 *            canvas
			 */
			setCanvas : function(canvas) {
				this._super(canvas);
				if (canvas instanceof draw2d.Canvas) {
					this.reInstallEditPolicy(canvas);
				}
			},
			/**
			 * 调用基础库创建一个矩形框
			 * 
			 * @inheritdoc
			 */
			createShapeElement : function() {
				return this.canvas.paper.rect(this.getAbsoluteX(), this
								.getAbsoluteY(), this.getWidth(), this
								.getHeight());
			},
			/**
			 * @method 适用父类完成拖动效果,只是在位置改变后发出move事件,由画布容器监听后设置画布同步
			 * 
			 * @private
			 * @param {Number}
			 *            dx the x difference between the start of the drag drop
			 *            operation and now
			 * @param {Number}
			 *            dy the y difference between the start of the drag drop
			 *            operation and now
			 * @param {Number}
			 *            dx2 The x diff since the last call of this dragging
			 *            operation
			 * @param {Number}
			 *            dy2 The y diff since the last call of this dragging
			 *            operation
			 */
			onDrag : function(dx, dy, dx2, dy2) {
				var _this = this;
				_this._super(dx, dy, dx2, dy2);

				_this.fireEvent(Dep.framework.editor.EVENT.OUTLINE.SIZERMOVED,
						{
							x : this.x,
							y : this.y
						});
				_this.setAlpha(1);
			},
			/**
			 * @inheritdoc 基本沿用原来父类的方法,只是删除了fill属性,使得该sizer只有四条边组成,而没有内部的填充
			 * @param {}
			 *            attributes
			 */
			repaint : function(attributes) {

				if (this.repaintBlocked === true || this.shape === null) {
					return;
				}

				attributes = attributes || {};

				attributes.x = this.getAbsoluteX();
				attributes.y = this.getAbsoluteY();

				attributes = $.extend({}, {
							width : this.getWidth(),
							height : this.getHeight()
						}, attributes);

				if (this.dasharray !== null) {
					attributes["stroke-dasharray"] = this.dasharray;
				}

				if (typeof attributes.stroke === "undefined") {
					if (this.color === null || this.stroke === 0) {
						attributes.stroke = "none";
					} else {
						attributes.stroke = this.color.hash();
					}
				}

				if (typeof attributes["stroke-width"] === "undefined") {
					attributes["stroke-width"] = this.stroke;
				}

				this._super(attributes);

				return this;
			}
		});
/**
 * @author HeYuqing
 * FigureLabel.js 
 * 2015年5月4日 下午4:26:41
 * 图元名称label,在原有的基础上继承出一系列个性化的配置
 */
draw2d.shape.basic.FigureLabel = draw2d.shape.basic.Label.extend({

	/**
	 * 类名
	 * @type String
	 */
	NAME : "draw2d.shape.basic.FigureLabel",

	/**
	 * 字体选项
	 * @type 
	 */
	FONT_FALLBACK : {
		'Georgia' : 'Georgia, serif',
		'Palatino Linotype' : '"Palatino Linotype", "Book Antiqua", Palatino, serif',
		'Times New Roman' : '"Times New Roman", Times, serif',
		'Arial' : 'Arial, Helvetica, sans-serif',
		'Arial Black' : '"Arial Black", Gadget, sans-serif',
		'Comic Sans MS' : '"Comic Sans MS", cursive, sans-serif',
		'Impact' : 'Impact, Charcoal, sans-serif',
		'Lucida Sans Unicode' : '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
		'Tahoma, Geneva' : 'Tahoma, Geneva, sans-seri',
		'Trebuchet MS' : '"Trebuchet MS", Helvetica, sans-serif',
		'Verdana' : 'Verdana, Geneva, sans-serif',
		'Courier New' : '"Courier New", Courier, monospace',
		'Lucida Console' : '"Lucida Console", Monaco, monospace'
	},

	/**
	 * @constructor
	 * Creates a new text element.
	 * 
	 * @param {Object} [attr] the configuration of the shape
	 */
	init : function(name, width, height) {
		var me = this;
		me.text = name;
		// for performance reasons
		//
		if (width) {
			me.width = width;
		} else {
			me.width = 20;
		}
		if (height) {
			me.height = height;
		} else {
			me.height = 20;
		}
		//		this.fontSize=1.2;
		me._super($.extend({
							stroke : 0,
							width : me.width,
							height : me.height,
							resizeable : false
						}, {}), {}, {});
	},
	/**
	 * 计算/设置字体样式,各个子类可以继承此方法,通过不同的属性值配置出个性化的label
	 * @private
	 */
	calculateTextAttr : function() {
		var lattr = {
			"text-anchor" : "start",
			"font-size" : this.fontSize,
			"font-weight" : (this.bold === true) ? "bold" : "normal",
			fill : this.fontColor.hash(),
			stroke : this.outlineColor.hash(),
			"stroke-width" : this.outlineStroke
		};
		if (this.fontFamily !== null) {
			lattr["font-family"] = this.fontFamily;
		}
		return lattr;
	}
});
/**
 * @author HeYuqing FigureLabel.js 2015年5月4日 下午4:26:41
 *         图元名称label,在原有的基础上继承出一系列个性化的配置
 */
draw2d.shape.basic.ConnectionLabel = draw2d.shape.basic.Label.extend({

			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "draw2d.shape.basic.ConnectionLabel",

			/**
			 * @constructor Creates a new text element.
			 * 
			 * @param {Object}
			 *            [attr] the configuration of the shape
			 */
			init : function() {
				var me = this;
				me._super({
							color : "#0d0d0d", //边框色
							fontColor : "#0d0d0d",//字体颜色
							bgColor : "#ffffff" //背景色
						});
			}
		});
/**
 * @author HeYuqing
 * Image 
 * 2015年5月6日 下午2:55:09
 * 
 */
/**
 * 
 * @param {} flag
 * @return {}
 */
draw2d.shape.basic.Image.prototype.getZOrder = function(arg) {
	if (!this.zOrder) {
		draw2d.Figure.prototype.getZOrder.call(this, arg);
	} else {
		return this.zOrder;
	}
};
/**
 * 
 * @param {} order
 */
draw2d.shape.basic.Image.prototype.setZOrder = function(order) {
	this.zOrder = order;
};
/**
 * @author HeYuqing
 * node.js 
 * 2015年5月6日 下午2:55:09
 * 为了确保port的可见性跟随node,修复原生代码的bug
 */
draw2d.shape.node.Node.prototype.setVisible = function(flag) {
	if (!flag) {
		this.getPorts().each(function(i, port) {
					if (!port.__initialVisibilityState) {
						port.__initialVisibilityState = port.isVisible();
					}
					port.setVisible(false);
				});
	} else {
		this.getPorts().each(function(i, port) {
					if (typeof port.__initialVisibilityState !== "undefined") {
						port.setVisible(port.__initialVisibilityState);
						//					} else {
						//						port.setVisible(true);
					}
					delete port.__initialVisibilityState;
				});
	}
	draw2d.Figure.prototype.setVisible.call(this, flag);
};