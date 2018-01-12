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
 * 创建子元数据
 */
Dep.framework.editor.plugin.containers.layer.CreateSubMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.CreateSubMetadata",
	
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
			name : "addSubMD",
			functionality : Ext.Function.bind(me.addSubMD, me),
			group : "addSubMD"
		}]);
	},
    /**
     * 添加子元数据
     * @param metamodel
     * @param id
     */
    addSubMD : function(mmId,figure,id){
    	var me = this,win = me.getContainer().getMdBaseInfoWin();
    	var props =me.getContainer().getMMProps(mmId);
        win.setWinType(true);
        win.show();
        var data ={mmId : mmId};
        win.setValues(data);
        win.setParentMDId(id);
    }
});