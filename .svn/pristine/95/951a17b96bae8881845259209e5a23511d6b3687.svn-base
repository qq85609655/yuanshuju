/**
 * @author zyy JobCronContainer 2017年4月17日15:12:32 TODO
 */
Ext.define('Dep.databackup.view.JobCronContainer', {
    extend : 'Ext.window.Window',
    modal : true,
    maximizable : true,
    autoDestroy : true,
    constrainHeader  : true,
    border : null,
    title : '备份任务设置',
    width : 400,
    height : 200,
    resizable : false,   //弹出框禁止拉伸
    closeAction : "hide",
    buttonAlign :"center",
    parentContainer:null,

    constructor : function(conf) {
        var me = this;
        me.store = conf.store;
        me.callParent();
    },
    layout : 'fit',
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            items : [ {
                xtype : 'form',
                buttonAlign :"center",
                layout: {
                    type: 'vbox',
                    padding:'50',
                    align: 'middle',
                    pack: 'center'
                },
                items : [ {
                    xtype : 'radiogroup',
                    fieldLabel : '周期',
                    allowBlank : false,
                    id: 'period',
                    margin : '10',
                    anchor : '90%',
                    items : [ {
                        xtype : 'radiofield',
                        name : 'period',
                        inputValue: 'day',
                        margin:'5',
                        id: 'day',
                        boxLabel : '日',
                        listeners: {
                            "focus": function () {
                                Ext.getCmp('cronStartTime1').setVisible(true);
                                Ext.getCmp('cronStartTime2').setVisible(false);
                                Ext.getCmp('cronStartTime3').setVisible(false);
                                Ext.getCmp('cronStartTime4').setVisible(false);
                                Ext.getCmp('cronStartTime1').format = '每天  H:i:s';
                            }
                        }
                    }, {
                        xtype : 'radiofield',
                        name : 'period',
                        inputValue: 'week',
                        margin:'5',
                        id: 'week',
                        boxLabel : '周',
                        listeners: {
                            "focus": function () {
                                Ext.getCmp('cronStartTime1').setVisible(false);
                                Ext.getCmp('cronStartTime2').setVisible(true);
                                Ext.getCmp('cronStartTime3').setVisible(false);
                                Ext.getCmp('cronStartTime4').setVisible(false);
                                Ext.getCmp('cronStartTime2').format ='每周DH:i:s';
                            }
                        }
                    }, {
                        xtype : 'radiofield',
                        name : 'period',
                        inputValue: 'month',
                        margin:'5',
                        id: 'month',
                        boxLabel : '月',
                        listeners: {
                            "focus": function () {
                                Ext.getCmp('cronStartTime1').setVisible(false);
                                Ext.getCmp('cronStartTime2').setVisible(false);
                                Ext.getCmp('cronStartTime3').setVisible(true);
                                Ext.getCmp('cronStartTime4').setVisible(false);
                                Ext.getCmp('cronStartTime3').format = '每月d日H:i:s';
                            }
                        }
                    }, {
                        xtype : 'radiofield',
                        name : 'period',
                        inputValue: 'year',
                        margin:'5',
                        id: 'year',
                        boxLabel : '年',
                        listeners: {
                            "focus": function () {
                                Ext.getCmp('cronStartTime1').setVisible(false);
                                Ext.getCmp('cronStartTime2').setVisible(false);
                                Ext.getCmp('cronStartTime3').setVisible(false);
                                Ext.getCmp('cronStartTime4').setVisible(true);
                                Ext.getCmp('cronStartTime4').format = '每年m月d日H:i:s';
                            }
                        }
                    } ]
                }, {
                    xtype : 'datetimefield',
                    anchor : '90%',
                    margin : '10',
                    format:'每天 ',
                    name : 'cronStartTime1',
                    id : 'cronStartTime1',
                    fieldLabel : '开始时间',
					emptyText: "--  请选择  --",
                    editable: true,
                    hidden : false,
                    // value:new Date(),
                    listeners: {
                        "select": function () {
                            //将选择的日期转换格式
                            var s=$('#cronStartTime1-inputEl').val();
                            var str=s.split('');
                            var a=str.splice(2);
                            if(a.length==10 && s!==''){
                                var pro1=a[8]+a[9]+' '+a[5]+a[6]+' '+a[2]+a[3]+' * * ?'
                            }
                            else{
                                Ext.Msg.alert('警示','您的输入格式不正确！！！');
                            }
                           me.pro1=pro1;
                        }
                    }
                }, {
                    xtype : 'datetimefield',
                    anchor : '90%',
                    margin : '10',
                    format:'每天 ',
                    name : 'cronStartTime2',
                    id : 'cronStartTime2',
                    fieldLabel : '开始时间',
					emptyText: "--  请选择  --",
                    editable: true,
                    hidden : true,
                    // value:new Date(),
                    listeners: {
                        "select": function () {
                            //将选择的日期转换为CRON表达式
                            var s=$('#cronStartTime2-inputEl').val();
                            var str=s.split('');
                            var a=str.splice(2);
                            if(a.length==9 && s!==''){
                                switch (a[0]){
                                    case '一':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'MON'
                                        break;
                                    case '二':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'TUE'
                                        break;
                                    case '三':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'WED'
                                        break;
                                    case '四':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'THU'
                                        break;
                                    case '五':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'FRI'
                                        break;
                                    case '六':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'SAT'
                                        break;
                                    case '日':
                                        var pro2=a[7]+a[8]+' '+a[4]+a[5]+' '+a[1]+a[2]+' ? *'+' '+'SUN'
                                        break;
                                }
                             }else{
                                Ext.Msg.alert('警示','您的输入格式不正确！！！');
                            }
                            me.pro2=pro2;
                        }
                    }
                }, {
                    xtype : 'datetimefield',
                    anchor : '90%',
                    margin : '10',
                    format:'每天 ',
                    name : 'cronStartTime3',
                    id : 'cronStartTime3',
                    fieldLabel : '开始时间',
					emptyText: "--  请选择  --",
                    editable: true,
                    hidden : true,
                    // value:new Date(),
                    listeners: {
                        "select": function () {
                            //将选择的日期转换格式
                            var s=$('#cronStartTime3-inputEl').val();
                            var str=s.split('');
                            var a=str.splice(2);
                            if(a.length==11 && s!==''){
                                var pro3=a[9]+a[10]+' '+a[6]+a[7]+' '+a[3]+a[4]+' '+a[0]+a[1]+' *'+' ?'
                            }
                            else{
                                Ext.Msg.alert('警示','您的输入格式不正确！！！');
                            }
                            me.pro3=pro3;
                        }
                    }
                }, {
                    xtype : 'datetimefield',
                    anchor : '90%',
                    margin : '10',
                    format:'每天 ',
                    name : 'cronStartTime4',
                    id : 'cronStartTime4',
                    fieldLabel : '开始时间',
					emptyText: "--  请选择  --",
                    editable: true,
                    hidden : true,
                    // value:new Date(),
                    listeners: {
                        "select": function () {
                            //将选择的日期转换格式
                            var s=$('#cronStartTime4-inputEl').val();
                            var str=s.split('');
                            var a=str.splice(2);
                            if(a.length==13 && s!==''){
                                var pro4=a[11]+a[12]+' '+a[8]+a[9]+' '+a[5]+a[6]+' '+a[2]+a[3]+' '+a[0]+' ?'+' *'
                            }else if(a.length==14 && s!==''){
                                var pro4=a[12]+a[13]+' '+a[9]+a[10]+' '+a[6]+a[7]+' '+a[3]+a[4]+' '+a[0]+a[1]+' ?'+' *'
                            }else{
                                Ext.Msg.alert('警示','您的输入格式不正确！！！');
                            }
                            me.pro4=pro4;
                        }
                    }
                }],
                buttons : [{
                    xtype : 'button',
                    text : '保存',
                    cmpTag : 'confirmaddfolder',
                    listeners :{
                        'click' :function() {
                            me.fireEvent('save');
                            me.hide();
                        }
                    }
                },{
                    xtype : 'button',
                    text : '取消',
                    cmpTag : 'canceladdfolder',
                    handler : function() {
                        me.hide();
                    }
                }]
            } ]
        });
        me.callParent(arguments);
    }
});


