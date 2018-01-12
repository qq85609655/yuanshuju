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
 * 与依赖管理有关的元数据操作
 */
Dep.framework.editor.plugin.containers.layer.AddDependMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.AddDependMetadata",
	/**
	 * 当前操作的依赖关系Id
	 */
	currentOptmmDepId : null, 
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
			name : "showAddDependMDWin",
			functionality : Ext.Function.bind(me.showAddDependMDWin, me),
			group : "dependMng"
		}]);
		me.getContainer().regiestActions([ {
			name : "addDependMetadata",
			functionality : Ext.Function.bind(me.addDependMetadata, me),
			group : "dependMng"
		}]);
		me.getContainer().regiestActions([ {
			name : "closeDependMetadataWin",
			functionality : Ext.Function.bind(me.closeDependMetadataWin, me),
			group : "dependMng"
		}]);
	},
    /**
     * 右键菜单添加依赖操作
     */
    showAddDependMDWin : function(mmId,fg,id,mmDepId){
    	var me = this,win= me.getContainer().bulidDependGridWin(),
    	mdStore = me.getContainer().getDependMDStore();
    	console.log(me.getContainer().getDependMDStore())
    	var fromId = me.getContainer().currentEditNodeData.raw.id;
    	me.currentOptmmDepId = mmDepId;
    	win.show();
    	mdStore.getProxy().url = Dep.metadata.url.metadatamng.findNoDependMDs;
    	mdStore.proxy.extraParams.modelId = mmId;  
    	mdStore.proxy.extraParams.id = id;  
    	mdStore.clearFilter(true);
    	mdStore.filter([{filterFn: function(item) { if(item.getId()!=fromId){return item;}}}]);
    	mdStore.load();
    	
    },
    /**
     * 添加依赖关系
     * @param mdDepId  依赖关系Id
     */
    addDependMetadata : function(){
    	var me = this,win= me.getContainer().bulidDependGridWin();
    	var vals =win.getValues(),rec = null,toIds="",mmDependId=me.currentOptmmDepId;
    	for(var i=0;i<vals.length;i++){
    		rec = vals[i];
    		if(toIds!="")toIds +=",";
    		toIds += rec.getId();
    	}
    	if(!toIds)return ;
    	var fromId = me.getContainer().currentEditNodeData.raw.id;
    	//发送ajax请求添加依赖
    	Fn.Request(Dep.metadata.url.metadatamng.addDepenMDs, true, {fromMdId: fromId,toMdIds : toIds,mmDependId:mmDependId},"操作失败",function(result){
            if (result) {
                if (result.resultCode === 1) {
                    Dep.framework.editor.util.Msg.success(result.resultText, "提示");
                    me.getContainer().getDependMDStore().reload();
                    me.getContainer().loadDependMds();
                } else {
                    Dep.framework.editor.util.Msg.failed(result.resultText, "提示");
                }
            }    		
    	});    	
    	win.hide();
    },
    /**
     * 关闭依赖关系窗口
     */
    closeDependMetadataWin : function(){
    	var me = this,win= me.getContainer().bulidDependGridWin(),
    	gridPanel =win.getGridPanel();
    	if(gridPanel){
    		var gridDepend = Ext.ComponentQuery.query('#gridDepend');
    		gridDepend[0].store.removeAll();
    	}
    	me.currentOptmmDepId = null;
    }
});