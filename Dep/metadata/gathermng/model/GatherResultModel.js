/**
 * 采集结果基本信息的数据模型
 * @author hww
 */
 Ext.define('Dep.metadata.gathermng.model.GatherResultModel', {
 		extend : 'Ext.data.Model',
 		fields: [
 		 {name: 'id', type: 'string'},//id（不显示）
 		 {name: 'mmName', type: 'string'},//元模型名称
 		 {name: 'mmId', type: 'string'},//元模型id
         {name: 'mdCode', type: 'string'},//代码,元数据编码
         {name: 'mdName', type: 'string'},//名称,元数据名称
         {name: 'mdPackageid', type: 'string'},//所属包id
         {name: 'parentcode', type: 'string'},//父元数据代码、父code
         {name: 'parentid', type: 'string'},//父元数据id、父id
         {name: 'status', type: 'int'},//状态
         {name: 'sysver', type: 'string'},//系统版本
         {name: 'userver', type: 'string'},//用户定义版本
         {name: 'verRemark', type: 'string'},//版本描述
         {name: 'updateDate', type: 'string'},//创建时间
         {name: 'remark',  type: 'string'},//描述
         {name: 'isuse', type: 'int'},//是否为当前版本,正在被使用
         {name: 'attList', type: 'auto'}//元数据属性集合
     ]
 });