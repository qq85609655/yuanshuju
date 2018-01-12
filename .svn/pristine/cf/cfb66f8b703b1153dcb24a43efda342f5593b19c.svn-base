/**
 * Excel采集模板列表的Store
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.TemplateStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.metadata.gathermng.model.TemplateModel',
	proxy : { 
    	type : 'ajax', 
    	url : 'gather/template/queryAll.do', 
    	reader : { type : 'json', root : 'result'}
    	
    }, 
    autoLoad : false,
    data : []
    
});