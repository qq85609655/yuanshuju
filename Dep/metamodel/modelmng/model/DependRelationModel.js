/**
 * 依赖关系的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.DependRelationModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//依赖关系的ID
	 		 {name: 'name', type: 'string'},//依赖关系的名称
	 		 {name: 'fromMid', type: 'string'},//起始元模型id
	 		 {name: 'fromMName', type: 'string'},//起始元模型名称
	 		 {name: 'toMid', type: 'string'},//被依赖的元模型id
	 		 {name: 'toMName', type: 'string'},//被依赖的元模型名称
	 		 {name: 'remark', type: 'string'} //描述、备注
	     ],
	     validations: [{
			        type: 'length',
			        field: 'name',
			        min: 1
			    }],
		proxy : {
	     	type : 'ajax',
			api : {
				create : 'metamodeldepe/create.do',
				update : 'metamodeldepe/update.do',
				destroy  : 'metamodeldepe/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });