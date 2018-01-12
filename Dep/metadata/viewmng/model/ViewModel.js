/**
 * 视图模型
 * @author hww
 */
Ext.define('Dep.metadata.viewmng.model.ViewModel', {
	extend : 'Ext.data.Model',
	
	fields:[{
			name : 'id',    //视图ID
			type : 'string'
		},{
			name : 'viewName', //视图名称
			type : 'string'
		},{
			name : 'defaultShow', //默认显示
			type : 'string'
		},{
			name : 'viewType',  //视图类型 ["0":SYSTEM, "1":CUSTOM]
			type : 'string'
		},{
			name : 'displayOrder',//显示顺序
			type : 'string'
		},{
			name : 'remark',  //描述、备注
			type : 'string'
		},{
			name : 'ishidden', //是否隐藏 [1:YES, 0:NO]
			type : 'int'
	}]
	
	
});