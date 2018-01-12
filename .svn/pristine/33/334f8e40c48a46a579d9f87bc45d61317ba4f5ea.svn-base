/**
 * 视图管理的弹出窗口界面
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.view.ViewMngWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : true,
		maximizable : true,
	    itemId:'viewMngWindow',
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		title : '视图管理',
		titleAlign : 'left',
		layout: 'border',
		closeAction : "hide",
		width : 1200,
		height : 700,
		constructor : function(conf) {
            var me = this;
            Ext.define("fun", {
               comm:function (record) {
                   //设置是否隐藏单选中的选中状态
                   if(record.raw.ishidden==1){
                       var yHide=Ext.ComponentQuery.query('#yHide')[0].setValue(true);
                       var nHide=Ext.ComponentQuery.query('#nHide')[0].setValue(false);
                   }else if(record.raw.ishidden==0||record.raw.ishidden==null){
                       var yHide=Ext.ComponentQuery.query('#yHide')[0].setValue(false);
                       var nHide=Ext.ComponentQuery.query('#nHide')[0].setValue(true);
                   }
                   if(record.raw.leaf){
                       //自定义视图
                       Ext.ComponentQuery.query('#sys')[0].setValue(true);
                       Ext.ComponentQuery.query('#user')[0].setValue(false);
                   }else if(record.raw.leaf==false||record.raw.leaf==null){
                       Ext.ComponentQuery.query('#sys')[0].setValue(false);
                       Ext.ComponentQuery.query('#user')[0].setValue(true);
                   }
                   if(record.raw.defaultShow=="1"){
                       //默认显示
                       var nShow=Ext.ComponentQuery.query('#nShow')[0].setValue(false);
                       var yShow=Ext.ComponentQuery.query('#yShow')[0].setValue(true);
                   }else if(record.raw.defaultShow=="0" || record.raw.defaultShow==null){
                       var nShow=Ext.ComponentQuery.query('#nShow')[0].setValue(true);
                       var yShow=Ext.ComponentQuery.query('#yShow')[0].setValue(false);
                   }
                   //设置显示顺序的值
                   var showOrder=Ext.ComponentQuery.query('#showOrder')[0];
                   showOrder.setValue(record.raw.displayOrder);
                   //设置备注的值
                   var remark=Ext.ComponentQuery.query('#remark')[0];
                   remark.setValue(record.raw.text);
               },
                removeAttributePanel:function () {
                    //获取window窗口
                    var viewMngWindow=Ext.ComponentQuery.query('#viewMngWindow');
                    //获取属性panel
                    var attributePanel=Ext.ComponentQuery.query('#attributePanel')[0];
                    viewMngWindow[0].remove(attributePanel);
                    viewMngWindow[0].doLayout();//刷新布局
                }
            });
			me.headPanel = Ext.create('Ext.panel.Panel', {
		    	region : 'north',
		    	xtype : 'panel',
		    	frame: true,
		    	border : false,
		    	titleAlign : 'center',
		    	bodyPadding : 5,
		    	width : 1000,
				height : 100,
				html : '<div id="viewmng_id" style="font-size: 14px;"><b>操作说明：</b><br/>'+
						'1、请先点击用户视图工具栏里的【添加】按钮，输入视图名称，视图描述为选填项，确定新建用户视图；<br/>'+
						'2、请在用户视图上创建文件夹；提示：在用户视图树上可通过右键上下文菜单来修改、删除视图或添加、删除文件夹。</div>'
	    
			});
			me.sysViewTreePanel = Ext.create('Ext.tree.Panel', {
				region : 'west',
		    	xtype : 'treepanel',
		    	title : '系统视图',
		    	titleAlign : 'center',
				itemId:'sysViewTreePanel',
		    	width : 200,
				height : 500,
				rootVisible : false,
				cmpTag : 'sysviewtree',
				animate : true,
				collapsible : true,
				resizable : true,
				resizeHandles : 'e',
				store : conf.sysViewStore,
                listeners: {
                    cellclick:function(view,td,cellIndex,record,tr,rowIndex,e,eOpts) {
                        var me=this;
                        //设置默认参数
                        var defaultParameter=new fun();
                        defaultParameter.comm(record);
                        //获取window窗口
                        var viewMngWindow=Ext.ComponentQuery.query('#viewMngWindow');
                        //获取属性panel
                        var attributePanel=Ext.ComponentQuery.query('#attributePanel')[0];
                        var viewList=viewMngWindow[0].items;
                        viewList.add(attributePanel);
                        viewMngWindow[0].doLayout();//刷新布局
                        var allNode=me.view.getNodes();//获取全部节点信息
                        var selMessage=record.raw.text;//获取选中节点信息
						me.raw=record;
                        var userViewTreePanel=Ext.ComponentQuery.query('#userViewTreePanel')[0];
                        userViewTreePanel.raw='';
                        for(var i=0;i<6;i++){
                        	var selNode=allNode[i].textContent;
                            if(selNode==selMessage){
                            	me.selNode=allNode[i];
								return;
							}
						}
                    }
                }
			});
			me.userViewTreePanel = Ext.create('Ext.tree.Panel', {
				xtype : 'treepanel',
		    	width : '100%',
				height : 515,
				rootVisible : false,
				border : null,
				useArrows : false,
				itemId:'userViewTreePanel',
				cmpTag : 'userviewtree',
				store : conf.userViewStore,
                listeners: {
                    cellclick:function(view,td,cellIndex,record,tr,rowIndex,e,eOpts) {
                        var me=this;
                        var defaultParameter=new fun();
                        defaultParameter.comm(record)
                        //获取window窗口
                        var viewMngWindow=Ext.ComponentQuery.query('#viewMngWindow');
                        //获取属性panel
                        var attributePanel=Ext.ComponentQuery.query('#attributePanel')[0];
                        var viewList=viewMngWindow[0].items;
                        //当用户点击的为视图时添加属性表单面板，否则删除
                        if(record.raw.nodeType){
                            viewList.add(attributePanel);
                            viewMngWindow[0].doLayout();//刷新布局
                            var allNode=me.view.getNodes();//获取全部节点信息
                            var selMessage=record.raw.text;//获取选中节点信息
							me.raw=record;
                            //获取系统视图信息
                            var sysViewTreePanel=Ext.ComponentQuery.query('#sysViewTreePanel')[0];
                            sysViewTreePanel.raw='';
                            for(var i=0;i<6;i++){
                                var selNode=allNode[i].textContent;
                                if(selNode==selMessage){
                                    me.selNode=allNode[i];
                                    return;
                                }
                            }
						}else{
                            viewMngWindow[0].remove(attributePanel);
                            viewMngWindow[0].doLayout();//刷新布局
						}
                    }
                }
			});
            me.attributePanel= Ext.create('Ext.form.Panel', {
                title: '属性',
                region: 'east',
				itemId:'attributePanel',
                buttonAlign:'center',
                titleAlign : 'center',
                width: 250,
				items:[{
                    xtype: 'radiogroup',
                    id   : 'show',
					itemId:'show',
                    fieldLabel: "是否默认显示",
                    items : [{
                        boxLabel: '是',
                        name: 'show',
						itemId:'yShow',
                        inputValue:'Y',
                        checked:true
                    },{
                        boxLabel: '否',
                        name: 'show',
                        itemId:'nShow',
                        inputValue:'N'
                    }]
                },{
                    xtype: 'radiogroup',
                    id   : 'viewType',
                    fieldLabel: "视图类型",
					itemId:'viewType',
                    items : [{
                        boxLabel: '系统',
                        name: 'viewType',
						itemId:'sys',
                        inputValue:'sys'
                    },{
                        boxLabel: '用户',
                        name: 'viewType',
						itemId:'user',
                        inputValue:'user'
                    }]
				},{
                    xtype: 'radiogroup',
                    id   : 'isHide',
					itemId:'isHide',
                    fieldLabel: "是否隐藏",
                    items : [{
                        boxLabel: '是',
                        name: 'isHide',
                        itemId:'yHide',
                        inputValue:'yes'
                    },{
                        boxLabel: '否',
                        name: 'isHide',
                        inputValue:'no',
                        itemId:'nHide',
                        checked : true
                    }]
				},{
                    xtype: 'textfield',
                    fieldLabel: '显示顺序',
					itemId:'showOrder',
                    regex: /^[1-9]\d*$/,
                    regexText : '请输入正整数',
                    width:230
                },{
                    xtype:'textareafield',
					itemId:'remark',
                    fieldLabel:'备注',
                    width:230
				}],
                buttons: [{
                    xtype: 'button',
                    text: Dep.metadata.I18N.metadatamng.view.savebtn,
                    handler: function () {
                        //获取系统视图信息
                        var sysViewTreePanel=Ext.ComponentQuery.query('#sysViewTreePanel')[0];
                        //获取用户视图信息
                        var userViewTreePanel=Ext.ComponentQuery.query('#userViewTreePanel')[0];
                        //获取选中节点的id
						var id=sysViewTreePanel.raw?sysViewTreePanel.raw.raw.id:userViewTreePanel.raw.raw.id;
						//获取选中节点名称
                        var viewName=sysViewTreePanel.raw?sysViewTreePanel.raw.raw.text:userViewTreePanel.raw.raw.text;
                        //获取是否默认选中单选框
                        var show=Ext.ComponentQuery.query('#show')[0].getChecked()[0].boxLabel;
                        var defaultShow=(show=='是')?1:0;
                        //获取视图类型选中的单选框
                        var isViewType=Ext.ComponentQuery.query('#viewType')[0].getChecked()[0].boxLabel;
                        var viewType=(isViewType=='系统')?0:1;
                        //获取是否隐藏单选框
                        var isHide=Ext.ComponentQuery.query('#isHide')[0].getChecked()[0].boxLabel;
                        var ishidden=(isHide=='是')?1:0;
						//获取显示顺序
                        var showOrder=Ext.ComponentQuery.query('#showOrder')[0].value;
                        //备注
                        var remark=Ext.ComponentQuery.query('#remark')[0].value;
                        //将数据封装成对象
                        var param = Ext.apply({id:id,
                            defaultShow:defaultShow,
                            viewName:viewName,
                            viewType:viewType,
                            ishidden:ishidden,
                            displayOrder:showOrder,
                            remark:remark});
                        var model = Ext.create('Dep.metadata.viewmng.model.ViewModel', param);
                        var params = model.getData();
                        var url = 'view/editView.do';
                        Fn.RequestObj(url, true, params, Dep.metadata.I18N.viewmng.controller.saveFailed, function() {
                            Dep.framework.editor.util.Msg.success(" 视图信息已经保存成功！", "提示");
                        }, function() {
                            Dep.framework.editor.util.Msg.failed(Dep.metadata.I18N.viewmng.controller.serverInvalid/*"服务端处理失败！"*/,
                                Dep.metadata.I18N.viewmng.msgtitle.info/*"提示"*/);
                        });
                        //刷新系统视图节点
                        var sysParam=Ext.apply({viewType:0,node:0});
                        var sysparams = Ext.apply(conf.sysViewStore.proxy.extraParams,sysParam);
                        var sysStore = conf.sysViewStore;
                        sysViewTreePanel.reconfigure(sysStore);
                        conf.sysViewStore.load();
                        //刷新用户视图节点
                        var suerParam=Ext.apply({viewType:1,node:'root'});
                        var userparams = Ext.apply(conf.userViewStore.proxy.extraParams,suerParam);
                        var userStore = conf.userViewStore;
                        userViewTreePanel.reconfigure(userStore);
                        conf.userViewStore.load();

                    }
                }]
            });
			me.userViewPanel = Ext.create('Ext.panel.Panel', {
				region : 'center',
		    	xtype : 'panel',
		    	title : '用户视图',
		    	titleAlign : 'center',
		    	width : 800,
				height : 500,
		    	tbar: [
				  { xtype: 'button',
				  	text: '添加',
				  	cmpTag : 'adduserview',
				  	icon : 'Dep/metadata/resource/img/add.png',
				  	handler : function() {
				      this.fireEvent('adduserview');
                        var defaultParameter=new fun();
                        defaultParameter.removeAttributePanel();}
				  },
				  { xtype: 'button',
				  	text: '删除',
				  	cmpTag : 'deluserview',
				  	icon : 'Dep/metadata/resource/img/del.png',
				  	handler : function() {
				      this.fireEvent('deluserview');
                        var defaultParameter=new fun();
                        defaultParameter.removeAttributePanel();}
				  },
				  { xtype: 'button',
				  	text: '上移',
				  	hidden : true,
				  	cmpTag : 'moveupview',
				  	handler : function() {
				      this.fireEvent('moveup');
                        var defaultParameter=new fun();
                        defaultParameter.removeAttributePanel();}
				  },
				  { xtype: 'button',
				  	text: '下移',
				  	hidden : true,
				  	cmpTag : 'movedownview',
				  	handler : function() {
				      this.fireEvent('movedown');
                        var defaultParameter=new fun();
                        defaultParameter.removeAttributePanel();}
				  },
				  { xtype: 'button',
				  	text: '刷新',
				  	cmpTag : 'refreshview',
				  	icon : 'Dep/metadata/resource/img/refresh.png',
				  	handler : function() {
				      this.fireEvent('refresh');
                        var defaultParameter=new fun();
                        defaultParameter.removeAttributePanel();
				  }
				  }
				],
				items : [me.userViewTreePanel]
			});
			me.items = [me.headPanel, me.sysViewTreePanel, me.userViewPanel];
			me.callParent();
		},
		listeners : {
	        resize : {
	            fn: function(){ 
	            	var me = this;
	            	if(me.userViewPanel.isVisible()) {
	            		var cHeight = me.userViewPanel.getHeight();
	            		var rHeight = cHeight - 55;
		            	me.userViewTreePanel.maxHeight = rHeight;
		            	me.userViewTreePanel.setSize('100%', rHeight);
	            	}
	            }
	        },

	    }
});