/**
 * 元模型属性中控件类型字段所对应下拉框的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.ComboxDisplayTypeStore', {
	extend : 'Ext.data.Store',
	fields:[ 
        {name:'id',   mapping:'enumKey',   type:'string'}, 
        {name:'name', mapping:'enumValue', type:'string'}
    ], 
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