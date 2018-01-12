/**
 * 
 */
Ext.define('Dep.framework.editor.view.CanvasSlider', {
			extend : 'Ext.panel.Panel',
	        alias : 'widget.CanvasView',
			closable : false,       //是否可关闭
			layout : 'border',     //border布局
			constructor : function(config) {
				var me = this;
				me.createTempPanel();
				me.items=[/*me.southPanel,me.northPanel,*/me.centerPanel/*,me.westPanel,me.eastPanel*/];
				me.callParent();
			},
			/**
			 * 创建临时容器用来填充编辑器
			 */
			createTempPanel : function() {
				var me = this;
				me.centerPanel = Ext.create('Ext.slider.Single', {
							height : 150,
							minValue : 0,
							maxValue : 3,
							vertical : true,
							plugins : new Ext.slider.Tip()
				});
			},
			/**
			 * 向编辑器中各个部分填充容器
			 */
			addToRegion : function(panel, region) {
				var me = this;
				if (!panel) {
					return null;
				}
				switch (region) {
					case "center" :
						me.centerPanel.add(panel);
						me.centerPanel.expand(false ); 
						break;
				}
			}
		});