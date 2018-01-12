/**
 * container 为根容器，即editor 此插件需要：
 *  1.根据编辑器的配置信息初始化界面信息。初始化配置信息，初始化切换方法。
 *  2.初始化事件监听。
 *  3.为控件的render从actionmanager中配置相应action方法。
 *  
 此容器插件关联的配置文件为-》figures目录/{图元目录}/properties.json文件。配置文件详情：
 {   //每类图元都有一个perperties配置文件，改文件主要配置编辑该图元时，属性编辑区的显示信息。
    "details": [
        {
            "name": "名称",  //编辑的属性名称，此属性将显示在属性编辑区的名称列。
            "propertiesName": "name", //编辑的属性关联的图元业务属性名称。
            "xtype": "textField",     //编辑此属性的控件名称，目前支持textField,combox,actionbutton
            "url": "test/getComboxValues.do",//当编辑控件为combox时，可以设置此属性，combox控件的数据模型统一使用JHE.model.CommonStoreModel
            "action": "test",//当控件为actionbutton时，配置此属性响应button的点击事件。
            "listeners": [//用户可以添加编辑控件的事件监听。
                {
                    "eventName": "",//监听的事件名称，注意，当控件类型为button，其点击事件不用在此监听
                    "action": ""   //事件响应的action，注意：目前仅支持查找注册在本容器内的action执行action。
                },
                {
                    "eventName": "",
                    "action": ""
                }
            ]
        }
    ]
}
 */
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
Dep.framework.editor.plugin.containers.PropertiesWindow = Dep.framework.editor.plugin.ContainerPlugin
    .extend({

        NAME:"Dep.framework.editor.plugin.containers.PropertiesWindow",
        /**
         * 初始化日志类
         */
        logger:log4javascript
            .getDefaultLogger("Dep.framework.editor.plugin.containers.PropertiesWindow"),
        /**
         * @property {Dep.framework.editor.manager.BaseManager} 缓存所有图元的属性配置，即所有的sourceConfig属性
         */
        figuresPropCfg:null,
        /**
         * @property {Dep.framework.editor.model.BaseFigureModel} 当前编辑的数据模型对象
         */
        currentEditModel:null,
        /**
         * @property {Dep.framework.editor.manager.BaseManager} 缓存数据对象
         */
        storeManager:null,
    	/**
    	 * 初始化属性窗口容器插件
    	 * @param {pluginData}  pluginData  插件配置信息
    	 */
        init:function (parent, pluginData) {
            var me = this;
            me._super(parent, pluginData);
            me.pluginData = pluginData;
            me._initManager();
            me._initView(pluginData);
            me.getEditor().on(Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE,
                me._initEvent.bind(me));
            // me.testCode();
        },
        /**
         *  @private
         * 初始化事件绑定
         */
        _initEvent:function () {
            var me = this;
            // 绑定图元选中操作
            me
                .regiestOnEvent(Dep.framework.editor.EVENT.CANVAS.SELECT,
                me._canvasSelectFigure.bind(me), me,
                "Dep.framework.editor.plugin.containers.Canvas");
            me
            .regiestOnEvent(Dep.framework.editor.EVENT.BL.ROWSELECT,
            		me._changePropertiesSetting.bind(me), me,
            		"Dep.framework.editor.plugin.containers.BussList");
            me.getPropertiesGird().on("propertychange", me._changeProperties
                .bind(me), me);
        },
        /**
         *  @private
         * 初始化界面信息
         * @param pluginData
         */
        _initView:function (pluginData) {
            var me = this, propertyGrid;
            
            propertyGrid = Ext.create("Dep.framework.editor.view.PropertiesGrid", {
                plugins:[Ext.create('Dep.framework.editor.view.properties.CellActionsPlugin')]
            });
            propertyGrid.setTitle("属性");
            propertyGrid.on("beforeedit", function(e){
                e.cancel = true;
                return false;
            });
            me.setPropertiesGird(propertyGrid);
            // 将属性区添加到布局的右侧
            me.getEditor().getEditorView()
                .addToRegion(propertyGrid, 'east');
            me._initPropGridPanelVal();
        },
        /**
         *  @private
         * 初始化管理器
         */
        _initManager:function () {
            var me = this;
            if (!me.figuresPropCfg) {
                me.figuresPropCfg = new Dep.framework.editor.manager.BaseManager();
            }
            if (!me.storeManager) {
                me.storeManager = new Dep.framework.editor.manager.BaseManager();
            }
        },
        /**
         *  @private
         * 初始化propGrid的显示头
         */
        _initPropGridPanelVal:function () {
            var me = this;
            var cfg = me._bulidPropGridCfg(null, null);
            me.getPropertiesGird().getView().getHeaderCt()
                .getHeaderAtIndex(0).setText("名称");
            me.getPropertiesGird().getView().getHeaderCt()
                .getHeaderAtIndex(1).setText("值");
            me.getPropertiesGird().setSource(null, null);
        },
        /**
         *  @private
         * 根据图元类型build properties的sourceConfig属性
         *
         * @param {String} fType
         *            图元类型
         * @param {Object[]} cfg
         *            json配置信息。
         * @return sourceConfig 参考propertyGrid的sourceConfig配置属性
         */
        _bulidPropGridCfg:function (fType, cfg) {
            var me = this, config = {}, fieldConfig, xtype, name, groupLen, conf, cmpt, renderer,store = null;
            if (!cfg || (!cfg instanceof Array)) {
                // TODO 是否需要默认显示？
                me.logger
                    .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_bulidPropGridCfg]没有找到图元的properties配置信息！");
                return config;
            }
            if (fType && me.figuresPropCfg.get(fType)) {
                config = me.figuresPropCfg.get(fType);
                return config;
            }
            // 以下属性是JSON配置文件中的配置信息
            groupLen = cfg.length;
            for (var i = 0; i < cfg.length; i++) {
                fieldConfig = cfg[i];
                // 图元属性名称（英文）
                name = fieldConfig.propertiesName/* ,storeName = field.store */;
                // 获取编辑插件
                cmpt = me._getFieldCmpt(fieldConfig);
//                renderer = me._getFieldRender(fieldConfig);

                // 此处可以初始化值
                conf = {
                    displayName:fieldConfig.name
                };
                //清除设置
                renderer = null;
                if (cmpt) {
                    // 如果配置的有store，则对store进行绑定,需要确定组件是否有bindStore方法（即是否为数据集组件）
                    if (fieldConfig.url ) {
                        store = me._getComboStore(fType, name, fieldConfig.url); // 获取combox store
                        if (cmpt.bindStore && store) {
                            cmpt.bindStore(store);
                            //设置render
                            renderer = me._getComRender(store);
                            
                        }
                    }
                  
                    conf.editor = cmpt;
                }

                if (renderer) {
                    conf.renderer = renderer;
                }
                // 配置属性
                config[name] = conf;
            }
            if (config) {
                me.figuresPropCfg.put(fType, config);
                // } else {
                // result = {
                // source : null,
                // config : null
                // };
            }
            return config;
        },
        /**
         *  @private
         * 根据配置信息获取组件editor
         * @param {Object} fieldConfig 字段配置信息
         * @return {*}
         */
        _getFieldCmpt:function (fieldConfig) {
            var me = this, cmpt = null, xtype = fieldConfig.xtype, name = fieldConfig.name, editable = fieldConfig.editable;
            if (editable == "false") {
                cmpt = new Ext.grid.CellEditor({
                    field:new Ext.form.field.Text({
                        disabled:true
                    })
                });
                return cmpt;
            }

            if (xtype == "combox" || xtype == "combo") {
                cmpt = new Ext.form.field.ComboBox({
                	//此处不能变更
                    displayField:fieldConfig.displayField?fieldConfig.displayField:'name',
                    valueField:fieldConfig.valueField?fieldConfig.valueField:'id',
                    editable:false//,
//                    queryMode:'local'
                });
                return cmpt;
            }
            /*if (xtype == "triggerfield") {
                cmpt = Ext.create("Dep.framework.editor.view.properties.PickerField", {
                    pickerConfig:fieldConfig.pickerConfig,
                    pickerType:null
                    // 自定义
                });
                return cmpt;
            }
            if (xtype == "gridPickerfield") {
                cmpt = Ext.create("Dep.framework.editor.view.properties.PickerField", {
                    pickerConfig:fieldConfig.pickerConfig,
                    pickerType:'gridPicker' // 默认类型
                });
                return cmpt;
            }*/

            if (xtype == "textareafield") {
                cmpt = {
                    xtype:'textarea',
                    name:name,
                    minHeight:50
                };
                return cmpt;
            }
            if (xtype == "actionbutton") {
                cmpt = Ext.create("Ext.button.Button", {
                    handler:function () {
                        me.executeAction(fieldConfig.action, me.getCurrentEditModel());
                    }
                });
                me.logger.debug(cmpt);
                return cmpt;
            }
            //默认使用textfield
            cmpt = {
                xtype:'textfield',
                name:name
            };
            return cmpt;
        },

        /**
         *  @private
         * 获取combox的store
         * @param {String} ftype 图元类型
         * @param {String} field 字段名
         * @param {String} url  store请求数据的url
         * @return {*}
         */
        _getComboStore:function (ftype, field, url) {
            var me = this, store;
            if (!url) {
            	 me.logger
                 .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_getComboStore]没有配置URL！");
            	 return  null;
            }
            store = me.getStoreManager().get(ftype + field);
            if (store) {
                return store;
            }
            store = Ext.create('Ext.data.Store', {
                model:'Dep.framework.editor.model.CommonStoreModel'/*Ext.create('Dep.framework.editor.model.CommonStoreModel',{})*/,
                proxy:Ext.create('Dep.framework.editor.model.proxy.BaseAjaxProxy', {
                    url:url
                })
            });
            me.getStoreManager().put(ftype + field, store);
            //监听load事件
            store.on('load',function (store) {
            	me.getPropertiesGird().doAutoRender();
            });
            store.load();
            return store;
        },

        
    	/**
         *  @private
    	 * 从根据id从combox获取名字
    	 * @param store
    	 * @returns {Function}
    	 */
    	_getComRender : function(store){
    		if (!store ) {
    			return null;
    		}
    		return function(valNames){
    			var val ="";
    			//加载数据
    			if(store && store.getCount()==0 && store.autoLoad){
    				store.load();
    			}
    			//如果是int型数据
    			if(valNames &&typeof(valNames)!="number"){
    				valNames = valNames.toString();  //有些是数组，有些是字符串
    				var valAr = valNames.split(",");
    				if(store){
    					for(var i in valAr){
    						var rec = store ? store.findRecord('id',valAr[i]) : null;
    						if(val!="")val+=",";
    						val += (rec ? rec.data.name : "");		
    					}
    				}				
    			}else{//字符型数据
    				var rec = store ? store.findRecord('id',valNames) : null;
    				val = (rec ? rec.data.name : "");						
    			}
    			return val;
    		};	
    	},
        
        /**
         *  @private
         * 监听画布事件切换属性窗口的配置
         * @param {Object} canvas 画布 
         * @param {Object} figure 当前编辑的图元
         */
        _canvasSelectFigure:function (canvas, editFigure) {
            var me = this, model, func,figures;
            if (!canvas) {
            	return;
            }
            figures = canvas.getSelection().getAll().asArray();
            if (!figures || figures.length != 1) {//没有任何选中图元或者
            	 me._changePropertiesSetting(null);
                me.logger
                    .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_canvasSelectFigure]没有选中任何图元！");
                return;
            }
            if (figures.length > 1) {//不只是选中了一个图元
            	me._changePropertiesSetting(null);
            	me.logger
            	.debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_canvasSelectFigure]多选图元不进行编辑！");
            	return;
            }
            
            if (!editFigure) {//最终选中的图元即为需要编辑的图元
            	me._changePropertiesSetting(null);
            	me.logger
            	.debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_canvasSelectFigure]没有选中任何图元！");
            	return;
            }
            //编辑图元
            model = editFigure.getUserData();
            if (!model) {
                me.logger
                    .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_canvasSelectFigure]选中的图元没有任何业务数据！");
                return;
            }
            me._changePropertiesSetting([model]);

        },
        /**
         *  @private
         * 根据传入的figure model，修改属性窗的显示,当前仅显示第一个图元，后期修改为显示多个图元的共同属性。
         * @param model
         */
        _changePropertiesSetting:function (models) {
        	
            var me = this, fType, modelMng, propertiesGroup, cfg, source, bussRecord,model;
            // 清空属性区显示,清除缓存
            me.clearPropGridCfg();
            if (!models || models.length <= 0) {
            	return;
            }
            if (models.length > 1) {
            	 me.logger
                 .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_changePropertiesSetting]多选图元不进行编辑！");
             return;
            }
            model = models[0];

            if (!model || !model.fType) {
                me.logger
                    .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_changePropertiesSetting]选中的图元没有任何业务数据！");
                return;
            }

            //如果是当前编辑图元再次选中，不进行任何处理。
            if (model === me.getCurrentEditModel()) {
            	return;
            }
            
            if (!model.getBussData) {
                me.logger
                    .debug("[Dep.framework.editor.plugin.containers.PropertiesWindow#_changePropertiesSetting]不支持该类图元编辑！");
                return;
            }
            fType = model.fType;
            modelMng = me.getEditor().getModelManager();
            propertiesGroup = modelMng.get(fType).properties.details; // 获取他的属性信息
            // 获取配置信息
            cfg = me._bulidPropGridCfg(fType, propertiesGroup);

            // 获取业务数据
            bussRecord = model.getBussData();
            source = me._buildPropGirdSource(cfg, bussRecord);
            // 设置界面
            me.setCurrentEditModel(model);
            me.getPropertiesGird().setSource(source, cfg);
        },

        /**
         *  @private
         * 根据传入的数据redcord构造propertieswindow的数据。
         * @param sourceConfig
         * @param bussRecord
         * @return {Object}
         */
        _buildPropGirdSource:function (sourceConfig, bussRecord) {
            var me = this, source = {};
            for (var fieldName in sourceConfig) {
                me.logger.debug(fieldName);
                source[fieldName] = bussRecord.get(fieldName);
            }
            return source;

        },
        /**
         *  @private
         * 监听property grid的changepropertiy事件，修改缓存数据
         * @param source
         * @param {String} recordId
         * @param {String} value
         * @param {String} oldValue
         */
        _changeProperties:function (source, recordId, value, oldValue) {
            var me = this, command;
            //执行命令
            command = new Dep.framework.editor.command.PropertiesChangeCommand(me.getPropertiesGird(),me.getCurrentEditModel(), recordId, value, oldValue);
            //修改数据模型
            me.executeCommand(command);
            //将事件作为容器事件管理
            me.raiseEvent(Dep.framework.editor.EVENT.PG.CHANGE_PROP,me.getCurrentEditModel(),value, oldValue);
        },

        /**
         * 清除属性窗口的配置
         */
        clearPropGridCfg:function () {
            var me = this;
            me.setCurrentEditModel(null);
            if (me.getPropertiesGird()) {
            me.getPropertiesGird().setSource(null, null);
            }
           
        },
        /**
         * 获取当前编辑图元的模型对象
         * @return {Dep.framework.editor.model.BaseFigureModel}
         */
        getCurrentEditModel:function () {
            var me = this;
            return me.currentEditModel;
        },
        /**
         * 设置当前编辑图元的模型对象
         * @param {Dep.framework.editor.model.BaseFigureModel}currentEditModel
         */
        setCurrentEditModel:function (currentEditModel) {
            var me = this;
            //清除旧数据的编辑状态
            if (me.currentEditModel && me.currentEditModel.setEditingStatus) {
            	me.currentEditModel.setEditingStatus(false);
            }
            me.currentEditModel = currentEditModel;
            //设置新数据的编辑状态
            if (me.currentEditModel && me.currentEditModel.setEditingStatus) {
            	me.currentEditModel.setEditingStatus(true);
            }
        },
        /**
         * 获取缓存的store数据对象
         * @param {Dep.framework.editor.model.BaseFigureModel}currentEditModel
         * @returns storeManager
         */
        getStoreManager:function () {
            var me = this;
            return me.storeManager;
        },

        /**
         * 获取属性窗口对象
         * @return {Ext.grid.Panel} grid panel
         */
        getPropertiesGird:function () {
            var me = this;
            return me.propertiesGird;
        },

        /**
         * 设置property window的gird panel
         */
        setPropertiesGird:function (propertiesGird) {
            var me = this;
            me.propertiesGird = propertiesGird;
        }

    });
