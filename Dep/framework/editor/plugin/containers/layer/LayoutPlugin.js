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
Dep.framework.editor.plugin.containers.layer.LayoutPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.LayoutPlugin",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
		me.getContainer().regiestActions([ {
			name : "refreshLayout",
			description : "刷新布局",
//			icon : Dep.framework.editor.PATH + "img/canvas/exportTosvg.png",
			functionality : Ext.Function.bind(me._refreshLayout, me),
			group : 'dolayout'
		} ]);
	},
	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 这里是监其它容器的事件
	 * @param {Editor}
	 *            editor 编辑器
	 */
	_initEvent : function() {
		var me = this;
		me.getContainer().regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.AFTERREDRAWFIGURE, me._dataLoaded
				.bind(me), me, "Dep.framework.editor.plugin.containers.Canvas");
		me.getContainer().regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE, me._refreshLayout
				.bind(me), me, "Dep.framework.editor.plugin.containers.Canvas");
	},
	/**
     * @private
	 *  监听数据加载事件，重新layout界面数据
	 * @param {Object} layer  图层对象
	 * @param {String} fType  图元类型
	 * @param {} store
	 */
	_dataLoaded: function (layer,fType,store) {
		var me = this;
		me._doLayout(layer,true);
	},

	/**
     *  @private
	 *  监听画布变大变小事件，重新layout界面
	 */
	_refreshLayout:function () {
		var me = this, layer = null;
		if (me.getContainer().getCurrentEditLayer) {//设置默认图层
			layer = me.getContainer().getCurrentEditLayer();
		}
		if (!layer) {
			return;
		}
		me._doLayout(layer,true);//强制刷新
	},
	  /**
	 *  对指定图层数据进行布局
	 * @param {Dep.framework.editor.base.Layer}layer 图层对象
	 * @param {Boolean}refresh 是否要进行强制刷新。true-强制刷新； false-如果布局过，不再进行刷新
	 */
	_doLayout : function(layer, refresh) {
		var me = this,fTypes,figures = [],store,layoutType, executeLaoutContainer;
		if (layer.isLayouted() && !refresh) {
			 me.logger
          .debug("[Dep.framework.editor.base.Layer#_doLayout]已经布局过了！");
			return;
		}
  	
		fTypes = layer.getFigureTypes();
		if (!fTypes || fTypes.length ==0) {//没有任何类型图元数据
			return;
		}
		//获取所有的图元
		for (var i in fTypes) {
			fType = fTypes[i];
			store = layer.getDatasByType(fType);
			if (!store) {
				 me.logger
	             .debug("[Dep.framework.editor.plugin.containers.Layer#_doLayout]没有任何图元需要布局！");
				continue;
			}
			figures = figures.concat(me._parseModelsToFigures(store));
		}
		if (figures.length == 0) {
			return;
		}
		
		
		if (!layer.getLayout) {
			layoutType = Dep.framework.editor.I18N.LAYOUT.SODUKU;
		}else {
//			layout = Dep.framework.editor.ACTION.CANVAS.LAYOUT.CIRCLE;
			layoutType = layer.getLayout();
		}
		//要求画布容器执行命令
		if (!layoutType) {//没有配置任何布局，不执行命令
			return;
		}
		me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Canvas",Dep.framework.editor.ACTION.CANVAS.LAYOUT.DOLAY,figures,layoutType);
		if (layer.setIsLayouted) {
			layer.setIsLayouted(true);
		}
		
	},

	/**
     *  @private
	 *   获取指定类型数据的figure
	 * @param {Ext.data.store} store
	 * 
	 */
	_parseModelsToFigures : function(store) {
		var me = this,figures= [];
		if (!store) {
			return;
		}
		store.each(function (record) {
			if (record.getShape) {
				figures.push(record.getShape()); 
			}
		});
		return figures;
	}

});