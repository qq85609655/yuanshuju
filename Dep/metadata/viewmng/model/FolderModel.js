/**
 * 文件夹模型
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.model.FolderModel', {
	extend : 'Ext.data.Model',
	
	fields:[{
			name : 'id',    //文件夹的ID
			type : 'string'
		},{
			name : 'viewId', //视图的id
			type : 'string'
		},{
			name : 'parentId', //父文件夹的id
			type : 'string'
		},{
			name : 'name',  //文件夹名称
			type : 'string'
		},{
			name : 'namespace',//命名空间
			type : 'string'
		},{
			name : 'folderLevel',  //文件夹层级
			type : 'string'
		},{
			name : 'displayOrder', //显示顺序
			type : 'string'
		},{
			name : 'ishidden', //是否隐藏 ：YES：1/NO:0
			type : 'int'
	}]
	
	
});