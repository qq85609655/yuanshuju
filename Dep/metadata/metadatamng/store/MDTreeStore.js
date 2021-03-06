/**
 * 元数据树Store
 */
Ext.define("Dep.metadata.metadatamng.store.MDTreeStore", {
	extend : "Ext.data.TreeStore",
	autoLoad : true, 
    proxy : {  
            type : 'ajax',  
            url : Dep.metadata.url.metadatamng.getAllView,//请求  
            reader : { type : 'json',root : 'result'},   //数据  
            extraParams : {id : '' } , //传参
    },
    root : {
    	id:0,
        text : Dep.metadata.I18N.metadatamng.treeStoreRoot,  
        nodeType :"0", //节点类型 【0：根节点；1：视图（文件夹）；2：元数据;3:元模型；】
        icon:"Dep/metadata/resource/img/root.png",
        expanded : true
    },
    tempChilds : null,
    selectedViewId : null, // 默认选择系统视图
    listeners : {  
        'beforeexpand' : function(node,eOpts){
        	var me = this;
        	me.changeTreeUrl(node, me);
        },
        'beforeload' : function(store, operation, eOpts){
        	var me = this,url =store.getProxy().url;
        	if(url=="")return false;
        },
        'beforeappend' : function(obj, node, eOpts){
        	var me = this;
        	//由于模型分类和子元数据一起获取，但树使用了异步加载，因此子元数据需要进行特殊处理才能显示
        	if(node.raw.nodeType ==3){ //模型分类
        		node.collapse();
        		//由于节点的id不能相同，若果相同会导致节点追加混乱，因此在追加分类节点Id时修改它Id
        		var id = node.getId();
        		node.setId(id+"__"+Ext.data.IdGenerator.get("uuid").generate());
        		node.set("icon","Dep/metadata/resource/img/category.png");
        		var childs = node.raw.children;
        		if(childs && childs.length>0){
        			for(var i=0;i<childs.length;i++){
        				childs[i].icon = "Dep/metadata/resource/img/metadata.png";
        				node.insertChild(i,childs[i]);
        			}
        		}
        	}else if(node.raw.nodeType ==2){
        		node.set("icon","Dep/metadata/resource/img/metadata.png");
        	}else  if(node.raw.nodeType ==1){
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
		if(nodeType=="0"){ //元数据的根节点
			me.getProxy().url = Dep.metadata.url.metadatamng.getAllView;
			var viewId = record.raw.Id ? record.raw.Id : me.selectedViewId;
			me.proxy.extraParams.viewId = viewId;
		}else if(nodeType =="1" || nodeType =="10"){  //视图节点
			me.getProxy().url = Dep.metadata.url.metadatamng.getByViewId; 
			me.proxy.extraParams.viewId = record.raw.id;
		}else if(nodeType=="2"){  //元数据节点
			me.getProxy().url = Dep.metadata.url.metadatamng.getSubById;
			me.proxy.extraParams.metadataId = record.raw.id;
		}else if(nodeType=="3"){
			me.getProxy().url = "";
		}		
	},
	setSelectedViewId : function(viewId){
		var me = this;
		me.selectedViewId = viewId;
	}
});