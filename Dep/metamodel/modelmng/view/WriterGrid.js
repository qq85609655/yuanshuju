/**
 * 编辑元模型属性信息用到的可编辑列表组件
 */
Ext.define('Dep.metamodel.modelmng.view.WriterGrid', {
    extend: 'Ext.grid.Panel',
	
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
	
    constructor : function(conf){
		var me = this;
		me.createComboStores();//初始化创建将用到的下拉框store
        me.editing = Ext.create('Ext.grid.plugin.CellEditing');
        
        Ext.apply(me, {
        	width : 515,
			height : 280,
			title: '属性信息',
			margin: '5 0 0 10',
            flex: 1,
            frame: true,
            autoScroll: true,
            cmpTag : 'mmattributesgrid',
            plugins: [me.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: ['->', {
                    icon : 'Dep/metadata/resource/img/add.png',
                    text: '添加',
                    border: true,
                    scope: me,
                    handler: me.onAddClick
                }, {
                    icon : 'Dep/metadata/resource/img/del.png',
                    text: '删除',
                    disabled: true,
                    itemId: 'delete',
                    scope: me,
                    handler: me.onDeleteClick
                }]
            }],
            columns: [{
                header: '编码',
                flex: 1,
                sortable: true,
                dataIndex: 'code',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("code", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '名称',
                flex: 1,
                sortable: true,
                dataIndex: 'name',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("name", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '数据类型',
                flex: 1,
                sortable: true,
                dataIndex: 'datatypeId',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.datatypeComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("datatypeId", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
					if(value) {
						var rec = me.datatypeComboxStore ? me.datatypeComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					}
					return val;
	        	}
            }, {
                header: '长度',
                flex: 1,
                sortable: true,
                dataIndex: 'length',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("length", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '最大值',
                flex: 1,
                sortable: true,
                dataIndex: 'max',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("max", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '最小值',
                flex: 1,
                sortable: true,
                dataIndex: 'min',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("min", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '是否只读',
                flex: 1,
                sortable: true,
                dataIndex: 'isread',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.yesOrNoComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("isread", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
						var rec = me.yesOrNoComboxStore ? me.yesOrNoComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					return val;
	        	}
            }, {
                header: '可否为null',
                flex: 1,
                sortable: true,
                dataIndex: 'isnull',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.yesOrNoComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("isnull", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
						var rec = me.yesOrNoComboxStore ? me.yesOrNoComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					return val;
	        	}
            }, {
                header: '是否可继承',
                flex: 1,
                sortable: true,
                dataIndex: 'isinherit',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.yesOrNoComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("isinherit", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
						var rec = me.yesOrNoComboxStore ? me.yesOrNoComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					return val;
	        	}
            }, {
                header: '是否可见',
                flex: 1,
                sortable: true,
                dataIndex: 'isshow',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.yesOrNoComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("isshow", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
						var rec = me.yesOrNoComboxStore ? me.yesOrNoComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					return val;
	        	}
            }, {
                header: '是否逻辑主键',
                flex: 1,
                sortable: true,
                dataIndex: 'iskey',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.yesOrNoComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("iskey", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
						var rec = me.yesOrNoComboxStore ? me.yesOrNoComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					return val;
	        	}
            }, {
                header: '备注',
                flex: 1,
                sortable: true,
                dataIndex: 'remark',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("remark", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '显示顺序',
                flex: 1,
                sortable: true,
                dataIndex: 'displayorder',
                editor: new Ext.form.field.Text({
                    listeners: {
	                	change : {
	                		fn : function(textfield, newValue, oldValue, eOpts) {
		        				var selection = me.getView().getSelectionModel().getSelection()[0];
						        if (selection) {
						            selection.set("displayorder", newValue);//必须将最后显示的新值set进去
						            me.store.commitChanges(); 
						        }
	                		}
	                	}
	                }
                })
            }, {
                header: '控件类型',
                flex: 1,
                sortable: true,
                dataIndex: 'displayType',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'remote',
                    selectOnTab: true,
                    store : me.displayTypeComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("displayType", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
					if(value) {
						var rec = me.displayTypeComboxStore ? me.displayTypeComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					}
					return val;
	        	}
            }, {
                header: '枚举值集',
                flex: 1,
                sortable: true,
                dataIndex: 'enumId',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    editable : false,
                    triggerAction: 'all',
                    forceSelection: true,
                    queryMode:'local',
                    selectOnTab: true,
                    store : me.enumValueObjComboxStore,
                    valueField : 'id',
					displayField : 'name',
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    listeners : {
		        		select : {
		        			fn : function(combo, records, eOpts) {
		        				var comboSelectedOption = records[0];
		        				if(comboSelectedOption) {//必须判断选项存在
			        				var selection = me.getView().getSelectionModel().getSelection()[0];
							        if (selection) {
							            selection.set("enumId", comboSelectedOption.data.id);//必须要set进去
							            me.store.commitChanges(); 
							            var newRecord = me.getView().getSelectionModel().getSelection()[0];
							        }
		        				}
		        			}
		        		}
		        	}
                }),
	        	renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
	        		var val ="";
		//			if(store && store.getCount()==0 && store.autoLoad){
		//				Ext.Ajax.async = false; //同步请求
		//				store.load();
		//				Ext.Ajax.async = true; //异步请求
		//			}
					if(value) {
						var rec = me.enumValueObjComboxStore ? me.enumValueObjComboxStore.findRecord('id',value) : null;
						val = (rec ? rec.data.name : "");						
					}
					return val;
	        	}
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
    },
	/**
	 * 触发删除按钮click事件时调用的响应函数
	 */
    onDeleteClick: function(){
    	var me = this;
        var selection = me.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            me.store.remove(selection);
        }
    },
	/**
	 * 触发添加按钮的click事件时调用的响应函数
	 */
    onAddClick: function(){
    	var me = this;
    	var edit = me.editing;
        var rec = Ext.create('Dep.metamodel.modelmng.model.MetaModelAttributeModel', {
        	id : new Ext.data.UuidGenerator().generate(),
        	code : '',
        	name : '',
        	datatypeId : 'string',
        	length : 256,
        	max : 9999,
        	min : 0,
        	isread : false,
        	isnull : true,
        	isinherit : true,
        	isshow : true,
        	iskey : false,
        	remark : '',
        	displayorder : '25',
        	displayType : 'TEXT',
        	enumId : 'sex'
        });
        edit.cancelEdit();
        me.store.insert(me.store.data.length, rec);
        edit.startEditByPosition({
            row: me.store.data.length - 1,
            column: 0
        });
    },
    /**
     * 创建所有用到的下拉框store
     */
    createComboStores : function() {
    	var me = this;
    	if(!me.datatypeComboxStore) {
    		me.datatypeComboxStore = Ext.create('Dep.metamodel.modelmng.store.ComboxDatatypeStore');
    		me.datatypeComboxStore.getProxy().extraParams.id = 'datatype';
    		me.datatypeComboxStore.load();
    	}
    	if(!me.enumValueObjComboxStore) {
    		me.enumValueObjComboxStore = Ext.create('Dep.metamodel.modelmng.store.ComboxEnumValueObjStore');
    		me.enumValueObjComboxStore.load();
    		me.enumValueObjComboxStore.filter([
			    {filterFn: function(item) { return item.get("id") != 'datatype' && item.get("id") != 'controltype'; }}
			]);
    	}
    	if(!me.yesOrNoComboxStore) {
    		me.yesOrNoComboxStore = Ext.create('Dep.metamodel.modelmng.store.ComboxYesOrNoStore');
    		me.yesOrNoComboxStore.load();
    	}
    	if(!me.displayTypeComboxStore) {
    		me.displayTypeComboxStore = Ext.create('Dep.metamodel.modelmng.store.ComboxDisplayTypeStore');
    		me.displayTypeComboxStore.getProxy().extraParams.id = 'controltype';
    		me.displayTypeComboxStore.load();
    	}
    },
    /**
     * 动态为下拉框绑定store(备用)
     */
    bindComboStoresAndRenderers : function() {
    	var me = this;
    	var columns = me.columns;
		if(columns && columns.length>0) {
			for(var i=0; i<columns.length; i++) {
				var column = columns[i];
				if(column.editor && (column.editor instanceof Ext.form.field.ComboBox)) {
					var store = null;
					if(column.dataIndex == 'datatypeId') {
						store = me.datatypeComboxStore;
					}else if(column.dataIndex == 'enumId') {
						store = me.enumValueObjComboxStore;
					}else {
						store = me.yesOrNoComboxStore;
					}
					column.editor.bindStore(store);
				}
			}
		}
    },
	 /**
	 * 从根据id从combox获取名字(备用)
	 * @param store
	 * @returns {Function}
	 */
	getComRender : function(store){
		return function(valNames){
			var val ="";
			if(store && store.getCount()==0 && store.autoLoad){
				Ext.Ajax.async = false; //同步请求
				store.load();
				Ext.Ajax.async = true; //异步请求
			}
			if(valNames) {
				var rec = store ? store.findRecord('id',valNames) : null;
				val = (rec ? rec.data.name : "");						
			}
			return val;
		};	
	}
});

