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
if (!Dep.framework.editor.manager) {
	Dep.framework.editor.manager = {};
}
/**
 * 图元修改管理器
 */
Dep.framework.editor.manager.DataChangeManager = Dep.framework.editor.manager.BaseManager.extend({
	/**
	 * 类名
	 * @type String
	 */
	NAME : "Dep.framework.editor.manager.DataChangeManager",
	/**
	 * 新增数据集合
	 * @type {Dep.framework.editor.manager.BaseManager}
	 */
	addDatas : null,
	/**
	 * 更新数据集合
	 * @type {Dep.framework.editor.manager.BaseManager}
	 */
    updatedDatas : null,
    /**
     * 删除数据结合
     * @type {Dep.framework.editor.manager.BaseManager}
     */
	deleteDatas : null,

	/**
	 * 对象初始化方法
	 * @param {} parent
	 */
	init : function(parent) {
		var me = this;
		me._super(parent);
		me.addDatas = new Dep.framework.editor.manager.BaseManager();
		me.updatedDatas = new Dep.framework.editor.manager.BaseManager();
		me.deleteDatas = new Dep.framework.editor.manager.BaseManager();
	},
    /**
     *添加一条或多条数据
     * @param {Dep.framework.editor.model.BaseFigureModel/Dep.framework.editor.model.BaseFigureModel[]}data
     */
	addNewDatas : function(datas) {
        var me = this;
        if (datas instanceof Array) {
            for (var i in datas) {
                me._addData(datas[i]);
            }
            return;
        }
        me._addData(datas);

	},
    /**
     * 添加一条数据
     * @param {Model}data
     * @private
     */
    _addData : function(data) {
        var me = this,id = data.id;
        //如果新增的是删除的对象
        if (me.getDeleteDatas().get(id)) {
            me.getDeleteDatas().remove(id);//从删除对象中清除
           me._updateData(data);//存入更新
            return;
        }
        me.getAddDatas().put(data.id,data);
    },
    /**
     * 添加一条或多条更新数据
     * @param {Dep.framework.editor.model.BaseFigureModel/Dep.framework.editor.model.BaseFigureModel[]}data
     */
	addUpdateDatas : function(datas) {
        var me = this;
        if (datas instanceof Array) {
            for (var i in datas) {
                me._updateData(datas[i]);
            }
            return;
        }
        me._updateData(datas);
	},
    /**
     * 添加一条更新数据
     * @param {Model}data
     * @private
     */
    _updateData : function(data) {
        var me = this,id = data.id;
        if (me.getAddDatas().get(id)) {//如果更新的是新增的数据模型，不存入更新数据集中
            me.getAddDatas().put(data.id,data);
            return;
        }
        me.getUpdateDatas().put(data.id,data);
    },
    /**
     * 添加一条或多条删除数据
     * @param {Dep.framework.editor.model.BaseFigureModel/Dep.framework.editor.model.BaseFigureModel[]}data
     */
	addDeleteDatas : function(datas) {
        var me = this;
        if (datas instanceof Array) {
            for (var i in datas) {
                me._deleteData(datas[i]);
            }
            return;
        }
        me._deleteData(datas);
	},
    /**
     * 添加一条删除数据
     * @param data
     * @private
     */
    _deleteData : function(data) {
        var me = this,id = data.id;
        //如果删除的图元是新增图元，直接删除新增缓存
        if (me.getAddDatas().get(id)) {
            me.getAddDatas().remove(id);
            return;
        }
        //如果删除的图元更新过，删除更新缓存
        if (me.getUpdateDatas().get(id)) {
        	me.getUpdateDatas().remove(id);
        	return;
        }
        //存放删除对象
        me.getDeleteDatas().put(id,data);
    },

    /**
	 * 获取添加的图元集合
	 * 
	 * @return {Dep.framework.editor.manager.BaseManager}
	 */
	getAddDatas : function() {
		return this.addDatas;

	},
	/**
	 * 获取修改的图元集合
	 * 
	 * @return {Dep.framework.editor.manager.BaseManager}
	 */
    getUpdateDatas : function() {
		return this.updatedDatas;
	},
	/**
	 * 获取更新的图元集合
	 * 
	 * @return {Dep.framework.editor.manager.BaseManager}
	 */
	getDeleteDatas : function() {
		return this.deleteDatas;
	},
    /**
     * 清空所有数据
     */
    clear : function() {
       var me = this;
        me.getAddDatas().removeAll();
        me.getDeleteDatas().removeAll();
        me.getUpdateDatas().removeAll();
    }
});