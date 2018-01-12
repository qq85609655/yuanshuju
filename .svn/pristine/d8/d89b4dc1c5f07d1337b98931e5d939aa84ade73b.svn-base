/**
 * 枚举管理的treeStore
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.EnumTreeStore', {
	extend : 'Ext.data.TreeStore',
	defaultRootText : "枚举",
	autoLoad : false,
	
	proxy : { 
    	type:'ajax', 
    	url:'metamodelenum/findEnumList.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
    
    root:{
    	id : 'root',
        expanded : true,//默认根节点展开，会自动发一次请求
        nodeType : 'enumRoot'
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
        	node.set("icon","img/metamodel/enum.png");
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
		if(nodeType=='enumRoot'){
			me.getProxy().url = "metamodelenum/findEnumList.do";
		}else if(nodeType=='enumNode'){
			me.getProxy().url = "metamodelenum/findSubEnumList.do";
			me.getProxy().extraParams.id = node.raw.id;
		}else {
			me.getProxy().url = "metamodelenum/findSubEnumList.do";
		}
	}
	
	/*root: {
    	id: 'root4',
        expanded: true,
        text: "枚举",
        nodeType: 'enumRoot',
        leaf: false,
        children: [
              { id: 'child1', text: "枚举类型1", expanded: false, leaf: true, nodeType: 'enumTypeNode'},
              { id: 'child2', text: "枚举类型2", expanded: false, leaf: true, nodeType: 'enumTypeNode'},
              { id: 'child3', text: '枚举类型3', expanded: false, leaf: true, nodeType: 'enumTypeNode'}
        ]
    },*/
    
    /*listeners : { 
    	'beforeappend' : function(obj, node, eOpts){
    		var me = this;
    		node.set("icon","img/metamodel/enum.png");
    	}
    }*/
    
});