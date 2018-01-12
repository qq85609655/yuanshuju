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

/**
 * 图元模型
 */
Ext.define('Dep.framework.editor.model.BaseFigureModel', {
	extend : 'Dep.framework.editor.model.BaseModel',
	/**
	 * 图元模型关联的shape对象
	 * 
	 * @cfg {String} shape 关联的shape
	 */
	shape : 'Dep.framework.editor.figure.BaseNode',

	/**
	 * @cfg {String} fType 图元唯一标识，是必要配置属性。
	 */
	fType : null,

	/**
	 * @cfg {String} fName 图元名称，是必要配置属性，模型的名称以此命名，只能为字符串。
	 */

	/**
	 * @cfg {String} description 图元描述。
	 */

	/**
	 * @cfg {String} groupId 图元所属组，如果不配置，默认。
	 */

	/**
	 * @cfg {String} img 图元关联的svg图片，要求为svg图片。
	 */

	/**
	 * @cfg {String[]} persistentViewAttributes 持久化的图形属性，以数组的形式配置。
	 */

	/**
	 * @cfg {Object} api 数据模型持久化交互的API url。 "create" : 创建调用API； "read" :
	 *      ：根据ID获取数据的API；"update" : 更新模型数据的API； "destroy" : 删除模型数据的API；
	 *      "getAll" : 列表查询的API；"getAllView" :仅获取界面信息的API
	 */

	/**
	 * @cfg {Object[]} port 配置图元可以连接的port类型。port配置项说明如下： "fType" : port
	 *      图元类型唯一标识，为必要属性； "locator" :port 的locator 类型，可以配置XXXX //TODO； "MAX" :
	 *      最多可以的连接数； "icon" : ""
	 * 
	 * 
	 */

	/**
	 * @cfg {Object[]} statuEnums 图元状态枚举
	 */

	/**
	 * @cfg {Object[]} contextMenus 图元上下文菜单
	 */

	/**
	 * @cfg {Object} viewConfig 图层相关配置
	 */
	viewConfig : null,

	/**
	 * @cfg {String} img 图元图片路径
	 */
	img : null,

	/**
	 * @property {Boolean} editable 模型是否可以编辑。
	 */
	editable : false,

	/**
	 * @property {Boolean} isEditing 模型是否正在编辑中。
	 */
	isEditing : false,

	/**
	 * @property {Boolean} isEditing 模型可视状态。
	 */
	visible : false,
	/**
	 * 
	 */
	idgen : 'uuid',
	/**
	 * 是否持久化界面数据
	 */
	persistentViewData: true,
	/**
	 *是否
	 */
	isNew :false,
	/**
	 * 状态字段名称
	 */
	statusFieldName:"status",
	/**
	 * 连线是否允许连接自身，仅对connection模型有效。
	 */
	enableConnectSelf:false,

	/**
	 * 初始化日志类
	 */
	logger : log4javascript
			.getDefaultLogger("Dep.framework.editor.model.BaseFigureModel"),
		
	
	// shapeType : 'node',

	/**
	 * 重写构造函数
	 */
	constructor : function(data, id, raw, convertedData) {
		var me = this;
		// 调用父类构造方法
		me.callParent(arguments);
		if (!me.viewConfig) {
			me.viewConfig = {};
		}
		me.viewConfig['path'] = me.img;
//		me.initChildren();
		// me.shapeType = me._parseFigureType();
	},

	/**
	 * 获取业务数据模型
	 * 
	 * @return {Dep.framework.editor.model.ModelData} 图元业务数据，也是一个模型对象。
	 */
	getBussData : function() {
		var me = this;
		var bussDataFunName = "get" + me.$className + "Data";
		var bussModel = me[bussDataFunName]();
		if (!bussModel.get('id')) {
			bussModel.set('id', me.get('id'));
		}
		return bussModel;

	},
	/**
	 * 获取图形数据模型 *
	 * 
	 * @return {Dep.framework.editor.model.ModelView} 图元图形数据，也是一个模型对象。
	 */
	getViewData : function() {
		var me = this;
		var viewModel = me._getViewModel();
		if (!viewModel.get('id')) {
			viewModel.set('id', me.get('id'));
		}
		if (me.getBussData() && me.getBussData().get('name')) {
			viewModel.set("name", me.getBussData().get('name'));
		}else{
		    viewModel.set("name",  me.get('name'));
		}
		return viewModel;
	},
	/**
	 * 获取图形数据模型 *
	 * 
	 * @return {Dep.framework.editor.model.ModelView} 图元图形数据，也是一个模型对象。
	 */
	_getViewModel : function() {
		var me = this;
		var viewDataFunName = "get" + me.$className + "View";
		var viewModel = me[viewDataFunName]();
		return viewModel;
	},
	/**
	 *  *
	 * @return {String} 获取图形数据ID 。
	 */
	getViewId : function() {
		var me = this;
		var viewModel = me._getViewModel();
		if (viewModel) {
			return viewModel.get('id');
		}
		throw "没有图形ID属性";
	},

	/**
	 * 更新业务属性
	 * 
	 * @param {String}
	 *            fieldName 字段名称
	 * @param {Object}
	 *            value 字段值
	 */
	updateBussProperties : function(fieldName, value) {
		var me = this, model = me.getBussData(), modifiedFieldNames = null;
		// 更新业务属性
		model.set(fieldName, value);
		// 如果父对象有此属性，更新父对象同名属性
		this.set(fieldName, value);
		// 提醒store更新数据了
		(modifiedFieldNames || (modifiedFieldNames = [])).push('bussData');
		if (fieldName === me.statusFieldName) {//更新图元的状态属性
			if (me.getShape() && me.getShape().setStatus){
				me.getShape().setStatus(value);
			}
		}
		me.afterEdit(modifiedFieldNames);
	},
	/**
	 * 更新业务属性
	 * 
	 * @param {String}
	 *            fieldName 字段名称
	 */
	getBussProperties : function(fieldName) {
		var me = this, model = me.getBussData();
		if(!model) {
			return null;
		}
		return model.get(fieldName);
	},

	/**
	 * 批量更新模型
	 * 
	 * @param {}
	 *            obj 包含模型更新后数据的键值对 对象 例如{name : "fdd",add:"ddd" }
	 */
	updateBussData : function(obj) {
		var me = this;
		for (var i in obj) {
			me.updateBussProperties(i, obj[i]);
		}
	},
	/**
	 * 更新图形属性
	 * 
	 * @param {String}
	 *            fieldName 字段名称
	 * @param {Object}
	 *            value 字段值
	 */
	updateViewProperties : function(fieldName, value) {
		var me = this, model = me.getViewData(), modifiedFieldNames = null;
		if (fieldName == "viewData" && (typeof value != 'string')) {
			value = Ext.JSON.encode(value);
		}
		model.set(fieldName, value);
		if (!me.persistentViewData) {// 如果不持久化界面数据，不发出更新事件。
			return;
		}
		// 提醒store更新数据了
		(modifiedFieldNames || (modifiedFieldNames = [])).push('viewData');
		me.afterEdit(modifiedFieldNames);
	},

	/**
	 * 设置图元对象
	 * 
	 * @param {String/Figure}shape
	 *            图元图形对象或图形类名
	 */
	setShape : function(shape) {
		var me = this;
		me.shape = shape;
	},

	/**
	 * 获取图元对象
	 * 
	 * @return {Figure}图元图形对象
	 */
	getShape : function() {
		var me = this, value,className, figure, viewDataObj;
		try {

			// 如果是string，构造shape
			if (typeof me.shape == 'string') {
				className = eval(me.shape);
				viewDataObj = me._getViewModel().get('viewData');
				if (viewDataObj && viewDataObj != '' && Ext.JSON.decode(viewDataObj)) {
					viewDataObj = Ext.apply( Ext.JSON
							.decode(viewDataObj),me.viewConfig);
				}
				if(!viewDataObj){
					viewDataObj={};
				}
				// 设置图形属性
				figure = new className(viewDataObj);
				// figure.lType = me.lType;
			
				figure.setUserData(me);
				//设置图元ID为业务ID
				figure.setId(me.getId());
				
				// 设置图形的模型数据,同时根据模型的编辑状态设置图形的编辑状态
				//
				value=me.getBussData()?me.getBussData().get(me.statusFieldName):null;
				if (value) {//业务属性的状态属性
					if (figure &&figure.setStatus){//设置图元的状态
						figure.setStatus(value);
					}
				}
				me.setShape(figure);
			}
		} catch (e) {
			me.logger.debug(e);
			console.log(e);
			me.logger.error("图元初始化失败,图元名称为" + me.shape);
		}
		return me.shape;
	},
	/**
	 * 设置模型的编辑状态
	 * 
	 * @param {Boolean
	 *            }editable 是否可以编辑
	 */
	setEditable : function(editable) {
		var me = this, shape;
		me.editable = editable;
		shape = me.getShape();
		if (shape && shape.setEditable) {// 更新图形对象状态
			shape.setEditable(editable);
		}
	},
	/**
	 * 获取模型的编辑状态
	 * 
	 * @return {Boolean}
	 */
	getEditable : function() {
		var me = this;
		return me.editable;
	},

	/**
	 * 设置模型的可视状态
	 * 
	 * @param {Boolean
	 *            }visible 是否可视
	 */
	setVisible : function(visible) {
		var me = this;
		me.visible = visible;

		shape = me.getShape();
		if (shape && shape.setVisible) {// 更新图形对象状态
			if (!me.isPortFigure()) {
				me.getShape().setVisible(visible);
			}
		}
	},
	/**
	 * 获取模型的可视状态
	 * 
	 * @return {Boolean}
	 */
	getVisible : function() {
		var me = this;
		return me.visible;
	},
	/**
	 * 设置模型是否正在编辑中的状态
	 * 
	 * @param {Boolean
	 *            }isEditing 是否正在编辑中
	 */
	setEditingStatus : function(isEditing) {
		var me = this;
		me.isEditing = isEditing;
		// 更新图元
		shape = me.getShape();
		if (shape && shape.setEditingStatus) {// 更新图形对象状态
			me.getShape().setEditingStatus(isEditing);
		}
	},
	/**
	 * 获取模型是否正在编辑中
	 * 
	 * @return {Boolean}
	 */
	isEditing : function() {
		var me = this;
		return me.isEditing;
	},
	/**
	 * 清除此模型的ID,clone用
	 * 
	 */
	updateId : function() {
		var me = this, bussData = me.getBussData(), viewData = me.getViewData(), id = me.getNewId();
		me._clearIds(id);
		bussData._clearIds(id);
		viewData._clearIds(id);
	},
	/**
	 * 获取新的ID
	 */
	getNewId : function() {
		var me = this;
		if (me.idgen){
			return me.idgen.generate();
		}
		return Ext.data.IdGenerator
		.get('uuid').generate();
	},

	/**
	 * 获取模型的持久化属性
	 * 
	 * @return {Object}返回持久化用数据结构对象数据格式：
	 *         {'id':'xxx','name':'xxx','viewDta':{},'bussData':{}}
	 * 
	 */
	getPersistentAttributes : function() {
		var me = this;
		if (!me.persistentViewData) {
			if (!me.getBussData()) {
				me.logger.debug('业务属性还没有设置。');
			}
			return me.getBussData().getData();
		}
		return me._getViewModelPersistentAttributes();
	},
	/**
	 * 
	 */
	_getViewModelPersistentAttributes : function() {
		var me = this, data = me.data, viewAttributes, viewData;
		data['fType'] = me.getFType();
		data = me.validateModelDataByFields(data);
//		if (!(me.persistentViewData == 'false')) {// 如果不持久化界面数据，不赋予界面数据。
			viewAttributes = me.getShape().getPersistentAttributes();
			viewData = me.getViewData();
			viewData.set('viewData', Ext.JSON.encode(viewAttributes));
			data['viewData'] = me.getViewData().data;
//		}
		
		data['bussData'] = me.getBussData().getData();
		
		me.logger.debug(data);
		return data;
	},
	/**
	 * 清除模型上不必要的字段
	 * 
	 * @param {}
	 *            data
	 */
	validateModelDataByFields : function(data) {
		var me = this, name, fields = me.fields.keys, tempData = {};
		Ext.each(fields, function(field, index) {
					tempData[field] = data[field];
				});
		return tempData;
	},
	/**
	 * 克隆模型 先克隆,然后在清除克隆后的model的id
	 * 
	 * @return {Dep.framework.editor.model.BaseFigureModel}
	 */
	/*
	 * clone : function() { //method1 ----NG var me = this,id =
	 * Ext.data.IdGenerator.get('uuid').generate(); var json =
	 * Ext.JSON.encode(me) ; var newModel = Ext.JSON.decode(json) ; // var
	 * newModel = Ext.clone(me); newModel.updateId(id); return newModel;
	 * //method2 ----NG // //拷贝数据 // var me = this,id =
	 * Ext.data.IdGenerator.get('uuid').generate(); // //更新ID // var newModel =
	 * me.copy(id); // newModel._clearIds(id); // //更新图形ID // if (me.getShape() ) { //
	 * me.getShape().setId(id); // } // // automatically generate a unique
	 * sequential id // Ext.data.Model.id(newModel);
	 * 
	 * //method3 ---- // return newModel; },
	 */

	/**
	 * @return {String}标识图元类型唯一标识
	 */
	getFType : function() {
		var me = this;
		return me.fType;
	},
	/**
	 * @return {String}图元所属图层（图元分组标识）
	 */
	getFigureGroup : function() {
		var me = this;
		return me.layerType;
	},
	/**
	 * @param {String}
	 *            图元所属图层（图元分组标识）
	 */
	setFigureGroup : function(layerType) {
		var me = this;
		me.layerType = layerType;
	},
	/**
	 * @return {Boolean}是否是port图元
	 */
	isPortFigure : function() {
		var me = this;
		if (!me.isPort) {
			return false;
		}
		return (me.isPort == 'true');
	},
	/**
	 * @return {Boolean}是否是connection图元
	 */
	isConnectionFigure : function() {
		var me = this;
		if (!me.isConnection) {
			return false;
		}
		// return (me.shapeType == 'connection');
		return (me.isConnection == 'true');
	},
	/**
	 * 校验模型数据
	 * 在保存模型前,属性窗口会调用此方法来校验模型数据
	 */
	validataModel : function() {
		var me=this,errors=me.validate();
		//调用Ext原始的校验,来做基本校验
		if(errors && errors.getCount()>0){
		   return errors;
		}
		//如果各个模型有各自需求的校验,再进行各自的校验
		if(me.validateBussData){
		   errors=me.validateBussData();
		}
		return errors;
	},
	/**
	 * 重写父类的验证方法 验证图形数据，业务数据以及自身
	 */
	validate : function() {
		var me = this, bussData = me.getBussData(), viewData = me.getViewData(), errors = new Ext.data.Errors(), checkResult;
		me.callParent(arguments);
		if (bussData) {// 校验业务数据
			checkResult = bussData.validate();
			errors.addAll(checkResult.getRange(0, checkResult.getCount() - 1));
		}
		// TODO 后期可以强化此校验功能
		if (viewData) {// 校验图形数据
			checkResult = viewData.validate();
			errors.addAll(checkResult.getRange(0, checkResult.getCount() - 1));
		}
		return errors;
	},
	/**
	 * 校验各自的业务数据,各个需要做校验的子模型需要实现此方法.
	 * 主要是各个模型独特的需求,基本的校验可以直接在模型中配置
	 */
	validateBussData : function() {
      return new Ext.data.Errors();
	},
	getIsNew : function() {
		var me = this;
		return me.isNew;
	},
	setIsNew : function(isNew) {
		var me = this;
		me.isNew = isNew;
	},
	/**
	 *重写保存方法
	 */
	 save: function(options) {
	        options = Ext.apply({}, options);

	        var me     = this,
	            action = me.isNew ? 'create' : 'update',//修改此行代码 
	            scope  = options.scope || me,
	            stores = me.stores,
	            i = 0,
	            storeCount,
	            store,
	            operation,
	            callback;

	        Ext.apply(options, {
	            records: [me],
	            action : action
	        });

	        operation = new Ext.data.Operation(options);

	        callback = function(operation) {
	            var success = operation.wasSuccessful();
	            
	            if (success) {
	                for(storeCount = stores.length; i < storeCount; i++) {
	                    store = stores[i];
	                    store.fireEvent('write', store, operation);
	                    store.fireEvent('datachanged', store);
	                    // Not firing refresh here, since it's a single record
	                }
	                Ext.callback(options.success, scope, [me, operation]);
	            }
	            else {
	                Ext.callback(options.failure, scope, [me, operation]);
	            }

	            Ext.callback(options.callback, scope, [me, operation, success]);
	        };

	        me.getProxy()[action](operation, callback, me);

	        return me;
	    }
	     
});