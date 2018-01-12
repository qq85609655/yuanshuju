/**
 * 一个枚举类所对应的具体枚举值集合的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.EnumValueListStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metamodel.modelmng.model.EnumValueModel',
    proxy : {
				type : 'ajax', 				
				url : 'metamodelenum/findEnumValueList.do',	
				timeout : 120000,
				reader : {
					type : 'json',
					root : 'result'
				},
				getMethod : function() {
					return 'GET';
				}
				,
				writer : {
					type : 'json'
				}
			},
    autoLoad : false 
});