Ext.define('Dep.metadata.gathermng.view.BaseInfoGrid', {
	extend : 'Ext.grid.Panel',
	width : '100%',
	title : '基本信息',
	titleAlign : 'center',
	columnLines : true,
	columns: [
        { text: '采集配置名称',  dataIndex: 'dbsName' , flex: 1},
        { text: '采集配置悬挂点', dataIndex: 'dataPath', flex: 1},
        { text: 'URL', dataIndex: 'url', flex: 1, itemId: 'dbUrl'},
        { text: '用户名', dataIndex: 'username', width: 90, itemId: 'dbUsername'},
        { 
        	text: '密码',
        	dataIndex: 'pwd',
        	itemId: 'dbPwd',
        	width: 90,
        	renderer : function(value) {
        		var val = "";
				if(value){
					var pwdstr = value+"";
					for(var i=0;i<pwdstr.length;i++){
						val += "●";
					}
				}
				return val;
        	}
        },
        { text: '采集schema', dataIndex: 'schema', flex: 1, itemId: 'dbSchema'},
        { text: '描述', dataIndex: 'remark', flex: 1}
    ]
		        
});