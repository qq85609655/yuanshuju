/**
 * 组合关系管理或依赖关系管理弹窗的添加或移除元模型操作界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.AddOrRemoveMmWinForDepend', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : true,
		title : '依赖关系管理',
		layout: 'fit',
		closeAction : "hide",
		buttonAlign : 'center',
		width : 560,
		height : 500,
		
		constructor : function(conf) {
	        var me = this;
			//待选元模型grid
	        me.selectingMmGrid = Ext.create('Ext.grid.Panel', {
						width : 220,
						height : 385,
						border : null,
						columns: [{
			                text: '待选元模型',
			                align : 'left',
			                width: 178,
			                flex : 1,
			                sortable: true,
			                dataIndex: 'name',
			                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
				        		var val ="";
								if(record && record.raw && record.raw.status==11) {
									val = value+'（已发布）';						
								}else if(record && record.raw && record.raw.status==0) {
									val = value+'（未发布）';
								}else {
									val = value;
								}
								return val;
				        	}
			            }],
			            store : Ext.create('Dep.metamodel.modelmng.store.SelectingMetaModelListStore'),
			            selModel : Ext.create('Ext.selection.CheckboxModel'),
			            tbar : {
			            	layout : 'vbox',
			            	items : [{
			        			xtype : 'textfield',
			        			fieldLabel : '名称',
			        			labelWidth : 40,
			        			margin : '1 0 0 5',
			        			name : 'name',
			        			cmpTag : 'mmnameleftfordepend',
			        			width : 205
							}]
						}
					});
	        //已选元模型
			me.selectedMmGrid = Ext.create('Ext.grid.Panel', {
						width : 220,
						height : 385,
						border : null,
						columns: [{
			                text: '已选元模型',
			                align : 'left',
			                width: 178,
			                flex : 1,
			                sortable: true,
			                dataIndex: 'name'
			            }],
			            store : Ext.create('Dep.metamodel.modelmng.store.SelectedMMListForDependStore'),
			            selModel : Ext.create('Ext.selection.CheckboxModel'),
						tbar : {
			            	layout : 'vbox',
			            	items : [{
			        			xtype : 'textfield',
			        			fieldLabel : '名称',
			        			labelWidth : 40,
			        			margin : '1 0 0 5',
			        			name : 'name2',
			        			cmpTag : 'mmnamerightfordepend',
			        			width : 205
							}]
						}
					});
	        Ext.applyIf(me, {
	        	tbar : [{
	        			xtype : 'textfield',
	        			fieldLabel : '依赖元模型',
	        			labelWidth : 80,
	        			margin : '0 0 0 5',
	        			name : 'name',
	        			cmpTag : 'dependfrommm',
	        			width : 240
	        	}],
	        	items : [{
	        		xtype : 'panel',
	        		width : 560,
					height : 450,
					title : '选择元模型',
					titleAlign : 'center',
					border : null,
					layout : 'hbox',
					items : [me.selectingMmGrid, {
						xtype : 'panel',
						width : 110,
						height : 425,
						frame : true,
						border : null,
						layout : 'vbox',
						margin : '-5 0 0 0',
						items : [{
								xtype : 'button',
								text : '>',
								tooltip : '单个添加',
								cmpTag : 'addonetofolderfordepend',
								margin : '150 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '>>',
								tooltip : '添加选中的全部',
								cmpTag : 'addalltofolderfordepend',
								margin : '0 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '<',
								tooltip : '单个移除',
								cmpTag : 'removeonefromfolderfordepend',
								margin : '0 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '<<',
								tooltip : '移除选中的全部',
								cmpTag : 'removeallfromfolderfordepend',
								margin : '0 0 5 0',
								width : 100
						}]
					}, me.selectedMmGrid]
	        	}],
	        	
	            buttons : [{
		            	text : '保存',
		            	cmpTag : 'savedependmms',
		            	icon : 'img/metamodel/save.png'
		            }, {
		            	text : '取消',
		            	cmpTag : 'canceldependmms',
		            	handler : function() {
		            		me.hide();
		            	},
		            	icon : 'img/metamodel/cancel.png'
	            }]
			});
	
	        me.callParent(arguments);
	    },
	    /**
		 * 获取待选元模型的grid
		 * @return {Ext.grid.Panel} selectingMmGrid
		 */
	    getSelectingMmGrid : function() {
	    	var me = this;
	    	return me.selectingMmGrid;
	    },
	    /**
		 * 获取已选元模型的grid
		 * @return {Ext.grid.Panel} selectedMmGrid
		 */
	    getSelectedMmGrid : function() {
	    	var me = this;
	    	return me.selectedMmGrid;
	    }
	    
});