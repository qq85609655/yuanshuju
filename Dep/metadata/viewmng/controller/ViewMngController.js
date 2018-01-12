/**
 * 视图管理控制器
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.controller.ViewMngController', {
	extend : 'Ext.app.Controller',
	/**
	 * 系统视图树的store
	 * @type {Ext.data.TreeStore}
	 */
	sysViewStore : null,
	/**
	 * 用户自定义视图树的store
	 * @type {Ext.data.TreeStore}
	 */
	userViewStore : null,
	/**
	 * 视图管理的弹窗
	 * @type {Ext.window.Window}
	 */
	window : null,
	/**
	 * 编辑视图消息的弹窗
	 * @type {Ext.window.Window}
	 */
	addViewWin : null,
	/**
	 * 编辑文件夹信息的弹窗
	 * @type {Ext.window.Window}
	 */
	editFolderWin : null,
	
	refs: [{
	         ref: 'sysViewTreePanel',//系统视图树
	         selector: 'treepanel[cmpTag=sysviewtree]'
   		 },{
	         ref: 'userViewTreePanel',//用户视图树
	         selector: 'treepanel[cmpTag=userviewtree]'
   		 },{
	         ref: 'userViewName',//用户视图名称
	         selector: 'textfield[cmpTag=userviewname]'
   		 },{
	         ref: 'userViewIcon',//用户视图图标
	         selector: 'fileuploadfield[cmpTag=userviewicon]'
   		 },{
	         ref: 'userViewRemark',//用户视图描述
	         selector: 'textarea[cmpTag=userviewremark]'
   		 },{
	         ref: 'folderName',//子文件夹名称
	         selector: 'textfield[cmpTag=foldername]'
   		 },{
	         ref: 'folderIcon',//子文件夹图标
	         selector: 'fileuploadfield[cmpTag=foldericon]'
   		 }],
   		 
	/**
	 * 控制器的初始化方法
	 */
	init : function() {
		var me = this;
		me.initStore();
		me.initView();
		me.bindEvent();
		me.showWin();
		me.callParent();
	},
	/**
	 * 显示视图管理页面
	 */
	showWin : function(){
		var me = this;
		if(!me.window){
			me.window = me.initView();
		}
		me.window.show();
	},
	/**
	 * 树形菜单数据的初始化方法
	 */
	initStore : function() {
		var me = this;
		if(!me.sysViewStore) {
			me.sysViewStore = Ext.create('Dep.metadata.viewmng.store.SysViewTreeStore');
		}
		if(!me.userViewStore){
			me.userViewStore = Ext.create('Dep.metadata.viewmng.store.UserViewTreeStore');
		}
	},
	/**
	 * 界面的初始化方法
	 */
	initView : function() {
		var me = this;
		if(!me.window) {
			me.window = Ext.create('Dep.metadata.viewmng.view.ViewMngWindow', {
				sysViewStore : me.sysViewStore,
				userViewStore : me.userViewStore
			});
		}
	},
	/**
	 * 绑定事件
	 */
	bindEvent : function() {
		var me = this;
		me.control({
					'treepanel[cmpTag=viewtreepanel]' : {//系统视图里的treepanel
						itemclick : me.selectItem
					},
					'treepanel[cmpTag=userviewtree]' : {//用户视图里的treepanel
						itemclick : me.selectItem,
						itemcontextmenu : me.showContextmenu
					},
					'button[cmpTag=adduserview]' : {//添加
						adduserview : me.showEditViewWin
					},
					'button[cmpTag=deluserview]' : {//删除
						deluserview : me.deleteViewOrFolder
					},
					'button[cmpTag=moveupview]' : {//上移
						moveup : me.moveUp
					},
					'button[cmpTag=movedownview]' : {//下移
						movedown : me.moveDown
					},
					'button[cmpTag=refreshview]' : {//刷新
						refresh : me.refresh
					},
					'button[cmpTag=confirmaddview]' : {//确定
						confirmaddview : me.confirmSaveView
					},
					'button[cmpTag=canceladdview]' : {//取消
						canceladdview : me.cancelSaveView
					},
					'button[cmpTag=confirmaddfolder]' : {//确定
						confirmaddfolder : me.confirmAddFolder
					},
					'button[cmpTag=canceladdfolder]' : {//取消
						canceladdfolder : me.cancelAddFolder
					},
					'window[cmpTag=editviewwindow]' : {//编辑视图的弹窗
						beforeshow : me.clearInvalidMsgs
					},
					'window[cmpTag=editfolderwindow]' : {//编辑文件夹的弹窗
						beforeshow : me.clearInvalidMsgs
					},
					scope : me
				});
	},
	/**
	 * 选中树形菜单里的一个菜单项的处理函数
	 * @param {Ext.tree.View} obj     用户视图的整个树形菜单.  
	 * @param {Ext.data.Model} record  所选item所对应的一条记录数据. 
	 * @param {HTML标签} item    所点击的一个HTML元素. 
	 * @param {Number} index   该item在树形菜单从上到下所排列的索引.  
	 * @param {Ext.EventObject} e       本次事件所对应的事件对象. 
	 */
	selectItem : function(obj, record, item, index, e) {
	},
	
	/**
	 * 添加或修改一个用户视图的属性信息弹窗
	 */
	showEditViewWin : function(record) {
		var me = this;
		if(!me.addViewWin) {
			me.addViewWin = Ext.create('Dep.metadata.viewmng.view.AddViewWindow');
		}
		me.cleanEditViewWin();
		if(record) {//修改用户视图基本信息
			me.addViewWin.record = record;
			me.addViewWin.isAdd = false;
			me.addViewWin.setTitle(Dep.metadata.I18N.viewmng.controller.editView);//"修改视图"
			me.getUserViewName().setValue(record.raw.text);
			me.getUserViewRemark().setValue(record.raw.remark);
		}
		me.addViewWin.show();
	},
	/**
	 * 清空编辑用户视图基本信息弹窗里的数据
	 */
	cleanEditViewWin : function() {
		var me = this;
		me.addViewWin.isAdd = true;
		me.addViewWin.setTitle(Dep.metadata.I18N.viewmng.controller.addView);//"添加视图"
		me.getUserViewName().setValue('');
		me.getUserViewRemark().setValue('');
		me.getUserViewIcon().reset();
	},
	/**
	 * 批量删除用户视图或文件夹
	 */
	deleteViewOrFolder : function() {
		var me = this;
		var userViewTreePanel = me.getUserViewTreePanel();
		var recordArray = userViewTreePanel.getSelectionModel().getSelection();
		if(recordArray.length == 0) {
			Dep.framework.editor.util.Msg.info(Dep.metadata.I18N.viewmng.controller.selectRecord/*"请先选择一条记录。"*/, 
				Dep.metadata.I18N.viewmng.msgtitle.info/*"提示"*/);
			return;
		}
		var record = null, url = "";
		for(var i in recordArray) {
			var id = recordArray[i].get('id');
			var depth = recordArray[i].get('depth');
			if(depth == 1) {
				record = recordArray[i];
				url = 'view/deleteView.do';
				me.confirmDeleteNode(record, url);
			}else if(depth != 0) {
				record = recordArray[i];
				url = 'view/deleteFolder.do';
				me.confirmDeleteNode(record, url);
			}
		}
	},
	/**
	 * 上移一行
	 */
	moveUp : function() {
		var me = this;
		var userViewTreePanel = me.getUserViewTreePanel();
		var recordArray = userViewTreePanel.getSelectionModel().getSelection();
		var record = recordArray[0];
		if(!record) {
			Dep.framework.editor.util.Msg.info("请先选择一个用户视图。",
				Dep.metadata.I18N.viewmng.msgtitle.info/*"提示"*/);
			return false;
		}
		var allRows = userViewTreePanel.items.items[0].store.data.items;
		me.sortByIndex(record, allRows, 'moveUp');
	},
	/**
	 * 下移一行
	 */
	moveDown : function() {
		var me = this;
		var userViewTreePanel = me.getUserViewTreePanel();
		var recordArray = userViewTreePanel.getSelectionModel().getSelection();
		var record = recordArray[0];
		if(!record) {
			Dep.framework.editor.util.Msg.info("请先选择一个用户视图。",
				Dep.metadata.I18N.viewmng.msgtitle.info/*"提示"*/);
			return false;
		}
		var allRows = userViewTreePanel.items.items[0].store.data.items;
		me.sortByIndex(record, allRows, 'moveDown');
	},
	/**
	 * 根据调整后的index重新排序
	 */
	sortByIndex : function(record, allRows, flag) {
		var me = this, newIndex = null;
		var userViewTreePanel = me.getUserViewTreePanel();
		var userStore = userViewTreePanel.store;
		var selectIndex = record.get('index');
		if(record.get('depth')>=2) {
			Dep.framework.editor.util.Msg.info("只能移动用户视图。", "提示");
			return;
		}
		if(flag=='moveUp') {
			newIndex = selectIndex-1;
		}else if(flag=='moveDown') {
			newIndex = selectIndex+1;
		}
		var nextNode = null;
		for(var i in allRows) {
			if(allRows[i].get('index') == newIndex) {
				nextNode = allRows[i];
				break;
			}
		}
		if(!nextNode) {
			return;
		}
		nextNode.set('index', selectIndex);
		record.set('index', newIndex);
		allRows[newIndex] = record;
		allRows[selectIndex] = nextNode;
		userStore.sort([
		    {
		        property : 'index',
		        direction: 'ASC'
		    }
		]);
	},
	/**
	 * 刷新按钮的处理函数
	 */
	refresh : function() {
		var me = this;
		me.refreshUserViewTree('root');
	},
	
	/**
	 * 确定添加或修改视图，向后台提交数据
	 * 
	 * @param {Ext.button.Button} obj 确定按钮控件对象
	 */
	confirmSaveView : function(obj) {
		var me = this;
		var url = "", record = null;
		var form = obj.up('form').getForm();
		var model = Ext.create('Dep.metadata.viewmng.model.ViewModel', form.getValues());
		model.set('viewType', '1');//"1"代表用户自定义类型,即"CUSTOM"类型
		if(me.addViewWin.isAdd==true) {
			url = 'view/addView.do';
		}else {
			url = 'view/editView.do';
			record = me.addViewWin.record;
			model.set('id', record ? record.get('id') : '');
		}
		var params = model.getData();
        if(form.isValid()){
        	Fn.RequestObj(url, true, params, Dep.metadata.I18N.viewmng.controller.saveFailed, function() {
                    Dep.framework.editor.util.Msg.success(" 视图信息已经保存成功！", "提示");
                    me.refreshUserViewTree('root');
                    me.addViewWin.hide();
                    me.addViewWin.record = null;
                }, function() {
					Dep.framework.editor.util.Msg.failed(Dep.metadata.I18N.viewmng.controller.serverInvalid/*"服务端处理失败！"*/,
						Dep.metadata.I18N.viewmng.msgtitle.info/*"提示"*/);
					me.addViewWin.hide();
				});
        }else {
        	Dep.framework.editor.util.Msg.info("有数据不符合要求，请检查表单数据。", "提示");
        }
	},
	
	/**
	 * 取消
	 */
	cancelSaveView : function() {
		var me = this;
		me.addViewWin.hide();
	},
	/**
	 * 展示用户视图树上的右键上下文菜单
	 * @param {Ext.tree.View} tree  用户视图的整个树形菜单.
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据.
	 * @param {HTML标签} item  所点击的一个HTML元素.
	 * @param {Number} index 该item在树形菜单从上到下所排列的索引.
	 * @param {Ext.EventObject} event 本次事件所对应的事件对象. 
	 */
	showContextmenu : function(tree, record, item, index, event) {
		var me = this;
		if(me.getUserContextMenu(record)) {
			me.getUserContextMenu(record).showAt(event.getPoint());
		}
	},
	/**
	 * 获取用户视图树上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据.
	 * @return {Ext.menu.Menu} userContextMenu
	 */
	getUserContextMenu : function(record) {
		var me = this;
		if(!record) {
			return null;
		}
		if(record.get('depth')==0) {
			me.userContextMenu = new Ext.menu.Menu({
				items : [{
							text : "刷新视图树",
							iconCls : 'leaf',
							icon : '',
							handler : function() {
								me.refreshUserViewTree('root');
								me.userContextMenu = null;
							}
						}]
			});
		}else if(record.get('depth')==1) {
			me.userContextMenu = new Ext.menu.Menu({
				items : [{
							text : "修改视图",
							iconCls : 'leaf',
							icon : 'Dep/metadata/resource/img/edit.png',
							handler : function() {
								if(record.get('depth')==1) {
									me.showEditViewWin(record);
								}else {
									me.showEditFolderWin(record, 'mod');
								}
								
								me.userContextMenu = null;
							}
						}, {
							text : "添加子文件夹",
							iconCls : 'leaf',
							icon : 'Dep/metadata/resource/img/add.png',
							handler : function() {
								me.showEditFolderWin(record, 'add');
								me.userContextMenu = null;
							}
						}, {
							text : "删除视图",
							iconCls : 'leaf',
							icon : 'Dep/metadata/resource/img/del.png',
							handler : function() {
								var url = 'view/deleteView.do';
								me.confirmDeleteNode(record, url);
								me.userContextMenu = null;
							}
						}]
			});
		}else {
			me.getFolderContextMenu(record);
		}
		return me.userContextMenu;
	},
	/**
	 * 获取子文件夹上的上下文菜单
	 * @return {}
	 */
	getFolderContextMenu : function(record) {
		var me = this;
		me.userContextMenu = new Ext.menu.Menu({
				items : [{
							text : "添加子文件夹",
							iconCls : 'leaf',
							icon : 'Dep/metadata/resource/img/add.png',
							handler : function() {
								me.showEditFolderWin(record, 'add');
								me.userContextMenu = null;
							}
						}, {
							text : "删除子文件夹",
							iconCls : 'leaf',
							icon : 'Dep/metadata/resource/img/del.png',
							handler : function() {
								var url = 'view/deleteFolder.do';
								me.confirmDeleteNode(record, url);
								me.userContextMenu = null;
							}
						}]
			});
		return me.userContextMenu;
	},
	/**
	 * 删除节点的确认提示框，删除成功后刷新节点树
	 */
	confirmDeleteNode : function(record, url) {
		var me = this;
		if(!record) {
			return;
		}
		var params = {id : record.raw.id};
		Ext.Msg.confirm('提示', '您确定要删除'+record.raw.text+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request(url, false, params, "",function(){
					Dep.framework.editor.util.Msg.success("删除成功！", "提示");
					var node = me.userViewStore.getNodeById(params.id);
					me.refreshUserViewTree(node.parentNode.get('id'));
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},	
	/**
	 * 弹出编辑文件夹属性的窗口
	 */
	showEditFolderWin : function(record, flag) {
		var me = this;
		if(!me.editFolderWin) {
			me.editFolderWin = Ext.create('Dep.metadata.viewmng.view.EditFolderWindow');
		}
		me.folderParentRecord = record;
		me.cleanEditFolderWin();
		if(flag == 'mod' && record) {
			me.editFolderWin.isAdd = false;
			me.editFolderWin.setTitle('修改文件夹');
			me.getFolderName().setValue(record.raw.text);
		}
		me.editFolderWin.show();
	},
	/**
	 * 清空编辑用户视图基本信息弹窗里的数据
	 */
	cleanEditFolderWin : function() {
		var me = this;
		me.editFolderWin.isAdd = true;
		me.editFolderWin.setTitle('添加文件夹');
		me.getFolderName().setValue('');
		me.getFolderIcon().reset();
	},
	/**
	 * 确定添加文件夹，向后台提交数据
	 * 
	 * @param {Ext.button.Button} obj 确定按钮控件对象
	 */
	confirmAddFolder : function(obj) {
		var me = this;
		var url = "", record = null;
		var form = obj.up('form').getForm();
		var model = Ext.create('Dep.metadata.viewmng.model.FolderModel', form.getValues());
		if(me.editFolderWin.isAdd==true) {
			url = 'view/addFolder.do';
			model.set('parentId', me.folderParentRecord.raw.id);
		}
		var params = model.getData();
        if(form.isValid()){
        	Fn.RequestObj(url, true, params, '保存失败！', function() {
                    Dep.framework.editor.util.Msg.success(" 子文件夹信息已经保存成功！", "提示");
                    me.refreshUserViewTree(me.folderParentRecord.raw.id);
                    me.editFolderWin.hide();
                    me.folderParentRecord = null;
                }, function() {
					Dep.framework.editor.util.Msg.failed("服务端处理失败！", "提示");
					me.editFolderWin.hide();
				});
        }else {
        	Dep.framework.editor.util.Msg.info("有数据不符合要求，请检查表单数据。", "提示");
        }
	},
	
	/**
	 * 取消编辑文件夹操作
	 */
	cancelAddFolder : function() {
		var me = this;
		me.editFolderWin.hide();
	},
	/**
	 * 刷新用户视图界面,用户视图树重新加载数据
	 */
	refreshUserViewTree : function(nodeId) {
		var me = this,url=null;
		if(nodeId == "root"){
			url = "view/findByType.do";
		}else{
			url = 'view/findFolderByViewId.do';
		}
		me.userViewStore.getProxy().url = url;
		var node = me.userViewStore.getNodeById(nodeId);
		if(node){
			me.userViewStore.proxy.extraParams.parentId = nodeId;
			me.userViewStore.load({
					node : node, //刷新节点 
					callback : function(){ 
						me.window.userViewTreePanel.expandPath(node.getPath("id"), 'id');          
					}
			});			
		}
	},
	/**
	 * 每次弹窗弹出之前，清除所有未通过校验的提示信息
	 */
	clearInvalidMsgs : function() {
		var me = this;
		if(me.addViewWin) {
			me.addViewWin.down('form').getForm().clearInvalid();
		}
		if(me.editFolderWin) {
			me.editFolderWin.down('form').getForm().clearInvalid();
		}
	}
	
});