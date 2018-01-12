if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.metadata) {
	Dep.metadata = {};
}
if(!Dep.metadata.url) Dep.metadata.url = {};

//初始化编辑器
Dep.metadata.url.initEditor ="editor/getEditorConfigs.do";
//元数据管理模块
Dep.metadata.url.metadatamng ={
	getDetailAndSubById :"metadata/getDetailAndSubById.do", //根据元数据Id获取详情及子元数据
	delMetadata :"metadata/delete.do",  //删除元数据
	pubMetadata :"version/pub.do",  //元数据发布
	auditingMetadata :"version/auditingMD.do",  //元数据审核
	getByViewId :"metadata/getByViewId.do",  //根据视图Id获取元数据
	getSubById:"metadata/getSubById.do",  //根据元数据Id获取分类及分类下的元数据
	getModelList :"metamodel/getList.do",  //获取元模型
	getPropsByModelId:"metamodel/getProps.do", //根据元模型获取属性
	getAllView :"view/getAll.do",   //获取所有视图
	getDependMds :"metadata/getDependMds.do",   //获取依赖关系的元数据
	getDependMM :"metamodel/getDependMM.do",   //获取依赖关系元模型
	findNoDependMDs :"metadata/findNoDependMDs.do",   //根据元模型Id查询元数据
	addDepenMDs :"metadata/depend/add.do",
	delDependMD :"metadata/depend/delete.do",
	getMDFromTree :"metadatamap/getMDFromTree.do",
	queryMapping:"metadata/queryMapping.do"	//映射管理
};