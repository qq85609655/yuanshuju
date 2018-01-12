/**
 * 元数据树Store
 */
Ext.define("Dep.metadata.metadatamng.store.QueryMappingStore", {
    extend : "Ext.data.Store",
    autoLoad : false,
    model : 'Dep.metadata.metadatamng.model.QueryMappingModel',
//    proxy : {
//		type : 'ajax',
//		actionMethods :'POST',
//		url : 'metadata/queryPassiveMapping.do',
//		reader : {
//			type : 'json',
//			root : 'result'
//		},
//	    extraParams : {
//			
//		}
//	},
    
});