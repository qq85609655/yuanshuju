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
if (!Dep.framework.editor.manager) {
	Dep.framework.editor.manager = {};
}
/**
 * 容器管理器基类
 */
Dep.framework.editor.manager.ContainerManager = Dep.framework.editor.manager.BaseManager.extend({
	/**
	 * 类名
	 * @type String
	 */
	NAME : "Dep.framework.editor.manager.ContainerManager",
	/**
	 * 对象初始化方法
	 * @param {} parent
	 */
	init : function(parent) {
		this._super(parent);
	}
});