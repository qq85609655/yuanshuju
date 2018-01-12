/**
 * 元模型管理画布中元模型图元上下文菜单【查看详情】的弹窗界面
 */
Ext.define('Dep.metamodel.modelmng.view.MMRelationshipDetailWin', {
		extend : 'Ext.window.Window',
		modal : true,
		resizable : false,
		maximizable : true,
		autoDestroy : true,
		constrainHeader  : true,
		title : "元模型关系详情",
		autoScroll : true,
		width : 960,
		height : 600,
		layout: 'fit',
		closeAction : "hide",
		buttonAlign :"center",
		bodyStyle:"background-color:#FFFFFF;",
		html:"<div id='userAllInfo'><div id='metamodel_relationDetailWinDiv'></div></div>",
		listeners : {
			close : function(){
				this.hide();
			},
			hide : function(){
				d3.select("#metamodel_relationDetailWinDiv").html(""); //清空d3画布
			}
		},
		buttons: [
//		          { text: '确定',handler:function(){this.hide();} }
		]		
});
