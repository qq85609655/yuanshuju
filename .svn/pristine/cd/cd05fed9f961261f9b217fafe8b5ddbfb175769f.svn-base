/**
 * container 为根容器，即editor
 * 此插件需要：
 * 1.根据编辑器的配置信息初始化界面信息。
 * 2.初始化事件监听，如切换图层需要发出图层切换事件。
 * 
 * 此容器插件关联的配置文件为-》cuseditor目录/Layer.json文件。配置文件详情：
 * {
	"plugins" : [{   //插件正常运行所需要依赖的其他插件
					 //图层管理器插件
				"src" : "Dep/framework/editor/plugin/containers/layer/LayerManagePlugin.js",
				"name" : "Dep.framework.editor.plugin.containers.Layer.LayerManagePlugin"
			}],
	"details" : [   //图层插件上的Grid列表中的记录信息，此例子供3条记录信息

	{
				"type" : "topo",    //图层grid的type列，图层类型
				"fGroups" : "topo", //图层grid的fGroups列，图元类型组 
				"name" : "拓扑图",    //图层grid的name列，图层名称
				"desc" : "设置网络拓扑图",  //图层grid的desc列，图层描述
				"layout" : "suduku",  //该图层所显示的布局方式
				"fields":["type","fGroups","name", "layout"]   //每条记录所需的属性配置
			}, {
				"type" : "pub",
				"fGroups" : "pub",
				"name" : "发布资源",
				"desc" : "设置发布资源",
				"layout" : "suduku",
				"fields":["type","fGroups","name", "layout"]
			}, {
				"type" : "sub",
				"fGroups" : "sub",
				"name" : "订阅资源",
				"desc" : "设置订阅资源",
				"layout" : "suduku",
				"fields":["type","fGroups","name", "layout"]
			}]
}
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
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
Dep.framework.editor.plugin.containers.Layer = Dep.framework.editor.plugin.containers.BaseLayer.extend({
	NAME : "Dep.framework.editor.plugin.containers.Layer",

	/**
     *  @private
	 *  实现initview方法
	 */
	_initView : function() {
		var me = this;

		me.containerPanel = me.containerPanel ? me.containerPanel : Ext
				.create("Dep.framework.editor.view.LayerPanel");
		me._buildLayerGrid(/*pluginData*/);
		me.getEditor().getEditorView().addToRegion(me.getContainerPanel(),
				'west');
	},

	/**
     *  @private
	 *  构建图层grid
	 */
	_buildLayerGrid : function() {
		var me = this;
		var columns = me._bulidGridColumns();
		me.store = me._bulidGridStore();
		if (!me.layerGridPanel) {
			me.layerGridPanel = Ext.create('Dep.framework.editor.view.LayerListGrid', {
				columns : columns,
				store : me.store,
				layer : me
			});
			me.containerPanel.add(me.layerGridPanel);
		}
	},
	/**
     *  @private
	 *  构建图层gird的列模型
	 */
	_bulidGridColumns : function() {
		var colums = [];
		colums.push({
			text : '名称',
			dataIndex : 'name'
		});
		colums.push({
			text : '类型',
			dataIndex : 'type',
			hidden : true
		});
		//由于加载问题，增加的div绑定不上事件，暂时先去掉
		//		colums.push({text : '操作',dataIndex : 'opt',renderer:function(val,p,record){
		//			return "<div style='color:green;margin-bottom:3px;'  id='layer_"+record.get('type')+"_upMove' >上移</div><div style='color:green;margin-top:3px;' id='layer_"+record.getId()+"_downMove'>下移</div>";
		//		}});
		return colums;
	},
	/**
     *  @private
	 *  构建图层的store
	 *  	注：此处构建的store为JSONStore
	 * @returns {} store
	 */
	_bulidGridStore : function() {
		var me = this, configDatas, fields = [];
		var store = null;
		configDatas = me.getLayerManager().values();
		if (configDatas.length > 0) {
			var indexData = configDatas[0];
			//取出当前一条记录中的所有属性，组装成fields
//			for ( var i in indexData) {
//				fields.push(i);
//			}
			if (!indexData.fields) {
				fields = ["type","fGroups","name", "layout"];
			}else{
				fields = indexData.fields;
			}
		}
		store = new Ext.data.JsonStore({
			autoDestroy : true,
			storeId : 'layerJsonStore',
			data : configDatas,
			fields : fields,
			autoLoad : true
		});
		return store;
	},
	/**
	 * 返回图层grid panel
	 * @return {Dep.framework.editor.view.LayerListGrid} 图层grid对象
	 */
	getLayerGridPanel:function() {
		var me = this;
		return me.layerGridPanel;
	},
	/**
	 * 返回grid 的store对象
	 * @return {Ext.data.Store} 图层gridstore
	 */
	getGridStore:function() {
		var me = this;
		return me.store;
	}
  
});
