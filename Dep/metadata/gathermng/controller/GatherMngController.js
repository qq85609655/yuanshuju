/**
 * 元数据采集管理控制器
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.controller.GatherMngController', {
	extend : 'Ext.app.Controller',
	/**
	 * 采集管理的弹窗界面
	 * @type {Ext.window.Window}
	 */
	window : null,
	/**
	 * 采集管理界面左侧树形菜单的panel
	 * @type {Ext.tree.Panel}
	 */
	westPanel : null,
	/**
	 * 适配器的store
	 * @type {Ext.data.TreeStore}
	 */
	adaptorStore : null,
	/**
	 * 树形菜单上的上下文菜单
	 * @type {Ext.menu.Menu}
	 */
	userContextMenu : null,
	
	refs: [{
	         ref: 'dataSourceName',//数据源名称
	         selector: 'textfield[cmpTag=datasourcename]'
   		 },{
	         ref: 'hangPoint',//DB数据源悬挂点
	         selector: 'treepicker[cmpTag=hangPoint]'
   		 },{
	         ref: 'driver',//驱动
	         selector: 'combobox[cmpTag=driver]'
   		 },{
   			 ref: 'url',//URL
	         selector: 'textfield[cmpTag=url]'
   		 },{
	         ref: 'hostAddress',//主机地址
	         selector: 'textfield[cmpTag=hostAddress]'
   		 },{
   			 ref: 'portNumber',//端口号
	         selector: 'textfield[cmpTag=portNumber]'
   		 },{
   			ref: 'databaseName',//数据库名
	         selector: 'textfield[cmpTag=databaseName]'
   		 },{
	         ref: 'username',//用户名
	         selector: 'textfield[cmpTag=username]'
   		 },{
	         ref: 'password',//密码
	         selector: 'textfield[cmpTag=password]'
   		 },{
	         ref: 'schema',//schema
	         selector: 'combobox[cmpTag=schema]'
   		 },{
	         ref: 'remark',//数据源描述
	         selector: 'textareafield[cmpTag=dsremark]'
   		 },{
	         ref: 'taskName',//采集任务名称
	         selector: 'textfield[cmpTag=taskname]'
   		 },{
	         ref: 'storageStrategy',//入库策略
	         selector: 'combobox[cmpTag=storagestrategy]'
   		 },{
	         ref: 'taskDataSource',//数据源
	         selector: 'textfield[cmpTag=taskdatasource]'
   		 },{
	         ref: 'taskRemark',//任务描述
	         selector: 'textareafield[cmpTag=taskremark]'
   		 },{
	         ref: 'xlsDsName',//Excel数据源名称
	         selector: 'textfield[cmpTag=xlsdsname]'
   		 },{
	         ref: 'xlsHangPoint',//Excel数据源悬挂点
	         selector: 'treepicker[cmpTag=xlshangPoint]'
   		 },{
	         ref: 'xlsDsRemark',//Excel数据源描述
	         selector: 'textareafield[cmpTag=xlsdsremark]'
   		 },{
	         ref: 'templateName',//模板管理的名称
	         selector: 'textfield[cmpTag=templatename]'
   		 },{
	         ref: 'excelFileField',//Excel文件上传的文件控件
	         selector: 'filefield[cmpTag=excelfilefield]'
   		 },{
	         ref: 'logResult',//采集日志
	         selector: 'textarea[cmpTag=logdetail]'
   		 },{
	         ref: 'resultNameField',//采集结果工具条名称文本框
	         selector: 'textfield[cmpTag=resultnametf]'
   		 },{
	         ref: 'resultMMCombo',//采集结果工具条元模型下拉框
	         selector: 'combo[cmpTag=resultmmcombo]'
   		 },{
	         ref: 'auditNameField',//元数据审核工具条名称输入框
	         selector: 'textfield[cmpTag=auditnametf]'
   		 },{
	         ref: 'auditMMCombo',//元数据审核工具条元模型下拉框
	         selector: 'combo[cmpTag=auditmmcombo]'
   		 },{
	         ref: 'auditDSCombo',//元数据审核工具条数据源下拉框
	         selector: 'combo[cmpTag=auditdscombo]'
   		 },{
	         ref: 'auditTaskCombo',//元数据审核工具条任务下拉框
	         selector: 'combo[cmpTag=audittaskcombo]'
   		 },{
	         ref: 'auditMDCombo',//审核元数据小弹窗的审核下拉框
	         selector: 'combo[cmpTag=auditmdidea]'
   		 }],
	init : function() {
		var me = this;
		me.createColumnLinker();
		me.initStore();
		me.initView();
		me.bindEvent();
		me.showWin();
		me.callParent();
	},
	/**
	 * 创建超链接列单元格的事件管理器
	 */
	createColumnLinker : function() {
		if(!Gather){
			Gather = {};
		}
		Gather.ColumnLinker = Ext.create('Gather.ColumnLinker');
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
		if(me.adaptorStore.getNodeById('1')) {
			me.adaptorStore.getNodeById('1').expand(
				false,
				function() {
					me.adaptorStore.getNodeById('excel').expand(false);
					me.adaptorStore.getNodeById('dbSchema').expand(false);
				},me
			);
		}
	},
	/**
	 * 创建stores
	 */
	initStore : function() {
		var me = this;
		//创建适配器树形菜单的store
		if(!me.adaptorStore) {
			me.adaptorStore = Ext.create('Dep.metadata.gathermng.store.AdaptorTreeStore');
		}
		//创建任务列表的store
		if(!me.taskListStore) {
			me.taskListStore = Ext.create('Dep.metadata.gathermng.store.TaskListStore');
		}
		//创建Excel采集模板列表的store
		if(!me.templateStore) {
			me.templateStore = Ext.create('Dep.metadata.gathermng.store.TemplateStore');
		}
		//创建任务执行情况列表的store
		if(!me.taskExecuteInfoStore) {
			me.taskExecuteInfoStore = Ext.create('Dep.metadata.gathermng.store.TaskExecuteInfoStore');
		}
		//采集配置（数据源）基本信息的store
		if(!me.dataSourceStore) {
			me.dataSourceStore = Ext.create('Dep.metadata.gathermng.store.DataSourceStore');
		}
		//采集结果基本信息的store
		if(!me.gatherResultStore) {
			me.gatherResultStore = Ext.create('Dep.metadata.gathermng.store.GatherResultStore');
		}
		//数据库驱动的下拉框的store
		if(!me.dbDriverStore) {
			me.dbDriverStore = Ext.create('Dep.metadata.gathermng.store.DatabaseDriverStore');
		}
		//数据源悬挂点下拉树的store,即元数据树结构
		if(!me.mdTreeStore) {
			me.mdTreeStore = Ext.create('Dep.metadata.metadatamng.store.MDTreeStore');
		}
		if(!me.mdTreeStoreExl) {
			me.mdTreeStoreExl = Ext.create('Dep.metadata.metadatamng.store.MDTreeStore');
		}
		//数据库Schema下拉框的store
		if(!me.schemaStore) {
			me.schemaStore = Ext.create('Dep.metadata.common.store.ComboStore', {
				url : 'gather/ds/getSchemas.do',
				autoLoad : false
			});
			me.schemaStore.on('beforeload', function() {
				if(me.getEditDataSourceWin()) {
					if(!me.checkDBParams())return false;
					var form = me.getEditDataSourceWin().down('form');
					var data = form.getValues();
					var dbsParam = {
						driver : data.driver,
						url : data.url,
						userName : data.username,
						password : data.pwd,
						hostAddress:data.hostAddress,
						portNumber:data.portNumber,
						databaseName:data.databaseName
					};
					Ext.apply(me.schemaStore.proxy.extraParams, dbsParam);
				}
			});
		}
		//数据入库策略的store
		if(!me.dbPolicyStore) {
			me.dbPolicyStore = Ext.create('Dep.metadata.gathermng.store.DatabasePolicyStore');
		}
		//元数据审核第一级列表的store
		if(!me.auditGridStore) {
			me.auditGridStore = Ext.create('Dep.metadata.gathermng.store.AuditFirstStore');
		}
		//采集结果审核下拉框的store
		if(!me.auditComboStore) {
			me.auditComboStore = Ext.create('Dep.metadata.gathermng.store.AuditStore');
		}
	},
	/**
	 * 弹出窗口
	 */
	initView : function() {
		var me = this;
		if(!me.westPanel) {
			me.westPanel = Ext.create('Dep.metadata.gathermng.view.GatherResourcePanel', {
				store : me.adaptorStore
			});
		}
		if(!me.window) {
			me.window = Ext.create('Dep.metadata.gathermng.view.GatherMngWindow', {
				westPanel : me.westPanel,
				taskListStore : me.taskListStore,
				dataSourceStore : me.dataSourceStore,
				taskExecuteInfoStore : me.taskExecuteInfoStore,
				gatherResultStore : me.gatherResultStore,
				auditStore : me.auditGridStore
			});
			var auditGrid = me.window.getAuditGrid();
			auditGrid.view.on('expandBody', function (rowNode, record, expandRow, eOpts) {  
		        me.displayInnerGrid(record.get('id'));  
		    });
		    auditGrid.view.on('collapsebody', function (rowNode, record, expandRow, eOpts) {  
	        	me.destroyInnerGrid(record);  
	    	}); 
		}
		if(!me.metaDataDetailWindow) {
			me.metaDataDetailWindow = Ext.create('Dep.metadata.gathermng.view.MetaDataDetailWindow');
		}
	},
	/**
	 * 点击某一行前面的展开按钮的响应函数
	 * @param {} renderId
	 */
	displayInnerGrid : function(renderId) {
		var me = this, auditInnerStore = {};
		//元数据审核列表里第二级列表的store,需每次都新建
		auditInnerStore = Ext.create('Dep.metadata.gathermng.store.AuditInnerStore');
		auditInnerStore.proxy.extraParams.id = renderId;
		auditInnerStore.load({
			callback : function(records, operation, success) {
				if(records.length == 0) {
					return false;
				}
				var innerGrid = me.window.getInnerGrid(auditInnerStore, renderId);
	    		innerGrid.renderId = renderId;
	    		innerGrid.view.on('expandBody', function (rowNode, record, expandRow, eOpts) {  
			        me.displayInnerGridB(record.get('id'), renderId);  
			    });
			    innerGrid.view.on('collapsebody', function (rowNode, record, expandRow, eOpts) {  
		        	me.destroyInnerGrid(record);  
		    	});
			}
		});
	},
	/**
	 * 点击第二级列表某一行前面的展开按钮的响应函数
	 * @param {} renderId
	 */
	displayInnerGridB : function(renderId, grandParentId) {
		var me = this, auditGrandStore = {};
		//元数据审核列表里第三级列表的store,同样需每次都新建
		auditGrandStore = Ext.create('Dep.metadata.gathermng.store.AuditGrandStore');
		auditGrandStore.proxy.extraParams.id = renderId;
		auditGrandStore.load({
			callback : function(records, operation, success) {
				if(records.length == 0) {
					return false;
				}
				var grandGrid = me.window.getGrandGrid(auditGrandStore, renderId, grandParentId);
	    		grandGrid.renderId = renderId;
			}
		});
	    
	},
	/**
	 * 点击某一行前面的折叠按钮的响应函数
	 * @param {} record
	 */
	destroyInnerGrid : function(record) {
	    var parent = document.getElementById(record.get('id'));  
	    var child = parent.firstChild;  
	    while (child) {
	        child.parentNode.removeChild(child);
        	child = child.nextSibling;  
	    } 	
	},
	/**
	 * 给下拉框、下拉列表树绑定store
	 */
	bindCmpStore : function() {
		var me = this;
		//给数据库驱动下拉框绑定store
		me.getDriver().bindStore(me.dbDriverStore);
		//给数据库Schema下拉框绑定store
		me.getSchema().bindStore(me.schemaStore);
	},
	/**
	 * 绑定事件
	 */
	bindEvent : function() {
		var me = this;
		me.control({
					'treepanel[cmpTag=adaptortree]' : {//采集适配器的treepanel
						itemclick : me.showSelectedGrid,
						itemcontextmenu : me.showContextmenu
					},
					'button[cmpTag=obtainschema]' : {//数据源信息【获取】按钮
						click : me.obtainSchema
					},
					'button[cmpTag=savedbsource]' : {//数据源信息【保存】按钮
						click : me.saveDataSource
					},
					'button[cmpTag=cancelsavedbs]' : {//数据源信息【取消】按钮
						click : me.cancelSaveDSour
					},
					'button[cmpTag=savetask]' : {//任务基本信息【保存】按钮
						click : me.saveTask
					},
					'button[cmpTag=cancelsavetask]' : {//任务基本信息【取消】按钮
						click : me.cancelSaveTask
					},
					'button[cmpTag=savexlsdbsource]' : {//Excel数据源信息【保存】按钮
						click : me.saveXlsDsInfo
					},
					'button[cmpTag=cancelxlssavedbs]' : {//Excel数据源信息【取消】按钮
						click : me.cancelSaveXlsDsInfo
					},
					'button[cmpTag=excelupload]' : {//Excel任务执行时文件上传的【上传】按钮
						click : me.executeExcelUpload
					},
					'textfield[cmpTag=templatename]' : {//模板管理工具条【名称】输入框
						change : me.searchTemplates
					},
					'button[cmpTag=confirmaudit]' : {//审核弹窗的【确定】按钮
						click : me.confirmAudit
					},
					'button[cmpTag=agreemetadata]' : {//元数据详情弹窗的【通过】按钮
						click : me.agreeMetadata
					},
					'button[cmpTag=rejectmetadata]' : {//元数据详情弹窗的【拒绝】按钮
						click : me.rejectMetadata
					},
					'button[cmpTag=resultsearchbtn]' : {//采集结果工具条的【查询】按钮
						click : me.searchMD
					},
					'button[cmpTag=resultauditbtn]' : {//采集结果工具条的【审核】按钮
						click : me.batchAuditMD
					},
					'button[cmpTag=auditsearchbtn2]' : {//元数据审核工具条的【查询】按钮
						click : me.searchMDForAudit
					},
					'button[cmpTag=auditauditbtn]' : {//元数据审核工具条的【审核】按钮
						click : me.batchAuditMD
					},
					'treepicker[cmpTag=hangPoint]' : {//DB采集数据源悬挂点下拉树
						select : me.selectHangPoint,
						focus : me.reloadMetaDataDB
					},
					'treepicker[cmpTag=xlshangPoint]' : {//Excel采集数据源悬挂点下拉树
						select : me.selectHangPoint,
						focus : me.reloadMetaDataExl
					},
					'window[cmpTag=gathermddetailwin]' : {//元数据详情窗口
						beforehide : me.beforeMdWinHide
					},
					'window[cmpTag=gatherauditwin]' : {//审核窗口
						beforehide : me.beforeMdWinHide
					},
					'combo[cmpTag=auditdscombo]' : {//审核窗口的数据源下拉框
						focus : me.reloadAuditDataSource,
						change : me.cleanTaskCombo
					},
					'combo[cmpTag=audittaskcombo]' : {//审核窗口的任务下拉框
						beforequery : me.beforeQueryTasks
					},
					scope : me
				});
				
				Gather.ColumnLinker.on('execute', me.executeTask, this);//执行
				Gather.ColumnLinker.on('executedetail', me.showExecuteDetail, this);//执行详情
				Gather.ColumnLinker.on('download', me.downloadTemplate, this);//模板下载
				Gather.ColumnLinker.on('resultdetail', me.showResultDetail, this);//查看采集结果详情操作
				Gather.ColumnLinker.on('showloginfo', me.showLogInfo, this);//查看日志
				Gather.ColumnLinker.on('detail', me.showMdDetailWin, this);//采集结果操作列的详情
				Gather.ColumnLinker.on('check', me.showAuditWinByResult, this);//采集结果操作列的审核
				Gather.ColumnLinker.on('mddetail', me.showMdDetailWin, this);//审核面板里的详情
				Gather.ColumnLinker.on('mdcheck', me.showAuditWinByAudit, this);//审核面板里的审核
	},
	/**
	 * 选中树形菜单里的一个菜单项的处理函数
	 * @param {Ext.tree.View} obj     用户视图的整个树形菜单.  
	 * @param {Ext.data.Store.ImplicitModel} record  所选item所对应的一条记录数据.
	 * @param {HTML标签} item    所点击的一个HTML元素.  
	 * @param {Number} index   该item在树形菜单从上到下所排列的索引.  
	 * @param {Ext.EventObject} e       本次事件所对应的事件对象.  
	 */
	showSelectedGrid : function(obj, record, item, index, e) {
		var me = this;
		var center = me.window.getCenterTabPanel();
		var configPanel = me.window.getConfigPanel();
		var baseInfoGrid = me.window.getBaseInfoGridPanel();
		var taskListGrid = me.window.getTaskGridPanel();
		var taskExeInfoGrid = me.window.getTaskExeInfoGrid();
		var checkPanel = me.window.getCheckPanel();
		if(!record) {
			configPanel.removeAll(false);
			return;
		}
		if(record.raw.nodeType=='adapterRoot' || record.raw.nodeType=='adapter') {
			return false;
		}
		if(record.raw.nodeType=='dataSource') {
			configPanel.removeAll(false);
			//采集配置基本信息列表加载数据,每次加载前都清空旧的数据
			baseInfoGrid = me.getBaseInfoGridWithNewRecord(baseInfoGrid, record);
			//任务列表加载数据，每次加载前需清空列表store中旧的数据
			taskListGrid = me.getTaskListGridWithNewRecords(taskListGrid, record);
			//相关列表放入采集配置面板
			configPanel.add(baseInfoGrid);
			configPanel.add(taskListGrid);
		}else if(record.raw.nodeType=='task') {
			configPanel.removeAll(false);
			baseInfoGrid = me.getBaseInfoGridWithNewRecord(baseInfoGrid, record.parentNode);
			taskListGrid = me.getTaskListGridWithNewRecord(taskListGrid, record);
			//相关列表放入采集配置面板
			configPanel.add(baseInfoGrid);
			configPanel.add(taskListGrid);
			configPanel.add(taskExeInfoGrid);
			me.showExecuteDetail(record.raw.id);
		}
		if(record.raw.nodeType=='auditRoot') {
			me.addPagingToolbar(me.window.getAuditGrid(), me.auditGridStore);
			if(!center.contains(checkPanel)) {
				center.add(checkPanel);
			}
			if(!checkPanel.isVisible()) {
				checkPanel.setVisible(true);
				center.setActiveTab(center.activeTab);
				me.getAuditNameField().reset();
				//绑定参数
				me.auditGridStore.on('beforeload', function() {
		       		var nameStr = me.getAuditNameField().getValue();
		       		var mmId = me.getAuditMMCombo().getValue();
		       		var dataSource = me.getAuditDSCombo().getValue();
		       		var jobId = me.getAuditTaskCombo().getValue();
					me.auditGridStore.getProxy().extraParams.mdNameLike = nameStr ? encodeURI(nameStr) : '';
					me.auditGridStore.getProxy().extraParams.mmId = mmId ? mmId : '';
					me.auditGridStore.getProxy().extraParams.dataSource = dataSource ? dataSource : '';
					me.auditGridStore.getProxy().extraParams.jobId = jobId ? jobId : '';
				})
			}
		}else {
			if(!center.contains(configPanel)) {
				center.add(configPanel);
			}
			if(!configPanel.isVisible()) {
				configPanel.setVisible(true);
				center.setActiveTab(center.activeTab);
			}
		}
		if(record.raw.nodeType=='dataSource') {
			taskListGrid.getSelectionModel().deselectAll();
			if(record.get('parentId')=='excel') {
				me.hideColumns(baseInfoGrid);
			}else {
				me.showColumns(baseInfoGrid);
			}
		}else if(record.raw.nodeType=='task') {
			taskListGrid.getSelectionModel().select(0);
			if(record.raw.jobType=='EXCELJOB') {
				me.hideColumns(baseInfoGrid);
			}else {
				me.showColumns(baseInfoGrid);
			}
		}
	},
	/**
	 * 隐藏url、用户名、密码和schema列
	 * @param {} baseInfoGrid
	 */
	hideColumns : function(baseInfoGrid) {
		baseInfoGrid.down('#dbUrl').hide();
		baseInfoGrid.down('#dbUsername').hide();
		baseInfoGrid.down('#dbPwd').hide();
		baseInfoGrid.down('#dbSchema').hide();
	},
	/**
	 * 显示url、用户名、密码和schema列
	 * @param {} baseInfoGrid
	 */
	showColumns : function(baseInfoGrid) {
		baseInfoGrid.down('#dbUrl').show();
		baseInfoGrid.down('#dbUsername').show();
		baseInfoGrid.down('#dbPwd').show();
		baseInfoGrid.down('#dbSchema').show();
	},
	/**
	 * 获取更新数据后的采集配置基本信息列表
	 * @param {Ext.grid.Panel} baseInfoGrid 基本信息列表
	 * @param {Ext.data.Store.ImplicitModel} record 数据源节点数据
	 * @return {Ext.grid.Panel} baseInfoGrid
	 */
	getBaseInfoGridWithNewRecord : function(baseInfoGrid, record) {
		var dbsModels = [], dbSourceModel = null;
		dbSourceModel = Ext.create('Dep.metadata.gathermng.model.DBSourceModel', record.raw);
		dbSourceModel.set('dbsName', record.raw.text);//采集配置名称
		dbSourceModel.set('dataPath', record.raw.dataPathName);//采集配置悬挂点
		dbSourceModel.set('url', record.raw.dbsParam.url);//用临时set字段，防止模型保存时多传字段
		dbSourceModel.set('username', record.raw.dbsParam.username);
		dbSourceModel.set('pwd', record.raw.dbsParam.pwd);
		dbSourceModel.set('schema', record.raw.dbsParam.schema);
		dbSourceModel.set('hostAddress', record.raw.dbsParam.host);
		dbSourceModel.set('portNumber', record.raw.dbsParam.port);
		dbSourceModel.set('databaseName', record.raw.dbsParam.sid);
		dbsModels.push(dbSourceModel);
		baseInfoGrid.getStore().loadRecords(dbsModels);//参数必须是Ext.data.Model[]型的数组
		baseInfoGrid.getStore().commitChanges();
		return baseInfoGrid;
	},
	/**
	 * 获取更新了数据之后的任务列表
	 * @param {Ext.grid.Panel} taskListGrid 任务列表
	 * @param {Ext.data.Store.ImplicitModel} record 数据源节点数据
	 * @return {Ext.grid.Panel} taskListGrid
	 */
	getTaskListGridWithNewRecords : function(taskListGrid, record) {
		var children = record.raw.children ? record.raw.children : [], taskModels = [];
		for(var i in children) {
			var nodeData = children[i];
			nodeData.jobName = children[i].text;
			nodeData.datasource = record.raw.text;//当前所点数据源节点的名称
			var taskModel = Ext.create('Dep.metadata.gathermng.model.TaskModel', nodeData);
			taskModels.push(taskModel);
		}
		taskListGrid.getStore().loadRecords(taskModels);
		taskListGrid.getStore().commitChanges();
		return taskListGrid;
	},
	/**
	 * 获取更新了数据之后的任务列表
	 * @param {Ext.grid.Panel} taskListGrid 任务列表
	 * @param {Ext.data.Store.ImplicitModel} record 一条采集任务的节点数据
	 * @return {Ext.grid.Panel} taskListGrid
	 */
	getTaskListGridWithNewRecord : function(taskListGrid, record) {
		var taskModels = [], taskModel = null;
		record.raw.jobName = record.raw.text;
		taskModel = Ext.create('Dep.metadata.gathermng.model.TaskModel', record.raw);
		taskModel.set('jobName', record.raw.text);
		taskModel.set('datasource', record.parentNode.raw.text);
		taskModels.push(taskModel);
		taskListGrid.getStore().loadRecords(taskModels);
		taskListGrid.getStore().commitChanges();
		return taskListGrid;
	},
	/**
	 * 展示用户视图树上的右键上下文菜单
	 * @param {} tree  用户视图的整个树形菜单.  类型: Ext.tree.View
	 * @param {} record  该item所对应的一条记录数据.  类型：Ext.data.Model
	 * @param {} item  所点击的一个HTML元素.  类型：HTML标签
	 * @param {} index 该item在树形菜单从上到下所排列的索引.  类型： Number
	 * @param {} event 本次事件所对应的事件对象.  类型： Ext.EventObject
	 */
	showContextmenu : function(tree, record, item, index, event) {
		var me = this;
		if(me.getUserContextMenu(record)) {
			me.getUserContextMenu(record).showAt(event.getPoint());
		}
	},
	/**
	 * 获取右键点击一个具体采集方式时的上下文菜单
	 * @param {Ext.data.Model} record  该item所对应的一条记录数据. 
	 * @return {}
	 */
	getUserContextMenu : function(record) {
		var me = this;
		if(!record) {
			return null;
		}
		if(record.raw.nodeType=='adapterRoot' || record.raw.nodeType=='auditRoot') {
			return null;
		}else if(record.raw.nodeType=='adapter') {
			if(record.raw.id=='excel') {
				me.userContextMenu = me.getExcelGatherContextMenu(record);
			}else if(record.raw.id=='dbSchema') {
				me.userContextMenu = me.getDbGatherContextMenu(record);
			}
		}else if(record.raw.nodeType=='dataSource') {
			if(record.raw.parentId=='excel') {
				me.userContextMenu = me.getExcelGatherConfigContextMenu(record);
			}else if(record.raw.parentId=='dbSchema') {
				me.userContextMenu = me.getDBGatherConfigContextMenu(record);
			}
		}else if(record.raw.nodeType=='task'){
			me.userContextMenu = me.getGatherTaskContextMenu(record);
		}else {
			return null;
		}
		return me.userContextMenu;
	},
	/**
	 * 获取DB采集上的上下文菜单
	 * @return {Ext.menu.Menu}
	 */
	getDbGatherContextMenu : function(record) {
		var me = this;
		return new Ext.menu.Menu({
				items : [{
							text : "添加采集配置",
							iconCls : 'leaf',
							handler : function() {
								me.showEditDataSourceWin();
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}]
			});
	},
	/**
	 * 获取Excel采集上的上下文菜单
	 * @param {Ext.menu.Menu} record
	 */
	getExcelGatherContextMenu : function(record) {
		var me = this;
		return new Ext.menu.Menu({
				items : [{
							text : "添加采集配置",
							iconCls : 'leaf',
							handler : function() {
								me.showEditExcelDataSourceWin();
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}, {
							text : "模板管理",
							iconCls : 'leaf',
							handler : function() {
								me.showTemplateMngWin();
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/excel_template.png'
						}]
				});
	},
	/**
	 * 获取DB采集方式数据源上的上下文菜单
	 * @param {Ext.menu.Menu} object
	 */
	getDBGatherConfigContextMenu : function(record) {
		var me = this;
		return new Ext.menu.Menu({
				items : [{
							text : "添加任务",
							iconCls : 'leaf',
							handler : function() {
								me.showEditTaskInfoWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}, {
							text : "修改采集配置",
							iconCls : 'leaf',
							handler : function() {
								me.showEditDataSourceWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/edit.png'
						}, {
							text : "删除采集配置",
							iconCls : 'leaf',
							handler : function() {
								me.deleteDataSource(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/del.png'
						}]
			});
	},
	/**
	 * 获取Excel采集方式下采集配置上的上下文菜单
	 * @param {Ext.menu.Menu} object
	 */
	getExcelGatherConfigContextMenu : function(record) {
		var me = this;
		return new Ext.menu.Menu({
				items : [{
							text : "添加任务",
							iconCls : 'leaf',
							handler : function() {
								me.showEditTaskInfoWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/add.png'
						}, {
							text : "修改采集配置",
							iconCls : 'leaf',
							handler : function() {
								me.showEditExcelDataSourceWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/edit.png'
						}, {
							text : "删除采集配置",
							iconCls : 'leaf',
							handler : function() {
								me.deleteDataSource(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/del.png'
						}]
			});
	},
	/**
	 * 获取采集任务上的上下文菜单
	 * @return {Ext.menu.Menu} object
	 */
	getGatherTaskContextMenu : function(record) {
		var me = this;
		return new Ext.menu.Menu({
				items : [{
							text : "修改任务",
							iconCls : 'leaf',
							handler : function() {
								me.showEditTaskInfoWin(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/edit.png'
						}, {
							text : "删除任务",
							iconCls : 'leaf',
							handler : function() {
								me.deleteTask(record);
								me.userContextMenu = null;
							},
							icon : 'Dep/metadata/resource/img/del.png'
						}]
			});
	},
	/**
	 * 获取DB采集方式数据源基本信息的编辑窗口
	 * @return {Ext.window.Window}
	 */
	getEditDataSourceWin : function() {
		var me = this;
		if(!me.editDataSourceWin) {
			me.editDataSourceWin = Ext.create('Dep.metadata.gathermng.view.DBSourceInfWindow', {
				mdTreeStore : me.mdTreeStore
			});
		}
		return me.editDataSourceWin;
	},
	/**
	 * 获取Excel采集方式数据源基本信息的编辑窗口
	 * @return {Ext.window.Window}
	 */
	getEditXlsDsInfoWin : function() {
		var me = this;
		if(!me.editXlsDsInfoWin) {
			me.editXlsDsInfoWin = Ext.create('Dep.metadata.gathermng.view.ExcelDsInfoWindow', {
				mdTreeStore : me.mdTreeStoreExl
			});
		}
		return me.editXlsDsInfoWin;
	},
	/**
	 * 弹出编辑DB采集数据源基本信息的窗口
	 * @param {Ext.data.Model} record 该item所对应的一条记录数据.
	 */
	showEditDataSourceWin : function(record) {
		var me = this;
		var defaultUrl = 'jdbc:oracle:thin:@192.168.200.76:1521:orcl';
		var editDataSourceWin = me.getEditDataSourceWin();
		me.cleanDataSourceForm();
		me.bindCmpStore();
		me.getUrl().setValue(defaultUrl);//给url设置示例值
		if(record && record.raw.nodeType=='dataSource') {//修改DB采集配置
			me.editDataSourceWin.record = record;
			me.editDataSourceWin.idAdd = false;
			me.getDataSourceName().setValue(record.raw.text);
			me.getHangPoint().setRawValue(record.raw.dataPathName);
			me.getDriver().setValue(record.raw.dbsParam.driver);
			me.getUrl().setValue(record.raw.dbsParam.url);
			me.getUsername().setValue(record.raw.dbsParam.username);
			me.getPassword().setValue(record.raw.dbsParam.pwd);
			me.getSchema().setValue(record.raw.dbsParam.schema);
			me.getHostAddress().setValue(record.raw.dbsParam.host);
			me.getPortNumber().setValue(record.raw.dbsParam.port);
			me.getDatabaseName().setValue(record.raw.dbsParam.sid);
			me.getRemark().setValue(record.raw.remark);
		}
		editDataSourceWin.show();
		if(navigator.userAgent.indexOf("Chrome")!=-1) {
			me.getRemark().setWidth(484);
		}
	},
	/**
	 * 弹出编辑Excel采集配置基本信息的窗口
	 * @param {Ext.data.Model} record 该item所对应的一条记录数据.
	 */
	showEditExcelDataSourceWin : function(record) {
		var me = this;
		var editXlsDsInfoWin = me.getEditXlsDsInfoWin();
		me.cleanExcelForm();
		if(record && record.raw.nodeType=='dataSource') {//修改excel采集配置
			me.editXlsDsInfoWin.record = record;
			me.editXlsDsInfoWin.idAdd = false;
			me.getXlsDsName().setValue(record.raw.text);
			me.getXlsHangPoint().setRawValue(record.raw.dataPathName);
			me.editXlsDsInfoWin.dataPath = record.raw.dataPath;
			me.getXlsDsRemark().setValue(record.raw.remark);
		}
		editXlsDsInfoWin.show();
		if(navigator.userAgent.indexOf("Chrome")!=-1) {
			me.getXlsDsRemark().setWidth(484);
		}
	},
	/**
	 * 清空数据源基本信息表单里的数据
	 */
	cleanDataSourceForm : function() {
		var me = this;
		me.editDataSourceWin.idAdd = true;
		me.getEditDataSourceWin().down('form').getForm().reset();
	},
	/**
	 * 清空Excel采集数据源基本信息表单里的数据
	 */
	cleanExcelForm : function() {
		var me = this;
		me.editXlsDsInfoWin.idAdd = true;
		me.getEditXlsDsInfoWin().down('form').getForm().reset();
	},
	/**
	 * 向后台提交数据，保存数据源信息
	 */
	saveDataSource : function() {
		var me = this;
		var node = me.adaptorStore.getNodeById('dbSchema');
		var form = me.getEditDataSourceWin().down('form');
		if(!form.isValid()) {
			Dep.framework.editor.util.Msg.info("有数据不符合要求，请检查表单数据。", "提示");
			return;
		}
		var data = form.getValues();
		var dbsParam = {
			driver : data.driver,
			url : data.url,
			username : data.username,
			pwd : data.pwd,
			schema : data.schema,
			host:data.hostAddress,
			port:data.portNumber,
			sid:data.databaseName
		};
		var model = Ext.create('Dep.metadata.gathermng.model.DBSourceModel', data);
		model.set('adapter', 'dbSchema');
		model.set('dbsParam', dbsParam);
		if(me.editDataSourceWin.idAdd) {
			model.save({callback : function() {
				model.set('id', model.proxy.reader.jsonData.result);
				me.refreshAfterSaveDS(node, model);
			}});
		}else {
			var val = '';
			var record = me.editDataSourceWin.record;
			model.set('id', record ? record.get('id') : '');
			if(me.getHangPoint().getRawValue()==record.raw.dataPathName) {
				val = record.raw.dataPath;
			}else {
				val = me.getHangPoint().getValue();
			}
			model.set('dataPath', val);
			model.save({callback : function() {
				me.refreshAfterSaveDS(node, model);
			}});
		}
		me.getEditDataSourceWin().hide();
	},
	/**
	 * 取消编辑数据源信息
	 */
	cancelSaveDSour : function() {
		var me = this;
		me.getEditDataSourceWin().hide();
	},
	/**
	 * 弹出模板管理的弹窗
	 */
	showTemplateMngWin : function() {
		var me = this;
		me.templateStore.load();
		me.getTemplateMngWin().show();
		me.getTemplateName().reset();
		me.getTemplateMngWin().getTemplateListGrid().getSelectionModel().deselectAll();
	},
	/**
	 * 获取模板管理的弹窗
	 * @return {Ext.window.Window}
	 */
	getTemplateMngWin : function() {
		var me = this;
		if(!me.templateMngWin) {
			me.templateMngWin = Ext.create('Dep.metadata.gathermng.view.TemplateMngWindow', {
				store : me.templateStore
			});
		}
		return me.templateMngWin;
	},
	/**
	 * 弹出编辑采集任务基本信息的窗口
	 * @param {Ext.data.Model} record 该item所对应的一条记录数据.
	 */
	showEditTaskInfoWin : function(record) {
		var me = this;
		var taskBaseInfoWindow = me.getEditTaskInfoWin();
		me.cleanTaskForm();
		if(record.raw.nodeType=='dataSource') {
			me.getTaskDataSource().setValue(record.raw.text);
			me.taskBaseInfoWindow.datasource = record.raw.id;
		}
		if(record.raw.nodeType=='task') {//若节点类型是'task',说明是修改任务操作
			me.taskBaseInfoWindow.isAdd = false;
			me.taskBaseInfoWindow.record = record;
			me.taskBaseInfoWindow.datasource = record.raw.parentId;
			me.getTaskName().setValue(record.raw.text);
			me.getStorageStrategy().setValue(record.raw.dbpolicy);
			me.getTaskDataSource().setValue(record.parentNode.raw.text);
			me.getTaskRemark().setValue(record.raw.remark);
		}
		taskBaseInfoWindow.show();
	},
	/**
	 * 获取编辑采集任务基本信息的窗口
	 * @return {Ext.window.Window}
	 */
	getEditTaskInfoWin : function() {
		var me = this;
		if(!me.taskBaseInfoWindow) {
			me.taskBaseInfoWindow = Ext.create('Dep.metadata.gathermng.view.TaskBaseInfoWindow');
		}
		me.getStorageStrategy().bindStore(me.dbPolicyStore);
		return me.taskBaseInfoWindow;
	},
	/**
	 * 清空任务信息表单里的数据
	 */
	cleanTaskForm : function() {
		var me = this;
		me.taskBaseInfoWindow.isAdd = true;
		me.getEditTaskInfoWin().down('form').getForm().reset();
	},
	/**
	 * 向后台提交数据，保存任务基本信息
	 */
	saveTask : function() {
		var me = this;
		var form = me.getEditTaskInfoWin().down('form');
		if(!form.isValid()) {
			Dep.framework.editor.util.Msg.info("有数据不符合要求，请检查表单数据。", "提示");
			return;
		}
		var data = form.getValues();
		data.datasource = me.taskBaseInfoWindow.datasource;
		var model = Ext.create('Dep.metadata.gathermng.model.TaskModel', data);
		var node = me.adaptorStore.getNodeById(data.datasource);
		var adapterNode = node.parentNode;
		if(adapterNode.raw.id=='excel') {
			model.set('jobType', 'EXCELJOB');
		}else if(adapterNode.raw.id=='dbSchema') {
			model.set('jobType', 'DBJOB');
		}
		if(me.taskBaseInfoWindow.isAdd) {
			model.save({callback : function(m, o, s) {
				model.set('id', m.proxy.reader.jsonData.result.result);
				me.refreshAfterSaveTask(node.parentNode, model);
			}});
		}else {
			var record = me.taskBaseInfoWindow.record;
			model.set('id', record ? record.get('id') : '');
			model.save({callback : function() {
				me.refreshAfterSaveTask(node.parentNode, model);
			}});
		}
		me.getEditTaskInfoWin().hide();
	},
	/**
	 * 取消编辑任务基本信息
	 */
	cancelSaveTask : function() {
		var me = this;
		me.getEditTaskInfoWin().hide();
	},
	/**
	 * 获取数据库schema
	 */
	obtainSchema : function() {
		var me = this;
		if(!me.checkDBParams()) {
			return;
		}
		me.getSchema().getStore().load({
			callback: function(records, operation, success) {
		        if(success) {
//		        	Dep.framework.editor.util.Msg.success('获取数据库schema成功！', '成功');
		        	var Notice=operation.response.responseText;
		        	var res = Ext.JSON.decode(Notice);
		        	Dep.framework.editor.util.Msg.success(res.resultText, '提示');
		        }
		    }	
		});
	},
	/**
	 * 抽取数据库Schema之前检查参数是否完整
	 */
	checkDBParams : function() {
		var me = this;
		if(me.getEditDataSourceWin()) {
			var driver = me.getDriver().getValue();
			var url = me.getUrl().getValue();
			var username = me.getUsername().getValue();
			var password = me.getPassword().getValue();
			var hostAddress=me.getHostAddress().getValue();
			var portNumber=me.getPortNumber().getValue();
			var databaseName=me.getDatabaseName().getValue();
			if(!driver || !url || !username || !password|| !hostAddress || !portNumber || !databaseName) {
				Dep.framework.editor.util.Msg.info("驱动、URL、用户名或密码有数据为空，请检查表单数据。", "提示");
				return false;
			}else {
				return true;
			}
		}
	},
	/**
	 * 保存Excel采集数据源信息
	 */
	saveXlsDsInfo : function() {
		var me = this;
		var node = me.adaptorStore.getNodeById('excel');
		var form = me.getEditXlsDsInfoWin().down('form');
		if(!form.isValid()) {
			Dep.framework.editor.util.Msg.info("有数据不符合要求，请检查表单数据。", "提示");
			return;
		}
		var data = form.getValues();
		var model = Ext.create('Dep.metadata.gathermng.model.DBSourceModel', data);
		model.set('adapter', 'excel');
		model.set('dbsParam', {});
		if(me.editXlsDsInfoWin.idAdd) {
			model.save({callback : function() {
				model.set('id', model.proxy.reader.jsonData.result);
				me.refreshAfterSaveDS(node, model);//参数node是适配器节点,m是添加的数据源模型数据
			}});
		}else {
			var val = '';
			var record = me.editXlsDsInfoWin.record;
			model.set('id', record ? record.get('id') : '');
			if(me.getXlsHangPoint().getRawValue()==record.raw.dataPathName) {
				val = record.raw.dataPath;
			}else {
				val = me.getXlsHangPoint().getValue();
			}
			model.set('dataPath', val);
			model.save({callback : function() {
				me.refreshAfterSaveDS(node, model);
			}});
		}
		me.getEditXlsDsInfoWin().hide();
	},
	/**
	 * 添加或修改Excel数据源或DB数据源之后的界面刷新
	 * @param {} node 适配器节点数据
	 * @param {} model 向后台保存时的数据源model
	 */
	refreshAfterSaveDS : function(node, model) {
		var me = this, url = 'gather/findByAdapterId.do';
		me.adaptorStore.getProxy().url = url;
		me.adaptorStore.proxy.extraParams.id = node.raw.id;//适配器节点id
		me.adaptorStore.load({
				node : node, //刷新适配器节点 
				callback : function(records, operation, success){
					var id = model.get('id');
					var selectNode = me.adaptorStore.getNodeById(id);
					if(selectNode) {
						me.window.westPanel.selectPath(selectNode.getPath('id'), 'id');
						me.showSelectedGrid(null, selectNode);//操作的数据源节点
					}
				}
		});	
	},
	/**
	 * 添加或修改采集任务之后的界面刷新
	 * @param {} node 适配器节点数据
	 * @param {} model 向后台保存成功后的采集任务model
	 */
	refreshAfterSaveTask : function(node, model) {
		var me = this, url = 'gather/findByAdapterId.do';
		me.adaptorStore.getProxy().url = url;
		me.adaptorStore.proxy.extraParams.id = node.raw.id;//适配器节点id
		me.adaptorStore.load({
				node : node, //刷新适配器节点 
				callback : function(records, operation, success){
					var id = model.get('id');
					var selectNode = me.adaptorStore.getNodeById(id);
					if(selectNode) {
						me.window.westPanel.selectPath(selectNode.getPath('id'), 'id');
						me.showSelectedGrid(null, selectNode.parentNode);//任务节点的父节点
					}
				}
		});	
	},
	/**
	 * 取消保存Excel采集数据源信息
	 */
	cancelSaveXlsDsInfo : function() {
		var me = this;
		me.getEditXlsDsInfoWin().hide();
	},
	/**
	 * 执行选中的一个任务
	 */
	executeTask : function(id) {
		var me = this;
		var store = me.window.getTaskGridPanel().getStore();
		var record = store.findRecord('id', id);
		if(record.raw.jobType=='EXCELJOB') {
			me.getFileUploadWindow().down('form').getForm().reset();
			me.getFileUploadWindow().show();
			me.fileUploadWindow.jobId = id;
		}else if(record.raw.jobType=='DBJOB') {
			var params = {
				id : id
			};
			Ext.Msg.confirm('提示', '您确定要立即执行'+record.raw.jobName+'吗？', function(btn){
				if(btn=='yes') {
					Ext.example.msg("提示",record.raw.jobName+"已经加入任务执行队列。");
					Fn.Request("gather/task/execute.do", true, params, "");
				}else {
					return false;
				}
			}, this);
		}
	},
	/**
	 * 获取文件上传的弹窗
	 * @return fileUploadWindow
	 */
	getFileUploadWindow : function() {
		var me = this;
		if(!me.fileUploadWindow) {
			me.fileUploadWindow = Ext.create('Dep.metadata.gathermng.view.FileUploadWindow');
		}
		return me.fileUploadWindow;
	},
	/**
	 * 执行Excel文件上传操作
	 */
	executeExcelUpload : function() {
		var me = this;
		var excelFile = me.getExcelFileField();
		var form = me.fileUploadWindow.down('form').getForm();
		var jobId = me.fileUploadWindow.jobId;
        if(form.isValid()){
            form.submit({
                url: 'gather/excel/import.do',
                waitMsg: '正在上传文件...',
                method : 'POST',
                params : {
            		jobId : jobId
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
                	if(action) {
                		var resultCode = action.result.resultCode;
                		var resultText = action.result.resultText;
                		if(resultCode==1) {
                			Dep.framework.editor.util.Msg.success('您的文件上传成功。', '成功');
                			Fn.Request("gather/task/execute.do", true, {id : jobId}, "");
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
	 * 显示执行情况列表，展示任务各个批次执行的详细情况
	 * @param {} id 所选任务的id
	 */
	showExecuteDetail : function(id) {
		var me = this;
		var taskExeInfoGrid = me.window.getTaskExeInfoGrid();
		var taskRecord = me.window.taskListGrid.getStore().getById(id);
		taskExeInfoGrid.getStore().getProxy().extraParams.id = id;//任务id
		taskExeInfoGrid.getStore().load({
		    scope : me,
		    callback : function(records, operation, success) {
		    	for(var i in records) {
		    		records[i].set('jobName', taskRecord.get('jobName'));
		    		records[i].set('dbsname', taskRecord.get('datasource'));
		    	}
				taskExeInfoGrid.getStore().loadRecords(records);
				taskExeInfoGrid.getStore().commitChanges();
				
		    }
		});
		me.window.addTaskExeInfoGrid();
	},
	/**
	 * 根据名称查询Excel采集模板
	 */
	searchTemplates : function(obj, newValue, oldValue, eOpts) {
		var me = this;
		//前台过滤
		me.templateStore.clearFilter(true);
		me.templateStore.filterBy(function(record, id) {
					var text = record.get("name");
					return (text.indexOf(newValue) != -1);
				});
	},
	/**
	 * 下载模板
	 */
	downloadTemplate : function(id) {
		var me = this;
		var store = me.templateMngWin.getTemplateListGrid().getStore();
		var record = store.findRecord('id', id);
		var basePath = me.getBasePath();
		var relativePath = record.get('filepath');
		//跳转到下载页面
		window.location.href = basePath+relativePath;
			
	},
	/**
	 * 获取系统部署的跟路径
	 * @return {string} basePath 如："http://localhost:8080/dep-metadata-core-webapp/"
	 */
	getBasePath : function (){
		var obj = window.location;
		var contextPath = obj.pathname.split("/")[1];
		var basePath=obj.protocol+"//"+obj.host+"/"+contextPath+"/";
		return basePath;
	}, 
	/**
	 * 删除一个采集配置数据源
	 * @param {} record 
	 */
	deleteDataSource : function(record) {
		var me = this;
		me.confirmDeleteNode(record, 'gather/ds/delete.do');
	},
	/**
	 * 删除一个采集任务
	 * @param {} record 
	 */
	deleteTask : function(record) {
		var me = this;
		me.confirmDeleteNode(record, 'gather/task/delete.do');
	},
	/**
	 * 显示采集结果列表
	 * @param {} id
	 */
	showResultDetail : function(id) {
		var me = this;
		var taskExeInfoGrid = me.window.getTaskExeInfoGrid();
		var taskExeInfoStore = taskExeInfoGrid.getStore();
		var taskExeInfoRecord = taskExeInfoStore.findRecord('id', id);
		var jobId = taskExeInfoRecord.get('jobId');
		var jobNode = me.adaptorStore.getNodeById(jobId);
		var dataPath = jobNode.parentNode.raw.dataPath;
		var gatherResultGrid = me.window.getGatherResultGrid();
		var gatherResultModels = [], gatherResultModel = null;
		me.gatherResultStore = gatherResultGrid.getStore();
		me.addPagingToolbar(gatherResultGrid, me.gatherResultStore);
		if(me.window.getConfigPanel().isVisible()&&me.window.getBaseInfoGridPanel().isVisible()&&
    		me.window.getTaskGridPanel().isVisible()&&me.window.getTaskExeInfoGrid().isVisible()) {
    		var cHeight = me.window.getConfigPanel().getHeight();
    		var bHeight = me.window.getBaseInfoGridPanel().getHeight();
    		var tHeight = me.window.getTaskGridPanel().getHeight();
    		var eHeight = me.window.getTaskExeInfoGrid().getHeight();
    		var rHeight = cHeight-bHeight-tHeight-eHeight-30;
        	gatherResultGrid.maxHeight = rHeight;
        	gatherResultGrid.setSize('100%', rHeight);
    	}
		me.window.addGatherResultGrid(gatherResultGrid);
		//绑定参数
		me.gatherResultStore.on('beforeload', function() {
	        me.gatherResultStore.getProxy().extraParams.id = id;
	        var nameStr = me.getResultNameField().getValue();
	        var mmId = me.getResultMMCombo().getValue();
			me.gatherResultStore.getProxy().extraParams.mdNameLike = nameStr ? encodeURI(nameStr) : '';
			me.gatherResultStore.getProxy().extraParams.mmId = mmId ? mmId : '';
			me.gatherResultStore.getProxy().extraParams.dataPath = dataPath ? dataPath : '';
		})
		me.gatherResultStore.load({
		    scope : me,
		    callback : function(records, operation, success) {
				me.gatherResultStore.loadRecords(records);
				me.gatherResultStore.commitChanges();
		    }
		});
	},
	/**
	 * 给grid列表底部添加分页条
	 * @param {Ext.grid.Panel} grid 需要加分页条的gridpanel
	 * @param {Ext.data.Store} store 需要分页的grid绑定的store
	 */
	addPagingToolbar : function(grid, store) {
		var me = this;
		var items = grid.getDockedItems('pagingtoolbar', false);
		if(items.length==0) {
			grid.addDocked({  
	            xtype: 'pagingtoolbar',  
	            store: store,   //GridPanel中使用的数据  
	            dock: 'bottom',  
	            displayInfo: true,  
	            emptyMsg: "没有数据",  
	            height: 30,
	            beforePageText: '第',
	            afterPageText: '页，共{0}页',
	            firstText: '第一页',
	            lastText: '最后一页',
	            prevText: '上一页',
	            nextText: '下一页',
	            refreshText: '刷新',
	            displayMsg: "显示从第{0}条数据到第{1}条数据，共{2}条数据"
	        });
		}
	},
	/**
	 * 弹出查看日志的窗口，逐行显示日志信息
	 * @param {string} id 所选任务执行情况的批次id
	 */
	showLogInfo : function(id) {
		var me = this;
		var record = me.window.getTaskExeInfoGrid().getStore().getById(id);
		if(!me.logWin) {
			me.logWin = Ext.create('Dep.metadata.gathermng.view.LogDetailWindow');
		}
		me.getLogResult().setValue(record.raw.logResult);
		me.logWin.show();
	},
	/**
	 * 弹出元数据审核面板或采集结果面板的元数据详情窗口
	 * @param {string} id 所选一条未审核的元数据id
	 */
	showMdDetailWin : function(id) {
		var me = this, params = {id : id}, record = null;
		var result = Fn.Request("gather/getMDById.do", false, params, "");
		if(result && result.result) {
			record = Ext.create('Dep.metadata.gathermng.model.GatherResultModel', result.result);
			me.metaDataDetailWindow.setValues(record);
			me.metaDataDetailWindow.show();
			me.metaDataDetailWindow.ids = [{id : id}];
		}
	},
	/**
	 * 审核某一批次采集结果的元数据
	 * @param {string} id 所选一条未审核的元数据id
	 */
	showAuditWinByResult : function(id) {
		var me = this, ids = [];
		ids.push({id : id});
		me.showBatchAuditMetaDataWin(ids);
	},
	/**
	 * 从元数据审核面板弹出的审核窗口
	 * @param {string} id 所选一条未审核的元数据id
	 */
	showAuditWinByAudit : function(id) {
		var me = this, ids = [], params = {id : id}, idObj = {};
		//去临时表里获取该id对应的元数据信息
		var result = Fn.Request("gather/getMDById.do", false, params, "");
		if(result && result.result) {
			var parentcode = result.result.parentcode;
			var parentid = result.result.parentid;
			if(parentcode) {
				var rel = {}, mdlist = null;
				rel = Fn.Request("gather/getMDByCode.do", false, {code : parentcode}, "");
				mdlist = rel.result;
				if(mdlist && mdlist.length > 0) {
					idObj = {
						id : id
					};
				}else {
					rel = Fn.Request("gather/getMDByCodeImp.do", false, {code : parentcode}, ""); 
					mdlist = rel.result;
					if(mdlist && mdlist.length > 0) {
						idObj = {
							id : mdlist[0].id,
							children : [{id : id}]
						};
					}
				}
				
				
			}else {
				idObj = {id : id};
			}
		}
		ids.push(idObj);
		me.showBatchAuditMetaDataWin(ids);
		delete mdlist;
		delete rel;
		ids = [];
	},
	/**
	 * 采集结果元数据审核弹窗的确定按钮响应操作
	 */
	confirmAudit : function() {
		var me = this, grid = null;
		var form = me.auditWin.down('form').getForm();
		var data = form.getValues();
		if(!form.isValid()) {
			Dep.framework.editor.util.Msg.info("有数据不符合要求，请检查表单数据。", "提示");
			return;
		}
		if(me.auditWin.idObjArry) {
			var params = {
				flag : data.flag,
				remark : data.remark,
				ids : me.auditWin.idObjArry
			}
			me.batchAuditAjaxRequest(params);
		}
	},
	/**
	 * 同意通过审核
	 */
	agreeMetadata : function() {
		var me = this;
		var params = {
			flag : true,//通过
			ids : me.metaDataDetailWindow.ids,
			remark : ''
		};
		me.batchAuditAjaxRequest(params);
	},
	/**
	 * 拒绝通过审核
	 */
	rejectMetadata : function() {
		var me = this;
		var params = {
			flag : false,//拒绝
			ids : me.metaDataDetailWindow.ids,
			remark : ''
		};
		me.batchAuditAjaxRequest(params);
	},
	/**
	 * 批量审核的Ajax请求
	 */
	batchAuditAjaxRequest : function(obj) {
		var me = this;
		var url = "gather/batchAuditingMD.do";
		var dataObject = {batchAuditData : obj};
		Ext.Ajax.request({
			url : url,
			jsonData : Ext.JSON.encode(dataObject),//Java控制层用@RequestBody来接收参数对象
			method : "POST",
			async : true, //true为异步请求，false为同步请求
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				me.succCallback(res);
				if(me.metaDataDetailWindow && me.metaDataDetailWindow.isVisible()) {
					me.metaDataDetailWindow.hide();
				}else if(me.auditWin && me.auditWin.isVisible()) {
					me.auditWin.hide();
				}
			},
			failure : function(response) {
				Dep.framework.editor.util.Msg.failed("审核失败！","提示");
			}
		});
	},
	/**
	 * 审核请求后的成功回调函数
	 * @param {} response
	 */
	succCallback : function(response) {
		var me = this;
		if(response && response.resultCode==1) {
			if(me.window.getAuditGrid().isVisible()) {
				me.window.getAuditGrid().getStore().load();
			}else if(me.window.getGatherResultGrid().isVisible()) {
				me.window.getGatherResultGrid().getStore().load();
			}
			Dep.framework.editor.util.Msg.success(response.resultText, '成功');
		}else {
			Dep.framework.editor.util.Msg.failed(response.resultText, '失败');
		}
	},
	/**
	 * 元数据详情窗口隐藏之前的处理
	 */
	beforeMdWinHide : function() {
		var me = this;
		if(me.metaDataDetailWindow && me.metaDataDetailWindow.ids) {
			me.metaDataDetailWindow.ids = null;
			delete me.metaDataDetailWindow.ids;
		}
		if(me.auditWin && me.auditWin.idObjArry) {
			me.auditWin.idObjArry = null;
			delete me.auditWin.idObjArry;
		}
	},
	/**
	 * 选择采集配置数据源悬挂点时只能选择元数据节点，不能选择视图节点
	 * @param {Ext.ux.TreePicker} picker
	 * @param {Ext.data.Model} record
	 * @param {Object} eOpts
	 */
	selectHangPoint : function(picker, record, eOpts) {
		if(record.raw.type=='0') {
			Dep.framework.editor.util.Msg.info('不能选择根节点，请选择具体元数据。', '提示');
			picker.reset();
		}
		if(record.raw.nodeType==1) {
			Dep.framework.editor.util.Msg.info('不能选择视图节点，请选择具体元数据。', '提示');
			picker.reset();
		}
		if(record.raw.nodeType==3) {
			Dep.framework.editor.util.Msg.info('不能选择分类节点，请选择具体元数据。', '提示');
			picker.reset();
		}
	},
	/**
	 * 刷新采集资源界面,用适配器树重新加载数据
	 */
	refreshAfterDelete : function(node, isDeletingTask) {
		var me = this,url=null;
		if(!node) {
			return;
		}
		if(node.raw.nodeType=='adapter' || node.raw.nodeType=='dataSource'){
			url = 'gather/findByAdapterId.do';
		}else {
			return;
		}
		me.adaptorStore.getProxy().url = url;
		if(isDeletingTask){//正在删除任务
			me.adaptorStore.proxy.extraParams.id = node.parentNode.raw.id;//适配器节点id
			me.adaptorStore.load({
					node : node.parentNode, //刷新适配器节点 
					callback : function(){
						var newNode = me.adaptorStore.getNodeById(node.raw.id);//数据源节点
						me.window.westPanel.selectPath(newNode.getPath("id"), 'id'); //选中数据源节点 
						newNode.expand();
						me.showSelectedGrid(null, newNode);
					}
			});			
		}else {//正在删除数据源
			me.adaptorStore.proxy.extraParams.id = node.raw.id;//适配器节点id
			me.adaptorStore.load({
					node : node, //刷新适配器节点 
					callback : function(records, operation, success){ 
						me.window.westPanel.expandPath(node.getPath("id"), 'id'); //展开适配器节点 
						me.showSelectedGrid(null, null);
					}
			});	
		}
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
				Fn.Request(url, false, params, "",
					function() {
						Dep.framework.editor.util.Msg.success('删除成功。', '成功');
						if(record.raw.nodeType=='task') {
							me.refreshAfterDelete(record.parentNode, true);
						}else {
							me.refreshAfterDelete(record.parentNode, false);
						}
					});
			}else {
				return false;
			}
		}, me);
	},
	/**
	 * 采集结果工具条上的查询操作
	 * @param {} obj 采集结果的【查询】按钮
	 */
	searchMD : function(obj) {
		var me = this, nameStr = "";
		var grid = obj.up('grid');
		var store = grid.getStore();
		grid.down('pagingtoolbar').moveFirst();//store会发请求加载数据,所以先注掉
		grid.getSelectionModel().deselectAll();
	},
	/**
	 * 元数据审核工具条上的查询操作
	 * @param {} obj 元数据审核的【查询】按钮
	 */
	searchMDForAudit : function(obj) {
		var me = this, nameStr = "";
		var grid = obj.up('grid');
		var store = grid.getStore();
		var dataSource = me.getAuditDSCombo().getValue();
		if(!dataSource) {
			Dep.framework.editor.util.Msg.info('请先选择一个数据源。', '提示');
			return;
		}
		var dataSourceNode = me.adaptorStore.getNodeById(dataSource);
		if(dataSourceNode) {
			var dataPath = dataSourceNode.raw.dataPath;
			store.getProxy().extraParams.dataPath = dataPath;
		}
		grid.down('pagingtoolbar').moveFirst();//store会发请求加载数据,所以先注掉
		grid.getSelectionModel().deselectAll();
	},
	/**
	 * 每次点击元数据审核的数据源下拉框都重新请求数据
	 * @param {} obj
	 */
	reloadAuditDataSource : function(obj) {
		if(obj.store) {
			obj.store.load();
		}
	},
	/**
	 * 批量审核元数据
	 * @param {} obj 所点中的【审核】按钮
	 */
	batchAuditMD : function(obj) {
		var me = this, flag = false, flagB = false, objArry = [];
		var grid = obj.up('grid');
		var selectionsA = grid.getSelectionModel().getSelection();
		if(selectionsA.length > 0) {
			flag = true;
		}
		for(var i=0; i<selectionsA.length; i++) {
			var auditingMd = selectionsA[i];
			objArry.push({id : auditingMd.get('id')});
		}
		var innerGrids = Ext.ComponentQuery.query('grid[cmpTag="auditinnergrid"]');
		for(var i=0; i < innerGrids.length; i++) {
			var idObj = {}, innerGrid = innerGrids[i], objArryB = [];
			var fg = false;
			for(var h in objArry) {
				var idoj = objArry[h];
				if(idoj.id == innerGrid.renderId) {
					fg = true;
				}
			}
			if(fg) {
				fg = false;
				continue;
			}
			//TODO innerGrid.renderId
			var selectionsB = innerGrid.getSelectionModel().getSelection();
			if(selectionsB.length > 0) {
				flag = true;
				idObj.id = innerGrid.renderId;
				for(var j in selectionsB) {
					var innerIdObj = {};
					innerIdObj.id = selectionsB[j].get('id');
					objArryB.push(innerIdObj);
				}
			}
			var grandGrids = Ext.ComponentQuery.query('grid[cmpTag="auditgrandgrid'+innerGrid.renderId+'"]');
			for(var k in grandGrids) {
				var innerIdObject = {}, grandGrid = grandGrids[k];
				var fgb = false;
				for(var g in objArryB) {
					var idob = objArryB[g];
					if(idob.id == grandGrid.renderId) {
						fgb = true;
					}
				}
				if(fgb) {
					fgb = false;
					continue;
				}
				var selectionC = grandGrid.getSelectionModel().getSelection();
				if(selectionC.length > 0) {
					var ids = [];
					flag = true;
					flagB = true;
					innerIdObject.id = grandGrid.renderId;
					for(var l in selectionC) {
						ids.push(selectionC[l].get('id'));
					}
					innerIdObject.children = ids;
					objArryB.push(innerIdObject);
				}
				grandGrid = null;
				delete grandGrid;
			}
			if(flagB) {
				idObj.id = innerGrid.renderId;
			}
			idObj.children = objArryB;
			objArry.push(idObj);
			innerGrid = null;
			delete innerGrid;
		}
		if(!flag) {
			Dep.framework.editor.util.Msg.info('请至少勾选一条元数据。', '提示');
			return;
		}
		me.showBatchAuditMetaDataWin(objArry);
		objArry = [];
	},
	/**
	 * 显示批量审批元数据的弹窗
	 * @param {[]} ids 将要批量审批的元数据的id数组
	 */
	showBatchAuditMetaDataWin : function(idObjArry) {
		var me = this;
		if(!me.auditWin) {
			me.auditWin = Ext.create('Dep.metadata.gathermng.view.AuditWindow', {
				auditStore : me.auditComboStore
			});
		}
		me.auditWin.down('form').getForm().reset();
		me.auditWin.idObjArry = idObjArry;
		me.auditWin.show();
		me.getAuditMDCombo().setValue(true);
	},
	/**
	 * 任务下拉框请求数据之前必须先选择一个数据源
	 */
	beforeQueryTasks : function() {
		var me = this;
		var dataSource = me.getAuditDSCombo().getValue();
		if(!dataSource) {
			Dep.framework.editor.util.Msg.info('请先选择一个数据源！', '提示');
			return false;
		}
		var taskCombo = me.getAuditTaskCombo();
		taskCombo.store.proxy.extraParams.dataSource = dataSource ? dataSource : '';
	},
	/**
	 * 当数据源下拉框改变时，清空任务下拉框
	 */
	cleanTaskCombo : function() {
		var me = this;
		var dataSource = me.getAuditDSCombo().getValue();
		var taskCombo = me.getAuditTaskCombo();
		taskCombo.reset();
		taskCombo.store.proxy.extraParams.dataSource = dataSource;
		taskCombo.store.load();
	},
	/**
	 * DB数据源悬挂点每次treepicker点击都去请求数据
	 */
	reloadMetaDataDB : function() {
		var me = this;
		me.mdTreeStore.getProxy().url = "view/getAll.do";
		if(me.mdTreeStore.getProxy().extraParams.viewId) {
			delete me.mdTreeStore.getProxy().extraParams.viewId;
		}
		if(me.mdTreeStore.getProxy().extraParams.metadataId) {
			delete me.mdTreeStore.getProxy().extraParams.metadataId;
		}
		me.mdTreeStore.load();
	},
	/**
	 * Excel数据源悬挂点每次treepicker点击都去请求数据
	 */
	reloadMetaDataExl : function() {
		var me = this;
		me.mdTreeStoreExl.getProxy().url = "view/getAll.do";
		if(me.mdTreeStoreExl.getProxy().extraParams.viewId) {
			delete me.mdTreeStoreExl.getProxy().extraParams.viewId;
		}
		if(me.mdTreeStoreExl.getProxy().extraParams.metadataId) {
			delete me.mdTreeStoreExl.getProxy().extraParams.metadataId;
		}
		me.mdTreeStoreExl.load();
	}
});	