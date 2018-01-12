/**
 * 临时表服务
 */
Ext.define(
        'Dep.databackup.view.DataBackupListGrid',
        {
            extend: 'Ext.panel.Panel',
            alias: 'widget.DataBackupListGrid',
            title: "",
            closable: false,
            layout : 'fit',
            border: true,
            autoScroll: false,
            constructor: function (obj) {
                var me = this;
                if (obj) {
                    me.store = obj.store;
                }
                me.callParent();
            },
            initComponent: function () {
                var me = this;
                me.grid = Ext.create(
                        'Ext.grid.Panel',
                        {
                            store: me.store,
                            forceFit: true,
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: '序号',
                                    width: 40
                                },
                                {
                                    text: "备份开始时间",
                                    dataIndex: 'startTime',
                                    align: "center",
                                    flex: 1,
                                },
                                {
                                    text: "备份完成时间",
                                    dataIndex: 'endTime',
                                    align: "center",
                                    flex: 1,
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: "备份文件名",
                                    dataIndex: 'fileName',
                                    align: "center",
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: "状态",
                                    dataIndex: 'result',
                                    align: "center",
                                    flex: 1,
                                    renderer: function (v) {
                                        var me = this;
                                        var val = "";
                                        if (v && me.store) {
                                            switch (v) {
                                                case "0":
//                                                    val = "备份中";
                                                	val = '<label style="color:blue;" >备份中...</label>';
                                                    break;
                                                case "1":
//                                                    val = "成功";
                                                    val = '<label style="color:darkturquoise;" >成功</label>';
                                                    break;
                                                case "-1":
//                                                    val = "失败";
                                                	 val = '<label style="color:red;" >失败</label>';
                                                    break;
                                            }
                                        }
                                        return val;
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: "删除",
                                    flex : 0.5,
                                    align: "center",
                                    renderer: Ext.bind(me.deleteBakRender,me),
                                    listeners: {
                                        click: function (grid,style,index) {
                                            me.fireEvent("deleteTheBackup",grid, index);
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: "还原",
                                    flex : 0.5,
                                    align: "center",
                                    renderer: Ext.bind(me.recoverBakRender,me),
                                    listeners: {
                                        click: function (grid,style,index) {
                                        	var status;
                                    		store = grid.getStore();
                                    		items = store.data.items;
                                    		status = items[index].get("result");
                                    		if(status!="1"){
                                    			return;
                                    		}
                                            me.fireEvent("recoverTheBackup",grid,index);
                                        }
                                    }
                                }],
                            tbar: {
                                xtype: 'toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: '立即备份',
                                        name: "startBak",
                                        cmpTag: 'startBackup',
                                        icon: "img/btn/backup.png"
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: "从",
                                        cmpTag: 'bakStartTime',
                                        name: 'startTime',
                                        labelAlign:"center",
                                        format: "Y-m-d",
                                        editable: false,
                                        labelWidth: 40,
                                        width: 250,
                                        minWidth: 150,
                                        value: Ext.util.Format.date(Ext.Date.add(new Date(), Ext.Date.DAY,-1))
                                    },
                                    '-',
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: "到",
                                        cmpTag: 'bakEndTime',
                                        name: 'endTime',
                                        labelAlign:"center",
                                        format: "Y-m-d",
                                        editable: false,
                                        labelWidth: 40,
                                        width: 250,
                                        minWidth: 150,
                                        value: Ext.util.Format.date(Ext.Date.add(new Date()))
                                    },
                                    {
                                        xtype: 'button',
                                        text: '查询(开始时间)',
                                        name: "queryBtn",
                                        iconCls: 'icon-search',
                                        cmpTag: 'searchBak',
                                        icon: "img/btn/search.png"
                                    },{
                                    	xtype: 'button',
                                    	text: '备份任务设置',
                                    	name: "bakSetting",
                                    	cmpTag: 'bakSetting',
                                    	icon: "img/btn/setting.png"
                                    }]
//                            },
//                            bbar: {
//                                xtype: 'pagingtoolbar',
//                                displayInfo: true,
//                                store: me.store,
//                                inputItemWidth: 50
                            },
                        });
                Ext.applyIf(me, {
                    items: [me.grid]
                });
                me.callParent(arguments);
            },
            // 渲染删除链接
            deleteBakRender: function (v, grid, index) {
                var me = this;
                return '<div><img style="vertical-align: middle;padding-right: 2px;" src="img/btn/delete.png"/><a href="#" style="color:blue;">' + '删除'
                    + '</a></div>';
            },
            // 渲染恢复链接
            recoverBakRender: function (v, grid, data) {
                var me = this;
                if(data.get("result") == "1"){
//                	return '<a href="#" style="background-image:url(img/btn/backup.png); color:blue;">' + '恢复'
//                	+ '</a>';
                	return '<div> <img style="vertical-align: middle;padding-right: 2px;" src="img/btn/recover.png"/><a href="#" style="color:blue;">' + '恢复'
                	+ '</a></div>';
                }else{
                	return '<div> <img style="vertical-align: middle;padding-right: 2px;" src="img/btn/recover-disable.png"/><label style="color:gray;">' + '恢复'
                	+ '</label></div>';
                }
            }
        });
