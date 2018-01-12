/**
 * 元数据审核面板查询出的元数据列表(已废弃)
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.AuditMetaDataGrid', {
		extend : 'Ext.grid.Panel',
    	width : '100%',
    	title : '',
    	columnLines : true,
    	autoScroll : true,
    	maxHeight : 640,
    	height : 640,
    	selModel : Ext.create('Ext.selection.CheckboxModel'),
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
	        		cmpTag : 'auditsearchbtn'
	        	},{
	        		xtype : 'button',
	        		text : '审核',
	        		width : 60,
	        		margin : '0 0 0 5',
	        		cmpTag : 'auditauditbtn'
	        	}
	    	],
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
		    ]
    		
});

