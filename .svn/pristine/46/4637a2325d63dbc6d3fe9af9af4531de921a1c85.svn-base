//ddddddddddddddddddddddddddddddddddddddddddddddddd
if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.base) {
	Dep.framework.editor.base = {};
}
// 实现bind机制
Function.prototype.bind = function(obj) {
	var method = this, temp = function() {
		return method.apply(obj, arguments);
	};
	return temp;
};

Dep.framework.editor.PATH = Dep.framework.editor.PATH || 'Dep/framework/editor/';
/**
 * 图形编辑器的编辑器对象,整个图形编辑器的入口,根据配置文件加载各个子容器和插件
 * 此容器插件关联的配置文件为-》cuseditor/Editor.json文件。配置文件详情：
 * {
	"pluginDirs": "editor/plugin,extends/editor/plugin",  //各个插件的根目录,在其它配置文件中配置插件文件的目录时,直接从此目录下开始即可
	"name": "Dep.framework.editor.base.Editor", //编辑器也是容器的一种,这是插件的名称,唯一标识不可重复
	"loadOnPlugin": "Dep.framework.editor.plugin.LoadOnPlugin"  //插件容器加载类,此类主要负责加载各个子容器和插件
}
 */
Dep.framework.editor.base.Editor = Dep.framework.editor.base.BasePluginContainer
		.extend({
			NAME : "Dep.framework.editor.base.Editor",

			/**
			 * @cfg 配置初始化编辑器的plugin
			 */
			loadOnPluginName : "Dep.framework.editor.plugin.LoadOnPlugin",
			/**
			 * 初始化日志
			 */
			logger : log4javascript.getDefaultLogger("Dep.framework.editor.base.Editor"),
			/**
			 * @property jie
			 */
			editorView : null,
			/**
			 * @property 父panel（视图）
			 */
			parentPanel : null,

			/**
			 * @property {Dep.framework.editor.manager.DataManager}管理业务图元数据对象
			 *
			 */
			dataManager : null,

			/**
			 * @property{Dep.framework.editor.manager.ModelManager} 模型管理器
			 */
			modelManager : null,
			/**
			 * @property 容器管理类，平级管理所有的容器。
			 */
			containerManager : null,

//			/**
//			 * @property 相应函数管理类，管理全局的响应函数。
//			 */
//			actionManager : null,
			// //////////////////operate////////////////////////
			/**
			 * @parm {Object} config 编辑器的配置信息
			 */
			init : function(parentPanel, config) {
				var me = this;
				me._super(me);
				// 缓存配置文件
				me.setConfig(config);
				me.setParentPanel(parentPanel);
				// 加载所有的插件文件,为下一步操作做好准备

				// //加载扩展文件
				// 生成LoadOnPlugin来完成对编辑器的加载(初始化)
				me.initLoadOnClass(config);
			},

			/**
			 * 初始化JHE.plugin.LoadOnPlugin对象,由此对象完成整个界面的初始化
			 */
			initLoadOnClass : function(config) {
				var me = this, loadOnClassName = eval(config.loadOnPlugin ? config.loadOnPlugin
						: me.loadOnPluginName);
				me.loadOnPlugin = new loadOnClassName(me);
			},

			/**
			 * 设置编辑器配置对象
			 * 
			 * @param {Object}
			 *            config
			 */
			setConfig : function(config) {
				this.config = config;
			},
			/**
			 * 获取编辑器配置对象
			 * 
			 * @return {Object} config
			 */
			getConfig : function() {
				return this.config;
			},
			/**
			 * 设置父类窗口
			 * 
			 * @param {}
			 *            panel
			 */
			setParentPanel : function(panel) {
				this.parentPanel = panel;
			},
			/**
			 * 获取父panel
			 */
			getParentPanel : function() {
				return this.parentPanel;
			},

			/**
			 * 设置编辑器视图对象
			 */
			setEditorView : function(editorView) {
				this.editorView = editorView;
			},

			/**
			 * 获取模型管理器
			 */
			getModelManager : function() {
				var me = this;
				if (!me.modelManager) {
					me.modelManager = new Dep.framework.editor.manager.ModelManager();
				}
				return this.modelManager;
			},

			/**
			 * 设置模型管理器
			 */
			setModelManager : function(modelManager) {
				this.modelManager = modelManager;
			},

			/**
			 * 获取编辑器的总容器
			 * 
			 * @param {}
			 *            editorView
			 * @return {}
			 */
			getEditorView : function(editorView) {
				return this.editorView;
			},
			/**
			 * 获取容器管理器
			 */
			getContainerManager : function() {
				var me = this;
				if (!me.containerManager) {
					me.containerManager = new Dep.framework.editor.manager.ContainerManager();
				}
				return me.containerManager;
			},

			/**
			 * 设置数据管理器
			 */
			setDataManager : function(dataManager) {
				var me = this;
				me.dataManager = dataManager;
			},

			/**
			 * 获取数据管理器
			 */
			getDataManager : function() {
				var me = this;
				if (!me.dataManager) {
					me.dataManager = new Dep.framework.editor.manager.DataManager();
				}
				return me.dataManager;
			},

			/**
			 * 注册容器
			 */
			regiestContainer : function(key, container) {
				this.getContainerManager().put(key, container);
			},
			/**
			 * 获取容器
			 */
			getContainer : function(key) {
				return this.getContainerManager().get(key);
			}
		});