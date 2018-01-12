/**
 * 采集结果列表的Store
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.GatherResultStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metadata.gathermng.model.GatherResultModel',
	proxy : { 
    	type : 'ajax', 
    	url : 'gather/findMDsByTaskBathId.do', 
    	reader : { type : 'json', root : 'result.pageData', totalProperty : 'result.totalProperty'}
    	
    }, 
    autoLoad : false,
    data : []
    
});