/**
 * 元模型管理理的审批弹窗
 */
Ext.define('Dep.metamodel.modelmng.view.ApprovalWindow', {
		extend : 'Ext.window.Window',
		cmpTag : 'approvalmmwin',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		title : "审批元模型",
		layout: 'fit',
		width : 350,
		initHeight : 200,
		height : 200,
		closeAction : "hide",
		
		constructor : function(conf){
			var me = this;
			Ext.applyIf(me, {
				items : [{
					xtype : 'form',
					style : "padding:5 20 5 0",
					layout : 'form',
					border : false,
					frame : true,
					buttonAlign :"center",
					items : [
						{
							xtype : "textfield",
							name : "metamodelId",
							hidden : true
						},
						{
							xtype : "combo",
							fieldLabel : '<font color="red">*</font>审批',
							queryMode : 'local', 
							labelAlign : "right",
							store : conf.approvalStore, 
						    triggerAction : 'all', 
						    valueField : 'id', 
						    displayField : 'name',
							name : "flag",
							editable : false,
							labelWidth : 60,
							allowBlank : false,
							blankText : '审批意见不能为空',
							validateBlank : true,
							msgTarget : 'qtip',
							cmpTag : 'approvalmmidea'
						},
						{
							xtype : "textarea",
							fieldLabel : "说明",
							name : "remark",
							height : 70,
							labelAlign : "right",
							labelWidth : 60,
							maxLength : 170,
							maxLengthText : '说明的最大长度是170',
							msgTarget : 'qtip'
						}
					],
					buttons : [{
						xtype : 'button',
						text : '确定',
						margin : '0 0 0 20',
						cmpTag : 'confirmapproval'
					},{
						xtype : 'button',
						text : '取消',
						margin : '0 0 0 7',
						handler : function(){
							me.hide();
						}		
					}]
				}]
			});
			me.callParent();
		}
});