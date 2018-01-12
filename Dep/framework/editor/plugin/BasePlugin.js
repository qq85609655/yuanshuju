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
 * 插件基类
 */
Dep.framework.editor.plugin.BasePlugin = Class.extend({
	/**
	 * 插件名称
	 */
	NAME:"Dep.framework.editor.plugin.BasePlugin",
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.plugin.BasePlugin"),
	/**
	 * 初始化对象
	 */
	init: function(container){
		this.container = container;
	},
	getClassName:function (){
		return this.NAME;
	},
    /**
     * 获取子插件所属的容器
     * @return {*}
     */
    getContainer : function(){
        return this.container;

    },
    /**
     * 设置插件的容器
     * @param container
     */
    setContainer : function(container){
        this.container=container;
    },
    /**
     * 获取插件所属编辑器
     * @return 返回插件所属编辑器
     */
    getEditor : function(){
    	if (this.getContainer()) {
    		return this.getContainer().getEditor();
    	}
    	return null;
    }
});