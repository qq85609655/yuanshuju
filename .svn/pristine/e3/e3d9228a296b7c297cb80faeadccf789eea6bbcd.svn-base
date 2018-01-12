/**
 * 组合元模型的treeStore
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.CompositionTreeStore', {
	extend : 'Ext.data.TreeStore',
	defaultRootText : "组合关系元模型根节点",
	autoLoad : false,
	
    proxy : { 
    	type:'ajax', 
    	url:'metamodelquery/findCompRootModel.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
	
/*	root: {
    	id: 'root2',
        expanded: true,
        text: "按组合关系归类的元模型",
        nodeType: 'compositionRoot',
        leaf: false,
        children: [
              { id: 'bchild1', text: "元元模型1", expanded: false, leaf: false, nodeType: 'mmModelNode', children: [
              	  { id: 'bgrandchild101', text: "元模型1-1", leaf: true, nodeType: 'mModelNode'},
              	  { id: 'bgrandchild102', text: "元模型1-2", leaf: true, nodeType: 'mModelNode'},
	              { id: 'bgrandchild103', text: "元模型1-3", leaf: false, nodeType: 'mModelNode', children: [
	              	  { id: 'bgrandchild10301', text: "元模型3-1", leaf: false, nodeType: 'mModelNode', children: [
		              	  { id: 'bgrandchild1030101', text: "元模型3-1-1", leaf: true, nodeType: 'mModelNode'}
		              ]}
	              ]}
              ]},
              { id: 'bchild2', text: "元元模型2", expanded: true, leaf: false, nodeType: 'mmModelNode', children: [
              	  { id: 'bgrandchild201', text: "元模型2-1", leaf: false, nodeType: 'mModelNode', children: [
	              	  { id: 'bgrandchild20101', text: "元模型2-1-1", leaf: true, nodeType: 'mModelNode'}
	              ]},
              	  { id: 'bgrandchild202', text: "元模型2-2", leaf: false, nodeType: 'mModelNode', children: [
	              	  { id: 'bgrandchild20201', text: "元模型2-2-1", leaf: true, nodeType: 'mModelNode'}
	              ]},
              	  { id: 'bgrandchild203', text: "元模型2-3", leaf: true, nodeType: 'mModelNode'}
              ]},
              { id: 'bchild3', text: '......', expanded: false, leaf: false, nodeType: 'mmModelNode'}
        ]
    },
    
    listeners : { 
    	'beforeappend' : function(obj, node, eOpts){
    		var me = this;
    		node.set("icon","img/metamodel/composition.png");
    	}
    }*/
    
	root:{
    	id : 'root',
        expanded : false,
        nodeType : 'mmModelNode'
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
        	node.set("icon","img/metamodel/composition.png");
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
			me.getProxy().url = "metamodelquery/findCompNodeModel.do";
			me.getProxy().extraParams.id = node.raw.id;
		}else {
			me.getProxy().url = "metamodelquery/findCompNodeModel.do";
			me.getProxy().extraParams.id = node.raw.id;
		}
	}
	
});