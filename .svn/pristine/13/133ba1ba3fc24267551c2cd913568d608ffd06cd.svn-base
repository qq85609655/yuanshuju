/**
 * 将未归类的元模型的添加到指定文件夹的操作界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.AddToFolderWin', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : true,
		title : '添加到文件夹',
		layout: 'fit',
		closeAction : "hide",
		buttonAlign : 'center',
		width : 560,
		height : 500,
		cmpTag : 'addtofolderwin',
		
		constructor : function(conf) {
	        var me = this;
			//待选元模型grid
	        me.selectingMmGrid = Ext.create('Ext.grid.Panel', {
						width : 220,
						height : 412,
						border : null,
						columns: [{
			                text: '未归类元模型',
			                align : 'left',
			                flex: 1,
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
			        			cmpTag : 'adtfiltermmname',
			        			width : 205
							}]
						}
					
					});
			//分类文件夹treePanel
			me.classifyFolderTreePanel = Ext.create('Ext.tree.Panel', {
						xtype : 'treepanel',
						width : 220,
						height : 445,
						border : null,
						title : '分类文件夹',
						titleAlign : 'center',
						rootVisible : true,
						cmpTag : 'classifyfoldertree',
						animate : true,
						useArrows : true,
						collapsible : false,
						resizable : false,
						store : conf.classifyFolderTreeStore
				});
					
	        Ext.applyIf(me, {
	        	items : [{
	        		xtype : 'panel',
	        		width : 560,
					height : 450,
					title : '元模型归类管理',
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
								cmpTag : 'addonetofolderforclassify',
								margin : '180 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '>>',
								tooltip : '添加选中的全部',
								cmpTag : 'addalltofolderforclassify',
								margin : '0 0 5 0',
								hidden : true,
								width : 100
							},{
								xtype : 'button',
								text : '<',
								tooltip : '单个移除',
								cmpTag : 'removeonefromfolderforclassify',
								margin : '0 0 5 0',
								width : 100
							},{
								xtype : 'button',
								text : '<<',
								tooltip : '移除选中的全部',
								cmpTag : 'removeallfromfolderforclassify',
								margin : '0 0 5 0',
								hidden : true,
								width : 100
						}]
					}, me.classifyFolderTreePanel]
	        	}],
	        	
	            buttons : [{
		            	text : '保存',
		            	cmpTag : 'saverelationmms',
		            	handler : function() {
		            	},
		            	icon : 'img/metamodel/save.png'
		            }, {
		            	text : '取消',
		            	cmpTag : 'cancelrelationmms',
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
	     * 获取分类文件夹treepanel
	     * @return {Ext.tree.Panel} classifyFolderTreePanel
	     */
	    getClassifyFolderTreePanel : function() {
	    	var me = this;
	    	return me.classifyFolderTreePanel
	    }
	    
});