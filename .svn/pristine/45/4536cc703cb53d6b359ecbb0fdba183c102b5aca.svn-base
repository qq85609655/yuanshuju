/**
 * 系统视图的treeStore
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.store.SysViewTreeStore', {
	extend : 'Ext.data.TreeStore',
	autoLoad : true,
	
    proxy : {  
            type : 'ajax',  
            url : 'view/findByType.do',
            reader : { type : 'json', root : 'result'},   //'root'指的是Ajax请求响应的result属性
            extraParams : {viewType : '0' }  //传参:视图类型（'0':系统 or '1':用户）
    },  
    root : {
    	id:0,
        text : "系统视图根节点",  
        type :"0", //节点类型 【0：根节点；1：视图（文件夹）；2：子文件夹;3:子子文件夹；】
        icon : "Dep/metadata/resource/img/root.png",
        expanded : true           
    },
    listeners : {  
        'beforeexpand' : function(node,eOpts){  
        	var me = this;
        	me.changeTreeUrl(node, me);
        },
        'beforeappend' : function(obj, node, eOpts){
        	var me = this;
        	if(node.raw.nodeType == 1){ //系统视图
        		node.set("icon","Dep/metadata/resource/img/view.png");
        	}
        }
    },
	/**
	 * 动态修改url请求
	 * 注：根据node的类型不同，请求不同的数据
	 * @param record
	 * @returns
	 */
    changeTreeUrl : function(record){
		var me = this;

		var nodeType = record.raw.nodeType;
		if(nodeType==0){ //系统视图根节点
			return false;
		}else if(nodeType == 1 || nodeType == 2){  //系统视图只看到视图这一层
			me.getProxy().url = "view/findFolderByViewId.do";//根据视图Id查询文件夹
			me.proxy.extraParams.viewId = record.raw.id;   //将参数传递给后台
			me.proxy.extraParams.nodeType = record.raw.nodeType;   //将参数传递给后台
		}		
	}

	
});