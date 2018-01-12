/**
 * @author HeYuqing Img.js 2015年4月16日 上午11:04:34 图形工具箱
 */
Ext.define('Dep.framework.editor.view.ToolBox', {
			extend : 'Ext.window.Window',
			alias : 'widget.ToolBox',
			title : '图元工具箱',
			constrain : true, // 限制只在浏览器里拖动（除了地址栏的所有地方都可以）
			floating : true, // 可以浮动
			collapsible : true, // 可以折叠
			draggable : true, // 可以拖动
			frame : true, // 四个角变圆，且内部填充蓝色
			minWidth : 85,
			width : 150,
			height : 300,
			closable : false,
			manager : Ext.ZIndexManager,
			layout : {
				type : 'accordion',
				animate : true
			},
			items : []
		});