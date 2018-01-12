/**
 * 元数据审核第二级列表的Store
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.AuditInnerStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metadata.gathermng.model.GatherResultModel',
	proxy : { 
    	type : 'ajax', 
    	url : 'gather/querySubMDs.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
    autoLoad : false,
    data : []
    
});