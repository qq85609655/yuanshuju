/**
 * @author HeYuqing Img.js 2015年4月16日 上午11:04:34 TODO
 */
Ext.define('Dep.framework.editor.view.Img', {
			extend : 'Ext.Img',
			alias : 'widget.JHEImg',
			title : '图元工具箱',
			width : 60,
			height : 60,
			shape : null,
			isConnection : false,
			cls : "dragDropArea",
			fType : null,
			constructor : function(config) {
				var me = this;
				me.src = config.img;
				me.title = config.title;
				me.fType = config.fType;
				me.shape = config.shape;
				me.isConnection=config.isConnection?config.isConnection:me.isConnection;
				me.callParent(config);
			}
		});