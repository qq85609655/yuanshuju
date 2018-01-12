/**
 * 添加依赖关系时选择元数据的窗口
 */
Ext.define("Dep.metadata.metadatamng.view.MDDependWin", {
	extend : "Ext.window.Window",
	title :"未依赖元数据列表",
	layout: 'fit',
	closeAction :'hide',
	width: 1140,
    initHeight: 700,
    height: 700,
	parentContainer : null,
	gridPanel : null,
	buttonAlign :"center",
	constructor : function(conf) {
		var me = this;
		if(conf.parentContainer)me.parentContainer = conf.parentContainer;

		me.gridPanel = me.bulidGridPanel(conf);
		me.items = me.gridPanel;
		me.buttons = me.buildBtn();
		me.callParent();
	},
	/**
	 * 自动构建扩展列
	 * @param props
	 * @param ar
	 * @returns
	 */
	autoBulidColumns : function(props,ar){
		var me = this;
		if(props){
			for(var i=0;i<props.length;i++){
				ar.push({ text: props[i].name, dataIndex: props[i].code, align: 'center', maxWidth: 80});
			}
		}
		return ar;
	},
	onLoadDependData : function(view,record,item,index,e,eOpts,mmId,fg,id,mmDepId){
        var me = this;
        var metadataId = record.internalId;
        Ext.Ajax.request({
            url: "metadatamap/getMDFromTree.do",
            params: {
            	id: mmId,
                metadataId: metadataId,
                fromMdId:id,
                toMdId: mmDepId
            },
            method : "POST",
            success: function(response){
            	gridDepend[0].store.removeAll();
            },
            failure : function(response) {
                var res = Ext.JSON.decode(response.responseText);
                Dep.Msg.conFailed(res.resultText);
            }
        });
        //设置用户若没有选中数据禁用确定按钮
        var gridDepend = Ext.ComponentQuery.query('#gridDepend');
        var res=gridDepend[0].getSelectionModel().getSelection();
        var okButton=Ext.ComponentQuery.query('#okButton');
        if(res.length==0){
        	okButton[0].disable();
        }else{
        	okButton[0].enable();
        }
    },
	/**
	 * 创建gridpanel
	 */
	bulidGridPanel:function (conf) {
		var me=this,panel=null;
		me.metadataStore = Ext.create("Dep.metadata.metadatamng.store.MDTreeStore");
        me.metadataStore.on('load', me.onLoadDependData.bind(me));
        me.mdStore = Ext.create("Dep.metadata.metadatamng.store.MDStore");
		columns =[
  	 		{ text: 'id', dataIndex: 'id', align: 'center', maxWidth: 80,hidden : true },
  	 		{ text: Dep.metadata.I18N.metadatamng.metadatagrid.code, dataIndex: 'mdCode', align: 'center',flex:1 },
  	 		{ text: Dep.metadata.I18N.metadatamng.metadatagrid.name, dataIndex: 'mdName', align: 'center', flex:1 },
  	 		{ text: Dep.metadata.I18N.metadatamng.metadatagrid.mmName, dataIndex: 'mmName', align: 'center', flex:1 }
  	 	];
  	 	if(conf && conf.propsData){
  	 		columns = me.autoBulidColumns(conf.propsData, columns);
  	 	}
        panel=Ext.create('Ext.panel.Panel',{
        	layout: 'border',
        	itemId:'panelPanel',
            defaults: {
                split: true,
            },
            items:[{
            	title: '元数据',
                region: 'west',
                xtype: 'treepanel',
                margins: '5 0 0 5',
                store: me.metadataStore,
                width: 200,
                collapsible: true,
                layout: 'fit',
                listeners : {
                	itemclick:function(view,record,item,index,e,eOpts ){
                		//获取参数并将参数传入Store中
                		var modelId=me.mdStore.proxy.extraParams.modelId;
                		var id=me.mdStore.proxy.extraParams.id;
                		var nodeId=record.internalId;
                		me.mdStore.getProxy().url = Dep.metadata.url.metadatamng.findNoDependMDs; 
                		me.mdStore.proxy.extraParams.modelId =modelId;  
                		me.mdStore.proxy.extraParams.nodeId = nodeId; 
                		me.mdStore.proxy.extraParams.id;
                		conf.store.removeAll();
                		var gridDepend = Ext.ComponentQuery.query('#gridDepend');
                    	gridDepend[0].reconfigure(me.mdStore);
                		me.mdStore.load();
                	}
                }
            },{
            	title: '未依赖元数据',
                region: 'center',
                xtype: 'panel',
                layout: 'anchor',
                autoScroll:true,
                margins: '5 5 0 0',
                buttonAlign: "center",
                items: [{
                	xtype:"fieldcontainer" , 
                	layout:"hbox" , 
                	items:[{
                    	xtype:'radiogroup',
                    	fieldLabel: '代码&名称',
                    	itemId:'selectRadio',
                    	width: 260,
                    	margin:'5 0 0 0',
                    	items: [{
                    	    name: 'mdCode',
                    	    boxLabel: '代码',
                    	    checked: true,
                    	    itemId:'mdCode',
                    	    name: 'sex',
                    	    inputValue: '1'
                    	},{
                    	    name: 'mdName',
                    	    boxLabel: '名称',
                    	    itemId:'mdName',
                    	    name: 'sex',
                    	    inputValue: '2'
                    	}]
                    },{
                    	xtype: 'textfield',
        		        itemId: 'codeAndName',
        		        emptyText:'请输入值',
        		        margin:'5 0 0 0'
                    },{
                    	xtype:"button", 
                    	margin:'5 0 0 5',
                    	text:"查询",
                    	listeners:{
                        	click:function( view, e, eOpts ){ 
                        		var id=me.mdStore.proxy.extraParams.modelId;//获取元模型Id
                        		me.MDMapSubStore = Ext.create("Dep.metadata.metadatamng.store.MDMapSubStore");
                        		var codeAndName=Ext.ComponentQuery.query('#codeAndName');
                            	var MdName=codeAndName[0].getValue();//获取输入框中的值
                            	var grid =Ext.ComponentQuery.query('#selectRadio')
                        		var sex = grid[0].getChecked()[0].boxLabel;//获取选中的值
                        		if(sex=='名称'){
                        			//将参数封装成对象传入Storez中
                        			var param = Ext.apply({mmId:id,mdCodeLike:null,mdNameLike:MdName,mappId:null});
                        			var params = Ext.apply(me.MDMapSubStore.proxy.extraParams, param);
                        			var store = me.MDMapSubStore;
                        			var gridDepend = Ext.ComponentQuery.query('#gridDepend');
                                	gridDepend[0].reconfigure(store);
                                	me.mdStore.load();
                        		}
                        		if(sex=='代码'){
                        			if(!(/^[\w]/.test(MdName))){
                        				codeAndName[0].setValue('输入代码不正确！');
                        				return;
                        			}else{
                        				var param = Ext.apply({mmId:id,mdCodeLike:MdName,mdNameLike:null,mappId:null});
                        				var params = Ext.apply(me.MDMapSubStore.proxy.extraParams, param);
                        				var gridDepend = Ext.ComponentQuery.query('#gridDepend');
                                    	var store = me.MDMapSubStore;
                        				gridDepend[0].reconfigure(store);
                                    	me.mdStore.load();
                        			}
                        		}
                        	}
                    	}
                    }]
                },{
                	xtype: 'gridpanel',
                    selModel: {
                    	selType: 'checkboxmodel',
                    	mode:"SINGLE",//只能选中一个
                		listeners:{
                			select:function( view, record, index, eOpts ){
                				if(record){
                					//判断是否选中数据，若没有选中数据则禁用确定按钮
                					var okButton=Ext.ComponentQuery.query('#okButton');
                					okButton[0].enable()
                				}
                			}
                		}
                    },   //选择框(复选框)
                    viewConfig: {    //加载遮罩效果
                        loadMask: false
                    },
                    overflowY : true,
                    height:573,
                    itemId: 'gridDepend',
                    layout: 'fit',
                    store:conf.store,
                    autoload:true,
                    bodyStyle: 'overflow-x:hidden; overflow-y:hidden',
                    columns : columns
                }]
            }]
		});
//        if(conf && conf.store){
//        	var gridDepend = Ext.ComponentQuery.query('#gridDepend');
//        	gridDepend[0].bindStore(conf.store);
//	 	}else{
//	 		console.log("元数据gridPanel配置异常，没有store配置");
//	 		return null;
//	 	}
        return panel;
	},
	/**
	 * 创建按钮
	 */
	buildBtn : function(){
		var me = this,btnAr = null;
		btnAr = [{
			xtype : 'button',
			itemId:'okButton',
			text : Dep.metadata.I18N.metadatamng.view.savebtn,
			handler : function(){
				me.parentContainer.executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","addDependMetadata");
			}
		},{
			xtype : 'button',
			text : Dep.metadata.I18N.metadatamng.view.cancelbtn,
			handler : function(){
				me.hide();
			}
		}];
		return btnAr;
	},
	/**
	 * win的监听器
	 */
	listeners : {
		'hide' : function(){
			var me = this;
			if(me.parentContainer){
				me.parentContainer.executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","closeDependMetadataWin");
			}
		}
	},
	/**
	 * 获取gridpanel中选中的记录
	 */
	getValues : function(){
		var me = this,res =[];
		if(me.gridPanel){
//			res = me.gridPanel.getSelectionModel().getSelection();
			var gridDepend = Ext.ComponentQuery.query('#gridDepend');
	 		res =gridDepend[0].getSelectionModel().getSelection()
		}
		return res;
	},
	/**
	 * 获取gridpanel
	 */
	getGridPanel : function(){
		var me = this;
		return me.gridPanel;
	}
});