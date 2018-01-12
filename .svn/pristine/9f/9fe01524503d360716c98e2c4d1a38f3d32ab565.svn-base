/**
 * 事件源
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
if (!Dep.framework.editor.base) {
	Dep.framework.editor.base = {};
}
/**
 * 这里的事件响应处理拷贝draw2d中的figure类里面的事件处理,从而保持一致性
 */
Dep.framework.editor.base.EventSource = Class.extend({

	NAME : "Dep.framework.editor.base.EventSource",
	
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.base.EventSource"),
	/**
	 * 初始化事件源
	 */
	init : function() {
		this.eventSubscriptions = {};
		
	},
	/**
	 * 设置事件源是否enable
	 * @param {Boolean} value 
	 */
	setEventsEnabled : function(value) {
		this.eventsEnabled = value;
	},

	/**
	 * @method
	 *根据事件类型，执行所有的事件监听函数。
	 * @param {String} event the event to trigger
	 * @param {Object} [args] 传递给监听函数的参数对象
	 * 
	 * @since 5.0.0
	 */
	fireEvent : function(event, args) {
		var newArg,me = this;
		try {
			if (typeof this.eventSubscriptions[event] === 'undefined') {
				return;
			}

//			// 防止事件递归
//			if (this._inEvent === true) {
//				return;
//			}
//			this._inEvent = true;
			var subscribers = me.eventSubscriptions[event];
			for (var i = 0; i < subscribers.length; i++) {
				//重新整理参数
				newArg = Array.prototype.slice.call(arguments,1);
				try {
					subscribers[i].apply(me,newArg);
				}catch (e){
					me.logger.error(e);
					console.log(e);
				}
			
//				subscribers[i](this, args);
			}
		} finally {
//			this._inEvent = false;

			// fire a generic change event if an attribute has changed
			// required for some DataBinding frameworks or for the Backbone.Model compatibility
			// the event "change" with the corresponding attribute name as additional parameter
//			if (event.substring(0, 7) === "change:") {
//				this.fireEvent("change", event.substring(7));
//			}
		}
	},

	/**
	 * @method
	 * 设置事件监听函数
	 * @param {String}   event 事件名
	 * @param {Function} callback 事件监听函数 
	 * @param {Object} [context] 监听函数执行上下文环境（scope） 
	 */
	on : function(event, callback, context) {
		var events = event.split(" ");
		// the "context" param is add to be compatible with Backbone.Model.
		// The project "backbone.ModelBinder" used this signature and we want use this
		if (context) {
			callback = $.proxy(callback, context);
			callback.___originalCallback = callback;
		}

		for (var i = 0; i < events.length; i++) {
			if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
				this.eventSubscriptions[events[i]] = [];
			}
			this.eventSubscriptions[events[i]].push(callback);
		}
		return this;
	},

	/**
	 * @method
	 * 移除监听事件
	 * @param {String|Function} event或Function 注册的监听事件或函数名。
	 * @since 5.0.0
	 */
	off : function(eventOrFunction) {
		if (typeof eventOrFunction === "undefined") {
			this.eventSubscriptions = {};
		} else if (typeof eventOrFunction === 'string') {
			this.eventSubscriptions[eventOrFunction] = [];
		} else {
			for (var event in this.eventSubscriptions) {
				this.eventSubscriptions[event] = $.grep(
						this.eventSubscriptions[event], function(callback) {
							if (typeof callback.___originalCallback !== "undefined") {
								return callback.___originalCallback !== eventOrFunction;
							}
							return callback !== eventOrFunction;
						});
			}
		}

		return this;
	},
	/**
	 * 获取事件源类名
	 */
	getClassName : function(){
	  if(this.NAME){
	     return this.NAME;
	  }else{
	    throw "类名未定义";
	  }
	}
});