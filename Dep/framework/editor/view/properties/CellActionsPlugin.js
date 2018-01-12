// vim: ts=4:sw=4:nu:fdc=4:nospell
/*global Ext */
// }}}
Ext.define('Dep.framework.editor.view.properties.CellActionsPlugin', {
	extend : 'Ext.AbstractPlugin',
    /**
     * 响应的事件名称
     */
	actionEvent: "cellclick",
    /**
     * 初始化方法
     * @param propertiesGrid
     */
    init : function(propertiesGrid) {
		this.propertiesGrid = propertiesGrid;
		var me = this;
		    //对propertiesgrid的configure方法设置前拦截，如果action为action field，这设置其默认renderer方法
        propertiesGrid.configure = Ext.Function.createInterceptor(
				propertiesGrid.configure, me.filterActionFieldRender, me);
        //监听after render方法，渲染之后监听click事件
		propertiesGrid.afterRender = Ext.Function.createSequence(propertiesGrid.afterRender,
				me.onRenderGrid, me);

	},
    /**
     * 过滤action field，设置其默认的renderer方法，默认渲染button。
     * @param config
     */
	filterActionFieldRender : function(config) {
		var me = this, filedConfig;
		for ( var fieldName in config) {
			filedConfig = config[fieldName];
			if (!filedConfig || !filedConfig.editor) {
				continue;
			}
			if (filedConfig.editor instanceof Ext.button.Button || filedConfig.editor.field instanceof Ext.button.Button) {
				filedConfig.renderer = me
						.getActionFieldRenderer(filedConfig.editor);
			}
		}
	},
    /**
     * 获取action field的渲染方法
     * @param editor
     * @return {Function}
     */
	getActionFieldRenderer : function(editor) {
		var me = this;
			fun = function(v) {
				if (!v) {
					return "<div class='controlBtn'>"
							+ '<input type=\"button\" value= '
							+ /*fieldConfig.buttonName +*/ ' cmpTag="'
							+ /*fieldConfig.cmpTag +*/ '" />' + "</div>";
				} else {
					return "<div class='controlBtn'>"
							+ '<input type=\"button\" value= ' + '已设置'
							+ ' cmpTag="' /*+ fieldConfig.cmpTag*/ + '" />'
							+ "</div>";
				}
			};
		return fun;

	},

	/**
	 * 渲染之后监听cell click事件。
	 * 
	 * @private
	 */
	onRenderGrid : function() {
		var me = this;
		me.propertiesGrid.on(me.actionEvent, me.cellclick, me);

	},

	cellclick : function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me = this,button;
		var btn = e.getTarget('.controlBtn', 10, true);
		if (!btn) {
			return true;
		}
		var propName = record.get(me.propertiesGrid.nameField);
		var editor = me.propertiesGrid.getConfig(propName, 'editor');
		if (editor) {
			if (editor instanceof Ext.grid.CellEditor) {
				button = editor.field;
			} else {
				button = editor;
			}
			if (button.handler) {
				button.handler.call();
			}

		}
	}

});
