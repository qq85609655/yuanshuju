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
 * 改变图层
 */
Dep.framework.editor.plugin.containers.layer.ChangeLayer = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.ChangeLayer",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
	},
	/**
	 * @param {plugin.Layer}
	 *            Layer 编辑器
	 */
	_initEvent : function() {
		var me = this;
		me.getContainer().regiestActions([ {
			name : "backToUpLayer",
			functionality : Ext.Function.bind(me.backToUpLayer, me),
			group : "changeLayer"
		}]);
		me.getContainer().regiestActions([ {
			name : "backToTopLayer",
			functionality : Ext.Function.bind(me.backToTopLayer, me),
			group : "changeLayer"
		}]);
	},
    /**
     * 返回上一图层
     */
    backToUpLayer :function(){
    	var me = this;
    	var layer =me.getContainer().getCurrentEditLayer();
    	
    	if(layer.type!="metadata_datamap" && layer.type!="queryLayer" && layer.type!="auditingLayer"){
    		layer.clearAll();
    		me.getContainer().showMDDetail(me.getContainer().currentEditNodeData, "metadata",1);
    	}else if(layer.type=="metadata_datamap"){
    		layer.clearAll();
    		me.getContainer().executeActionSpanContainer(me.LAYERPARAM,"backToUpDMLayer");
    	}
    },
    /**
     * 返回最上层图层
     */
    backToTopLayer :function(){
    	var me = this;
    	var layer =me.getContainer().getCurrentEditLayer();
    	if(layer.type!="metadata_datamap" && layer.type!="queryLayer" && layer.type!="auditingLayer"){
    		layer.clearAll();
    		me.getContainer().showLayer("metadata");
    	}else if(layer.type=="metadata_datamap"){
    		layer.clearAll();
    		me.getContainer().executeActionSpanContainer(me.LAYERPARAM,"backToTopDMLayer");
    	}
    	
    }
});