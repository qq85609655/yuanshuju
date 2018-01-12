/**
 * container 为根容器，即editor
 * 此插件需要：
 * 1.根据编辑器的配置信息初始化界面信息。如初始化grid配置信息。
 * 2.初始化监听事件。如tabel切换需要发出修改layer的事件。选择图元需要发出图元选择时间。
 * 3.为控件的render配置方法调用container.fireEvent执行action。
 * 
 * 此容器插件关联的配置文件为-》cuseditor目录/BussList.json文件。配置文件详情：
 *    
 *    //所有图层的业务列表使用同一个json配置文件，业务列表的显示信息。
{   
	"plugins": [{"src": "Dep/framework/editor/plugin/containers/bussList/SelectModelPlugin.js","name": "Dep.framework.editor.plugin.containers.BussList.SelectModelPlugin"}],  //当前插件管理安装的的第三方插件
	"detail":[{
		"title": "拓扑图",  	//业务列表Grid的title配置名称
		"lType": "topo",  	//图层类型
		"displayBussProps": [{   //业务列表Grid的列信息配置，注意：如果有其他属性，例如显示隐藏，则直接在此处配置即可（和extjs的grid的js配置一样）。
				"dataIndex": "name",
				"text":"名称"	
			},{
				"dataIndex": "id",
				"text":"ID"	
			}
		]
	},	{
		"title": "发布资源",
		"lType": "pub",
		"displayBussProps": [{
				"dataIndex": "id",
				"text":"ID"	
			}
		]
	}
]}
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
Dep.framework.editor.plugin.containers.BussList = Dep.framework.editor.plugin.ContainerPlugin.extend({
	NAME : "Dep.framework.editor.plugin.containers.BussList",
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.plugin.containers.BussList"),
	
	/**
	 * @property {Dep.framework.editor.manager.BaseManager} columnManager 列管理器
	 */
	columnManager : null, 
	/**
	 * @property {Dep.framework.editor.manager.BaseManager} storeManager store管理器
	 */	
	storeManager : null, //store管理器
	/**
	 * @property {Dep.framework.editor.view.BussListGrid} gridPanel
	 */	
	gridPanel : null,
	/**
	 * @property {Dep.framework.editor.manager.BaseManager} bussListConfigManager   业务列表分图层配置管理器
	 */
	bussListConfigManager : null,
	/**
	 * @property {Object[]} selectRecords   选中的数据集合
	 */	
	selectRecords:null,
	/**
	 * @property {Object} currentLayer   当前图层
	 */		
	currentLayer:null,
	/**
	 * @property {Boolean} filterStoreData  是否过滤数据
	 */	
	filterStoreData:true,
	/**
	 * 初始化业务列表容器插件
	 * @param {Object}  pluginData  插件配置信息
	 */
	init: function(parent,pluginData){
		var me=this;
		me._super(parent,pluginData);
		 me._initData(pluginData);
		me._initManager();
		me._initView(pluginData);
		//初始化事件监听
		me.getEditor().on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE, me.initEvent.bind(me));
	},
	/**
	 * 初始化事件
	 */
	initEvent : function(){
		var me = this;
		//绑定图层发出的事件，监听图层修改事件
		me.regiestOnEvent(Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER,me._changeGridCfg.bind(me),me,"Dep.framework.editor.plugin.containers.Layer");
		//绑定画布图元选择事件
		me.regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.SELECT,me._onSelectFigure.bind(me),me,"Dep.framework.editor.plugin.containers.Canvas");
		//监听属性窗体属性切换事件
		me.regiestOnEvent(Dep.framework.editor.EVENT.PG.CHANGE_PROP,me._onChangeProp.bind(me),me,"Dep.framework.editor.plugin.containers.PropertiesWindow");
	},
	
	/**
     * 初始化配置信息
     * @param {Object}  pluginData 插件配置信息
     * @private
     */
    _initData:function (pluginData) {
    	var me = this, configs,config;
    	 //将图层的配置信息缓存
    	configs = pluginData.detail;
    	 if ((!configs) || (!configs instanceof  Array)) {
    		 me.logger.debug("[Dep.framework.editor.plugin.containers.BussList#_initData]图形工具条没有配置任何信息！");
    		 return ;
         }
    	 for (var i in configs) {
    		 config = configs[i];
             if (!config.lType) {
                 config.lType = "default";
             }
             me.geBussListConfigManager().put(config.lType, config);
    	 }
    },

	/**
	 * 根据配置初始化界面
     * @param {Object}  pluginData 插件配置信息
     * @private
	 */
	_initView : function(pluginData){
	    var me=this,i=0,listConfig=null,tempPanel=null;
	    me.containerPanel= me.containerPanel ? me.containerPanel : Ext.create("Dep.framework.editor.view.BussPanel");
	    me.getEditor().getEditorView().addToRegion(me.getContainerPanel(),'south');
	},
	/**
	 *  @private
	 * 初始化容器的管理器属性值
	 */
	_initManager : function(){
		var me = this;
		if(!me.columnManager){
			me.columnManager = new Dep.framework.editor.manager.BaseManager();
		}
		if(!me.storeManager){
			me.storeManager = new Dep.framework.editor.manager.BaseManager();
		}
	},
	/**
	 * @private
	 * 根据配置生成某一个图层的业务列表
	 * @param {Object} gridListConfig  业务列表数据配置
	 * @param {Object} layerObj  图层对象
	 */
	_bulidGridPanel : function(gridListConfig,layerObj){
		var me = this;
		var title = gridListConfig ? gridListConfig.title : "";
		var lType = gridListConfig ? gridListConfig.lType : "";
		var columns = me._bulidGridColumns(gridListConfig);
		var store = me._buildGridStore(layerObj);
		//TEST======================
//		layerObj.loadAll();
		
		if(!me.gridPanel){
			me.gridPanel = Ext.create("Dep.framework.editor.view.BussListGrid",{
			     title: title,
			     lType : lType,
			     store : store,
			     columns: columns				
			});
            //监听事件
			me.gridPanel.on('selectionchange',me._itemSelectChange,me);
			me.containerPanel.add(me.gridPanel);
		}else{
			me.gridPanel.setTitle(title);
//			me.gridPanel.setLtype(lType);
			me.gridPanel.reconfigure(store,columns);
		}
		return me.gridPanel;
	},
	/**
	 * @private
	 * 图层切换，grid列表重新配置
	 * @param layerObj
	 */
	_changeGridCfg : function(layerObj){
		var me = this;
		 me.containerPanel.hide();
		 if(!layerObj) {
			 me.logger.debug("[Dep.framework.editor.plugin.containers.BussList#_changeGridCfg]没有选中任何图层！");
			 return;
		 }
		 me.currentLayer = layerObj;
		var lType = layerObj.type;
		if (!lType) {//如果没有配置type属性，则默认为default属性
			layerObj.type = "default";
		}
		var gridListCfg = me.geBussListConfigManager().get(lType);
		//先隐藏container panel
		
		if (!gridListCfg) {
			//如果没有配置，取默认配置
			gridListCfg = me.geBussListConfigManager().get('default');			 
		}
		if (!gridListCfg) {
			me.logger.debug("[Dep.framework.editor.plugin.containers.BussList#_bulidGridPanel]没有配置此图层的业务列表信息！");
			return;			 
		}
		//切换配置
		me._bulidGridPanel(gridListCfg,layerObj);
		
		//重新加载数据
		me._reLoadData();
		//显示panel
		me.containerPanel.show();
	},

    /**
     * 图元选中时，将选中图元对象引用抛出
     * @param {} gird 业务列表对象
     * @param {Object[]} selected 已经选中的对象记录集合
     * @private
     */
	_itemSelectChange: function(gird, selected){
		var me = this,change;
		if (me.selectRecords) {
			change = me._existsDifferentValues(me.selectRecords,selected);
			if (!change) {
				return;
			}
		}
		me.logger.debug("图元选择修改了,发送事件-----");
		me.selectRecords = selected;
		me.raiseEvent(Dep.framework.editor.EVENT.BL.ROWSELECT,selected);
	},
	/**
	 * @private
	 * 判断bussList中选中的记录值与旧值是否一样
	 * @param {Object[]} oldVals   旧值
	 * @param {Object[]} newVals   新值
	 * @returns {Boolean}
	 */
	_existsDifferentValues : function(oldVals, newVals) {
	    var me = this,exists = false;
	    if (oldVals.length != newVals.length) {
	    	return true;
	    }
	    me.logger.debug(oldVals.sort().toString());
	    me.logger.debug(newVals.sort().toString());
	    return oldVals.sort().toString() == newVals.sort().toString();
	},
	
	/**
	 * @private
	 * 构建Grid的列信息
	 * @param {Object} gridListConfig
	 * @returns {Object[]}
	 */
	_bulidGridColumns : function(gridListConfig){
		var me = this;
		var columns= null;
		if(!gridListConfig){
			return [];
		}
		var lType = gridListConfig.lType;
		var columnProp = gridListConfig.displayBussProps;
		//现从缓存获取
		var cacheCols = me.columnManager.get(lType);
		if(cacheCols){
			columns = cacheCols;
		}else{
			columns = [];
			for (i in columnProp) {
				var column = columnProp[i];//直接同名屬性
				if (column.dataIndex === 'figureType') {//如果是图元类型,显示图元类型的描述
					columns.push({text : column.text,dataIndex : column.dataIndex ,renderer : function (v,metaData,record) {
						return record.description;
					} });
				} else {
				columns.push({text : column.text,dataIndex : column.dataIndex ,renderer : function (v,metaData,record) {
					
					var index = metaData.column.dataIndex;
					var value = record.get(index);//先从基本模型中获取，如果没有，从业务属性中获取名称。
					if (value) {
						return value;
					}
					me.logger.debug(record.getBussData().get(index));
					return record.getBussData().get(index);
				} });
				}
			}
			me.columnManager.put(lType,columns);
		}			
		return columns;
	},
	/**
	 * @private
	 * 构建store信息
	 * @param {Object} layerConfig 图层配置信息
	 * @returns {Object} 
	 */
	_buildGridStore : function(layerConfig){
		var me = this, resultStore = null,groupStoreAr = [],cacheStore,storeManager,keys,storeLength,store;
		
		if(!layerConfig){
			return Ext.create('Ext.data.Store');
		}
		//先从本容器的缓存中取，如果没有，再进行构造
		cacheStore =me.storeManager.get(layerConfig.type);
		if(cacheStore){
			resultStore = cacheStore;
		}else{
			//构造业务列表store对象
			resultStore = Ext.create('Ext.data.Store',{
				  proxy: {
				        type: 'memory',
				        reader: {
				            type: 'json'
				        }
				    }
			});
			
			storeManager = layerConfig.getStoreManager();
			keys = storeManager.keys();
			for(var i in keys){
				var store = storeManager.get(keys[i]);
				if(store){
					//监听store的数据修改事件，更新业务列表
					store.on('datachanged',me._reLoadData,me);
				}else{
					 me.logger.debug("[Dep.framework.editor.plugin.containers.BussList#_buildGridStore]没有store对象");
				}
			}
				me.storeManager.put(layerConfig.type,resultStore);				
		}
		return resultStore;
	},
	
	
	/**
	 * 重新加载业务列表数据
	 * @private
	 */
	_reLoadData : function(){
		var me = this,
		layer = me.getCurrentLayer(),
		storeManager =layer.getStoreManager(),
		stores = storeManager.values(),store,
		currentStore =me.storeManager.get(layer.type);
		
		if (!currentStore) {
			return;
		}
		//清除旧有数据
		currentStore.removeAll();
		//添加新record数据，如果是多个store，store数据全部添加（添加的全是引用对象）。
		for (var i in stores) {
			store = stores[i];
			if (store.isPort == 'true'&& me.filterStoreData) {//过滤port类型数据不显示
				continue;
			}
			store.each(function (record)  {
				currentStore.add(record);
				});
		}
	},
    /**
     * 监听选择事件
     * @param {Object} canvas  画布
     * @param {Object} figure  选择的图元
     * @private
     */
	_onSelectFigure: function (canvas, figure) {
		var me = this,model,isSelected,currentSelection;
		if (!figure) {
			me._clearSelection();
			return;
		}
		model = figure.getUserData();
		
		if (!me.getGridList()) {
			//TODO
			return;
		}
		
		isSelected = me.getGridList().getSelectionModel().isSelected(model);
		if (!isSelected) {//如果已经是选中状态，不更新，防止事件递归
			currentSelection = me.getGridList().getSelectionModel().getSelection( );
			currentSelection.push(model);
			me.getGridList().getSelectionModel().select(currentSelection); 
		}
	},
	/**
	 * @private
	 * 取消当前grid中的记录选中状态
	 */
	_clearSelection: function () {
		var me = this,currentSelection;
		if (!me.getGridList()) {
			//TODO
			return;
		}
		currentSelection = me.getGridList().getSelectionModel().getSelection( );
		if (!currentSelection || currentSelection.length == 0) {
			//如果当前没有任何选中，不用刷新。
			return;
		}
		me.getGridList().getSelectionModel().deselectAll(); 
	},
	/**
	 * @private
	 * 改变属性值后修改业务列表的内容
	 * @param {} record 当前记录
	 * @param {} value   新值
	 * @param {} oldValue 旧值
	 */
	_onChangeProp: function (record,value, oldValue) {
		var me = this;
		var currentSelection = me.getGridList().getSelectionModel().getSelection( );
		me._reLoadData();
		me.getGridList().getSelectionModel().select(currentSelection);//此代码加上有问题，后期需要测试
	},
	setGridList: function (gridPanel) {
		var me = this;
		me.gridPanel = gridPanel;
	},
	getGridList: function () {
		var me = this;
		return me.gridPanel;
	},
	/**
	 * 返回配置管理器
	 * @returns
	 */
	geBussListConfigManager : function(){
		var me = this;
		if (!me.bussListConfigManager) {
			me.bussListConfigManager = new Dep.framework.editor.manager.BaseManager();
		}
		return me.bussListConfigManager;
	},
	/**
	 * 获取当前图层
	 * @returns
	 */
	getCurrentLayer : function(){
		var me = this;
		return me.currentLayer;
	}
});