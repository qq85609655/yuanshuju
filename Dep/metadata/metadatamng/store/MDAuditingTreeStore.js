/**
 * 元数据树Store
 */
Ext.define("Dep.metadata.metadatamng.store.MDAuditingTreeStore", {
	extend : "Ext.data.TreeStore",
	autoLoad : true,  
    proxy : {  
            type : 'ajax',  
            url : "version/queryAuditingMD.do",//请求  
            reader : { type : 'json',root : 'result'},   //数据  
            extraParams : {id : '' }  //传参
    },  
    root : {
    	id:0,
        text : "视图",
        nodeType :"0", //节点类型 【0：根节点；1：视图（文件夹）；2：元数据;3:元模型；】
        expanded : true           
    },  
    listeners : {  
        'beforeexpand' : function(node,eOpts){  
        },
        'beforeload' : function(store, operation, eOpts){
        }
    }
});