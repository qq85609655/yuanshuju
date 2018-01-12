/**
 * 加入或移除元模型弹窗里的已选元模型列表所对应的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.SelectedMetaModelListStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metamodel.modelmng.model.MetaModelModel',
    proxy : {
				type : 'ajax', 				
				url : 'metamodelfolder/getMetaModelsByFolderId.do',	
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