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
JHE.figure.basic.LetterTypeNode = Dep.framework.editor.figure.BaseNode.extend({
	NAME : "JHE.figure.basic.LetterTypeNode",
	/**
	 * 默认输出端口的布局
	 */
	defaultOutputLocator : new draw2d.layout.locator.OutputPortLocator(),
	/**
	 * 默认输入端口的布局
	 */
	defaultInputLocator : new draw2d.layout.locator.InputPortLocator(),
	/**
	 * 默认给图元添加一个端口,用来连接无业务信息的链接
	 */
	initDefaultPorts : function() {
		this.addPort(this.getHybridPort(),
				new draw2d.layout.locator.OutputPortLocator());
		this.addPort(this.getHybridPort(),
				new draw2d.layout.locator.InputPortLocator());
		this.layoutPorts();
	},
});