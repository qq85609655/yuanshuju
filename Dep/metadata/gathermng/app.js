var Dep = Dep || {};
Dep.metadata = Dep.metadata || {};
Ext.define('Dep.metadata.gathermng.app',{
	extend:'Ext.app.Application',
	name : 'Dep.metadata.gathermng',
	appFolder : 'Dep/metadata/gathermng',	
	controllers : ['GatherMngController'],
	launch : function() {
	}
});
Ext.define('Gather.ColumnLinker', {
	mixins : {
		observable : 'Ext.util.Observable'
	},
	constructor : function(config) {
		this.mixins.observable.constructor.call(this, config);
	}
});