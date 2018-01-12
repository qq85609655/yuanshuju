/**
 * 编辑一条组合关系的基本信息的弹窗界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.EditCompRelationWindow', {
    extend: 'Ext.window.Window',
    modal : true,
	resizable : false,
	maximizable : false,
	autoDestroy : false,
	constrainHeader  : true,
	border : null,
    height: 310,
    width: 398,
    title: '组合关系基本信息',
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
                    height: 280,
                    padding: '0 40 0 0',
                    width: 386,
                    bodyPadding: 10,
                    buttonAlign : 'center',
                    items: [
                    	{
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'ID',
                            labelAlign: 'right',
                            cmpTag : 'compid',
                            name : 'id',
                            hidden : true //隐藏id输入框
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '<font color="red">*</font>关系名称',
                            labelAlign: 'right',
                            cmpTag : 'compname',
                            name : 'name',
                            allowBlank : false,
							blankText : '关系名称不能为空',
							validateBlank : true,
							maxLength : 85,
							maxLengthText : '名称的最大长度是85',
							msgTarget : 'qtip'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '起始元模型ID',
                            labelAlign: 'right',
                            cmpTag : 'compfromMID',
                            name : 'fromMID',
                            hidden : true //隐藏fromMID输入框
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '起始元模型',
                            labelAlign: 'right',
                            cmpTag : 'compfromMName',
                            name : 'fromMName',
                            readOnly : true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '被组合元模型ID',
                            labelAlign: 'right',
                            cmpTag : 'comptoMID',
                            name : 'toMID',
                            hidden : true //隐藏toMID输入框
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '被组合元模型',
                            labelAlign: 'right',
                            readOnly : true,
                            cmpTag : 'comptoMName',
                            name : 'toMName'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '起始端多重性',
                            labelAlign: 'right',
                            cmpTag : 'compownermultiplicity',
                            name : 'ownerMultiplicity'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '被组合多重性',
                            labelAlign: 'right',
                            cmpTag : 'comptomultiplicity',
                            name : 'toMultiplicity'
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            fieldLabel: '描述',
                            labelAlign: 'right',
                            cmpTag : 'compremark',
                            name : 'remark',
                            maxLength : 256,
							maxLengthText : '描述的最大长度是256',
							msgTarget : 'qtip'
                        }
                    ],
                        
                    buttons : [{
                            xtype: 'button',
                            width: 50,
                            text: '保存',
                            margin: '0 0 10 40',
                            cmpTag : 'savecomprelation',
                            icon : 'img/metamodel/save.png'
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 10 7',
                            width: 50,
                            text: '取消',
                            handler : function(){
								me.hide();
							},
							icon : 'img/metamodel/cancel.png'
                        }]
                }
            ]
        });

        me.callParent(arguments);
    }

});