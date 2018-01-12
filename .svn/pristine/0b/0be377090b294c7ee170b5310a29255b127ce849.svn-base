/**
 * 元数据查询
 */
Ext.define("Dep.metadata.metadatamng.view.MDQueryPanel", {
	extend : "Ext.panel.Panel",
	layout:'fit',
	title :Dep.metadata.I18N.metadatamng.metadata,
	treeStore : null,  //TreeStore
	modelStore : null,  //TreeStore
	parentcontainer : null, //父容器：图层容器
	constructor : function(conf) {
		var me = this;
		if(conf.parentcontainer)me.parentcontainer = conf.parentcontainer;
		if(conf.treeStore)me.treeStore = conf.treeStore;
		if(conf.modelStore)me.modelStore = conf.modelStore;
		
		me.queryForm = Ext.create('Ext.form.Panel', {
			height :100,
			maxHeight:120,
			layout:'form',
			style:"margin:2 8 5 2",
			border: false,
			buttonAlign:"center",
			items :[{
				xtype:"combo",
				triggerAction:"all",
				fieldLabel:"元模型",
				queryMode: 'local',
				editable :false,
			    displayField: 'name',
			    name :"mmId",
			    valueField: 'id',
			    labelWidth :60,
				store : me.modelStore,
				anchor:"95%"
			},{
				xtype:"textfield",
				fieldLabel:"代码",
				name:"mdCodeLike",
				labelWidth :60,
				anchor:"95%"
			},{
				xtype:"textfield",
				fieldLabel:"名称",
				name:"mdNameLike",
				labelWidth :60,
				anchor:"95%"
			}],
			buttons:[{
				xtype : 'button',
				text : "查询",
				cmpTag : 'queryBtn',
				handler : function(){
					me.queryMD();
				}
			},{
				xtype : 'button',
				text : "重置",
				cmpTag : 'resetBtn',
				handler : function(){
					me.queryForm.getForm().reset();
				}	
			}]
		});
		me.queryResultTreePanle = Ext.create('Ext.tree.Panel', {
				store : me.treeStore
		});
		me.items =[me.queryForm,me.queryResultTreePanle];
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
	 * 查询元数据
	 */
	queryMD : function(){
		var me = this;
		var vals =me.queryForm.getForm().getValues();
		if(me.treeStore){
			me.treeStore.proxy.extraParams = vals;
			var root = me.getTreePanel().getRootNode();
			me.treeStore.load({
				node:root, 
				callback:function(){ 
					me.getTreePanel().expandPath(root.getPath("id"), 'id');          
				}
			});
		}
		
	}
});