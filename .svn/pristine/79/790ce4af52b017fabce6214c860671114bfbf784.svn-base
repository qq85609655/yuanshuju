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
if (!Dep.framework.editor.plugin.containers.layer) {
	Dep.framework.editor.plugin.containers.layer = {};
}

/**
 *  进入依赖管理图层
 */
Dep.framework.editor.plugin.containers.layer.ChangeToDependLayer = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.ChangeToDependLayer",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
	},
	_initEvent : function() {
		var me = this;
		me.getContainer().regiestActions([ {
			name : "toDependLayer",
			functionality : Ext.Function.bind(me.dependMng, me),
			group : "toDependLayer"
		}]);
	},
	   /**
     * 依赖管理
     */
    dependMng :function(laycfg){
    	var me = this;
    	me.getContainer().setCurrentLayerFlag("metadata_depend");
    	me.getContainer().loadDependMds();
    }
});