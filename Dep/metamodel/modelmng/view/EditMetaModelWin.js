/**
 * 派生新的元模型或者修改元模型信息时的编辑界面
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.view.EditMetaModelWin', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : true,
		autoDestroy : false,
		constrainHeader  : true,
		isAdd : true,
		border : null,
		title : '添加元模型',
		layout: 'fit',
		closeAction : "hide",
		width : 580,
		height : 620,
		cmpTag : 'editviewwindow',
		
		constructor : function(conf) {
	        var me = this;

			me.attListGrid = me.getAttListGrid();
	        Ext.applyIf(me, {items : [{
				xtype : 'form',
				layout : 'column',
				bodyPadding: 10,
	    		frame: true,
	    		buttonAlign : 'center',
				items : [{
						xtype : 'textfield',
						fieldLabel : '<font color="red">*</font>代码',
						labelWidth : 60,
						name : 'code',
						cmpTag : 'addmetamodelcode',
						emptyText : '输入代码...',
						width : 520,
						style: {
				            margin: '0px 10px 5px 5px'
				        },
						flex : 1,
						msgTarget : 'qtip',
						allowBlank : false,
						blankText : '代码不能为空',
						validateBlank : true,
						maxLength : 85,
						maxLengthText : '代码的最大长度是85'
					},{
						xtype : 'textfield',
						fieldLabel : '<font color="red">*</font>名称',
						labelWidth : 60,
						name : 'name',
						cmpTag : 'addmetamodelname',
						emptyText : '输入名称...',
						width : 520,
						style: {
				            margin: '5px 10px 5px 5px'
				        },
						flex : 1,
						msgTarget : 'qtip',
						allowBlank : false,
						blankText : '名称不能为空',
						validateBlank : true,
						maxLength : 85,
						maxLengthText : '名称的最大长度是85'
					},{
						xtype : 'checkboxfield',
						fieldLabel : '&nbsp;&nbsp;抽象类',
						labelWidth : 60,
						name : 'isabstract',
						cmpTag : 'abstractclass',
						boxLabel : '是',
						inputValue : '1',
						width : 520,
						style: {
				            margin: '5px 10px 5px 5px'
				        },
						flex : 1
					}, 
					{
						xtype : 'button',
						text : '上传图元',
						cmpTag : 'selectimagebtn',
						margin : '-26 0 0 130'
					},
					{
						xtype : 'textarea',
						fieldLabel : '&nbsp;&nbsp;描述',
						labelWidth : 60,
						name : 'remark',
						cmpTag : 'metamodelremark',
						emptyText : '',
						width : 520,
						style: {
				            margin: '5px 10px 5px 5px'
				        },
						flex : 1,
						maxLength : 170,
						maxLengthText : '描述的最大长度是170',
						msgTarget : 'qtip'
					},
					{
	                    xtype: 'treepicker',
	                    fieldLabel: '文件夹',
	                    labelWidth : 60,
	                    labelPad : 15,
	                    labelAlign : 'left',
	                    width : 400,
	                    cmpTag : 'belongtofolder',
	                    labelAlign: 'right',
	                    name : 'packageid',
	                    displayField: 'text',
	                    value: '',
	                    autoScroll : true,
						minPickerHeight: 200,
	                    store : conf.userFolderTreeStore,
	                    allowBlank : true,
						style: {
				            margin: '5px 10px 5px -5px'
				        },
				        flex : 1
	                }, me.attListGrid],
				buttons : [{
						xtype : 'button',
						text : '保存',
						cmpTag : 'confirmsavemetamodel',
						icon : 'img/metamodel/save.png'
					},{
						xtype : 'button',
						text : '保存并添加下一个',
						cmpTag : 'saveandaddnext',
						hidden : true
					},{
						xtype : 'button',
						text : '取消',
						cmpTag : 'cancelsavemetamodel',
						handler : function() {
							me.hide();//直接隐藏弹窗
						},
						icon : 'img/metamodel/cancel.png'
					}]
				}],
	            //添加最大化和恢复的事件监听
		        listeners : {
			        maximize : {
			            fn: function(){ 
							var me = this;
							me.setFitWidth(60);
			            	me.setFitHeight();
			            }
			        },
			        restore : {
			        	fn: function(){
			        		var me = this;
			            	me.setFitWidth(60);
			            	me.setFitHeight();
			        	}
			        }
			    }
			});
	
	        me.callParent(arguments);
	    },
	    /**
	     * 设置弹窗里最大化或复原时所有子控件的宽度
	     * @param {} offset 宽度的偏移量
	     */
	    setFitWidth : function(offset) {
        	var me = this;
        	var winWidth = me.getWidth();
        	//document.body.offsetWidth  : 网页可见区域的宽度（包括边线的宽）
        	//document.body.clientHeight : 网页可见区域的高度
        	var form = me.down('form');
        	var codeTextfield = form.down('textfield[cmpTag=addmetamodelcode]');//代码框
        	var nameTextfield = form.down('textfield[cmpTag=addmetamodelname]');//名称框
        	var checkboxfield = form.down('checkboxfield[cmpTag=abstractclass]');//抽象类复选框
        	var remarkTextarea = form.down('textarea[cmpTag=metamodelremark]');//描述文本域
        	var folderTreepicker = form.down('treepicker[cmpTag=belongtofolder]');//文件夹下拉树
        	var mmAttributesGrid = form.down('grid[cmpTag=mmattributesgrid]');//属性信息列表
        	codeTextfield.setWidth(winWidth - offset);
        	nameTextfield.setWidth(winWidth - offset);
        	checkboxfield.setWidth(winWidth - offset);
        	remarkTextarea.setWidth(winWidth - offset);
        	folderTreepicker.setWidth(400);
        	mmAttributesGrid.setWidth(winWidth - offset-5);	    	
	    },
	    /**
	     * 最大化或复原时设置属性列表的高度
	     */
	    setFitHeight : function() {
	    	var me = this;
	    	var winHeight = me.getHeight();
	    	var form = me.down('form');
	    	var mmAttributesGrid = form.down('grid[cmpTag=mmattributesgrid]');//属性信息列表
	    	mmAttributesGrid.setHeight(winHeight - 340);
	    },
	    /**
	     * 获取添加元模型编辑窗里属性列表的可编辑grid面板
	     */
	    getAttListGrid : function() {
	    	var me = this;
	    	if(!me.attListGrid) {
	    		me.attListGrid = Ext.create('Dep.metamodel.modelmng.view.WriterGrid');
	    	}
	    	return me.attListGrid;
	    }
	    
});