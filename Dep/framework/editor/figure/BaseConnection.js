/**
 * @author HeYuqing BaseConnection.js 2015年4月22日 上午10:21:06 所有线性图元的基类
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
if (!Dep.framework.editor.figure) {
	Dep.framework.editor.figure = {};
}
Dep.framework.editor.figure.BaseConnection = draw2d.Connection.extend({
	/**
	 * 类名
	 * 
	 * @type String
	 */
	NAME : "Dep.framework.editor.figure.BaseConnection",
	/**
	 * 默认路由方式
	 */
	DEFAULTROUTER : new draw2d.layout.connection.InteractiveManhattanBridgedConnectionRouter(),
	/**
	 * 默认的连线末端的装饰
	 */
	DEFAULTTARGETDECORATOR : new draw2d.decoration.connection.ArrowDecorator(),
	/**
	 * 默认连线源点的装饰
	 */
	DEFAULTSOURCEDECORATOR : new draw2d.decoration.connection.DiamondDecorator(),
	// 图元状态
	DEFAULTSTATUS : "111",
	NAMEATT: "name",
	/**
	 * 默认的标题布局器
	 */
	DEFAULTLABELLOCATOR : new draw2d.layout.locator.ManhattanMidpointLocator(),
	/**
	 * 对象初始化方法
	 * 
	 * @param {}
	 *            attr
	 * @param {}
	 *            setter
	 * @param {}
	 *            getter
	 */
	init : function(attr, setter, getter) {
		this._super($.extend({
							router : this.DEFAULTROUTER
						}, attr), $.extend({
							targetDecDemension : this.setTargetDecoratorDimension,
							sourceDecDemension : this.setSourceDecoratorDimension
						}, setter), getter);
		this.installEditPolicy(new draw2d.policy.line.LineDragDropPolicy());
		if (attr && attr.displayLabel == "true" && attr.name) {
			this.addLabelToFigure(/* null,null,true */);
			this._asynLabelName(attr.name);
		}
		this.setStatus(this.DEFAULTSTATUS);
	},
	/**
	 * 设置链接对象的可见性,在父类的基础上添加对其装饰物的管理
	 * 
	 * @param {}
	 *            flag
	 */
	setVisible : function(flag) {
		this._super(flag);
		// 如果存在源节点装饰物,根据设置的确定装饰物的展示与否
		if (this.sourceDecoratorNode) {
			if (flag) {
				this.sourceDecoratorNode.show();
			} else {
				this.sourceDecoratorNode.hide();
			}
		}
		// 如果存在目的节点装饰物,根据设置的确定装饰物的展示与否
		if (this.targetDecoratorNode) {
			if (flag) {
				this.targetDecoratorNode.show();
			} else {
				this.targetDecoratorNode.hide();
			}
		}
		this.children.each(function(n, obj) {
					if (obj && obj.figure
							&& !(obj.figure instanceof draw2d.Port) /*
																	 * &&
																	 * !(obj.figure
																	 * instanceof
																	 * draw2d.shape.basic.Label)
																	 */) {
						obj.figure.setVisible(flag);
					}
				});
	},
	/**
	 * 当用户更新该图元的name属性时,同步更新label显示的数据
	 */
	_asynLabelName : function(name) {
		var me = this, userData = me.getUserData(), labelName = null;
		if (name) {
			labelName = name;
		} else if (userData && userData.getBussData) {
			labelName = userData.getBussData().get(me.NAMEATT);
		}
		if (!labelName) {
			// me.remove(me.getLabel());
			// me.getLabel().setVisible(false);
			return;
		}
		// me.add(me.getLabel(), me.getLabelLocator());
		me.getLabel().setText(labelName);
		this.fireEvent("changeLabel", labelName);
		// me.getLabel().setVisible(true);
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
		// me._asynLabelName();
		me.fireEvent("addlabel", {
					label : label,
					locator : labelLocator
				});
	},
	/**
	 * 获取展示图元信息的label对象
	 * 
	 * @returns {draw2d.shape.basic.FigureLabel|*}
	 */
	getLabel : function() {
		var me = this;
		if (!me.label) {
			me.label = new draw2d.shape.basic.ConnectionLabel("", 5, 5);
		}
		return me.label;
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
	 * 各子类根据需求重新此方法,如果图元可删除,返回空字符串,如果不可删除,返回不可删除的提示信息
	 * 
	 * @return {String}
	 */
	isDeleteable : function() {
		return "";
	},
	/**
	 * 设置目的端的装饰大小
	 * 
	 * @param {}
	 *            array
	 */
	setTargetDecoratorDimension : function(array) {
		var me = this, width = null, height = null, dec = null;
		if (Ext.isArray(array) && array.length >= 2) {
			width = array[0];
			height = array[1];
		}
		dec = me.getTargetDecorator()
				? me.getTargetDecorator()
				: me.DEFAULTTARGETDECORATOR;
		dec.setDimension(width, height);
	},
	/**
	 * 设置源端的装饰大小
	 * 
	 * @param {}
	 *            array
	 */
	setSourceDecoratorDimension : function(array) {
		var me = this, width = null, height = null, dec = null;
		if (Ext.isArray(array) && array.length >= 2) {
			width = array[0];
			height = array[1];
		}
		dec = me.getSourceDecorator()
				? me.getSourceDecorator()
				: me.DEFAULTSOURCEDECORATOR;
		dec.setDimension(width, height);
	},
	/**
	 * 获取持久化对象
	 */
	getPersistentAttributes : function() {
		var memento = {
			shape : this.NAME,
			id : this.id,
			alpha : this.alpha,
			visible : this.isVisible(),
			vertices : this.getVertices(),
			// 缓存此数据以备复原
			svgPathString : this.svgPathString,
			srcNodeId : this.getSourceNode()
					? this.getSourceNode().getId()
					: "",
			targetPortId : this.getTarget() ? this.getTarget().getId() : "",
			targetNodeId : this.getTargetNode()
					? this.getTargetNode().getId()
					: ""
		};
		return memento;
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
	/**
	 * 图元保存成功后的回调,由各个子图元自己实现
	 * 
	 * @type
	 */
	onFigureSaved : Ext.emptyFn,
	/**
	 * 
	 */
	setPersistentAttributes : function() {

	},
	/**
	 * 
	 */
	getStatus : function() {
		return this.status;
	},
	setStatus : function(status) {
		this.status = status;
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
