Ext.define('Dep.metadata.main.controller.MainController', {
			extend : 'Ext.app.Controller',
			init : function() {
				var me = this;
				Ext.QuickTips.init();
				Ext.form.Field.prototype.msgTarget='under';
				Dep.EventManager = Ext.create('Dep.EventManager'); // 创建根对象
				Dep.EventManager.on('showModule',function(appNs,appName) {
					me.showModule(appNs,appName);
				});
				me.tmpApp = new Ext.util.MixedCollection(),
				Dep.metadata.MainController = me.showModule;//改为全局方法
				//创建界面
				var mainView = Ext.create("Dep.metadata.main.view.MainView");
				var viewport = Ext.create("Ext.container.Viewport", {
					title : '',
					autoHeight : true,
					layout : 'fit',
					items :[mainView]
				});
				Dep.metadata.mainView = mainView;//设为全局变量
				
				me.showModule("Dep.metadata.metadatamng", "Dep.metadata.metadatamng.App");
				return;
				//初始化加载图形编辑器模块
				Ext.Loader.loadScript({ url:"Dep/metadata/metadatamng/InitView.js", scope:this, onLoad:function(){
				}});
			},
			

			/**
			 * 模块是否已经加载
			 */
			isExModule :function(appNs) {
				var me = this;
				return me.tmpApp.containsKey(appNs);
			},
			
			/**
			 * 加载模块文件
			 */
			showModule : function(appNs,appName) {
				var  me = this,app = me.getModule(appNs),AppClass;
				if(!app )  {
					 Ext.require(appName, function(){
				            AppClass = Ext.ClassManager.get(appName);
				            app = new AppClass();
							me.tmpApp.add(appNs, app);
							me.showModulePanel(app);
				        });
					 return;
				}
				
				if (!app ) {
					return;
				}
				me.showModulePanel(app);
			},
			
			/**
			 * 显示某一模块的面板
			 * @param {} app
			 */
			showModulePanel:function(app) {
				var me = this,mainController;
				mainController = me.getAppMainController(app);
				
				if (mainController.showWin) {
					mainController.showWin();
				}
			},
			
			/**
			 * 
			 */
			getAppMainController : function(application) {
				var mainController = application.controllers.items[0];
				return mainController;
			},
			/**
			 * 获取模块
			 * 
			 * @param appNs
			 */
			getModule :function(appNs) {
				var me = this;
				var module = me.tmpApp.get(appNs);
				if (!module) {
				}
				return module;
			}
		});