/**
 * 
 */
Ext.define('Dep.framework.editor.view.BussListGrid', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.bussListGrid',
			autoScoll:true,
			flex : 1,
			forceFit: true,
			selModel: new Ext.selection.CheckboxModel({checkOnly:false}),
			columns : [],
			/**
			 * 构造器初始化配置信息
			 */
			constructor : function(config) {
				var me = this;
				me.title = config.title;
				me.store = config.store;
				me.columns = config.columns;
				this.callParent();
			}
			

		});