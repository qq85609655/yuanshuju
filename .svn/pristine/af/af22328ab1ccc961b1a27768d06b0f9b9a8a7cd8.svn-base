Ext.define('Dep.metamodel.modelmng.view.FileUploadWindow', {
			extend : 'Ext.window.Window',
			modal : true,
			resizable : false,
			maximizable : false,
			autoDestroy : false,
			constrainHeader  : true,
			closable : true,
			border : null,
			closeAction : 'hide',
			title : '图标上传',
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
											+ '图标',
									width : 400,
									labelWidth : 40,
									labelAlign : 'right',
									fileupload : true,
									allowBlank : false,
									blankText : '',
									msgTarget : 'qtip',
									anchor : '100%',
									buttonText : '浏览...',
									cmpTag : 'imagefilefield',
									validator : function(v) {
										if (/^.*\.(?:svg)$/.test(v) || /^.*\.(?:png)$/.test(v)) {
											return true;
										}else if(v=="" || v==null){
											return true;
										}else if(/^.*\.(?:jpg)$/.test(v) || /^.*\.(?:jpeg)$/.test(v)){
											return true;
										}else {
											return '只能上传svg、png、jpg或jpeg格式的图标文件,最佳尺寸为32*32像素';
										}
									}
								}],
								buttons : [{
											xtype : 'button',
											margin : '0 0 10 0 ',
											cmpTag : 'imageupload',
											width : 50,
											text : '上传'
										},{
											xtype : 'button',
											text : '关闭',
											margin : '0 0 10 7',
											cmpTag : 'closeimageupload',
											handler : function() {
												me.hide();
											}
										}]
							}]
						});

				me.callParent(arguments);
			}

		});