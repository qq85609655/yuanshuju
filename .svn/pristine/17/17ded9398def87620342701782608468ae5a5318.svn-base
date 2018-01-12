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
if (!Dep.framework.editor.plugin.containers.canvas) {
	Dep.framework.editor.plugin.containers.canvas = {};
}

/**
 * 展示图元菜单, 根据选中图元的菜单配置信息来展示其菜单
 */
Dep.framework.editor.plugin.containers.canvas.CanvasSliderPlugin = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.canvas.CanvasSliderPlugin",
	
	panel : null, //画布依赖的panel
	
	sliderVal : 0,
	/**
	 * 初始化视口插件
	 */
	init : function(container) {
		var me = this, canvas = null;
		me.setContainer(container);
		me.createSliderPanel(container);
		
		me.getContainer().regiestActions([{
			name : 'showCanvasSlider',
			functionality : Ext.Function.bind(me.showSliderWin, me),
			group : 'canvasSlider'
		}]);
		me.getContainer().regiestActions([{
			name : 'hideCanvasSlider',
			functionality : Ext.Function.bind(me.hideSliderWin, me),
			group : 'canvasSlider'
		}]);
		me.getContainer().regiestActions([{
			name : 'changeCanvasSliderVal',
			functionality : Ext.Function.bind(me.changeCanvasSliderVal, me),
			group : 'canvasSlider'
		}]);
		me.getContainer().regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE,
				function(panel) {
					me.panel = panel;
					//画布依赖的panel
					me.rePositionPanel(panel, me.getSliderWin());
			}, me);
		container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent.bind(me));
	},
	/**
	 * 在容器加载完成之后注册事件。 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
	 * 
	 * @param {Editor}
	 *            editor 编辑器
	 */	
	initEvent : function(editor) {
		var me = this;
	},	
	/**
	 * 创建滑块panel
	 * @param container
	 */
	createSliderPanel : function(container){
		var me = this,canvasPanel = me.getContainer().getCanvasPanel();
		me.sliderWin =Ext.create('Ext.window.Window', {
			closable : false,
			resizable : false,
			floatParent : canvasPanel,
			width : 80,
			height : 140,
			plain:true,
			header : false,
			frame: true,
			border : false,
			html : "<div class=\"sliderdiv\" style='margin: 6px 0 0 5px;'></div>"
		});	

	},	
	/**
	 * 显示滑块
	 */
	showSliderWin : function(){
		var me = this;
		me.sliderWin.show();
		me.rePositionPanel(me.panel,me.sliderWin);
		me.addSliderPlugins();	
	
	},
	addSliderPlugins : function(){
		var me = this;
		var content =$(".sliderdiv").html();
		if(content==""){
			$(".sliderdiv").slider({
				min: 0,
		        max: 2,
		        animate: true,
		        value: 0,
		        orientation: "vertical",
		        change : function(e,ui){
		        	var val = ui.value;
		        	if(val != me.sliderVal){
		        		me.setSliderVal(val);
		        		me.fireChangeDataMapDatasEvent(val);
		        	}
		        }
			});	
		    $('.sliderdiv').slider('pips', {
		        rest: 'number',
		        initValues :["服务","系统","节点"]
		    });			
		}else{
			$( ".sliderdiv" ).slider({ value: 0 });
		}
	},
	/**
	 * 隐藏滑块
	 */
	hideSliderWin : function(){
		var me = this;
		me.sliderWin.hide();
	},
	/**
	 * 获取滑块所在的窗口
	 * 
	 * @return {}
	 */
	getSliderWin : function() {
		return this.sliderWin;
	},
	/**
	 * 获取画布容器所在的窗口
	 * 
	 * @returns {*}
	 */
	getCanvasContainerPanel : function() {
		var me = this, canvasPanel = me.getContainer().getCanvasPanel();
		if (canvasPanel) {
			return canvasPanel;
		} else {
			throw "画布窗口未创建!";
		}
	},
	/**
	 * 当画布所在的窗口形状发生变化时,确保视口窗口和滚轴跟随进行移动
	 * @param {} parentPanel 画布所在窗口
	 * @param {} subPanel   需要跟随移动的窗口
	 * @param {} extendPanel 用来辅助计算的窗口,主要用来在重新定位miniBtn的时候使用.
	 * 这个参数是为了防止当所有其他窗口都折叠,画布窗口占满浏览器时,Btn按钮位于页面最右下角,这个时候鼠标无法向右下方移动了
	 */
	rePositionPanel : function(parentPanel, subPanel) {
		if(!subPanel || subPanel.isHidden())return ;
		
		var me = this, parentWidth = parentPanel.getWidth(), parentHeight = parentPanel
				.getHeight(), parentPanelPosition = parentPanel
				.getPosition(),subHeight = subPanel.getHeight();
		subPanel.setPosition(parentPanelPosition[0] + 10, parentPanelPosition[1] + parentHeight
						- subHeight -10);
	},
	/**
	 * 触发更改数据地图的事件
	 * @param val
	 */
	fireChangeDataMapDatasEvent : function(val){
		var me = this;
		me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Layer","changeSilderVal", val);
	},
	setSliderVal : function(val){
		var me = this;
		me.sliderVal = val;
	}
});