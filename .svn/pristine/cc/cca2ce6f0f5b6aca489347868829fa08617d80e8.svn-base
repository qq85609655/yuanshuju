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
 * 展示图元菜单, 根据选中图元的菜单配置信息来展示其菜单
 */
Dep.framework.editor.plugin.containers.canvas.OutlinePlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.OutlinePlugin",
	/**
	 * 缩放因子,用来标识视口是在画布的基础上缩放多少后的结果
	 * @type Number
	 */
	SCALES : 10,
	/**
	 * 初始化视口插件
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container)
		me.relateCanvas = container.getCanvas();
		//创建outline依赖的窗口(div)
		me.createOutLinePanel(container);
		me.outline = new Dep.framework.editor.base.CanvasOutline(me.getOutlineWin(), me.relateCanvas,
				me.SCALES);
		container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent.bind(me));
	},
	/**
	 * 在画布的基础上添加一层窗口,来展示视口
	 * 
	 * @param canvas
	 */
	createOutLinePanel : function(container) {
		var me = this, canvasHeight = me.getRelateCanvas().getHeight(), canvasWidth = me
				.getRelateCanvas().getWidth(), outlineWinWidth, outlineWinHeight;
		if (!canvasHeight || !canvasWidth) {
			throw "画布宽高设置不合理";
			return false;
		}
		outlineWinWidth = Number(canvasWidth / me.SCALES);
		outlineWinHeight = Number(canvasHeight / me.SCALES);
		me.outlineWin = Ext.create('Ext.window.Window', {
					draggable : true,
					header : false,
					resizable : false,
					height :  outlineWinHeight ,
					width :  outlineWinWidth ,
					layout : 'fit'
				});
		/*me.miniBtn = Ext.create('Ext.Img', {
					alt : "",
					autoShow : true,
					width : '16px',
					height : '16px',
					floating : true,
					src : Dep.framework.editor.PATH + "img/canvas/outLine.png"
				});*/
		me.outlineWin.show();
		me.rePositionPanel(me.getParentPanel(),/* me.miniBtn,*/me.outlineWin);
	},

	/**
	 * 当画布所在的窗口形状发生变化时,确保视口窗口和miniBtn跟随进行移动
	 * @param {} parentPanel 画布所在窗口
	 * @param {} subPanel   需要跟随移动的窗口
	 * @param {} extendPanel 用来辅助计算的窗口,主要用来在重新定位miniBtn的时候使用.
	 * 这个参数是为了防止当所有其他窗口都折叠,画布窗口占满浏览器时,Btn按钮位于页面最右下角,这个时候鼠标无法向右下方移动了
	 */
	rePositionPanel : function(parentPanel, subPanel, extendPanel) {
		var me = this, parentWidth = parentPanel.getWidth(), parentHeight = parentPanel
				.getHeight(), subWidth = extendPanel
				? extendPanel.getWidth()
				: subPanel.getWidth(), subHeight = extendPanel ? extendPanel
				.getHeight() : subPanel.getHeight(), parentPanelPosition = parentPanel
				.getPosition(), scrollBarWidth = me.getScrollBarHW();
		// 首先获取到容器窗口的绝对坐标位置,即其左上角的位置,然后减去长宽得出右下角,再减去outline的长宽得出其相对位置
		subPanel.setPosition(parentPanelPosition[0] + parentWidth - subWidth
						/*- scrollBarWidth*/, parentPanelPosition[1] + parentHeight
						- subHeight /*- scrollBarWidth*/);
	},

	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */
	initEvent : function(editor) {
		var me = this;
		me.getContainer().regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE,
				function(/*evnetSouce, */panel) {
					/*//每次画布依赖的panel变化时,画布上跟随展示的miniBtn也跟随移动位置,
					但是视口所在的窗口暂时不会移动位置,只有在鼠标单击该btn的时候,才会先重新计算sizer的形状和位置,
					然后再将视口的位置动态的移动画布panel最右下方.*/
					me.rePositionPanel(panel, /*me.getMiniButton(),*/me.getOutlineWin());
			}, me);
		me.getContainer().getEditor().getParentPanel().on("deactivate",function(){
//			me.getMiniButton().hide()
            me.getOutlineWin().hide();
		});
		me.getContainer().getEditor().getParentPanel().on("activate",function(){
//			me.getMiniButton().show()
//			me.getOutlineWin().show();
		});
		me.getParentPanel().fireEvent('resize', me.getParentPanel());
		me.getRelateCanvas().on('canvas_move',function(evnetSouce, args) {
							me.getOutline().rePositionSizer();
						});
		
		/*me.getMiniButton().getEl().on('mousedown', function(e) {
			       //调用视口类的接口,准备开始移动sizer
			        me.getOutline().sizeMoveStart(e,me.getParentPanel());
			        //将视口类所依赖的win窗口定位到画布的最右下方
					me.rePositionPanel(me.getParentPanel(), me.getOutlineWin());
					//弹出视口所在的窗口
					me.getOutlineWin().show();
				});*/
				
	   me.getContainer().regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.SHOWHIDEOUTLINE, function() {
					var outLineWin = me.getOutlineWin(), isVisible = outLineWin
							.isVisible();
					if (isVisible) {
						outLineWin.hide();
					} else {
						outLineWin.show();
					}
				});
				 me.getOutlineWin().hide();
	},
	
	/**
	 * 获取视口所在的窗口
	 * 
	 * @return {}
	 */
	getOutlineWin : function() {
		if (this.outlineWin) {
			return this.outlineWin;
		} else {
			throw "视口所在的窗口未创建";
		}
	},
	/**
	 * 获取视口管理的画布
	 */
	getRelateCanvas : function() {
		if (this.relateCanvas) {
			return this.relateCanvas;
		} else {
			throw "未指定视口关联的画布";
		}
	},
	/**
	 * 获取视口组件
	 * @returns {Dep.framework.editor.base.CanvasOutline|*}
	 */
	getOutline : function() {
		if (this.outline) {
			return this.outline;
		} else {
			throw "视口未初始化";
		}
	},
	/**
	 * 获取视口需要依赖定位的panel
	 * @return {}
	 */
	getParentPanel : function() {
		return this.getContainer().getCanvasPanel();
	},
	/**
	 * 获取代表视图的迷你按钮
	 * @return {}
	 */
	getMiniButton : function() {
		if (this.miniBtn) {
			return this.miniBtn
		} else {
			throw "迷你图片按钮未创建";
		}
	},
	/**
	 * 获取浏览器的宽度
	 * @return {Number} 浏览器的宽度
	 */
	getScrollBarHW : function() {  
		if (this.scrollBarHW) {
			return this.scrollBarHW.width;
		}
		var div = document.createElement('div');
		div.style.overflow = 'scroll';
		div.style.visibility = 'hidden';
		div.style.position = 'absolute';
		div.style.width = '100px';
		div.style.height = '100px';
		//div.style.cssText = 'overflow:scroll;width:100px;height:100px;';
		document.body.appendChild(div);

		this.scrollBarHW = {
			width : div.offsetWidth - div.clientWidth,
			height : div.offsetHeight - div.clientHeight
		};
		div.parentNode.removeChild(div);

		return this.scrollBarHW.width;
	}

});