/**
 * 元数据审核时点击"详情"弹出的元数据信息窗口
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.MetaDataDetailWindow', {
		extend : 'Ext.window.Window',
		cmpTag : 'gathermddetailwin',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		title : Dep.metadata.I18N.metadatamng.view.metadatainfo,
		layout: 'fit',
		width : 500,
		initHeight : 300,
		height : 300,
		closeAction : "hide",
		buttonAlign :"center",
		modelListCache :[],
		cachePropMap :new Ext.util.MixedCollection(), 
		cacheModels : new Ext.util.MixedCollection(),
		constructor: function(conf){
			var me = this;
			me.initModels();//初始化模型数据，必须放前面
			var mmcmpt =me.getMMCmpt();
			me.baseInfoFS = Ext.create("Ext.form.FieldSet",{
					title:Dep.metadata.I18N.metadatamng.view.baseinfo,
					layout:"form", 
					style:"margin:10 10 15 10;padding: 5 10 15 10",
					items:[mmcmpt,
						{
							xtype:"textfield",
							id :"code_g",
							name : "code",
							readOnly : true,
							fieldLabel:Dep.metadata.I18N.metadatamng.view.code,
							labelWidth :80
						},
						{
							xtype:"textfield",
							id :"name_g",
							readOnly : true,
							fieldLabel:Dep.metadata.I18N.metadatamng.view.name,
							labelWidth :80
						}
					]					
			});
			me.propsFS =Ext.create("Ext.form.FieldSet",{
					title:Dep.metadata.I18N.metadatamng.view.baseprops,
					layout:"form",
					style:"margin:15 10 15 10;padding: 15 10 30 10",
					collapsible : true,
					items :[]
			});
			me.items ={xtype:"panel",frame:true,items:[me.baseInfoFS,me.propsFS]};
			
			me.buttons = [{
				xtype : 'button',
				text : '通过',
				cmpTag : 'agreemetadata',
				icon : 'Dep/metadata/resource/img/pass.png'
				
			},{
				xtype : 'button', 
				text : '拒绝',
				cmpTag : 'rejectmetadata',
				icon : 'Dep/metadata/resource/img/reject.png'
			}];
			
			me.callParent();
		},
		
		/**
		 * 修改元模型后，获取属性信息更新到界面上
		 */
		setProps : function(props){
			var me = this;
			if(!props){
				me.propsFS.removeAll();
				me.setHeight(me.initHeight);
				me.doLayout(true);
				return ;
			}
			var fields = [],length = props.length;
			for(var i=0;i<length;i++){
				var field = {
						id :props[i].id,
						xtype:"textfield",
						name :props[i].code,
						fieldLabel:props[i].name,
						labelWidth :80,
						readOnly : true
				};
				fields.push(field);
			}
			if(me.propsFS){
				me.propsFS.removeAll();
				me.propsFS.add(fields);
			}
			me.setHeight(me.initHeight+(25*length));
			me.doLayout(true);
			return true;
		},
		/**
		 * 初始化模型下拉框
		 */
		getMMCmpt : function (){
			var me = this;
			//元模型store
			if(!me.mmStore){
				me.mmStore = Ext.create('Ext.data.Store', {
	            	singleton : true, 
	            	autoLoad:true,
	            	storeId:'gmmComboStore', 
	            	fields:[ 
				            {name:'id', type: 'string'}, 
				            {name:'name',type:'string'}  
				        ], 
				    data:me.modelListCache
	            });
			}
			if(!me.metaModelCombo){
				me.metaModelCombo = Ext.create('Ext.form.ComboBox', {
				    fieldLabel: Dep.metadata.I18N.metadatamng.view.metamodel,
				    store: me.mmStore,
				    queryMode: 'local',
				    displayField: 'name',
				    valueField: 'id',
				    labelWidth :80,
				    editable : false
				});
			}
			return me.metaModelCombo;
		},
		/**
		 * 根据模型获取属性,并修改界面信息
		 */
		changeProps : function(modelId){
			var me = this;
			if(modelId){
				var result = me.getMMProps(modelId);
				var flag = me.setProps(result);
				if(flag) {
					return true;
				}
			}
		},
		/**
		 * 编辑操作，将值设置到控件中
		 * @param obj
		 */
		setValues : function(obj){
			var me = this;
			if(!obj)return ;
			var flag = me.changeProps(obj.get('mmId'));
			if(flag) {
				//设置基本信息的值
				var namecmpt = Ext.ComponentQuery.query('#name_g',me.baseInfoFS);
				var codecmpt = Ext.ComponentQuery.query('#code_g',me.baseInfoFS);
				if(namecmpt && namecmpt[0])namecmpt[0].setValue(obj.get('mdName'));
				if(codecmpt && codecmpt[0])codecmpt[0].setValue(obj.get('mdCode'));
				me.getMMCmpt().setValue(obj.get('mmId'));
				if(obj.get('mmId'))me.getMMCmpt().setDisabled(true);
				//设置属性信息
				for(var i in me.propsFS.items.items){
					var cmpt = me.propsFS.items.items[i];
					var attList = obj.data.attList;
					var value = "";
					for(var j=0; j<attList.length; j++) {
						if(attList[j].mmAttName == cmpt.name) {
							value = attList[j].valUe;
							break;
						}
					}
					cmpt.setValue(value);
				}
			}
		},
		/**
	     * 初始化所有模型配置
	     */
	    initModels : function(){
	    	var me = this;
	    	var result = Fn.Request("metamodel/getAll.do", false, null);
	    	if(result && result.result){
	            me.bulidFiguresCfg(result.result);
	    	}
	    },
		/**
	     * 根据模型创建所有的图元配置
	     */
	    bulidFiguresCfg : function(cfgs){
	    	var me = this;
	    	if(!cfgs)return ;
	    	me.modelListCache=[];
	    	for(var i=0;i<cfgs.length;i++){
	            me.setCacheModels(cfgs[i].id, cfgs[i]);
	            me.modelListCache.push({id:cfgs[i].id,name:cfgs[i].name});
	    	}
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
	     * 获取属性信息
	     * @param mmId  模型Id
	     * @returns
	     */
	    getMMProps: function (mmId) {
	        var me = this, model = me.getCacheModels(mmId),attList=[];
	        if(model&&model.attList){
	        	attList = model.attList;
	        	for(var i in attList) {
	        		attList[i].id = attList[i].id+'g';
	        	}
	        }
	        return attList;
	    }
});
