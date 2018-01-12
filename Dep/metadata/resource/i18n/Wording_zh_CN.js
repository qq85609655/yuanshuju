if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.metadata) {
	Dep.metadata = {};
}
if(!Dep.metadata.I18N) Dep.metadata.I18N = {};
//元数据管理模块
Dep.metadata.I18N.metadatamng ={
	metadata :"元数据",
	metadatagrid :{
		name:"名称",
		code:"代码",
		mmName:"所属元模型"
	},
	plugin :{
		versionSearchWintitle :"版本查询",
		versionSearch :"版本查询",
		dependMng     :"依赖管理",
		impactAnalysis	:"影响分析",
		strainAnalysis	:"血统分析",
		allAnalysis	 	:"血统分析",
		associateAnalysis	:"关联度分析",
	},
	treeStoreRoot :"元数据",
	view :{
		metamodel :"元模型",
		metadatainfo :"元数据信息",
		baseinfo:"基本信息",
		code:"代码",
		name:"名称",
		baseprops:"基本属性",
		
		savebtn:"确定",
		cancelbtn :"取消",
		querybtn :"检索",
		approvalbtn :"审核"
	},
	menu : {
		add :"添加元数据",
		createMap : "创建映射",
		createMapped : "创建被映射",
		import :"导入",
		edit :"修改",
		del :"删除",
		pub :"发布",
		addDepend:"添加依赖"
	},
	versiongridtitle:{
		no :"版本号",
		code:"代码",
		name :"名称",
		verRemark :"版本描述",
		isnew:"是否最新版本"
	}
};
//视图管理模块
Dep.metadata.I18N.viewmng = {
	controller : {
		addView : "添加视图",
		editView : "修改视图",
		selectRecord : "请先选择一条记录。",
		delFailed : "删除失败！",
		delSuccess : "删除成功！",
		saveFailed : "保存失败！",
		yourIcon : "您的图标文件",
		uploadSucc : "已经上传成功！",
		serverInvalid : "服务端处理失败！"
		
		
	},
	view : {},
	msgtitle : {
		info : "提示",
		warning : "警告",
		error : "错误",
		success : "成功",
		failed : "失败"
		
	}
	
};
//采集管理管理模块
Dep.metadata.I18N.gathermng = {

	
};
//Ext确认框、提示框、警告框的按钮显示名字
Ext.Msg.buttonText = {
				cancel : "取消",
					no : "否",
					ok : "确定",
				   yes : "是"
			};