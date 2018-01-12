/**
 * 用户文件夹右键加入或移除元模型的弹窗界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.AddOrRemoveMmForFolderWin', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : true,
		title : '加入或移除元模型',
		layout: 'fit',
		closeAction : "hide",
		buttonAlign : 'center',
		width : 560,
		height : 500,
		cmpTag : 'addorremovemmforfolderwin',
		
		constructor : function(conf) {
	        var me = this;
			//待选元模型grid
	        me.selectingMmGrid = Ext.create('Ext.grid.Panel', {
						width : 220,
						height : 413,
						border : null,
						columns: [{
			                text: '待选元模型',
			                align : 'left',
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
			        			cmpTag : 'metamodelname', 
			        			width : 205
			        		
			        		}, {
			        			xtype : 'combo',
			        			fieldLabel : '编号',
			        			labelWidth : 40,
			        			margin : '3 0 0 5',
			        			name : 'code',
			        			hidden : true,
			        			cmpTag : 'metamodelcode',
			        			width : 205
				        	},{   
			    				xtype : 'button',
			    				hidden : true,
							  	text : '筛选',
							  	tooltip : '过滤元模型',
							  	margin : '3 0 1 80',
							  	tooltipType : 'title',
							  	cmpTag : 'filtermetamodelbtn',
							  	icon : 'img/btn/search.png',
							  	handler : function() {alert("搜索元模型-1！");}
							}]
						}
					});
			//已选元模型grid
			me.selectedMmGrid = Ext.create('Ext.grid.Panel', {
						width : 220,
						height : 413,
						border : null,
						columns: [{
			                text: '已选元模型',
			                align : 'left',
			                flex : 1,
			                sortable: true,
			                dataIndex: 'name'
			            }],
			            store : Ext.create('Dep.metamodel.modelmng.store.SelectedMetaModelListStore'),
			            selModel : Ext.create('Ext.selection.CheckboxModel'),
						tbar : {
			            	layout : 'vbox',
			            	items : [{
			        			xtype : 'textfield',
			        			fieldLabel : '名称',
			        			labelWidth : 40,
			        			margin : '1 0 0 5',
			        			name : 'name2',
			        			cmpTag : 'rightmetamodelname',
			        			width : 205
			        		
			        		}, {
			        			xtype : 'combo',
			        			fieldLabel : '编号',
			        			labelWidth : 40,
			        			margin : '3 0 0 5',
			        			name : 'code2',
			        			hidden : true,
			        			cmpTag : 'metamodelcode2',
			        			width : 205
				        	},{   
			    				xtype : 'button',
			    				hidden : true,
							  	text : '筛选',
							  	tooltip : '过滤元模型',
							  	margin : '3 0 1 80',
							  	tooltipType : 'title',
							  	cmpTag : 'filtermetamodelbtn2',
							  	icon : 'img/btn/search.png',
							  	handler : function() {alert("搜索元模型-2！");}
							}]
						}
					});
					
	        Ext.applyIf(me, {
	        	tbar : null,
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
								cmpTag : 'addonetofolderforuser',
								margin : '150 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '>>',
								tooltip : '添加选中的全部',
								cmpTag : 'addalltofolderforuser',
								margin : '0 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '<',
								tooltip : '单个移除',
								cmpTag : 'removeonefromfolderforuser',
								margin : '0 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '<<',
								tooltip : '移除选中的全部',
								cmpTag : 'removeallfromfolderforuser',
								margin : '0 0 5 0',
								width : 100
						}]
					}, me.selectedMmGrid]
	        	}],
	        	
	            buttons : [{
		            	text : '保存',
		            	cmpTag : 'savefoldermms',
		            	icon : 'img/metamodel/save.png'
		            }, {
		            	text : '取消',
		            	cmpTag : 'cancelfoldermms',
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