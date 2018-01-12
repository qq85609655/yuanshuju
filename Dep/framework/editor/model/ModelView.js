/**
 * 图元图形数据模型
 */
Ext.define('Dep.framework.editor.model.ModelView', {
	extend : 'Dep.framework.editor.model.BaseModel',
	fields : [ {
		name : 'id', // id
		type : 'string'
	} ],
	belongsTo : {
		model : 'Dep.framework.editor.model.BaseFigureModel',
		primaryKey : 'id',
		foreignKey : 'id'
	}
});