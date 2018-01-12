if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
if (!Dep.framework.editor.plugin.containers.layer) {
	Dep.framework.editor.plugin.containers.layer = {};
}
/**
 * 创建子元数据
 */
Dep.framework.editor.plugin.containers.layer.QueryMapping = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.QueryMapping",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
	},
	_initEvent : function() {
		var me = this;
		me.getContainer().regiestActions([ {
			name : "queryPassiveMapping",
			functionality : Ext.Function.bind(me.queryPassiveMapping, me),
			group : "queryPassiveMapping"
		},{name : "queryMapping",
			functionality : Ext.Function.bind(me.queryMapping, me),
			group : "queryMapping"}]);
	},
    queryMapping:function(id){
		var me = this,win = me.getQueryMappWin();
        win.show();
	},
	//请求查询映射
	requestQueryMapping:function(id){
		var me=this;
		var store=me.store;
		Ext.Ajax.request({
          url: "metadata/queryMapping.do",
          params: {
              id:id
          },
          method : "POST",
          success: function(response){
              var res = Ext.JSON.decode(response.responseText);
                  for(var i=0;i<res.result.length;i++){
                      var data=res.result[i];
                      var modelData=Ext.create('Dep.metadata.metadatamng.model.QueryMappingModel',data);
                      store.add(modelData);
                  }
          },
          failure : function(response) {
              var res = Ext.JSON.decode(response.responseText);
              Dep.Msg.conFailed(res.resultText);
          }
      });
	},
	//请求查询被映射
	requestQueryPassiveMapping:function(id){
		var me=this;
		var store=me.store;
		Ext.Ajax.request({
            url: "metadata/queryPassiveMapping.do",
            params: {
                id:id
            },
            method : "POST",
            success: function(response){
                var res = Ext.JSON.decode(response.responseText);
                    for(var i=0;i<res.result.length;i++){
                        var data=res.result[i];
                        var modelData=Ext.create('Dep.metadata.metadatamng.model.QueryMappingModel',data);
                        store.add(modelData);
                    }
            },
            failure : function(response) {
                var res = Ext.JSON.decode(response.responseText);
                Dep.Msg.conFailed(res.resultText);
            }
        });
	},
	queryPassiveMapping:function(id){
		var me=this;
		me.nodeId=id;//当点击单选按钮时方便获取id
        me.store.removeAll();     //清空上次显示的store
		me.requestQueryPassiveMapping(id);
		me.requestQueryMapping(id);
		var sex = Ext.getCmp('sex');//设置页面第二次打开后，单选按钮全部为没选中状态
		sex.items.items[0].setValue(false);
		sex.items.items[1].setValue(false);
	},
	// 渲染删除链接
    deleteBakRender: function (v, grid, index) {
        var me = this;
        return '<div><img style="vertical-align: middle;padding-right: 2px;" src="img/btn/delete.png"/><a href="#" style="color:blue;">' + '删除'
            + '</a></div>';
    },
    getQueryMappWin:function(){
    	var me=this;
        if (!this.queryMappWin) {
            this.queryMappWin = Ext.create('Ext.window.Window', {
                title: "映射&被映射列表",
                layout: 'fit',
                modal:true,
                closable:true,
                closeAction:'hide',
                plain:true,
                width: 1140,
                height: 700,
                items: [{
                     region: 'center',
                     xtype: 'panel',
                     layout: 'anchor',
                     autoScroll:true,
                     buttonAlign: "center",
                     items: [{
                     	xtype:"fieldcontainer" , 
                     	layout:"hbox" , 
                     	items:[{
	                        	xtype:'radiogroup',
	                        	fieldLabel: '映射&被映射',
	                        	id:'sex',
	                        	width: 260,
	                        	margin:'5 0 0 0',
	                        	items: [{
	                        	    name: 'sourceCode',
	                        	    boxLabel: '映射',
	                        	    itemId:'sourceCode',
	                        	    Value: false,
	                        	    name: 'eq',
	                        	    inputValue: '1',
	                        	},{
	                        	    name: 'targetCode',
	                        	    boxLabel: '被映射',
	                        	    Value: false,
	                        	    itemId:'targetCode',
	                        	    name: 'eq',
	                        	    inputValue: '2'
	                        	}],
	                        	listeners:{
	                        		change:function( view, newValue, oldValue, eOpts ){
	                        			var sel=Ext.getCmp('sex').getChecked()[0];
	                        			if(sel){
	                        				var sex = sel.boxLabel;
			                        		if(sex=='映射'){
			                        			me.store.removeAll();
			                        			me.requestQueryMapping(me.nodeId);
			                        		}else if(sex=='被映射'){
			                        			me.store.removeAll();
			                        			me.requestQueryPassiveMapping(me.nodeId);
			                        		}
	                        			}
		                        	}
	                        	}
	                        }]
                     },{
                             xtype: 'gridpanel',
                             viewConfig: {    //加载遮罩效果
                                 loadMask: false
                             },
                             itemId:'gridId',
                             margin:'5 0 0 0',
                             layout: 'fit',
                             height:605,
                             store: me.store=Ext.create('Dep.metadata.metadatamng.store.QueryMappingStore'),
                             autoScroll:true,
                             forceFit: true,//列宽度自适应
                             columns: [
                                 {
                                     text: 'mappId',
                                     dataIndex: 'mappId',
                                     align: 'center',
                                     hidden : true,
                                     columnWidth:40
                                 },{
                                	 header: '映射代码',
                                     dataIndex: 'sourceCode',
                                     align: 'center',
                                     columnWidth:40
                                 }, {
                                	 header: '映射名称',
                                     dataIndex: 'sourceName',
                                     align: 'center',
                                     columnWidth:40
                                 }, {
                                	 header: '被映射代码',
                                     dataIndex: 'targetCode',
                                     align: 'center',
                                     columnWidth:40
                                 }, {
                                	 header: '被映射名称',
                                     dataIndex: 'targetName',
                                     align: 'center',
                                     columnWidth:40
                                 },{
                                	 header: '映射类型名称',
                                     dataIndex: 'mappTypeName',
                                     align: 'center',
                                     columnWidth:40
                                 },{
                                	 xtype: 'gridcolumn',
                                     text: "操作",
                                     columnWidth:'100',
                                     align: "center",
                                     renderer: Ext.bind(me.deleteBakRender,me),
                                     listeners: {
                                         click: function (view, e, eOpts) {
                                        	 var me=this;
                                        	 var grid =Ext.ComponentQuery.query('#gridId');
                                        	 var selectionModel=grid[0].getSelectionModel()
                                        	 var record = selectionModel.selected.items[0];
                                        	 var mappId=record.raw.mappId;
                                        	 Ext.Ajax.request({
                                                 url: "metadata/delMapping.do",
                                                 params: {
                                                	 mappId:mappId
                                                 },
                                                 method : "POST",
                                                 success: function(response){
                                             		var records=selectionModel.getSelection();
                                             		if(records.length==0){
                                             			return;
                                             		}
                                             		for(var i=0,len=records.length;i<len;i++){
                                             			grid[0].store.remove(records[i]);
                                             		}
                                                 },
                                                 failure : function(response) {
                                                     var res = Ext.JSON.decode(response.responseText);
                                                     Dep.Msg.conFailed(res.resultText);
                                                 }
                                             });
                                         }
                                     }
                                 }
                             ]
                         }
                     ],
                     buttons: [{
                         xtype: 'button',
                         text: Dep.metadata.I18N.metadatamng.view.savebtn,
                         handler: function () {
                        	 me.queryMappWin.hide();
                         }
                     }, {
                         xtype: 'button',
                         text: Dep.metadata.I18N.metadatamng.view.cancelbtn,
                         handler: function () {
                             me.queryMappWin.hide();
                         }
                     }],
                 }]
            });
        }
        return me.queryMappWin;
	}
});