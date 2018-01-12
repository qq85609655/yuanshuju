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
/**
 * 容器插件基类
 */
Dep.framework.editor.plugin.ContainerPlugin = Dep.framework.editor.base.BasePluginContainer.extend({
	NAME : "Dep.framework.editor.plugin.ContainerPlugin",
	/**
	 * 初始化日志类
	 */
	logger : log4javascript
			.getDefaultLogger("Dep.framework.editor.plugin.ContainerPlugin"),
	/**
	 * 
	 */
	init: function(parent,pluginData){
		this._super(parent,pluginData);
	},
	/**
	 * 获取当前容器的主界面
	 */
	setContainerPanel : function(containerPanel){
		this.containerPanel = containerPanel;
	},
	/**
	 * 获取当前容器的主界面，框架将调用此接口注册键盘事件监听，如果不希望监听键盘事件，不要设置属性值。
	 */
	getContainerPanel : function(){
		var me = this;
		if(!me.containerPanel){
			me.logger.info(me.NAME + "没有设置容器panel");
		}
		return me.containerPanel;
	}
	
});