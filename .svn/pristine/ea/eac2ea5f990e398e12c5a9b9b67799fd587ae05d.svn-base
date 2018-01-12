/**
 * 任务执行情况列表的Store
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.TaskExecuteInfoStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metadata.gathermng.model.TaskExecuteInfoModel',
	proxy : { 
    	type : 'ajax', 
    	url : 'gather/findDetailByTaskId.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
    autoLoad : false,
    data : []
    
});