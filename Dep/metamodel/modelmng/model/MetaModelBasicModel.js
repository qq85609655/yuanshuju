/**
 * 元模型的最基本的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.MetaModelBasicModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//id（不显示）
	         {name: 'code', type: 'string'},//代码
	         {name: 'name', type: 'string'},//名称
	         {name: 'isabstract',  type: 'boolean'},//是否抽象类
	         {name: 'remark', type: 'string'},//描述
	         {name: 'parentId', type: 'string'},//有继承关系的父元模型id
	         {name: 'packageid', type: 'string'},//所属文件夹（即包id）
	         {name: 'status', type: 'int'},//状态值（ 0:未发布 ；11：已发布）
	         {name: 'graphSvg', type: 'string'}//图元上传的图标带后缀文件名
	     ],
	     
	     proxy : {
	     	type : 'ajax',
			api : {
				create : 'metamodel/create.do',
				update : 'metamodel/update.do',
				destroy  : 'metamodel/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });
