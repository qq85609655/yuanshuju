if (!window.JHE) {
	window.JHE = {};
}
if (!window.JHE.plugin) {
	window.JHE.plugin = {};
}
if (!window.JHE.plugin.busstoolbar) {
	window.JHE.plugin.busstoolbar = {};
}

/**
 * 业务工具条上的按钮
 */
JHE.plugin.busstoolbar.MDOptPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "JHE.plugin.busstoolbar.MDOptPlugin",
	
	CMPUSEFLAG : false,  //组合关系是否使用
	DEPUSEFLAG : false,  //依赖关系是否使用

	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		//----------------------
		me.regiestAction();
	},
	/**
	 * 注册Actions
	 */
	regiestAction : function(){
		var me = this;
		me.getContainer().regiestActions([{
			name : 'versionSearch',
			description : Dep.metadata.I18N.metadatamng.plugin.versionSearch,
			functionality : Ext.Function.bind(me.versionSearch, me),
			group : 'metadata'
		}]);
		me.getContainer().regiestActions([{
			name : 'mdshowTypeChange',
			description : "显示类型",
			functionality : Ext.Function.bind(me.mdshowTypeChange, me),
			group : 'metadata'
		}]);	
		me.getContainer().regiestActions([{
			name : 'queryMdshowTypeChange',
			functionality : Ext.Function.bind(me.queryMdshowTypeChange, me),
			group : 'layer'
		}]);
		me.getContainer().regiestActions([{
			name : 'changeShowMDType',
			functionality : Ext.Function.bind(me.changeShowMDType, me),
			group : 'layer'
		}]);
		
	},
	changeShowMDType : function(type){
		var me = this;
		if(type=="metadata"){
			var a =me.getContainer().getToolBarPanel().items.items[0];
			a.getBoxes()[0].setValue(true);
		}
	},
	mdshowTypeChange : function(e, obj){
		var me = this;
		var checkedVal = obj.getValue().showType; 
		if(checkedVal=="2"){
			me.toDependLayer();
		}else if(checkedVal=="1"){
			me.showMDLayer();
		}
	},
	queryMdshowTypeChange : function(e, obj){
		var me = this,flag=-1;
		var type = obj.getValue().showType ; 
		if(type){
			if(type.length==1){
				flag = type;
			}else if(type.length==2){
				flag = 3;
			}
		}
		me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","queryMdshow",flag);
	},
	/**
	 * 依赖管理功能
	 */
	dependMng : function() {
		var me = this;
	},
	/**
	 * 影响分析
	 */
	impactAnalysis : function() {
		var me = this;
		me.toAnalysisLayer("impactAnalysis");
		
	},
	/**
	 * 血统分析
	 */
	strainAnalysis : function() {
		var me = this;
		me.toAnalysisLayer("strainAnalysis");
	},
	/**
	 * 全链分析
	 */
	allAnalysis : function() {
		var me = this;
		me.toAnalysisLayer("allAnalysis");
	},
	/**
	 * 关联度分析
	 */
	associateAnalysis : function() {
		var me = this;
		me.toAnalysisLayer("associateAnalysis");
	},
	/**
	 * 切换到元数据分析图层
	 */
	toAnalysisLayer : function(type){
		var me = this;
		var analysisLayerObj = {"type" : "analyseMetadata","fGroups" : "metadata","name" : "元数据分析","desc" : "元数据分析","layout" : Dep.framework.editor.I18N.LAYOUT.SODUKU};
		me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","analyseMetadata",analysisLayerObj,type);
	},
	/**
	 * 返回元数据的显示图层
	 */
	showMDLayer : function(){
		var me = this;
		me.getContainer().executeActionSpanContainer ("Dep.framework.editor.plugin.containers.Layer","showMDLayer", null);
		
	},
	/**
	 * 进入依赖管理图层
	 */
	toDependLayer : function(){
		var me = this;
		me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","toDependLayer",null);	
	}
});