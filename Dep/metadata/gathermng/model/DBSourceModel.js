/**
 * DB采集配置（数据源）的数据模型
 * @author hww
 */
 Ext.define('Dep.metadata.gathermng.model.DBSourceModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//id（不显示）
	         {name: 'dbsName', type: 'string'},//数据源名称
	         {name: 'adapter', type: 'string'},//适配器(excel适配器/dbSchema适配器)
	         {name: 'dataPath',  type: 'string'},//数据源悬挂点
	         {name: 'remark', type: 'string'},//描述
	         {name: 'dbsParam', type: 'auto'} //数据源参数，创建一个map对象set进来
	     ],
	     proxy : {
	     	type : 'ajax',
			api : {
				create : 'gather/ds/add.do',
				update : 'gather/ds/edit.do',
				destroy  : 'gather/ds/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });
