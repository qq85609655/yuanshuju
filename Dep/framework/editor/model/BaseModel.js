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

/**
 * 数据模型基类
 */
Ext.define('Dep.framework.editor.model.BaseModel', {
	extend : 'Ext.data.Model',
	
	
	/**
	 * 清除模型的ID
	 */
	_clearIds : function(id) {
		var me = this;
		newId = id?id:me.idgen.generate();
		me.setId(newId);
		me.internalId = newId;
		me.id = me.idgen.getRecId(me);
	}
});