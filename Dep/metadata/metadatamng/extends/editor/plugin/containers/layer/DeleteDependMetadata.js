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
 * 删除依赖
 */
Dep.framework.editor.plugin.containers.layer.DeleteDependMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.DeleteDependMetadata",
	
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
			name : "deleteDepandMD",
			functionality : Ext.Function.bind(me.deleteDepandMD, me),
			group : "deleteMD"
		}]);
	},
    /**
     * 删除依赖关系
     * @param mdId  元数据Id
     * @param fg   元数据图元
     */
    deleteDepandMD : function(mdId,fg){
    	var me = this;
    	if(!fg)return ;
    	var fgId = fg.getId();
		Ext.Msg.confirm('提示', '您确定要删除此依赖吗？', function(btn){
			if(btn=='yes') {
		    	Fn.Request(Dep.metadata.url.metadatamng.delDependMD, true, {fromMdId: mdId,toMdIds : fgId},"操作失败",function(result){
		            if (result) {
		                if (result.resultCode === 1) {
		                    Dep.framework.editor.util.Msg.success(result.resultText, "提示");
		                    me.delDependMDFigure(fg);
		                } else {
		                    Dep.framework.editor.util.Msg.failed(result.resultText, "提示");
		                }
		            }    		
		    	});				
			}else {
				return false;
			}
		}, me);
    },
    /**
     * 删除依赖元数据图元
     */
    delDependMDFigure : function(fg){
    	var me = this,model=null,lines = [];
    	if(fg){
    		model = fg.getUserData();
    		lines = fg.getConnections();
    	}
    	if(model){
    		//删除元数据
        	me.getEditor().executeAction(
    				Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, model.fType, model);    		
    	}
    	if(lines){
    		//删除关系线
    		lines.each(function(i,rec){
    			var line = rec.getUserData();
    			me.getEditor().executeAction(
        				Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, line.fType, line);  
    		});
    	}
    	
    }
});