/**
 * 定义图元代理类。
 */
Ext
		.define(
				'Dep.framework.editor.model.proxy.FigureAjaxProxy',
				{
					extend : 'Dep.framework.editor.model.proxy.BaseAjaxProxy',
					/**
					 * 构造函数
					 */
					constructor : function() {
						this.callParent(arguments);
					},
					/**
					 * 重写writer ，写出数据格式如下：
					 * {'view' : {}, 'buss': {}}
					 */
					writer : {
						type : 'json',
						getRecordData : function(record, operation) {
							if (record.getPersistentAttributes){
								return record.getPersistentAttributes();
							}
						}
					}
				});