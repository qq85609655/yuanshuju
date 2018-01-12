/**
 * @author HeYuqing
 * TestFigureStatus.js 
 * 2015年4月22日 上午10:30:00
 * 这个类用来模拟测试图元状态切换
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
Dep.framework.editor.figure.TestFigureStatus =  Dep.framework.editor.figure.BaseNode.extend({
    NAME : "Dep.framework.editor.figure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
//    	attr.path = Dep.framework.editor.PATH + "img/figure/logicNode.svg";
//    	attr.width=93;
//    	attr.height=93;
        this._super({ path: Dep.framework.editor.PATH + "img/figure/bussNode.svg",
    	 width:93,
    	 height:93 }, setter, getter);
        
    }
    
});