/**
 * 枚举值集对象下拉框的store
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.store.ComboxEnumValueObjStore', {
	extend : 'Ext.data.Store',
    fields:[ 
        {name:'id', type: 'string'}, 
        {name:'name', type:'string'}
    ], 
    /*data:[ 
         {"id":"sex", "name":"性别"}, 
         {"id":"yesorno", "name":"是否"}, 
         {"id":"year", "name":"年份"}, 
         {"id":"month", "name":"月份"}, 
         {"id":"weekday", "name":"星期"},
         {"id":"evaluation", "name":"优良中差等"}
    ], */
    proxy : {
				type : 'ajax', 				
				url : 'metamodelenum/findEnumList.do',	
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