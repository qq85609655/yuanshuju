/**
 * @author HeYuqing
 * Message.js 
 * 2015年5月6日 下午5:33:38
 * TODO
 */
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
if (!Dep.framework.editor.util) {
	Dep.framework.editor.util = {};
}
Dep.framework.editor.util.Msg ={
		/**
		 * @description 提示信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */
		info : function(msg, title,icon) {
			Dep.framework.editor.util.Msg._show(msg, title,icon || Ext.Msg.INFO,Ext.Msg.OK, true);
		},
		/**
		 * @description 警告信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */		
		warning : function(msg, title, icon) {
			Dep.framework.editor.util.Msg._show(msg, title,icon || Ext.Msg.WARNING,Ext.Msg.OK, true);
		},
		/**
		 * @description 错误信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */		
		error : function(msg, title,icon) {
			Dep.framework.editor.util.Msg._show(msg, title,icon || Ext.Msg.ERROR,Ext.Msg.OK, true);
		},
		/**
		 * @description 成功提示信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */		
		success : function(msg, title,icon) {
			Dep.framework.editor.util.Msg._show(msg, title, icon || Ext.Msg.SUCCESS,null, false);
		},	
		/**
		 * @description 失败信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */			
		failed : function(msg, title,icon) {
			Dep.framework.editor.util.Msg._show(msg, title,icon || Ext.Msg.ERROR,Ext.Msg.OK, true);
		},
		/**
		 * @description 私有方法，弹出提示框用
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 * @param {String} icon 图标
		 * @param {Object[]} buttons 按钮（数组）取值：[Ext.MessageBox.OK,Ext.MessageBox.YES,Ext.MessageBox.NO,Ext.MessageBox.CANCEL，Ext.MessageBox.OKCANCEL，Ext.MessageBox.YESNO，Ext.MessageBox.YESNOCANCEL]
		 * @param {Boolean} closable  是否显示关闭按钮
		 */
		_show : function(msg, title, icon, buttons, closable){
			var me = this;
			Ext.Msg.show({
				title : title,
				msg : msg,
				closable : closable,
				buttons : buttons,
				icon : icon
			});	
			var hideMsg = function(){
				Ext.Msg.hide();
			};
			//如果没有按钮，则需要定时关闭
			if(!buttons){
				window.setTimeout(hideMsg, 1500); 
			}		
		}
};
