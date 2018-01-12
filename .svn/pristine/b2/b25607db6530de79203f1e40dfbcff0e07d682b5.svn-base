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
 * 创建子元数据
 */
Dep.framework.editor.plugin.containers.layer.ShowSubMetadataGrid = Dep.framework.editor.plugin.BasePlugin.extend({
	/**
	 * 插件名称
	 */
	NAME : "Dep.framework.editor.plugin.containers.layer.ShowSubMetadataGrid",
	
	/**
	 * 完成事件注册
	 */
	init : function(container) {
		var me = this;
		me._super(container);
		me.getContainer().on(Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT,
	            me._initEvent.bind(me));
	},
	_initEvent : function() {
		var me = this;
		me.getContainer().regiestActions([ {
			name : "showSubMDDetail",
			functionality : Ext.Function.bind(me.showSubMDDetail, me),
			group : "showSubMDDetail"
		}]);
	},
    /**
     * grid方式显示数据
     * @param metamodel
     * @param id
     */
	showSubMDDetail : function(figure){
		var me = this,mapData = new Ext.util.MixedCollection(),id = me.getContainer().currentMdDetailCache.id,objId = figure.getId();
    	var node = me.getContainer().treePanel.getStore().getNodeById(id);
    	if(!node)return ;
    	//获取元数据下的模型分类
    	var childs = node.childNodes;
    	for(var i=0;i<childs.length;i++){
    		if(childs[i].raw.id==objId){
    			var childrens = childs[i].raw.children,datas = [],mmId = null;
    			for(var j=0;j<childrens.length;j++){
    				if(!childrens[j]||!childrens[j].cacheData){
    					continue;
    				}
    				mmId=childrens[j].cacheData.mmId;
    				datas.push(childrens[j].cacheData);
    			}
    			me._showData(mmId,datas);
    		}
    	}
    	console.log(childs);
    },
    
    /**
	 * 显示预览数据
	 */
	_showData : function(mmId,datas){
		if(!mmId){
			return;
		}
		//props = [{code:'mdName',name:'名称'},{code:'mdCode',name:'元代码'}]
		var me = this,props = [{name:'mdName',label:'名称'},{name:'mdCode',label:'元代码'}],cloneData,
		props = props.concat(me.getContainer().getMMProps(mmId));
		var me=this,columns = [],fields = [],store,storeFields = [],dataPreviewGrid,attList,
		dataPreviewWin = me.getDataPreviewWindow();
		
		cloneData = Ext.clone(datas);
		
		if(!$.isArray(props)){//判断后台返回的数据
			return;
		}
		if($.isArray(cloneData)){//获取属性数据
			$.each(cloneData,function(index,data){
				attList = data.attribs;
				if(!attList){
					return;
				}
				$.each(attList,function(index,attr){
					var attrName = attr.mmAttCode?attr.mmAttCode:attr.mmAttName;
					data[attrName] = attr.valUe;
				});
			});
		}
		$.each(props,function(index,prop){//遍历后台返回的字段，转换为前台需要的配置信息
			storeFields.push({
				name:prop.name
			});
			columns.push({
				text:prop.label?prop.label:prop.name,//哎，后台给过来的数据有点乱，给的属性名称，不是code，只能通过名称匹配。
				dataIndex:prop.name
			
			});
		});
		
		store = Ext.create('Ext.data.Store', {//重新配置grid
			fields : storeFields,
			data:cloneData
		});
		//更新界面
		dataPreviewGrid = Ext.getCmp("dataPreviewGrid");
		dataPreviewGrid.reconfigure(store,
				columns); // 定义grid的store和column
		//调整初始宽度
		var width = 100*(props.length);
		var windowDiv = $(window);
		var winWidth = windowDiv.width();
		width = width>(winWidth-200)?(winWidth-200):width
		dataPreviewWin.setWidth(width);
		dataPreviewWin.show();
//		dataPreviewGrid.render();
	},
	
	/**
	 * 
	 */
	getDataPreviewWindow : function() {
		var me=this;
		
		if (!me.dataPreviewWin) {
			me.dataPreviewWin = Ext.create('Ext.window.Window', {
				id : 'dataPreviewWin',
				height : 400,
				width : 600,
				layout : {
					type : 'fit'
				},
				closeAction : 'hide',
				resizable : true,
				modal : true,
				title : '详细数据',
				items : [ {
					xtype : 'gridpanel',
					id : 'dataPreviewGrid',
					layout : 'fit',
					forceFit:true,
					columns : []
				} ],
//				buttons : [ {
//					xtype : 'button',
//					text : '关闭',
//					icon : "Dep/resource/img/common/close.png",
//					handler : function() {
////						me.beforeClosePreviewWin();
//						me.dataPreviewWin.hide();
//					}
//				} ]

			});
		}
		return me.dataPreviewWin;
	},
    
});