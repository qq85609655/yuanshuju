/**
 * 采集适配器的treeStore
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.AdaptorTreeStore', {
	extend : 'Ext.data.TreeStore',
	defaultRootText : "root",
	autoLoad : true,
	
    proxy : { 
    	type:'ajax', 
    	url:'gather/findMenuNodes.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
    
    root:{
    	id : 'root',
        expanded : true
    },
    
    listeners : {  
        'beforeexpand' : function(node,eOpts){  
        	var me = this;
        	me.changeTreeUrl(node, me);
        	if(me.getProxy().url=="") {
        		return false;
        	}
        },
        'beforeappend' : function(obj, node, eOpts){
        	var me = this;
        	//由于采集配置和采集任务一起获取，但树使用了异步加载，因此子类需要进行特殊处理才能显示
        	if(node.raw.nodeType=='adapter') { //DB采集、Excel采集
        		if(node.raw.id=='excel') {
        			node.set("icon","Dep/metadata/resource/img/excel.png");
        		}else if(node.raw.id=='dbSchema') {
        			node.set("icon","Dep/metadata/resource/img/database.png");
        		}
        	}else if(node.raw.nodeType=='adapterRoot') {
        		node.set("icon","Dep/metadata/resource/img/adaptor.png");
        	}else if(node.raw.nodeType=='auditRoot') {
        		node.set("icon","Dep/metadata/resource/img/audit.png");
        	}else if(node.raw.nodeType=='dataSource') {
        		node.set("icon","Dep/metadata/resource/img/config.png");
        		var childs = node.raw.children;
        		if(childs && childs.length>0){
        			for(var i=0;i<childs.length;i++){
        				childs[i].icon = "Dep/metadata/resource/img/task.png";
        			}
        			node.appendChild(childs,true,true);
        		}
        	}else if(node.raw.nodeType=='task') {
        		node.set("icon","Dep/metadata/resource/img/task.png");
        	}
        }
    },
	/**
	 * 动态修改url请求
	 * 注：根据node的类型不同，请求不同的数据
	 * @param node
	 * @returns
	 */
    changeTreeUrl : function(node){
		var me = this;
		var nodeType = node.raw.nodeType;
		if(node.raw.id=="root"){
			me.getProxy().url = "gather/findMenuNodes.do";
		}else if(node.raw.nodeType=='adapterRoot') {
			me.getProxy().url = "gather/findAdapters.do";
		}else if(node.raw.nodeType=='auditRoot') {
			me.getProxy().url = "";
		}else if(node.raw.nodeType=='adapter') {
			me.getProxy().url = "gather/findByAdapterId.do";
			me.getProxy().extraParams.id = node.raw.id; //excel或 dbSchema
		}else if(node.raw.nodeType=='dataSource') {
			me.getProxy().url = "gather/getTasksByDsId.do";
		}else if(node.raw.nodeType=='task'){
			me.getProxy().url = "";
		}
	}
	
});