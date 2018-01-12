/**
 * 元模型检索树的treeStore
 */
Ext.define("Dep.metamodel.modelmng.store.MMQueryResultTreeStore", {
	extend : "Ext.data.TreeStore",
	autoLoad : false,  
    proxy : {  
            type : 'ajax',  
            actionMethods :'get',
            url : "metamodelquery/queryModelList.do",//请求  
            reader : { type : 'json',root : 'result'},   //数据  
            extraParams : {}  //传参
    },  
    root : {
    	id:0,
        text : "检索结果",  
        nodeType :"0", //节点类型 【0：根节点；1：视图（文件夹）；2：元数据;3:元模型；】
        expanded : true           
    },  
    listeners : {  
    	'beforeload': function(obj, operation, eOpts){
    		var me = this,hasParams = false;
    		//虽然设置了autoLoad=false，但是不起作用，因此判断刚加载文件时禁止自动load，
    		for(var i in me.proxy.extraParams){
    			hasParams = true;
    			break;
    		}
    		if(!hasParams){
    			return false;
    		}
    	}
    }
});