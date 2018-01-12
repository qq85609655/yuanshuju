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
Dep.framework.editor.plugin.containers.Layer = Dep.framework.editor.plugin.containers.BaseLayer.extend({
    NAME: "Dep.framework.editor.plugin.containers.Layer",
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

    currentMdDetailCache: null,

    layerCacheData: new Ext.util.MixedCollection(),

    cacheModels : new Ext.util.MixedCollection(), 

    modelListCache :[], //模型列表数据，供下拉框使用
    
    currentLayerFlag :"metadata",
    
    currentEditNodeData: null, //当前编辑的元数据节点数据
    
    letterAr : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    /**
     *  初始化事件绑定
     */
    _initEvent: function () {
        var me = this;
        me._initDatas();
        //初始化界面信息
        me._initView();   
        //注册事件
        me.regiestOnEvent("changeItemSelected", me.showMDDetail.bind(me), me, "Dep.framework.editor.plugin.containers.Layer");
        
		me.regiestActions([{
			name : 'showAnalysisLines',
			functionality : Ext.Function.bind(me.showAnalysisLines, me),
			group : 'analysis'
		}]);
		me.regiestActions([{
			name : 'showAnalysisMD',
			functionality : Ext.Function.bind(me.showAnalysisMD, me),
			group : 'analysis'
		}]);
		me.regiestActions([{
			name : 'clearDatasByLayerFlag',
			functionality : Ext.Function.bind(me.removeFiguresByLType, me),
			group : 'analysis'
		}]);		
		me.regiestActions([{
			name : 'changeViewType',
			functionality : Ext.Function.bind(me.changeViewType, me),
			group : 'layer'
		}]);		
		me.regiestActions([{
			name : 'showMDCategory',
			functionality : Ext.Function.bind(me.showMDCategory, me),
			group : 'layer'
		}]);		
		me.regiestActions([{
			name : 'showCategoryFigureDetail',
			functionality : Ext.Function.bind(me.showCategoryFigureDetail, me),
			group : 'layer'
		}]);		
		me.regiestActions([{
			name : 'closeCategoryFigureDetail',
			functionality : Ext.Function.bind(me.closeCategoryFigureDetail, me),
			group : 'layer'
		}]);		
		me.regiestActions([{
			name : 'queryMdshow',
			functionality : Ext.Function.bind(me.queryMdshow, me),
			group : 'layer'
		}]);		
		me.regiestActions([{
			name : 'updateFgBussData',
			functionality : Ext.Function.bind(me.updateFgBussData, me),
			group : 'layer'
		}]);		
		me.regiestActions([{
			name : 'showMDLayer',
			functionality : Ext.Function.bind(me.showMDLayer, me),
			group : 'layer'
		}]);		
        //监听画布中的信息
        me.raiseEvent(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,me);
    },
    /**
     * 初始化数据
     */
    _initDatas : function(){
    	var me = this;
    	me._super();
    	me.initModels();
    },
    /**
     *  @private
     *  初始化界面
     */
    _initView: function () {
        var me = this;
        me.initAllViews();
        me.getEditor().getEditorView().addToRegion(me.getContainerPanel(),
            'west');
    }, 
    /**
     * 初始化界面信息
     */
    initAllViews: function () {
        var me = this;
        me.containerPanel = me.containerPanel ? me.containerPanel : me.bulidLayerPanel();
        
        //以下四个win都为弹出窗口
        me.getMdBaseInfoWin();
//        me.bulidDependGridWin();
        me.buildMDPubInfoWin();
        me.buildMDAuditingWin();
        me.bulidAnalyseWin();
    },    
    /**
     * 初始化所有模型配置
     */
    initModels : function(){
    	var me = this,modelMng = me.getEditor().getModelManager(),figures=null;
    	var result = Fn.Request("metamodel/getAll.do",false,null);
    	if(result && result.result){
            figures =me.bulidFiguresCfg(result.result);
            modelMng.initModels(figures);
    	}
    },
    /**
     * 根据模型创建所有的图元配置
     */
    bulidFiguresCfg : function(cfgs){
    	var me = this,figures=[];
    	if(!cfgs)return ;
    	me.modelListCache=[];
    	for(var i=0;i<cfgs.length;i++){
    	    if(cfgs[i].name==null){continue;}
            var fg =me._buildFigureModel(cfgs[i]);
            if(fg)figures.push(fg);
            me.setCacheModels(cfgs[i].id, cfgs[i]);
            me.modelListCache.push({id:cfgs[i].id, name:cfgs[i].name, code:cfgs[i].code});
    	}
        return figures;
    },
    /**
     * 创建单个图元配置
     * @param cfg 此配置为model（其中包含模型的基本信息及attList属性信息）
     */
    _buildFigureModel : function(cfg){
        var me = this,figure={};
        if(!cfg)return null;
        //公共字段配置
        var comFieldCfg = [{
                "name": "id",
                "type": "String"
            },
            {
                "name": "mdCode",
                "type": "String"
            },
            {
                "name": "mdName",
                "type": "String"
            }];
        //公共属性配置
        var comPropsCfg =[
            {
                "name": "代码",
                "propertiesName": "mdCode",
                "xtype": "textField"
            },
            {
                "name": "名称",
                "propertiesName": "mdName",
                "xtype": "textField"
            }
        ];
        var attList = cfg.attList;
        for(var i=0;i<attList.length;i++){
            var att = attList[i];
            comFieldCfg.push({"name":att.code,"type":"String"});
            comPropsCfg.push({"name": att.name,"propertiesName": att.code,"xtype": "textField"});
        }
        
        //图元配置
        figure ={
            fName :cfg.name,
            fType : cfg.code,
            description:cfg.name,
            groupId : "metadata",
            img : cfg.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+cfg.graphSvg : "Dep/metamodel/modelmng/editor/img/MetaModel.png",  //获取默认图片
            viewConfig:{width:32,height:32,isShowFigureStatus:false},
            persistentViewAttributes:["x","y","dimension"],
            isPort: "false",
            isConnection: "true",
            isNoBussConnection: "false",  //不是业务图元
            api:null,
            port:null,
            statuEnums : null,
            contextMenus : null,
            businessModel:{
                fields :comFieldCfg,
                validations:[],
                api:null
            },
            properties :{
                details:comPropsCfg
            },
            viewModel : {
                fields :[
                    {
                        "name": "id",
                        "type": "String"
                    },{
                        "name": "viewData",
                        "type": "String",
                        "defaultValue": ""
                    }
                ]
            }
        };
        return figure;
    },
    /**
     * 设置元模型缓存对象
     * @param mmId
     * @param model 此模型中包含模型的基本信息及attList属性信息
     */
    setCacheModels :function(mmId,model){
    	var me = this;
    	if(mmId && model){
    		me.cacheModels.add(mmId,model);
    	}
    },
    /**
     * 获取元模型缓存对象
     * @param mmId  模型Id
     * @returns  model  返回一个元模型的model（包含模型的基本信息及attList属性信息）
     */
    getCacheModels : function(mmId){
    	var me = this;
    	if(!mmId)return null;
    	return me.cacheModels.get(mmId);
    },
    /**
     * 创建图层panel
     */
    bulidLayerPanel: function () {
        var me = this,
        treePanel = me.bulidMDTreePanel(),
        auditPanel = me.bulidMDAuditingPanel(),
        queryPanel = me.bulidMDQueryPanel();
        var panel = Ext.create('Ext.panel.Panel', {
            layout: "fit",
            items: [treePanel, auditPanel, queryPanel]
        });
        //初始化显示元数据树panel
        me.changePanelVisible(0);
        return panel;
    },
    /**
     * 切换显示panel
     * @param flag  【0：元数据panel；1：查询界面panel；2：审核界面panel】
     */
    changePanelVisible: function (flag) {
        var me = this;
        if (flag === 1) {
            me.treePanel.setVisible(false);
            me.mdQueryPanel.setVisible(true);
            me.mdAuditingPanel.setVisible(false);
        } else if (flag === 2) {
            me.treePanel.setVisible(false);
            me.mdQueryPanel.setVisible(false);
            me.mdAuditingPanel.setVisible(true);
            me.mdAuditingPanel.refreshNode();
            
        } else {
            me.treePanel.setVisible(true);
            me.mdQueryPanel.setVisible(false);
            me.mdAuditingPanel.setVisible(false);
        }
    },
    /**
     * 创建元数据树菜单Panel
     */
    bulidMDTreePanel: function () {
        var me = this;
        if (!me.metadataStore) {
            me.metadataStore = Ext.create("Dep.metadata.metadatamng.store.MDTreeStore");
        }
        if (!me.treePanel) {
            me.treePanel = Ext.create("Dep.metadata.metadatamng.view.MDTreePanel", {
                store: me.metadataStore,
                parentcontainer: me
            });
        }
        if(!me.viewStore){
        	me.viewStore = Ext.create("Dep.metadata.viewmng.store.UserViewTreeStore");
        	me.viewStore.on({
        		load : function(records, operation, success){
        			me.treePanel.updateDockedItems(records);
        		}
        	});
        }        
        return me.treePanel;
    },
    /**
     * 创建元数据查询panel
     * @returns
     */
    bulidMDQueryPanel: function () {
        var me = this;
        if (!me.metadataQueryStore) {
            me.metadataQueryStore = Ext.create("Dep.metadata.metadatamng.store.MDQueryTreeStore");
        }
        if (!me.mmStore) {
            me.mmStore = Ext.create('Ext.data.Store', {
            	singleton : true, 
            	autoLoad:true,
            	storeId:'mmComboStore', 
            	fields:[ 
			            {name:'id', type: 'string'}, 
			            {name:'name',type:'string'}  
			        ], 
			    data:me.modelListCache
            });
        }
        if (!me.mdQueryPanel) {
            me.mdQueryPanel = Ext.create("Dep.metadata.metadatamng.view.MDQueryPanel", {
                treeStore: me.metadataQueryStore,
                parentcontainer: me,
                modelStore: me.mmStore
            });
        }
        return me.mdQueryPanel;
    },
    /**
     * 创建审核Panel
     */
    bulidMDAuditingPanel: function () {
        var me = this;
        if (!me.metadataAuditingStore) {
            me.metadataAuditingStore = Ext.create("Dep.metadata.metadatamng.store.MDAuditingTreeStore");
        }
        if (!me.mdAuditingPanel) {
            me.mdAuditingPanel = Ext.create("Dep.metadata.metadatamng.view.MDAuditingPanel", {
                store: me.metadataAuditingStore,
                parentcontainer: me
            });
        }
        return me.mdAuditingPanel;
    },
    /**
     * 创建元数据发布的窗口
     * @returns
     */
    buildMDPubInfoWin : function(){
    	var me = this;
    	if(!me.mdPubInfoWin){
    		me.mdPubInfoWin = Ext.create("Dep.metadata.metadatamng.view.MDPubInfoWin",{parentContainer: me});
    	}
    	return me.mdPubInfoWin;
    },
    /**
     * 创建审核窗口
     * @returns
     */
    buildMDAuditingWin : function(){
    	var me = this;
    	if(!me.mdAuditingWin){
    		me.mdAuditingWin = Ext.create("Dep.metadata.metadatamng.view.MDAuditingWin",{parentContainer: me});
    	}
    	return me.mdAuditingWin;
    },
    /**
     * 创建添加依赖关系的弹出gridpanel的win
     */
    bulidDependGridWin : function(){
    	var me = this;
    	if(!me.dependMDStore){
    		me.dependMDStore = Ext.create("Dep.metadata.metadatamng.store.MDStore");  //元数据store
    	}
    	if(!me.MDDependWin){
    		me.MDDependWin = Ext.create("Dep.metadata.metadatamng.view.MDDependWin",{store:me.dependMDStore,parentContainer:me});
    	}
    	return me.MDDependWin;
    },
    /**
     * 获取元数据编辑界面的win
     */
    getMdBaseInfoWin: function () {
        var me = this;
        if (!me.mdBaseInfoWin) {
            me.mdBaseInfoWin = Ext.create("Dep.metadata.metadatamng.view.MDBaseInfoWin", {parentContainer: me,modelListCache:me.modelListCache});
        }
        return me.mdBaseInfoWin;
    },
    /**
     * 创建分析界面的窗口
     */
    bulidAnalyseWin : function(){
    	var me = this;
        if (!me.mdAnalyseWin) {
            me.mdAnalyseWin = Ext.create("Dep.metadata.metadatamng.view.AnalyseWin");
        }
        return me.mdAnalyseWin;    	
    },
    /**
     * 显示图层
     * @param ltype  图层类型
     */
    showLayer: function(ltype){
    	var me = this,ltype = ltype ? ltype : "metadata",mdLayerObj=null;
        //判断是否是当前显示图层，如果不是，需要重新获取图层
        var layer = me.getCurrentDisplayLayer();
        if(!(layer && layer.type == ltype)){
        	//默认图层
            mdLayerObj = {"type": ltype,"flag":"metadata","fGroups": "metadata","name": "元数据","desc": "元数据","layout": Dep.framework.editor.I18N.LAYOUT.SODUKU};
            me.bulidLayerObj(mdLayerObj);
        }
        if(ltype!="metadata_datamap"){
        	
        	me.executeActionSpanContainer("Dep.framework.editor.plugin.containers.Canvas","hideCanvasSlider", null);
        }else{
        	me.executeActionSpanContainer("Dep.framework.editor.plugin.containers.Canvas","showCanvasSlider", null);
        }
        
      //为图层添加属性r
        layer = me.getCurrentDisplayLayer();
        
        layer.currentEditorNode = me.currentEditNodeData;
        layer.propsCache = me.getMMProps(me.currentEditNodeData.raw.cacheData.mmId);//元模型的属性信息
    },
    /**
     * 点击元数据树节点，显示该元数据详情
     * @param rec  元数据树上的节点rec对象
     * @param ltype 图层类型
     * @param isEditMD  是否是编辑图层（主要是区分编辑主元数据图元和编辑关系两种类型的图层）
     */
    showMDDetail: function (rec, ltype,isEditMD) {
        var me = this;
        me.removeFiguresByLType(ltype);
        me.currentEditNodeData = rec ;
        me.showLayer(ltype);
        me.getMdDetail(rec.raw.id,isEditMD);
        me.showLayerFigure();
        me.executeActionSpanContainer("Dep.framework.editor.plugin.containers.BussToolBar","changeShowMDType","metadata");
    },
    /**
     *
     * 构造图层对象
     * obj:{
	 * 	type:XX, //图层类型
	 * 	fGroups:XX,  //所属组
	 * 	name:XX,  //名称
	 *  desc:XX,  //描述
	 *  layout:soduku //布局
	 * }
     *
     */
    bulidLayerObj: function (obj) {
        var me = this,layer =null;
        //添加元数据图层
        if (!obj) {
            return null;
        } else if (!(me.getCurrentEditLayer() && (me.getCurrentEditLayer().type == obj.type))) {
            //如果不是当前图层，则需要添加
            var type = obj.type, dataManager = me.getEditor().getDataManager();
            layer = dataManager.addLayer(obj, false);
            me.changeCurrentEditLayer(layer);
            me.changeCurrentDisplayLayers(layer);
        }
        return layer;
    },

    /**
     * 获取元数据详情
     * @param mdId  元数据Id
     * @param isEditMD  是否是编辑图层
     * @returns
     */
    getMdDetail: function (mdId,isEditMD) {
        var me = this,isEditMD = (typeof(isEditMD) != "undefined") ? isEditMD : 1;
        //判断如果缓存没有或者缓存中的元数据不是所点击的元数据，则需要重新请求
        if (!me.currentMdDetailCache || me.currentMdDetailCache.id != mdId) {
        	me.currentMdDetailCache = me.getDetailByAjax(mdId, isEditMD);
        }
        return me.currentMdDetailCache;
    },
    /**
     * 根据参数获取详情
     */
    getDetailByAjax : function(mdId,isEditMD){
    	var me = this;
    	var result = Fn.Request("metadata/getDetail.do", false, {metadataId: mdId,isEditMD:isEditMD});
    	return result ? (result.result ? result.result : null) : null; 
    },
    /**
     * 获取属性信息
     * @param mmId  模型Id
     * @returns
     */
    getMMProps: function (mmId) {
        var me = this,model =me.getCacheModels(mmId),attList=[];
        if(model&&model.attList){
        	attList = model.attList;
        }
        return attList;
    },
    /**
     * 显示图层图元
     */
    showLayerFigure: function (flag) {
        var me = this;
        var lType = me.getCurrentEditLayer().type;  //图层类型
        var id = me.currentEditNodeData.raw.id; //当前编辑的元数据节点
        var data = me.getCacheLayerData(lType, id); //判断当前图层上是否已经有缓存数据
        if (!data) {
            //向图层缓存中添加当前记录
            me.setLayerCacheData(lType, me.currentMdDetailCache);
            
            var  mmId = me.currentMdDetailCache.mmId;
            var mmCode = me.getCacheModels(mmId).code;
            var source = me.changeDataToPropsData(me.currentMdDetailCache);
            source.name = source.mdName;
            var fgId = source.id;
            //显示主元数据图元
            me.currentMdDetailCache.fgId =fgId;//将主图元的Id缓存
            if(lType =="queryLayer"){
            	me.showMetaFigure(fgId,mmCode, source,300,30);
            	me.showQueryLayerFgs(id, fgId,(flag ? flag : 3));
            }else {
            	me.showMetaFigure(fgId,mmCode, source);
            	//如果是元数据编辑图层，则需要展示组合关系
            	if(lType =="metadata" && me.getCurrentLayerFlag()=="metadata"){
                	me.showCompFigures(id,fgId);
                }
            }
        }
    },
    /**
     * 展示主图元信息
     * @param fgId 图元的Id
     * @param mmCode  模型Code，此code所代表的模型在初始化时，已缓存到模型管理器中
     * @param data
     */
    showMetaFigure : function(fgId,mmCode,data,x,y){
    	var me = this;
    	var id = data.id,mdX = x ? x : 30,mdY = y ? y : 30;
        me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
        		mmCode, {
                id: data.id,
                mdName: data.mdName,
                mdCode: data.mdCode,
                viewData: {
                    id: fgId,
                    viewData: Ext.JSON.encode({x: mdX, y: mdY})
                },
                bussData: data
        });    	
    },
    /**
     * 展示组合关系图元
     *  @param id  主元数据Id
     *  @param fgId  主元数据图元Id
     */
    showCompFigures : function(id,fgId){
    	var me = this;
    	var node = me.treePanel.getStore().getNodeById(id);
    	if(!node)return ;
    	//获取元数据下的模型分类
    	var childs = node.childNodes;
    	if(!childs)return;
    	var base_x = 160;
    	var mmCount = childs.length;  //模型分类数
    	
    	for(var i=0;i<childs.length;i++){
    		var mmFgId =childs[i].raw.id;
    		me.showMMFigure(childs[i].raw.id, childs[i].raw.text,mmFgId,fgId,base_x,(i*120)+30);
    	}
    },
    /**
     * 显示查询元数据土城上的其他图元
     * @param id
     * @param fgId
     */
    showQueryLayerFgs :function(id,fgId,flag){
    	var me = this,isZhFlag = true;
    	//查询组合关系图元/依赖关系图元
    	var result = Fn.Request("analyse/associateAnalysis.do", false, {metadataId: id});
		
		var res = me.getZhAndYlIds(result.result,fgId);
		if(res!=null){
			var mdData = result.result.node,zhX=500,ylX=50,zhY=-50,ylY=-50,x=0,y=0;
			for(var i=0;i<mdData.length;i++){
				var mdId = mdData[i].nodeId,mmId =mdData[i].mmId,code = mdData[i].code ;
				var mmCode = me.getCacheModels(mmId).code;
				
				if(!(Ext.Array.contains(res.zhAr,mdId) || Ext.Array.contains(res.ylAr,mdId))){
					continue;
				}
				if(Ext.Array.contains(res.zhAr,mdId) && (flag==1 || flag==3)){
					isZhFlag = true;
					zhY +=80;
					x = zhX;
					y=zhY;
				}else if(Ext.Array.contains(res.ylAr,mdId) && (flag==2 || flag ==3)){
					isZhFlag = false;
					ylY +=80;
					x = ylX;
					y=ylY;
				}else {
					continue;
				}
				//绘制组合
				me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
	            		mmCode, {
	                        id: mdId,
	                        mdName: name,
	                        mdCode: code,
	                        viewData: {
	                            id: mdId,
	                            viewData: Ext.JSON.encode({x: x, y: y})
	                        },
	                        bussData: {mdName:mdData[i].name,mdCode:mdData[i].code,id:mdId,name:mdData[i].name}
	            });
				me.showLines(id, mdId, isZhFlag ? "组合" : "依赖");
			}
		}
    },
	/**
	 */
	getZhAndYlIds : function(result,fgId){
		if(!result) return null;
		var me= this,lines = result.lines,res=[],zhAr=[],ylAr=[],ids=[];
		for(var i=0;i<lines.length;i++){
			var startId = lines[i].startNodeId;
			var endId = lines[i].endNodeId;
			var lineName = lines[i].name;
			if(lineName=="组合关系" && fgId==startId){
				zhAr.push(endId);
			}else if(lineName=="依赖关系" && fgId==startId) {
				ylAr.push(endId);
			}
		}
		return {zhAr:zhAr,ylAr:ylAr};
	},
    /**
     * 展示分类（A,B,C····）
     */
    showMDCategory : function(figure){
    	var me = this,mapData = new Ext.util.MixedCollection(),id = me.currentMdDetailCache.id,objId = figure.getId();
    	var node = me.treePanel.getStore().getNodeById(id);
    	if(!node)return ;
//    	me.removeRelationsFigures(figure);
    	var ar =me.getCategoryOtherFigures(figure);
    	ar.push(figure);
    	for(var i=0;i<ar.length;i++){
    		me.removeRelationsFigures(ar[i]);
    	}    	
    	var base_x = 300;
    	//获取元数据下的模型分类
    	var childs = node.childNodes;
    	for(var i=0;i<childs.length;i++){
    		if(childs[i].raw.id==objId){
    			var childrens = childs[i].raw.children;
    			var groupdata = me._groupMDs(childrens);
    			//绘制字母分类图元
    			if(groupdata){
    				//遍历字母
    				var m =0;
    				for(var j=0;j<me.letterAr.length;j++){
    					var ar = groupdata.get(me.letterAr[j]);
    					var fgId = objId+"_"+me.letterAr[j];
    					if(ar && ar.length>0){
    						me.showMMFigure(fgId, me.letterAr[j]+"（"+ar.length+"）",fgId,objId,base_x,(m*80)+30,"lettertype");
    						m++;
    					}
    				}
    			}
    			break;
    		}
    	}
    	
    },
    /**
     * 展示详情
     */
    showCategoryFigureDetail : function(figure){
    	var me = this,mapData = new Ext.util.MixedCollection(),id = me.currentMdDetailCache.id,objId = figure.getId();
    	var letter = (objId.split("_"))[1],ftype = (objId.split("_"))[0];
    	var node = me.treePanel.getStore().getNodeById(id);
    	if(!node)return ;
    	var ar =me.getCategoryOtherFigures(figure);
    	ar.push(figure);
    	for(var i=0;i<ar.length;i++){
    		me.removeRelationsFigures(ar[i]);
    	}
//    	var base_x = 500,base_y=30;
    	var base_x = figure.getX()+350,base_y=figure.getY();
    	//获取元数据下的模型分类
    	var childs = node.childNodes;
    	for(var i=0;i<childs.length;i++){
    		if(childs[i].raw.id==ftype){
    			var childrens = childs[i].raw.children;
    			var groupdata = me._groupMDs(childrens);
    			//绘制字母分类图元
    			if(groupdata){
    				//遍历字母
    				var ar = groupdata.get(letter);
    				var count = ar.length;
    				for(var j=0;j<count;j++){
    					var md = ar[j];
    					me.showSubFigure(md.id, md.mdName, md.mdCode, ftype, objId, base_x, base_y);
    					base_y +=60;
    				}	
    			}
    			break;
    		}
    	}    	
    },
    closeCategoryFigureDetail : function(figure){
    	var me = this;
    	var ar =me.getCategoryOtherFigures(figure);
    	ar.push(figure);
    	for(var i=0;i<ar.length;i++){
    		me.removeRelationsFigures(ar[i]);
    	}    	
    },
    queryMdshow : function(val){
		var me = this;
		me.removeFiguresByLType("queryLayer");
		
		var id = me.currentEditNodeData.raw.id; //当前编辑的元数据节点
		var  mmId = me.currentMdDetailCache.mmId;
        var mmCode = me.getCacheModels(mmId).code;
        var source = me.changeDataToPropsData(me.currentMdDetailCache);
        source.name = source.mdName;
        var fgId = source.id;
        
		me.showMetaFigure(id,mmCode, source,300,30);
//    	me.showQueryLayerFgs(id, fgId,(flag ? flag : 1));
		me.showLayerFigure(val);
    },
    /**
     * 将元数据集合分组(A,B,C---)
     */
    _groupMDs : function(data){
    	var me = this,map=new Ext.util.MixedCollection();
    	if(!data)return ;
    	for(var i=0;i< me.letterAr.length;i++){
    		var ar =[];
    		for(var j=0;j<data.length;j++){
    			var md = data[j].cacheData,top = md.top;
    			if(me.letterAr[i] == top){
    				ar.push(md);
    			}
    		}
    		if(ar.length>0)map.add(me.letterAr[i],ar);
    	}
    	return map;
    },
    /**
     * 移除/隐藏关联的图元
     */
    removeRelationsFigures : function(figure){
    	var me = this;
    	if(!figure)return ;
    	var conns = figure.getConnections(),id = figure.getId();
    	if(conns && conns.data.length>0){
        	conns.each(function(i,data){
        		var fg = data.getTarget().getParent();
        		var sfg = data.getSource().getParent();
        		//清除子类
        		if(fg.getId() != id){
            		var cns = fg.getConnections();
            		me.removeRelationsFigures(fg);
            		//删除节点
            		var model = fg.getUserData();
            		me.getEditor().executeAction(
            				Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, model.fType, model); 
            		//删除线
            		var line = data.getUserData();
        			me.getEditor().executeAction(
            				Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL, null, line.fType, line);         			
        		}
        	});    		
    	}
    },
    /**
     *  获取分类的其他图元
     */
    getCategoryOtherFigures : function(fg){
    	var me = this;
    	var conns = fg.getConnections(),id = fg.getId(),result=[];
    	if(conns && conns.data.length>0){
        	conns.each(function(i,data){
        		var sfg = data.getSource().getParent();
        		var tfg = data.getTarget().getParent();
        		if(tfg.getId()==fg.getId()){
            		var sCns = sfg.getConnections();
            		sCns.each(function(j,d){
            			if(d.getSource().getParent().getId()==sfg.getId()){
            				var tfg = d.getTarget().getParent();
                			if(tfg.getId()!=fg.getId()){
                				result.push(tfg);
                			}
            			}
            		});        			
        		}
        	});    		
    	} 
    	return result;
    },
    /**
     * 展示线图元，此线没有业务含义
     * @param srcNodeId  源图元的id
     * @param targetNodeId  目的图元的id
     */
    showLines : function(srcNodeId,targetNodeId,name){
    	var me = this;
    	if(srcNodeId == targetNodeId)return ;
		me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
				"compLine", {
					"viewData" : {
						viewData : Ext.JSON.encode({
									srcNodeId : srcNodeId,
									targetNodeId : targetNodeId,
									shape : "Dep.framework.editor.figure.NoBussConnection1",
									name: name
								})
					},
					"bussData" : {
						srcLogicNodeId : srcNodeId,
						destLogicNodeId : targetNodeId
					}
		});
    },
    /**
     * 创建模型分类图元
     * @param id   分类Id
     * @param name 分类名字（模型名）
     * @param parentId 主图元Id
     * @param x
     * @param y
     */
    showMMFigure : function(id,name,mmFgId,parentId,x,y,type){
    	var me = this,bussData ={id:id,mdName:name,name:name};
    	if(id && name){
    		//获取模型分类的code
    		var model = me.getCacheModels(id);
    		if(model){
    			bussData = {id:id,mdName:name,mdCode: model.code,name:name};
    		}
    		type = type ? type : "mdtype";
    		
            me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
            		type, {
                        id: id,
                        mdName: name,
                        viewData: {
                            id: mmFgId,
                            viewData: Ext.JSON.encode({x: x, y: y})
                        },
                        bussData: bussData
            });   
            me.showLines(parentId,mmFgId);
    	}
   	
    },
    /**
     * 创建子元数据图元
     * @param id
     * @param name
     * @param mdCode    元数据code
     * @param mmCode    模型code
     * @param parentId  分类图元Id
     * @param x
     * @param y
     */
    showSubFigure : function(id,name,mdCode,mmCode,parentId,x,y){
    	var me = this,data = null;
    	if(id && name){
    		//获取该图元详情
//    		var result =me.getDetailByAjax(id, 1);
//    		if(result){
//    			data = me.changeDataToPropsData(result);
//    			data.name = data.mdName;
//    		}else{
//    			data = {id:id,mdName:name,mdCode: mdCode,name:name};
//    		}
    		data = {id:id,mdName:name,mdCode: mdCode,name:name};
    		var subMdFgId =id;
            me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
            		mmCode, {
                        id: id,
                        mdName: name,
                        mdCode: mdCode,
                        viewData: {
                            id: subMdFgId,
                            viewData: Ext.JSON.encode({x: x, y: y})
                        },
                        bussData: data
            }); 
            me.showLines(parentId,subMdFgId);
    	}
    },
    updateFgBussData : function(id,fg){
    	var  me = this;
    	var res = me.getDetailByAjax(id, 1);
    	var data = me.changeDataToPropsData(res);
		data.name = data.mdName;
		fg.getUserData().updateBussData(data);
    },
    /**
     *  将model中获取的数据转换成属性source----供编辑属性界面使用
     */
    changeDataToPropsData: function (data) {
        var me = this, source = {}, sourceCfg = {};
        if (data) {
            source = {
                "id": data.id,
                "mmName": data.mmName,
                "mdCode": data.mdCode,
                "mdName": data.mdName
            };
            sourceCfg = {
                "元模型": data.mmName,
                "代码": data.mdCode,
                "名称": data.mdName
            };
            var modelId = data.mmId;
            var mmProps = me.getMMProps(modelId);
            if (mmProps) {
                var attList = data.attList;
                for (var i = 0; i < mmProps.length; i++) {
                    var text = mmProps[i].name;
                    var code = mmProps[i].code;
                    for (var j = 0; j < attList.length; j++) {
                        if (attList[j].mmAttName == code || attList[j].mmAttName == text) {
                            sourceCfg[text] = attList[j].valUe;
                            source[code] = attList[j].valUe;
                            break;
                        }
                    }
                }
            }
        }
        return source;
    },
    /**
     * 显示元数据基本信息win
     * @param flag  [true:新增;false:编辑]
     */
    showMdBaseInfoWin: function (flag, id) {
        var me = this, win = me.getMdBaseInfoWin(),data=null;
        win.setWinType(flag);
        win.show();
        if (!flag) { //编辑
            var detail = me.getMdDetail(id);
            if (detail) {
            	//基本信息
            	data ={
            			id: detail.id,
            			mdCode :detail.mdCode,
            			mdName :detail.mdName,
            			mmId : detail.mmId
            	};
            	//扩展的属性信息
                if (detail.attList && detail.attList.length > 0) {
                    for (var i = 0; i < detail.attList.length; i++) {
                    	data[detail.attList[i].mmAttName] = detail.attList[i].valUe;
                    }
                }
            }
            win.setValues(data);
        }
    },    
    /**
     * 设置缓存数据
     * @param layerType
     * @param data
     */
    setLayerCacheData: function (layerType, data) {
        var me = this;
        var id = data.id;
        var dataMap = me.layerCacheData.get(layerType);
        if (!dataMap) {
            dataMap = new Ext.util.MixedCollection();
            me.layerCacheData.add(layerType, dataMap);
        }
        var dt = dataMap.get(id);
        if (!dt) {
            dataMap.add(id, data);
        }
    },
    /**
     * 从缓存中取数据
     * @param layerType
     * @param id
     * @returns
     */
    getCacheLayerData: function (layerType, id) {
        var me = this, data = null;
        var dataMap = me.layerCacheData.get(layerType);
        if (dataMap) {
            data = dataMap.get(id) ? dataMap.get(id) : null;
        }
        return data;
    },
    /**
     * 加载依赖关系
     */
    loadDependMds : function(){
    	var me = this,mdId = me.currentMdDetailCache.id;
    	me.removeFiguresByLType("metadata");
    	Fn.Request(Dep.metadata.url.metadatamng.getDependMds, true, {metadataId: mdId},"操作失败",function(result){
        	if(result && result.result){
        		//展示主图元数据
        		me.showLayerFigure();
//        		//展示画布中的图元
        		me.showDependMDFigures(result.result);
        	}    		
    	});
    },
    /**
     * 绘制依赖关系元数据界面图元
     * @param result
     */
    showDependMDFigures : function(result){
    	var me = this;
    	var mmId = me.currentMdDetailCache.mmId;
    	var fgId = me.currentMdDetailCache.fgId;
        var x = 30,y=150;
        var depeList = result.depeList;
        var metadata = result.metadata;
    	for(var i=0;i<metadata.length;i++){
    		var md = metadata[i],mmId = md.mmId;
    		var mmCode = me.getCacheModels(mmId).code;
    		x = 500;
    		y = 30+i*80;
    		var dpMDId = md.id;
            me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
            		mmCode, {
                    id: md.id,
                    mdName: md.mdName,
                    mdCode: md.mdCode,
                    viewData: {
                        id: dpMDId,
                        viewData: Ext.JSON.encode({x: x, y: y})
                    },
                    bussData: {id:md.id,mdName:md.mdName,mdCode:md.mdCode,name:md.mdName}
            });
    	}
    	//重置主元数据图元位置
//    	this.figure.setDimension(this.oldWidth, this.oldHeight);
    	
    	
    	//添加链接线
    	for(var i=0;i<depeList.length;i++){
    		var line = depeList[i];
    		me.showLines(line.fromMdId, line.toMdId, line.mmDepName);
    	}
    },
    /**
     * 展示分析图元
     * @param mdList
     */
    showAnalysisMD : function(mdList){
    	var me = this,mdIndex = new Ext.util.MixedCollection(),typeIndex = new Ext.util.MixedCollection();
    	if(!mdList)return ;
    	
    	var mdAr = mdList.mdList,linesAr = mdList.lines,imgs =mdList.imgs;
    	me.mdAnalyseWin.setImages(imgs);
    	me.mdAnalyseWin.show();
    	var nodes = [],lines=[];
    	if(mdAr){
    		for(var i=0;i<mdAr.length;i++){
    			var md = mdAr[i];
                mdIndex.add(md.id,i);
                var mmId = md.mmId;
                var model = me.getCacheModels(mmId);
                var mmName = model ? model.name : "";
                var str ="名称："+md.mdName+",代码："+md.mdCode + (mmName ? ",元模型："+mmName : "");
                var img = model.graphSvg ? "Dep/metamodel/modelmng/editor/img/"+model.graphSvg : "Dep/metamodel/modelmng/editor/img/MetaModel.png";
    			nodes.push({"name" :md.mdName,"image":img,detail:str});
    		}
    	}
        if(linesAr){
        	var index = mdAr.length,zhHas = false,ylHas = false,zhIndex = -1,ylIndex=-1;
            for(var i=0;i<linesAr.length;i++){
                var line = linesAr[i];
                var sIndex = mdIndex.get(line.startNodeId),eIndex = mdIndex.get(line.endNodeId);
                var lineName = line.name; //线名称
                if(lineName=="组合关系"){
                	if(!zhHas){
                		nodes.push({"name" :"组合","image":"img/metadata/category.png","detail":"关系类型："+lineName});
                    	zhHas = true;
                    	zhIndex = nodes.length-1;
                	}
                	lines.push({ "source": sIndex , "target": zhIndex,"relation": lineName});
                	lines.push({ "source": zhIndex , "target": eIndex,"relation": ""});
                }else if(lineName=="依赖关系"){
                	if(!ylHas){
                		nodes.push({"name" :"依赖","image":"img/metadata/category.png","detail":"关系类型："+lineName});
                    	ylHas = true;
                    	ylIndex = nodes.length-1;
                	}
                	lines.push({ "source": sIndex , "target": ylIndex,"relation": lineName});
                	lines.push({ "source": ylIndex , "target": eIndex,"relation": ""});
                }else{
                	//非关联度分析
                	lines.push({ "source": sIndex , "target": eIndex,"relation": ""});
                }
            }
        }
        
        var json ={"nodes":nodes,"lines":lines};
        d3_ShowDatas("metadata_analyseWinDiv", me.mdAnalyseWin.relationPanel.getWidth(), me.mdAnalyseWin.relationPanel.getHeight(), json);
        me.mdAnalyseWin.on('resize', function(win, width, height, eOpts) {
        	d3.select("#metadata_analyseWinDiv").html("");
        	d3_ShowDatas("metadata_analyseWinDiv", width, height, json);
        });
    },
    /**
     * 展示分析线图元
     * @param lines
     */
    showAnalysisLines : function(lines){
    	var me = this;
    	if(!lines)return ;
    	for(var i=0;i<lines.length;i++){
    		var line = lines[i];
    		me.showLines(line.startNodeId,line.endNodeId,line.name);
    	}    	
    },
    /**
     * 展示数据地图元数据
     * @param mdList
     */
    showDataMapMD : function(datas){
    	var me = this,x=0,y=0;
    	if(!datas)return ;
    	me.removeFiguresByLType("metadata_datamap");
    	me._netLayout(datas);
    }, 
    _netLayout : function(datas){
    	var me = this,x=50,y=50,a=0,b=0; //a:长；b：宽
    	if(!datas)return ;
    	var len = datas.length;
    	//小101的个数
    	if(len<101){
    		if(Math.sqrt(len)>parseInt(Math.sqrt(len))){
    			a =parseInt(Math.sqrt(len))+1;
    			var m= parseInt(Math.sqrt(len))+1;
    			while(m--){
    				if(a*m<=len){
    					b=m;
    					break;
    				}
    			};
    		}else if(Math.sqrt(len)==parseInt(Math.sqrt(len))){
    			a = b = Math.sqrt(len);
    		}
    	}
    	for(var i=0;i<len;i++){
    		var data = datas[i];
            if(i%a==0){
            	x=120;
            	y=120+(parseInt(i/a))*150;
            }else{
            	x=120+(i%a)*150;
            }
    		var id = data.nodeId,code=data.code,name= data.name,mmCode=data.type;
            me.getEditor().executeAction(Dep.framework.editor.ACTION.EDITOR.ADD_MODEL, null,
            		mmCode, {
                    id: id,
                    mdName: name,
                    mdCode: code,
                    viewData: {
                        id: id,
                        viewData: Ext.JSON.encode({x: x, y: y})
                    },
                    bussData: {id:id,mdName:name,mdCode:code,name:name}
            }); 
    	}
    },
    /**
     * 展示数据地图线
     */
    showDataMapLines : function(lines){
    	var me = this;
    	if(!lines)return ;
    	for(var i=0;i<lines.length;i++){
    		var line = lines[i];
    		me.showLines(line.startNodeId,line.endNodeId,line.name);
    	}  
    },
    /**
     * 更改图层中的元数据树
     */
    changeViewType : function(viewId){
    	var me = this,tStore = me.treePanel.getStore();
    	if(tStore){
    		me.bulidMDTreePanel().reloadViewNode(viewId); //刷新跟节点
    	}
    },
    /**
     * 根据图层类型清除图元
     * @param ltype
     */
    removeFiguresByLType:function(ltype){
    	var me = this;
    	var layer = me.getEditor().getDataManager().getLayer(ltype);
    	if(layer){
    		layer.clearAll();
    		me.removeLayerCacheData(ltype);
    	}
    },
    /**
     * 清除当前图层的缓存数据
     * @param ltype
     * @param id
     */
    removeLayerCacheData : function(ltype){
    	var me = this;
    	var dataMap = me.layerCacheData.get(ltype);
        if (dataMap) {
            me.layerCacheData.removeAtKey(ltype);
        }
    },
    /**
     * 设置当前编辑元数据的缓存数据
     * @param data
     */
    setCurMdDetailCache : function(data){
    	var me = this;
    	me.currentMdDetailCache =data; 
    },
    /**
     * 设置当前编辑元数据的缓存数据
     * @returns
     */
    getCurMdDetailCache : function(){
    	var me = this;
    	return me.currentMdDetailCache;
    },
    /**
     * 获取依赖元数据store对象
     * @returns
     */
    getDependMDStore : function(){
    	var me = this;
    	return me.dependMDStore;
    },
    /**
     * 展示元数据图层
     */
    showMDLayer : function(){
    	var me = this,flag ="metadata";
    	me.setCurrentLayerFlag(flag);
    	me.removeFiguresByLType(flag);
    	me.showLayerFigure();
    },
    setCurrentLayerFlag : function(name){
    	var me = this,layer =me.getCurrentEditLayer();
    	if(name && layer){
    		layer.flag = name;
    	}
    },
    getCurrentLayerFlag : function(){
    	var me = this,flag = me.getCurrentEditLayer() ? me.getCurrentEditLayer().flag : "metadata";
    	return me.getCurrentEditLayer().flag;
    }
});
