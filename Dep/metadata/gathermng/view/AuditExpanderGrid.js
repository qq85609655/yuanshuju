/**
 * 测试元数据审核的嵌套grid的代码
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.AuditExpanderGrid' ,{
        extend: 'Ext.grid.Panel',
        alias : 'widget.auditexpandergrid',
        border : false,//边框
        columnLines : true,//添加列线
        columns : [
		        { text: '代码',  dataIndex: 'mdCode' , flex: 1},
		        { text: '名称', dataIndex: 'mdName', flex: 1},
		        { text: '变更时间', dataIndex: 'updateDate', flex: 1},
		        { 
		        	text: '操作', 
		        	dataIndex:'id',
		        	renderer : function(value,meta,record){  
				          var resultStr = "<div class='controlBtn'>" +     
				                            "<a href='javascript:(function detail(){Gather.ColumnLinker.fireEvent(`mddetail`, "+'"'+record.get('id')+'"'+", this);})();' name='detail'>详情</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
				                            "<a href='javascript:(function check(){Gather.ColumnLinker.fireEvent(`mdcheck`, "+'"'+record.get('id')+'"'+", this);})();' name='check'>审核</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
				                            "</div>";     
				          return resultStr;     
				        },     
		        	flex: 1
		        }
		    ],
        plugins : [ {
                // pluginId : 'rowExpander',
                ptype : 'rowexpander',
                rowBodyTpl : [
					 	'<div id="{id}">',
					 	'</div>'
           		]
   	 	} ],

        sortableColumns : false,
        autoScroll : true,
        stripeRows : true,
        title : '元数据审核',
        viewConfig : {
                enableTextSelection : true
        },
        listeners:{
            itemmouseenter:function( view, record, item, index, e, eOpts ){
            	var rowIndex=item.rowIndex;//第一行的样式没问题，排除第一行
            	if(rowIndex>0){
                    var styleSelect=item.previousSibling.className;
                    if(styleSelect.indexOf("x-grid-row-before-over")>1){
                        $("tr").removeClass("x-grid-row-before-over");
                    }
				}
             }
		},
        tbar : [
        	{
        		xtype : 'textfield',
        		fieldLabel : '名称&nbsp;',
        		cmpTag : 'auditnametf',
        		labelWidth : 40,
        		width : 200,
        		name : 'name'
        	},{
        		xtype : 'combo',
        		fieldLabel : '元模型&nbsp;',
        		cmpTag : 'auditmmcombo',
        		margin : '0 0 0 10',
        		labelWidth : 60,
        		width : 200,
        		name : 'mmId',
        		store: Ext.create('Dep.metadata.common.store.ComboStore',{
					url : Dep.metadata.url.metadatamng.getModelList,
					autoLoad : false
				}),
			    displayField: 'name',
			    valueField: 'id',
			    editable : true
        	},{
        		xtype : 'combo',
        		fieldLabel : '数据源&nbsp;',
        		cmpTag : 'auditdscombo',
        		margin : '0 0 0 10',
        		labelWidth : 60,
        		width : 200,
        		name : 'dataSource',
        		store: Ext.create('Dep.metadata.common.store.ComboStore',{
					url : 'gather/ds/queryAll.do',
					actionMethod : 'GET',
					autoLoad : false
				}),
			    displayField: 'name',
			    valueField: 'id',
			    editable : true
        	},{
        		xtype : 'combo',
        		fieldLabel : '任务&nbsp;',
        		cmpTag : 'audittaskcombo',
        		margin : '0 0 0 10',
        		labelWidth : 40,
        		width : 200,
        		name : 'jobId',
        		store: Ext.create('Dep.metadata.common.store.ComboStore',{
					url : 'gather/findTasksByDsId.do',
					actionMethod : 'GET',
					autoLoad : false
				}),
			    displayField: 'name',
			    valueField: 'id',
			    editable : false
        	},{
        		xtype : 'button',
        		text : '查询',
        		width : 60,
        		margin : '0 0 0 5',
        		cmpTag : 'auditsearchbtn2'
        	},{
        		xtype : 'button',
        		text : '审核',
        		width : 60,
        		margin : '0 0 0 5',
        		cmpTag : 'auditauditbtn'
        	}
    	],
	    initComponent: function() {
	        //调用父类的initComponent()方法               
	        this.callParent(arguments);

	    }
});
