/**
 * 数据类型下拉框的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.ComboxDatatypeStore', {
	extend : 'Ext.data.Store',
    fields:[ 
        {name:'id',   mapping:'enumKey',   type:'string'}, 
        {name:'name', mapping:'enumValue', type:'string'}
    ], 
    /*data:[ 
         {"id":"string", "name":"字符串"}, 
         {"id":"int", "name":"整数型"}, 
         {"id":"float", "name":"浮点型"}, 
         {"id":"boolean", "name":"布尔类型"}, 
         {"id":"date", "name":"日期类型"},
         {"id":"auto", "name":"默认类型"}
    ],*/ 
    proxy : {
				type : 'ajax', 				
				url : 'metamodelenum/findEnumValueList.do',	
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
    autoLoad : false 
});