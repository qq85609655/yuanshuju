/**
 * 审批下拉框的store，发布表示审批通过，拒绝表示审批不通过，不予发布
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.ApprovalPublishStore', {
	extend : 'Ext.data.Store',
    fields:[ 
        {name:'id', type: 'boolean'}, 
        {name:'name',type:'string'}  
    ], 
    data:[ 
         {"id":"true", "name":"发布"}, 
         {"id":"false", "name":"拒绝"} 
    ], 
    autoLoad:true 
});