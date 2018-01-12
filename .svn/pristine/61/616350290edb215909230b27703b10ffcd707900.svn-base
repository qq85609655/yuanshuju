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
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
if (!Dep.framework.editor.plugin.containers.layer) {
	Dep.framework.editor.plugin.containers.layer = {};
}

/**
 */
Dep.framework.editor.plugin.containers.layer.ChangeLayer = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.ChangeLayer",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
	},
	/**
	 * @param {plugin.Layer}
	 *            Layer 编辑器
	 */
	_initEvent : function() {
		var me = this;
		var me = this;
		me.getContainer().store.on('datachanged', function() {
			me._changeCurrentEditLayer();
		});
		me.getContainer().getLayerGridPanel().on('selectionchange', function() {
			me._changeCurrentEditLayer();
		});
	},
	/**
     *  @private
	 *  改变当前编辑图层
	 */
	_changeCurrentEditLayer : function() {
		var me = this, length;
		var selArr = me.getContainer().getLayerGridPanel().getSelectionModel().getSelection();
		length = selArr.length;
		if (!selArr || (selArr.length == 0)) {
			me.getContainer().changeCurrentEditLayer(null);
			//TODO 此处是否需要不停更新？
			me.getContainer().changeCurrentDisplayLayers(null);
			me.getContainer().getLayerGridPanel().fireEvent('viewready',me.getContainer().getLayerGridPanel(),null,null);
		} else {
			me.getContainer().changeCurrentEditLayer(me._getTopLayer(selArr));
			me.getContainer().changeCurrentDisplayLayers(me.getSelectLayers(selArr));
		}
	},

	/**
     *  @private
	 *  获取显示的最上层图层
	 * @param records
	 * @return {Object}
	 */
	_getTopLayer : function(records) {
		var me = this,temp_TopLayerIndex=9999999999,layerIndex, topLayer = null;
		for ( var i in records) {
			layerIndex = me.getContainer().getGridStore().indexOf(records[i]);
			if ((layerIndex >= 0) && (layerIndex < temp_TopLayerIndex)) {
				temp_TopLayerIndex = layerIndex;
				topLayer = me.getContainer().getLayerManager().get(records[i].get("type"));
			}
		}
		var rec =me.getContainer().getGridStore().getAt(temp_TopLayerIndex);
		me.getContainer().getLayerGridPanel().fireEvent('viewready',me.getContainer().getLayerGridPanel(),null,rec);
		return topLayer;
	},
	/**
	 *  获取选中的图层
	 * @param selecteds 图层列表中选择的记录集合
	 * @return {Array}
	 */
	getSelectLayers : function(selecteds) {
		var me = this, selectItem, layerIndex, selectLayers = [];
		for ( var i in selecteds) {
			layerIndex = selecteds[i].get("type");
			selectLayers.push(me.getContainer().getLayerManager().get(layerIndex));
		}
		return selectLayers;
	},
});