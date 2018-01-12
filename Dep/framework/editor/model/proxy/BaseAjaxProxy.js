/**
 * 定义代理的基类
 */
Ext.define('Dep.framework.editor.model.proxy.BaseAjaxProxy',
				{
					extend : 'Ext.data.proxy.Ajax',
					/**
					 * 构造函数
					 */
					constructor : function() {
						this.callParent(arguments);
					},
					/**
					 * 使用json读取数据
					 */
					reader : {
						type : 'json',
						root : 'result',
						totalProperty : 'totalProperty'// 数据的总数
					},

					writer : {
						type : 'json'
					}
				});