Ext.define('Dep.metadata.gathermng.view.FileUploadWindow', {
			extend : 'Ext.window.Window',
			modal : true,
			resizable : false,
			maximizable : false,
			autoDestroy : false,
			constrainHeader  : true,
			closable : true,
			border : null,
			closeAction : 'hide',
			title : '文件上传',
			height : 150,
			width : 472,

			constructor : function(conf) {
				var me = this;

				Ext.applyIf(me, {
							items : [{
								xtype : 'form',
								height : 120,
								frame : true,
								layout : {
									columns : 2,
									type : 'table'
								},
								bodyPadding : 10,
								buttonAlign : 'center',
								items : [{
									xtype : 'filefield',
									name : 'file',
									margin : '20 0 0 10',
									fieldLabel : '<font color="red">*</font>'
											+ '文件',
									width : 400,
									labelWidth : 40,
									labelAlign : 'right',
									fileupload : true,
									allowBlank : false,
									blankText : '',
									msgTarget : 'qtip',
									anchor : '100%',
									buttonText : '浏览...',
									cmpTag : 'excelfilefield',
									validator : function(v) {
										if (/^.*\.(?:xlsx)$/.test(v)) {
											return true;
										}else if(v===""){
											return '文件不能为空';
										}else if(/^.*\.(?:xls)$/.test(v)){
											return '只支持Microsoft Excel 2007以上版本';
										}else {
											return '只能上传以.xlsx为后缀的文件';
										}
									}
								}],
								buttons : [{
											xtype : 'button',
											margin : '0 0 10 0 ',
											cmpTag : 'excelupload',
											width : 50,
											text : '上传'
										},{
											xtype : 'button',
											text : '关闭',
											margin : '0 0 10 7',
											cmpTag : 'closefileupload',
											handler : function() {
												me.hide();
											}
										}]
							}]
						});

				me.callParent(arguments);
			}

		});