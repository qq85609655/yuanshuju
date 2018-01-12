/**
 * 元模型管理的弹出窗口界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.MetaModelMngWin', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : true,
		maximizable : true,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		title : '元模型管理',
		titleAlign : 'left',
		layout: 'border',
		closeAction : "hide",
		width : 1300,
		height : 735,
		maximized : false,
		minWidth : 1000,
		minHeight : 500,
		constructor : function(conf) {
			var me = this;
			//头部
			me.headerPanel = Ext.create('Ext.panel.Panel', {
		    	region : 'north',
		    	xtype : 'panel',
		    	frame: true,
		    	border : false,
		    	titleAlign : 'center',
		    	bodyPadding : 5,
		    	width : 1000,
				height : 100,
				html : '<div id="metamodelmng_id" style="font-size: 14px;"><b>操作说明：</b><br/>'+
						'1、当您切换到【元模型】标签页时，可在【检索】工具条对元模型进行检索，可在【继承】、【组合】标签页里管理元模型，以及在【用户】标签页里管理用户分类；<br/>'+
						'2、当您切换到【枚举】标签页时，可以对元模型所需的枚举值进行管理；提示：在右边的查看区域，将以图形的形式同步展示当前所操作的元模型及其关联关系。</div>'
	    
			});
			//检索面板
			me.searchPanel = Ext.create('Ext.panel.Panel', {
		    	xtype : 'panel',
		    	frame: false,
		    	border : false,
		    	title : "检索",
		    	titleAlign : 'center',
		    	bodyPadding : 0,
		    	width : 200,
				height : 52,
	    		tbar : [
	    			{   
	    				xtype : 'textfield',
					  	fieldLabel : '',
					  	cmpTag : 'querymmtextfield',
					  	width : 170
					},
	    			{   
	    				xtype : 'button',
					  	text : '',
					  	tooltip : '检索',
					  	tooltipType : 'title',
					  	cmpTag : 'querymmlistbtn',
					  	icon : 'img/btn/search.png'
					}
	    		]
			});
			//继承面板
			me.inheritPanel = Ext.create('Ext.tree.Panel', {
		    	xtype : 'treepanel',
		    	title : '&nbsp;&nbsp;继承&nbsp;&nbsp;',
		    	titleAlign : 'center',
		    	width : 200,
				height : 500,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 200,
				minHeight : 400,
				rootVisible : false,
				cmpTag : 'inherittree',
				animate : true,
				useArrows : true,
				collapsible : true,
				resizable : false,
				store : conf.inheritTreeStore
			});
			//组合面板
			me.compositionPanel = Ext.create('Ext.tree.Panel', {
		    	xtype : 'treepanel',
		    	title : '&nbsp;&nbsp;组合&nbsp;&nbsp;',
		    	titleAlign : 'center',
		    	width : 200,
				height : 500,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 200,
				minHeight : 400,
				rootVisible : true,
				cmpTag : 'compositiontree',
				animate : true,
				useArrows : true,
				collapsible : true,
				resizable : false,
				store : conf.compositionTreeStore
			});
			//用户面板
			me.userPanel = Ext.create('Ext.tree.Panel', {
		    	xtype : 'treepanel',
		    	title : '&nbsp;&nbsp;用户&nbsp;&nbsp;',
		    	titleAlign : 'center',
		    	width : 200,
				height : 500,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 200,
				minHeight : 400,
				rootVisible : true,
				cmpTag : 'usertree',
				animate : true,
				useArrows : true,
				collapsible : true,
				resizable : false,
				store : conf.userFolderTreeStore
			});
			//包含继承、组合和用户导航菜单所在的标签页面板
			me.navTabPanel = Ext.create('Ext.tab.Panel', {
		    	xtype : 'tabpanel',
		    	title : '',
		    	width : 200,
				height : 500,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 200,
				minHeight : 500,
				border : true,
				animate : true,
				resizable : false,
				items : [me.inheritPanel, me.compositionPanel, me.userPanel]
			});
			//显示元模型检索结果的panel
			me.queryResultPanel = Ext.create('Ext.tree.Panel', {
				store : conf.queryResultTreeStore,
				title : '',
		    	width : 200,
				height : 500,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 200,
				minHeight : 500,
				border : true,
				animate : true,
				resizable : false,
				hidden : true,
				cmpTag : 'queryresulttree',
				tbar : [{
					 xtype : 'button',
					 text : "返回",
					 icon : "Dep/metadata/resource/img/return.png",
					 cmpTag : 'gobackbtn'
				}]
			});
			//元模型面板
			me.metaModelVboxPanel = Ext.create('Ext.panel.Panel', {
		    	xtype : 'panel',
		    	frame: false,
		    	layout: 'vbox',
		    	title : "元模型",
		    	titleAlign : 'center',
		    	bodyPadding : 0,
		    	width : 200,
				height : 600,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 150,
				minHeight : 600,
				border : true,
	    		items : [me.searchPanel, me.navTabPanel, me.queryResultPanel]
			});
			//枚举面板
			me.enumTypeTreePanel = Ext.create('Ext.tree.Panel', {
		    	xtype : 'treepanel',
		    	title : '&nbsp;&nbsp;枚举&nbsp;&nbsp;',
		    	titleAlign : 'center',
		    	width : 200,
				height : 600,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 100,
				minHeight : 600,
				rootVisible : true,
				cmpTag : 'enumtree',
				animate : true,
				useArrows : true,
				collapsible : true,
				resizable : false,
				store : conf.enumTreeStore
			});
			//窗口西部区域的标签页面板
			me.westTabPanel = Ext.create('Ext.tab.Panel', {
				region : 'west',
		    	xtype : 'tabpanel',
		    	title : '系统菜单',
		    	width : 201,
				height : 600,
				maxWidth : 300,
				maxHeight : 1000,
				minWidth : 150,
				minHeight : 600,
				border : true,
				collapsible : false,
				animate : true,
				resizable : false,
				items : [me.metaModelVboxPanel, me.enumTypeTreePanel]
			});
			//图形编辑器所在的面板
			me.contentPanel = Ext.create('Ext.panel.Panel', {
		    	xtype : 'panel',
		    	title : '查看',
		    	titleAlign : 'center',
		    	width : 800,
				height : 500,
				layout:'fit',
		    	/*tbar: [
				  '->',{
				  	xtype : 'button',
				  	text : '清空',
				  	tooltip : '清空图形编辑器',
				  	tooltipType : 'title',
				  	cmpTag : 'cleanupbtn',
				  	icon : 'img/btn/cleanup.png',
				  	margin : '0 5 0 0'
				  }
				],*/
				items : []
			});
			//枚举管理的具体值列表
			me.enumValuesPanel = Ext.create('Dep.metamodel.modelmng.view.EnumValueMngGrid');
			//窗口中央区域的tab标签面板
			me.centerTabPanel = Ext.create('Ext.tab.Panel', {
				region : 'center',
		    	xtype : 'tabpanel',
		    	title : '',
		    	width : 800,
				height : 500,
				layout:'fit',
				border : true,
				collapsible : false,
				animate : true,
				resizable : false,
				items : [me.contentPanel]
			});
			me.items = [me.headerPanel, me.westTabPanel, me.centerTabPanel];
			me.callParent();
		},
		listeners : {
	        resize : {
	            fn: function(){ 
	            	var me = this;
	            	//document.body.offsetWidth  : 网页可见区域的宽度（包括边线的宽）
	            	//document.body.clientHeight : 网页可见区域的高度
	            	me.setXY([(document.body.offsetWidth-me.width)/2, (document.body.clientHeight-me.height)/2], true);
	            	me.navTabPanel.setHeight(me.height - 235);
	            	me.inheritPanel.setHeight(me.height - 300);
	            	me.compositionPanel.setHeight(me.height - 300);
	            	me.userPanel.setHeight(me.height - 300);
	            }
	        }
	    },
	    /**
		 * 获取弹窗页面头部面板
		 * @return {Ext.panel.Panel} headerPanel
		 */
		getHeaderPanel : function(){
			var me = this;
			return me.headerPanel;
		},
		/**
		 * 获取图形编辑器所在的面板
		 * @return {Ext.panel.Panel} contentPanel
		 */
		getContentPanel : function(){
			var me = this;
			return me.contentPanel;
		},
		/**
		 * 获取枚举值管理的列表
		 * @return {Ext.grid.Panel} enumValuesPanel
		 */
		getEnumValuesPanel : function(){
			var me = this;
			return me.enumValuesPanel;
		},
		/**
		 * 获取弹窗界面中部区域的tabpanel
		 * @return {Ext.tab.Panel} centerTabPanel
		 */
		getCenterTabPanel : function(){
			var me = this;
			return me.centerTabPanel;
		},
		/**
		 * 获取继承的树形面板
		 * @return {Ext.tree.Panel} inheritPanel
		 */
		getInheritPanel : function(){
			var me = this;
			return me.inheritPanel;
		},
		/**
		 * 获取组合的树形面板
		 * @return {Ext.tree.Panel} compositionPanel
		 */
		getCompositionPanel : function(){
			var me = this;
			return me.compositionPanel;
		},
		/**
		 * 获取用户的树形面板
		 * @return {Ext.tree.Panel} userPanel
		 */
		getUserPanel : function(){
			var me = this;
			return me.userPanel;
		},
		/**
		 * 获取枚举的树形面板
		 * @return {Ext.tree.Panel} enumTypeTreePanel
		 */
		getEnumTypeTreePanel : function(){
			var me = this;
			return me.enumTypeTreePanel;
		},
		/**
		 * 获取检索结果panel
		 */
		getQueryResultPanel : function() {
			var me = this;
			return me.queryResultPanel;
		},
		/**
		 * 获取继承组合用户的tab面板
		 */
		getNavTabPanel : function() {
			var me = this;
			return me.navTabPanel;
		}
		
});