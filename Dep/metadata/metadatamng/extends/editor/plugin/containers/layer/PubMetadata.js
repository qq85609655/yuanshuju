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
 * 发布元数据
 */
Dep.framework.editor.plugin.containers.layer.PubMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.PubMetadata",
	
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
			name : "showPubMetadataWin",
			functionality : Ext.Function.bind(me.showPubMetadataWin, me),
			group : "pubMD"
		}]);
		me.getContainer().regiestActions([ {
			name : "savePubMDInfo",
			functionality : Ext.Function.bind(me.savePubMDInfo, me),
			group : "pubMD"
		}]);
	},
    /**
     * 发布元数据
     * @param id  元数据id
     */
    showPubMetadataWin: function (id) {
        var me = this,win =me.getContainer().buildMDPubInfoWin();
        win.show();
        win.setValues(id);
    },
    /**
     * 保存发布界面的信息
     */
    savePubMDInfo : function(obj){
    	var me = this,win =me.getContainer().buildMDPubInfoWin();
    	Fn.Request(Dep.metadata.url.metadatamng.pubMetadata, false, obj,"操作失败！",function(result){
            if (result) {
                if (result.resultCode === 1) {
                	win.hide();
                    Dep.framework.editor.util.Msg.success(result.resultText, "提示");
                } else {
                    Dep.framework.editor.util.Msg.failed(result.resultText, "提示");
                }
            }     		
    	});
    }
});