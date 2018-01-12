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
/**
 * 各自模块可以根据需求实现图层类，但是需要在编辑器配置文件中引入对应的配置文件。
 */
Dep.framework.editor.plugin.containers.Layer = Dep.framework.editor.plugin.containers.BaseLayer.extend({
	NAME : "Dep.framework.editor.plugin.containers.Layer",

});
