/**
 * 继承元模型的treeStore
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.InheritTreeStore', {
	extend : 'Ext.data.TreeStore',
	defaultRootText : "root",
	autoLoad : false,
	
    proxy : { 
    	type:'ajax', 
    	url:'metamodelquery/findRootModel.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
    
/*    root: {
    	id: 'root1',
        expanded: true,
        text: "按继承关系归类的元模型",
        nodeType: 'inheritRoot',
        leaf: false,
        children: [
              { id: 'achild1', text: "元元模型1", expanded: false, leaf: false, nodeType: 'mmModelNode', children: [
              	  { id: 'agrandchild101', text: "元模型1-1", leaf: true, nodeType: 'mModelNode'},
              	  { id: 'agrandchild102', text: "元模型1-2", leaf: true, nodeType: 'mModelNode'},
	              { id: 'agrandchild103', text: "元模型1-3", leaf: false, nodeType: 'mModelNode', children: [
	              	  { id: 'agrandchild10301', text: "元模型3-1", leaf: false, nodeType: 'mModelNode',children: [
		              	  { id: 'agrandchild1030101', text: "元模型3-1-1", leaf: true, nodeType: 'mModelNode'}
		              ]}
	              ]}
              ]},
              { id: 'achild2', text: "元元模型2", expanded: true, leaf: false, nodeType: 'mmModelNode', children: [
              	  { id: 'agrandchild201', text: "元模型2-1", leaf: false, nodeType: 'mModelNode', children: [
	              	  { id: 'agrandchild20101', text: "元模型2-1-1", leaf: true, nodeType: 'mModelNode'}
	              ]},
              	  { id: 'agrandchild202', text: "元模型2-2", leaf: false, nodeType: 'mModelNode', children: [
	              	  { id: 'agrandchild20201', text: "元模型2-2-1", leaf: true, nodeType: 'mModelNode'}
	              ]},
              	  { id: 'agrandchild203', text: "元模型2-3", leaf: true, nodeType: 'mModelNode'}
              ]},
              { id: 'achild3', text: '......', expanded: false, leaf: false, nodeType: 'mmModelNode'}
        ]
    },
    
    listeners : { 
    	'beforeappend' : function(obj, node, eOpts){
    		var me = this;
    		node.set("icon","img/metamodel/inherit.png");
    	}
    }*/
    
    root:{
    	id : 'root',
        expanded : false,//若为true表示默认根节点展开，会自动发一次请求
        nodeType : 'root'
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
        	node.set("icon","img/metamodel/inherit.png");
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
		if(nodeType=='root'){
			me.getProxy().url = "metamodelquery/findRootModel.do";
		}else {
			me.getProxy().url = "metamodelquery/findNodeModel.do";
			me.getProxy().extraParams.id = node.raw.id;
		}
	}
	
});