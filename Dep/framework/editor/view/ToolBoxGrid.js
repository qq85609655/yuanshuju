Ext.define('Dep.framework.editor.view.ToolBoxGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ToolBoxGrid',
	// title : "test",
	// width : 150,
	// height : 300,
	hideHeaders : true,

	// 强制将grid的列填充满整个panel
	forceFit : true,
	columns : [{
		xtype : "gridcolumn",
		// columnWidth : "100%",
		autoScroll : true,
		dataIndex : 'description',
		renderer : function(value, metadata, record) {
			var src = record.get("img");
			return "&nbsp;&nbsp;<img style='vertical-align: middle;width:20; height:20;' width=20 height=20 src="
					+ src
					+ " />&nbsp;<span style='vertical-align: middle; color:green;font-weight:bold;'>"
					+ value + "</span>";
		}
	}],
	constructor : function(config) {
		var me = this;
		me.store = Ext.create("Ext.data.Store", {
					fields : [{
								name : "description",
								type : 'string'
							}, {
								name : "img",
								type : 'string'
							}, {
								name : "fType",
								type : 'string'
							}, {
								name : "isNoBussConnection",
								type : 'string'
							}, {
								name : "isPort",
								type : 'string'
							}, {
								name : "isConnection",
								type : 'string'
							}, {
								name : "connectionRelationKeys",
								type : 'Object'
							}, {
								name : "connectionConfig",
								type : 'Object'
							}, {
								name : "shape",
								type : 'string'
							}]
				})

		me.selModel = Ext.create('Ext.selection.RowModel', {
					mode : "SINGLE",
					checkOnly : true,
					allowDeselect : true,
					store : me.store,
					ignoreRightMouseSelection : true
				});
		this.callParent();
	}
});