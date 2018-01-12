//log4javascript is distributed under the Apache License, Version 2.0
//log4javascript网址：http://log4javascript.org/
//使用log4javascript库；初始化日志
function initLog() {
	// 全局日志对象
	var consoleAppender, popAppender;
	// 设置appender
	// -------------输出到控制台
	consoleAppender = new log4javascript.BrowserConsoleAppender();
	consoleAppender.layout = new log4javascript.PatternLayout();
	consoleAppender.layout.pattern = '%d{yyyy-MM-dd HH:mm:ss,SSS} [%c] %-5p - %a{1}%n';
	//设置日志等级
	consoleAppender.setThreshold(log4javascript.Level.DEBUG);

	//-------------输出到日志弹出界面
	popAppender = new log4javascript.PopUpAppender();
	// 设置日志格式
	popAppender.layout.pattern = '%d{yyyy-MM-dd HH:mm:ss,SSS} [%c] %-5p - %m{1}%n';
	//设置日志等级
	popAppender.setThreshold(log4javascript.Level.DEBUG);
	//-------------输出到page界面
	pageAppender = new log4javascript.InPageAppender();
	// 设置日志格式
	pageAppender.layout.pattern = '%d{yyyy-MM-dd HH:mm:ss,SSS} [%c] %-5p - %m{1}%n';
	//设置日志等级
	pageAppender.setThreshold(log4javascript.Level.DEBUG);
	//点击Ctrl键时显示/隐藏日志控制台 
	document.onkeydown = function (evt) {     var VK_F9 = 120;      // 兼容IE和Firefox获得keyBoardEvent对象
	var evt = (evt) ? evt : ((window.event) ? window.event : "");     // 兼容IE和Firefox获得keyBoardEvent对象的键值
	var key = evt.keyCode ? evt.keyCode : evt.which;      
	if (evt.ctrlKey) {         
		if (pageAppender.visible) {         
			pageAppender.hide();             
			pageAppender.visible = false;    
			log4javascript.setEnabled(false);   
			} else {              
				log4javascript.setEnabled(true);   
				pageAppender.show();             
				pageAppender.visible = true;      
			}  
		} };
	/**
	 * 重写getDefaultLogger方法，设置appender
	 */
	log4javascript.getDefaultLogger = function(loggerName) {
		var logger = log4javascript.getLogger(loggerName);
		//所有日志对象共用appender
		logger.addAppender(consoleAppender);
//		logger.addAppender(popAppender);
//		logger.addAppender(pageAppender);
		return logger;
	};

	//此处设置日志的开关
	log4javascript.setEnabled(true);

};
//初始化调用日志
initLog();