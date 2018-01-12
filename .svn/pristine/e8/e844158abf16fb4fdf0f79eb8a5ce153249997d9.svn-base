/**
 * @author HeYuqing NoBussConnection.js 2015年5月8日 上午10:03:30 表示没有业务含义的链接
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
Dep.framework.editor.figure.NoBussConnection = Dep.framework.editor.figure.BaseConnection
		.extend({
			/**
			 * 类名
			 * 
			 * @type String
			 */
			NAME : "Dep.framework.editor.figure.NoBussConnection",
			/**
			 * 参见父类
			 */
			DEFAULTROUTER : new draw2d.layout.connection.DirectRouter(),
			/**
			 * 参见父类
			 */
			DEFAULTTARGETDECORATOR : new draw2d.decoration.connection.ArrowDecorator(),
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
								}, attr), setter, getter);
			},
			/**
			 * 所有计算路由形式的router中都会获取线性图元的两个位置,即起点和终点坐标.
			 * 原来的代码中获取的是线性图元两端的port的绝对位置, 这里获取的是由两个端点连线与两个Node边框的交点.
			 * 从而实现当node移动的时候,其与线性图元的交点是动态变化的
			 * 
			 * @return {}
			 */
			getStartPoint : function() {
				var me = this, node = me.getSourceNode();
				return this.getBoundingPoint(node);
			},
			/**
			 * 参见 getStartPoint
			 * 
			 * @return {}
			 */
			getEndPoint : function() {
				var me = this, node = me.getTargetNode();
				return this.getBoundingPoint(node);
			},
			getPersistentAttributes : function() {
				var memento = {
					shape : this.NAME,
					id : this.id,
					alpha : this.alpha,
					visible : this.isVisible(),
					vertices : this.getVertices(),
					// 缓存此数据以备复原
					svgPathString : this.svgPathString,
					srcNodeId : this.getSourceNode() ? this.getSourceNode()
							.getId() : "",
					targetNodeId : this.getTargetNode() ? this.getTargetNode()
							.getId() : ""
				};
				return memento;
			},
			/**
			 * 因为该图元无业务含义,自然也就没有其归属的图层,这里默认获取该线源节点的图层作为其图层
			 * 
			 * @return {}
			 */
			getFigureGroup : function() {
				var me = this, sourceNode = me.getSourceNode();
				return sourceNode.getFigureGroup();
			}
		});