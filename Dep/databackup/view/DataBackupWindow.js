/**
 * 视图管理的弹出窗口界面
 * @author hww
 */
Ext.define('Dep.databackup.view.DataBackupWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : true,
		maximizable : true,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		title : '系统备份和还原',
		titleAlign : 'left',
		layout : 'fit',
		closeAction : "hide",
		width : 1200,
		height : 700,
		constructor : function(conf) {
			var me = this;
			me.callParent();
		}
});