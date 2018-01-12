/**
 * 采集结果列表
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.GatherResultGrid', {
		extend : 'Ext.grid.Panel',
    	title : '采集结果',
    	titleAlign : 'center',
    	columnLines : true,
    	autoScroll : false,
    	maxHeight : 280,
    	height : 280,
    	margin : '10 0 0 0',
    	selModel : Ext.create('Ext.selection.CheckboxModel', {mode : 'MULTI'}),
    	tbar : [
        	{
        		xtype : 'textfield',
        		fieldLabel : '名称&nbsp;',
        		cmpTag : 'resultnametf',
        		labelWidth : 40,
        		width : 200,
        		name : 'name'
    		},{
        		xtype : 'combo',
        		fieldLabel : '元模型&nbsp;',
        		cmpTag : 'resultmmcombo',
        		margin : '0 0 0 10',
        		labelWidth : 60,
        		width : 200,
        		name : 'mmId',
        		store: Ext.create('Dep.metadata.common.store.ComboStore',{
					url : Dep.metadata.url.metadatamng.getModelList,
					autoLoad : false
				}),
			    displayField: 'name',
			    valueField: 'id',
			    editable : true
        	},{
        		xtype : 'button',
        		text : '查询',
        		width : 60,
        		margin : '0 0 0 5',
        		cmpTag : 'resultsearchbtn'
        	},{
        		xtype : 'button',
        		text : '审核',
        		width : 60,
        		margin : '0 0 0 5',
        		cmpTag : 'resultauditbtn'
        	}
    	],
    	columns: [
	        { text: '代码',  dataIndex: 'mdCode' , flex: 1},
	        { text: '名称', dataIndex: 'mdName', flex: 1},
	        { text: '变更时间', dataIndex: 'updateDate', flex: 1},
	        { 
	        	text: '操作', 
	        	dataIndex:'id',
	        	renderer : function(value,meta,record){  
			          var resultStr = "<div class='controlBtn'>" +     
			                            "<a href='javascript:(function detail(){Gather.ColumnLinker.fireEvent(`detail`, "+'"'+record.get('id')+'"'+", this);})();' name='detail'>详情</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
			                            "<a href='javascript:(function check(){Gather.ColumnLinker.fireEvent(`check`, "+'"'+record.get('id')+'"'+", this);})();' name='check'>审核</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
			                            "</div>";     
			          return resultStr;     
			        },     
	        	flex: 1
	        }
	    ]
});

