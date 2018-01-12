Ext.define('Dep.metadata.gathermng.view.LogDetailWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : true,
		maximizable : true,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		height: 330,
	    width: 600,
	    title: '采集日志',
	    titleAlign: 'left',
	    closeAction : 'hide',
	    buttonAlign: 'center',
	    listeners : {
	        maximize : {
	            fn: function(){ 
	            	this.down('textarea').setSize('100%', this.height-70);
	            }
	        },
	        restore : {
	            fn: function(){ 
	            	this.down('textarea').setSize('100%', 260);
	            }
	        }
	    },
	    
        items: [
            {
                xtype : 'textarea',
                cmpTag : 'logdetail',
                grow : true,
                border : null,
                readOnly : true,
		        name : 'logResult',
		        fieldLabel : '',
		        height : 260,
		        width : '100%'
            }
        ],
	                
	    buttons : [{
						xtype : 'button',
						text : '关闭',
						margin : '0 0 10 0',
						cmpTag : 'closejogwin',
						handler : function() {
							this.up('window').hide();
						}
					}] 
});