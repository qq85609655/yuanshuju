/**
 * 编辑一条依赖关系的基本信息的弹窗界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.EditDependRelationWindow', {
    extend: 'Ext.window.Window',
    modal : true,
	resizable : false,
	maximizable : false,
	autoDestroy : false,
	constrainHeader  : true,
	border : null,
    height: 260,
    width: 398,
    title: '依赖关系基本信息',
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
                    padding: '5 40 0 0',
                    width: 386,
                    bodyPadding: 10,
                    buttonAlign : 'center',
                    items: [
                    	{
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'ID',
                            labelAlign: 'right',
                            cmpTag : 'dependid',
                            name : 'id',
                            hidden : true //隐藏id输入框
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '<font color="red">*</font>关系名称',
                            labelAlign: 'right',
                            cmpTag : 'dependname',
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
                            cmpTag : 'dependfromMID',
                            name : 'fromMid',
                            hidden : true //隐藏fromMid输入框
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '起始元模型',
                            labelAlign: 'right',
                            cmpTag : 'dependfromMName',
                            name : 'fromMName',
                            readOnly : true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '被依赖元模型ID',
                            labelAlign: 'right',
                            cmpTag : 'dependtoMID',
                            name : 'toMid',
                            hidden : true //隐藏toMid输入框
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '被依赖元模型',
                            labelAlign: 'right',
                            readOnly : true,
                            cmpTag : 'dependtoMName',
                            name : 'toMName'
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            fieldLabel: '描述',
                            labelAlign: 'right',
                            cmpTag : 'dependremark',
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
                            cmpTag : 'savedependrelation'
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 10 7',
                            width: 50,
                            text: '取消',
                            handler : function(){
								me.hide();
							}	
                        }]
                }
            ]
        });

        me.callParent(arguments);
    }

});