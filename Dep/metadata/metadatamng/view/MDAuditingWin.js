/**
 * 元数据发布
 */
Ext.define('Dep.metadata.metadatamng.view.MDAuditingWin', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : true,
		title : "元数据审核",
		layout: 'fit',
		width : 350,
		initHeight : 200,
		height : 200,
		closeAction : "hide",
		buttonAlign :"center",
		bodyStyle:"background-color:#FFFFFF;",
		parentContainer:null,
		constructor: function(conf){
			var me = this;
			if(conf && conf.parentContainer)me.parentContainer = conf.parentContainer;
			me.auditInfoFS = Ext.create("Ext.form.Panel",{
					style:"padding:5 10 5 2",
					layout:'form',
					border : false,
					items:[
						{
							xtype:"textfield",
							name :"metadataId",
							hidden : true
						},
						{
							xtype:"combo",
							fieldLabel:"审核",
							queryMode:'local', 
							editable :false,
							labelAlign :"right",
							store :new Ext.data.Store({ 
						        singleton : true, 
						        storeId:'auditComboStore', 
						        fields:[ 
						            {name:'id', type: 'boolean'}, 
						            {name:'name',type:'string'}  
						        ], 
						        data:[ 
						             {"id":"true", "name":"通过"}, 
						             {"id":"false", "name":"拒绝"} 
						        ], 
						        autoLoad:true 
						    }), 
						    triggerAction:'all', 
						    valueField:'id', 
						    displayField:'name',
							name:"flag",
							labelWidth :80
						},
						{
							xtype:"textarea",
							fieldLabel:"说明",
							name:"remark",
							height : 80,
							labelAlign :"right",
							labelWidth :80
						}
					]					
			});
			me.items = me.auditInfoFS;
			
			me.buttons = [{
				xtype : 'button',
				text : "确定",
				handler : function(){
					var vals =me.auditInfoFS.getForm().getValues();
					me.parentContainer.executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","auditMetadata",vals);						
				}
			},{
				xtype : 'button',
				text : Dep.metadata.I18N.metadatamng.view.cancelbtn,
				handler : function(){
					me.hide();
				}		
			}];
			me.callParent();
		},
		listeners : {
			'hide' : function(){
				var me = this;
				me.resetVal();
			}
		},
		/**
		 * 重置win中的属性内容
		 */
		resetVal : function(){
			var me = this;
			me.auditInfoFS.getForm().reset();
		},
		/**
		 * 发布操作，将值设置到控件中
		 * @param obj
		 */
		setValues : function(id){
			var me = this;
			me.auditInfoFS.getForm().setValues({metadataId:id});
		}
		
});
