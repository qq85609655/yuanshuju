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
 * UndoRedo插件
 */
Dep.framework.editor.plugin.UndoRedoPlugin = Dep.framework.editor.plugin.BasePlugin
		.extend({
			NAME : "Dep.framework.editor.plugin.UndoRedoPlugin",
			/**
			 * @property {Array} undoStack undo命令堆栈
			 */
			undoStack : [],
			/**
			 * @property {Array} redoStack redo命令堆栈
			 */			
			redoStack : [],
			/**
			 * 初始化UndoRedo插件
			 * @param container
			 */
			init : function(container) {
				var me = this;
				me._super(container);
				me.getContainer().regiestActions([ {
					name : Dep.framework.editor.ACTION.EDITOR.UNDO,
					description : Dep.framework.editor.I18N.DESCRIPTION.UNDO.UNDO,
					icon : Dep.framework.editor.PATH + "img/editor/undo.png",
					functionality : Ext.Function.bind(me.doUndo, me),
					keyCodes : [ {
						metaKeys : [ Dep.framework.editor.KEYCODE.META_KEY_CTRL ],
						keyCode : Dep.framework.editor.KEYCODE.Z,
						keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
					} ],
					group : Dep.framework.editor.I18N.Edit.GROUP.UNDO
				}, {
					name : Dep.framework.editor.ACTION.EDITOR.REDO,
					description : Dep.framework.editor.I18N.DESCRIPTION.UNDO.REDO,
					icon : Dep.framework.editor.PATH + "img/editor/redo.png",
					functionality : Ext.Function.bind(me.doRedo, me),
					keyCodes : [ {
						metaKeys : [ Dep.framework.editor.KEYCODE.META_KEY_CTRL ],
						keyCode : Dep.framework.editor.KEYCODE.Y,
						keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
					} ],
					group : Dep.framework.editor.I18N.Edit.GROUP.UNDO
				} ]);
				container.on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
						me.initEvent.bind(me));
			},
			/**
			 * 在容器加载完成之后注册事件。
			 * 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
			 * 
			 * @param {Editor}
			 *            editor 编辑器
			 */
			initEvent : function(editor) {
				var me = this, containers = editor.getContainerManager(), container, keys = containers
						.keys();

				for ( var i in keys) {
					container = containers.get(keys[i]);
					container.regiestOnEvent(Dep.framework.editor.EVENT.EXCUTE_COMMAND,
							me.handleExecuteCommands, me);
				}

			},
			/**
			 * Stores all executed commands in a stack
			 * 
			 * @param {Object}
			 *            evt
			 */
			handleExecuteCommands : function(commands) {

				// If the event has commands
				if (!commands) {
					return;
				}

				// Add the commands to a undo stack ...
				this.undoStack.push(commands);
				// ...and delete the redo stack
				this.redoStack = [];
			},

			/**
			 * Does the undo
			 * 
			 */
			doUndo : function() {
				// Get the last commands
				var lastCommands = this.undoStack.pop();

				if (!lastCommands) {
					return;
				}
				// Add the commands to the redo stack
				this.redoStack.push(lastCommands);

				// Rollback every command
				if (lastCommands instanceof Array) {
					lastCommands.each(function(command) {
						command.undo();
					});
				} else {
					lastCommands.undo();
				}

			},

			/**
			 * Does the redo
			 * 
			 */
			doRedo : function() {

				// Get the last commands from the redo stack
				var lastCommands = this.redoStack.pop();

				if (!lastCommands) {
					return;
				}
				// Add this commands to the undo stack
				this.undoStack.push(lastCommands);

				// Rollback every command
				if (lastCommands instanceof Array) {
					lastCommands.each(function(command) {
						command.redo();
					});
				} else {
					lastCommands.redo();
				}
			}

		});