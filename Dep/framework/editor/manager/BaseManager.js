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
if (!Dep.framework.editor.manager) {
	Dep.framework.editor.manager = {};
}
/**
 * 管理器基类
 */
Dep.framework.editor.manager.BaseManager = Dep.framework.editor.base.EventSource.extend({
			/**
			 * 缓存数据的个数
			 * 
			 * @type Number
			 */
			size : 0,
			/**
			 * 缓存数据 的对象
			 * 
			 * @type
			 */
			entry : null,
			/**
			 * 初始化方法
			 * 
			 * @param {}
			 *            config
			 */
			init : function(config) {
				var me = this;
				me.size = 0;
				me.entry = {}, me._super();
			},
			/**
			 * 存
			 */
			put : function(key, value) {
				if (!this.containsKey(key)) {
					this.size++;
				}
				this.entry[key] = value;
			},

			/**
			 * 取
			 */
			get : function(key) {
				if (this.containsKey(key)) {
					return this.entry[key];
				} else {
					return null;
				}
			},

			/**
			 * 删除
			 */
			remove : function(key) {
				if (delete this.entry[key]) {
					this.size--;
				}
			},

			/**
			 * 删除所有
			 */
			removeAll : function() {
				var me = this;
				me.entry = {};
			},

			/** 是否包含 Key * */
			containsKey : function(key) {
				return (key in this.entry);
			},

			/**
			 * 是否包含 Value
			 */
			containsValue : function(value) {
				for (var prop in this.entry) {
					if (this.entry[prop] == value) {
						return true;
					}
				}
				return false;
			},

			/**
			 * 所有 Value
			 */
			values : function() {
				var values = new Array();
				for (var prop in this.entry) {
					values.push(this.entry[prop]);
				}
				return values;
			},

			/**
			 * 所有 Key
			 */
			keys : function() {
				var keys = new Array();
				for (var prop in this.entry) {
					keys.push(prop);
				}
				return keys;
			},

			/**
			 * Map Size
			 */
			getSize : function() {
				return this.size;
			},

			/**
			 * 遍历map调用func
			 * @param {} func
			 */
			each : function(func) {
				for (var item in this.entry) {
					if (func(item, this.entry[item]) === false)
						break;
				}
			}

		});
