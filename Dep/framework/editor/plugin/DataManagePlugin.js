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
 * 模型管理plugin
 */
Dep.framework.editor.plugin.DataManagePlugin = Dep.framework.editor.plugin.BasePlugin
		.extend({
			NAME : "Dep.framework.editor.plugin.ModelManagePlugin",
			
			/**
			 * 初始化日志类
			 */
			logger : log4javascript.getDefaultLogger("Dep.framework.editor.plugin.DataManagePlugin"),
			/**
			 * 
			 */
			editor : null,
			/**
			 * @param {Editor}
			 *            container 编辑器
			 */
			init : function(container) {
				var me = this;
				me.setEditor(container);
				// TODO 注册模型管理action
			
				me.editor.regiestActions([ {
					name : Dep.framework.editor.ACTION.EDITOR.ADD_MODEL,
					description : Dep.framework.editor.I18N.DESCRIPTION.MODEL.ADD,
					// icon:Dep.framework.editor.PATH + "images/addmodel.png",
					functionality : me.addModel.bind(me),
					/*keyCodes : [ {
						metaKeys : [ Dep.framework.editor.KEYCODE.META_KEY_CTRL ],
						keyCode : Dep.framework.editor.KEYCODE.Y,
						keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
					} ],*/
					group : Dep.framework.editor.I18N.Edit.GROUP.MODEL_MANAGE
				} ,{
                    name : Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL,
                    description : Dep.framework.editor.I18N.DESCRIPTION.MODEL.REMOVE,
                    // icon:Dep.framework.editor.PATH + "images/addmodel.png",
                    functionality : me.removeModel.bind(me),
                    group : Dep.framework.editor.I18N.Edit.GROUP.MODEL_MANAGE
                } ]);
		
				me.editor.regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
						me.initEvent, me);
				
			},
			
			/**
			 * 在容器加载完成之后注册事件。
			 * 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
			 * 
			 * @param {Editor}
			 *            editor 编辑器
			 */
			initEvent : function(editor) {
				var me = this,editor = me.getEditor();
//				// 同時支持事件监听
//				editor.regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_ADD, me.addModel,
//						me);
//				editor.regiestOnEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_DELETE,
//						me.removeModel, me);
				
				//监听数据管理器的事件，转换为容器事件抛出
				editor.getDataManager().on("modelCreated", function(layer,store, records, index, eOpts) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_ADDED, layer,store, records, index, eOpts);
					
				}, me);
				editor.getDataManager().on("modelRemoved", function(layer,store, record, index, isMove, eOpts ) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_DELETED, layer,store, record, index, isMove, eOpts );
					
				}, me);
				editor.getDataManager().on("modelUpdated", function(layer,store, record, operation, eOpts) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.MODEL_MODIFYED,layer, store, record, operation, eOpts);
				}, me);
				
				editor.getDataManager().on("modelLoaded", function(layer,fType,store) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.DM_DATA_LOAD,layer,fType, store);
				}, me);
				
				editor.getDataManager().on("layerLoadData", function(layer,records) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.DM_LAYER_LOAD_DATA,layer,records);
				}, me);

				editor.getDataManager().on("updateEditableLayer", function(dm,layer) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.DM_EDITABLE_CHANGE, dm,layer);
				}, me);

				editor.getDataManager().on("updateVisibleLayer", function(dm,layers) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.DM_VISIABLE_CHANGE, dm,layers);
				}, me);
				editor.getDataManager().on("fTypeClear", function(layer,fType,dm) {
					editor.raiseEvent(Dep.framework.editor.EVENT.EDITOR.DM_FTYPE_CLEAR,layer,fType,dm);
				}, me);
			},
			/**
			 * 添加模型
			 * @param {String}layer 图层唯一标识
			 * @param {String}fType 图元类型唯一标识
			 * @param {String/BaseFigureModel/BaseFigureModel[]}
			 *            param 模型的类名 注意，图元工具箱的可能发出添加模型的事件
			 * @param {boolean}是否是新增模型          
			 */
			addModel : function(layer,fType, records,isNew) {
				var me = this;
				return me.getEditor().getDataManager().add(layer,fType, records,isNew);
			},

			/**
			 * 删除模型
			 * @param {String}layer 图层唯一标识
			 * @param {String}fType 图元类型唯一标识
			 * @param {String}
			 *            typeName 模型的类名 注意： 业务列表、画布均可能发出图元删除的事件
			 */
			removeModel : function(layer,fType, records) {
				var me = this;
				return me.getEditor().getDataManager().remove(layer,fType, records);

			},
			/**
			 * 
			 */
			getEditor : function() {
				var me = this;
				if (me.editor) {
					return me.editor;
				}
				throw "没有编辑器对象！";
			},
			/**
			 * 
			 */
			setEditor : function(editor) {
				var me = this;
				me.editor = editor;
			}

		});

