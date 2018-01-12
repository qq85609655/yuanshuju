/**
 * 任务基本信息的数据模型
 * @author hww
 */
 Ext.define('Dep.metadata.gathermng.model.TaskModel', {
 		extend : 'Ext.data.Model',
 		fields: [
 		 {name: 'id', type: 'string'},//id（不显示）
         {name: 'jobName', type: 'string'},//任务名称
         {name: 'jobType', type: 'string'},//任务类型
         {name: 'dbpolicy',  type: 'string'},//入库策略
         {name: 'datasource',  type: 'string'},//数据源
         {name: 'remark',  type: 'string'},//描述
         {name: 'status',  type: 'int'},//状态
         {name: 'updateDate',  type: 'string'}//创建时间
        ],
        proxy : {
	     	type : 'ajax',
			api : {
				create : 'gather/task/add.do',
				update : 'gather/task/edit.do',
				destroy  : 'gather/task/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	    }
 });