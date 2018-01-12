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
 * 数据管理器，管理编辑器内所有图层的数据.
 */
Dep.framework.editor.manager.DataManager = Dep.framework.editor.manager.BaseManager.extend({
	/**
	 * 类名
	 * @type String
	 */
	NAME : "Dep.framework.editor.manager.DataManager",
	/**
	 * 初始化日志类
	 */
	logger : log4javascript.getDefaultLogger("Dep.framework.editor.manager.DataManager"),
	/**
	 * @property {Dep.framework.editor.manager.ModelManager} modelManager 关联的模型管理器。 
	 */
	modelManager : null,

	/**
	 * @property {Dep.framework.editor.manager.BaseManager} layerManager 图层管理器。 
	 */
	layerManager : null,
	/**
	 * @property {String} editableLayer 可编辑图层唯一标识。 
	 */
	editableLayer : null,
	
	/**
	 * @property {String[]} visibleLayers 可视图层唯一标识。 
	 */
	visibleLayers : [],
	
	// 以下定义事件
	
	 /**
     * @event updateEditableLayer
     * @param {Dep.framework.editor.manager.BaseManager} 此数据管理器
     * @param {Dep.framework.editor.base.Layer} editableLayer 可编辑图层
     */

    /**
     * @event updateVisibleLayer
     * @param {Dep.framework.editor.manager.BaseManager} 此数据管理器
     * @param {String[]} visibleLayers 图元类型
     */
	
	
	/**
	 * 初始化数据管理器
	 * @param {Dep.framework.editor.manager.ModelManager}modelManager
	 */
	init : function(editor,modelManager) {
		var me = this;
		me._super();
		me.editor = editor;
		me.setModelManager(modelManager);
		me.layerManager = new Dep.framework.editor.manager.BaseManager();
	},
    /**
     * 根据图层配置信息更新图层
     * @param layerConfigs
     */
	updateLayerConfig : function(layerConfigs) {
		var layer,me = this;
		if (!layerConfigs || !layerConfigs.details) {
			return;
		}
		var data = layerConfigs.details;
		me.layerManager.removeAll();//清除旧配置
		if (data && data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				me.addLayer(data[i]);
			}
		}
	},
	
	/**
     * 添加图层
     * @param {Object}layerConfig 单个图层的配置信息
     * @param {Boolean }override 是否覆盖旧图层 default false
     * @return {Dep.framework.editor.base.Layer}layer
     */
	addLayer : function(layerConfig,override) {
		var layer, me = this;
		if (!layerConfig || !layerConfig.type) {//没有配置图层信息或者没有图层的type属性
			throw "[Dep.framework.editor.manager.DataManager#addLayer]没有配置图层配置信息或者没有配置图层的type属性！";
		}
		layer = me.layerManager.get(layerConfig.type);
		if (layer && !override) {//已经存在而且不要覆盖原有图层
			me.logger.debug('[Dep.framework.editor.manager.DataManager#addLayer]已经有此图层');
			return layer;
		}
		me.layerManager.remove(layerConfig.type);//删除旧的（如果有的话）
		
		layer = new Dep.framework.editor.base.Layer(me.editor, me.getModelManager(),
				layerConfig);
		// 注册事件监听事件
		layer.on("modelCreated", function(layer, store, records, index,
				eOpts) {
			me.fireEvent("modelCreated", layer, store, records, index,
					eOpts);

		}, me);
		layer.on("modelRemoved", function(layer, store, record, index,
				isMove, eOpts) {
			me.fireEvent("modelRemoved", layer, store, record, index,
					isMove, eOpts);

		}, me);
		layer.on("modelUpdated", function(layer, store, record,
				operation, eOpts) {
			me.fireEvent("modelUpdated", layer, store, record,
					operation, eOpts);
		}, me);

		layer.on("modelLoaded", function(layer, fType, store) {
			me.fireEvent("modelLoaded", layer, fType, store);
		}, me);
		layer.on("layerLoadData", function(layer, records) {
			me.fireEvent("layerLoadData", layer, records);
		}, me);
		layer.on("beforeModeladdToCanvas", function(models,fType,layer) {
			me.fireEvent("beforeModeladdToCanvas", models,fType,layer);
		}, me);
		layer.on("fTypeClear", function(layer,fType) {
			me.fireEvent("fTypeClear", layer,fType,me);
		}, me);
		// 存入缓存
		me.layerManager.put(layerConfig.type, layer);
		return layer;
	},

    /**
     * 向指定的图层添加指定类型的图元
     * @param {String} layerType 图层唯一标识符
     * @param {String} fType 图元唯一标识符
     * @param {Dep.framework.editor.model.BaseFigureModel/Object/Dep.framework.editor.model.BaseFigureModel[]/Object[]} records 添加的数据
     * @param {boolean}是否是新增模型   
     */
	add:function (layerType,fType, records,isNew) {
		var me = this,layer;
		if (!layerType) {//没有传递图层信息，默认为当前编辑图层
			if (!me.getCurrentEditLayer()) {
				return;
			}
			//取第一个编辑图层添加数据，目前实际情况仅有一个图层为编辑图层。
			layer = me.getCurrentEditLayer();
		}else {
			layer =
				me.getLayerManager().get(layerType);
		}
		var modelArray=layer.add(fType, records,isNew);
		return modelArray;
		
	},
	/**
	 * 创建模型对象
	 * @param {String} layerType 图层唯一标识符
	 * @param {String} fType 图元唯一标识符
	 * @param {Dep.framework.editor.model.BaseFigureModel/Object} record 创建数据对象
	 * @return 返回模型对象
	 */
	create:function (layerType,fType, record) {
		var me = this,layer;
		if (!layerType) {//没有传递图层信息，默认为当前编辑图层
			if (!me.getCurrentEditLayer()) {
				return;
			}
			//取第一个编辑图层添加数据，目前实际情况仅有一个图层为编辑图层。
			layer = me.getCurrentEditLayer();
		}else {
			layer =
				me.getLayerManager().get(layerType);
		}
		
		return layer.create(fType, record);
		
	},
	
	/**
	 * 根据图层信息，克隆数据
	 * @param {String} layerType 图层唯一标识符
	 * @param {Dep.framework.editor.model.BaseFigureModel/Object/Dep.framework.editor.model.BaseFigureModel[]/Object[]} records克隆的数据模型
	 */
	clone:function (layerType,records) {
		var me = this,layer;
		if (!layerType) {//没有传递图层信息，默认为当前编辑图层
			if (!me.getCurrentEditLayer()) {
				return;
			}
			//取第一个编辑图层添加数据，目前实际情况仅有一个图层为编辑图层。
			layer = me.getCurrentEditLayer();
		}else {
			layer =
				me.getLayerManager().get(layerType);
		}
		
		return layer.clone(records);
		
	},
    /**
     * 向指定的图层移除图元
     * @param {String} layerType 图层唯一标识符
     * @param {String} fType 图元唯一标识符
     * @param {Dep.framework.editor.model.BaseFigureModel/Object/Dep.framework.editor.model.BaseFigureModel[]/Object[]} records 添加的数据
     */
	remove:function (layerType,fType, records) {
		var me = this,layer;
		if (!layerType) {//没有传递图层信息，默认为当前编辑图层
			if (!me.getCurrentEditLayer()) {
				return;
			}
			//取第一个编辑图层添加数据，目前实际情况仅有一个图层为编辑图层。
			layer = me.getCurrentEditLayer();
		}else {
			layer =
				me.getLayerManager().get(layerType);
		}
		layer.remove(fType, records);
		
	},
	
	/**
	 * 根据类型获取图层
	 * @param {String} layerType 图层唯一标识符
	 * @return {Dep.framework.editor.base.Layer} 返回图层对象
	 */
	getLayer : function(lType) {
		var me = this;
		return me.getLayerManager().get(lType);

	},
	
	/**
	 *
	 * @return {Dep.framework.editor.manager.ModelManager} 返回模型管理器
	 */
	getModelManager : function() {
		var me = this;
		return me.modelManager;

	},

	/**
	 *
	 * @return {Dep.framework.editor.manager.ModelManager} 设置模型管理器
	 */
	setModelManager : function(modelManager) {
		var me = this;
		me.modelManager = modelManager;
	},
	/**
	 *
	 * @return {Dep.framework.editor.manager.BaseManager} 返回图层管理器
	 */
	getLayerManager : function() {
		var me = this;
		return me.layerManager;
		
	},
	
	/**
	 *
	 * @return {Dep.framework.editor.manager.BaseManager} 设置图层管理器
	 */
	setLayerManager : function(layerManager) {
		var me = this;
		me.layerManager = layerManager;
	},
	
	/**
	 *@param {String} layerId 图层唯一标识
	 * @return {Dep.framework.editor.base.Layer} 图层
	 */
	getLayerByKey : function(layerId) {
		var me = this;
		return me.getLayerManager().get(layerId);
	},
	

    /**
     * 设置编辑图层
      * @param layer 图层对象
     */
    setEditableLayer:function (layer) {
        var me = this;
        if (layer == null) {
            me.editableLayer = null;
            me._updateEditableLayerFigures();
            me.fireEvent('updateEditableLayer', me,  me.getCurrentEditLayer());
            return;
        }
        me.editableLayer = layer;
       me._updateEditableLayerFigures();
        me.fireEvent('updateEditableLayer', me,  me.getCurrentEditLayer());
    },

    /**
     *更新图元信息
     * @private
     */
    _updateEditableLayerFigures:function () {//TODO  方法需要改进
        var me = this,length,  keys = me.getLayerManager().keys(),key,layer;

        length = keys.length;
        //设置所有的图元为不可编辑
        for (var i = 0; i < length; i++) {
            key = keys[i];
            layer = me.getLayerManager().get(key);
            if (!layer || !layer.setEditable) {
            	me.logger.error("[Dep.framework.editor.manager.DataManager#_updateEditableFigures]没有找到图层配置信息，图层类型为：" + key);
                
                continue;
            }
            layer.setEditable(false);
        }
        //设置可见的图元为可编辑
        layer = me.getCurrentEditLayer();
        if (!layer) {
            return;
        }
        if (!layer.setEditable) {
        	me.logger.error("[Dep.framework.editor.manager.DataManager#_updateEditableFigures]没有找到图层配置信息!" );
        	return;
        }
        layer.setEditable(true);
    },
    /**
     *设置可见图层
     * @param fType {String/String[]} layer 图层唯一标识
     */
    setVisibleLayers:function (layer) {
        var me = this, layers;
        if (layer == null) {
            me.visibleLayers = [];
            me._updateVisibleFigures();
            me.fireEvent('updateVisibleLayer', me,  me.visibleLayers);
            return;
        }
        layers = layer;
        if (!Ext.isArray(layers)) {
            // 转换为数组
        	layers = [ layer ];
        }
        me.visibleLayers = layers;
        me._updateVisibleFigures();
        me.fireEvent('updateVisibleLayer', me,  me.visibleLayers);
    },




    /**
     *更新可视图层
     * @private
     */
    _updateVisibleFigures:function () {//TODO  方法需要改进
        var me = this,length,  keys = me.getLayerManager().keys(),key,layer;

        length = keys.length;
        //设置所有的图元为不可见
        for (var i = 0; i < length; i++) {
            key = keys[i];
            layer = me.getLayerManager().get(key);
            if (!layer || !layer.setVisible) {
            	me.logger.error("[Dep.framework.editor.manager.DataManager#_updateVisibleFigures]没有找到图层配置信息，图层类型为：" + key );
                continue;
            }
            layer.setVisible(false);
        }
        //设置可见的图元
        length =  me.visibleLayers.length;
        for (var i = 0; i < length; i++) {
        	layer = me.visibleLayers[i];
            if (!layer) {
                continue;
            }
            if (!layer.setVisible) {
            	me.logger.error("[Dep.framework.editor.manager.DataManager#_updateVisibleFigures]没有找到图层配置信息!" );
            	continue;
            }
            layer.setVisible(true);
        }
    },

   /**
    *
    * @return {String[]} 获取显示的数据类型
    */
   getVisibleFType:function () {
       var me = this;
      return  me.visibleLayers;
   },
    
    
    /**
    *
    *@param {String} layerType 图层唯一标识
    * @return {String[]} 获取显示的数据类型
    */
   getAllCUDDatas:function (layerType) {
       var me = this;layer = null;
       if (!layerType) {//如果没有传递参数，默认为当前编辑图层
    	   layer = me.getCurrentEditLayer();
       }else {
    	   layer = me.getLayerManager().get(layerType);
       }
       if (!layer) {
    		me.logger.error("[Dep.framework.editor.manager.DataManager#getAllCUDDatas]没有找到该图层信息：" + layerType ); 
    		return;
       }
      return  layer.getAllCUDDatas();
   },
   
   /**
   *
   *@param {String} layerType 图层唯一标识
   * @return {Dep.framework.editor.manager.BaseManager<String,Dep.framework.editor.manager.DataChangeManager>} 获取显示的数据类型
   */
  getLayerCUDDatas:function (layerType) {
      var me = this;layer = null;
      if (!layerType) {//如果没有传递参数，默认为当前编辑图层
   	   layer = me.getCurrentEditLayer();
      }else {
   	   layer = me.getLayerManager().get(layerType);
      }
      if (!layer) {
   		me.logger.error("[Dep.framework.editor.manager.DataManager#getAllCUDDatas]没有找到该图层信息：" + layerType ); 
   		return;
      }
     return  layer.getAllCUDDatas();
  },
   
   /**
   *
   *@param {String} layerType 图层唯一标识
   */
  clearCache:function (layerType) {
      var me = this;layer = null;
      if (!layerType) {//如果没有传递参数，默认为当前编辑图层
   	   layer = me.getCurrentEditLayer();
      }else {
   	   layer = me.getLayerManager().get(layerType);
      }
      if (!layer) {
   		me.logger.error("[Dep.framework.editor.manager.DataManager#clearCache]没有找到该图层信息：" + layerType ); 
   		return;
      }
     layer.clearCache();
  },
  
  /**
  *
  *@param {String} layerType 图层唯一标识
  */
 getCurrentEditLayer:function () {
     var me = this;
     return me.editableLayer;
 }

});

