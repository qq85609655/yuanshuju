/**
 * 版本管理GridPanel
 */
Ext.define("Dep.metadata.metadatamng.view.VersionGridPanel", {
	extend : "Ext.grid.Panel",
	selModel: { selType: 'checkboxmodel' },   //选择框
	columns: null, 
    loadMask: true,
	constructor : function(conf) {
		var me = this;
		me.columns = [                    
		              { text: 'id', dataIndex: 'versionId', align: 'center', maxWidth: 80,hidden : true },
		              { text: Dep.metadata.I18N.metadatamng.versiongridtitle.no, dataIndex: 'userver',  maxWidth: 120 },
		              { text: Dep.metadata.I18N.metadatamng.versiongridtitle.code, dataIndex: 'mdCode', align: 'left', minWidth: 80 },
		              { text: Dep.metadata.I18N.metadatamng.versiongridtitle.name, dataIndex: 'mdName', maxWidth: 80, align: 'left' },                        
		              { text: Dep.metadata.I18N.metadatamng.versiongridtitle.verRemark, dataIndex: 'verRemark', maxWidth: 80, align: 'left' },                        
		              { text: Dep.metadata.I18N.metadatamng.versiongridtitle.isnew, dataIndex: 'isNewVersion', maxWidth: 80 }
		];
		if(conf && conf.store)me.store = conf.store;
		if(conf && conf.propsData){
			me.columns = me.bulidColumns(conf.propsData, me.columns);
		}
		me.callParent();
	},
	bulidColumns : function(props,ar){
		var me = this;
		if(props){
			for(var i=0;i<props.length;i++){
				ar.push({ text: props[i].name, dataIndex: props[i].code, align: 'center', maxWidth: 80});
			}
		}
		return ar;
	}
});