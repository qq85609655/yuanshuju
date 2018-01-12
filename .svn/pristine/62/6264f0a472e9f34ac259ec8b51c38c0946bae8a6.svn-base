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
 * 创建子元数据
 */
Dep.framework.editor.plugin.containers.layer.ImportSubMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.ImportSubMetadata",
	
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
		me.getContainer().regiestActions([ {
			name : "importSubMD",
			functionality : Ext.Function.bind(me.importSubMD, me),
			group : "importSubMD"
		}]);
	},
    /**
     * 添加子元数据
     * @param metamodel
     * @param id
     */
	importSubMD : function(mmId,figure,id){
    	var me = this,win = me.getUploadWin(mmId,id);
        win.show();
    },
    
    /**
	 * 获取导入文件的弹窗
	 * 
	 * @return {}
	 */
	getUploadWin : function(mmId,id) {
		var me = this;
		if (!this.upLoadWin) {
			this.formPanel = Ext.create('Ext.form.Panel', {
				width : 400,
				hight:'120',
				bodyPadding : 10,
				frame : true,
				items : [{
					xtype : 'filefield',
					name : 'file',
					fieldLabel : '<font color="red">*</font>'
							+ '文件',
					labelAlign : 'left',
					labelWidth : 50,
					fileupload : true,
					msgTarget : 'side',
					allowBlank : false,
					anchor : '100%',
					buttonText : '选择文件',
					cmpTag:'fileUpload'
				}],
				buttons : [{
					xtype: "panel",
					width : 50,
            		border : null,
            		bodyStyle: {  
                        background: '#dfe9f7',
                   },
                   html:"<div>"+
			               	"<a href='#'>下载模版</a></div></div>"+
			           	"</div>",
			      listeners: {
			    	  click: {
			              element: 'el',
			              fn: function(){ 
			            	  var mmId = me.formPanel.mmId;
			            	  
			            	  window.location.href = "gather/csv/downLoadMmModelCsv.do?mmId="+mmId
			              }
			          }
			      }
				},{
					xtype: "panel",
					width : 150,
            		border : null,
				},{
					text : '确认',
					handler : function() {
						var form = me.formPanel;
						var dataId = me.formPanel.dataId;
						var mmId = me.formPanel.mmId;
						if (form.isValid()) {
							form.submit({
								url : "gather/csv/import.do",
								waitMsg : '上传中，请稍候...',
								params : {
									id : dataId,
									mmId : mmId
								},
								method : "POST",
								success : function(form, action) {
									Dep.framework.editor.util.Msg.error(action.result.resultText);
									me.upLoadWin.hide();
								},
								failure : function(form, action) {
									me.upLoadWin.hide();
                                    if(action) {
                                        var resultCode = action.result.resultCode;
                                        var resultText = action.result.resultText;
                                        if(resultCode==1) {
                                            Dep.framework.editor.util.Msg.success('您的文件导入成功。', '成功');
                                        }else {
                                            Dep.framework.editor.util.Msg.failed(resultText, '失败');
                                        }
                                    }
								}
							});
						}
					}
				}, {
					text : '取消',
					handler : function() {
						me.upLoadWin.hide();
					}

				}]
			});
			this.upLoadWin = Ext.create('Ext.window.Window', {
						title : "导入",
						autoDestroy : false,
						closeAction : 'hide',
						closable : true,
						maximizable : true,// 可最大化
						width : 400,
						height : 120,
						layout : 'fit',
						items : [me.formPanel]
					});
		}
		me.formPanel.dataId = id;
		me.formPanel.mmId = mmId;
		return me.upLoadWin;
	},
	
});