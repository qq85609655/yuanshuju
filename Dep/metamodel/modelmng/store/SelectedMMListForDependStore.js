/**
 * 依赖关系管理弹窗里的已选元模型列表所对应的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.SelectedMMListForDependStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metamodel.modelmng.model.MetaModelModel',
    proxy : {
				type : 'ajax', 				
				url : 'metamodeldepe/findDependedMMsById.do',	
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