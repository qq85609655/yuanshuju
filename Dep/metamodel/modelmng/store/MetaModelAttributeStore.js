/**
 * 一个元模型的属性列表所对应的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.MetaModelAttributeStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metamodel.modelmng.model.MetaModelAttributeModel',
    proxy : {
				type : 'ajax', 				
				url : 'metamodelquery/getModelAttrsByMid.do',	
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