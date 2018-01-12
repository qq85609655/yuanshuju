/**
 * 用户视图的treeStore
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.store.UserViewTreeStore', {
	extend : 'Ext.data.TreeStore',
	autoLoad : true,
	
	proxy:{ 
    	type : 'ajax',  
    	url : 'view/findByType.do',
    	reader : { type : 'json', root : 'result'},   //'root'指的是Ajax请求响应的result属性
    	extraParams : {viewType : '1' }  //传参:视图类型（'0':系统 or '1':用户）
    },
    
    root : {
    	id : 'root',
    	text : '用户自定义视图根节点',
    	icon : "Dep/metadata/resource/img/root.png"
    },
    listeners : {  
        'beforeexpand' : function(node,eOpts){  
        	var me = this;
        	me.changeTreeUrl(node, me);
        },
        'beforeappend' : function(obj, node, eOpts){
        	var me = this;
        	if(node.raw.nodeType == 1){ //自定义视图
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
		if(record.raw.id=="root"){ //用户自定义视图根节点
			me.getProxy().url = "view/findByType.do";
			me.proxy.extraParams.viewType = "1";
		}else if(record.get('depth')!=0){  //视图节点
			me.getProxy().url = "view/findFolderByViewId.do";//根据视图Id查询文件夹
			me.proxy.extraParams.parentId = record.raw.id;   //将视图id传递给后台
		}	
	}
    
	
});