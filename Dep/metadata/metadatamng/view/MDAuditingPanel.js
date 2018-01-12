/**
 * 元数据审核
 */
Ext.define("Dep.metadata.metadatamng.view.MDAuditingPanel", {
	extend : "Ext.panel.Panel",
	layout:'fit',
	title :Dep.metadata.I18N.metadatamng.metadata,
	store : null,  //TreeStore
	parentcontainer : null, //父容器：图层容器
	constructor : function(conf) {
		var me = this;
		if(conf.parentcontainer)me.parentcontainer = conf.parentcontainer;
		if(conf.store)me.store = conf.store;
		
		me.queryResultTreePanle = Ext.create('Ext.tree.Panel', {
				store : me.store
		});
		me.items =[me.queryResultTreePanle];
		me.dockedItems =[{
		    xtype: 'toolbar',
		    dock: 'top',
		    items: [
		        { xtype: 'button', text: "返回",icon:"Dep/metadata/resource/img/return.png",handler : function(){
		        	me.parentcontainer.changePanelVisible(0);
		        }}
		    ]
		}];
		me.callParent();
	},
	/**
	 * 获取树Panel
	 */
	getTreePanel : function(){
		var me = this;
		return me.queryResultTreePanle;
	},	
	/**
	 * 刷新节点
	 */
	refreshNode :function(){
		var me = this;
		if(me.store){
			me.store.load();	
		}
	},
	/**
	 * 删除节点
	 */
	removeNode :function(id){
		var me = this;
		var node = me.store.getNodeById(id);
		if(node)node.parentNode.removeChild(node);  
	}
});