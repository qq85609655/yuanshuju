/**
 * 是否下拉框的store，“是”or“否”
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.ComboxYesOrNoStore', {
	extend : 'Ext.data.Store',
    fields:[ 
        {name:'id', type: 'boolean'}, 
        {name:'name',type:'string'}  
    ], 
    proxy : {
				type : 'ajax', 				
				url : 'metamodelquery/getYesOrNo.do',	
				reader : {
					type : 'json',
					root : 'result'
				},
				getMethod : function() {
					return 'GET';
				}
				,
				writer : {
					type : 'json'
				}
			},
    autoLoad : true 
});