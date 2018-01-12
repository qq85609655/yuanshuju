/**
 * 采集资源的面板
 * @author hww
 */
Ext.define('Dep.metadata.gathermng.view.GatherResourcePanel', {
		extend : 'Ext.tree.Panel',
		region : 'west',
	    split : true,
	    width : 180,
	    minSize : 180,
	    maxSize : 180,
	    xtype : 'treepanel',
    	title : '采集资源',
		titleAlign : 'center',
		rootVisible : false,
		collapsible : true,
		cmpTag : 'adaptortree',
		animate : true,
		constructor : function(conf) {
			var me = this;
			if(conf.store) {
				me.store = conf.store;
			}
			me.callParent();
		}
});