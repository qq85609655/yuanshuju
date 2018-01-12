/**
 * @author HeYuqing BaseNode.js 2015年4月22日 上午10:20:50 所有非线性图元的基类
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
if (!Dep.framework.editor.figure) {
	Dep.framework.editor.figure = {};
}
Dep.framework.editor.figure.BaseNode = draw2d.shape.basic.Image.extend({
	/**
	 * 类名
	 * 
	 * @type String
	 */
	NAME : "Dep.framework.editor.figure.BaseNode",
	// 图元状态
	DEFAULTSTATUS : "0",
	/**
	 * 是否显示编辑状态
	 */
	displayEditStatus : false,
	/**
	 * 是否显示图元的状态图标
	 */
	isShowFigureStatus : true,
	/**
	 * 状态图片默认宽高
	 */
	DEFALUTSTATUSSQUARES : 24,
	/**
	 * 是否忽略子对象的点击事件
	 */
	eventIgnoreChildren : true,
	/**
	 * 用来缓存表示当前图元状态的小图标
	 * 
	 * @type {draw2d.shape.basic.Image}
	 */
	currentStatusIcon : null,
	NAMEATT : "name",
	/**
	 * 表示上一个状态的图标
	 * 
	 * @type {draw2d.shape.basic.Image}
	 */
	oldStatusIcon : null,

	/**
	 * 默认输出端口的布局
	 */
	defaultOutputLocator : new draw2d.layout.locator.OutputPortLocator(),
	/**
	 * 默认输入端口的布局
	 */
	defaultInputLocator : new draw2d.layout.locator.InputPortLocator(),

	/**
	 * 表示状态的图标的默认布局器
	 * 
	 * @type {draw2d.layout.locator.Locator}
	 */
	DEFAULTICONLOCATOR : new draw2d.layout.locator.FigureStatusIconLocator(),
	/**
	 * 默认的label布局器
	 */
	DEFAULTLABELLOCATOR : new draw2d.layout.locator.FigureLabelLocator(),
	/**
	 * 所有业务节点集合
	 */
	bussPortList : new draw2d.util.ArrayList(),
	/**
	 * @constructor Creates a new figure element which are not assigned to any
	 *              canvas.
	 * 
	 * @param {Object}
	 *            [attr] the configuration of the shape
	 */
	init : function(attr, setter, getter) {
		var me = this, newAttr = $.extend({
					path : Dep.framework.editor.PATH
							+ "img/figure/bussNode.svg",
					width : 93,
					height : 93,
					isShowFigureStatus : true,
					displayEditStatus : false
				}, attr);
		this._super(newAttr, $.extend({
							/**
							 * @attr {Number} radius the radius to render the
							 *       line edges
							 */
							defaultInputLocator : this.setDefaultInputLocator,
							defaultOutputLocator : this.setDefaultOutputLocator,
							isShowFigureStatus : this.setIsShowFigureStatus,
							displayEditStatus : this.setIsDisplayEditStatus
							,
						}, setter), getter);
		if (newAttr && newAttr.statusSquares) {
			me.setStatusIconSquares(Number(newAttr.statusSquares));
		} else {
			me.setStatusIconSquares(me.DEFALUTSTATUSSQUARES);
		}
		if (newAttr && newAttr.isShowFigureStatus) {
			// this.currentStatusIcon = this.getEditUnCmpleteIcon();
			// this.oldStatusIcon = this.currentStatusIcon;
			// this.add(this.getEditUnCmpleteIcon(), this.getIconLocator());

		}

		// this.setStatus(this.DEFAULTSTATUS);
		// this.initDefaultPorts();
	},

	/**
	 * 默认给图元添加一个端口,用来连接无业务信息的链接
	 */
	initDefaultPorts : function() {
		this.addPort(this.getHybridPort(),
				new draw2d.layout.locator.CenterLocator());
		this.layoutPorts();
	},

	/**
	 * 获取该图元上的公共端口
	 * 
	 * @return {}
	 */
	getHybridPort : function() {
		if (!this.hybridPort) {
			this.hybridPort = new draw2d.NoBussHybridPort();
			this.hybridPort.setVisible(false);
		}
		return this.hybridPort;
	},

	/**
	 * 在图元由选中状态切换未非选中状态时,检查其是否通过校验来切换小图标表示不同的状态
	 */
	unselect : function() {
		// 调用父类方法切换其状态
		this._super();
		if (this.isVisible()) {
			// 校验模型状态来确定不同的状态
			this._validFigureStatus();

		}

	},
	/**
	 * 设置业务属性，重写父类方法，在设置用户属性时更新状态图元
	 */
	setUserData : function(rec) {
		this._super(rec);
		this._validFigureStatus();
	},
	/**
	 * 当用户更新该图元的name属性时,同步更新label显示的数据
	 */
	_asynLabelName : function() {
		var me = this, userData = me.getUserData(), name = null;
		if (!userData) {
			return;
		}
		name = userData.getBussData().get(me.NAMEATT);
		me.getLabel().setText(name);
		this.fireEvent("changeLabel", name);
	},
	/**
	 * 向图元中添加一个label
	 */
	addLabelToFigure : function(label, labelLocator) {
		var me = this;
		if (!label) {
			label = me.getLabel();
		}
		if (!labelLocator) {
			labelLocator = me.getLabelLocator();
		}
		me.add(label, labelLocator);
		me._asynLabelName();
		me.fireEvent("addlabel", {
					label : label,
					locator : labelLocator
				});
	},
	/**
	 * 校验模型的不同的状态,设置 currentStatusIcon和oldStatusIcon的值
	 * 此类应当由基类实现,基类默认提供编辑状态和编辑完成状态
	 * 
	 * @private
	 */
	_validFigureStatus : function() {
		var me = this, model = me.getUserData(), status;
		me._asynLabelName();
		if (model && model.getBussData) {
			status = model.getBussData().get(model.statusFieldName);
		} else {
			return;
		}
		me.currentStatusIcon = null;
		if (model
				&& model instanceof Dep.framework.editor.model.BaseFigureModel) {
			if (me.displayEditStatus) {
				if (model.isValid()) {// 模型检验通过,说明已编辑完成
					if (status) {// 如果有状态值，根据状态更新图标
						me.updateStatus(status);
						return;
					} else {
						me.currentStatusIcon = me.getEditCompleteIcon();
					}
				} else {// 未编辑完成
					me.currentStatusIcon = me.getEditUnCmpleteIcon();
				}
			} else {
				if (status) {
					me.updateStatus(status);
					return;
				}
			}
			// if (model.isValid() && me.displayEditStatus) {// 模型检验通过,说明已编辑完成
			// if(status){
			// me.updateStatus(status);
			// return ;
			// }else if(me.displayEditStatus){
			// me.currentStatusIcon = me.getEditCompleteIcon();
			// }
			// } else if(me.displayEditStatus){// 未编辑完成
			// me.currentStatusIcon = me.getEditUnCmpleteIcon();
			// }
			// 根据不同的状态来设置不同的图标表示
			this._changeFigureStatus();
		}
	},

	/**
	 * 
	 */
	getStatus : function() {
		return this.status;
	},
	/**
	 * 当图元有业务属性的时候,由模型(Model)调用图元的此方法更新状态,各个业务图元需要各自实现方法来完成状态更新
	 * 
	 * @param {}
	 *            status
	 */
	setStatus : function(status) {
		if (status && status == this.getStatus()) {
			return;
		}
		this.status = status;
		if (this.updateStatus) {
			this.updateStatus(status);
		}
	},
	/**
	 * 状态设置完成后,各个图元需要实现此方法来更新状态
	 * 
	 * @param {}
	 *            status
	 */
	updateStatus : function(status) {
		var me = this, model = me.getUserData(), statuEnums = null, img = "", squares = me
				.getStatusIconSquares();
		if (!model) {
			return;
		}
		statuEnums = model.statuEnums;
		if (!Ext.isArray(statuEnums)) {// 状态列表
			return;
		}
		Ext.each(statuEnums, function(obj) {
					if (obj && obj.code == status) {// 根据状态编码获取对象图标的路径
						img = obj.img;
						return false;
					}
				});
		if (!img) {
			// 状态没有设置图标，可能是业务系统不希望此状态下显示图标
			// 需要清空图标
			me.currentStatusIcon = null;
		} else {
			me.currentStatusIcon = new draw2d.shape.basic.Image({
						path : img,
						width : squares,
						height : squares
					});
		}
		me._changeFigureStatus();
	},
	/**
	 * 根据不同的状态,切换不同的图标
	 * 
	 * @private
	 */
	_changeFigureStatus : function() {
		var me = this;
		me._asynLabelName();
		if (me.oldStatusIcon) {// 删除就图片
			me.removeFigure(me.oldStatusIcon);
		}
		if (!me.currentStatusIcon) {// 新图标为空
			me.oldStatusIcon = me.currentStatusIcon;
			return;
		}
		if (me.oldStatusIcon == me.currentStatusIcon) {// 状态未发生变化,直接返回
			return;
		}
		me.currentStatusIcon.setZOrder(me.getZOrder() + 1);
		// 使用默认的图标布局,各个子类可以自定义覆盖getLocator方法来返回自定义的布局类
		if (me.isShowFigureStatus) {// 如果设置显示状态图标，显示，否则不显示
			// 设置状态图标的可见性
			me.currentStatusIcon.setVisible(me.isVisible());
			me.add(me.currentStatusIcon, me.getIconLocator());
		}
		me.relocate();
		// me.currentStatusIcon.setEditable(false);
		// 缓存icon
		me.oldStatusIcon = me.currentStatusIcon;
		// if (!me._isShowFigureStatus()) {
		// if (me.oldStatusIcon) {
		// me.removeFigure(me.oldStatusIcon);
		// }
		// return;
		// }
		// if (me.oldStatusIcon == me.currentStatusIcon) {// 状态未发生变化,直接返回
		// return;
		// } else if(me.currentStatusIcon){// 如果状态变化了,删除表示上一个状态的图标,添加表示新状态的图标
		// if (me.oldStatusIcon != null) {
		// me.removeFigure(me.oldStatusIcon);
		// }
		// // 使用默认的图标布局,各个子类可以自定义覆盖getLocator方法来返回自定义的布局类
		// me.add(me.currentStatusIcon, me.getIconLocator());
		// me.relocate();
		// // me.currentStatusIcon.setEditable(false);
		// // 缓存icon
		// me.oldStatusIcon = me.currentStatusIcon;
		// }
	},
	/**
	 * 判断是否展示图元状态
	 * 
	 * @return {}
	 */
	_isShowFigureStatus : function() {
		return this.isShowFigureStatus;
	},
	/**
	 * 设置是否展示图元状态,true为展示,false为不展示
	 * 
	 * @param {}
	 *            flag
	 */
	setIsShowFigureStatus : function(flag) {
		this.isShowFigureStatus = flag;
	},
	/**
	 * 设置是否展示图元编辑状态,true为展示,false为不展示
	 * 
	 * @param {}
	 *            flag
	 */
	setIsDisplayEditStatus : function(flag) {
		this.displayEditStatus = flag;
	},
	/**
	 * 将当前图元设置为编辑状态
	 */
	setEditingIcon : function() {
		var me = this;
		me.oldStatusIcon = me.currentStatusIcon;
		if (!me.displayEditStatus) {
			return;
		}
		me.currentStatusIcon = me.getEditingStatusIcon();
		me._changeFigureStatus();
	},
	/**
	 * 开始拖动添加一条线
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
	onAddLinkStart : function(x, y, shiftKey, ctrlKey) {
		var me = this, canvas = me.getCanvas(), model = canvas
				.getCurrentModel();
		// 获取一个临时输出端口
		if (model && model.get("isNoBussConnection") == "true") {
			me.currentOutputPort = me.getHybridPort();
		} else {
			me.currentOutputPort = me._getFreeOutputPort();
			// 将临时输出端口添加到当前图元上,注:此时临时没有按照locator的布局方式布局,而是位于鼠标点下的位置
			me.addPort(me.currentOutputPort, me.getDefaultOutputLocator());
			me.currentOutputPort.setPosition(x - me.getAbsoluteX(), y
							- me.getAbsoluteY());
		}
		me.currentOutputPort.onDragStart(x, y, shiftKey, ctrlKey);
	},
	/**
	 * 鼠标移动事件
	 * 
	 * @param {}
	 *            dx
	 * @param {}
	 *            dy
	 * @param {}
	 *            dx2
	 * @param {}
	 *            dy2
	 */
	onAddLinkDrag : function(dx, dy, dx2, dy2) {
		this.currentOutputPort.onDrag(dx, dy, dx2, dy2);
	},
	/**
	 * 将port拖动到某个节点上
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
	onAddLinkDrop : function(dropTarget, x, y, shiftKey, ctrlKey) {
		var me = this;
		// 调用此方法将临时线条从画布上移除
		me.currentOutputPort.onDragEnd(x, y, shiftKey, ctrlKey);
		if (dropTarget) {
			// 调用此方法将通过command的形式在两个节点之间添加一条连接
			me.currentOutputPort.onDrop(dropTarget, x, y, shiftKey, ctrlKey);
		}
		if (me.currentOutputPort.getConnections().getSize() == 0
				&& !(me.currentOutputPort instanceof draw2d.HybridPort)) {
			me.removePort(me.currentOutputPort);
		}

		// me.currentOutputPort = null;
		// 按照添加outputport时的布局方式经行布局
		// me.layoutPorts();
	},
	/**
	 * 获得一个未分配过的输出端口
	 * 
	 * @return {}
	 */
	_getFreeOutputPort : function() {
		var me = this;
		if (!me.currentOutputPort) {// 如果当前缓存的输出端口为空,则创建一个新的输出端口并赋给当前输出端口
			me.currentOutputPort = new draw2d.BussOutputPort();
		}
		// 如果当前输出端口的连接数大于1,则重新创建一个新的输出端口
		if (me.currentOutputPort.getConnections().getSize() >= me.currentOutputPort
				.getMaxFanOut()) {
			return new draw2d.BussOutputPort();
		} else {
			return me.currentOutputPort;
		}
	},
	/**
	 * 添加一个输入端口
	 * 
	 * @param {}
	 *            port 添加的端口实例
	 * @param {}
	 *            locator 添加端口用到的定位器
	 * @param {}
	 *            maxFanIn 此端口的最大连接数
	 */
	addBussInputPort : function(port, locator, maxFanIn) {
		var me = this;
		if (!locator) {
			locator = me.getDefaultInputLocator();
		}
		port.setLocator(locator);
		if (maxFanIn && port instanceof draw2d.BussInputPort) {
			port.setMaxFanIn(maxFanIn)
		}
		me.addPort(port, locator);
		me.layoutPorts();
		me.bussPortList.add(port);
		// port.setVisible(true);
	},
	/**
	 * 在基类的基础上,添加对port的管理
	 * 
	 * @param {}
	 *            port
	 * @param {}
	 *            locator
	 */
	addPort : function(port, locator) {
		this._super(port, locator);
		if (this.getCanvas()) {
			this.getCanvas().getGroupManager().addFigure(port.getFigureGroup(),
					port);
		}
		this.fireEvent("addport", {
					port : port,
					locator : locator
				});
	},
	/**
	 * 在基类的基础上,添加对port的管理
	 * 
	 * @param {}
	 *            port
	 * @param {}
	 *            locator
	 */
	removePort : function(port, locator) {
		this._super(port, locator);
		if (this.getCanvas()) {
			this.getCanvas().getGroupManager().removeFigure(
					port.getFigureGroup(), port);
		}
		this.fireEvent("removeport", {
					port : port,
					locator : locator
				});
	},
	/**
	 * 在基类的基础上对子icon添加显示/隐藏
	 * 
	 * @param {}
	 *            flag
	 */
	setVisible : function(flag) {
		var me = this, inputPorts = this.getInputPorts(), outputPort = me
				.getOutputPorts();
		me._super(flag);
		me.children.each(function(n, obj) {
					if (obj && obj.figure
							&& !(obj.figure instanceof draw2d.Port)) {
						obj.figure.setVisible(flag);
					}
				});
		inputPorts.addAll(outputPort).each(function(n, port) {
					port.getConnections().each(function(k, conn) {
								conn.setVisible(flag);
							})
				});
	},
	/**
	 * 生成表示图元处于编辑状态的图标
	 * 
	 * @return {draw2d.shape.basic.Image}
	 */
	getEditingStatusIcon : function() {
		var me = this, squares = me.getStatusIconSquares();
		if (!me.editingIcon) {
			me.editingIcon = new draw2d.shape.basic.Image({
						path : Dep.framework.editor.PATH
								+ "img/figure/editing.svg",
						width : squares,
						height : squares
					});
		}
		return me.editingIcon;
	},
	/**
	 * 生成表示图元编辑完成的图标
	 * 
	 * @return {draw2d.shape.basic.Image}
	 */
	getEditCompleteIcon : function() {
		var me = this, squares = me.getStatusIconSquares();
		if (!me.editedIcon) {
			me.editedIcon = new draw2d.shape.basic.Image({
						path : Dep.framework.editor.PATH
								+ "img/figure/edited.svg",
						width : squares,
						height : squares
					});
		}
		return me.editedIcon;
	},
	/**
	 * 生成表示图元未编辑完成的图标
	 * 
	 * @return {draw2d.shape.basic.Image}
	 */
	getEditUnCmpleteIcon : function() {
		var me = this, squares = me.getStatusIconSquares();
		if (!me.unEditedIcon) {
			me.unEditedIcon = new draw2d.shape.basic.Image({
						path : Dep.framework.editor.PATH
								+ "img/figure/unEdited.svg",
						width : squares,
						height : squares
					});
		}
		return me.unEditedIcon;
	},
	/**
	 * 返回表示状态的图标在图元的布局类
	 * 
	 * @returns {draw2d.layout.locator.Locator}
	 */
	getIconLocator : function() {
		if (this.DEFAULTICONLOCATOR) {
			return this.DEFAULTICONLOCATOR;
		} else {
			throw "默认布局器未设置";
		}
	},
	/**
	 * 获取展示图元信息的label对象
	 * 
	 * @returns {draw2d.shape.basic.FigureLabel|*}
	 */
	getLabel : function() {
		var me = this, userData = null, name = null;
		if (!me.label) {
			// userData = me.getUserData();
			// name = userData.getBussData().get("name");
			me.label = new draw2d.shape.basic.FigureLabel("", 5, 5);
			// me.label.setText(name);
		}
		return me.label;
	},
	/**
	 * 
	 * @param {}
	 *            percent
	 */
	setAlpha : function(percent) {
		this._super(percent);
		if (this.currentStatusIcon) {
			this.currentStatusIcon.setAlpha(percent);
		}
	},
	/**
	 * 调用此方法时,确保其下标在 该图元上方
	 * 
	 * @param {}
	 *            figure
	 */
	toFront : function(figure) {
		this._super(figure);
		if (this.currentStatusIcon && this.currentStatusIcon.shape) {
			this.currentStatusIcon.toFront(this);
		}
	},
	/**
	 * 重现此方法来判断图元是否可删除,如果可以删除,返回空字符串,否则返回提示信息
	 * 各子类根据需求重新此方法,如果图元可删除,返回空字符串,如果不可删除,返回不可删除的提示信息
	 * 
	 * @return {String}
	 */
	isDeleteable : function() {
		var me = this, msg = "";
		this.getPorts().each(function(n, port) {
					// 如果该节点的任一各port上有链接,则认为改节点有链接,即不允许删除
					if (port.getConnections().getSize() > 0) {
						// 修改标志位
						msg = Dep.framework.editor.I18N.NODE.CANNOTDELETE
						// 结束循环
						return false;
					}
				});
		return msg;
	},
	/**
	 * 获取图元label的布局器
	 * 
	 * @return {}
	 */
	getLabelLocator : function() {
		if (this.DEFAULTLABELLOCATOR) {
			return this.DEFAULTLABELLOCATOR;
		} else {
			throw "默认布局器未设置";
		}
	},
	/**
	 * 返回该节点的业务节点集合
	 * 
	 * @return {}
	 */
	getBussPortList : function() {
		return this.bussPortList;
	},
	/**
	 * 获取该节点的上游节点,也可以理解为该节点在树形结构中的父节点
	 * 
	 * @return {draw2d.util.ArrayList}
	 */
	getUpstreamNodes : function() {
		var me = this, inputPorts = this.getInputPorts(), /*
															 * hybridPort = this
															 * .getHybridPort(),
															 */upstreamNode = null, upstreamNodes = new draw2d.util.ArrayList();
		inputPorts.each(function(n, port) {
					port.getConnections().each(function(k, conn) {
								upstreamNode = conn.getSourceNode();
								if (upstreamNode != me) {
									upstreamNodes.add(upstreamNode);
								}
							})
				});
		return upstreamNodes;
	},
	/**
	 * 图元保存成功后的回调,由各个子图元自己实现
	 * 
	 * @type
	 */
	onFigureSaved : Ext.emptyFn,
	/**
	 * 获取该节点的下游节点,也可以理解为树形结构的子节点
	 * 
	 * @return {draw2d.util.ArrayList}
	 */
	getDownstreamNodes : function() {
		var me = this, outputPort = this.getOutputPorts(), downstreamNode = null, downstreamNodes = new draw2d.util.ArrayList();
		outputPort.each(function(n, port) {
					port.getConnections().each(function(k, conn) {
								downstreamNode = conn.getTargetNode();
								if (downstreamNode != me) {
									downstreamNodes.add(downstreamNode);
								}
							})
				});
		return downstreamNodes;
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
			visible : this.isVisible()
			// path : this.path
		};
		return memento;
	},
	/**
	 * 设置默认的输入端口布局类
	 * 
	 * @param {}
	 *            locator
	 */
	setDefaultInputLocator : function(locator) {
		var me = this, locatorName = null;
		if (typeof locator == 'string') {
			locatorName = eval(locator);
			locator = new locatorName();
		};
	},
	/**
	 * 
	 * @param {}
	 *            locator
	 * @return {}
	 */
	getDefaultInputLocator : function(locator) {
		return this.defaultInputLocator;
	},
	/**
	 * 设置默认的输出端口布局器
	 */
	setDefaultOutputLocator : function(locator) {
		var me = this, locatorName = null;
		if (typeof locator == 'string') {
			locatorName = eval(locator);
			locator = new locatorName();
		}
		this.defaultOutputLocator = locator;
	},
	/**
	 * 
	 * @return {}
	 */
	getDefaultOutputLocator : function() {
		return this.defaultOutputLocator;
	},
	/**
	 * 
	 * @return {}
	 */
	getName : function() {
		var me = this, userData = me.getUserData(), name = null;
		if (!userData) {
			name = "error,无法获取图元名称";
		} else {
			name = userData.getBussData().get(me.NAMEATT);
		}
		return name;
	},
	isBaseNode : function() {
		return true;
	},
	/**
	 * 设置表示图元状态的小图标大小
	 * 
	 * @param {}
	 *            squ
	 */
	setStatusIconSquares : function(squ) {
		this.statusIconSqu = squ;
	},
	/**
	 * 获取表示图元状态的小图标大小
	 * 
	 * @return {}
	 */
	getStatusIconSquares : function() {
		return this.statusIconSqu;
	},
	/**
	 * 
	 * @return {}
	 */
	getFType : function() {
		var fType = null, model = this.getUserData();
		if (model && model.getFType) {
			fType = model.getFType();
		}
		return fType;
	}

});