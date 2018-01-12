var Dep = Dep || {};
Dep.metamodel = Dep.metamodel || {};
Ext.define('Dep.metamodel.modelmng.app',{
	extend:'Ext.app.Application',
	name : 'Dep.metamodel.modelmng',
	appFolder : 'Dep/metamodel/modelmng',	
	controllers : ['MetaModelController'],
	launch : function() {
	}
});