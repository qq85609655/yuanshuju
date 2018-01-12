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
Dep.framework.editor.plugin.containers.layer.CreateMapSubMetadata = Dep.framework.editor.plugin.BasePlugin.extend({
    /**
     * 插件名称
     */
    NAME : "Dep.framework.editor.plugin.containers.layer.CreateMapSubMetadata",

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
            name : "createMapSubMD",
            functionality : Ext.Function.bind(me.createMapSubMD, me),
            group : "createMapSubMD"
        }]);
    },

    /**
     * 添加子元数据
     * @param metamodel
     * @param id
     */
    createMapSubMD : function(mmId,figure,id,fromMdId,toMdId,mmDepeFromId){
        var me = this,win = me.getUploadWin(mmId,id,fromMdId,toMdId,mmDepeFromId);
        me.onLoadDependData.bind(me);
        win.show();
    },
    onLoadDependData : function(view,record,item,index,e,eOpts,id,fromMdId,toMdId){
        var me = this;
        var metadataId = record.internalId;
        Ext.Ajax.request({
            url: "metadatamap/getMDFromTree.do",
            params: {
                id: me.id,
                metadataId: metadataId,
                fromMdId: me.fromMdId,
                toMdId: me.toMdId
            },
            method : "POST",
            success: function(response){
            	me.dependMDStore.removeAll();
                var res = Ext.JSON.decode(response.responseText);
                    for(var i=0;i<res.result.length;i++){
                        var data=res.result[i];
                        var modelData=Ext.create('Dep.metadata.metadatamng.model.MDMapSubModel',data);
                        me.dependMDStore.add(modelData);
                    }
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
//        node.set('loaded',false);
    },
    onFuzzySearch:function(view, e, eOpts ){
    	var me = this;
    	var codeAndName=Ext.ComponentQuery.query('#codeAndName');
    	var MdName=codeAndName[0].getValue();
    	var grid =Ext.ComponentQuery.query('#selectRadio')
		var sex = grid[0].getChecked()[0].boxLabel;
		if(sex=='名称'){
			var param = Ext.apply({mdCodeLike:null,mdNameLike:MdName,mappId:me.id});
			var params = Ext.apply(me.dependMDStore.proxy.extraParams, param);
			me.dependMDStore.load();
		}
		if(sex=='代码'){
			if(!(/^[\w]/.test(MdName))){
				codeAndName[0].setValue('输入代码不正确！');
				return;
			}else{
				var param = Ext.apply({mdCodeLike:MdName,mdNameLike:null,mappId:me.id});
				var params = Ext.apply(me.dependMDStore.proxy.extraParams, param);
				me.dependMDStore.load();
			}
		}
    },
    /**
     * 获取导入文件的弹窗
     *
     * @return {}
     */
    getUploadWin : function(mmId,id,fromMdId,toMdId,mmDepeFromId) {
        var me = this;
        var mdId= me.toMdId
        me.id = id;
        me.fromMdId = fromMdId;
        me.toMdId = toMdId;
        me.mmDepeFromId=mmDepeFromId;
//        if (!this.upLoadWin) {
            me.dependMDStore = Ext.create("Dep.metadata.metadatamng.store.MDMapSubStore");
//            if (!me.metadataStore) {
                me.metadataStore = Ext.create("Dep.metadata.metadatamng.store.MDTreeStore");
                me.metadataStore.on('load', me.onLoadDependData.bind(me));
//            }
            this.formPanel = Ext.create('Ext.form.Panel', {
                layout: 'border',
                defaults: {
                    split: true,
                },
                items: [
                    {
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
                        		me.onLoadDependData(view,record,item,index,e,eOpts);
                        	}
                        }
                    }, {
                        title: '未依赖元数据',
                        region: 'center',
                        xtype: 'panel',
//                        layout: 'fit',
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
		                        		me.onFuzzySearch(view, e, eOpts );
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
                                store: me.dependMDStore,
                                autoload:true,
                                bodyStyle: 'overflow-x:hidden; overflow-y:hidden',
                                columns: [
                                    {
                                        text: 'id',
                                        dataIndex: 'id',
                                        align: 'center',
                                        hidden : true
                                    }, {
                                        text: 'fromMdId',
                                        dataIndex: 'fromMdId',
                                        align: 'center',
                                        hidden : true
                                    }, {
                                        text: 'toMdId',
                                        dataIndex: 'toMdId',
                                        align: 'center',
                                        hidden : true
                                    }, {
                                        text: 'mmDepeFromId',
                                        dataIndex: 'mmDepeFromId',
                                        align: 'center',
                                        hidden : true
                                    }, {
                                        text: '代码',
                                        dataIndex: 'mdCode',
                                        align: 'center',
                                        flex: 1
                                    }, {
                                        text: '名称',
                                        dataIndex: 'mdName',
                                        align: 'center',
                                        flex: 1
                                    }, {
                                        text: '所属元模型',
                                        dataIndex: 'mmName',
                                        align: 'center',
                                        flex: 1
                                    }
                                ]
                            }
                        ],
                        buttons: [{
                            xtype: 'button',
                            text: Dep.metadata.I18N.metadatamng.view.savebtn,
                            itemId:'okButton',
                            listeners:{
                            	click:function( view, e, eOpts ){
                            		var gridDepend = Ext.ComponentQuery.query('#gridDepend');
                                    var res=gridDepend[0].getSelectionModel().getSelection();
                                    if(res instanceof Array){
                                        for(var i=0;i<res.length;i++){
                                            var data=res[i].getData();
                                            if(me.toMdId){
                                            	Ext.Ajax.request({
                                                    url: "metadatamap/createMapping.do",
                                                    params: {
                                                        mmDepeFromId: me.mmDepeFromId,
                                                        fromMdId: data.id,
                                                        toMdId:me.toMdId
                                                    },
                                                    method : "POST",
                                                    success: function(response){
                                                        var res = Ext.JSON.decode(response.responseText);
                                                        if (res) {
                                                            if (res.resultCode === 1) {
                                                                Dep.framework.editor.util.Msg.success(res.resultText, "提示");
                                                            } else {
                                                                Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
                                                            }
                                                        }
                                                    },
                                                    failure : function(response) {
                                                        var res = Ext.JSON.decode(response.responseText);
                                                        Dep.Msg.conFailed(res.resultText);
                                                    }
                                                });
                                            }else if(me.fromMdId){
                                            	Ext.Ajax.request({
                                                    url: "metadatamap/createMapping.do",
                                                    params: {
                                                        mmDepeFromId: me.mmDepeFromId,
                                                        fromMdId:me.fromMdId,//源ID
                                                        toMdId:data.id//目标id
                                                    },
                                                    method : "POST",
                                                    success: function(response){
                                                        var res = Ext.JSON.decode(response.responseText);
                                                        if (res) {
                                                            if (res.resultCode === 1) {
                                                                Dep.framework.editor.util.Msg.success(res.resultText, "提示");
                                                            } else {
                                                                Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
                                                            }
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
                                    me.upLoadWin.close();
                            	}
                            }
                        }, {
                            xtype: 'button',
                            text: Dep.metadata.I18N.metadatamng.view.cancelbtn,
                            handler: function () {
                                me.upLoadWin.close();
                            }
                        }],
                    }],
//                renderTo: Ext.getBody(),
            });

            this.upLoadWin = Ext.create('Ext.window.Window', {
                title: "未依赖元数据列表",
                layout: 'fit',
//                closeAction: 'destory',
                width: 1140,
                initHeight: 700,
                height: 700,
                itemId:'winId',
                parentContainer: null,
                gridPanel: null,
                items: [me.formPanel],
                listeners:{
                    close:function( panel, eOpts ){
                        var param = Ext.apply({});
                        var params = Ext.apply(me.dependMDStore.proxy.extraParams, param);
                        me.dependMDStore.load();
                    }
                }
            });

//        }

        me.formPanel.dataId = id;
        me.formPanel.mmId = mmId;
        return me.upLoadWin;
    },

});