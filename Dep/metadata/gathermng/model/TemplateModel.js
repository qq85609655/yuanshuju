/**
 * Excel采集模板的数据模型
 * @author hww
 */
 Ext.define('Dep.metadata.gathermng.model.TemplateModel', {
 		extend : 'Ext.data.Model',
 		fields: [
 		 {name: 'id', type: 'string'},//id（不显示）
         {name: 'name', type: 'string'},//名称
         {name: 'remark', type: 'string'},//备注
         {name: 'updateDate',  type: 'string'},//创建时间
         {name: 'filepath',  type: 'string'}//文件路径
     ]
 });