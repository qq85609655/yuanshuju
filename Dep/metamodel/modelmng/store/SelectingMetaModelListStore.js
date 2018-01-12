/**
 * 待选元模型列表所对应的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.SelectingMetaModelListStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metamodel.modelmng.model.MetaModelModel',
    proxy : {
				type : 'ajax', 				
				url : 'metamodel/getAllMetaModels.do',	
				timeout : 120000,
				reader : {
					type : 'json',
					root : 'result'
				},
				getMethod : function() {
					return 'POST';
				}
				,
				writer : {
					type : 'json'
				}
			},
    autoLoad : false 
});