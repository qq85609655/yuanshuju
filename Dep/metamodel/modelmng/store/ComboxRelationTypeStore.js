/**
 * 组合类型下拉框的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.ComboxRelationTypeStore', {
	extend : 'Ext.data.Store',
    fields:[ 
        {name:'id',   type:'string'}, 
        {name:'name', type:'string'}
    ], 
    data:[ 
         {"id":"1", "name":"一对一"}, 
         {"id":"N", "name":"一对多"}
    ], 
    autoLoad : false 
});