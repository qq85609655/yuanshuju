/**
 * 公共的store
 */
Ext.define('Dep.metadata.common.store.PageStore', {
	extend : 'Ext.data.Store', // Store里存放具体数据信息
	url : null,
	actionMethod : 'POST',
	model : null,
	constructor : function(config) {
		var me = this;
		if(!config.url)me.url = config.url;
		me.initProxyCfg(config);
		me.callParent([config]);
	},
	/**
	 * 初始化代理配置
	 */
	initProxyCfg : function(cfg){
		var me = this;
		var proxy = new Ext.data.proxy.Ajax({
			url : cfg.url,
			limitParam : "limit",
			pageParam : "page",
			reader : {
				type : 'json',
				root : me.root,
				totalProperty : null// 数据的总数
//				successProperty : 'success',  //默认就是success
//				messageProperty : 'resultText'
			},
			getMethod : function() {
				return me.actionMethod;
			}
		});
		me.setProxy(proxy);
	}
});