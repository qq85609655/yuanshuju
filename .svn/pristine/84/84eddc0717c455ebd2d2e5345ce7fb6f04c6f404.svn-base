/**
 * 编辑Excel采集数据源基本信息的弹出窗
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.ExcelDsInfoWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		height: 230,
	    width: 590,
	    title: '采集配置基本信息',
	    titleAlign: 'left',
	    closeAction : 'hide',
	    isAdd : true,
	
	    constructor : function(conf) {
	        var me = this;
	
	        Ext.applyIf(me, {
	            items: [
                {
                    xtype: 'form',
                    frame: true,
                    height: 200,
                    padding: 10,
                    width: 590,
                    layout: {
                        type: 'column'
                    },
                    buttonAlign: 'center',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '<font color="red">*</font>名称',
                            labelAlign: 'right',
                            cmpTag : 'xlsdsname',
                            labelWidth: 60,
                            name : 'dbsName',
                            allowBlank : false,
							blankText : '名称不能为空',
							validateBlank : true,
							maxLength : 85,
							maxLengthText : '名称的最大长度是85',
							msgTarget : 'qtip'
                        },
                        {
                            xtype: 'treepicker',
                            margin: '0 0 0 20',
                            fieldLabel: '<font color="red">*</font>数据源悬挂点',
                            cmpTag : 'xlshangPoint',
                            labelAlign: 'right',
                            name : 'dataPath',
                            displayField: 'text',
                            value: '',
                            autoScroll : true,
      						minPickerHeight: 200,
                            store : conf.mdTreeStore,
                            allowBlank : false,
							blankText : '悬挂点不能为空',
							validateBlank : true,
							msgTarget : 'qtip'
                        },
                        {
                            xtype: 'button',
                            text: '选择',
                            hidden : true,
                            cmpTag : 'xlselectbtn',
                            margin: '0 0 0 5'
                        },
                        {
                            xtype: 'textareafield',
                            height: 80,
                            margin: '10 0 0 0',
                            fieldLabel: '描述',
                            labelAlign: 'right',
                            cmpTag : 'xlsdsremark',
                            labelWidth: 60,
                            width : 476,
                            name : 'remark',
                            maxLength : 170,
							maxLengthText : '描述的最大长度是170',
							msgTarget : 'qtip'
                        }
                    ],
                    buttons : [{
		    				xtype: 'button',
		                    text: '保存',
		                    cmpTag : 'savexlsdbsource'
		               },{
		                    xtype: 'button',
		                    text: '取消',
		                    cmpTag : 'cancelxlssavedbs'
		                }]
                }
            ]
	        });
	
	        me.callParent(arguments);
	    }
});