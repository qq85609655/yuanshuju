Ext.define('Dep.databackup.store.DataBackupListStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.databackup.model.DataBackupListModel',
	autoLoad:false,
	 proxy : {  
	     type : 'ajax',  
	     url : 'backup/list.do',
	     pageParam:undefined,
	     limitParam:undefined,
	     reader : { type : 'json', root : 'result'},  
	 },  
});