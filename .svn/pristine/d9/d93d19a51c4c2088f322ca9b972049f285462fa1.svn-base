/**
 * 用户分类文件夹的treeStore
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.UserFolderTreeStore', {
	extend : 'Ext.data.TreeStore',
	defaultRootText : "按用户归类的元模型",
	autoLoad : false,
	
	proxy : { 
    	type:'ajax', 
    	url:'metamodelfolder/getFolderTree.do', 
    	reader : { type : 'json', root : 'result'}
    	
    },
    root:{
    	id : 'root',
        expanded : true,//true为默认根节点展开，会自动发一次请求
        nodeType : 'userRoot'
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
        	//node.set("icon","img/metamodel/user.png");
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
		if(nodeType=='userRoot' || nodeType=='folderNode'){
			me.getProxy().url = "metamodelfolder/getFolderTree.do";
			me.getProxy().extraParams.id = node.raw.id;
		}else {
			me.getProxy().url = "metamodelfolder/getMetaModelsByFolderId.do";
			me.getProxy().extraParams.id = node.raw.id;
		}
	}
	
});