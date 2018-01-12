//编辑器加载打开tip
Ext.tip.QuickTipManager.init();

// Apply a set of config properties to the singleton
Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
    maxWidth: 200,
    minWidth: 100,
    showDelay: 20      // Show 50ms after entering target
});
/**
 * 
 */
Ext.define('Dep.framework.editor.view.EditorView', {
			extend : 'Ext.panel.Panel',
	        alias : 'widget.EditorView',
			closable : false,       //是否可关闭
			layout : 'border',     //border布局
			border : false,
			/**
			 * 默认属性配置
			 */
			centerConfig:{
				region : "center",
				header :false,
				layout : 'fit',
				border : false,
//				width : 200,
//				maxWidth : 300,
				title : "center",
				collapsible : true,
				collapseMode:"mini",
//				collapsed:true,
				split : true
			},
			/**
			 * 默认属性配置
			 */
			southConfig:{
				region : "south",
				height : 200,
//				maxWidth : 300,
				header :false,
				title : "south",
				layout : 'fit', 
				border : false,
				collapsible : true,
				collapseMode:"mini",
				collapsed:true,
				split : true
			},
			/**
			 * 默认属性配置
			 */
			northConfig:{
				region : "north",
				header :false,
				height : 200,
				border : false,
//				maxWidth : 300,
				layout : 'fit', 
				title : "north",
				collapseMode:"mini",
				collapsed:true,
				collapsible : true,
				split : true
			},
			/**
			 * 默认属性配置
			 */
			westConfig:{
				region : "west",
				header :false,
				width : 200,
				border : false,
//				maxWidth : 300,
				layout : 'fit', 
				title : "west",
				collapseMode:"mini",
				collapsed:true,
				collapsible : true,
				split : true
			},
			/**
			 * 默认属性配置
			 */
			eastConfig:{
				region : "east",
				header :false,
				width : 200,
//				maxWidth : 300,
				title : "east",
				layout : 'fit', 
				border : false,
				collapseMode:"mini",
				collapsed:true,
				collapsible : true,
				split : true
			},
			/**
			 * 构造函数
			 */
			constructor : function(config) {
				var me = this;
				me.createTempPanel(config);
//				me.items=[me.southPanel,me.northPanel,me.centerPanel,me.westPanel,me.eastPanel];
				me.items=[me.centerPanel];
				if(me.southPanel) {//是否初始化了该区域
					me.items.push(me.southPanel);
				}
				if(me.northPanel) {//是否初始化了该区域
					me.items.push(me.northPanel);
				}
				if(me.westPanel) {//是否初始化了该区域
					me.items.push(me.westPanel);
				}
				if(me.eastPanel) {//是否初始化了该区域
					me.items.push(me.eastPanel);
				}
				me.callParent(/*arguments*/);
			},
			/**
			 * 创建临时容器用来填充编辑器
			 */
			createTempPanel : function(config) {
				if(!config) {
					config = {};
				}
				var me = this;
				if(config.center ) {//配置了并且没有设置为隐藏
					me.centerConfig = Ext.apply(me.centerConfig,config.center);
				}
				//中间区域必须初始化，配置unInit无效。
				me.centerPanel = Ext.create('Ext.panel.Panel', me.centerConfig);
				
				//如果配置了属性且属性中没有要求unInit区域，初始化该区域。
				//注意：增加了unInit属性，unInit认为不初始化该区域。
				if(!config.south  ||(config.south && !config.south.unInit)) {
					me.southConfig = Ext.apply(me.southConfig,config.south);
					me.southPanel = Ext.create('Ext.panel.Panel',me.southConfig );
				}
				
				//如果配置了属性且属性中没有要求unInit区域，初始化该区域。
				//注意：增加了unInit属性，unInit认为不初始化该区域。
				if(!config.north  ||(config.north && !config.north.unInit)) {
					me.northConfig = Ext.apply(me.northConfig,config.north);
					me.northPanel = Ext.create('Ext.panel.Panel',me.northConfig );
				}
				//如果配置了属性且属性中没有要求unInit区域，初始化该区域。
				//注意：增加了unInit属性，unInit认为不初始化该区域。
				if(!config.west  ||(config.west && !config.west.unInit)) {
					me.westConfig = Ext.apply(me.westConfig,config.west);
					me.westPanel = Ext.create('Ext.panel.Panel', me.westConfig);
				}
				//如果配置了属性且属性中没有要求unInit区域，初始化该区域。
				//注意：增加了unInit属性，unInit认为不初始化该区域。
				if(!config.east  ||(config.east && !config.east.unInit)) {
					me.eastConfig = Ext.apply(me.eastConfig,config.east);
					me.eastPanel = Ext.create('Ext.panel.Panel',me.eastConfig );
				}
				
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
					case "south" :
						if(!me.southPanel) {
							throw "没有初始化south区域。"
						}
						me.southPanel.add(panel);
						me.southPanel.expand(false ); 
						break;
					case "west" :
						if(!me.westPanel) {
							throw "没有初始化west区域。"
						}
						me.westPanel.add(panel);
						me.westPanel.expand(false ); 
						break;
					case "center" :
						if(!me.centerPanel) {
							throw "没有初始化center区域。"
						}
						me.centerPanel.add(panel);
						me.centerPanel.expand(false ); 
						break;
					case "east" :
						if(!me.eastPanel) {
							throw "没有初始化east区域。"
						}
						me.eastPanel.add(panel);
						me.eastPanel.expand(false ); 
						break;
					case "north" :
						if(!me.northPanel) {
							throw "没有初始化north区域。"
						}
						me.northPanel.add(panel);
						me.northPanel.expand(false); 
						break;
				}
			},
			/**
			 * 根据方位获取panel
			 * @param {} region
			 */
			getPanelByRegion : function(region){
			  var me = this,regionPanel=null;
				switch (region) {
					case "south" :
						if(!me.southPanel) {
							throw "没有初始化south区域。"
						}
						regionPanel=me.southPanel;
						break;
					case "west" :
						if(!me.westPanel) {
							throw "没有初始化west区域。"
						}
						regionPanel=me.westPanel; 
						break;
					case "center" :
						if(!me.centerPanel) {
							throw "没有初始化center区域。"
						}
						regionPanel=me.centerPanel ; 
						break;
					case "east" :
						if(!me.eastPanel) {
							throw "没有初始化east区域。"
						}
						regionPanel=me.eastPanel ; 
						break;
					case "north" :
						if(!me.northPanel) {
							throw "没有初始化north区域。"
						}
						regionPanel=me.northPanel ; 
						break;
				}
				return regionPanel;
			},
			/**
			 * 添加docked
			 */
			addToDocked: function(parms) {
				
			}
		});