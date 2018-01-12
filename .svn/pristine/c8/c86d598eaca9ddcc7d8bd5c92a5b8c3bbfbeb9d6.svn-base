/**
 * 使用说明：
 * 例如，在form表单中嵌入该控件，需要以下配置
 * =============================================================
 *  var data =[{'name':'1','con':'xxx'},{'name','2','con':'xxxx'}]
 *  var sourceStore= Ext.create('Ext.data.Store', {
		     data : data,   
		     fields :['name']   //需要配置字段，name是必须的
		 });
    //sourceStore,targetStore两个store对象可不配置，若不配置，则默认
	var addOrRemovePanel = Ext.create('Ext.ux.win.AssignDataCompent',{
		height : 250,
		width :560,
		sourceStore : sourceStore,
		targetStore : null,   
	});
	=============================================================
 * 
 */
/**
 * 添加删除记录控件
 */
Ext.define('Ext.ux.win.AssignDataCompent', {
		extend : 'Ext.form.FieldSet',
		autoDestroy : false,
		layout : 'hbox',
		width : 0,
		height : 0,
		border : false,
		bodyStyle:'background :#FFFFFF',
		constructor : function(cfg) {
	        var me = this;
	        me.width = cfg && cfg.width ? cfg.width : 500;
	        var width = parseInt(me.width/2) -50;
	        me.height = cfg && cfg.height ? cfg.height : 250;
	        me.sourceStore = cfg && cfg.sourceStore ? cfg.sourceStore : Ext.create('Ext.data.Store', {data : [],fields :['name']});
	        me.targetStore = cfg&& cfg.targetStore ? cfg.targetStore : 	Ext.create('Ext.data.Store', {data : [],fields :['name']});
	        
			//待选grid
	        me.leftGrid = Ext.create('Ext.grid.Panel', {
						width : width,
						height : me.height-20,
						bodyStyle:'background :#FFFFFF',
						columns: [{
							text : "名称(未选择)",
			                flex : 1,
			                sortable: true,
			                dataIndex: 'name'
			            }],
			            store : me.sourceStore,
			            selModel : Ext.create('Ext.selection.CheckboxModel'),
			            tbar : {
			            	layout : 'vbox',
			            	items : [{
			        			xtype : 'textfield',
			        			fieldLabel : '搜索',
			        			labelWidth : 30,
			        			margin : '1 0 0 5',
			        			name : 'filterGridListData_val',
			        			width : (me.width)/2-60,
			        			listeners :{
			        				change : function(obj,nVal,oVal,opt){
			        					me._leftFilter(nVal);
			        				}
			        			}
			        		}]
						}
					});
	        //已选中记录
			me.rightGrid = Ext.create('Ext.grid.Panel', {
						width : width,
						height : me.height-20,
						bodyStyle:'background :#FFFFFF',
						columns: [{
							text : "名称(已选择)",
			                flex : 1,
			                sortable: true,
			                dataIndex: 'name'
			            }],
			            store : me.targetStore,
			            selModel : Ext.create('Ext.selection.CheckboxModel'),
						tbar : {
			            	layout : 'vbox',
			            	items : [{
			        			xtype : 'textfield',
			        			fieldLabel : '搜索',
			        			labelWidth : 30,
			        			margin : '1 0 0 5',
			        			name : 'filterGridListData_val',
			        			width : (me.width)/2-60,
			        			listeners :{
			        				change : function(obj,nVal,oVal,opt){
			        					me._rightFilter(nVal);
			        				}
			        			}
			        		}]
						}
					});
			//过滤数据
			me.filterData();
			
	        Ext.applyIf(me, {
	        	items : [me.leftGrid, {
					xtype : 'panel',
					width : 70,
					height : me.height-20,
					border : null,
					bodyStyle:'background :#FFFFFF',
					layout : 'vbox',
					items : [{
							xtype : 'button',
							text : '>',
							tooltip : '单个添加',
							cmpTag : 'singleAdd',
							margin : '10 0 5 5',
							width : 60,
							handler :function(){
								me._singleAdd();
							}
						},{
							xtype : 'button',
							text : '>>',
							tooltip : '添加选中的全部',
							cmpTag : 'allAdd',
							margin : '0 0 5 5',
							width : 60,
							handler :function(){
								me._allAdd();
							}
						},{
							xtype : 'button',
							text : '<',
							tooltip : '单个移除',
							cmpTag : 'singleRemove',
							margin : '0 0 5 5',
							width : 60,
							handler :function(){
								me._singleRemove();
							}
						},{
							xtype : 'button',
							text : '<<',
							tooltip : '移除选中的全部',
							cmpTag : 'allRemove',
							margin : '0 0 5 5',
							width : 60,
							handler :function(){
								me._allRemove();
							}
					}]
				}, me.rightGrid]
			});
	        me.callParent(arguments);
	    },
	    /**
	     * 单行记录添加按钮
	     */
	    _singleAdd : function(){
	    	var me = this;
	    	var ls = me.leftGrid.getStore(),rs = me.rightGrid.getStore();
	    	var lftSelections =me.leftGrid.getSelectionModel().getSelection();
	    	
	    	if(lftSelections.length == 0) {return;}
	    	if(lftSelections.length > 1) {
				Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
				return;
			}else{
		    	var model = lftSelections[0];
				rs.add(model);
				rs.commitChanges();
				ls.remove(model);
				ls.commitChanges();				
			}
	    },
	    /**
	     * 多行记录添加按钮
	     */
	    _allAdd : function(){
	    	var me = this;
	    	var ls = me.leftGrid.getStore(),rs = me.rightGrid.getStore();
	    	var lftSelections =me.leftGrid.getSelectionModel().getSelection();
	    	
	    	if(lftSelections.length == 0) {return;}
	    	for(var i=0; i<lftSelections.length; i++) {
				var model = lftSelections[i];
				rs.add(model);
				rs.commitChanges();
				ls.remove(model);
				ls.commitChanges();
			}	    	
	    },
	    /**
	     * 单行删除
	     */
	    _singleRemove : function(){
	    	var me = this;
	    	var ls = me.leftGrid.getStore(),rs = me.rightGrid.getStore();
	    	var rgtSelections =me.rightGrid.getSelectionModel().getSelection();
	    	
	    	if(rgtSelections.length == 0) {return;}
	    	if(rgtSelections.length > 1) {
				Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
				return;
			}else{
		    	var model = rgtSelections[0];
				ls.add(model);
				ls.commitChanges();
				rs.remove(model);
				rs.commitChanges();				
			}	    	
	    },
	    /**
	     * 多行删除
	     */
	    _allRemove : function(){
	    	var me = this;
	    	var ls = me.leftGrid.getStore(),rs = me.rightGrid.getStore();
	    	var rgtSelections =me.rightGrid.getSelectionModel().getSelection();
	    	
	    	if(rgtSelections.length == 0) {return;}
	    	for(var i=0; i<rgtSelections.length; i++) {
				var model = rgtSelections[i];
				ls.add(model);
				ls.commitChanges();
				rs.remove(model);
				rs.commitChanges();
			}	    	
	    },
	    /**
	     * 输入框动态自动过滤
	     * @param newVal
	     */
	    _leftFilter : function(newVal){
	    	var me = this;
	    	me.leftGrid.getStore().clearFilter(false);
	    	if(!newVal) return ;
	    	me.leftGrid.getStore().filterBy(function(item){
	    		console.log(item);
	    		var name = item.get('name'),nName = name.toUpperCase(),nVal = newVal.toUpperCase();
	    		if(nName.indexOf(nVal)>-1){
	    			return true;
	    		}else {
	    			return false;
	    		}
	    	});
	    },
	    /**
	     * 输入框动态自动过滤
	     * @param newVal
	     */
	    _rightFilter : function(newVal){
	    	var me = this;
	    	me.rightGrid.getStore().clearFilter(false);
	    	if(!newVal) return ;
	    	me.rightGrid.getStore().filterBy(function(item){
	    		var name = item.get('name'),nName = name.toUpperCase(),nVal = newVal.toUpperCase();
	    		if(nName.indexOf(newVal)>-1){
	    			return true;
	    		}else {
	    			return false;
	    		}
	    	});
	    },
	    /**
	     * 首先处理原始数据，将左侧的数据中与右侧数据有关的全部剔除
	     */
	    filterData : function(){
	    	var me = this;
	    	var ls = me.leftGrid.getStore(),rs = me.rightGrid.getStore(),models=[];
	    	rs.each(function(rec){
	    		if(ls.indexOf(rec)>-1){
	    			models.push(rec);
	    		}
	    	});
	    	ls.remove(models);
	    	ls.commitChanges();
	    },
	    /**
	     * 对外提供的方法，获取控件值
	     * @returns
	     */
	    getValues : function(){
	    	var me = this;
	    	return me.rightGrid.getStore();
	    },
	    /**
	     * 对外提供的方法，设置控件值
	     * data : 模型 或者 数组对象
	     * @returns
	     */
	    setValues : function(data){
	    	var me = this;
	    	me.rightGrid.getStore().add(data);
	    	me.rightGrid.getStore().commitChanges();
	    	me.filterData();
	    }
	    
});
