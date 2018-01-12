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
 * 元数据审核操作
 */
Dep.framework.editor.plugin.containers.layer.AuditMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.AuditMetadata",
	
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
			name : "showAuditMetadataWin",
			functionality : Ext.Function.bind(me.showAuditMetadataWin, me),
			group : "auditMD"
		}]);
		me.getContainer().regiestActions([ {
			name : "auditMetadata",
			functionality : Ext.Function.bind(me.auditMetadata, me),
			group : "auditMD"
		}]);
	},
    /**
     * 审核元数据
     * @param id  元数据id
     */
	showAuditMetadataWin: function (id) {
        var me = this;
        var win =me.getContainer().buildMDAuditingWin();
        win.show();
        win.setValues(id);
    },
    /**
     * 审核元数据
     * @param id  元数据Id
     */
    auditMetadata : function(obj){
    	var me= this,win =me.getContainer().buildMDAuditingWin(),auditPanel = me.getContainer().bulidMDAuditingPanel();
    	Fn.Request(Dep.metadata.url.metadatamng.auditingMetadata, true, obj,"操作失败",function(result){
            if (result) {
                if (result.resultCode === 1) {
                	win.hide();
                	auditPanel.removeNode(obj.metadataId);
                	me.delAuditFigure(obj.metadataId);
                    Dep.framework.editor.util.Msg.success(result.resultText, "提示");
                } else {
                    Dep.framework.editor.util.Msg.failed(result.resultText, "提示");
                }
            }    		
    	});
    },
    /**
     * 删除审核图元
     */
    delAuditFigure : function(id){
    	var me = this;
    	if(!id)return ;
    	var layer = me.getContainer().getCurrentDisplayLayer(),mmId = layer.currentEditorNode.raw.cacheData.mmId;
    	var mmCode =  me.getContainer().getCacheModels(mmId).code;
    	if(layer.type == "auditingLayer" && mmCode){
    		var store = layer.getStoreManager().get(mmCode);
    		if(!store)return ;
            var model = store.findRecord("id", id);
            if(model){
            	me.getEditor().executeAction(
        				Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, model.fType, model);
            }
    	}
    }
});