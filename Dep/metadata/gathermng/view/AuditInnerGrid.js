/**
 * 测试元数据审核的嵌套第二层grid的代码
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.AuditInnerGrid' ,{
		extend: 'Ext.grid.Panel',
		cmpTag : 'auditinnergrid',
        columns: [
	        { text: '代码',  dataIndex: 'mdCode' , flex: 1},
	        { text: '名称', dataIndex: 'mdName', flex: 1},
	        { text: '变更时间', dataIndex: 'updateDate', flex: 1},
	        { 
	        	text: '操作', 
	        	dataIndex:'id',
	        	renderer : function(value,meta,record){  
			          var resultStr = "<div class='controlBtn'>" +     
			                            "<a href='javascript:(function detail(){Gather.ColumnLinker.fireEvent(`mddetail`, "+'"'+record.get('id')+'"'+", this);})();' name='detail'>详情</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
			                            "<a href='javascript:(function check(){Gather.ColumnLinker.fireEvent(`mdcheck`, "+'"'+record.get('id')+'"'+", this);})();' name='check'>审核</a>&nbsp;&nbsp;&nbsp;&nbsp;" +     
			                            "</div>";     
			          return resultStr;     
			        },     
	        	flex: 1
	        }
	    ],
	    plugins: [{  
	        ptype: 'rowexpander',
	        rowBodyTpl: [  
	                '<div id="{id}">',  
	                '</div>'  
	            ]  
	    }],
    listeners:{
        itemmouseenter:function( view, record, item, index, e, eOpts ){
            var rowIndex=item.rowIndex;//第一行的样式没问题，排除第一行
            if(rowIndex>0){
                var styleSelect=item.previousSibling.className;
                if(styleSelect.indexOf("x-grid-row-before-over")>1){
                    $("tr").removeClass("x-grid-row-before-over");
                }
            }
        }
    },
	    sortableColumns : false,
	    autoScroll : true,
        stripeRows : true,
	    viewConfig : {
            enableTextSelection : true
        },
	    header: false,//隐藏头部  
	    animCollapse: false,
        columnLines: true,  
        autoWidth: true,  
        autoHeight: true,  
        margin : '0 0 0 17',
        frame: false,  
        initComponent: function() {
	        //调用父类的initComponent()方法               
	        this.callParent(arguments);
	    }
});