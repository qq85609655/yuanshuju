/**
 * 定义图元代理类。
 */
Ext
		.define(
				'Dep.framework.editor.model.proxy.NoneViewDataAjaxProxy',
				{
					extend : 'Dep.framework.editor.model.proxy.FigureAjaxProxy',
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
						totalProperty : 'totalProperty',// 数据的总数
						/**
						 * 重写json reader的extractData方法，当数据模型为不持久化图形数据时，
						 * 后台返回的数据仅有业务数据，没有图形数据，需要将数据结构修改为前台需要的数据结构
						 */
					    extractData: function(root) {
					        var me = this,recordName = this.record,newData=null,
					            data = [],
					            length, i;

					        if (recordName) {
					            length = root.length;
					            
					            if (!length && Ext.isObject(root)) {
					                length = 1;
					                root = [root];
					            }

					            for (i = 0; i < length; i++) {
					                data[i] = root[i][recordName];
					            }
					        } else {
					            data = root;
					        }
					        //
					        if (Ext.isArray(data)) {
					    		newData = [];
								for (i = 0; i < data.length; i++) {
									newData.push(me._rebuildData(data[i]));
								}
							}else if (data) {
								newData = me._rebuildData(data);
							}
					        return me._extractData(newData);
					    },
					    
					    /**
					     */
					    _extractData : function(root) {
					        var me = this,
					            Model   = me.model,
					            length  = root.length,
					            records = new Array(length),
					            convertedValues, node, record, i;

					        if (!root.length && Ext.isObject(root)) {
					            root = [root];
					            length = 1;
					        }

					        for (i = 0; i < length; i++) {
					            node = root[i];
					            if (node.isModel) {
					                // If we're given a model instance in the data, just push it on
					                // without doing any conversion
					                records[i] = node;
					            } else {
					                // Create a record with an empty data object.
					                // Populate that data object by extracting and converting field values from raw data.
					                // Must pass the ID to use because we pass no data for the constructor to pluck an ID from
					                records[i] = record = new Model(undefined, me.getId(node), node, convertedValues = {});

					                // If the server did not include an id in the response data, the Model constructor will mark the record as phantom.
					                // We  need to set phantom to false here because records created from a server response using a reader by definition are not phantom records.
					                record.phantom = false;

					                // Use generated function to extract all fields at once
					                me.convertRecordData(convertedValues, node, record);

					                if (me.implicitIncludes && record.associations.length) {
					                    me.readAssociated(record, node);
					                }
					            }
					        }

					        return records;
					    },
						/**
						 * 构造前台需要的数据结构
						 */
						_rebuildData:function (data) {
							if(!data){
								return data;
							}
							if (data.viewData) {
								//如果已经符合前台需要的数据结构，不再重构
								return data;
							}
							var varData = {};
							Ext.apply(varData,data);
							varData.bussData = data;
							varData.viewData = {
								viewData : Ext.JSON.encode({
									x : 0,
									y : 0
								})
							};
							return varData;
						}
					}
				});