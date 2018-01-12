/**
 * 视图管理控制器
 * @author hww
 */
Ext.define('Dep.metamodel.modelmng.controller.MetaModelController', {
	extend : 'Ext.app.Controller',
	/**
	 * 请求图形编辑器所需配置参数
	 * @type Object
	 */
	figureRequestParam : {
		defaultEtitorConfigPath : "Dep/framework/editor/defaultconfig",
		figureConfigPath : "Dep/metamodel/modelmng/editor/config/figures/"
	},
	/**
	 * 编辑器唯一标识
	 * @type String
	 */
	editorKey : "metamodelEditor",
	/**
	 * editor目录所在路径
	 * @type String
	 */
	editorConfigPath : "Dep/metamodel/modelmng/editor",
	/**
	 * 通过配置选择器来获取控件的引用
	 */
	refs: [{
	         ref: 'folderName',//子文件夹名称
	         selector: 'textfield[cmpTag=foldername]'
   		 },{
	         ref: 'enumName',//枚举名称
	         selector: 'textfield[cmpTag=enumname]'
   		 },{
	         ref: 'approvalMMCombo',//审批元模型小弹窗的审批下拉框
	         selector: 'combo[cmpTag=approvalmmidea]'
   		 },{
	         ref: 'isabstractCheckbox',//是否抽象类复选框
	         selector: 'checkboxfield[cmpTag=abstractclass]'
   		 },{
	         ref: 'queryStrTextField',//检索元模型前边的输入框
	         selector: 'textfield[cmpTag=querymmtextfield]'
   		 },{
	         ref: 'compNameTextField',//组合关系管理弹窗里的关系名称输入框
	         selector: 'textfield[cmpTag=compositionname]'
   		 },{
	         ref: 'dependNameTextField',//组合关系管理弹窗里的关系名称输入框
	         selector: 'textfield[cmpTag=dependfrommm]'
   		 },{
	         ref: 'classifyNameTextField',//组合关系管理弹窗里的关系名称输入框
	         selector: 'textfield[cmpTag=adtfiltermmname]'
   		 },{
	         ref: 'mmCodeTextField',//编辑元模型基本信息里的代码输入框
	         selector: 'textfield[cmpTag=addmetamodelcode]'
	     },{
	         ref: 'mmImageField',//图标文件上传的控件
	         selector: 'fileuploadfield[cmpTag=imagefilefield]'
	     },{
	         ref: 'compTypeCombo',//组合类型的下拉框控件
	         selector: 'combo[cmpTag=compositiontype]'
	     },{
	         ref: 'inheritRadio',//【继承】单选按钮
	         selector: 'radiofield[cmpTag=inheritradio]'
   		 }],
	/**
	 * 控制器的初始化方法，只在初始化时执行一次
	 */
	init : function() {
		var me = this;
		me.initStore();
		me.showWin();
		me.bindEvent();
	},
	/**
	 * 初始化时创建所有store
	 */
	initStore : function() {
		var me = this;
		//继承
		if(!me.inheritTreeStore) {
			me.inheritTreeStore = Ext.create('Dep.metamodel.modelmng.store.InheritTreeStore');
		}
		//组合
		if(!me.compositionTreeStore) {
			me.compositionTreeStore = Ext.create('Dep.metamodel.modelmng.store.CompositionTreeStore');
			me.compositionTreeStore.load();
		}
		//用户
		if(!me.userFolderTreeStore) {
			me.userFolderTreeStore = Ext.create('Dep.metamodel.modelmng.store.UserFolderTreeStore');
		}
		//枚举
		if(!me.enumTreeStore) {
			me.enumTreeStore = Ext.create('Dep.metamodel.modelmng.store.EnumTreeStore');
		}
		//审批发布下拉框的store
		if(!me.approvalComboStore) {
			me.approvalComboStore = Ext.create('Dep.metamodel.modelmng.store.ApprovalPublishStore');
		}
		//检索元模型的结果面板的treeStore
		if(!me.queryResultTreeStore) {
			me.queryResultTreeStore = Ext.create('Dep.metamodel.modelmng.store.MMQueryResultTreeStore');
		}
		//分类文件夹
		if(!me.classifyFolderTreeStore) {
			me.classifyFolderTreeStore = Ext.create('Dep.metamodel.modelmng.store.UserFolderTreeStore');
		}
	},
	/**
	 * 每个控制器必须要有的showWin()方法；从第2次调用开始先执行该方法
	 */
	showWin : function() {
		var me = this;
		if(!me.metaModelMngWin) {
			me.metaModelMngWin = Ext.create('Dep.metamodel.modelmng.view.MetaModelMngWin', {
				inheritTreeStore : me.inheritTreeStore,
				compositionTreeStore : me.compositionTreeStore,
				userFolderTreeStore : me.userFolderTreeStore,
				enumTreeStore : me.enumTreeStore,
				queryResultTreeStore : me.queryResultTreeStore
			});
			me.metaModelMngWin.show();
			me.refreshInheritTreeStore(true);
		}else {
			me.metaModelMngWin.show();
		}
	},
		
	/**
	 * 获取编辑器所在的panel
	 * @return {Ext.panel.Panel}
	 */
	getEditorPanel : function(){
		var me = this;
		return me.metaModelMngWin.getContentPanel();
	},
	/**
	 * 获取配置数据并初始化编辑器
	 */
	initEditor : function() {
		var me = this, reloadJSFile = false;
		var deferreds = [];
		if (me.editor || me.requestingEditor) {// 判断元模型管理的编辑器是否已经加载过或者正在加载
			return;
		}
		me.requestingEditor = true;//元模型管理的编辑器正在加载
		try {
			if (!Dep.framework.editor.base.Editor) {// 判断与编辑器相关联的js文件是否加载过或者是否刷新清除掉了。
				reloadJSFile = true;
			}
		} catch (e) {
			reloadJSFile = true;
		}
		
		me.figureRequestParam.reloadJSFile = reloadJSFile;
		
		deferreds.push(Fn.RequestDiffer("getFigureModels", "editor/getFigures.do",
						me.figureRequestParam, "GET", false));
		// 加载编辑器配置文件
		deferreds.push(Fn.RequestDiffer(me.editorKey,
						"editor/getEditorConfigs.do", {
							editorKey : me.editorKey,
							editorRootPath : "Dep/framework/editor",
							editorConfigPath : me.editorConfigPath,
							reloadJSFile : reloadJSFile,
							defaultEtitorConfigPath : "Dep/framework/editor/defaultconfig"
						}, "GET", false));				
						
		Deft.Promise.all(deferreds).then({
					success : function(results) {
						try {
							var figureConfigStr = "", figureConfigs = {}, editorConfigStr = "", editorConfig = {};
							for (var i = 0; i < results.length; i++) {
								var result = results[i];
								if (result.requestKey == "getFigureModels") {
									figureConfigStr = result.result;
									continue;
								}
								if (result.requestKey == me.editorKey) {
									editorConfigStr = result.result;
								}
							}

							editorConfig = Ext.JSON.decode(editorConfigStr);
							figureConfigs = Ext.JSON.decode(figureConfigStr);
							editorConfig.figures = figureConfigs;
							// 创建显示编辑器
							me.setEditor(me.buildEditor(editorConfig, me.getEditorPanel()));
							// 发出编辑器创建完成的事件
							me.fireEvent("editCreated", me.editor);
							// 修改图层
						} catch (e) {
							console.log(e);
						}
					},
					failure : function(error) {
						Dep.Msg.failed('数据加载失败！', '错误');
					}
				});
	},
	/**
	 * 创建并显示编辑器
	 * @param {} config
	 * @param {} contentPanel
	 */
	buildEditor : function(config, contentPanel) {
		var me = this;
		//如果没有加载的js文件就直接返回
		if (!config.jsFiles) {
			return;
		}
		var coreJsFile = config.jsFiles.files;
		for ( var file in coreJsFile) {
			Ext.Loader.loadScriptFile(coreJsFile[file], Ext.emptyFn, null, me, true);
		}
		// 初始化图形编辑器
		var editorName = config.name;
		var className = eval(editorName);
		
		var editor = new className(contentPanel, config);
		return editor;
	},
	/**
	 * 将控制器挂载的编辑器设置为当前创建的编辑器
	 */
	setEditor : function(editor) {
		var me = this;
		me.editor = editor;
	},
	/**
	 * 获取元模型管理模块所对应的编辑器
	 * @return {} me.editor
	 */
	getEditor : function() {
		var me = this;
		if(!me.editor) {
			me.initEditor();
		}
		return me.editor;
	},
	/**
	 * 获取元模型编辑器当前的图层
	 */
	getLayer : function() {
		var me = this;
		if(!me.layer) {
			me.layer = me.getEditor().getDataManager().getLayerManager().get("metamodel");
		}
		return me.layer;
	},
	/**
	 * 绑定事件
	 */
	bindEvent : function() {
		var me = this;
		me.control({
					'treepanel[cmpTag=inherittree]' : {//【继承】标签页面板
						itemclick : me.showSelectedInheritNode,//左键单击继承关系元模型树形菜单某个节点
						itemcontextmenu : me.showInheritContextMenu,//右键单击继承关系元模型树形菜单某个节点
						activate : me.refreshInheritTreeStore
					},
					'treepanel[cmpTag=compositiontree]' : {//【组合】标签页面板
						itemclick : me.showSelectedCompositionNode,//左键单击组合关系元模型树形菜单某个节点
						itemcontextmenu : me.showCompositionContextMenu,//右键单击组合关系元模型树形菜单某个节点
						activate : me.refreshCompTreeStore//刚切换到组合treepanel时请求最新的组合元模型数据
					},
					'treepanel[cmpTag=usertree]' : {//【用户】标签页面板
						itemclick : me.showSelectedUserNode,//左键单击用户面板树形菜单某个节点
						itemcontextmenu : me.showUserContextMenu//右键单击用户面板树形菜单某个节点
					},
					'treepanel[cmpTag=enumtree]' : {//【枚举】标签页面板
						itemclick : me.showSelectedEnumNode,//左键单击枚举面板树形菜单某个节点
						itemcontextmenu : me.showEnumContextMenu//右键单击枚举面板树形菜单某个节点
					},
					'treepanel[cmpTag=queryresulttree]' : {//【检索】结果
						itemclick : me.showSelectedInheritNode,//左键单击检索结果面板树形菜单某个节点
						itemcontextmenu : me.showInheritContextMenu//右键单击检索结果面板树形菜单某个节点
					},
					'button[cmpTag=confirmsavemetamodel]' : {//编辑元模型基本信息弹窗里的【保存】按钮
						click : me.saveMetaModel             //保存元模型
					},
					'button[cmpTag=confirmaddfolderformm]' : {//添加文件夹弹窗的【确定】按钮
						confirmaddfolder : me.confirmAddFolder
					},
					'button[cmpTag=canceladdfolderformm]' : {//添加文件夹弹窗的【取消】按钮
						canceladdfolder : me.cancelAddFolder
					},
					'button[cmpTag=confirmaddenum]' : {//添加或修改枚举类型弹窗的【确定】按钮
						confirmaddenum : me.confirmAddEnum
					},
					'button[cmpTag=canceladdenum]' : {//添加或修改枚举类型弹窗的【取消】按钮
						canceladdenum : me.cancelAddEnum
					},
					'button[cmpTag=cleanupbtn]' : {//元模型图形编辑器业务工具栏右侧的【清空】按钮
						click : me.clearCanvas
					},
					'button[cmpTag=addonetofolderforuser]' : {//用户文件夹添加或移除元模弹窗里的【单个添加】按钮
						click : me.addOneToFolderForUser
					},
					'button[cmpTag=addalltofolderforuser]' : {//用户文件夹添加或移除元模弹窗里的【添加选中的全部】按钮
						click : me.addAllToFolderForUser
					},
					'button[cmpTag=removeonefromfolderforuser]' : {//用户文件夹添加或移除元模弹窗里的【单个移除】按钮
						click : me.removeOneFromFolderForUser
					},
					'button[cmpTag=removeallfromfolderforuser]' : {//用户文件夹添加或移除元模弹窗里的【移除选中的全部】按钮
						click : me.removeAllFromFolderForUser
					},
					'button[cmpTag=savefoldermms]' : {//用户文件夹添加或移除元模弹窗里的【保存】按钮
						click : me.saveSelectedFolderMms
					},
					'textfield[cmpTag=metamodelname]' : {//加入或移除元模型弹窗的左侧待选择元模型的【名称】输入框
						change : me.filterSelectingStoreToFolder
					},
					'textfield[cmpTag=rightmetamodelname]' : {//加入或移除元模型弹窗的右侧已选择元模型的【名称】输入框
						change : me.filterSelectedStoreToFolder
					},
					'textfield[cmpTag=mmnameleftforcomp]' : {//组合关系管理弹窗的左侧待选择元模型的【名称】输入框
						change : me.filterSelectingStoreForComp
					},
					'textfield[cmpTag=mmnamerightforcomp]' : {//组合关系管理弹窗的右侧已选择元模型的【名称】输入框
						change : me.filterSelectedStoreForComp
					},
					'button[cmpTag=querymmlistbtn]' : {//【检索】按钮
						click : me.queryMetaModelByStr
					},
					'button[cmpTag=gobackbtn]' : {//【返回】按钮
						click : me.goBack
					},
					'button[cmpTag=addonetofolderforcomp]' : {//组合关系管理弹窗里的【单个添加】按钮
						click : me.addOneToFolderForComp
					},
					'button[cmpTag=addalltofolderforcomp]' : {//组合关系管理弹窗里的【添加选中的全部】按钮
						click : me.addAllToFolderForComp
					},
					'button[cmpTag=removeonefromfolderforcomp]' : {//组合关系管理弹窗里的【单个移除】按钮
						click : me.removeOneFromFolderForComp
					},
					'button[cmpTag=removeallfromfolderforcomp]' : {//组合关系管理弹窗里的【移除选中的全部】按钮
						click : me.removeAllFromFolderForComp
					},
					'button[cmpTag=savecompmms]' : {//组合关系管理弹窗里的【保存】按钮
						click : me.saveSelectedCompMms
					},
					'button[cmpTag=addonetofolderfordepend]' : {//依赖关系管理弹窗里的【单个添加】按钮
						click : me.addOneToFolderForDepend
					},
					'button[cmpTag=addalltofolderfordepend]' : {//依赖关系管理弹窗里的【添加选中的全部】按钮
						click : me.addAllToFolderForDepend
					},
					'button[cmpTag=removeonefromfolderfordepend]' : {//依赖关系管理弹窗里的【单个移除】按钮
						click : me.removeOneFromFolderForDepend
					},
					'button[cmpTag=removeallfromfolderfordepend]' : {//依赖关系管理弹窗里的【移除选中的全部】按钮
						click : me.removeAllFromFolderForDepend
					},
					'button[cmpTag=savedependmms]' : {//依赖关系管理弹窗里的【保存】按钮
						click : me.saveSelectedDependMms
					},
					'textfield[cmpTag=mmnameleftfordepend]' : {//依赖关系管理弹窗的左侧待选择元模型的【名称】输入框
						change : me.filterSelectingStoreForDepend
					},
					'textfield[cmpTag=mmnamerightfordepend]' : {//依赖关系管理弹窗的右侧已选择元模型的【名称】输入框
						change : me.filterSelectedStoreForDepend
					},
					'textfield[cmpTag=adtfiltermmname]' : {//添加到文件夹左侧待归类元模型的【名称】输入框
						change : me.filterSelectingStoreForClassify
					},
					'button[cmpTag=addonetofolderforclassify]' : {//添加到文件夹弹窗里的【单个添加】按钮
						click : me.addOneToFolderForClassify
					},
					'button[cmpTag=addalltofolderforclassify]' : {//添加到文件夹弹窗里的【添加选中的全部】按钮
						click : me.addAllToFolderForClassify
					},
					'button[cmpTag=removeonefromfolderforclassify]' : {//添加到文件夹弹窗里的【单个移除】按钮
						click : me.removeOneFromFolderForClassify
					},
					'radio[cmpTag=inheritradio]' : {//元模型关系详情面板里的【继承】单选按钮
						focus : me.showInheritRelationShips
					},
					'radio[cmpTag=compositionradio]' : {//元模型关系详情面板里的【组合】单选按钮
						focus : me.showCompositionRelationShips
					},
					'radio[cmpTag=dependradio]' : {//元模型关系详情面板里的【依赖】单选按钮
						focus : me.showDependRelationShips
					},
					'button[cmpTag=selectimagebtn]' : {//【上传图元】按钮
						click : me.showFileUploadWin
					},
					'button[cmpTag=imageupload]' : {//【上传】按钮
						click : me.executeImageUpload
					},
					'button[cmpTag=savecomprelation]' : {//修改组合关系的【保存】按钮
						click : me.saveCompRelation
					},
					'button[cmpTag=savedependrelation]' : {//修改依赖关系的【保存】按钮
						click : me.saveDependRelation
					},
					scope : me
				});
				//TODO 随时添加事件监听
//				me.on("editCreated",function(editor) {
//					var layer = editor.getDataManager().getLayerManager().get("metamodel");
//					editor.executeActionSpanContainer(
//							'Dep.framework.editor.plugin.containers.Layer',
//							'changeCurrentDisplayLayer', layer);
//					editor.executeActionSpanContainer(
//							'Dep.framework.editor.plugin.containers.Layer',
//							'changeCurrentEditLayer', layer);
//					me.setCurrentLayer(layer);
//					me.loadAllData(layer);
//				});
			
	},
	/**
	 * 设置当前编辑图层
	 * @param {Dep.framework.editor.base.Layer} layer 图层
	 */
	setCurrentLayer:function(layer){
		var me = this;
		me.currentLayer = layer;
	},
	/**
	 * 获取当前编辑图层
	 */
	getCurrentLayer:function(){
		var me = this;
		return me.currentLayer;
	},
	/**
	 * 加载编辑器图层上所有数据
	 */
	loadAllData:function(){
		var me = this,layer = me.getCurrentLayer();
		if (!layer) {
			return;
		}
		layer.loadAll();
	},
	/**
	 * 选中【继承】面板树形菜单里的一个节点的处理函数
	 * @param {Ext.tree.View} obj     左侧整个树形菜单.  
	 * @param {Ext.data.Store.ImplicitModel} record  所选item所对应的一条记录数据.
	 * @param {HTML标签} item    所点击的一个HTML元素.  
	 * @param {Number} index   该item在树形菜单从上到下所排列的索引.  
	 * @param {Ext.EventObject} e       本次事件所对应的事件对象.  
	 */
	showSelectedInheritNode : function(obj, record, item, index, e) {
		var me = this;
		if(!record) {
			return;
		}
		if(record.raw.nodeType=='root' || !record.raw.nodeType) {
			return false;
		}
		me.mmRelationshipDetailPanel = me.getMmRelationshipDetailPanel();
		var center = me.metaModelMngWin.getCenterTabPanel();//中央标签页面板
		var detailPanel = me.mmRelationshipDetailPanel;//关系详情面板
		center.removeAll(false);
		if(!center.contains(detailPanel)) {
			center.add(detailPanel);
		}
		if(!detailPanel.isVisible()) {
			detailPanel.setVisible(true);
			center.setActiveTab(center.activeTab);
		}
		if(record.raw.nodeType=='inheritRoot' || record.raw.nodeType=='mModelNode') {
			me.bindD3PanelResizeEvent();
			me.currentMmData = record.raw; //当前鼠标选中的元模型节点的数据
        	me.showInheritRelationShips();
		}
	},
	/**
	 * 选中【组合】面板树形菜单里的一个节点的处理函数
	 * @param {Ext.tree.View} obj     左侧整个树形菜单.  
	 * @param {Ext.data.Store.ImplicitModel} record  所选item所对应的一条记录数据.
	 * @param {HTML标签} item    所点击的一个HTML元素.  
	 * @param {Number} index   该item在树形菜单从上到下所排列的索引.  
	 * @param {Ext.EventObject} e       本次事件所对应的事件对象.  
	 */
	showSelectedCompositionNode : function(obj, record, item, index, e) {
		var me = this;
		if(!record) {
			return;
		}
		if(!record.raw.nodeType) {
			return false;
		}
		me.mmRelationshipDetailPanel = me.getMmRelationshipDetailPanel();
		var center = me.metaModelMngWin.getCenterTabPanel();//中央标签页面板
		var detailPanel = me.mmRelationshipDetailPanel;//关系详情面板
		center.removeAll(false);
		if(!center.contains(detailPanel)) {
			center.add(detailPanel);
		}
		if(!detailPanel.isVisible()) {
			detailPanel.setVisible(true);
			center.setActiveTab(center.activeTab);
		}
		if(record.raw.nodeType=='mmModelNode') {
			return false;
		}else if(record.raw.nodeType=='mModelNode') {
			me.bindD3PanelResizeEvent();
			me.currentMmData = record.raw; //当前鼠标选中的元模型节点的数据
			me.showCompositionRelationShips();
		}
	},
	/**
	 * 选中【用户】面板树形菜单里的一个节点的处理函数
	 * @param {Ext.tree.View} obj     左侧整个树形菜单.  
	 * @param {Ext.data.Store.ImplicitModel} record  所选item所对应的一条记录数据.
	 * @param {HTML标签} item    所点击的一个HTML元素.  
	 * @param {Number} index   该item在树形菜单从上到下所排列的索引.  
	 * @param {Ext.EventObject} e       本次事件所对应的事件对象.  
	 */
	showSelectedUserNode : function(obj, record, item, index, e) {
		var me = this;
		if(!record) {
			return;
		}
		if(record.raw.nodeType=='userRoot' || !record.raw.nodeType) {
			return false;
		}
		if(record.raw.nodeType=='folderNode') {
			return false;
		}else if(record.raw.nodeType=='metaModelNode') {
			me.mmRelationshipDetailPanel = me.getMmRelationshipDetailPanel();
			var center = me.metaModelMngWin.getCenterTabPanel();//中央标签页面板
			var detailPanel = me.mmRelationshipDetailPanel;//关系详情面板
			center.removeAll(false);
			if(!center.contains(detailPanel)) {
				center.add(detailPanel);
			}
			if(!detailPanel.isVisible()) {
				detailPanel.setVisible(true);
				center.setActiveTab(center.activeTab);
			}
			me.bindD3PanelResizeEvent();
			me.currentMmData = record.raw; //当前鼠标选中的元模型节点的数据
			me.showInheritRelationShips();
		}
	},
	/**
	 * 选中【枚举】面板树形菜单里的一个节点的处理函数
	 * @param {Ext.tree.View} obj     左侧整个树形菜单.  
	 * @param {Ext.data.Store.ImplicitModel} record  所选item所对应的一条记录数据.
	 * @param {HTML标签} item    所点击的一个HTML元素.  
	 * @param {Number} index   该item在树形菜单从上到下所排列的索引.  
	 * @param {Ext.EventObject} e       本次事件所对应的事件对象.  
	 */
	showSelectedEnumNode : function(obj, record, item, index, e) {
		var me = this;
		if(!record) {
			return;
		}
		if(record.raw.nodeType=='enumRoot' || !record.raw.nodeType) {
			return false;
		}
		if(record.raw.nodeType=='enumNode') {
			//编辑器所在的面板
			var center = me.metaModelMngWin.getCenterTabPanel();
			var enumValuesPanel = me.metaModelMngWin.getEnumValuesPanel();
			enumValuesPanel.enumId = record.raw.id;//枚举值所属的枚举类id
			center.removeAll(false);
			if(!center.contains(enumValuesPanel)) {
				center.add(enumValuesPanel);
			}
			if(!enumValuesPanel.isVisible()) {
				enumValuesPanel.setVisible(true);
				center.setActiveTab(center.activeTab);
			}
			var store = Ext.create('Dep.metamodel.modelmng.store.EnumValueListStore');
			store.load({
				params : {
					id : record.raw.id
				},
				callback : function(records, operation, success) {
					enumValuesPanel.getStore().loadData(records, false);
				}
			});
		}
	},
	/**
	 * 展示【继承】树上的右键上下文菜单
	 * @param {} tree  整个树形菜单.  类型: Ext.tree.View
	 * @param {} record  该item所对应的一条记录数据.  类型：Ext.data.Model
	 * @param {} item  所点击的一个HTML元素.  类型：HTML标签
	 * @param {} index 该item在树形菜单从上到下所排列的索引.  类型： Number
	 * @param {} event 本次事件所对应的事件对象.  类型： Ext.EventObject
	 */
	showInheritContextMenu : function(tree, record, item, index, event) {
		var me = this;
		if(me.getInheritContextMenu(record)) {
			me.inheritContextMenu.showAt(event.getPoint());
		}
	},
	/**
	 * 获取【继承】关系元模型树形菜单不同节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} inheritContextMenu 右键时显示的上下文菜单
	 */
	getInheritContextMenu : function(record) {
		var me = this;
		if(!record) {
			return null;
		}
		if(record.raw.nodeType=='inheritRoot' || !record.raw.nodeType) {
			me.inheritContextMenu = new Ext.menu.Menu({
				items : [{
							text : "刷新",
							handler : function() {
								me.refreshInheritTreeStore();
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}, {
							text : "派生新的元模型",
							iconCls : 'leaf',
							handler : function() {
								me.showAddInheritMetaModelWin(record);
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}]
			});
		}else if(record.raw.nodeType=='mmModelNode' || record.raw.nodeType=='mModelNode') {
			me.inheritContextMenu = me.getMMModelNodeContextMenu(record);
		}else {
			return null;
		}
		return me.inheritContextMenu;
	},
	/**
	 * 获取【继承】关系元模型树形菜单某一节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} menus 右键时显示的上下文菜单
	 */
	getMMModelNodeContextMenu : function(record) {
		var me = this;
		var menus = new Ext.menu.Menu({
				items : [{
							text : "派生新的元模型",
							iconCls : 'leaf',
							handler : function() {
								me.showAddInheritMetaModelWin(record);
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}, {
							text : "修改元模型",
							iconCls : 'leaf',
							handler : function() {
								me.showModifyMetaModelWin(record);
							},
							icon : 'Dep/metadata/resource/img/edit.png'
						}, {
							text : "删除元模型",
							iconCls : 'leaf',
							handler : function() {
								me.deleteInheritMetaModel(record);
							},
							icon : 'Dep/metadata/resource/img/del.png'
						}, {
							text : "添加组合关系",
							iconCls : 'leaf',
							handler : function() {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw);
								me.compositionRelationshipMng(model);
							},
							icon : 'img/metamodel/comprelationmng.png'
						}, {
							text : "添加依赖关系",
							iconCls : 'leaf',
							handler : function() {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw);
								me.dependencyRelationshipMng(model);
							},
							icon : 'img/metamodel/dependrelationmng.png'
						}, {
							text : "刷新节点",
							handler : function() {
								me.refreshInheritTreeNode(record);
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}]
			});
		
		return menus;
	},
	/**
	 * 展示【组合】树上的右键上下文菜单
	 * @param {} tree  整个树形菜单.  类型: Ext.tree.View
	 * @param {} record  该item所对应的一条记录数据.  类型：Ext.data.Model
	 * @param {} item  所点击的一个HTML元素.  类型：HTML标签
	 * @param {} index 该item在树形菜单从上到下所排列的索引.  类型： Number
	 * @param {} event 本次事件所对应的事件对象.  类型： Ext.EventObject
	 */
	showCompositionContextMenu : function(tree, record, item, index, event) {
		var me = this;
		if(me.getCompositionContextMenu(record)) {
			me.compositionContextMenu.showAt(event.getPoint());
		}
	},
	/**
	 * 获取【组合】关系元模型树形菜单不同节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} inheritContextMenu 右键时显示的上下文菜单
	 */
	getCompositionContextMenu : function(record) {
		var me = this;
		if(!record) {
			return null;
		}
		if(!record.raw.nodeType) {
			return null;
		}else if(record.raw.nodeType=='mmModelNode' || record.raw.nodeType=='mModelNode') {
			me.compositionContextMenu = me.getCompMModelNodeContextMenu(record);
		}else {
			return null;
		}
		return me.compositionContextMenu;
	},
	/**
	 * 获取【组合】关系元模型树形菜单某一节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} menus 右键时显示的上下文菜单
	 */
	getCompMModelNodeContextMenu : function(record) {
		var me = this, menus = null;
		if(record.raw.nodeType=='mmModelNode') {
			menus = new Ext.menu.Menu({
				items : [{
							text : "刷新",
							handler : function() {
								me.refreshCompTreeStore();
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}]
			});
		}else if(record.raw.nodeType=='mModelNode') {
			menus = new Ext.menu.Menu({
				items : [{
							text : "添加组合关系",
							handler : function() {
								me.compositionRelationshipMng(record);
							},
							icon : 'img/metamodel/comprelamng.png'
						}, {
							text : "刷新节点",
							handler : function() {
								me.refreshCompTreeNode(record);
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}]
			});
		}
		return menus;
	},
	/**
	 * 展示【用户】树上的右键上下文菜单
	 * @param {} tree  整个树形菜单.  类型: Ext.tree.View
	 * @param {} record  该item所对应的一条记录数据.  类型：Ext.data.Model
	 * @param {} item  所点击的一个HTML元素.  类型：HTML标签
	 * @param {} index 该item在树形菜单从上到下所排列的索引.  类型： Number
	 * @param {} event 本次事件所对应的事件对象.  类型： Ext.EventObject
	 */
	showUserContextMenu : function(tree, record, item, index, event) {
		var me = this;
		if(me.getUserContextMenu(record)) {
			me.userContextMenu.showAt(event.getPoint());
		}
	},
	/**
	 * 获取【用户】面板树形菜单不同节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} inheritContextMenu 右键时显示的上下文菜单
	 */
	getUserContextMenu : function(record) {
		var me = this;
		if(!record) {
			return null;
		}
		if(record.raw.nodeType=='userRoot') {
			me.userContextMenu = new Ext.menu.Menu({
				items : [{
							text : "添加文件夹",
							iconCls : 'leaf',
							handler : function() {
								me.showEditFolderWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}, {
							text : "刷新",
							handler : function() {
								me.refreshUserFolderTreeStore();
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}]
			});
		}else if(record.raw.nodeType=='folderNode') {
			me.userContextMenu = me.getUserNodeContextMenu(record);
		}else if(record.raw.nodeType=='metaModelNode') {
			me.userContextMenu = new Ext.menu.Menu({
				items : [{
							text : "移除元模型",
							iconCls : 'leaf',
							handler : function() {
								me.showAddOrRemoveMmInFolderWin(record.parentNode);
								me.userContextMenu = null;
							},
							icon : 'img/metamodel/remove.png'
						}, {
							text : "添加组合关系",
							iconCls : 'leaf',
							handler : function() {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw);
								me.compositionRelationshipMng(model);
								me.userContextMenu = null;
							},
							icon : 'img/metamodel/comprelationmng.png'
						}, {
							text : "添加依赖关系",
							iconCls : 'leaf',
							handler : function() {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw);
								me.dependencyRelationshipMng(model);
								me.userContextMenu = null;
							},
							icon : 'img/metamodel/dependrelationmng.png'
						}, {
							text : "刷新节点",
							handler : function() {
								me.refreshUserTreeNode(record, record.parentNode);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}]
			});
		}else {
			return null;
		}
		return me.userContextMenu;
	},
	/**
	 * 获取【用户】面板某一文件夹节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} menus 右键时显示的上下文菜单
	 */
	getUserNodeContextMenu : function(record) {
		var me = this;
		var menus = new Ext.menu.Menu({
				items : [{
							text : "添加子文件夹",
							iconCls : 'leaf',
							handler : function() {
								me.showEditFolderWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}, {
							text : "加入或移除元模型",
							iconCls : 'leaf',
							handler : function() {
								me.showAddOrRemoveMmInFolderWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/edit.png'
						}, {
							text : "删除",
							iconCls : 'leaf',
							handler : function() {
								me.deleteUserFolder(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/del.png'
						}, {
							text : "刷新节点",
							handler : function() {
								me.refreshUserTreeNode(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}]
			});
		return menus;
	},
	/**
	 * 展示【枚举】树上的右键上下文菜单
	 * @param {} tree  整个树形菜单.  类型: Ext.tree.View
	 * @param {} record  该item所对应的一条记录数据.  类型：Ext.data.Model
	 * @param {} item  所点击的一个HTML元素.  类型：HTML标签
	 * @param {} index 该item在树形菜单从上到下所排列的索引.  类型： Number
	 * @param {} event 本次事件所对应的事件对象.  类型： Ext.EventObject
	 */
	showEnumContextMenu : function(tree, record, item, index, event) {
		var me = this;
		if(me.getEnumContextMenu(record)) {
			me.enumContextMenu.showAt(event.getPoint());
		}
	},
	/**
	 * 获取【枚举】面板树形菜单不同节点上的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {Ext.menu.Menu} inheritContextMenu 右键时显示的上下文菜单
	 */
	getEnumContextMenu : function(record) {
		var me = this;
		if(!record) {
			return null;
		}
		if(record.raw.nodeType=='enumRoot') {
			me.enumContextMenu = new Ext.menu.Menu({
				items : [{
							text : "刷新",
							handler : function() {
								me.refreshEnumTreeStore(record);
							},
							icon : 'Dep/metadata/resource/img/refresh.png'
						}, {
							text : "添加枚举类型",
							handler : function() {
								me.showEditEnumWin(record);
								me.enumContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}]
			});
		}else if(record.raw.nodeType=='enumNode') {
			me.enumContextMenu = new Ext.menu.Menu({
				items : [{
							text : "重命名",
							iconCls : 'leaf',
							handler : function() {
								me.showRenameWin(record);
								me.enumContextMenu = null;
							},
							icon : ''
						},{
							text : "删除枚举类型",
							iconCls : 'leaf',
							handler : function() {
								if(record.raw.issys == 1) {
									Dep.framework.editor.util.Msg.info(record.raw.text+"是系统内置项，不允许删除。", "提示");
									me.enumContextMenu = null;
									return false;
								}else if(record.raw.id == 'datatype' || record.raw.id == 'controltype') {
									Dep.framework.editor.util.Msg.info(record.raw.text+"正在被使用，不允许删除。", "提示");
									me.enumContextMenu = null;
									return false;
								}else {
									me.deleteMenuByRecord(record);
								}
							},
							icon : 'Dep/metadata/resource/img/del.png'
						}]
			});
		}else {
			return null;
		}
		return me.enumContextMenu;
	},
	
	/**
	 * 获取编辑元模型基本信息的弹窗界面
	 * @return {Ext.window.Window} editMetaModelWin
	 */
	getEditMetaModelWin : function() {
		var me = this;
		if(!me.editMetaModelWin) {
			me.editMetaModelWin = Ext.create('Dep.metamodel.modelmng.view.EditMetaModelWin', {
				userFolderTreeStore : me.userFolderTreeStore
			});
		}
		return me.editMetaModelWin;
	},
	/**
	 * 清空元模型基本信息表单里的数据
	 */
	cleanMetaModelForm : function() {
		var me = this;
		me.getEditMetaModelWin().down('form').getForm().reset();
		var attListGrid = me.editMetaModelWin.getAttListGrid();
		var store = attListGrid.getStore();
		if(store.data.items && store.data.length > 0) {
			store.removeAll(false);//清空旧的数据
		}
	},
	/**
	 * 派生新的【继承】元模型时弹出编辑元模型基本信息界面
	 * @param {Ext.data.Model} record  右键点中的父元模型的数据模型. 
	 */
	showAddInheritMetaModelWin : function(record) {
		var me = this;
		me.cleanMetaModelForm();
		me.editMetaModelWin.isAdd = true;//true表示此时为添加操作
		me.editMetaModelWin.setTitle("添加元模型");
		me.editMetaModelWin.inheritParentNode = record;//父元模型节点
		me.editMetaModelWin.show();
		me.editMetaModelWin.maximize(false);
		var mmCodeTextField = me.getMmCodeTextField();
		if(mmCodeTextField) {
			mmCodeTextField.setReadOnly(false); //添加时代码输入框可以编辑
			var code = record.raw.code; //父类元模型的code
			var strs = Math.floor(Math.random()*900000 + 100000);
			mmCodeTextField.setValue(code+"-"+strs);
		}
	},
	/**
	 * 修改元模型时弹出编辑元模型基本信息界面【继承】
	 * @param {Ext.data.Model} record  右键点中的所要修改的元模型的数据模型. 
	 */
	showModifyMetaModelWin : function(record) {
		var me = this;
		me.cleanMetaModelForm();
		me.editMetaModelWin.isAdd = false;//false表示此时为修改操作
		me.editMetaModelWin.setTitle("修改元模型");
		if(record) {
			me.editMetaModelWin.metaModelRecord = record;//修改前的元模型数据记录
		}
		me.editMetaModelWin.show();
		me.editMetaModelWin.maximize(false);
		me.editMetaModelWin.getAttListGrid().createComboStores();
		var mmCodeTextField = me.getMmCodeTextField();
		if(mmCodeTextField) {
			mmCodeTextField.setReadOnly(true);//修改时代码输入框不可编辑
		}
		if(record) {
			var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw);
			var form = me.editMetaModelWin.down('form');
			form.loadRecord(model); //显示修改前的旧数据
			if(model.raw.isabstract) {
				//拿到是否抽象类的复选框控件并设为选中状态
				me.getIsabstractCheckbox().setValue("1");
			}
			//根据元模型id再去请求它的属性集合信息
			var modelId = model.get('id') ? model.get('id') : record.raw.id;
			var attListStore = Ext.create('Dep.metamodel.modelmng.store.MetaModelAttributeStore');
			attListStore.getProxy().extraParams.id = modelId;
			attListStore.load({
				callback : function(records, operation, success) {
					var attListGrid = me.editMetaModelWin.getAttListGrid();
					attListGrid.getStore().loadData(records, false);//false表示会先把旧的数据全给移除掉之后再加载新数据
				}
			});
			
		}
	},
	/**
	 * 向后台提交并保存元模型数据【继承】
	 */
	saveMetaModel : function() {
		var me = this, parentNode = null;
		if(!me.editMetaModelWin) {
			return;
		}
		if(me.editMetaModelWin.inheritParentNode){//添加
			parentNode = me.editMetaModelWin.inheritParentNode;
		}
		var form = me.editMetaModelWin.down('form');
		var data = form.getValues();
        if(data.code==''||data.name==''){
            Ext.Msg.alert('信息','请填写必填项！');
            return;
        }
		//----------------------------model组装开始---------------------------------
		var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', data);
		if(parentNode) { //只在添加的时候需设置父id,修改的时候父id不能改变
			model.set('parentId', parentNode.raw.id);
		}
		//为元模型model设置属性列表信息
		var attListGrid = me.editMetaModelWin.getAttListGrid();
		var store = attListGrid.getStore();
		var attributeModelList = [];
		if(store.data.items && store.data.length > 0) {
			for(var i=0; i<store.data.length; i++) {
				var attRawData = store.data.items[i].raw;//旧数据
				var attData = store.data.items[i].data;//新数据
				attributeModelList.push(attData);
			}
		}
		model.set('attList', attributeModelList);
		var imageName = me.imageName ? me.imageName : "";//图标文件名.含后缀名
		model.set('graphSvg', imageName);
		//----------------------------model组装完成---------------------------------
		if(me.editMetaModelWin.isAdd) {//正在添加派生新的元模型【继承】
			model.save({callback : function() {
				if(model.proxy.reader.jsonData && model.proxy.reader.jsonData.result){
					model.set('id', model.proxy.reader.jsonData.result.id);
					me.editMetaModelWin.hide();
					Dep.framework.editor.util.Msg.success("添加成功！", "提示");
					//派生新的元模型保存成功之后，右边同步显示新加元模型的继承关系图
					me.bindD3PanelResizeEvent();
					me.currentMmData = model.data ? model.data : model.raw; //当前鼠标选中的元模型节点的数据
					if(parentNode.raw.nodeType && parentNode.raw.nodeType == "inheritRoot") {
						me.refreshInheritTreeStore(true);
					}else {
			        	me.refreshAllTreeByNodeId(parentNode.raw.id);
					}
		        	me.editMetaModelWin.inheritParentNode = null;
				}
			}});
		}else {//正在修改旧的元模型
			var record = me.editMetaModelWin.metaModelRecord;
			if(!record) {
				Dep.framework.editor.util.Msg.info("所修改的元模型数据不存在！", "提示");
				return;
			}
			
			model.set('id', record.raw.id);
			
			if(model) {
				model.save({callback : function() {
					var res = model.proxy.reader.jsonData;
					if(res) {
						if(res.resultCode == 1) {
							me.editMetaModelWin.hide();
							//修改元模型保存成功之后，右边同步显示修改过的元模型的关系图
							me.bindD3PanelResizeEvent();
							me.currentMmData = model.data ? model.data : model.raw; //当前鼠标选中的元模型节点的数据
				        	me.refreshAllTreeByNodeId(model.get('id'), true);//true表示修改元模型要传父节点
				        	me.editMetaModelWin.metaModelRecord = null;
						}else {
							Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
							return;
						}
					}else {
						Dep.framework.editor.util.Msg.failed("修改失败！", "提示");
					}
				}});
			}
		}
	},
	/**
	 * 添加或修改操作成功后，刷新画布，显示新保存成功的图元
	 */
	refreshCanvas : function(bussModel) {
		var me = this;
		me.clearCanvas();
		me.addUserMetaModelFigure(bussModel);
	},
	/**
	 * 清空当前画布
	 */
	clearCanvas : function() {
		var me = this;
		var layer = me.getEditor().getDataManager().getLayerManager().get("metamodel");
		if(layer) {
			layer.clearAll();
		}
	},
	/**
	 * 向画布中添加一个继承关系元模型的图元
	 */
	addInheritMetaModelFigure : function(bussModel) {
		var me = this, modelData = null;
		modelData = {
			"viewData" : {
				viewData : Ext.JSON.encode({
					"x":10,
					"y":10
				})
			},
			"bussData" : bussModel.getData()
		};
		me.getEditor().executeAction(
						Dep.framework.editor.ACTION.EDITOR.ADD_MODEL,
						null, 'InheritMetaModel', modelData);
	},
	/**
	 * 向画布中添加一个组合关系元模型的图元
	 */
	addCompMetaModelFigure : function(bussModel) {
		var me = this, modelData = null;
		modelData = {
			"viewData" : {
				viewData : Ext.JSON.encode({
					"x":10,
					"y":10
				})
			},
			"bussData" : bussModel.getData()
		};
		me.getEditor().executeAction(
						Dep.framework.editor.ACTION.EDITOR.ADD_MODEL,
						null, 'CompMetaModel', modelData);
	},
	/**
	 * 向画布中添加一个用户文件夹里的元模型图元
	 */
	addUserMetaModelFigure : function(bussModel) {
		var me = this, modelData = null;
		modelData = {
			"viewData" : {
				viewData : Ext.JSON.encode({
					"x":10,
					"y":10
				})
			},
			"bussData" : bussModel.getData()
		};
		me.getEditor().executeAction(
						Dep.framework.editor.ACTION.EDITOR.ADD_MODEL,
						null, 'MetaMetaModel', modelData);
	},
	/**
	 * 弹出编辑文件夹属性的窗口
	 */
	showEditFolderWin : function(record) {
		var me = this;
		if(!me.editFolderWin) {
			me.editFolderWin = Ext.create('Dep.metamodel.modelmng.view.EditFolderWindow');
		}
		me.editFolderWin.folderParentRecord = record;
		me.cleanEditFolderWin();
		me.editFolderWin.show();
	},
	/**
	 * 清空编辑用户视图基本信息弹窗里的数据
	 */
	cleanEditFolderWin : function() {
		var me = this;
		me.editFolderWin.isAdd = true
		me.getFolderName().setValue('');
	},
	/**
	 * 确定添加文件夹，向后台提交数据
	 * 
	 * @param {Ext.button.Button} obj 确定按钮控件对象
	 */
	confirmAddFolder : function(obj) {
		var me = this;
		var record = null;
		var form = obj.up('form').getForm();
		var model = Ext.create('Dep.metamodel.modelmng.model.FolderModel', form.getValues());
		if(me.editFolderWin.isAdd==true) {
			if(me.editFolderWin.folderParentRecord) {
				model.set('parentId', me.editFolderWin.folderParentRecord.raw.id);
			}
		}
		var params = model.getData();
        if(form.isValid()){
        	if(me.editFolderWin.isAdd==true) {//添加
				model.save({callback : function(a, b, c) {
					if(model.proxy.reader.jsonData && model.proxy.reader.jsonData.result) {
						model.set('id', model.proxy.reader.jsonData.result.id);
					}
					me.editFolderWin.hide();
					var parentNode = me.editFolderWin.folderParentRecord;
					me.refreshAfterSaveFolder(parentNode, model);
				}});
			}else {//修改(文件夹不许修改，若不用了直接删除文件夹)
				if(me.editFolderWin.oldFolderRecord) {
					record = me.editFolderWin.oldFolderRecord;
					model.set('id', record.raw.id);
					model.save({callback : function() {
						me.editFolderWin.hide();
						var parentNode = me.editFolderWin.folderParentRecord;
						me.refreshAfterSaveFolder(parentNode, model);
					}});
				}
			}
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
	 * 弹出编辑枚举类型名称的窗口
	 */
	showEditEnumWin : function(record) {
		var me = this;
		if(!me.editEnumWin) {
			me.editEnumWin = Ext.create('Dep.metamodel.modelmng.view.EditEnumWindow', {
				title : '添加枚举类型'
			});
		}
		me.enumParentRecord = record;
		me.cleanEditEnumWin();
		me.editEnumWin.show();
	},
	/**
	 * 清空编辑用户视图基本信息弹窗里的数据
	 */
	cleanEditEnumWin : function() {
		var me = this;
		me.editEnumWin.isAdd = true
		me.getEnumName().setValue('');
	},
	/**
	 * 弹出重命名窗口
	 * @param {} record
	 */
	showRenameWin : function(record) {
		var me = this;
		if(!me.editEnumWin) {
			me.editEnumWin = Ext.create('Dep.metamodel.modelmng.view.EditEnumWindow', {
				title : '重命名'
			});
		}
		me.editEnumWin.setTitle("重命名");
		me.editEnumWin.isAdd = false;
		me.editEnumWin.oldEnumRecord = record;
		me.getEnumName().setValue(record.raw.text);
		me.editEnumWin.show();
	},
	/**
	 * 确定添加枚举类型，向后台提交数据
	 * 
	 * @param {Ext.button.Button} obj 确定按钮控件对象
	 */
	confirmAddEnum : function(obj) {
		var me = this;
		var url = "", record = null;
		var form = obj.up('form').getForm();
		var model = Ext.create('Dep.metamodel.modelmng.model.EnumModel', form.getValues());
		if(me.editEnumWin.isAdd==true) {
			url = 'metamodelenum/create.do';
		}else if(!me.editEnumWin.isAdd) {
			url = 'metamodelenum/update.do';
		}
		if(me.editEnumWin.isAdd==true) {//添加
			model.save({callback : function() {
				if(model.proxy.reader.jsonData && model.proxy.reader.jsonData.result) {
					model.set('id', model.proxy.reader.jsonData.result.id);
					me.editEnumWin.hide();
					var parentNode = me.enumTreeStore.getRootNode();
					me.refreshAfterSaveEnum(parentNode, model);
				}
			}});
		}else {//修改
			if(me.editEnumWin.oldEnumRecord) {
				record = me.editEnumWin.oldEnumRecord;
				model.set('id', record.raw.id);
				model.save({callback : function() {
					me.editEnumWin.hide();
					var parentNode = me.enumTreeStore.getRootNode();
					me.refreshAfterSaveEnum(parentNode, model);
				}});
			}
		}
	},
	
	/**
	 * 取消编辑文件夹操作
	 */
	cancelAddEnum : function() {
		var me = this;
		me.editEnumWin.hide();
	},
	/**
	 * 弹出单个审批元模型的弹窗(备用)
	 * @param {Ext.data.Model} model 将要被审批的元模型的model
	 */
	showApprovalMetaModelWinBackUp : function(model) {
		var me = this;
		if(!me.approvalWin) {
			me.approvalWin = Ext.create('Dep.metamodel.modelmng.view.ApprovalWindow', {
				approvalStore : me.approvalComboStore
			});
		}
		me.approvalWin.down('form').getForm().reset();
		me.approvalWin.show();
		me.approvalWin.currentMmModel = model;
		me.getApprovalMMCombo().setValue(true);
	},
	/**
	 * 弹出发布元模型的确认框
	 * @param {string} id 即将发布的元模型id
	 * @param {string} name 即将发布的元模型的名称
	 */
	showApprovalMetaModelWin : function(id, name) {
		var me = this;
		if(!id) {
			return;
		}
		var params = {id : id};
		Ext.Msg.confirm('提示', '您确定要发布'+name+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request('metamodel/publishVer.do', false, params, "",function(){
					Dep.framework.editor.util.Msg.success("发布成功！", "提示");
					me.refreshAllTreeByNodeId(id, true); //true表示需要传父节点
				}, function(){
					Dep.framework.editor.util.Msg.failed("发布失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
		
	},
	/**
	 * 撤销已发布的元模型
	 * @param {string} id 即将撤销发布的元模型id
	 * @param {string} name 即将撤销发布的元模型的名称
	 */
	repealPublish : function(id, name) {
		var me = this;
		if(!id) {
			return;
		}
		var params = {id : id};
		Ext.Msg.show({
		    title: '警告',
		    msg: '已发布的元模型如果正在被使用，撤销操作有可能带来严重后果！您确定要继续撤销'+name+'吗？',
		    width: 300,
		    buttons: Ext.MessageBox.YESNO,
		    fn: function(btn){
					if(btn=='yes') {
						Fn.Request('metamodel/repealPublish.do', false, params, "", function(){
							Dep.framework.editor.util.Msg.success("撤销成功！", "提示");
							me.refreshAllTreeByNodeId(id, true); //true表示需要传父节点
						}, function(){
							Dep.framework.editor.util.Msg.failed("撤销失败！", "提示");
						});
					}else {
						return false;
					}
				},
		    icon: Ext.MessageBox.WARNING
		});
	},
	/**
	 * 删除一个继承元模型
	 */
	deleteInheritMetaModel : function(record) {
		var me = this;
		if(!record) {
			return;
		}
		var params = {id : record.raw.id};
		Ext.Msg.confirm('提示', '您确定要删除'+record.raw.text+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request('metamodel/delete.do', false, params, "",function(res){
					if(res) {
						if(res.resultCode == 1) {
							Dep.framework.editor.util.Msg.success("删除成功！", "提示");
							me.refreshAllTreeByNodeId(record.raw.id, true, true);
						}else {
							Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
							return false;
						}
					}
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 删除一个继承关系元模型成功之后刷新继承元模型树形菜单
	 * @param {} parentNode 被删除节点的父节点 
	 * @param {} isDeletingLeaf 被删除节点是否是叶子节点
	 */
	refreshAfterDelInheritMm : function(parentNode) {
		var me = this, url = "metamodelquery/findNodeModel.do";
		if(!parentNode) {
			return;
		}
		me.inheritTreeStore.getProxy().url = url;
		me.inheritTreeStore.proxy.extraParams.id = parentNode.raw.id;//父节点id
		me.inheritTreeStore.load({
				node : parentNode, //刷新被删元模型的父节点
				callback : function(records, operation, success){ 
					me.metaModelMngWin.getInheritPanel().expandPath(parentNode.getPath("id"), 'id'); //展开父节点
				}
		});
	},
	/**
	 * 删除一个组合元模型
	 */
	deleteCompMetaModel : function(record) {
		var me = this;
		if(!record) {
			return;
		}
		var params = {id : record.raw.id};
		Ext.Msg.confirm('提示', '您确定要删除'+record.raw.text+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request('metamodel/delete.do', false, params, "",function(){
					Dep.framework.editor.util.Msg.success("删除成功！", "提示");
					me.refreshAfterDelCompMm(record.parentNode);
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 删除一个组合关系元模型成功之后刷新组合元模型树形菜单
	 * @param {} parentNode 被删除节点的父节点 
	 */
	refreshAfterDelCompMm : function(parentNode) {
		var me = this, url = "metamodelquery/findCompRootModel.do";
		if(!parentNode) {
			return;
		}
		me.compositionTreeStore.getProxy().url = url;
		me.compositionTreeStore.proxy.extraParams.id = parentNode.raw.id;//父节点id
		me.compositionTreeStore.load({
				node : parentNode, //刷新被删元模型的父节点
				callback : function(records, operation, success){ 
					me.metaModelMngWin.getCompositionPanel().expandPath(parentNode.getPath("id"), 'id'); //展开父节点
				}
		});
	},
	/**
	 * 添加或修改一个继承关系元模型成功之后刷新继承关系元模型树形菜单
	 * @param {} node 添加成功时node是右键点击的元模型，修改成功时node是右键点击的元模型的父节点
	 */
	refreshAfterSaveInheritMm : function(parentNode, model) {
		var me = this, url = "metamodelquery/findNodeModel.do";
		if(!parentNode) {
			return;
		}
		me.inheritTreeStore.getProxy().url = url;
		me.inheritTreeStore.proxy.extraParams.id = parentNode.raw.id;//父节点id
		me.inheritTreeStore.load({
				node : parentNode, //刷新被删元模型的父节点
				callback : function(records, operation, success){ 
					var newNode = me.inheritTreeStore.getNodeById(model.get("id"));//新的节点
					if(newNode) {
						me.metaModelMngWin.getInheritPanel().selectPath(newNode.getPath("id"), 'id'); //选中新节点
					}
				}
		});
	},
	/**
	 * 修改一个组合关系元模型成功之后，刷新组合关系元模型树形菜单
	 * @param {} node 添加成功时node是右键点击的元模型，修改成功时node是右键点击的元模型的父节点
	 */
	refreshAfterSaveCompMm : function(node, model) {
		var me = this, url = "metamodelquery/findCompNodeModel.do";
		if(!node) {
			return;
		}
		me.compositionTreeStore.getProxy().url = url;
		me.compositionTreeStore.proxy.extraParams.id = node.raw.id;
		me.compositionTreeStore.load({
				node : node, //局部刷新所要刷新的节点
				callback : function(records, operation, success){ 
					var newNode = me.compositionTreeStore.getNodeById(model.get("id"));//新的节点
					if(newNode) {
						me.metaModelMngWin.getCompositionPanel().selectPath(newNode.getPath("id"), 'id'); //选中新节点
					}
				}
		});	
	},
	/**
	 * 添加组合关系
	 */
	compositionRelationshipMng : function(record) {
		var me = this;
		if(!me.addOrRemoveMmWinForComp) {
			me.initAddOrRemoveMmWinForComp();
		}
		me.addOrRemoveMmWinForComp.setTitle("添加组合关系");
		me.addOrRemoveMmWinForComp.show();
		me.addOrRemoveMmWinForComp.fromMm = record;//起始元模型
		me.getCompNameTextField().setValue(record.raw.name);
		//组合关系管理的待选元模型列表
		me.selectingMmGridForComp = me.addOrRemoveMmWinForComp.getSelectingMmGrid();
		//组合关系管理的已选元模型列表
		me.selectedMmGridForComp = me.addOrRemoveMmWinForComp.getSelectedMmGrid();
		
		//右边的已选元模型数据量少于或等于左边的数据量，所以先执行完查询请求，先触发回调函数的执行
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		var selectingMetaModelListStore = me.selectingMmGridForComp.getStore(); //左边的未选元模型列表的store
		selectedMetaModelListStore.removeAll(false);
		//已选
		Ext.Ajax.request({
			url : 'metamodelquery/findAllMmCompositionById.do',
			params : {
				id : record.raw.id //根据起始元模型的id查询当前元模型已经存在的被组合元模型集合
			},
			method : 'GET',
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText, true);
				if(res && res.resultCode == 1) {
					if(res.result && res.result.modelList) {
						var rawList = res.result.modelList;
						var records = [];
						for(var i=0; i<rawList.length; i++) {
							var raw = rawList[i];
							var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', raw);
							records.push(model);
						}
						//左边的待选元模型数据量大于或等于右边的数据量，所以较慢执行完请求，较慢执行回调函数
						selectingMetaModelListStore.load({
							callback : function(recds, operat, succ) {
								for(var j=0; j<records.length; j++) {
									var model = records[j];
									if(model) {
										me.selectingMmGridForComp.getStore().remove(model);
									}
								}
								var selfModel = me.selectingMmGridForComp.getStore().findRecord('id', record.raw.id);
								if(selfModel) {
									me.selectingMmGridForComp.getStore().remove(selfModel);//移除自己
								}
								for(var i=0; i<recds.length; i++) {
									var md = recds[i];
									if(md.raw.status == 0) {
										me.selectingMmGridForComp.getStore().remove(md);//移除未发布的元模型
									}
								}
								me.selectingMmGridForComp.getStore().commitChanges();
							}
						});
					}
				}
				
			}
		});
	},
	/**
	 * 初始化组合关系或依赖关系管理的弹窗界面
	 * @return {Ext.window.Window} addOrRemoveMmWinForComp
	 */
	initAddOrRemoveMmWinForComp : function() {
		var me = this;
		if(!me.addOrRemoveMmWinForComp) {
			me.addOrRemoveMmWinForComp = Ext.create('Dep.metamodel.modelmng.view.AddOrRemoveMmWinForComp');
		}
		return me.addOrRemoveMmWinForComp;
	},
	/**
	 * 刷新组合树形菜单的store的根节点
	 */
	refreshCompTreeStore : function() {
		var me = this;
		var rootNode = me.compositionTreeStore.getRootNode();
		me.refreshAfterDelCompMm(rootNode);
	},
	/**
	 * 刷新继承树形菜单的store的根节点
	 * @param flag 是否第一次打开元模型管理界面 trur:是首次打开
	 */
	refreshInheritTreeStore : function(flag) {
		var me = this, url = "metamodelquery/findRootModel.do";
		me.inheritTreeStore.getProxy().url = url;
		var root = me.inheritTreeStore.getRootNode();
		me.inheritTreeStore.load({
			node : root, 
			callback : function(records, operation, success){ 
				me.metaModelMngWin.getInheritPanel().expandPath(root.getPath("id"), 'id');
				var newRoot = me.inheritTreeStore.getNodeById(root.raw.id);
				if(newRoot && newRoot.firstChild) {
					var firstChild = newRoot.firstChild;
					me.inheritTreeStore.getProxy().url = "metamodelquery/findNodeModel.do";
					me.inheritTreeStore.getProxy().extraParams.id = firstChild.raw.id;
					me.inheritTreeStore.load({
						node : firstChild,
						callback : function(recs, oper, succ){
							me.metaModelMngWin.getInheritPanel().expandPath(firstChild.getPath("id"), 'id');
							me.metaModelMngWin.getInheritPanel().selectPath(firstChild.getPath("id"), 'id');
							if(flag) {//首次弹出默认显示根节点继承关系图
								me.showSelectedInheritNode(null, firstChild);
							}
						}
					});
				}
			}
		});
	},
	/**
	 * 刷新枚举树形菜单的store的根节点
	 */
	refreshEnumTreeStore : function(record) {
		var me = this, url = "metamodelenum/findEnumList.do";
		me.enumTreeStore.getProxy().url = url;
		me.enumTreeStore.load();
		var root = me.enumTreeStore.getRootNode();
		var node = root.firstChild ? root.firstChild : root;
		node.expand(false);
	},
	/**
	 * 添加或修改一个枚举类型成功之后刷新枚举树形菜单
	 * @param {} node 添加成功时node是右键点击的元模型，修改成功时node是右键点击的元模型的父节点
	 */
	refreshAfterSaveEnum : function(parentNode, model) {
		var me = this, url = "metamodelenum/findEnumList.do";
		if(!parentNode) {
			return;
		}
		me.enumTreeStore.getProxy().url = url;
		me.enumTreeStore.load({
				node : parentNode,
				callback : function(records, operation, success){ 
					var newNode = me.enumTreeStore.getNodeById(model.get("id"));//新的节点
					if(newNode) {
						me.metaModelMngWin.getEnumTypeTreePanel().selectPath(newNode.getPath("id"), 'id'); //选中新节点
					}
				}
		});
	},
	/**
	 * 根据id删除一个未被使用的枚举节点
	 */
	deleteMenuByRecord : function(record) {
		var me = this;
		var params = {id : record.raw.id};
		Ext.Msg.confirm('提示', '您确定要删除'+record.raw.text+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request('metamodelenum/delete.do', false, params, "",function(){
					Dep.framework.editor.util.Msg.success("删除成功！", "提示");
					me.refreshAfterDelEnumNode(record.parentNode);
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 删除一个枚举节点成功之后刷新枚举树形菜单
	 * @param {} parentNode 被删除节点的父节点 
	 */
	refreshAfterDelEnumNode : function(parentNode) {
		var me = this, url = "metamodelenum/findEnumList.do";
		if(!parentNode) {
			return;
		}
		me.enumTreeStore.getProxy().url = url;
		me.enumTreeStore.load({
				node : parentNode, //刷新枚举根节点
				callback : function(records, operation, success){ 
					me.metaModelMngWin.getEnumTypeTreePanel().expandPath(parentNode.getPath("id"), 'id'); //展开父节点
					if(parentNode.firstChild) {
						me.metaModelMngWin.getEnumTypeTreePanel().selectPath(parentNode.firstChild.getPath("id"), 'id');
						me.showSelectedEnumNode(null, parentNode.firstChild);
					}
				}
		});
	},
	/**
	 * 添加或修改一个用户文件夹成功之后刷新用户文件夹树形菜单
	 * @param {} parentNode 添加成功时parentNode是右键点击的元模型，修改成功时parentNode是右键点击的元模型的父节点
	 */
	refreshAfterSaveFolder : function(parentNode, model) {
		var me = this, url = "metamodelfolder/getFolderTree.do";
		if(!parentNode) {
			return;
		}
		me.userFolderTreeStore.getProxy().url = url;
		me.userFolderTreeStore.getProxy().extraParams.id = parentNode.raw.id;
		me.userFolderTreeStore.load({
				node : parentNode,
				callback : function(records, operation, success){ 
					var newNode = me.userFolderTreeStore.getNodeById(model.get("id"));//新的节点
					if(newNode) {
						me.metaModelMngWin.getUserPanel().selectPath(newNode.getPath("id"), 'id'); //选中新节点
					}
				}
		});
	},
	/**
	 * 删除一个文件夹节点成功之后刷新用户树形菜单
	 * @param {} parentNode 被删除节点的父节点 
	 */
	refreshAfterDelFolderNode : function(parentNode) {
		var me = this, url = "metamodelfolder/getFolderTree.do";
		if(!parentNode) {
			return;
		}
		me.userFolderTreeStore.getProxy().url = url;
		me.userFolderTreeStore.getProxy().extraParams.id = parentNode.raw.id;
		me.userFolderTreeStore.load({
				node : parentNode, //刷新枚举根节点
				callback : function(records, operation, success){ 
					me.metaModelMngWin.getUserPanel().expandPath(parentNode.getPath("id"), 'id'); //展开父节点
				}
		});
	},
	/**
	 * 删除一个用户文件夹
	 */
	deleteUserFolder : function(record) {
		var me = this;
		if(!record) {
			return;
		}
		var params = {id : record.raw.id};
		Ext.Msg.confirm('提示', '您确定要删除'+record.raw.text+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request('metamodelfolder/delete.do', false, params, "",function(res){
					if(res.resultCode == 0) {
						Dep.framework.editor.util.Msg.failed(res.result, "提示");
						return;
					}else {
						Dep.framework.editor.util.Msg.success("删除成功！", "提示");
						me.refreshAfterDelFolderNode(record.parentNode);
					}
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 刷新用户文件夹树形菜单的store的根节点
	 */
	refreshUserFolderTreeStore : function() {
		var me = this;
		var rootNode = me.userFolderTreeStore.getRootNode();
		me.refreshAfterDelFolderNode(rootNode);
	},
	/**
	 * 获取移入或移除元模型到文件夹的窗口
	 */
	getAddOrRemoveMmInFolderWin : function() {
		var me = this;
		if(!me.addOrRemoveMmInFolderWin) {
			me.addOrRemoveMmInFolderWin = Ext.create('Dep.metamodel.modelmng.view.AddOrRemoveMmForFolderWin');
		}
		return me.addOrRemoveMmInFolderWin;
	},
	/**
	 * 弹出选择设置元模型到文件夹的弹窗
	 */
	showAddOrRemoveMmInFolderWin : function(record) {
		var me = this;
		me.getAddOrRemoveMmInFolderWin().show();
		me.addOrRemoveMmInFolderWin.folderId = record.raw.id;
		//待选元模型grid列表
		me.selectedMmGrid = me.addOrRemoveMmInFolderWin.getSelectedMmGrid();
		me.selectingMmGrid = me.addOrRemoveMmInFolderWin.getSelectingMmGrid();
		
		//右边的已选元模型数据量少于或等于左边的数据量，所以先执行完查询请求，先触发回调函数的执行
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		var selectingMetaModelListStore = me.selectingMmGrid.getStore(); //左边的未选元模型列表的store
		//已选
		selectedMetaModelListStore.load({
			params : {
				id : record.raw.id //根据文件夹的id查询当前文件夹里已经存在的元模型集合
			},
			callback : function(records, operation, success) {
				//左边的待选元模型数据量大于或等于右边的数据量，所以较慢执行完请求，较慢执行回调函数
				selectingMetaModelListStore.load({
					callback : function(recds, operat, succ) {
						for(var j=0; j<records.length; j++) {
							var model = records[j];
							if(model) {
								me.selectingMmGrid.getStore().remove(model);
							}
						}
						me.selectingMmGrid.getStore().commitChanges();
					}
				});
				
			}
		});
		
	},
	//用户文件夹管理模块向文件夹添加或移除元模型弹窗的添加单个按钮的处理函数
	addOneToFolderForUser : function() {
		var me = this;
		if(!me.selectingMmGrid) {//左
			me.selectingMmGrid = me.addOrRemoveMmInFolderWin.getSelectingMmGrid();
		}
		if(!me.selectedMmGrid) {//右
			me.selectedMmGrid = me.addOrRemoveMmInFolderWin.getSelectedMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGrid.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		
		var leftSelections = [], dataList = []; 
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGrid.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {return;}
		if(leftSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
			return;
		}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			if(model) {
				selectedMetaModelListStore.add(model);
				selectedMetaModelListStore.commitChanges();
				selectingMetaModelListStore.remove(model);
				selectingMetaModelListStore.commitChanges();
			}
		}
	},
		
	//用户文件夹管理模块向文件夹添加或移除元模型弹窗的【添加选中全部】按钮的处理函数
	addAllToFolderForUser : function() {
		var me = this;
		if(!me.selectingMmGrid) {//左
			me.selectingMmGrid = me.addOrRemoveMmInFolderWin.getSelectingMmGrid();
		}
		if(!me.selectedMmGrid) {//右
			me.selectedMmGrid = me.addOrRemoveMmInFolderWin.getSelectedMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGrid.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		
		var leftSelections = [], dataList = [];
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGrid.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {return;}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			if(model) {
				selectedMetaModelListStore.add(model);
				selectedMetaModelListStore.commitChanges();
				selectingMetaModelListStore.remove(model);
				selectingMetaModelListStore.commitChanges();
			}
		}
	},
		
	//移除单个选中的元模型
	removeOneFromFolderForUser : function() {
		var me = this;
		if(!me.selectingMmGrid) {//左
			me.selectingMmGrid = me.addOrRemoveMmInFolderWin.getSelectingMmGrid();
		}
		if(!me.selectedMmGrid) {//右
			me.selectedMmGrid = me.addOrRemoveMmInFolderWin.getSelectedMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGrid.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		
		var rightSelections = [], dataList = [];
		//右边选中的元模型数据集合
		rightSelections = me.selectedMmGrid.getSelectionModel().getSelection();
		if(rightSelections.length == 0) {return;}
		if(rightSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
			return;
		}
		for(var i=0; i<rightSelections.length; i++) {
			var model = rightSelections[i];
			if(model) {
				selectingMetaModelListStore.add(model);
				selectingMetaModelListStore.commitChanges();
				selectedMetaModelListStore.remove(model);
				selectedMetaModelListStore.commitChanges();
			}
		}
	},
		
	//移除选中的全部元模型
	removeAllFromFolderForUser : function() {
		var me = this;
		if(!me.selectingMmGrid) {//左
			me.selectingMmGrid = me.addOrRemoveMmInFolderWin.getSelectingMmGrid();
		}
		if(!me.selectedMmGrid) {//右
			me.selectedMmGrid = me.addOrRemoveMmInFolderWin.getSelectedMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGrid.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		
		var rightSelections = [], dataList = [];
		//右边选中的元模型数据集合
		rightSelections = me.selectedMmGrid.getSelectionModel().getSelection();
		if(rightSelections.length == 0) {return;}
		for(var i=0; i<rightSelections.length; i++) {
			var model = rightSelections[i];
			if(model) {
				selectingMetaModelListStore.add(model);
				selectingMetaModelListStore.commitChanges();
				selectedMetaModelListStore.remove(model);
				selectedMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 保存添加到已选元模型里的元模型数据
	 */
	saveSelectedFolderMms : function() {
		var me = this, dataList = [];;
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		var modelList = selectedMetaModelListStore.data.items;
		for(var i in modelList) {
			var model = modelList[i];
			var data = model.getData();
			delete data.attList;
			dataList.push(data);
		}
		var paramsObj = {
			id : me.addOrRemoveMmInFolderWin.folderId,
			modelList : dataList
		};
		//发送添加模型到文件夹的请求
		Ext.Ajax.request({
			url : 'metamodelfolder/addModel.do',
		    jsonData : Ext.JSON.encode(paramsObj),
		    success: function(response){
		        var text = response.responseText;
		        var res = Ext.JSON.decode(text);
		        if(res.resultCode == 1) {
		        	Dep.framework.editor.util.Msg.success("加入成功", "提示");
					me.refreshUserFolderTreeStore();
		        }
		    }
		});
	},
	/**
	 * 加入或移除元模型弹窗待选择元模型的名称输入框change事件处理函数,左侧前台过滤
	 */
	filterSelectingStoreToFolder : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addOrRemoveMmInFolderWin) {
			me.getAddOrRemoveMmInFolderWin();
		}
		if(!me.selectingMmGrid) {//左
			me.selectingMmGrid = me.addOrRemoveMmInFolderWin.getSelectingMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGrid.getStore(); //左边的未选元模型列表的store
		selectingMetaModelListStore.clearFilter(true);
		selectingMetaModelListStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
	 * 加入或移除元模型弹窗已选择元模型的名称输入框change事件处理函数,右侧前台过滤
	 * @param {} obj
	 * @param {} newValue
	 * @param {} oldValue
	 * @param {} eOpts
	 */
	filterSelectedStoreToFolder : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addOrRemoveMmInFolderWin) {
			me.getAddOrRemoveMmInFolderWin();
		}
		if(!me.selectedMmGrid) {//右
			me.selectedMmGrid = me.addOrRemoveMmInFolderWin.getSelectedMmGrid();
		}
		var selectedMetaModelListStore = me.selectedMmGrid.getStore(); //右边的已选元模型列表的store
		selectedMetaModelListStore.clearFilter(true);
		selectedMetaModelListStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
	 * 组合关系管理弹窗待选择元模型的名称输入框change事件处理函数,右侧前台过滤
	 * @param {} obj
	 * @param {} newValue
	 * @param {} oldValue
	 * @param {} eOpts
	 */
	filterSelectingStoreForComp : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addOrRemoveMmWinForComp) {
			me.initAddOrRemoveMmWinForComp();
		}
		if(!me.selectingMmGridForComp) {//左
			me.selectingMmGridForComp = me.addOrRemoveMmWinForComp.getSelectingMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGridForComp.getStore(); //左边的已选元模型列表的store
		selectingMetaModelListStore.clearFilter(true);
		selectingMetaModelListStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
	 * 组合关系管理弹窗已选择元模型的名称输入框change事件处理函数,右侧前台过滤
	 * @param {} obj
	 * @param {} newValue
	 * @param {} oldValue
	 * @param {} eOpts
	 */
	filterSelectedStoreForComp : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addOrRemoveMmWinForComp) {
			me.initAddOrRemoveMmWinForComp();
		}
		if(!me.selectedMmGridForComp) {//右
			me.selectedMmGridForComp = me.addOrRemoveMmWinForComp.getSelectedMmGrid();
		}
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		selectedMetaModelListStore.clearFilter(true);
		selectedMetaModelListStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
     * 切换显示panel
     * @param flag  【0：继承组合用户tab面板； 1：检索结果treepanel】
     */
    changePanelVisible : function (flag) {
        var me = this;
        if (flag === 1) {
            me.metaModelMngWin.getQueryResultPanel().setVisible(true);
            me.metaModelMngWin.getNavTabPanel().setVisible(false);
        } else {
            me.metaModelMngWin.getQueryResultPanel().setVisible(false);
            me.metaModelMngWin.getNavTabPanel().setVisible(true);
        }
    },
    /**
     * 根据输入的字符串来检索元模型
     */
    queryMetaModelByStr : function() {
    	var me = this;
    	var strField = me.getQueryStrTextField();
    	var str = strField.getValue();
    	me.changePanelVisible(1);//显示检索结果treepanel
    	var queryResultPanel = me.metaModelMngWin.getQueryResultPanel();
    	var queryResultStore = queryResultPanel.getStore();
    	queryResultStore.proxy.extraParams.name = str;//模糊查询
    	var root = queryResultPanel.getRootNode();
		queryResultStore.load({
			node : root, 
			callback : function(){ 
				queryResultPanel.expandPath(root.getPath("id"), 'id');          
			}
		});
    },
    /**
     * 返回
     */
    goBack : function() {
    	var me = this;
    	me.changePanelVisible(0);
    },
    /**
     * 获取组合关系管理的2个选择元模型列表
     */
    initSelectGridsForComp : function() {
    	var me = this;
    	if(!me.addOrRemoveMmWinForComp) {
			me.initAddOrRemoveMmWinForComp();
		}
    	//组合关系管理的待选元模型列表
    	if(!me.selectingMmGridForComp) {
			me.selectingMmGridForComp = me.addOrRemoveMmWinForComp.getSelectingMmGrid();
    	}
		//组合关系管理的已选元模型列表
    	if(!me.selectedMmGridForComp) {
			me.selectedMmGridForComp = me.addOrRemoveMmWinForComp.getSelectedMmGrid();
    	}
    },
    /**
     * 组合关系管理弹窗的添加单个按钮的处理函数
     */
	addOneToFolderForComp : function() {
		var me = this;
		me.initSelectGridsForComp();
		var selectingMetaModelListStore = me.selectingMmGridForComp.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		
		var leftSelections = [], dataList = []; 
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGridForComp.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {return;}
		if(leftSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
			return;
		}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			if(model) {
				selectedMetaModelListStore.add(model);
				selectedMetaModelListStore.commitChanges();
				selectingMetaModelListStore.remove(model);
				selectingMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 组合关系管理弹窗的【添加选中全部】按钮的处理函数
	 */	
	addAllToFolderForComp : function() {
		var me = this;
		me.initSelectGridsForComp();
		var selectingMetaModelListStore = me.selectingMmGridForComp.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		
		var leftSelections = [], dataList = [];
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGridForComp.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {return;}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			if(model) {
				selectedMetaModelListStore.add(model);
				selectedMetaModelListStore.commitChanges();
				selectingMetaModelListStore.remove(model);
				selectingMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 组合关系管理弹窗里的移除单个选中的元模型
	 */	
	removeOneFromFolderForComp : function() {
		var me = this;
		me.initSelectGridsForComp();
		var selectingMetaModelListStore = me.selectingMmGridForComp.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		
		var rightSelections = [], dataList = [];
		//右边选中的元模型数据集合
		rightSelections = me.selectedMmGridForComp.getSelectionModel().getSelection();
		if(rightSelections.length == 0) {return;}
		if(rightSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
			return;
		}
		for(var i=0; i<rightSelections.length; i++) {
			var model = rightSelections[i];
			if(model) {
				selectingMetaModelListStore.add(model);
				selectingMetaModelListStore.commitChanges();
				selectedMetaModelListStore.remove(model);
				selectedMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 组合关系管理中移除选中的全部元模型
	 */	
	removeAllFromFolderForComp : function() {
		var me = this;
		me.initSelectGridsForComp();
		var selectingMetaModelListStore = me.selectingMmGridForComp.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		
		var rightSelections = [], dataList = [];
		//右边选中的元模型数据集合
		rightSelections = me.selectedMmGridForComp.getSelectionModel().getSelection();
		if(rightSelections.length == 0) {return;}
		for(var i=0; i<rightSelections.length; i++) {
			var model = rightSelections[i];
			if(model) {
				selectingMetaModelListStore.add(model);
				selectingMetaModelListStore.commitChanges();
				selectedMetaModelListStore.remove(model);
				selectedMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 保存设置好的组合关系的数据
	 */
	saveSelectedCompMms : function() {
		var me = this, dataList = [];
		var selectedMetaModelListStore = me.selectedMmGridForComp.getStore(); //右边的已选元模型列表的store
		var modelList = selectedMetaModelListStore.data.items;
		var compTypeCombo = me.getCompTypeCombo();
		for(var i in modelList) {
			var model = modelList[i];
			var data = model.getData();
			delete data.attList;
			dataList.push(data);
		}
		var fromMm = me.addOrRemoveMmWinForComp.fromMm;
		var paramsObj = {
			id : fromMm.raw.id,
			toMultiplicity : compTypeCombo ? compTypeCombo.getValue() : "1",
			modelList : dataList
		};
		//发送创建一类组合关系集合的请求
		Ext.Ajax.request({
			url : 'metamodelcomp/create.do',
		    jsonData : Ext.JSON.encode(paramsObj),
		    success: function(response){
		        var text = response.responseText;
		        var res = Ext.JSON.decode(text);
		        if(res.resultCode == 1) {
		        	Dep.framework.editor.util.Msg.success("保存成功", "提示");
		        	me.addOrRemoveMmWinForComp.hide();
		        	me.refreshAllTreeByNodeId(fromMm.raw.id);
		        }else {
		        	Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
		        }
		    }
		});
		
	},
	/**
	 * 添加依赖关系
	 */
	dependencyRelationshipMng : function(record) {
		var me = this;
		if(!me.addOrRemoveMmWinForDepend) {
			me.initAddOrRemoveMmWinForDepend();
		}
		me.addOrRemoveMmWinForDepend.setTitle("添加依赖关系");
		me.addOrRemoveMmWinForDepend.show();
		me.addOrRemoveMmWinForDepend.fromMm = record;//起始元模型
		me.getDependNameTextField().setValue(record.raw.name);
		//依赖关系管理的待选元模型列表
		me.selectingMmGridForDepend = me.addOrRemoveMmWinForDepend.getSelectingMmGrid();
		//依赖关系管理的已选元模型列表
		me.selectedMmGridForDepend = me.addOrRemoveMmWinForDepend.getSelectedMmGrid();
		
		//右边的已选元模型数据量少于或等于左边的数据量，所以先执行完查询请求，先触发回调函数的执行
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		var selectingMetaModelListStore = me.selectingMmGridForDepend.getStore(); //左边的未选元模型列表的store
		selectedMetaModelListStore.removeAll(false);
		//已选
		selectedMetaModelListStore.load({
			params : {
				id : record.raw.id //根据起始元模型的id查询当前元模型已经存在的被组合元模型集合
			},
			callback : function(records, operation, success) {
				//左边的待选元模型数据量大于或等于右边的数据量，所以较慢执行完请求，较慢执行回调函数
				selectingMetaModelListStore.load({
					callback : function(recds, operat, succ) {
						for(var j=0; j<records.length; j++) {
							var model = records[j];
							if(model) {
								me.selectingMmGridForDepend.getStore().remove(model);
							}
						}
						var selfModel = me.selectingMmGridForDepend.getStore().findRecord('id', record.raw.id);
						if(selfModel) {
							me.selectingMmGridForDepend.getStore().remove(selfModel);//移除自己
						}
						for(var i=0; i<recds.length; i++) {
							var md = recds[i];
							if(md.raw.status == 0) {
								me.selectingMmGridForDepend.getStore().remove(md);//移除未发布的元模型
							}
						}
						me.selectingMmGridForDepend.getStore().commitChanges();
						me.selectedMmGridForDepend.getStore().removeAll(false);
					}
				});
				
			}
		});
	},
	/**
	 * 初始化组合关系或依赖关系管理的弹窗界面
	 * @return {Ext.window.Window} addOrRemoveMmWinForDepend
	 */
	initAddOrRemoveMmWinForDepend : function() {
		var me = this;
		if(!me.addOrRemoveMmWinForDepend) {
			me.addOrRemoveMmWinForDepend = Ext.create('Dep.metamodel.modelmng.view.AddOrRemoveMmWinForDepend');
		}
		return me.addOrRemoveMmWinForDepend;
	},
	/**
     * 获取依赖关系管理的2个选择元模型列表
     */
    initSelectGridsForDepend : function() {
    	var me = this;
    	if(!me.addOrRemoveMmWinForDepend) {
			me.initAddOrRemoveMmWinForDepend();
		}
    	//依赖关系管理的待选元模型列表
    	if(!me.selectingMmGridForDepend) {
			me.selectingMmGridForDepend = me.addOrRemoveMmWinForDepend.getSelectingMmGrid();
    	}
		//依赖关系管理的已选元模型列表
    	if(!me.selectedMmGridForDepend) {
			me.selectedMmGridForDepend = me.addOrRemoveMmWinForDepend.getSelectedMmGrid();
    	}
    },
    /**
     * 依赖关系管理弹窗的添加单个按钮的处理函数
     */
	addOneToFolderForDepend : function() {
		var me = this;
		me.initSelectGridsForDepend();
		var selectingMetaModelListStore = me.selectingMmGridForDepend.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		
		var leftSelections = [], dataList = []; 
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGridForDepend.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {return;}
		if(leftSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
			return;
		}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			if(model) {
				selectedMetaModelListStore.add(model);
				selectedMetaModelListStore.commitChanges();
				selectingMetaModelListStore.remove(model);
				selectingMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 依赖关系管理弹窗的【添加选中全部】按钮的处理函数
	 */	
	addAllToFolderForDepend : function() {
		var me = this;
		me.initSelectGridsForDepend();
		var selectingMetaModelListStore = me.selectingMmGridForDepend.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		
		var leftSelections = [], dataList = [];
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGridForDepend.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {return;}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			if(model) {
				selectedMetaModelListStore.add(model);
				selectedMetaModelListStore.commitChanges();
				selectingMetaModelListStore.remove(model);
				selectingMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 依赖关系管理弹窗里的移除单个选中的元模型
	 */	
	removeOneFromFolderForDepend : function() {
		var me = this;
		me.initSelectGridsForDepend();
		var selectingMetaModelListStore = me.selectingMmGridForDepend.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		
		var rightSelections = [], dataList = [];
		//右边选中的元模型数据集合
		rightSelections = me.selectedMmGridForDepend.getSelectionModel().getSelection();
		if(rightSelections.length == 0) {return;}
		if(rightSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一条记录", "提示");
			return;
		}
		for(var i=0; i<rightSelections.length; i++) {
			var model = rightSelections[i];
			if(model) {
				selectingMetaModelListStore.add(model);
				selectingMetaModelListStore.commitChanges();
				selectedMetaModelListStore.remove(model);
				selectedMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 依赖关系管理中移除选中的全部元模型
	 */	
	removeAllFromFolderForDepend : function() {
		var me = this;
		me.initSelectGridsForDepend();
		var selectingMetaModelListStore = me.selectingMmGridForDepend.getStore(); //左边的未选元模型列表的store
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		
		var rightSelections = [], dataList = [];
		//右边选中的元模型数据集合
		rightSelections = me.selectedMmGridForDepend.getSelectionModel().getSelection();
		if(rightSelections.length == 0) {return;}
		for(var i=0; i<rightSelections.length; i++) {
			var model = rightSelections[i];
			if(model) {
				selectingMetaModelListStore.add(model);
				selectingMetaModelListStore.commitChanges();
				selectedMetaModelListStore.remove(model);
				selectedMetaModelListStore.commitChanges();
			}
		}
	},
	/**
	 * 保存设置好的依赖关系的数据
	 */
	saveSelectedDependMms : function() {
		var me = this, dataList = [];
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		var modelList = selectedMetaModelListStore.data.items;
		for(var i in modelList) {
			var model = modelList[i];
			var data = model.getData();
			delete data.attList;
			dataList.push(data);
		}
		var fromMm = me.addOrRemoveMmWinForDepend.fromMm;
		var paramsObj = {
			id : fromMm.raw.id,
			name : fromMm.raw.name,
			modelList : dataList
		};
		//发送添加模型到文件夹的请求
		Ext.Ajax.request({
			url : 'metamodeldepe/create.do',
		    jsonData : Ext.JSON.encode(paramsObj),
		    success: function(response){
		        var text = response.responseText;
		        var res = Ext.JSON.decode(text);
		        if(res.resultCode == 1) {
		        	Dep.framework.editor.util.Msg.success("保存成功", "提示");
		        	me.addOrRemoveMmWinForDepend.hide();
		        	me.refreshAllTreeByNodeId(fromMm.raw.id);
		        }else {
		        	Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
		        }
		    }
		});
	},
	/**
	 * 依赖关系管理弹窗待选择元模型的名称输入框change事件处理函数,右侧前台过滤
	 * @param {} obj
	 * @param {} newValue
	 * @param {} oldValue
	 * @param {} eOpts
	 */
	filterSelectingStoreForDepend : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addOrRemoveMmWinForDepend) {
			me.initAddOrRemoveMmWinForDepend();
		}
		if(!me.selectingMmGridForDepend) {//左
			me.selectingMmGridForDepend = me.addOrRemoveMmWinForDepend.getSelectingMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGridForDepend.getStore(); //左边的已选元模型列表的store
		selectingMetaModelListStore.clearFilter(true);
		selectingMetaModelListStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
	 * 依赖关系管理弹窗已选择元模型的名称输入框change事件处理函数,右侧前台过滤
	 * @param {} obj
	 * @param {} newValue
	 * @param {} oldValue
	 * @param {} eOpts
	 */
	filterSelectedStoreForDepend : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addOrRemoveMmWinForDepend) {
			me.initAddOrRemoveMmWinForDepend();
		}
		if(!me.selectedMmGridForDepend) {//右
			me.selectedMmGridForDepend = me.addOrRemoveMmWinForDepend.getSelectedMmGrid();
		}
		var selectedMetaModelListStore = me.selectedMmGridForDepend.getStore(); //右边的已选元模型列表的store
		selectedMetaModelListStore.clearFilter(true);
		selectedMetaModelListStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
	 * 初始化添加元模型到指定文件夹的弹窗界面
	 * @return {}
	 */
	initAddToFolderWin : function() {
		var me = this;
		if(!me.addToFolderWin) {
			me.addToFolderWin = Ext.create('Dep.metamodel.modelmng.view.AddToFolderWin', {
				classifyFolderTreeStore : me.classifyFolderTreeStore
			});
		}
		return me.addToFolderWin;
	},
	/**
	 * 添加到文件夹
	 */
	addToFolder : function(name) {
		var me = this;
		if(!me.addToFolderWin) {
			me.initAddToFolderWin();
		}
		me.addToFolderWin.show();
		//元模型归类管理左侧待选元模型列表
		me.selectingMmGridForClassify = me.addToFolderWin.getSelectingMmGrid();
		var selectingMetaModelListStore = me.selectingMmGridForClassify.getStore();
		//左边的待归类元模型
		selectingMetaModelListStore.load({
			callback : function(recds, operat, succ) {
					for(var i=0; i<recds.length; i++) {
						var recd = recds[i];
						if(recd.get('packageid')) {
							me.selectingMmGridForClassify.getStore().remove(recd);//移除已归好类的元模型
						}
					}
					me.selectingMmGridForClassify.getStore().commitChanges();
					me.getClassifyNameTextField().setValue(name);
			}
		});
	},
	/**
	 * 添加到文件夹弹窗左侧待归类元模型的名称输入框change事件处理函数,右侧前台过滤
	 * @param {} obj
	 * @param {} newValue
	 * @param {} oldValue
	 * @param {} eOpts
	 */
	filterSelectingStoreForClassify : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		if(!me.addToFolderWin) {
			me.initAddToFolderWin();
		}
		if(!me.selectingMmGridForClassify) {//左
			me.selectingMmGridForClassify = me.addToFolderWin.getSelectingMmGrid();
		}
		var selectingMetaModelListStore = me.selectingMmGridForClassify.getStore(); //左边的待选元模型列表的store
		selectingMetaModelListStore.clearFilter(true);
		//过滤
		selectingMetaModelListStore.filterBy(function(record, id) {
			var text = record.get("name");
			return (text.indexOf(newValue) != -1);
		});
	},
	initAddToFolderGridsForClassify : function() {
		var me = this;
		if(!me.selectingMmGridForClassify) {//左
			me.selectingMmGridForClassify = me.addToFolderWin.getSelectingMmGrid();
		}
		if(!me.classifyFolderTreePanel) {
			me.classifyFolderTreePanel = me.addToFolderWin.getClassifyFolderTreePanel();
		}
	},
	/**
     * 添加到文件夹弹窗的添加单个按钮的处理函数
     */
	addOneToFolderForClassify : function() {
		var me = this;
		me.initAddToFolderGridsForClassify();
		var selectingMetaModelListStore = me.selectingMmGridForClassify.getStore(); //左边的未选元模型列表的store
		var classifyFolderTreeStore = me.classifyFolderTreePanel.getStore();        //右边的分类文件夹的treeStore
		
		var leftSelections = [], rightSelectedNode = null; 
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGridForClassify.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {
			Dep.framework.editor.util.Msg.info("请先选中一个待归类元模型", "提示");
			return;
		}
		if(leftSelections.length > 1) {
			Dep.framework.editor.util.Msg.info("请只选中一个元模型", "提示");
			return;
		}
		//右边选中的节点
		rightSelectedNode = me.classifyFolderTreePanel.getSelectionModel().getSelection();
		if(rightSelectedNode.length == 0){
			Dep.framework.editor.util.Msg.info("请先选中一个文件夹", "提示");
			return;
		}
		var folderNode = rightSelectedNode[0];
		if(folderNode.raw.nodeType == 'metaModelNode') {
			Dep.framework.editor.util.Msg.info("只能选中一个文件夹", "提示");
			return;
		}
		if(folderNode.raw.nodeType == 'userRoot') {
			Dep.framework.editor.util.Msg.info("不能选择根节点", "提示");
			return;
		}
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			model.set('packageid', folderNode.raw.id);
			model.save({
				callback : function(m, o, s) {
					var res = m.proxy.reader.jsonData;
					if(res.resultCode == 0) {
						Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
						return;
					}
					selectingMetaModelListStore.remove(model);
					selectingMetaModelListStore.commitChanges();
					classifyFolderTreeStore.getProxy().extraParams.id = 'root';
					classifyFolderTreeStore.load({
						callback : function() {
							me.classifyFolderTreePanel.expandPath(folderNode.getPath("id"), 'id'); //展开文件夹
							var newNode = classifyFolderTreeStore.getNodeById(folderNode.raw.id);
							classifyFolderTreeStore.getProxy().extraParams.id = folderNode.raw.id;
							if(newNode) {
								newNode.expand();
							}
						}
					});
				}
			});
		}
	},
	/**
	 * 添加到文件夹弹窗的【添加选中全部】按钮的处理函数
	 */	
	addAllToFolderForClassify : function() {
		var me = this;
		me.initAddToFolderGridsForClassify();
		var selectingMetaModelListStore = me.selectingMmGridForClassify.getStore(); //左边的未选元模型列表的store
		var classifyFolderTreeStore = me.classifyFolderTreePanel.getStore();        //右边的分类文件夹的treeStore
		
		var leftSelections = [], rightSelectedNode = null; 
		//左边选中的元模型数据集合
		leftSelections = me.selectingMmGridForClassify.getSelectionModel().getSelection();
		if(leftSelections.length == 0) {
			Dep.framework.editor.util.Msg.info("请先选中一个待归类元模型", "提示");
			return;
		}
		//右边选中的节点
		rightSelectedNode = me.classifyFolderTreePanel.getSelectionModel().getSelection();
		if(rightSelectedNode.length == 0){
			Dep.framework.editor.util.Msg.info("请先选中一个文件夹", "提示");
			return;
		}
		var folderNode = rightSelectedNode[0];
		if(folderNode.raw.nodeType == 'metaModelNode') {
			Dep.framework.editor.util.Msg.info("只能选中一个文件夹", "提示");
			return;
		}
		if(folderNode.raw.nodeType == 'userRoot') {
			Dep.framework.editor.util.Msg.info("不能选择根节点", "提示");
			return;
		}
		var flag = 0;
		for(var i=0; i<leftSelections.length; i++) {
			var model = leftSelections[i];
			model.set('packageid', folderNode.raw.id);
			model.save({
				callback : function(m, o, s) {
					var res = m.proxy.reader.jsonData;
					if(res.resultCode == 0) {
						Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
						flag = -1;
						return;
					}
					selectingMetaModelListStore.remove(model);
					selectingMetaModelListStore.commitChanges();
					flag = i+1;
				}
			});
		}
		if(flag == leftSelections.length) {
			classifyFolderTreeStore.getProxy().extraParams.id = 'root';
			classifyFolderTreeStore.load({
				callback : function() {
					me.classifyFolderTreePanel.expandPath(folderNode.getPath("id"), 'id'); //展开文件夹
					var newNode = classifyFolderTreeStore.getNodeById(folderNode.raw.id);
					classifyFolderTreeStore.getProxy().extraParams.id = folderNode.raw.id;
					if(newNode) {
						newNode.expand();
					}
				}
			});
		}
	},
	/**
	 * 添加到文件夹弹窗里的移除单个选中的元模型
	 */	
	removeOneFromFolderForClassify : function() {
		var me = this;
		me.initAddToFolderGridsForClassify();
		var selectingMetaModelListStore = me.selectingMmGridForClassify.getStore(); //左边的未选元模型列表的store
		var classifyFolderTreeStore = me.classifyFolderTreePanel.getStore();        //右边的分类文件夹的treeStore
		
		var rightSelectedNode = []; 
		//右边选中的节点
		rightSelectedNode = me.classifyFolderTreePanel.getSelectionModel().getSelection();
		if(rightSelectedNode.length == 0){
			Dep.framework.editor.util.Msg.info("请先在右边文件夹分类树上选中的一个元模型", "提示");
			return;
		}
		var mmNode = rightSelectedNode[0];
		if(mmNode.raw.nodeType != 'metaModelNode') {
			Dep.framework.editor.util.Msg.info("只能选中一个元模型", "提示");
			return;
		}
		var folderNode = mmNode.parentNode ? mmNode.parentNode : null;
		delete mmNode.raw.packageid;
		delete mmNode.raw.attList;
		me.getClassifyNameTextField().setValue("");
		var mdol = Ext.create('Dep.metamodel.modelmng.model.MetaModelBasicModel', mmNode.raw);
		
		mdol.save({
			callback : function(m, o, s) {
				var res = m.proxy.reader.jsonData;
					if(res.resultCode == 0) {
						Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
						return;
					}
				selectingMetaModelListStore.add(mdol);
				selectingMetaModelListStore.commitChanges();
				classifyFolderTreeStore.getProxy().extraParams.id = 'root';
					classifyFolderTreeStore.load({
						callback : function() {
							me.classifyFolderTreePanel.expandPath(mmNode.getPath("id"), 'id'); //展开文件夹
							var newNode = classifyFolderTreeStore.getNodeById(folderNode.raw.id);
							classifyFolderTreeStore.getProxy().extraParams.id = folderNode.raw.id;
							if(newNode) {
								newNode.expand();
							}
						}
					});
			}
		});
	},
	/**
	 * 获取展示元模型关系图的面板
	 * @return {}
	 */
	getMmRelationshipDetailPanel : function() {
		var me = this;
		if(!me.mmRelationshipDetailPanel) {
    		me.mmRelationshipDetailPanel = Ext.create('Dep.metamodel.modelmng.view.MMRelationshipDetailPanel');
    	}
    	return me.mmRelationshipDetailPanel;
	},
	/**
	 * 当窗口大小变化时d3画布同步缩放
	 */
	bindD3PanelResizeEvent : function() {
		var me = this;
		if(!me.mmRelationshipDetailPanel) {
			me.mmRelationshipDetailPanel = me.getMmRelationshipDetailPanel();
		}
        me.mmRelationshipDetailPanel.on('resize', function(win, width, height, eOpts) {
        	d3.select("#metamodel_relationDetailPanelDiv").html("");
        	d3_ShowDatas("metamodel_relationDetailPanelDiv", width-20, height-30, me.json);
        });
	},
	/**
	 * 用户勾选【继承】单选按钮时，只显示继承关系图
	 */
	showInheritRelationShips : function() {
		var me = this;
		if(!me.currentMmData)return;
		var currentMmData = me.currentMmData;
		var record = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', currentMmData);
		var id = currentMmData.id;//当前选中元模型的id
		var url = "metamodelquery/findAllMmInheritById.do";
		me.onlyCheckedOneRadio(1, 2, 0);
			//发请求获取继承关系数据 
			Ext.Ajax.request({
				url : url,
			    params : {
			    	id : id
			    },
			    method : 'GET',
			    success: function(response){
			        var text = response.responseText;
			        var res = Ext.JSON.decode(text);
			        if(res.resultCode == 1) {
			        	var result = res.result;
			        	var mdAr = result.modelList;
						var linesAr = result.anvList;
				    	var nodes = [], lines=[];
				    	var mdIndex = new Ext.util.MixedCollection();
				    	if(mdAr){
				    		mdAr.push(currentMmData);
				    		for(var i=0; i<mdAr.length; i++){
				    			var md = mdAr[i];
				    			if(!md)continue;
				                mdIndex.add(md.id, i);
				                //截取上传图元路径的文件名
                                var graphSvg=md.graphSvg;
                                if(graphSvg!=null&&graphSvg.indexOf("\\\\")==-1){
                                    var temp= graphSvg.split("\\");
                                    if(temp.length>1){
                                        md.graphSvg=temp[temp.length - 1];
                                    }
                                }
				                var str ="名称："+md.name+",代码："+md.code + ",描述："+(md.remark ? md.remark : "") +",状态："+(md.status==11 ? "已发布" : "未发布");
				                var img = (md.id==currentMmData.id) ? (md.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+md.graphSvg :  "Dep/metamodel/modelmng/editor/img/MetaModelCurrent.png")
				                : (md.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+md.graphSvg : "Dep/metamodel/modelmng/editor/img/MetaModel.png");
				    			nodes.push({"id": md.id, "name" :md.name, "image":img, detail:str, "record":md, "type":"metamodelmng", "status":md.status});
				    		}
				    	}
				    	if(linesAr){
				    		var index = mdAr.length, zhHas = false, ylHas = false, stopFlag = false;
				    		for(var i=0; i<linesAr.length; i++){
               					var line = linesAr[i];
                				var sIndex = mdIndex.get(line.startNodeId), eIndex = mdIndex.get(line.endNodeId) ? mdIndex.get(line.endNodeId) : mdAr[0];
                				if(!stopFlag) {
	                				for(var j=0; j<nodes.length; j++) {
	                					var mm = nodes[j];
	                					if(mm.id == line.startNodeId) {
	                						mm.image = 'Dep/metamodel/modelmng/editor/img/MetaModelParent.png';
	                						stopFlag = true;
	                					}
	                				}
                				}
                				//后台返回的数据方向是错误的，所以此处做一个转换
                				lines.push({ "source": eIndex , "target": sIndex, "relation": (line.name ? line.name : "继承关系"), "data": line});
				    		}
				    	}
				    	me.json = {"nodes":nodes, "lines":lines};
				    	d3.select("#metamodel_relationDetailPanelDiv").html("");
        				d3_ShowDatas("metamodel_relationDetailPanelDiv", me.mmRelationshipDetailPanel.getWidth()-20,
        					me.mmRelationshipDetailPanel.getHeight()-30, me.json);
			        }
			    }
			});
	},
	/**
	 * 用户勾选【组合】复选框时，只显示组合关系图
	 */
	showCompositionRelationShips : function() {
		var me = this;
		if(!me.currentMmData)return;
		var currentMmData = me.currentMmData;
		var record = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', currentMmData);
		var id = currentMmData.id;//当前选中元模型的id
		var url = "metamodelquery/findAllMmCompositionById.do";
		me.onlyCheckedOneRadio(0, 2, 1);
			//发请求获取组合关系数据
			Ext.Ajax.request({
				url : url,
			    params : {
			    	id : id
			    },
			    method : 'GET',
			    success: function(response){
			        var text = response.responseText;
			        var res = Ext.JSON.decode(text);
			        if(res.resultCode == 1) {
			        	var result = res.result;
			        	var mdAr = result.modelList;
						var linesAr = result.anvList;
				    	var nodes = [], lines=[];
				    	var mdIndex = new Ext.util.MixedCollection();
				    	if(mdAr){
				    		mdAr.push(currentMmData);
				    		for(var i=0; i<mdAr.length; i++){
				    			var md = mdAr[i];
				    			if(!md)continue;
				                mdIndex.add(md.id, i);
				                var str ="名称："+md.name+",代码："+md.code + ",描述："+(md.remark ? md.remark : "") +",状态："+(md.status==11 ? "已发布" : "未发布");
				                var img = md.id==currentMmData.id ? (md.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+md.graphSvg :  "Dep/metamodel/modelmng/editor/img/MetaModelCurrent.png")
				                : (md.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+md.graphSvg : "Dep/metamodel/modelmng/editor/img/MetaModel.png");
				    			nodes.push({"id": md.id, "name" :md.name, "image":img, detail:str, "record":md, "type":"metamodelmng", "status":md.status});
				    		}
				    	}
				    	if(linesAr){
				    		var index = mdAr.length, zhHas = false;
				    		for(var i=0; i<linesAr.length; i++){
               					var line = linesAr[i];
                				var sIndex = mdIndex.get(line.startNodeId), eIndex = mdIndex.get(line.endNodeId);
			                	lines.push({ "source": sIndex , "target": eIndex, "relation": (line.name ? line.name : "组合关系"), "data": line});
				    		}
				    	}
				    	me.json = {"nodes":nodes, "lines":lines};
				    	d3.select("#metamodel_relationDetailPanelDiv").html("");
        				d3_ShowDatas("metamodel_relationDetailPanelDiv", me.mmRelationshipDetailPanel.getWidth()-20,
        					me.mmRelationshipDetailPanel.getHeight()-30, me.json);
			        }
			    }
			});
		
	},
	/**
	 * 用户勾选【依赖】复选框时，只显示依赖关系图
	 */
	showDependRelationShips : function() {
		var me = this;
		if(!me.currentMmData)return;
		var currentMmData = me.currentMmData;
		var record = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', currentMmData);
		var id = currentMmData.id;//当前选中元模型的id
		var url = "metamodelquery/findAllMmDependencyById.do";
		me.onlyCheckedOneRadio(0, 1, 2);
			//发请求获取依赖关系数据
			Ext.Ajax.request({
				url : url,
			    params : {
			    	id : id
			    },
			    method : 'GET',
			    success: function(response){
			        var text = response.responseText;
			        var res = Ext.JSON.decode(text);
			        if(res.resultCode == 1) {
			        	var result = res.result;
			        	var mdAr = result.modelList;
						var linesAr = result.anvList;
				    	var nodes = [], lines=[];
				    	var mdIndex = new Ext.util.MixedCollection();
				    	if(mdAr){
				    		mdAr.push(currentMmData);
				    		for(var i=0; i<mdAr.length; i++){
				    			var md = mdAr[i];
				    			if(!md)continue;
				                mdIndex.add(md.id, i);
				                var str ="名称："+md.name+",代码："+md.code + ",描述："+(md.remark ? md.remark : "") +",状态："+(md.status==11 ? "已发布" : "未发布");
				                var img = md.id==currentMmData.id ? (md.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+md.graphSvg :  "Dep/metamodel/modelmng/editor/img/MetaModelCurrent.png")
				                : (md.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+md.graphSvg : "Dep/metamodel/modelmng/editor/img/MetaModel.png");
				    			nodes.push({"id": md.id, "name" :md.name, "image":img, detail:str, "record":md, "type":"metamodelmng", "status":md.status});
				    		}
				    	}
				    	if(linesAr){
				    		var index = mdAr.length, ylHas = false;
				    		for(var i=0; i<linesAr.length; i++){
               					var line = linesAr[i];
                				var sIndex = mdIndex.get(line.startNodeId), eIndex = mdIndex.get(line.endNodeId);
                				lines.push({ "source": sIndex , "target": eIndex, "relation": (line.name ? line.name : "依赖关系"), "data": line});
				    		}
				    	}
				    	me.json = {"nodes":nodes, "lines":lines};
				    	d3.select("#metamodel_relationDetailPanelDiv").html("");
        				d3_ShowDatas("metamodel_relationDetailPanelDiv", me.mmRelationshipDetailPanel.getWidth()-20,
        					me.mmRelationshipDetailPanel.getHeight()-30, me.json);
			        }
			    }
			});
	},
	/**
	 * 只选中一个单选按钮
	 */
	onlyCheckedOneRadio : function(a, b, c) {
		var me = this;
		me.mmRelationshipDetailPanel = me.getMmRelationshipDetailPanel();
		var radioGroupCmp = me.mmRelationshipDetailPanel.getRadioGroup();
		if(radioGroupCmp) {
			radioGroupCmp.items.items[a].setRawValue(false);
			radioGroupCmp.items.items[b].setRawValue(false);
			if(!radioGroupCmp.items.items[c].checked) {
				radioGroupCmp.items.items[c].setRawValue(true);
			}
		}
	},
	/**
	 * 从画布上通过右键上下文菜单删除一个未发布的元模型
	 */
	deleteMetaModel : function(id, name) {
		var me = this;
		var params = {id : id};
		Ext.Msg.confirm('提示', '您确定要删除'+name+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request('metamodel/delete.do', false, params, "",function(res){
					if(res) {
						if(res.resultCode == 1){
							Dep.framework.editor.util.Msg.success("删除成功！", "提示");
							me.refreshAllTreeByNodeId(id, true, true);
						}else {
							Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
							return false;
						}
					}
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 弹出上传图元文件的小弹窗
	 */
	showFileUploadWin : function() {
		var me = this;
		if(!me.fileUploadWindow) {
			me.fileUploadWindow = Ext.create('Dep.metamodel.modelmng.view.FileUploadWindow');
		}
		me.fileUploadWindow.down('form').getForm().reset();
		me.fileUploadWindow.show();
	},
	/**
	 * 执行图标文件上传操作
	 */
	executeImageUpload : function() {
		var me = this;
		var imageField = me.getMmImageField();//图元文件上传控件
		if(imageField) {
			me.imageName = imageField.getValue();
		}
		var form = me.fileUploadWindow.down('form').getForm();
        if(form.isValid()){
            form.submit({
                url: 'metamodel/image/upload.do',
                waitMsg: '正在上传图标文件...',
                method : 'POST',
                params : {
                },
                success: function(form, action) {
                    if(action) {
                		var resultCode = action.result.resultCode;
                		var resultText = action.result.resultText;
                		if(resultCode==1) {
                			Dep.framework.editor.util.Msg.success(resultText, '成功');
                		}
                	}
                    me.fileUploadWindow.hide();
                },
                failure: function(form, action) {
                	if(action) {//上传成功也走failure回调函数
                		var resultCode = action.result.resultCode;
                		var resultText = action.result.resultText;
                		if(resultCode==1) {
                			Dep.framework.editor.util.Msg.success('您的文件上传成功。', '成功');
                			if(!me.imageName) {
                				me.imageName = imageField.lastValue;
                			}
                		}else {
                			Dep.framework.editor.util.Msg.failed(resultText, '失败');
                		}
                	}
					me.fileUploadWindow.hide();
				}
            });
        }
	},
	/**
	 * 获取编辑一条组合关系的基本信息的弹窗界面
	 */
	getEditCompRelationWindow : function() {
		var me = this;
		if(!me.eidtCompRelationWin) {
			me.eidtCompRelationWin = Ext.create('Dep.metamodel.modelmng.view.EditCompRelationWindow');
		}
		return me.eidtCompRelationWin;
	},
	/**
	 * 获取编辑一条依赖关系的基本信息的弹窗界面
	 */
	getEditDependRelationWindow : function() {
		var me = this;
		if(!me.eidtDependRelationWin) {
			me.eidtDependRelationWin = Ext.create('Dep.metamodel.modelmng.view.EditDependRelationWindow');
		}
		return me.eidtDependRelationWin;
	},
	/**
	 * 获取所有元模型数据列表store
	 * @return {Ext.data.Store} allMetaModelListStore
	 */
	getAllMetaModelListStore : function() {
		var me = this;
		if(!me.allMetaModelListStore) {
			me.allMetaModelListStore = Ext.create('Dep.metamodel.modelmng.store.SelectingMetaModelListStore');
		}
		return me.allMetaModelListStore;
	},
	/**
	 * 弹出修改组合关系的弹窗
	 * @param {} model
	 */
	showEditCompRelationWin : function(model) {
		var me = this, form = null, fromMName = "", toMName = "";
		var allMetaModelListStore = me.getAllMetaModelListStore();
		if(!me.eidtCompRelationWin) {
			me.eidtCompRelationWin = me.getEditCompRelationWindow();
		}
		me.eidtCompRelationWin.show();
		allMetaModelListStore.load({
			callback : function() {
				var fromMm = allMetaModelListStore.findRecord("id", model.raw.fromMID);
				if(fromMm) {
					fromMName = fromMm.raw.name;
				}
				var toMm = allMetaModelListStore.findRecord("id", model.raw.toMID);
				if(toMm) {
					toMName = toMm.raw.name;
				}
				model.set("name", model.raw.name ? model.raw.name : "组合关系");
				model.set("fromMName", fromMName);
				model.set("toMName", toMName);
				form = me.eidtCompRelationWin.down('form');
				if(form && model) {
					form.loadRecord(model); //显示修改前所选的组合关系的旧数据
				}
			}
		});
		
		
	},
	/**
	 * 弹出修改依赖关系的弹窗
	 * @param {} model
	 */
	showEditDependRelationWin : function(model) {
		var me = this, form = null, fromMName = "", toMName = "";
		var allMetaModelListStore = me.getAllMetaModelListStore();
		if(!me.eidtDependRelationWin) {
			me.eidtDependRelationWin = me.getEditDependRelationWindow();
		}
		me.eidtDependRelationWin.show();
		allMetaModelListStore.load({
			callback : function() {
				var fromMm = allMetaModelListStore.findRecord("id", model.raw.fromMid);
				if(fromMm) {
					fromMName = fromMm.raw.name;
				}
				var toMm = allMetaModelListStore.findRecord("id", model.raw.toMid);
				if(toMm) {
					toMName = toMm.raw.name;
				}
				model.set("name", model.raw.name ? model.raw.name : "依赖关系");
				model.set("fromMName", fromMName);
				model.set("toMName", toMName);
				form = me.eidtDependRelationWin.down('form');
				if(form && model) {
					form.loadRecord(model); //显示修改前所选的依赖关系的旧数据
				}
			}
		});
		
	},
	/**
	 * 保存修改后的组合关系信息
	 */
	saveCompRelation : function() {
		var me = this;
		var form = me.eidtCompRelationWin.down('form');
		var data = form.getValues();
		var model = Ext.create('Dep.metamodel.modelmng.model.CompRelationModel', data);
		model.save({
			callback : function() {
				me.eidtCompRelationWin.hide();
				me.showCompositionRelationShips();
			}
		});
		
	},
	/**
	 * 保存修改后的依赖关系信息
	 */
	saveDependRelation : function() {
		var me = this;
		var form = me.eidtDependRelationWin.down('form');
		var data = form.getValues();
		var model = Ext.create('Dep.metamodel.modelmng.model.DependRelationModel', data);
		model.save({
			callback : function() {
				me.eidtDependRelationWin.hide();
				me.showDependRelationShips();
			}
		});
	},
	/**
	 * 从图上删除一条组合关系或依赖关系
	 */
	deleteRelationLine : function(id, name, type, fromMID) {
		var me = this, url = "";
		var params = {id : id};
		if(type == "composition") {
			url = 'metamodelcomp/delete.do';
		}else if(type == "dependency") {
			url = 'metamodeldepe/delete.do';
		}
		name = name ? name : "这条关系";
		Ext.Msg.confirm('提示', '您确定要删除'+name+'吗？', function(btn){
			if(btn=='yes') {
				Fn.Request(url, false, params, "", function(res){
					if(res) {
						if(res.resultCode == 1){
							Dep.framework.editor.util.Msg.success("删除成功！", "提示");
							if(type == "composition") {
								if(me.currentMmData) {
									me.showCompositionRelationShips();
								}
							}else if(type == "dependency") {
								if(me.currentMmData) {
									me.showDependRelationShips();
								}
							}
						}else {
							Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
							return false;
						}
					}
				}, function(){
					Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
				});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 刷新【继承】树形菜单上的单个节点
	 * @param {} node 当前节点
	 * @param {} parentNode 父节点
	 * @param {} isDel 是否是删除操作
	 */
	refreshInheritTreeNode : function(node, parentNode, isDel) {
		var me = this, url = "metamodelquery/findNodeModel.do";
		if(node.raw.nodeType == "inheritRoot"){
			url = "metamodelquery/findRootModel.do";
		}else {
			me.inheritTreeStore.getProxy().url = url;
			me.inheritTreeStore.getProxy().extraParams.id = parentNode ? parentNode.raw.id : node.raw.id;
		}
		me.inheritTreeStore.load({
			node : parentNode ? parentNode : node, 
			callback : function(records, operation, success){ 
				if(parentNode) {
					me.metaModelMngWin.getInheritPanel().expandPath(parentNode.getPath("id"), 'id');
				}
				if(isDel) {
					if(parentNode) {
						me.currentMmData = parentNode.firstChild ? parentNode.firstChild.raw : null;
						if(parentNode.firstChild) {
							var firstChild = parentNode.firstChild;
							me.metaModelMngWin.getInheritPanel().selectPath(firstChild.getPath("id"), 'id');
						}
					}
				}else {
					me.metaModelMngWin.getInheritPanel().selectPath(node.getPath("id"), 'id'); //选中节点
					var newNode = me.inheritTreeStore.getNodeById(node.raw.id);
					if(newNode) {
						me.currentMmData = newNode ? newNode.raw : parentNode.raw; 
					}
				}
				if(me.getCurrentCheckedRadio() == "0") {
					me.showInheritRelationShips();	
				}else if(me.getCurrentCheckedRadio() == "1") {
					me.showCompositionRelationShips();
				}else if(me.getCurrentCheckedRadio() == "2") {
					me.showDependRelationShips();
				}
			}
		});
	},
	/**
	 * 刷新【组合】树形菜单上的单个节点
	 * @param {} node 元模型节点
	 */
	refreshCompTreeNode : function(node, parentNode) {
		var me = this, url = "metamodelquery/findCompNodeModel.do";
		if(parentNode && parentNode.raw.nodeType == "mmModelNode") {
			url = "metamodelquery/findCompRootModel.do";
		} 
		me.compositionTreeStore.getProxy().url = url;
		me.compositionTreeStore.proxy.extraParams.id = parentNode ? parentNode.raw.id : node.raw.id;
		me.compositionTreeStore.load({
				node : parentNode ? parentNode : node, 
				callback : function(records, operation, success){ 
					if(parentNode) {
						me.metaModelMngWin.getCompositionPanel().selectPath(parentNode.getPath("id"), 'id');
					}
					me.metaModelMngWin.getCompositionPanel().selectPath(node.getPath("id"), 'id');
					var newNode = me.compositionTreeStore.getNodeById(node.raw.id);
					me.currentMmData = newNode ? newNode.raw : (parentNode.firstChild ? parentNode.firstChild.raw : null); 
					if(me.getCurrentCheckedRadio() == "0") {
						me.showInheritRelationShips();	 
					}else if(me.getCurrentCheckedRadio() == "1") {
						me.showCompositionRelationShips();
					}else if(me.getCurrentCheckedRadio() == "2") {
						me.showDependRelationShips();
					}
				}
		});
	},
	/**
	 * 刷新【用户】树形菜单上的单个节点
	 * @param {} node 当前节点
	 * @param {} parentNode 父节点
	 * @param {} isDel 是否是删除操作
	 */
	refreshUserTreeNode : function(node, parentNode, isDel) {
		var me = this, url = "metamodelfolder/getFolderTree.do";
		me.userFolderTreeStore.getProxy().url = url;
		me.userFolderTreeStore.proxy.extraParams.id = parentNode ? parentNode.raw.id : node.raw.id;
		me.userFolderTreeStore.load({
				node : parentNode ? parentNode : node, 
				callback : function(records, operation, success){ 
					if(node.raw.nodeType == "folderNode") {
						me.metaModelMngWin.getUserPanel().selectPath(node.getPath("id"), 'id');
					}
					if(isDel) {
						if(parentNode) {
							me.metaModelMngWin.getUserPanel().expandPath(parentNode.getPath("id"), 'id');
							me.currentMmData = parentNode.firstChild ? parentNode.firstChild.raw : null;
							if(parentNode.firstChild) {
								var firstChild = parentNode.firstChild;
								me.metaModelMngWin.getUserPanel().selectPath(firstChild.getPath("id"), 'id');
							}
							if(me.getCurrentCheckedRadio() == "0") {
								me.showInheritRelationShips();	
							}else if(me.getCurrentCheckedRadio() == "1") {
								me.showCompositionRelationShips();
							}else if(me.getCurrentCheckedRadio() == "2") {
								me.showDependRelationShips();
							}
						}
					}else if(node.raw.nodeType == "metaModelNode" && parentNode) {
						me.metaModelMngWin.getUserPanel().selectPath(parentNode.getPath("id"), 'id');
						me.userFolderTreeStore.getProxy().url = url;
						me.userFolderTreeStore.proxy.extraParams.id = node.raw.id;
						var newNode = me.userFolderTreeStore.getNodeById(node.raw.id);
						me.currentMmData = newNode ? newNode.raw : (parentNode.firstChild ? parentNode.firstChild.raw : null); 
						me.userFolderTreeStore.load({
								node : newNode ? newNode : parentNode, 
								callback : function(recds, oper, succ){
									if(parentNode) {
										me.metaModelMngWin.getUserPanel().selectPath(parentNode.getPath("id"), 'id');
									}
									if(newNode) {
										me.metaModelMngWin.getUserPanel().selectPath(newNode.getPath("id"), 'id');
									}
									if(me.getCurrentCheckedRadio() == "0") {
										me.showInheritRelationShips();	
									}else if(me.getCurrentCheckedRadio() == "1") {
										me.showCompositionRelationShips();
									}else if(me.getCurrentCheckedRadio() == "2") {
										me.showDependRelationShips();
									}
								}
						});
					}
				}
		});
	},
	/**
	 * 根据当前元模型节点的id刷新所有的树形菜单
	 * @param {string} id
	 * @param {boolean} flag 是否传递父节点 true:传递, false:不传
	 * @param {boolean} isDel 是否在删除元模型 true:是, false:不是
	 */
	refreshAllTreeByNodeId : function(id, flag, isDel) {
		var me = this;
		var inheritPanel = me.metaModelMngWin.getInheritPanel();//【继承】treepanel
		var compositionPanel = me.metaModelMngWin.getCompositionPanel();//【组合】treepanel
		var userPanel = me.metaModelMngWin.getUserPanel();//【依赖】treepanel
		
		if(inheritPanel.isVisible()) {
			var node = me.inheritTreeStore.getNodeById(id);
			if(!node) {
				var selections = inheritPanel.getSelectionModel().getSelection();
				node = selections[0];
				if(!node) {
					Dep.framework.editor.util.Msg.info("所选节点的数据在树形菜单上尚未加载，请先查询出所选节点！", "提示");
					return;
				}
			}
			if(flag) {
				me.refreshInheritTreeNode(node, node.parentNode, isDel);
			}else {
				me.refreshInheritTreeNode(node);
			}
		}else if(compositionPanel.isVisible()) {
			var node = me.compositionTreeStore.getNodeById(id);
			if(!node) {
				var selections = compositionPanel.getSelectionModel().getSelection();
				node = selections[0];
				if(!node) {
					Dep.framework.editor.util.Msg.info("所选节点的数据在树形菜单上尚未加载，请先查询出所选节点！", "提示");
					return;
				}
			}
			me.refreshCompTreeNode(node, node.parentNode, isDel);
		}else if(userPanel.isVisible()) {
			var node = me.userFolderTreeStore.getNodeById(id);
			if(!node) {
				var selections = userPanel.getSelectionModel().getSelection();
				node = selections[0];
				if(!node) {
					Dep.framework.editor.util.Msg.info("所选节点的数据在树形菜单上尚未加载，请先查询出所选节点！", "提示");
					return;
				}
			}
			me.refreshUserTreeNode(node, node.parentNode, isDel);
		}
	},
	/**
	 * 检查当前选中的单选按钮
	 */
	getCurrentCheckedRadio : function() {
		var me = this;
		me.mmRelationshipDetailPanel = me.getMmRelationshipDetailPanel();
		var radioGroupCmp = me.mmRelationshipDetailPanel.getRadioGroup();
		if(radioGroupCmp) {
			var radio0 = radioGroupCmp.items.items[0]
			var radio1 = radioGroupCmp.items.items[1]
			var radio2 = radioGroupCmp.items.items[2]
			if(radio0 && radio0.checked) {
				return "0";
			}
			if(radio1 && radio1.checked) {
				return "1";
			}
			if(radio2 && radio2.checked) {
				return "2";
			}
		}else {
			return "0";
		}
	}
	

});