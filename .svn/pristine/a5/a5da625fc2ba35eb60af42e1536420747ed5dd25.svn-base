/**
 * 任务执行情况列表
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.TaskExeInfoGrid', {
		extend : 'Ext.grid.Panel',
		title : '采集任务的执行情况',
		titleAlign : 'center',
		selModel : Ext.create('Ext.selection.CheckboxModel'),
		margin : '10 0 0 0',
		columnLines : true,
		autoScroll : false,
		maxHeight : 300,
		height : '100%',
		constructor : function(conf) {
			var me = this;
			me.store = conf.store;
			me.callParent();
		},
		columns: [
	        { text: '任务名称',  dataIndex: 'jobName', minWidth: 100, flex: 1},
	        { text: '数据源', dataIndex: 'dbsname', minWidth: 100, flex: 1},
	        { 
		        text: '任务状态', 
		        dataIndex: 'runStatus',
		        renderer : function(value) {
	        		var val = "";
					if(value==0){
						val = '未知';
					}else if(value==1) {
						val = '运行中';
					}else if(value==2) {
						val = '已完成';
					}
					return val;
	        	},
		        width: 70
	        },
	        { text: '总记录数', dataIndex: 'gatherNum', width: 80},
	        { text: '成功记录数', dataIndex: 'succeedNum', width: 80},
	        { text: '失败记录数', dataIndex: 'failNum', width: 80},
	        { text: '开始时间', dataIndex: 'startDate', minWidth: 160, flex: 1},
	        { text: '截止时间', dataIndex: 'endDate', minWidth: 160, flex: 1},
	        { 
	        	text: '操作', 
	        	dataIndex:'id',
	        	renderer : function(value,meta,record){  
			          var resultStr = "<div class='controlBtn'>" +     
			                            "<a href='javascript:(function result(){Gather.ColumnLinker.fireEvent(`resultdetail`, "+'"'+record.get('id')+'"'+");})();' name='execute'>采集结果详情</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
			                            "<a href='javascript:(function showlog(){Gather.ColumnLinker.fireEvent(`showloginfo`, "+'"'+record.get('id')+'"'+");})();' name='execute_detail'>查看日志</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
			                            "</div>";     
			          return resultStr;     
			        },     
	        	width: 160
	        }
	    ]
});