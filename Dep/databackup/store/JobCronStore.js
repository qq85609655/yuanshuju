Ext.define('Dep.databackup.store.JobCronStore', {
	extend : 'Ext.data.Store',
	model : 'Dep.databackup.model.JobCronModel',
    proxy : {
        type : 'ajax',
        url : 'backup/list.do',
        pageParam:undefined,
        limitParam:undefined,
        reader : { type : 'json', root : 'result'},
    },
	root : "resultObject",
	actionMethod : 'POST',
	autoLoad : false,
	isPageing : false,
	displayWait : true
});
