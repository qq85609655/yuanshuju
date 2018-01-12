/**
 * 元数据树Store
 */
Ext.define("Dep.metadata.metadatamng.store.MDMapSubStore", {
    extend : "Ext.data.Store",
    autoLoad : true,
    proxy : {
		type : 'ajax',
		actionMethods :'POST',
		url : 'metadata/queryMD2.do',
		reader : {
			type : 'json',
			root : 'result'
		},
	extraParams : {
			
		}
	},
    model : 'Dep.metadata.metadatamng.model.MDMapSubModel'
});