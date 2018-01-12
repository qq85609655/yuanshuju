/**
 * 元数据审核第一级列表的Store
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.AuditFirstStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metadata.gathermng.model.GatherResultModel',
	proxy : { 
    	type : 'ajax', 
    	url : 'gather/queryMDs.do', 
    	reader : { type : 'json', root : 'result.pageData', totalProperty : 'result.totalProperty'}
    	
    }, 
    autoLoad : false,
    data : []
    
});