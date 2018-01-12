Ext.define('Dep.metadata.gathermng.view.TemplateListGrid', {
	extend : 'Ext.grid.Panel',
	height: 442,
    title: '',
    columnLines: true,
	dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '名称&nbsp;&nbsp;',
                            labelAlign: 'right',
                            labelWidth: 40,
                            name: 'name',
                            cmpTag: 'templatename'
                        },
                        {
                            xtype: 'button',
                            width: 50,
                            text: '查询',
                            hidden: true,
                            cmpTag: 'templatesearch'
                        }
                    ]
                }
            ],
    columns: [
        {
            xtype: 'rownumberer',
            align: 'center',
            width: 40,
            text: '编号'
        },
        {
            dataIndex: 'name',
            align: 'left',
            text: '名称',
            width: 160
        },
        {
            dataIndex: 'remark',
            align: 'left',
            text: '备注',
            flex: 1
        },
        {
            dataIndex: 'updateDate',
            align: 'left',
            text: '时间',
            width: 200
        },
        {
            text: '操作',
            align: 'center',
            dataIndex:'id',
            renderer : function(value,meta,record){  
		        var resultStr = "<div class='controlBtn'>" +     
		                            "<a href='javascript:(function download(){Gather.ColumnLinker.fireEvent(`download`, "+'"'+record.get('id')+'"'+");})();' name='execute'>下载</a>" +     
		                            "</div>";     
		        return resultStr;     
	        }, 
            width: 100
        }
    ],
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    })
          
});