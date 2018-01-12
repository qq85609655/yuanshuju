/**
 * 公共的下拉框
 */
Ext.define('ComboModel', {
    extend: 'Ext.data.Model',
    fields: [
             {name: 'id',  type: 'string'},
             {name: 'name',  type: 'string'},
		     // {name: 'veiwName',  type: 'string'},
		     // {name: 'fromMmId',  type: 'string'}
    ]
});

Ext.define('Dep.metadata.common.store.ComboStore', {
	extend : 'Ext.data.Store', // Store里存放具体数据信息
	actionMethod : 'POST',
	model : "ComboModel",
	constructor : function(config) {
		var me = this;
		me.initCfgs(config);
		me.callParent([config]);
	},
	/**
	 * 初始化代理配置
	 */
	initProxyCfg : function(cfg){
		var me = this;
		var proxy = new Ext.data.proxy.Ajax({
			url : cfg.url,
			reader : {
				type : 'json',
				root : cfg.root ? cfg.root : "result"
			},
			getMethod : function() {
				return me.actionMethod;
			}
		});
		me.setProxy(proxy);
	},
	/**
	 * 初始化自身配置
	 */
	initCfgs : function(cfg){
		var me = this;
		if(cfg){
			me.autoLoad = cfg.autoLoad ? cfg.autoLoad : true;
			//初始化proxy配置
			me.initProxyCfg(cfg);
			me.initModelCfg(cfg);
		}
	},
	/**
	 * 初始化model配置
	 */
	initModelCfg : function(cfg){
		var me = this;
		if(cfg && cfg.model)me.model = cfg.model;
	}
});