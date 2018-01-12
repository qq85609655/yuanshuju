/**
 * 审核下拉框的store，通过or拒绝
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.AuditStore', {
	extend : 'Ext.data.Store',
    fields:[ 
        {name:'id', type: 'boolean'}, 
        {name:'name',type:'string'}  
    ], 
    data:[ 
         {"id":"true", "name":"通过"}, 
         {"id":"false", "name":"拒绝"} 
    ], 
    autoLoad:true 
});