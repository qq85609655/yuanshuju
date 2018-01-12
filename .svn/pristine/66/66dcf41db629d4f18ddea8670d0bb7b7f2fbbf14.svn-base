/**
 * 编辑文件夹信息的弹出窗
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.EditFolderWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		isAdd : true,
		border : null,
		title : '编辑文件夹',
		layout: 'fit',
		closeAction : "hide",
		width : 380,
		height : 130,
		cmpTag : 'editfolderwindow',
		
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
					name : 'name',
					cmpTag : 'foldername',
					emptyText : '输入文本...',
					width : 300,
					style: {
			            margin: '5px 10px 5px 15px'
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
					name : 'foldericon',
					hidden : true,
					cmpTag : 'foldericon',
					emptyText : '请选择一个图标...',
					buttonText: '浏览..',
					width : 300,
					style: {
			            margin: '5px 10px 5px 15px'
			        },
					flex : 1
				}],
			buttons : [{
					xtype : 'button',
					text : '确定',
					cmpTag : 'confirmaddfolderformm',
					handler : function() {
						this.fireEvent('confirmaddfolder', this);
					}
				},{
					xtype : 'button',
					text : '取消',
					cmpTag : 'canceladdfolderformm',
					handler : function() {
						this.fireEvent('canceladdfolder', this);
					}
				}]
		}]
});