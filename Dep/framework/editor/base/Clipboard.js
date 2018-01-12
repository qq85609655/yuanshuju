/**
 * 粘贴板
 */
if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.base) {
	Dep.framework.editor.base = {};
}
Dep.framework.editor.base.Clipboard = Dep.framework.editor.base.EventSource.extend({
	/**
	 * 类名
	 */
	NAME : "Dep.framework.editor.base.Clipboard",

	/**
	 * 粘贴板中缓存的数据,用来完成粘贴操作
	 */
	DATASTACK : new draw2d.util.ArrayList(),
	/**
	 * 独立的粘贴板类
	 * 
	 * @param canvas
	 *            粘贴板关联的画布类
	 */
	init : function(canvas, container) {
		var me = this;
		me.canvas = canvas;
		me.container = container;
		this._super();
	},

	/**
	 * 定义缓存的粘贴操作个数
	 */
	STEPSIZE : 10,

	/**
	 * 判断该粘贴板是否为空 Returns true if the clipboard currently has not data stored.
	 */
	isEmpty : function() {
		return this.getDataStack().isEmpty();
	},

	/**
	 * 获取缓存的操作个数
	 * 
	 * @returns {*}
	 */
	getDataStackLength : function() {
		var stack = this.getDataStack();
		return stack.getSize();
	},
	/**
	 * 根据模型集合来剪切图元到粘贴板中
	 * 
	 * @param{draw2d.util.ArrayList} dataModelList
	 */
	cut : function(dataModelList) {
		var me = this, valideList = me._validateModel(dataModelList);
		// 先调用内部复制方法
		me.copy(valideList, true);
		// 再调用remove方法来移除剪切的模型,必须使用原来的list,因为校验后的list中已经没有id了
		me._removeModel(dataModelList);
	},
	/**
	 * 在界面上删除指定模型集合对应的图元
	 * 
	 * @param {draw2d.util.ArrayList}
	 *            dataModelList
	 * @private
	 */
	_removeModel : function(dataModelList) {
		var me = this, ftype = null;
		// 由于各个模型的figureType不一样,只能一个一个的去操作处理了
		dataModelList.each(function(i, model) {
					ftype = model.getFType();
					me.getEditor().executeAction(
							Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, ftype, model);
				});
	},
	/**
	 * 将传入的图元进行复制操作
	 * 
	 * @param{draw2d.util.ArrayList} dataModelList
	 */
	copy : function(dataModelList, cloned) {
		var me = this, valideList = null;
		// 如果是从cut调用的,则不用在调用validate方法了
		if (!cloned) {
			valideList = me._validateModel(dataModelList);
		} else {
			valideList = dataModelList
		}

		// 每次复制时均清除缓存的复制对象
		me.getDataStack().clear();
		me.getDataStack().add(valideList);
	},

	/**
	 * 粘贴操作 处理流程:粘贴操作完成后,不会移除队首的对象,只会从队尾移除对象.
	 * 也就是说只有当某个对象被前面的对象"挤"到队尾时才会被删除,否则可以一直粘贴队首的对象
	 */
	paste : function() {
		var me = this, dataStack = me.getDataStack(), modelList = null, ftype = null;
		if (dataStack.getSize() <= 0) {
			return;
		}
		// 每次粘贴时,都对缓存中的备份重新复制一份来粘贴,从而防止数据重复
		modelList = me._validateModel(dataStack.getLastElement());
		dataStack.add(modelList);
		// 由于各个模型的figureType不一样,只能一个一个的去操作处理了
		modelList.each(function(i, model) {
			ftype = model.getFType();
			me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
					ftype, model);
			});
	},

	/**
	 * 校验模型集合中的数据,剔除不符合标准的数据 同时将符合要求的模型id都置为空
	 * 
	 * @param {draw2d.util.ArrayList}
	 *            dataModelList
	 */
	_validateModel : function(dataModelList) {
		var me = this, clonedDataModelList = new draw2d.util.ArrayList();
		if (!(dataModelList instanceof draw2d.util.ArrayList)) {
			return false;
		}
		dataModelList.each(function(i, model) {
					// 基本校验model类型,以后可以添加更丰富的校验
					if (model instanceof Dep.framework.editor.model.BaseFigureModel) {
						// clonedDataModelList这个队列中存放的是原模型的克隆版本
						var cloneModel = me.getEditor().getDataManager().clone(
								null, model);

						if (cloneModel && cloneModel[0]) {
							me._adjustviewData(cloneModel[0]);
							clonedDataModelList.add(cloneModel[0]);
						}
					} else {
						dataModelList.remove(model);
					}
				});
		return clonedDataModelList
	},
	/**
	 * 将节点图元的坐标错开一定的位置
	 * @param {} model
	 */
	_adjustviewData : function(model) {
		var viewModel = model.getViewData(), viewData = viewModel
				.get('viewData');
		if (viewData) {
			viewData = Ext.JSON.decode(viewModel.get('viewData'));
			if (viewData.x) {
				viewData.x += 10;
				viewData.y += 10
			}
			viewModel.set('viewData', Ext.JSON.encode(viewData));
		}
	},
	/**
	 * 获取粘贴板中缓存的数据集合
	 * 
	 * @returns {draw2d.util.ArrayList}
	 */
	getDataStack : function() {
		if (this.DATASTACK) {
			return this.DATASTACK;
		} else {
			throw "数据缓存未初始化";
		}
	},
	/**
	 * 获取粘贴板关联的编辑器对象
	 * 
	 * @returns {Dep.framework.editor.base.Editor}
	 */
	getEditor : function() {
		return this.container.getEditor();
	}

});