///////////////message功能
var Dep = Dep || {};
Ext.apply(Ext.Msg, {
	SUCCESS : 'x-message-box-success',
	FAILED : 'x-message-box-faild',
	buttonText : {
		ok : '确定',
		yes : '是',
		no : '否',
		cancel : '取消',
		showdetail : '详情',
		hidedetail :'隐藏'
		// progressdetail : '查看进度'
	},
});
Dep.Msg = Dep.Msg ||{
		warnTitle:"警告",
		noteTitle:"提示",
		errorTitle:"错误",
		warnTitle:"警告",
		/**
		 * 确认提示框
		 * @param msg
		 * @param fn
		 * @param scope
		 * @param title
		 */
		confirm:function(msg, fn, scope, title) {
			Ext.Msg.confirm(title || Dep.Msg.noteTitle, msg, function(btn) {
				fn.call(scope, btn);
			}, scope || window);
		},
		/**
		 * @description 提示信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */
		info : function(msg, title, icon,btn,closable,modal) {
		Dep.Msg._show(msg, title || Dep.Msg.noteTitle, icon || Ext.Msg.INFO,
				Ext.Msg.OK, true,modal);
	},
		/**
		 * @description 警告信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */		
		warning : function(msg, title, icon) {
			Dep.Msg._show(msg, title|| Dep.Msg.warnTitle,icon || Ext.Msg.WARNING,Ext.Msg.OK, true);
		},
		/**
		 * @description 错误信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */		
		error : function(msg, title,icon) {
			Dep.Msg._show(msg, title|| Dep.Msg.errorTitle,icon || Ext.Msg.ERROR,Ext.Msg.OK, true);
		},
		
		check : function(msg, title, icon) {
			Dep.Msg.info(msg, title, icon);
		},
		
		autoCloseInfo : function(msg, title, icon) {
			Ext.Msg.reconfigure({
				title : title,
				msg : msg
			});
			// Ext.Msg.show();
			Ext.Msg.getEl().fadeIn();

			setTimeout(function() {
				Ext.Msg.getEl().fadeOut({
					opacity : 0,
					easing : 'easeOut',
					duration : 2000,
					remove : false,
					useDisplay : false
				});
			}, 2000);
		},
		
		slideFromBottom : function(msg, title, icon) {
			Dep.Msg._show(msg, title || Dep.Msg.noteTitle, icon || Ext.Msg.INFO,
				null, true);
//			Dep.Msg._showAt({
//				title : title || Dep.Msg.noteTitle,
//				msg : msg,
//				closable : true,
//				icon : Ext.Msg.INFO,
//				modal :true
//			},document.body.offsetWidth + 500,document.body.offsetHeight + 300,true);
			Ext.create('Ext.fx.Anim', {
				target : Ext.Msg,
				duration : 300000,
				easing :"easeInOut",
				from : {
					left : document.body.offsetWidth + 200,
					top : document.body.offsetHeight + 100
				},
				to : {
					left : document.body.offsetWidth + 500,
					top : document.body.offsetHeight + 300
//					left : document.body.offsetWidth - 300,
//					top : document.body.offsetHeight - 500
				}
			});
		},
		conFailed : function(msg, title, icon) {
			Dep.Msg.error(msg, title, icon);
		},
		showProgressDetail : function(msg, title, fn, icon, closable, modal) {
			Ext.Msg.show({
				progress : true,
				buttons : Ext.Msg.OKSHOWDETAIL,
				fn : fn,
				title : title,
				msg : msg,
				closable : closable || true,
				modal : modal || true,
				icon : icon || Ext.Msg.INFO
			});
		},
		showDetail : function(msg, title, detail) {
			//	Ext.Msg.show({
			//				buttons : Ext.Msg.OKSHOWDETAIL,
			//				fn : fn,
			//				title : title,
			//				msg : msg,
			//				closable : closable||true,
			//				modal : modal||true,
			//				icon : icon|| Ext.Msg.INFO
			//			});
			Ext.ux.DetailMsg.show({
				title : title,
				msg : msg,
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.ERROR,
				Detail : detail,
			});
		},
		/**
		 * @description 成功提示信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */		
		success : function(msg, title,icon) {
			Dep.Msg._show(msg, title|| Dep.Msg.noteTitle, icon || Ext.Msg.SUCCESS,null, false);
		},	
		/**
		 * @description 失败信息
		 * @param {String} msg 信息内容
		 * @param {String} title 信息标题
		 */			
		failed : function(msg, title,icon) {
			Dep.Msg._show(msg, title,icon || Ext.Msg.ERROR,Ext.Msg.OK, true);
		},
		tip : function() {
			var msgCt;
			function createBox(t, s) {
				return [
						'<div class="msg">',
						'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
						'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="font-size=12px;"><h3>',
						t,
						'</h3>',
						s,
						'</div></div></div>',
						'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
						'</div>' ].join('');
			}
			return {
				msg : function(title, message, autoHide, pauseTime) {
					if (!msgCt) {
						msgCt = Ext.DomHelper.append(document.body, {
							id : 'msg-div'
						}, true);
					}
					//	    	msgCt.alignTo(document, 'br-rb');
					//给消息框右下角增加一个关闭按钮
					message += '<br><span style="text-align:right;font-size:12px; width:100%;">'
							+ '<font color="blank"><u style="cursor:hand;" onclick="Dep.Msg.tip.hide(this);">关闭</u></font></span>'
					var m = Ext.DomHelper.append(msgCt, {
						html : createBox(title, message)
					}, true);
					m.slideIn('t');
					if (!Ext.isEmpty(autoHide) && autoHide == true) {
						if (Ext.isEmpty(pauseTime)) {
							pauseTime = 5;
						}
						m.pause(pauseTime).ghost("t", {
							remove : true
						});
					}
				},
				hide : function(v) {
					var msg = Ext
							.get(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
					msg.ghost("t", {
						remove : true
					});
				}
			};
		}(),
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
		},
		_showAt : function(config,x, y, animate){
		   Ext.Msg.showAt(x, y, animate,config);
		}
};
