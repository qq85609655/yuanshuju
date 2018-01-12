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
 * 数据地图
 */
Dep.framework.editor.plugin.containers.layer.DataMapShow = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.DataMapShow",
	
	layCfg : {"type" : "metadata_datamap","fGroups" : "metadata","name" : "数据地图","desc" : "数据地图","layout" : Dep.framework.editor.I18N.LAYOUT.SODUKU},
	
	nodeDatas: new Ext.util.MixedCollection(),
	nodeDatas2: new Ext.util.MixedCollection(),
	
	currentLayerDataIndex :[],
	/**
	 * 数据地图的显示索引，总共4层
	 */
	dmShowIndex:1,
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
	 * 缓存所有的数据地图数据
	 */
	cacheDMAllData : null,
	cacheData : null,
	/**
	 * @param {plugin.Layer}
	 *            Layer 编辑器
	 */
	_initEvent : function() {
		var me = this;
		
		me.loadDataMapDatas();
		
		me.getContainer().regiestActions([ {
			name : "toShowDataMapLayer",
			functionality : Ext.Function.bind(me.toShowDataMapLayer, me),
			group : "dataMapLayer"
		}]);
		me.getContainer().regiestActions([ {
			name : "showDataMapByNodeIds",
			functionality : Ext.Function.bind(me.showDataMapByNodeIds, me),
			group : "dataMapLayer"
		}]);
		me.getContainer().regiestActions([ {
			name : "backToUpDMLayer",
			functionality : Ext.Function.bind(me.backToUpDMLayer, me),
			group : "dataMapLayer"
		}]);
		me.getContainer().regiestActions([ {
			name : "backToTopDMLayer",
			functionality : Ext.Function.bind(me.backToTopDMLayer, me),
			group : "dataMapLayer"
		}]);
		me.getContainer().regiestActions([ {
			name : "changeSilderVal",
			functionality : Ext.Function.bind(me.changeSilderVal, me),
			group : "dataMapLayer"
		}]);
	},
	/**
	 * 切换图层
	 * @param layerCfg
	 */
	changeLayer : function(layerCfg){
    	var me = this,layerCfg = layerCfg ? layerCfg : me.layCfg;
    	me.getContainer().bulidLayerObj(layerCfg);
    	me.getContainer().removeFiguresByLType(layerCfg.type);	
	},	
    /**
     * 显示数据地图图层
     */
	toShowDataMapLayer :function(){
		var me = this;
		me.loadDataMapDatas();
		me.changeLayer(me.layCfg);
		me.showFigues();
		
    },
    /**
     * 根据节点Ids展示数据地图
     */
    showDataMapByNodeIds : function(sourceId,targetId){
    	var me = this;
    	if(me.dmShowIndex<3){
        	var sNode = me.nodeDatas.get(sourceId);
        	var tNode = me.nodeDatas.get(targetId);
        	var nodes = me.getChildrenDatas(sNode, tNode);
        	me.fireShowFigureEvent(nodes, me.cacheData.lines);
        	me.dmShowIndex = me.dmShowIndex+1;  
        	
        	me.currentLayerDataIndex[me.dmShowIndex-1] = {nodes:nodes,lines:me.cacheData.lines};
        	
    	}else if(me.dmShowIndex==3){
    		//如果是第四层，则需要请求
    		var data = me.loadfourData(sourceId, targetId);
    		if(data){
    			me.fireShowFigureEvent(data.node, data.lines);
    			me.dmShowIndex = me.dmShowIndex+1; 
    			me.currentLayerDataIndex[me.dmShowIndex-1] = {nodes:data.node,lines:data.lines};
    		}else{
    			Dep.framework.editor.util.Msg.info("没有关系数据！","提示");
    		}
    	}

    	
    },
    /**
     * 加载第四层的数据地图
     * @param sourceId
     * @param targetId
     * @returns
     */
    loadfourData : function(sourceId,targetId){
    	var me = this;
    	if(!(sourceId && targetId)) return ;
    	var result =Fn.Request("metadata/getDataMapQuerySchema.do", false,  {startNodeId:sourceId,endNodeId:targetId},"查询数据地图失败！");   
    	if(!(result && result.result)){
    		return null;
    	} 
    	return result.result;
    },
    /**
     * 加载数据地图数据
     */
    loadDataMapDatas : function(){
    	var me = this,result=null;
    	if(!me.cacheDMAllData){
        	//查询数据地图
        	var result =Fn.Request("metadata/queryDataMap.do", false,  null,"查询数据地图失败！"); 
        	if(result && result.result){
        		me.cacheDMAllData = result.result;
        		me.setDataCache(result.result);
        		me.setDataCache2(result.result);
        	}  
    	}
    },
    /**
     * 解析获取到的数据地图原始数据
     */
    setDataCache : function(data){
    	var me = this;
    	me.cacheData= null;
    	if(!data)return ;
    	var datas = data.node,lines= data.lines;
    	for(var i=0;i<datas.length;i++){
    		me.nodeDatas.add(datas[i].nodeId,datas[i]);
    	}
    	me.cacheData = {nodes:datas,lines:lines};
    },
    /**
     * 数据地图数据分层保存
     */
    setDataCache2 : function(data){
    	var me = this,layer_node_0_Ar=[],layer_node_1_Ar=[],layer_node_2_Ar=[];
    	if(!data)return ;
    	me.nodeDatas2.removeAll();
    	var datas = data.node,lines= data.lines;
    	for(var i=0;i<datas.length;i++){
    		var node = datas[i];
    		layer_node_0_Ar.push({nodeId:node.nodeId,name:node.name,code:node.code,type:node.type});
    		if(node.children && node.children.length>0){
    			var datas1 = node.children;
    			for(var j=0;j<datas1.length;j++){
    				layer_node_1_Ar.push({nodeId:datas1[j].nodeId,name:datas1[j].name,code:datas1[j].code,type:datas1[j].type});
    				if(datas1[j].children && datas1[j].children.length>0){
    	    			var datas2 = datas1[j].children;
    	    			for(var k=0;k<datas2.length;k++){
    	    				layer_node_2_Ar.push({nodeId:datas2[k].nodeId,name:datas2[k].name,code:datas2[k].code,type:datas2[k].type});
    	    				me.nodeDatas2.add("layer_node_2",{nodeId:datas2[k].nodeId,name:datas2[k].name,code:datas2[k].code,type:datas2[k].type});
    	    			}
    	    		}
    			}
    		}
    	}
    	me.nodeDatas2.add("layer_node_0",layer_node_0_Ar);
    	me.nodeDatas2.add("layer_node_1",layer_node_1_Ar);
    	me.nodeDatas2.add("layer_node_2",layer_node_2_Ar);
    },
    /**
     * 获取子节点数据
     * @param node1  
     * @param node2
     * @returns {Array}
     */
    getChildrenDatas : function(node1,node2){
    	var me = this,resNode=[];
    	if(node1 && node2){
    		var cd1s = node1.children;
    		var cd2s = node2.children;
    		for(var i=0;i<cd1s.length;i++){
    			var node = cd1s[i];
    			me.nodeDatas.add(node.nodeId,node);
    			resNode.push({nodeId:node.nodeId,name:node.name,code:node.code,type:node.type});
    		}
    		for(var i=0;i<cd2s.length;i++){
    			var node = cd2s[i];
    			me.nodeDatas.add(cd2s[i].nodeId,cd2s[i]);
    			resNode.push({nodeId:node.nodeId,name:node.name,code:node.code,type:node.type});
    		}  
    	}
    	return resNode;
    },
    /**
     * 根据Id获取节点对象
     * @param nodeId
     * @returns
     */
    getNodeById : function(nodeId){
    	var me = this;
    	if(!nodeId)return null;
    	return me.nodeDatas.get(nodeId);
    },
    /**
     * 展示数据地图的图元
     */
    showFigues : function(){
    	var me = this;
    	var datas = me.cacheData;
    	if(!me.cacheData)return;
    	me.fireShowFigureEvent(datas.nodes, datas.lines);
    	me.dmShowIndex =1;
    	me.currentLayerDataIndex =[];
    	me.currentLayerDataIndex[me.dmShowIndex-1] = datas;
    	me.getContainer().executeActionSpanContainer("Dep.framework.editor.plugin.containers.Canvas","showCanvasSlider",null);
    },
	/**
	 * 触发展示分析图层图元的操作
	 * @param obj  参数
	 */
	fireShowFigureEvent : function(nodes,lines){
		var me = this;
		if(nodes){
			me.getContainer().showDataMapMD(nodes);
		}
		if(lines){
			me.getContainer().showDataMapLines(lines);
		}
	},
	changeSilderVal : function(val){
		var me = this;
		if(val===null)return ;
		var nodes =me.nodeDatas2.get("layer_node_"+val);
		var lines = me.cacheData.lines;
		if(nodes){
			me.getContainer().showDataMapMD(nodes);
			if(lines){
				me.getContainer().showDataMapLines(lines);
			}
		}
	},
	/**
	 * 返回上层的图层
	 */
	backToUpDMLayer : function(){
		var me = this;
		if(me.dmShowIndex==1){
			me.showFigues();
			return ;
		}
		var lg = me.currentLayerDataIndex.length;
		if(lg>1){
			//注： 当前显示的是lg-1的数据，要返回到上一层则为lg-2
			var data = me.currentLayerDataIndex[(lg-2)];
			me.fireShowFigureEvent(data.nodes, data.lines);
			me.currentLayerDataIndex.pop();
			me.dmShowIndex = me.dmShowIndex-1;
		}
	},
	/**
	 * 返回最顶层的数据地图
	 */
	backToTopDMLayer : function(){
		var me = this;
		me.showFigues();
	}
});