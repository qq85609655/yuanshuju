Ext.define('Dep.databackup.model.DataBackupListModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : "id",
		type : "string"
	}, {
		name : "result",
		type : "string"
	}, {
		name : "fileName",
		type : "string"
	}, {
		name : "startTime",
		type : "string"
	}, {
		name : "endTime",
		type : "string"
	}, {
		name : "backUpPath",
		type : "string"
	}, {
		name : "password",
		type : "string"
	}, {
		name : "userName",
		type : "string"
	}, {
		name : "sid",
		type : "string"
	},{
		name : "cron",
		type : "string"
	}, {
		name : "period",
		type : "string"
	}, {
		name : "startTime",
		type : "string"
	}, {
		name : "startTimeStr",
		type : "string"
	} ]
});