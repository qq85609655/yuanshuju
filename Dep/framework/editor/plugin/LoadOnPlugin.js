if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
/**
 * 加载编辑器插件
 */
Dep.framework.editor.plugin.LoadOnPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.plugin.LoadOnPlugin"),
	/**
	 * 编辑器初始化加载类。
	 * @param {} editor 编辑器
	 */
	init : function(editor) {
		var me = this, config;
		me.editor = editor;
		config = editor.getConfig();
		// 初始化各种默认的容器、配置
		// me.initDefaultContainer(editor);
		// 根据用户配置,初始化编辑器的各个模块
		// me.initContainers(editor,config);
		// 根据用户配置,初始化各种类型的管理器
		me.initManagers(editor);
		// 初始化事件监听
		me.initEventListerners(editor);

		me.initView(editor,config);
		// me.installEditorPlugins(editor,config);
		// 把容器和其它插件一起管理来安装
        editor.regiestContainer("Dep.framework.editor.base.Editor",editor);
		editor.installPlugins(null, config.plugins);
		// 插件安装完毕，发送安装完毕事件
		editor.fireEvent(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE, editor);
		// for (var plugin in config.plugins) {
		//			
		// }
		//TESTING====================
//		editor.getDataManager().load("LogicNode");
//		me.logger.debug(editor.getDataManager());
//        me.logger.debug('AAAA====================================');
//        me.logger.debug(editor.getDataManager().getCUDDatasByType("LogicNode"));
	},
	/**
	 * 
	 * @param {}
	 *            editor
	 */
	initEventListerners : function(editor) {

	},
	/**
	 * 初始化管理器
	 * 
	 * @param {}
	 *            editor
	 */
	initManagers : function(editor) {
		var me = this;
	
		var modelManager,config = editor.getConfig();
		editor.containerManager = new Dep.framework.editor.manager.ContainerManager();
	
		//初始化模型管理器
//		if (config.figures) {
		if (config) {
			//初始化模型管理器
			modelManager = new Dep.framework.editor.manager.ModelManager(
					config.figures);
			editor
					.setModelManager(modelManager);
			//初始化数据管理器
			editor
			.setDataManager(new Dep.framework.editor.manager.DataManager(editor,modelManager));
			modelManager.initModels(config.figures);
			
//			me.logger.debug("以下为测试代码store test ==========");
//			editor
//			.getDataManager().load("LogicNode",{
//				callback : function(records, operation, success) {
//					me.logger.debug(records);
//					Ext.each(records, function(record) {
//						var data = record.getBussData();
//						me.logger.debug(data);
//					});
//
//				}
//			});
//			
//			editor
//			.getDataManager().loadView("LogicNode",{
//				callback : function(records, operation, success) {
//					me.logger.debug(records);
//					Ext.each(records, function(record) {
//						var data = record.getViewData();
//						me.logger.debug(data);
//					});
//
//				}
//			});
		}
	},
	
	/**
	 * 初始化图形界面
	 * @param {}
	 *            editor
	 */
			initView : function(editor, editorConfig) {
				var editorView = Ext
						.create(
								'Dep.framework.editor.view.EditorView',
								editorConfig ? (editorConfig.viewConfig ? editorConfig.viewConfig
										: {})
										: {});
				editor.getParentPanel().add(editorView);
				editor.setEditorView(editorView);
			},
	/**
	 * 获取编辑器对象
	 * @returns editor
	 */
	getEditor: function() {
		var me = this;
		if (!me.editor) {
			throw "[Dep.framework.editor.plugin.LoadOnPlugin#getEditor]获取不到编辑器类";
		}
		return me.editor;
	}
});