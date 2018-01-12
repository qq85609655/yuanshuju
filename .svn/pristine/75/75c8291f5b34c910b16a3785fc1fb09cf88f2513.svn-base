Ext.define('Dep.metadata.metadatamng.controller.MetadataController', {
			extend : 'Ext.app.Controller',
			/**
			 * 请求图形编辑器所需配置参数
			 * @type Object
			 */
			figureRequestParam : {
				defaultEtitorConfigPath : "Dep/framework/editor/defaultconfig",
				figureConfigPath : "Dep/metadata/metadatamng/config/figures"
			},
			/**
			 * 编辑器唯一标识
			 * @type String
			 */
			editorKey : "metadataEditor",
			/**
			 * editor目录所在路径
			 * @type String
			 */
			editorConfigPath : "Dep/metadata/metadatamng",
			/**
			 * Ext控制器原生的初始化方法
			 */
			init : function() {
				//do nothing
				var me = this;
				me.initEvent();
			},
			initStore : function() {
				//数据源悬挂点下拉树的store,即元数据树结构
				if(!me.mdTreeStore) {
					me.mdTreeStore = Ext.create('Dep.metadata.metadatamng.store.MDTreeStore');
				}
				if(!me.mdTreeStoreExl) {
					me.mdTreeStoreExl = Ext.create('Dep.metadata.metadatamng.store.MDTreeStore');
				}
			},
			/**
			 * 由主控制器来调用的入口方法
			 */
			showWin:function(){
				var me = this;
				me.initEditor();
			},
			/**
			 * 获取编辑器所在的panel
			 * @return {Ext.panel.Panel}
			 */
			getEditorPanel:function(){
				return Dep.metadata.mainView.getContentPanel();
			},
			/**
			 * 获取配置数据并初始化编辑器
			 */
			initEditor:function () {
				var me = this,reloadJSFile = false;
				var deferreds = [];
				if (me.editor || me.requestingEditor) {// 判断编辑器是否已经加载过或者正在加载
					return;
				}
				me.requestingEditor = true;

				try {
					if (!Dep.framework.editor.base.Editor) {// 判断编辑器关联的js文件是否加载过或者是否刷新清除掉了。
						reloadJSFile = true;
					}
				} catch (e) {
					reloadJSFile = true;

				}

				me.figureRequestParam.reloadJSFile = reloadJSFile;

				deferreds.push(Fn.RequestDiffer("getFigureModels", "editor/getFigures.do",
								me.figureRequestParam, "GET", false));
				// 加载编辑器配置文件
				deferreds.push(Fn.RequestDiffer(me.editorKey,
						"editor/getEditorConfigs.do", {
							editorKey : me.editorKey,
							editorRootPath : "Dep/framework/editor",
							editorConfigPath : me.editorConfigPath,
							reloadJSFile : reloadJSFile,
							defaultEtitorConfigPath : "Dep/framework/editor/defaultconfig"
						}, "GET", false));

				Deft.Promise.all(deferreds).then({
					success : function(results) {
						try {
							var figureConfigStr = "", figureConfigs = {}, editorConfigStr = "", editorConfig = {};
							for (var i = 0; i < results.length; i++) {
								var result = results[i];
								if (result.requestKey == "getFigureModels") {
									figureConfigStr = result.result;
									continue;
								}
								if (result.requestKey == me.editorKey) {
									editorConfigStr = result.result;
								}
							}

							editorConfig = Ext.JSON.decode(editorConfigStr);
							figureConfigs = Ext.JSON.decode(figureConfigStr);
							editorConfig.figures = figureConfigs;
							// 创建显示编辑器
							me.setEditor(me.buildEditor(editorConfig, me.getEditorPanel()));
							// 发出编辑器创建完成的事件
							me.fireEvent("editCreated", me.editor);
							console.log("第一个编辑器--元数据的编辑器已经创建成功了！");
							// 修改图层
						} catch (e) {
							console.log(e);
						}
					},
					failure : function(error) {
						Dep.Msg.failed('数据加载失败！', '错误');
					}
				});
			},

			/**
			 * 创建并显示编辑器
			 * @param {} config
	 		 * @param {} contentPanel
			 */
			buildEditor : function(config, contentPanel) {
				var me = this;
				//如果没有加载的js文件就直接返回
				if (!config.jsFiles) {
					return;
				}
				var coreJsFile = config.jsFiles.files
				for (var file in coreJsFile) {
					Ext.Loader.loadScriptFile(coreJsFile[file], Ext.emptyFn, null, me, true);
				}
				// 初始化图形编辑器
				var editorName = config.name;
				var className = eval(editorName);

				var editor = new className(contentPanel, config);
				return editor;
			},
			/**
			 * 将控制器挂载的编辑器设置为当前创建的编辑器
			 */
			setEditor : function(editor){
				var me = this;
				me.editor = editor;
			},
			/**
			 * 将控制器挂载的编辑器设置为当前创建的编辑器
			 */
			getEditor : function(){
				var me = this;
				return me.editor;
			},
			/**
			 * 初始化事件
			 */
			initEvent:function() {
				var me = this;
				me.on('editCreated',function() {//初始化显示地图
					me.getEditor().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","toShowDataMapLayer");
                    
				});
			}
		});