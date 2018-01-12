/**
 * 模板管理的弹窗
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.TemplateMngWindow', {
    extend: 'Ext.window.Window',
    modal : true,
    resizable : false,
	maximizable : false,
	autoDestroy : false,
	constrainHeader  : true,
	closable : true,
	closeAction : 'hide',
    height: 500,
    width: 900,
    title: '模板管理',
    
	constructor : function(conf) {
		var me = this;
		me.templateListGrid = me.getTemplateListGrid(conf.store);
		me.items = [me.templateListGrid];
		me.callParent();
	},
	/**
	 * 获取模板列表
	 * @return gridpanel
	 */
	getTemplateListGrid : function(store) {
		var me = this;
		if(!me.templateListGrid) {
			me.templateListGrid = Ext.create('Dep.metadata.gathermng.view.TemplateListGrid', {
				store : store
			});
		}
		return me.templateListGrid;
	}
});