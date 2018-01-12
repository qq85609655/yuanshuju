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
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
if (!Dep.framework.editor.plugin.containers.canvas) {
	Dep.framework.editor.plugin.containers.canvas = {};
}

/**
 * 注册图元粘贴板功能
 * 包含拷贝，复制，黏贴
 */
Dep.framework.editor.plugin.containers.canvas.ClipboardPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.ClipboardPlugin",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container)
		//        me.container = container;
		canvas = container.getCanvas();
		me.clipBoard=new Dep.framework.editor.base.Clipboard(canvas,container);
		//具体代码参考JBPM edit.js文件 注册拷贝，复制，黏贴功能。
		me.container.regiestActions([{
					name : Dep.framework.editor.ACTION.CANVAS.CUT,
					description : Dep.framework.editor.I18N.DESCRIPTION.CLIP.CUT,
					icon : Dep.framework.editor.PATH + "images/cut.png",
					keyCodes : [{
								metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
								keyCode : Dep.framework.editor.KEYCODE.X,
								keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
							}],
					functionality : Ext.Function.bind(me.callEdit, me,
									[me.editCut]), 
					group : Dep.framework.editor.I18N.Edit.GROUP.CLIP
				}, {
					name : Dep.framework.editor.ACTION.CANVAS.COPY,
					description : Dep.framework.editor.I18N.DESCRIPTION.CLIP.COPY,
					icon : Dep.framework.editor.PATH + "images/copy.png",
					keyCodes : [{
								metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
								keyCode : Dep.framework.editor.KEYCODE.C,
								keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
							}],
					functionality : Ext.Function.bind(me.callEdit, me,
									[me.editCopy]),  
					group : Dep.framework.editor.I18N.Edit.GROUP.CLIP
				}, {
					name : Dep.framework.editor.ACTION.CANVAS.PASTE,
					description : Dep.framework.editor.I18N.DESCRIPTION.CLIP.PASTE,
					icon : Dep.framework.editor.PATH + "images/paste.png",
					keyCodes : [{
								metaKeys : [Dep.framework.editor.KEYCODE.META_KEY_CTRL],
								keyCode : Dep.framework.editor.KEYCODE.V,
								keyAction : Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN
							}],
					functionality :  Ext.Function.bind(me.callEdit, me,
									[me.editPaste]),   
					group : Dep.framework.editor.I18N.Edit.GROUP.CLIP
				}]);
		container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent.bind(me));
	},
	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 这里是监其它容器的事件
	 * @param {Editor}
	 *            editor 编辑器
	 */
	initEvent : function(editor) {
		var me = this;
		// TODO
	},

    /**
     * 调用粘贴板的剪切方法完成剪切操作
     * @param draw2d.util.ArrayList dataModelList
     */
	editCut : function(dataModelList) {
        this.getClipBoard().cut(dataModelList);
	},

    /**
     *调用粘贴板的复制方法完成复制操作
     * @param draw2d.util.ArrayList dataModelList
     */
	editCopy : function(dataModelList) {
        this.getClipBoard().copy(dataModelList);
	},

    /**
     * 调用粘贴板的粘贴方法
     * @param draw2d.util.ArrayList dataModelList
     */
	editPaste : function(dataModelList) {
        this.getClipBoard().paste(  );
	},
	/**
	 * 根据不同的参数,执行不同的操作.
	 * @param {} action
	 */
	callEdit : function(action) {
		var me = this, canvas = me.container.getCanvas(),dataModelList=me.getModelList(canvas);
        //根据选中的图元获取其关联的model
		action.apply(me, [dataModelList]);
	},
    /**
     * 获取当前画布中选中图元的model集合
     * @param canvas 画布
     * @returns {Array} model集合
     */
    getModelList : function(canvas){
        var figures=canvas.getSelection().getAll(),dataModel=null,dataModelList=new draw2d.util.ArrayList();
        figures.each(function(i ,figure){
            dataModelList.add(figure.getUserData());
        });
        return dataModelList;
    },
    /**
     * 获取粘贴板对象
     * @returns {Dep.framework.editor.base.Clipboard|*}
     */
	getClipBoard :function(){
	  if(this.clipBoard){
          return this.clipBoard;
      }else{
          throw "粘贴板未创建";
      }
	}
});