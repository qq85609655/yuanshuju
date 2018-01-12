/**
 * 枚举值的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.EnumValueModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//枚举值id（不显示）
	         {name: 'enumId', type: 'string'},//值所属的枚举id
	         {name: 'enumKey', type: 'string'},//枚举的键
	         {name: 'enumValue',  type: 'string'}//枚举的值
	     ],
	     validations: [{
			        type: 'length',
			        field: 'enumId',
			        min: 1
			    }, {
			        type: 'length',
			        field: 'enumKey',
			        min: 1
			    }, {
			        type: 'length',
			        field: 'enumValue',
			        min: 1
			    }],
		proxy : {
	     	type : 'ajax',
			api : {
				create : 'metamodelenum/createvalue.do',
				update : 'metamodelenum/updatevalue.do',
				destroy  : 'metamodelenum/deletevalue.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });