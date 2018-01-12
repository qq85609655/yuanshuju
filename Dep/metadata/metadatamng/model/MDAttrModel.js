/**
 * 元数据属性model
 */
Ext.define('Dep.metadata.metadatamng.model.MDAttrModel', {
	extend : 'Ext.data.Model',
	fields : [
	          {name:"id",type:"string"},
	          {name:"mmAttId",type:"string"},
	          {name:"mmAttName",type:"string"},
	          {name:"mdId",type:"string"},
	          {name:"valUe",type:"string"}
	],
	belongsTo:'Dep.metadata.metadatamng.model.MDModel'
});
