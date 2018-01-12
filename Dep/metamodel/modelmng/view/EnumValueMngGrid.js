/**
 * 枚举值管理的可编辑列表
 */
Ext.define('Dep.metamodel.modelmng.view.EnumValueMngGrid', {
    extend: 'Ext.grid.Panel',
	
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
	
    initComponent: function(){
		var me = this;
        me.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(me, {
        	width : 515,
			height : 280,
			title: '枚举值',
			margin: '0 0 0 0',
            flex: 1,
            frame: true,
            autoScroll: true,
            cmpTag : 'enumvaluegrid',
            plugins: [this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    icon : 'Dep/metadata/resource/img/add.png',
                    text: '添加',
                    margin: '0 0 0 5',
                    border: true,
                    scope: me,
                    handler: me.onAddClick
                }, {
                    icon : 'Dep/metadata/resource/img/del.png',
                    text: '删除',
                    margin: '0 0 0 5',
                    disabled: true,
                    itemId: 'delete',
                    scope: me,
                    handler: me.onDeleteClick
                }, {
                    icon : 'img/metamodel/save.png',
                    text: '保存',
                    margin: '0 0 0 5',
                    disabled: true,
                    itemId: 'save',
                    scope: me,
                    handler: me.onSaveClick
                }]
            }],
            columns: [{
                header: '键',
                flex: 1,
                sortable: true,
                dataIndex: 'enumKey',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("enumKey", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '值',
                flex: 1,
                sortable: true,
                dataIndex: 'enumValue',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("enumValue", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }]
        });
        me.callParent();
        me.getSelectionModel().on('selectionchange', me.onSelectChange, me);
    },
    /**
     * 监听选中记录改变事件，调用响应函数
     * @param {} selModel
     * @param {} selections
     */
    onSelectChange: function(selModel, selections){
    	var me = this;
        me.down('#delete').setDisabled(selections.length === 0);
        me.down('#save').setDisabled(selections.length === 0);
    },
	/**
	 * 触发【删除】按钮click事件时调用的响应函数
	 */
    onDeleteClick: function(){
    	var me = this;
        var selection = me.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            me.store.remove(selection);
            if(selection.get('id')) {
	            selection.destroy({callback : function(record, action) {
	            	var responseText = action.response.responseText;
	            	if(responseText) {
	            		var res = Ext.JSON.decode(responseText);
						if(res.resultCode == 1) {
							Dep.framework.editor.util.Msg.success('删除成功', '成功');
						}else {
							Dep.framework.editor.util.Msg.failed('删除失败', '失败');
						}
	            	}
	            	
				}});
            }
        }
    },
	/**
	 * 触发【添加】按钮的click事件时调用的响应函数
	 */
    onAddClick: function(){
    	var me = this;
    	var edit = me.editing;
        var rec = Ext.create('Dep.metamodel.modelmng.model.EnumValueModel', {
        	//id : new Ext.data.UuidGenerator().generate(),
        	id : "",
        	enumId : me.enumId,
        	enumKey : "",
        	enumValue : ""
        });
        edit.cancelEdit();
        me.store.insert(me.store.data.length, rec);
        edit.startEditByPosition({
            row: me.store.data.length - 1,
            column: 0
        });
    },
    /**
	 * 触发【保存】按钮click事件时调用的响应函数
	 */
    onSaveClick : function() {
    	var me = this;
    	var store = me.store ? me.store : me.getStore();
		var enumValueList = [], oldValueList = [];
		if(store.data.items && store.data.length > 0) {
			for(var i=0; i<store.data.length; i++) {
				var enumRawData = store.data.items[i].raw;//旧数据
				oldValueList.push(enumRawData);//旧数据缓存
				var evData = store.data.items[i].data;//新数据
				enumValueList.push(evData);//修改后的新数据数组
			}
		}
		var flag = true;//批量保存成功的标识
		for(var i=0; i<enumValueList.length; i++) {
			var data = enumValueList[i];
			var model = Ext.create('Dep.metamodel.modelmng.model.EnumValueModel', data);
			if(!model.get('id')) {
				model.save({callback : function(record, action, success) {
					if(!success) {
						flag = false;
					} 
				}});
			}else {
				for(var j=0; j<oldValueList.length; j++) {
					var oldValue = oldValueList[j];
					if(model.get('id') == oldValue.id) {
						if(model.get('enumKey')!=oldValue.enumKey || model.get('enumValue')!=oldValue.enumValue) {
							model.save({callback : function(record, action, success) {//修改
								if(!success) {
									flag = false;
								} 
							}});
						}
					}
				}
			}
		}
		if(flag) {
			Dep.framework.editor.util.Msg.success('保存成功', '成功');
		}else {
			Dep.framework.editor.util.Msg.failed('有数据保存失败', '失败');
		}
		
		
/*		var dataObject = {enumValueList : enumValueList};
		//TODO 需要发送ajax请求
		Ext.Ajax.request({
		    url : 'metamodelenum/createvalues.do',
		    jsonData : Ext.JSON.encode(dataObject),//Java控制层用@RequestBody来接收参数对象
			method : "POST",
			async : true, //true为异步请求，false为同步请求
		    success: function(response){
		        var text = response.responseText;
		        var res = Ext.JSON.decode(text);
		        
		        if(res.resultCode == 1) {
			        Dep.framework.editor.util.Msg.success(res.resultText, '成功');
		        }else {
		        	Dep.framework.editor.util.Msg.failed(res.resultText, '失败');
		        }
		    }
		});*/
    }
});

