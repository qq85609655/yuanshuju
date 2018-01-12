/**
 * 属性编辑控件
 * 属性编辑控件需要支持以下控件类型：
 * 1. textField
 * 2. 日期
 * 3. combox
 * 4. button
 * 5. picker，  picker分以下几种：
 * 	  grid（单选、多选）	
 *    
 */
Ext.define('Dep.framework.editor.view.PropertiesGrid', {
	extend : 'Ext.grid.property.Grid',
	alias : 'widget.PropertiesGrid',
	propGrid : null,
	dockedItems : null,
	sortableColumns : false,
//	propContainer : null,
	initComponent : function() {
		var me = this;
		// 注册事件
		me.addEvents('beforeSetSource', 'afterSetSource');
		me.callParent();
	},
	constructor : function(cfg) {
		var me = this;
		if(cfg){
			me.propContainer = cfg.propContainer;
		}
		me.initTbar();
		Ext.apply(me,cfg);
		this.callParent();
	},
	/**
	 * listeners监听事件配置
	 */
	listeners :{
//		cellclick : function(obj, td, cellIndex, record, tr, rowIndex, e,
//				eOpts) {
//			var btn = e.getTarget('.controlBtn', 10, true);
//			if (btn) {
//				return false;
//			}
//			var propName = record.get(obj.nameField);
//			var editor = obj.getConfig(propName, 'editor');
//			if (editor) {
//				if (editor instanceof Ext.grid.CellEditor) {
//					if (editor.field instanceof Ext.button.Button) {
//						return false;
//					}
//				} else {
//					if (editor instanceof Ext.button.Button) {
//						return false;
//					}
//				}
//
//			}
//		}
//		/**
//		 * 属性修改前触发
//		 * @param source
//		 * @param recordId
//		 * @param value
//		 * @param oldValue
//		 * @param eOpts
//		 */
//		beforepropertychange : function( source, recordId, value, oldValue, eOpts ){
//			var me = this;
//		},
//		/**
//		 * 属性修改后触发
//		 * @param source
//		 * @param recordId
//		 * @param value
//		 * @param oldValue
//		 * @param eOpts
//		 */
//		propertychange : function( source, recordId, value, oldValue, eOpts ){
//			var me = this;
//			if(me.propContainer){
//				me.propContainer.raiseEvent(Dep.framework.editor.ACTION.PG.PROPERTYCHANGE,source,recordId,value,oldValue);
//			}
//		},
//		/**
//		 * 
//		 * @param obj
//		 * @param source
//		 * @param config
//		 */
//		afterSetSource : function(obj, source, config) {
//			var me = this;
//			for (var name in source) {
//				var recordId = name;
//				var recordValue = source[name];
//				var editor = me.getConfig(recordId, 'editor');
//				if (editor) {
//					if (editor instanceof Ext.grid.CellEditor) {
//						if (editor.field instanceof Dep.framework.editor.view.properties.PickerField) {
//							editor.field.clearData();
//							editor.field.setValue(recordValue);
//						}
//					} else {
//						if (editor instanceof Dep.framework.editor.view.properties.PickerField) {
//							editor.clearData();
//							editor.setValue(recordValue);
//						}
//					}
//				}
//			}
//			if(source==={}){
//			    var panel=this.up('panel');
//			    panel.collapse();				
//			}
//		}		
	},
//	/**
//	 * 扩展父类方法，为setSource添加执行前、后监听事件
//	 * 
//	 * @param source
//	 * @param config
//	 */
//	setSource : function(source, config) {
//		var me = this;
//		me.fireEvent('beforeSetSource', me, source, config);
//		if (me.findPlugin('cellediting')) {
//			me.findPlugin('cellediting').cancelEdit();
//		}
//		var source=source;
//		var sourceClone=Ext.clone(source);
//		var config=config;
//		 for (var name in source){
//		    if(source [name ] instanceof Array){
//		       source [name ]=Ext.JSON.encode(source [name ]);
//		    }
//		}
//		me.callParent(arguments);
//		me.fireEvent('afterSetSource', me, source, config);
//	},	
	/**
	 * 初始化button
	 * @param tag
	 */
	initTbar : function(){
		var me = this;
		var tb1 =  Ext.create("Ext.Button",{text : Dep.framework.editor.I18N.DESCRIPTION.PROP.SAVE,icon : 'img/btn/save.png',cmpTag : 'savePropsBtn',listeners:{click:function(){
			if(me.propContainer){
				me.propContainer.saveData();
			}
		}}});
		var tb2 =  Ext.create("Ext.Button",{text : Dep.framework.editor.I18N.DESCRIPTION.PROP.RESET,icon : 'img/btn/reset.png',cmpTag : 'resetPropsBtn',listeners:{click:function(){
			if(me.propContainer){
				me.propContainer.resetData();
			}			
		}}});
		this.dockedItems =[{
							xtype : 'toolbar',
							dock : 'top',
							hidden : false
//							items : [tb1, tb2]
						}];
	}

});