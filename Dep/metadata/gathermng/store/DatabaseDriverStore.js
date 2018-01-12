/**
 * 数据库驱动的Store
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.store.DatabaseDriverStore', {
	extend : 'Ext.data.Store',
	fields : ['id', 'name', 'value'],
	
    data : [{
    		id : 'oracle.jdbc.driver.OracleDriver',
    		name : 'oracle.jdbc.driver.OracleDriver'
    	},{
    		id : 'com.mysql.jdbc.Driver',
    		name : 'com.mysql.jdbc.Driver'
    
   	 	},{
    		id : 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
    		name : 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
    }]
    
});