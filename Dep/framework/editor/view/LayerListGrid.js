Ext.define('Dep.framework.editor.view.LayerListGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.LayerListGrid',
	columns : null,
	store : null,
	forceFit : true,
	/**
	 * @property 缓存当前编辑的图层记录信息
	 */
	currentEditorLayerRecord : null,
	viewConfig : {
		plugins: [Ext.create('Dep.framework.editor.view.plugin.GridDragDrop', {dragText:Dep.framework.editor.I18N.LAYERLISTGRID.DRAGTEXT})]
	},
	selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE",checkOnly:true,ignoreRightMouseSelection:true}),
	/**
	 * 构造器初始化配置信息
	 */
	constructor : function(config) {
		var me = this;
		if(config){
			me.title = config.title;
			me.columns = config.columns;
			me.store = config.store;
		}
		this.callParent();
	},
	listeners :{
		/**
		 * 将当前显示的最上层图层记录设置为红色
		 * @param grid
		 * @param eOpts
		 * @param rec  新的当前编辑图层
		 */
		viewready : function(grid,eOpts,rec){
			var me = this ,record,rowId;
			var view = me.getView(),store = me.getStore();
			
			if(me.currentEditorLayerRecord == rec){
				return ;
			}
			//将旧的编辑图层字体颜色还原
			if(me.currentEditorLayerRecord && me.getEl() && me.getEl().down("#"+view.getRowId(me.currentEditorLayerRecord))){
				me.getEl().down("#"+view.getRowId(me.currentEditorLayerRecord)).setStyle({color:"black"});	
			}
			//设置新的当前编辑图层字体颜色还原
			if(rec && me.getEl() && me.getEl().down("#"+view.getRowId(rec))){
				me.getEl().down("#"+view.getRowId(rec)).setStyle({color:"red"});	
			}			
			me.currentEditorLayerRecord = rec;
		}
	}
});