/**
 * 版本信息store
 */
Ext.define("Dep.metadata.metadatamng.store.MDVersionStore", {
    extend: "Ext.data.Store",  
	fields : null,
	autoLoad : false,
	constructor : function(cfg){
		var me = this;
		//配置字段
		me.fields = [{
			name : 'versionId',
			type : 'string'
		},{
			name : 'userver',
			type : 'string'
		}, {
			name : 'mdCode',
			type : 'string'
		}, {
			name : 'mdName',
			type : 'string'
		}, {
			name : 'verRemark',
			type : 'string'
		},{
			name : 'isNewVersion',
			type : 'boolean'
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