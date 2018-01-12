/**
 * 编辑采集任务基本信息的弹出窗
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.TaskBaseInfoWindow', {
    extend: 'Ext.window.Window',
    modal : true,
	resizable : false,
	maximizable : false,
	autoDestroy : false,
	constrainHeader  : true,
	border : null,
    height: 261,
    width: 398,
    title: '任务基本信息',
    titleAlign: 'left',
    closeAction : "hide",
    isAdd : true,

    constructor : function(conf) {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    frame: true,
                    height: 230,
                    padding: '0 40 0 0',
                    width: 386,
                    bodyPadding: 10,
                    buttonAlign : 'center',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '<font color="red">*</font>名称',
                            labelAlign: 'right',
                            cmpTag : 'taskname',
                            name : 'jobName',
                            allowBlank : false,
							blankText : '名称不能为空',
							validateBlank : true,
							maxLength : 85,
							maxLengthText : '名称的最大长度是85',
							msgTarget : 'qtip'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            fieldLabel: '<font color="red">*</font>入库策略',
                            labelAlign: 'right',
                            cmpTag : 'storagestrategy',
                            name : 'dbpolicy',
                            displayField : 'name',
                            valueField : 'id',
                            autoScroll : true,
                            editable : false,
                            allowBlank : false,
							blankText : '入库策略不能为空',
							validateBlank : true,
							msgTarget : 'qtip'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '数据源',
                            labelAlign: 'right',
                            readOnly : true,
                            cmpTag : 'taskdatasource',
                            name : 'datasource'
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            fieldLabel: '描述',
                            labelAlign: 'right',
                            cmpTag : 'taskremark',
                            name : 'remark',
                            maxLength : 170,
							maxLengthText : '描述的最大长度是170',
							msgTarget : 'qtip'
                        }
                    ],
                        
                    buttons : [{
                            xtype: 'button',
                            width: 50,
                            text: '保存',
                            margin: '0 0 0 40',
                            cmpTag : 'savetask'
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 0 7',
                            width: 50,
                            text: '取消',
                            cmpTag : 'cancelsavetask'
                        }]
                }
            ]
        });

        me.callParent(arguments);
    }

});