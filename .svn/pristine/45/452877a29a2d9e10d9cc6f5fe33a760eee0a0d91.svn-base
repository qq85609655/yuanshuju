/**
 * 枚举的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.EnumModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//枚举id（不显示）
	 		 {name: 'name', type: 'string'},//枚举名称
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
				create : 'metamodelenum/create.do',
				update : 'metamodelenum/update.do',
				destroy  : 'metamodelenum/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });