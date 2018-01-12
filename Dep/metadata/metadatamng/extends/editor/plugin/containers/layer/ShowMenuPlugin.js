/**
 * 在图层初始化完成之后(监听Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT事件)，获取图层容器的tree view ，
 * 添加事件监听显示菜单项。菜单项调用容器内部注册的各个action
 */

if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
if (!Dep.framework.editor.plugin.containers.layer) {
	Dep.framework.editor.plugin.containers.layer = {};
}

/**
 * panel的右键菜单
 */
Dep.framework.editor.plugin.containers.layer.ShowMenuPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.ShowMenuPlugin",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
	},
	_initEvent : function() {
		var me = this;
		//元数据数panel
		me.getContainer().bulidMDTreePanel().on({
			itemclick : {fn: me.mdTreeItemClick, scope: me, single: false},
			itemcontextmenu : {fn: me.mdTreeItemContextMenu, scope: me, single: false},
           });
		//元数据检索panel监听
		me.getContainer().bulidMDQueryPanel().getTreePanel().on({
			itemclick : {fn: me.mdQueryTreeItemClick, scope: me, single: false}
		});
		//元数据审核panel监听
		me.getContainer().bulidMDAuditingPanel().getTreePanel().on({
			itemclick :{fn:  me.mdAuditTreeItemClick, scope: me, single: false},
			itemcontextmenu :  {fn:  me.mdAuditTreeItemContextMenu, scope: me, single: false}
		});		
	},
	/**
	 * 树上的单击事件
	 * @param o
	 * @param record
	 * @param item
	 * @param index
	 * @param e
	 * @param eOpts
	 */
	mdTreeItemClick : function(o, record, item, index, e, eOpts ){
		o.toggleOnDblClick = false; //去掉双击事件
		var me = this,panel = me.getContainer().bulidMDTreePanel();
        //获取顶级节点（元数据）
        var rootNode=panel.store.getRootNode();
        //关闭其他节点
        me._colseMDNode(rootNode,record);
		//type:节点类型 【0：根节点；1：视图（文件夹）；2：元数据;3:元模型；】
		if(record.raw.nodeType==2){
            //请求元数据之后的数据
			var node = panel.store.getNodeById(record.raw.id);
			me._expandMDNode(node);
			me.getContainer().fireEvent("changeItemSelected",record,"metadata",1);
		};

	},
    /**
	 * 关闭除当前节点以外的其他视图节点
	 *  @param node
     */
    _colseMDNode:function(rootNode,record){
    	var me=this;
    	//获取选中节点的父节点
        var parentNode=record.parentNode;
        //获取选中节点名称
        var selNode=record.raw.text;
        //获取选中节点的兄弟节点
		if(parentNode.childNodes){
            var broNode=parentNode.childNodes;
            for(var i=0;i<broNode.length;i++){
                if(selNode!=broNode[i].raw.text){
                    broNode[i].collapse();
                }

            }
		}
        //循环获取选中节点的父级节点，到节点是视图时结束循环
        while(parentNode!=null){
            var bfNode=parentNode.raw.text;//选中节点
			var faNode=parentNode.parentNode;
			if(faNode){
                var allNode=faNode.childNodes;//选中节点的父节点的孩子
                for(var i=0;i<allNode.length;i++){
                    if(bfNode!=allNode[i].raw.text){
                        allNode[i].collapse();
                    }
                }
			}
            if(parentNode.raw.nodeType==1)
                break;
            parentNode=parentNode.parentNode;

        }
        if(parentNode!=null){
            //获取全部视图节点
            var childNodes=rootNode.childNodes;
            //选中的视图节点名称
            var selViewNode=parentNode.raw.text;
            for(var i=0;i<childNodes.length;i++){
                //获取全部视图节点的名称
                var nodeAll=childNodes[i].raw.text;
                if(selViewNode!=nodeAll){
                    childNodes[i].collapse();
                }
            }
		}

	},
	/**
	 * 展开元数据及分类节点
	 * @param node
	 */
	_expandMDNode : function(node){
		var me = this;
		if(!node)return ;
		if(node.isExpanded())return ;
		node.expand(false,function(){
			var cds = node.childNodes;
			for(var i=0;i<cds.length;i++){
				var nd = cds[i];
				nd.expand();
			}			
		});
	},
	/**
	 * 元数据查询树上的单击事件
	 * @param o
	 * @param record
	 * @param item
	 * @param index
	 * @param e
	 * @param eOpts
	 */
	mdQueryTreeItemClick : function(o, record, item, index, e, eOpts ){
		var me = this;
		//type:节点类型 【0：根节点；1：视图（文件夹）；2：元数据;3:元模型；】
		if(record.raw.nodeType==2){  
			me.getContainer().fireEvent("changeItemSelected",record,"queryLayer",1);
		}		
	},
	/**
	 * 元数据审核树上的单击事件
	 * @param o
	 * @param record
	 * @param item
	 * @param index
	 * @param e
	 * @param eOpts
	 */
	mdAuditTreeItemClick : function(o, record, item, index, e, eOpts ){
		var me = this;
		//type:节点类型 【0：根节点；1：视图（文件夹）；2：元数据;3:元模型；】
		if(record.raw.nodeType==2){  
			me.getContainer().fireEvent("changeItemSelected",record,"auditingLayer",0);
		}
	},	
	/**
	 * 树上的右键菜单
	 * @param menutree
	 * @param record
	 * @param items
	 * @param index
	 * @param e
	 */
	mdTreeItemContextMenu : function(menutree, record, items, index, e){
		var me = this,panel = me.getContainer().bulidMDTreePanel();
        var nodemenu =me.getMDMenuContent(record);
        if(nodemenu){
        	panel.currentNodeId = record.raw.id;
        	nodemenu.showAt(e.getXY());  
        }
        e.preventDefault(); 
        e.stopEvent();
	},
	/**
	 * 元数据审核树上的右键菜单
	 * @param menutree
	 * @param record
	 * @param items
	 * @param index
	 * @param e
	 */
	mdAuditTreeItemContextMenu : function(menutree, record, items, index, e){
		var me = this;
		e.preventDefault();  
        e.stopEvent();
        var nodemenu =me.getAuditNodeMenuContent(record);
        if(nodemenu){
        	nodemenu.showAt(e.getXY());  
        }		
	},
	/**
	 * 获取元数据的右键菜单
	 * @param record
	 */
	getMDMenuContent : function(record){
		var me = this;
		var nodeType = record.raw.nodeType;
		var nodemenu = null;
		if(nodeType =="0"){
			nodemenu = new Ext.menu.Menu({
                floating:true,  
                items:[{  
                    text:"数据地图",  
                    icon:"Dep/metadata/resource/img/datamap.png",
                    handler:function(){
                    	me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","toShowDataMapLayer");
                    }
                },{  
                    text:"刷新",  
                    icon:"Dep/metadata/resource/img/refresh.png",
                    handler:function(){
                    	me.getContainer().bulidMDTreePanel().refreshNode(0); //刷新跟节点
                    }
                }] 
            });			
		}else if(nodeType =="1" || nodeType =="10"){  //视图/文件夹
			nodemenu = new Ext.menu.Menu({
                floating:true,  
                items:[{  
                    text:Dep.metadata.I18N.metadatamng.menu.add,  
                    icon:"Dep/metadata/resource/img/add.png",
                    handler:function(){
                    	me.getContainer().showMdBaseInfoWin(true,record);
                    }
                },{  
                    text:"刷新节点",  
                    icon:"Dep/metadata/resource/img/refresh.png",
                    handler:function(){
                    	me.getContainer().bulidMDTreePanel().refreshNode();
                    }
                }] 
            });
		}else if(nodeType =="2"){
			nodemenu = new Ext.menu.Menu({
                floating:true,  
                items:[{  
                    text:Dep.metadata.I18N.metadatamng.menu.edit,  
                    icon:"Dep/metadata/resource/img/edit.png",
                    handler:function(){
                    	me.getContainer().showMdBaseInfoWin(false,record.raw.id);
                    }
                },{  
                    text:Dep.metadata.I18N.metadatamng.menu.del, 
                    icon:"Dep/metadata/resource/img/del.png",
                    handler:function(){
                    	me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","delMetadata",record.raw.id);
                    }
                },{  
                    text:Dep.metadata.I18N.metadatamng.menu.pub,  
                    icon:"Dep/metadata/resource/img/pub.png",
                    handler:function(){
                    	me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","showPubMetadataWin",record.raw.id);
                    }
                },{  
                    text:"刷新节点",  
                    icon:"Dep/metadata/resource/img/refresh.png",
                    handler:function(){
                    	me.getContainer().bulidMDTreePanel().refreshNode();
                    }
                }
                ] 
            });			
		}
		return nodemenu;		
	},
	/**
	 * 元数据审核树，生成右键菜单选项
	 * @param record
	 * @returns
	 */
	getAuditNodeMenuContent : function(record){
		var me = this;
		var nodeType = record.raw.nodeType;
		var nodemenu = null;
		if(nodeType=="0"){
			nodemenu = new Ext.menu.Menu({
                floating:true,  
                items:[{  
                    text:"刷新",  
                    icon:"Dep/metadata/resource/img/refresh.png",
                    handler:function(){
                    	me.getContainer().bulidMDAuditingPanel().refreshNode();
                    }
                }
                ] 
            });			
		}else if(nodeType =="2"){
			nodemenu = new Ext.menu.Menu({
                floating:true,  
                items:[{  
                    text:"审核",  
                    icon:"Dep/metadata/resource/img/approval.png",
                    handler:function(){
                    	me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","showAuditMetadataWin",record.raw.id);
                    }
                }
                ] 
            });			
		}
		return nodemenu;		
	},
});