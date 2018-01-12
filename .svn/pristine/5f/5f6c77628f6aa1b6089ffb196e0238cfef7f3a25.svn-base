/**
 * 元模型管理画布中元模型图元上下文菜单【查看详情】的面板
 */
Ext.define('Dep.metamodel.modelmng.view.MMRelationshipDetailPanel', {
		extend : 'Ext.panel.Panel',
		autoDestroy : false,
		title : "元模型关系详情",
		autoScroll : true,
		width : 960,
		height : 600,
		layout: 'fit',
		closeAction : "hide",
		buttonAlign :"center",
		bodyStyle:"background-color:#FFFFFF;",
		html:"<div id='userAllInfo'><div id='metamodel_relationDetailPanelDiv'></div></div>",
		listeners : {
			close : function(){
				this.hide();
			},
			hide : function(){
				d3.select("#metamodel_relationDetailPanelDiv").html(""); //清空d3画布
			}
		},
		constructor : function(conf) {
			var me = this;
			me.redioGroup = Ext.create('Ext.form.RadioGroup', {
					fieldLabel: '选择关系类型',
		        	cmpTag : 'relationradiogroup',
		        	columns: 3,
		        	vertical: true,
		        	items: [
		            	{ boxLabel: '继承', width: 80, name: 'relationname', cmpTag : 'inheritradio', inputValue: 'true'},
		            	{ boxLabel: '组合', width: 80, name: 'relationname', cmpTag : 'compositionradio', inputValue: 'true'},
		            	{ boxLabel: '依赖', width: 80, name: 'relationname', cmpTag : 'dependradio', inputValue: 'true' }
		        	]
			});
			me.tbar = [me.redioGroup];
			
			me.callParent();
		},
		/**
		 * 获取radiogroup控件
		 */
		getRadioGroup : function() {
			var me = this;
			return me.redioGroup;
		}		
});
