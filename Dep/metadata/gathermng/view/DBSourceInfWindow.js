/**
 * 编辑数据源基本信息的弹出窗
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.DBSourceInfWindow', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : false,
		autoDestroy : false,
		constrainHeader  : true,
		border : null,
		height: 330,
	    width: 590,
	    title: '采集配置基本信息',
	    titleAlign: 'left',
	    closeAction : 'hide',
	    isAdd : true,
	    constructor : function(conf) {
	        var me = this;
	        Ext.applyIf(me, {
	            items: [
                {
                    xtype: 'form',
                    frame: true,
                    height: 300,
                    padding: 10,
                    width: 590,
                    layout: {
                        type: 'column'
                    },
                    buttonAlign: 'center',
                    bodyPadding: 10,
                    title: '',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: '<font color="red">*</font>名称',
                            labelAlign: 'right',
                            cmpTag : 'datasourcename',
                            labelWidth: 60,
                            name : 'dbsName',
                            allowBlank : false,
							blankText : '名称不能为空',
							validateBlank : true,
							maxLength : 85,
							maxLengthText : '名称的最大长度是85',
							msgTarget : 'qtip'
                        },{
                            xtype: 'treepicker',
                            margin: '0 0 0 20',
                            fieldLabel: '<font color="red">*</font>采集配置悬挂点',
                            cmpTag : 'hangPoint',
                            labelAlign: 'right',
                            name : 'dataPath',
                            displayField: 'text',
                            value: '',
                            autoScroll : true,
      						minPickerHeight: 200,
                            store : conf.mdTreeStore,
                            allowBlank : false,
							blankText : '悬挂点不能为空',
							validateBlank : true,
							msgTarget : 'qtip'
                        },{
                        	xtype: 'combobox',
                        	itemId:'driver',
                        	margin: '10 0 0 0',
                        	fieldLabel: '<font color="red">*</font>驱动',
                        	labelAlign: 'right',
                        	cmpTag : 'driver',
                        	labelWidth: 60,
                        	name : 'driver',
                        	displayField : 'name',
                        	valueField : 'id',
                        	autoScroll : true,
                        	editable : true,
                        	allowBlank : false,
                        	blankText : '驱动不能为空',
                        	validateBlank : true,
                        	msgTarget : 'qtip',
                    		listeners:{
            	            	change: function( view, newValue, oldValue, eOpts ){
            	            		var url = Ext.ComponentQuery.query('#url');
            	            		if(newValue=='oracle.jdbc.driver.OracleDriver'){
             	            			url[0].setValue('jdbc:oracle:thin:@192.168.200.76:1521:orcl');
	             	            	  }else if(newValue=='com.mysql.jdbc.Driver'){
	             	            		url[0].setValue('jdbc:mysql://192.168.200.76:1521/orcl');
	             	            	  }else if(newValue=='com.microsoft.sqlserver.jdbc.SQLServerDriver'){
	             	            		url[0].setValue('jdbc:sqlserver://192.168.200.76:1521;DatabaseName=orcl');
	             	            	  }
            	            	}
                    		}
                        		
                        },{
                        	 xtype: 'textfield',
                        	 fieldLabel: '<font color="red">*</font>主机地址',
                        	 itemId:'hostAddress',
                        	 labelAlign: 'right',
                        	 name : 'hostAddress',
                        	 cmpTag:'hostAddress',
                        	 margin: '10 0 0 55',
                        	 labelWidth: 60,
                        	 allowBlank : false,
 							 validateBlank : true,
 							 maxLength : 85,
 							 maxLengthText : '主机地址的最大长度是85',
                        	 blankText : '主机地址不能为空',
                        	 msgTarget : 'qtip',
                    		 listeners : {
                    			 change:function( view, newValue, oldValue, eOpts ) {
                    				 var url = Ext.ComponentQuery.query('#url');
                    				 //获取驱动组件
                    				 var driver=Ext.ComponentQuery.query('#driver');
                    				 //获取驱动组件的值
                    				 var driverValue=driver[0].lastValue;
                    				 if(driverValue==''||driverValue=='oracle.jdbc.driver.OracleDriver'){
             	            			url[0].setValue('jdbc:oracle:thin:@'+newValue+':1521:orcl');
	             	            	  }else if(driverValue=='com.mysql.jdbc.Driver'){
	             	            		url[0].setValue('jdbc:mysql://'+newValue+':1521/orcl');
	             	            	  }else if(driverValue=='com.microsoft.sqlserver.jdbc.SQLServerDriver'){
	             	            		url[0].setValue('jdbc:sqlserver://'+newValue+':1521;DatabaseName=orcl');
	             	            	  }
                 				}
                    		 }
                        },{
                        	 xtype: 'textfield',
                        	 itemId:'portNumber',
	                       	 fieldLabel: '<font color="red">*</font>端口号',
	                       	 labelAlign: 'right',
                             name:'portNumber',
                             cmpTag:'portNumber',
	                       	 labelWidth: 60,
	                       	 allowBlank : false,
							 validateBlank : true,
							 maxLength : 85,
							 maxLengthText : '端口号的最大长度是85',
	                       	 margin: '10 0 0 0',
	                       	 blankText : '端口号不能为空',
	                       	 msgTarget : 'qtip',
                       		 listeners : {
                    			 change:function( view, newValue, oldValue, eOpts ) {
                    				 var url = Ext.ComponentQuery.query('#url');
                    				 //获取主机地址组件
                    				 var hostAddress=Ext.ComponentQuery.query('#hostAddress');
                    				 //获取主机地址组件的值
                    				 var hostAddressValue=hostAddress[0].lastValue;
                    				 //获取驱动组件
                    				 var driver=Ext.ComponentQuery.query('#driver');
                    				 //获取驱动组件的值
                    				 var driverValue=driver[0].lastValue;
                    				 if(driverValue==''||driverValue=='oracle.jdbc.driver.OracleDriver'){
             	            			url[0].setValue('jdbc:oracle:thin:@'+hostAddressValue+':'+newValue+':orcl');
	             	            	 }else if(driverValue=='com.mysql.jdbc.Driver'){
	             	            		url[0].setValue('jdbc:mysql://'+hostAddressValue+':'+newValue+'/orcl');
	             	            	 }else if(driverValue=='com.microsoft.sqlserver.jdbc.SQLServerDriver'){
	             	            	    url[0].setValue('jdbc:sqlserver://'+hostAddressValue+':'+newValue+';DatabaseName=orcl');
	             	            	 }
                 				}
                    		 } 
                        },{
                        	 xtype: 'textfield',
                        	 itemId:'databaseName',
                        	 labelWidth: 60,
                        	 allowBlank : false,
 							 validateBlank : true,
 							 maxLength : 85,
 							 maxLengthText : ' 数据库名的最大长度是85',
	                       	 fieldLabel: '<font color="red">*</font>数据库名',
	                       	 name:'databaseName',
	                       	 cmpTag:'databaseName',
	                       	 labelAlign: 'right',
	                       	 margin: '10 0 0 58',
	                       	 blankText : '数据库名不能为空',
	                       	 msgTarget : 'qtip',
                       		 listeners : {
                    			 change:function( view, newValue, oldValue, eOpts ) {
                    				 var url = Ext.ComponentQuery.query('#url');
                    				 var hostAddress=Ext.ComponentQuery.query('#hostAddress');
                    				 var hostAddressValue=hostAddress[0].lastValue;
                    				 //获取端口号组件
                    				 var portNumber=Ext.ComponentQuery.query('#portNumber');
                    				 //获取端口号组件的值
                    				 var portNumberValue=portNumber[0].lastValue;
                    				//获取驱动组件
                    				 var driver=Ext.ComponentQuery.query('#driver');
                    				 //获取驱动组件的值
                    				 var driverValue=driver[0].lastValue;
                    				 if(driverValue=='oracle.jdbc.driver.OracleDriver'){
             	            			url[0].setValue('jdbc:oracle:thin:@'+hostAddressValue+':'+portNumberValue+':'+newValue);
	             	            	 }else if(driverValue=='com.mysql.jdbc.Driver'){
	             	            		url[0].setValue('jdbc:mysql://'+hostAddressValue+':'+portNumberValue+'/'+newValue);
	             	            	 }else if(driverValue=='com.microsoft.sqlserver.jdbc.SQLServerDriver'){
	             	            		url[0].setValue('jdbc:sqlserver://'+hostAddressValue+':'+portNumberValue+';DatabaseName='+newValue);
	             	            	 }
                 				}
                    		 }
                        },{
                            xtype: 'textfield',
                            margin: '10 0 0 0',
                            fieldLabel: '<font color="red">*</font>用户名',
                            cmpTag : 'username',
                            labelAlign: 'right',
                            labelWidth: 60,
                            name : 'username',
                            allowBlank : false,
							blankText : '用户名不能为空',
							validateBlank : true,
							maxLength : 85,
							maxLengthText : '用户名的最大长度是85',
							msgTarget : 'qtip'
                        },{
                            xtype: 'textfield',
                            margin: '10 0 0 20',
                            fieldLabel: '<font color="red">*</font>密码',
                            cmpTag : 'password',
                            labelAlign: 'right',
                            name : 'pwd',
                            inputType: 'password',  //密码框
                            allowBlank : false,
							blankText : '密码不能为空',
							validateBlank : true,
							maxLength : 256,
							maxLengthText : '密码的最大长度是256',
							msgTarget : 'qtip'
                        },{
                            xtype: 'textfield',
                            itemId:'url',
                            margin: '10 0 0 0',
                            fieldLabel: '<font color="red">*</font>URL',
                            cmpTag : 'url',
                            labelAlign: 'right',
                            name : 'url',
                            readOnly:true,
                            width : 486,
                            labelAlign: "right",      //靠右
                            labelWidth:60,         //  label宽度
                            allowBlank : false,
							blankText : 'URL不能为空，格式如："jdbc:oracle:thin:@{IP}:1521:orcl"',
							validateBlank : true,
							maxLength : 256,
							maxLengthText : 'URL的最大长度是256',
							msgTarget : 'qtip'
							
                        },{
                            xtype: 'combobox',
                            margin: '10 0 0 0',
                            fieldLabel: '<font color="red">*</font>schema',
                            labelAlign: 'right',
                            cmpTag : 'schema',
                            labelWidth: 60,
                            name : 'schema',
                            displayField : 'name',
                            valueField : 'id',
                            autoScroll : true,
                            editable : false,
                            allowBlank : false,
							blankText : 'schema不能为空',
							validateBlank : true,
							msgTarget : 'qtip'
                        },{
                            xtype: 'button',
                            margin: '10 0 0 5',
                            text: '获取',
                            cmpTag : 'obtainschema',
                            tooltip: '重新获取数据库的schema',
							tooltipType: 'qtip'
                        },{
                            xtype: 'textareafield',
                            height: 80,
                            margin: '10 0 0 0',
                            fieldLabel: '描述',
                            labelAlign: 'right',
                            cmpTag : 'dsremark',
                            labelWidth: 60,
                            width : 476,
                            name : 'remark',
                            maxLength : 170,
							maxLengthText : '描述的最大长度是170',
							msgTarget : 'qtip'
                        }
                    ],
                    buttons : [{
		    				xtype: 'button',
		                    text: '保存',
		                    cmpTag : 'savedbsource'
		               },{
		                    xtype: 'button',
		                    text: '取消',
		                    cmpTag : 'cancelsavedbs'
		                }]
                }
            ]
	        });
	
	        me.callParent();
	    }
});