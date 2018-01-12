/**
 * 元模型属性信息的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.MetaModelAttributeModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//元模型属性id（不显示）
	         {name: 'modelId',  type: 'string'},//元模型的ID
	         {name: 'code', type: 'string'},//属性代码
	         {name: 'name', type: 'string'},//属性名称
	         {name: 'datatypeId', type: 'string'}, //数据类型id
	         {name: 'length', type: 'int'}, //属性长度
	         {name: 'max', type: 'int'}, //属性最大值
	         {name: 'min', type: 'int'}, //属性最小值
	         {name: 'isread', type: 'boolean'}, //是否只读:YES/NO
	         {name: 'isnull', type: 'boolean'}, //是否可为null::YES/NO
	         {name: 'isinherit', type: 'boolean'},//是否可继承:YES/NO
	         {name: 'isshow', type: 'boolean'}, //是否可见: YES/NO
	         {name: 'iskey', type: 'boolean'}, //是否逻辑主键
	         {name: 'remark', type: 'string'}, //描述、备注
	         {name: 'displayorder', type: 'string'}, //显示顺序
	         {name: 'displayType', type: 'string'}, //控件类型
	         {name: 'enumId', type: 'string'} //下拉框里的枚举值对象
	         
	     ],
	     validations: [{
			        type: 'length',
			        field: 'attCode',
			        min: 1
			    }, {
			        type: 'length',
			        field: 'attName',
			        min: 1
			    }, {
			        type: 'length',
			        field: 'mmId',
			        min: 1
			    }]
         
 });