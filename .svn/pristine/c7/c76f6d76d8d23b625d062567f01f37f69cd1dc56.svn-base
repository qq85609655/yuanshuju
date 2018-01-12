Ext.define('Dep.metadata.gathermng.view.TaskListGrid', {
	extend : 'Ext.grid.Panel',
	title : '任务列表',
	titleAlign : 'center',
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	margin : '10 0 0 0',
	columnLines : true,
	autoScroll : false,
	maxHeight : 200,
	width : '100%',
	constructor : function(conf) {
		var me = this;
		me.store = conf.store;
		me.callParent();
	},
	columns: [
        { text: '名称',  dataIndex: 'jobName' , flex: 1},
        { 
        	text: '入库策略',
        	dataIndex: 'dbpolicy',
        	renderer : function(value) {
        		var val = "";
				if(value=='TOTALITY'){
					val = '全量';
				}else if(value=='INCREMENT') {
					val = '增量';
				}
				return val;
        	},
        	flex: 1
        },
        { text: '数据源', dataIndex: 'datasource', flex: 1},
        { text: '描述', dataIndex: 'remark', flex: 1}, 
        { 
        	text: '操作', 
        	dataIndex:'id',
        	renderer : function(value,meta,record){  
		          var resultStr = "<div class='controlBtn'>" +     
		                            "<a href='javascript:(function exe(){Gather.ColumnLinker.fireEvent(`execute`, "+'"'+record.get('id')+'"'+");})();' name='execute'>执行</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
		                            "<a href='javascript:(function detail(){Gather.ColumnLinker.fireEvent(`executedetail`, "+'"'+record.get('id')+'"'+");})();' name='execute_detail'>执行详情</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
		                            "</div>";     
		          return resultStr;     
		        },     
        	flex: 1
        }
    ]
		
});