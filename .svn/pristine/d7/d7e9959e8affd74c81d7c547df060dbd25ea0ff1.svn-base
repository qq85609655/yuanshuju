/**
 * 元数据store
 */
Ext.define("Dep.metadata.metadatamng.store.MDStore", {
    extend: "Ext.data.Store",  
	fields : null,
	autoLoad : true,
    proxy : {  
        type : 'ajax',  
        url : "",//请求  
        limitParam : null,
		pageParam : null,
        reader : { type : 'json',root : 'result'},   //数据  
        extraParams : {modelId:""}  //传参
    },
	constructor : function(cfg){
		var me = this;
		//配置字段
		me.fields = [{
			name : 'id',
			type : 'string'
		},{
			name : 'mdName',
			type : 'string'
		}, {
			name : 'mdCode',
			type : 'string'
		}, {
			name : 'mmName',
			type : 'string'
		}];		
		if(cfg && cfg.fieldData){
			me.fields = me.bulidFields(cfg.fieldData,me.fields);
		}
		me.callParent();
	},
	/**
	 * 配置字段
	 * @param data
	 */
	bulidFields : function(data,ar){
		var me = this,fields=[];
		if(data){
			for(var i=0;i<data.length;i++){
				ar.push({name:data[i].code,type:"string"});
			}
		}
		return ar;
	}
});