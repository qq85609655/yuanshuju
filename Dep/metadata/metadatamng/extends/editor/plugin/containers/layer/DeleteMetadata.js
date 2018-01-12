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
 * 删除元数据
 */
Dep.framework.editor.plugin.containers.layer.DeleteMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.DeleteMetadata",
	
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
			name : "delMetadata",
			functionality : Ext.Function.bind(me.delMetadata, me),
			group : "deleteMD"
		}]);
	},
    /**
     * 删除元数据
     * @param id 元数据id
     */
    delMetadata: function (id) {
        var me = this;
		Ext.Msg.confirm('提示', '您确定要删除此元数据吗？', function(btn){
			if(btn=='yes') {
		        Fn.Request(Dep.metadata.url.metadatamng.delMetadata, false, {ids: id},"操作失败",function(result){
		            if (result) {
		                if (result.resultCode === 1) {
		                	me.delMDFigure(id);
		                    Dep.framework.editor.util.Msg.success(result.resultText, "提示");
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
     * 删除画布上的元数据图元
     */
    delMDFigure : function(id){
    	var me = this,layer = me.getContainer().getCurrentDisplayLayer(),nodeId =null;
    	if(layer){
    		var node = layer.currentEditorNode;
    		if(node && node.getId()==id){
    			layer.clearAll();
    		}
    	}
    	//刷新左边的树
    	var panel = me.getContainer().bulidMDTreePanel();
    	var node = panel.store.getNodeById(id),refreshNode =null;
    	if(node.parentNode.raw.nodeType =="1" || node.parentNode.raw.nodeType =="10"){ //如果父节点为文件夹或试图，则直接刷新父节点
    		refreshNode = node.parentNode;
    	}else if(node.parentNode.parentNode && node.parentNode.parentNode.raw.nodeType=="2"){ //如果父父节点为元数据，则刷新父父节点
    		refreshNode = node.parentNode.parentNode;
    	}
    	//刷新父节点
    	me.getContainer().bulidMDTreePanel().refreshNode(refreshNode.getId());
    	//更新画布
		if (refreshNode.raw.nodeType == "2"
						&& refreshNode
						&& layer
						&& layer.currentEditorNode
						&& (refreshNode.getId() == layer.currentEditorNode
								.getId())) {
			me.getContainer().bulidMDTreePanel().getSelectionModel().select(refreshNode);
			me.getContainer().fireEvent("changeItemSelected",refreshNode,"metadata",1);
    	}
    	
    }
});