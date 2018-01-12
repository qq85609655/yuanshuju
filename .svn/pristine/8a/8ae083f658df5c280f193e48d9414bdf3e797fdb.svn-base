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
				"src" : "JHE/editor/plugin/containers/layer/LayerManagePlugin.js",
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
Dep.framework.editor.plugin.containers.BaseLayer = Dep.framework.editor.plugin.ContainerPlugin.extend({
    NAME: "Dep.framework.editor.plugin.containers.BaseLayer",
    /**
     * @property {JHE.Layer} currentEditLayer 当前编辑图层
     */
    currentEditLayer: null,
    /**
     * @property {JHE.Layer[]} currentDisplayLayer 当前显示图层
     */
    currentDisplayLayer: null,
    /**
     * @property {JHE.manager.BaseManager} layerManger 图层管理器，管理图层配置信息
     */
    layerManger: null,

    /**
     *  初始化图层容器插件
     * @param {Object}  pluginData  插件配置信息
     */
    init: function (parent, pluginData) {
        var me = this;
        me._super(parent, pluginData);
        me.pluginData = pluginData;
        me.getEditor().on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
            me._initEvent.bind(me));
        //注册图层修改action
        me.regiestActions([ {
			name : "changeCurrentEditLayer",
			description : "修改当前编辑图层",
			functionality : Ext.Function.bind(me.changeCurrentEditLayer, me),
			group : "changeLayer"
		},{
			name : "changeCurrentDisplayLayer",
			description : "修改当前显示图层",
			functionality : Ext.Function.bind(me.changeCurrentDisplayLayers, me),
			group : "changeLayer"
		},{
			name : "setDefaultLayer",
			description : "设置默认图层",
			functionality : Ext.Function.bind(me.setDefaultLayer, me),
			group : "changeLayer"
		} ]);
        

    },
    /**
     *  初始化事件绑定
     */
    _initEvent: function () {
        var me = this;
        me._initDatas();
        //初始化界面信息
        me._initView();   
        me.raiseEvent(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,me);
    },
    /**
     *  @private
	 *  将传递过来的配置信息缓存起来
	 */
    _initDatas : function() {
		var me = this;
		if (!me.getEditor() || !me.getEditor().getDataManager() ) {
			return;
		}
		//向数据管理器中注册图层信息
		me.getDataManager().updateLayerConfig(me.pluginData);
		//获取所有的图层信息
	},
  
    /**
     *  @private
	 *  子类实现
	 */
	_initView :function () {},
	
	
	/**
	 *  改变当前编辑图层
	 * @param layer 图层唯一标识
	 */
	changeCurrentEditLayer : function(layer) {
		var me = this, oldLayer = me.currentEditLayer;
		//图层没有变动
		if (oldLayer === layer) {
			return;
		}
		//图层没有变动，不处理
		if (oldLayer && layer && (oldLayer.type === layer.type)) {
			return;
		}
		me.setCurrentEditLayer(layer);
		me.getDataManager().setEditableLayer(layer);
		//作为容器事件发出
		me.raiseEvent(Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER, layer);
		
	},
	/**
	 *  改变当前显示图层
	 */
	changeCurrentDisplayLayers : function(layers) {
		var me = this;
		me.setCurrentDisplayLayer(layers);
		me.getDataManager().setVisibleLayers(layers);
		//作为容器事件发出
		me.raiseEvent(Dep.framework.editor.EVENT.LAYER.CHANGE_VISIBLE_LAYER, layers);
	},
	/**
     *  @private
	 *  设置默认图层
	 */
	setDefaultLayer : function() {
		//TODO
	},
	/**
	 * @return 返回图层管理器
	 */
	getLayerManager: function() {
		var me = this;
		if (!me.layerManger) {
			me.layerManger = me.getDataManager().getLayerManager();
		}
		if (!me.layerManger) {
			throw "[Dep.framework.editor.plugin.containers.Layer#getLayerManager]没有配置管理器任何信息！";
		}
		return me.layerManger;
	},
	/**
	 * @return 返回图层管理器
	 */
	getDataManager: function() {
		var me = this;
		return me.getEditor().getDataManager();
	},
	/**
	 * @return {Dep.framework.editor.base.Layer}返回当前编辑图层
	 */
	getCurrentEditLayer: function() {
		var me = this;
		return me.currentEditLayer;
	},
	/**
	 *  设置当前编辑图层
	 * @param {Dep.framework.editor.base.Layer} layer 图层对象
	 */
	setCurrentEditLayer: function(layer) {
		var me = this;
		me.currentEditLayer = layer;
	},
	/**
	 * 返回当前显示图层
	 * @return {[Dep.framework.editor.base.Layer]}图层数组
	 */
	getCurrentDisplayLayer: function() {
		var me = this;
		return me.currentDisplayLayer;
	},
	/**
	 *  设置当前显示图层
	 * @param {[Dep.framework.editor.base.Layer]} layer 图层对象数组
	 */
	setCurrentDisplayLayer: function(layers) {
		var me = this;
		me.currentDisplayLayer = layers;
	}
});
