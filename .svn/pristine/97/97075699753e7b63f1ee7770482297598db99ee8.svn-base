/**
 * 组合关系的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.CompRelationModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//组合关系的ID
	 		 {name: 'name', type: 'string'},//组合关系的名称
	 		 {name: 'fromMID', type: 'string'},//起始元模型id
	 		 {name: 'fromMName', type: 'string'},//起始元模型名称
	 		 {name: 'toMID', type: 'string'},//被组合的元模型id
	 		 {name: 'toMName', type: 'string'},//被组合的元模型名称
	         {name: 'ownerMultiplicity', type: 'string'}, //所拥有的多重性
	         {name: 'toMultiplicity', type: 'string'}, //被组合的多重性
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
				create : 'metamodelcomp/create.do',
				update : 'metamodelcomp/update.do',
				destroy  : 'metamodelcomp/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });