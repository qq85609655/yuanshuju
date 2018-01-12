/**
 * @author yhy
 */
if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.metamodel) {
	Dep.metamodel = {};
}
if (!Dep.metamodel.modelmng) {
	Dep.metamodel.modelmng = {};
}
if (!Dep.metamodel.modelmng.editor) {
	Dep.metamodel.modelmng.editor = {};
}
if (!Dep.metamodel.modelmng.editor.plugin) {
	Dep.metamodel.modelmng.editor.plugin = {};
}
if (!Dep.metamodel.modelmng.editor.plugin.containers) {
	Dep.metamodel.modelmng.editor.plugin.containers = {};
}
if (!Dep.metamodel.modelmng.editor.plugin.containers.canvas) {
	Dep.metamodel.modelmng.editor.plugin.containers.canvas = {};
}

/**
 * 用来注册元模型管理模块中的图元的右键菜单
 */
Dep.metamodel.modelmng.editor.plugin.containers.canvas.ContextMenus = Dep.framework.editor.plugin.BasePlugin
		.extend({
			/**
			 * 插件名称
			 */
			NAME : "Dep.metamodel.modelmng.editor.plugin.containers.canvas.ContextMenus",

			init : function(container) {
				var me = this;
				me._super(container);
				me.initMMRelationshipDetailWin();
				me.regiesContextMenuActions();
			},
			/**
			 * 初始化查看详情的弹窗
			 */
			initMMRelationshipDetailWin : function() {
				var me = this;
				if(!me.mmRelationshipDetailWin) {
					me.mmRelationshipDetailWin = Ext.create('Dep.metamodel.modelmng.view.MMRelationshipDetailWin');
				}
				return me.mmRelationshipDetailWin;
			},
			
			regiesContextMenuActions : function() {
				var me = this, contaier = me.getContainer();
				// 注册元模型图元右键菜单触发的action
				contaier.regiestActions([
								{
									name : "addMetaModelFigure",
									description : Dep.framework.editor.I18N.DESCRIPTION.MODEL.REMOVE,
									functionality : me.addMetaModelFigure.bind(me)
								},
								{
									name : "compositionRelationshipMng",
									functionality : me.compositionRelationshipMng.bind(me)
								},
								{
									name : "dependencyRelationshipMng",
									functionality : me.dependencyRelationshipMng.bind(me)
								},
								{
									name : "modifyMetaModel",
									functionality : me.modifyMetaModel.bind(me)
								},
								{
									name : "deleteInheritMetaModel",
									functionality : me.deleteInheritMetaModel.bind(me)
								},
								{
									name : "deleteCompMetaModel",
									functionality : me.deleteCompMetaModel.bind(me)
								},
								{
									name : "metamodelAttributeMng",
									functionality : me.metamodelAttributeMng.bind(me)
								},
								{
									name : "metamodelApproval",
									functionality : me.metamodelApproval.bind(me)
								},
								{
									name : "addToFolder",
									description : Dep.framework.editor.I18N.DESCRIPTION.MODEL.REMOVE,
									icon : Dep.framework.editor.PATH
											+ "images/remove.png",
									functionality : me.addToFolder.bind(me)
								},
								{
									name : "lookoverDetail",
									functionality : me.lookOverDetail.bind(me)
								} ]);

			},
			/**
			 * 获取当前元模型管理的主控制器
			 * @return {Ext.app.Controller} controller
			 */
			getMetaModelController : function() {
				var controller = null;
				if(!controller) {
					controller = Dep.metamodel.modelmng.getApplication().getController("MetaModelController");
				}
				return controller;
			},
			/**
			 * 添加元模型图元
			 * @param {} figure 
			 */
			addMetaModelFigure : function(figure) {
				var me = this;
				var record = figure.userData;
				var node = me.getMetaModelController().inheritTreeStore.getNodeById(record.raw.bussData.id);
				me.getMetaModelController().showAddInheritMetaModelWin(node);
			},
			/**
			 * 添加组合关系
			 */
			compositionRelationshipMng : function(figure) {
				var me = this;
				var compMetaModel = figure.userData;
				var record = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', compMetaModel.raw.bussData);
				me.getMetaModelController().compositionRelationshipMng(record);
			},
			/**
			 * 添加依赖关系
			 */
			dependencyRelationshipMng : function(figure) {
				var me = this;
				var depeMetaModel = figure.userData;
				var record = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', depeMetaModel.raw.bussData);
				me.getMetaModelController().dependencyRelationshipMng(record);
			},
			/**
			 * 修改元模型
			 */
			modifyMetaModel : function(figure) {
				var me = this;
				var record = figure.userData;
				var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw.bussData);
				me.getMetaModelController().showModifyMetaModelWin(model, figure);
			},
			/**
			 * 删除一个继承元模型图元
			 */
			deleteInheritMetaModel : function(figure) {
				var me = this;
				var record = figure.userData;
				if(!record) {
					return;
				}
				var params = {id : record.raw.bussData.id};
				Ext.Msg.confirm('提示', '您确定要删除'+record.raw.bussData.name+'吗？', function(btn){
					if(btn=='yes') {
						Fn.Request('metamodel/delete.do', false, params, "",function(res){
							if(res) {
								if(res.resultCode == 1){
									Dep.framework.editor.util.Msg.success("删除成功！", "提示");
									var delNode = me.getMetaModelController().inheritTreeStore.getNodeById(record.raw.bussData.id);//被删图元对应的节点
									me.getMetaModelController().refreshAfterDelInheritMm(delNode.parentNode);
									me.getMetaModelController().clearCanvas();
								}else {
									Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
									return false;
								}
							}
						}, function(){
							Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
						});
					}else {
						return false;
					}
				}, me);
			},
			/**
			 * 删除一个组合元模型图元
			 */
			deleteCompMetaModel : function(figure) {
				var me = this;
				var record = figure.userData;
				if(!record) {
					return;
				}
				var params = {id : record.raw.bussData.id};
				Ext.Msg.confirm('提示', '您确定要删除'+record.raw.bussData.name+'吗？', function(btn){
					if(btn=='yes') {
						Fn.Request('metamodel/delete.do', false, params, "",function(res){
							if(res) {
								if(res.resultCode == 1){
									Dep.framework.editor.util.Msg.success("删除元模型成功！", "提示");
									me.getMetaModelController().refreshCompTreeStore();
									me.getMetaModelController().clearCanvas();
								}else {
									Dep.framework.editor.util.Msg.failed(res.resultText, "提示");
									return false;
								}
							}
						}, function(){
							Dep.framework.editor.util.Msg.failed("删除失败！", "提示");
						});
					}else {
						return false;
					}
				}, me);
			},
			/**
			 * 元模型属性管理
			 */
			metamodelAttributeMng : function(figure) {
				var me = this;
				var record = figure.userData;
				var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw.bussData);
				me.getMetaModelController().showModifyMetaModelWin(model, figure);
			},
			/**
			 * 元模型审批
			 */
			metamodelApproval : function(figure) {
				var me = this;
				var record = figure.userData;
				var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw.bussData);
				me.getMetaModelController().showApprovalMetaModelWin(model);
			},
			/**
			 * 添加到文件夹
			 */
			addToFolder : function(figure) {
				var me = this;
				var record = figure.userData;
				var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', record.raw.bussData);
				me.getMetaModelController().addToFolder(model);
			},
			/**
			 * 查看详情,用弹窗加D3JS来展示，tips展示详细信息
			 * @param {} figure
			 */
			lookOverDetail : function(figure) {
				var me = this;
				me.getMetaModelController().lookOverDetail(figure);
			}	
				/*var me = this, mdList = [figure.userData];
				var mdIndex = new Ext.util.MixedCollection(), typeIndex = new Ext.util.MixedCollection();
		    	if(!mdList) {
		    		return ;
		    	}
		    	me.mmRelationshipDetailWin.show();
		    	
		    	var mdAr = [{
		    			id : "testID0001",
		    			mmId : "mmid001",
		    			mdName : "测试元模型1",
		    			mdCode : "testCode0001"
			    	}, {
			    		id : "testID0002",
		    			mmId : "mmid001",
		    			mdName : "测试元模型2",
		    			mdCode : "testCode0002"
			    	}, {
		    			id : "testID0003",
		    			mmId : "mmid001",
		    			mdName : "测试元模型3",
		    			mdCode : "testCode0003"
		    	}]; 
		    	var linesAr = [{
			    		startNodeId : "testID0001",
			    		endNodeId : "testID0002",
			    		name : "继承关系"
			    	}, {
			    		startNodeId : "testID0001",
			    		endNodeId : "testID0003",
			    		name : "继承关系"
		    	}];
		    	
		    	var nodes = [], lines=[];
		    	if(mdAr){
		    		for(var i=0; i<mdAr.length; i++){
		    			var md = mdAr[i];
		                mdIndex.add(md.id, i);
		                var mmId = md.mmId;
		                //var model = me.getCacheModels(mmId);
		                var mmName = model ? model.name : "元元模型1";
		                var str ="名称："+md.mdName+",代码："+md.mdCode + (mmName ? ",元模型："+mmName : "");
		                var img = model.graphSvg ? "img/metadata/"+model.graphSvg : "Dep/metadata/metadatamng/config/img/logicNode_start.svg";
		    			nodes.push({"name" :md.mdName, "image":img, detail:str});
		    		}
		    	}
		        if(linesAr){
		        	var index = mdAr.length, zhHas = false, ylHas = false;
		            for(var i=0; i<linesAr.length; i++){
		                var line = linesAr[i];
		                var sIndex = mdIndex.get(line.startNodeId), eIndex = mdIndex.get(line.endNodeId);
		                var lineName = line.name; //线名称
		                if(lineName=="继承关系"){
		                	if(!zhHas){
		                		nodes.push({"name" :"继承","image":"img/metadata/category.png","detail":"关系类型："+lineName});
		                    	lines.push({ "source": sIndex , "target": (nodes.length-1),"relation": lineName});
		                    	zhHas = true;
		                	}
		                	lines.push({ "source": (nodes.length-1) , "target": eIndex,"relation": ""});
		                }else if(lineName=="组合关系"){
		                	if(!ylHas){
		                		nodes.push({"name" :"组合","image":"img/metadata/category.png","detail":"关系类型："+lineName});
		                    	lines.push({ "source": sIndex , "target": (nodes.length-1),"relation": lineName});
		                    	ylHas = true;
		                	}
		                	lines.push({ "source": (nodes.length-1) , "target": eIndex,"relation": ""});
		                }else{
		                	//非关联度分析
		                	lines.push({ "source": sIndex , "target": eIndex,"relation": ""});
		                }
		            }
		        }
		        var json ={"nodes":nodes,"lines":lines};
		        d3_ShowDatas("metamodel_relationDetailWinDiv", me.mmRelationshipDetailWin.getWidth(), me.mmRelationshipDetailWin.getHeight(), json);
		        me.mmRelationshipDetailWin.on('resize', function(win, width, height, eOpts) {
		        	d3.select("#metamodel_relationDetailWinDiv").html("");
		        	d3_ShowDatas("metamodel_relationDetailWinDiv", width, height, json);
		        });
		    	//d3_ShowDatas("metamodel_relationDetailWinDiv",1600,1200,json);
			}*/
			
			
		});