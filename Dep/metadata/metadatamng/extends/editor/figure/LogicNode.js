/**
 * @author HeYuqing LogicNode.js 2015年4月27日 下午6:05:42 TODO
 */
if (!window.JHE) {
	window.JHE = {};
}
if (!JHE.figure) {
	JHE.figure = {};
}
if (!JHE.figure.basic) {
	JHE.figure.basic = {};
}
JHE.figure.basic.LogicNode = Dep.framework.editor.figure.BaseNode.extend({
	NAME : "JHE.figure.basic.LogicNode",
	/**
	 * 默认输出端口的布局
	 */
	defaultOutputLocator : new draw2d.layout.locator.OutputPortLocator(),
	/**
	 * 默认输入端口的布局
	 */
	defaultInputLocator : new draw2d.layout.locator.InputPortLocator(),
	/**
	 * @constructor Creates a new figure element which are not assigned
	 *              to any canvas.
	 * 
	 * @param {Object}
	 *            [attr] the configuration of the shape
	 */
	init : function(attr, setter, getter) {
		this._super(attr, setter, getter);
	},
	/**
	 * 开始拖动添加一条线
	 * @param {} x
	 * @param {} y
	 * @param {} shiftKey
	 * @param {} ctrlKey
	 *//*
	onAddLinkStart : function(x, y, shiftKey, ctrlKey) {
		var me = this;
		//获取一个临时输出端口
		me.currentOutputPort = me._getFreeOutputPort();
		//将临时输出端口添加到当前图元上,注:此时临时没有按照locator的布局方式布局,而是位于鼠标点下的位置
		me.addPort(me.currentOutputPort, me.defaultOutputLocator);
		me.currentOutputPort.onDragStart(x, y, shiftKey, ctrlKey);
	},
	*//**
	 * 鼠标移动事件
	 * @param {} dx
	 * @param {} dy
	 * @param {} dx2
	 * @param {} dy2
	 *//*
	onAddLinkDrag : function(dx, dy, dx2, dy2) {
		this.currentOutputPort.onDrag(dx, dy, dx2, dy2);
	},
	*//**
	 * 将port拖动到某个节点上
	 * @param {} dropTarget
	 * @param {} x
	 * @param {} y
	 * @param {} shiftKey
	 * @param {} ctrlKey
	 *//*
	onAddLinkDrop : function(dropTarget, x, y, shiftKey, ctrlKey) {
		var me = this;
		//调用此方法将临时线条从画布上移除
		me.currentOutputPort.onDragEnd(x, y, shiftKey, ctrlKey);
		if (dropTarget) {
			//调用此方法将通过command的形式在两个节点之间添加一条连接
			me.currentOutputPort.onDrop(dropTarget, x, y, shiftKey, ctrlKey);
		}
		if (me.currentOutputPort.getConnections().getSize() == 0) {
			me.removePort(me.currentOutputPort);
		}

		//					me.currentOutputPort = null;
		//按照添加outputport时的布局方式经行布局
		//				me.layoutPorts();
	},
	*//**
	 * 获得一个未分配过的输出端口
	 * @return {}
	 *//*
	_getFreeOutputPort : function() {
		var me = this;
		if (!me.currentOutputPort) {//如果当前缓存的输出端口为空,则创建一个新的输出端口并赋给当前输出端口
			me.currentOutputPort = new draw2d.BussOutputPort();
		}
		//如果当前输出端口的连接数大于1,则重新创建一个新的输出端口
		if (me.currentOutputPort.getConnections().getSize() >= me.currentOutputPort
				.getMaxFanOut()) {
			return new draw2d.BussOutputPort();
		} else {
			return me.currentOutputPort;
		}
	},
	*//**
	 * 添加一个输入端口
	 * 
	 * @param {}
	 *            port 添加的端口实例
	 * @param {}
	 *            locator 添加端口用到的定位器
	 * @param {}
	 *            maxFanIn 此端口的最大连接数
	 *//*
	addBussInputPort : function(port, locator, maxFanIn) {
		var me = this;
		if (!locator) {
			locator = me.defaultInputLocator;
		}
		port.setLocator(locator);
		if (maxFanIn && port instanceof draw2d.BussInputPort) {
			port.setMaxFanIn(maxFanIn)
		}
		me.addPort(port, locator);
		me.layoutPorts();
		//				port.setVisible(true);
	},
	*//**
	 * 在基类的基础上,添加对port的管理
	 * @param {} port
	 * @param {} locator
	 *//*
	addPort : function(port, locator) {
		this._super(port, locator);
		if (this.getCanvas()) {
			this.getCanvas().getFigureManager().addFigure(port);
		}
		this.fireEvent("addport", {
					port : port,
					locator : locator
				});
	},
	*//**
	 * 在基类的基础上,添加对port的管理
	 * @param {} port
	 * @param {} locator
	 *//*
	removePort : function(port, locator) {
		this._super(port, locator);
		if (this.getCanvas()) {
			this.getCanvas().getFigureManager().removeFigure(port);
		}
		this.fireEvent("removeport", {
					port : port,
					locator : locator
				});
	},*/
	/**
	 * 
	 * @param {}
	 *            x
	 * @param {}
	 *            y
	 */
	onMouseEnter : function(x, y) {
		//				if (this.showingTips) {
		//					return;
		//				}
		//				this.showingTips = true;
		//				this.getTextShape().showAt([x, y]);
	},

	onMouseLeave : function() {
		//				this.showingTips = false;
		//				this.getTextShape().hide(true);
	},
	onMouseMove : function(x, y) {
		// this.getTextShape().showAt([x, y]);
	},
	getTextShape : function() {
		var me = this;
		if (me.textShape) {
			return me.textShape;
		} else {
			// this.textShape= new
			// draw2d.shape.basic.Text({text:"这里可以放一些\n图元的名称啊之类\n的属性信息"});
			me.textShape = Ext.create('Ext.tip.Tip', {
						html : "图元工具箱",
						// style:"padding:2px 5px; border:1px solid
						// #767676;" +
						// "border-radius:3px; background:url(bg(1).jpg)
						// repeat; "+
						// "display:inline-block",
						width : me.getWidth()
					});
			// this.getCanvas().add(this.textShape);
			// this.textShape.setVisible(false);
		}
	},
	onDoubleClick : function(){
//		var me = this,canvas = eval("JHE.plugin.Canvas");
//		canvas.raiseEvent('dblClickFigureAddLayer',me);
	}
});