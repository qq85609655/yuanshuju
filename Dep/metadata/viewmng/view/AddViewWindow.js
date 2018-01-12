/**
 * 添加视图的弹出窗
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.view.AddViewWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		isAdd : true,
		border : null,
		title : '添加视图',
		layout: 'fit',
		closeAction : "hide",
		width : 380,
		height : 220,
		cmpTag : 'editviewwindow',
		
		items : [{
			xtype : 'form',
			layout : 'column',
			bodyPadding: 10,
    		frame: true,
    		buttonAlign : 'center',
			items : [{
					xtype : 'textfield',
					fieldLabel : '<font color="red">*</font>名称',
					labelWidth : 60,
					name : 'viewName',
					cmpTag : 'userviewname',
					emptyText : '输入文本...',
					width : 300,
					style: {
			            margin: '0px 10px 5px 15px'
			        },
					flex : 1,
					msgTarget : 'qtip',
					allowBlank : false,
					blankText : '名称不能为空',
					validateBlank : true,
					maxLength : 85,
					maxLengthText : '名称的最大长度是85'
				},{
					xtype : 'fileuploadfield',
					fieldLabel : '图标',
					labelWidth : 60,
					name : 'icon',
					hidden : true,
					cmpTag : 'userviewicon',
					emptyText : '请选择一个图标...',
					buttonText: '浏览..',
					width : 300,
					style: {
			            margin: '5px 10px 5px 15px'
			        },
					flex : 1
				},{
					xtype : 'textarea',
					fieldLabel : '&nbsp;&nbsp;描述',
					labelWidth : 60,
					name : 'remark',
					cmpTag : 'userviewremark',
					emptyText : '',
					width : 300,
					style: {
			            margin: '5px 10px 5px 15px'
			        },
					flex : 1,
					maxLength : 170,
					maxLengthText : '描述的最大长度是170',
					msgTarget : 'qtip'
				}],
			buttons : [{
					xtype : 'button',
					text : '确定',
					cmpTag : 'confirmaddview',
					handler : function() {
						this.fireEvent('confirmaddview', this);
					}
				},{
					xtype : 'button',
					text : '取消',
					cmpTag : 'canceladdview',
					handler : function() {
						this.fireEvent('canceladdview', this);
					}
				}]
		}]
});