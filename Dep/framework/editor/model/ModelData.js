
/**
 * 图元业务数据模型
 */
Ext.define('Dep.framework.editor.model.ModelData', {
	extend : 'Dep.framework.editor.model.BaseModel',
	fields : [ {
		name : 'id', // id
		type : 'string'
	}, {
		name : 'name', // 名称
		type : 'string'
	} ],
	belongsTo : {
		model : 'Dep.framework.editor.model.BaseFigureModel',
		primaryKey : 'id',
		foreignKey : 'id'
	},
	/**
	 * 重写模型的方法，过滤仅仅用于前台显示用的属性。
     * Gets all values for each field in this model and returns an object
     * containing the current data.
     * @param {Boolean} includeAssociated True to also include associated data. Defaults to false.
     * @return {Object} An object hash containing all the values in this model
     */
    getData: function(includeAssociated){
        var me     = this,
            fields = me.fields.items,
            fLen   = fields.length,
            data   = {},
            name, f;

        for (f = 0; f < fLen; f++) {
            name = fields[f].name;
            //add by yuan
            if(!fields[f].persist){//显示属性，不持久化
            	continue;
            }
          //add end by yuan
            data[name] = me.get(name);
        }

        if (includeAssociated === true) {
            Ext.apply(data, me.getAssociatedData());
        }
        return data;
    },
});