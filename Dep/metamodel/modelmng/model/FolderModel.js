/**
 * 文件夹的数据模型
 * @author hww
 */
 Ext.define('Dep.metamodel.modelmng.model.FolderModel', {
 		extend : 'Ext.data.Model',
 		fields: [
	 		 {name: 'id', type: 'string'},//文件夹id（不显示）
	 		 {name: 'name', type: 'string'},//文件夹名称
	 		 {name: 'parentId', type: 'string'},//父文件夹id
	 		 {name: 'namespace', type: 'string'},//命名空间
	 		 {name: 'folderLevel', type: 'string'},//文件夹层级
	 		 {name: 'displayOrder', type: 'string'}//文件夹显示顺序
	         //{name: 'subFolderList', type: 'auto'}, //子文件夹集合
	         //{name: 'modelList', type: 'auto'} //文件夹所包含元模型集合
	     ],
	     validations: [{
			        type: 'length',
			        field: 'name',
			        min: 1
			    }],
		proxy : {
	     	type : 'ajax',
			api : {
				create : 'metamodelfolder/create.do',
				update : 'metamodelfolder/update.do',
				destroy  : 'metamodelfolder/delete.do'
			},
			reader : {
				type : 'json'
			},
			getMethod : function() {
				return 'POST';
			}
	     }
         
 });