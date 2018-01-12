
/**
 * 图元store
 */
Ext.define('Dep.framework.editor.model.store.FigureStore', {
	extend : 'Ext.data.Store',

    /**
     * 是否可编辑
     */
	editable: false,
    /**
     * 是否可见
     */
    visible: false,
    /**
     * 重写构造函数
     */
    constructor: function(config) {
    	var me = this;
        // Clone the config so we don't modify the original config object
        config = Ext.apply({}, config);
        
        
        me.callParent([config]);

        
    },
  
    /**
     * 设置是否可见
     * @param {Boolean}editable
     */
	setEditable:function (editable) {
		var me = this;
		me.editable = editable;
		me.each(function(record) {
			if (record.setEditable) {
		        record.setEditable(editable);
			}
		});
	},
    /**
     * 设置是否可编辑
      * @param {Boolean}visible
     */
    setVisible:function (visible) {
        var me = this;
        me.visible = visible;
        me.each(function(record) {
            if (record.setVisible) {
                record.setVisible(visible);
            }
        });
    },
	/**
	 * 获取store所有数据
	 */
	getAllRecords:function () {
		var me = this,records = [];
		me.each(function(record) {
			records.push(record);
		});
		return records;
	}
});