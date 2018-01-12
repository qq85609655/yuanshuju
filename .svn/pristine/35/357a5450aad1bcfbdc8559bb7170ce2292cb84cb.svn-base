/**
 * 主页面
 */
Ext.define("Dep.metadata.main.view.MainView", {
	extend : "Ext.panel.Panel",
	layout : 'border',
	border : null,	
	autoHeight : true,
	items :[],
	constructor : function() {
		var me = this;
		me.createPanel();
		me.items=[me.headerPanel,me.contentPanel];
		me.callParent();
	},
	createPanel : function(){
		var headerH =70;
		var me = this;
		//创建Header
		me.headerPanel = Ext.create("Ext.panel.Panel", {
			border : null,
			region : "north",
			height :headerH,
			items :[{
				xtype :"panel",
				height : headerH,
				border : null,
				defaults: {                     //设置每一列的子元素的默认配置
			        layout: 'anchor',
			        defaults: {
			            anchor: '100%'
			        }
			    },
				layout:'column',
                items :[
                 {
                	 width: 280,
                	 border :null,
                	 items :[{
                		xtype: "panel",
                		border : null,
                     	height : headerH,
                     	bodyStyle: {
                            background: 'url(img/page/top-new-4.jpg) no-repeat scroll 0 0 '
                        }
                	 }]
                 },{
                	 columnWidth: .99,
                	 border :null,
                	 items :[{
                		xtype: "panel",
                		border : null,
                     	height : headerH,
                     	bodyStyle: {  
                             background: "#364050"
                        },
                        html:"<div>"+
	                        	"<ul class='ul-topmenu'>"+
	                        		"<li class='li-selected'><a href='#'>元数据管理</a></li>"+
	                        		"<li><a href='javascript:void(0);' onclick='Dep.EventManager.fireEvent(\"showModule\",\"Dep.metadata.viewmng\",\"Dep.metadata.viewmng.app\")' class='toptwo'>视图管理</a></li>"+
	                        		"<li><a href='javascript:void(0);' onclick='Dep.EventManager.fireEvent(\"showModule\",\"Dep.metadata.gathermng\",\"Dep.metadata.gathermng.app\")' class='topthree'>采集管理</a></li>"+
	                        		"<li><a href='javascript:void(0);' onclick='Dep.EventManager.fireEvent(\"showModule\",\"Dep.metamodel.modelmng\",\"Dep.metamodel.modelmng.app\")' class='topfour'>元模型管理</a></li>"+
	                        		//"<li><a href='javascript:void(0);' onclick='Dep.EventManager.fireEvent(\"showModule\",\"Dep.databackup\",\"Dep.databackup.app\")' class='topfive'>系统备份</a></li>"+
		                        	
	                        	"</ul>"+
	                        	"<div style='height: 80px; float: right; width: 200px;padding-right: 10px;text-align: end;font-family: \"微软雅黑\",\"microsoft yahei\",tahoma,helvetica,arial;'>" +
						            "<div style='padding: 25px 5px 0 0;'>" +
						                  "<img align='top' src='img/login/user.png' alt='imgUser' width='20'>&nbsp;&nbsp;" +
						                  "<span style='color:#ffffff'>欢迎您，"+currentUserName+" &nbsp;&nbsp;|&nbsp;</span>" +
	                        	           //此处加入单点登录
	                        	           "<a href='"+me.getBasePath()+"auth/admin/logout.do' style='text-decoration: none;color:#fbd2b5'>退出</a></div></div>"+
	                        	          // "<a href='http://218.29.223.194:43239/dmm_cas/logout' style='text-decoration: none; color:#fbd2b5'>退出</a>" +
						            "</div>" +
						         "</div>"+
                        	"</div>"
                	 }]                	 
                 }]
			}]
		});
		me.contentPanel = Ext.create("Ext.panel.Panel", {
			border : null,
			region : "center",
			layout:'fit'
		});	
	},
	/**
	 * 获取头部panel
	 */
	getHeaderPanel : function(){
		var me = this;
		return me.headerPanel;
	},
	getContentPanel : function(){
		var me = this;
		return me.contentPanel;
	},
	/**
	 * 获取系统部署的根路径
	 * @return {string} basePath 如："http://localhost:8080/dep-metadata-core-webapp/"
	 */
	getBasePath : function (){
		var obj = window.location;
		var contextPath = obj.pathname.split("/")[1];
		var basePath=obj.protocol+"//"+obj.host+"/"+contextPath+"/";
		return basePath;
	}
});