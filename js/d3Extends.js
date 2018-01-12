/**
 * 扩展d3功能,显示图形数据
 * by raojunjun
 * @param divId d3画布所在div元素的id
 * @param width d3画布的宽度
 * @param height d3画布的高度
 * @param datas d3画布所展示星状图的json数据
 * 注：本js文件在index.jsp页面里跟d3.min.js文件同时引用
 */
function d3_ShowDatas(divId,width,height,datas){
	var color = d3.scale.category20();
	var img_w = 32,img_h=32;
	var svg = d3.select("#"+divId).append("svg") //通过d3选择器获取svg元素,并为其设置宽高等基本属性
	.attr("width", width)
	.attr("height", height);
	
	//力学图的布局
	var force = d3.layout.force() //通过d3布局设置图形的力学布局，并为该布局设置节点、连线及范围等基本属性
	.nodes(datas.nodes)
	.links(datas.lines)
	.size([width,height])
	.linkDistance(200)
	.charge(-1500)
	.start();	
	
	
    var drag = force.drag()
    .on("dragstart",function(d,i){
        d.fixed = true;    //拖拽开始后设定被拖拽对象为固定
    });
	
	//扩展图片
	var nodes_img  =svg.selectAll("image") //扩展svg元素的image元素的属性
	.data(datas.nodes)
	.enter()
	.append("image")
	.attr("x",35)
	.attr("y",35)
	.attr("width",img_w)
	.attr("height",img_h)
	.attr("xlink:href",function(d){return d.image;}) //默认图片
		//添加提示信息
	.on("mouseover",function(d,i){ //监听鼠标的mouseover事件
		if(!d.detail) return "";
		
		var strAr = d.detail.split(",");
		var count = strAr.length,maxWidth =120;
		for(var i=0;i<count;i++){
			var wIndex =strAr[i].length * 15;
			if(wIndex>maxWidth)maxWidth = wIndex;
		}
		var tx=parseFloat(d3.select(this).attr("x"));
		var ty=parseFloat(d3.select(this).attr("y"));
		var tips=svg.append("g") //为svg元素嵌套g元素，并赋值给tips对象
			.attr("id","tips");
		var tipRect=tips.append("rect") //为g元数嵌套rect元素,并设置基本属性
			.attr("x",tx+15)
			.attr("y",ty+15)
			.attr("width",maxWidth)
			.attr("height",25*(strAr.length))
			.attr("fill","#E7E7E7")
			.attr("stroke-width",1)
			.attr("stroke","#CCC");
		
		var tipText=tips.append("text") //为g元素嵌套text元素，并设置基本属性
			.attr("class","tiptools")
			.attr("x",tx+20)
			.attr("y",ty+20);
			//提示信息换行
			tipText.selectAll("tspan")
			.data(strAr)
			.enter()
			.append("tspan")
			.attr("x",tipText.attr("x"))
			.attr("dy",20)
			.text(function(d){
				return d;
			});
	})
	//为扩展图元所对应的image元素绑定鼠标右键菜单事件
	.on("contextmenu", function(d, i) {
			if(d.type && d.type=="metamodelmng") {
				  var controller = Dep.metamodel.modelmng.getApplication().getController("MetaModelController"); //获取元模型管理的控制器对象
				  var dPanel = controller.getMmRelationshipDetailPanel(); //获取关系详情所在的panel对象
				  var tx = parseInt(d3.select(this).attr("x")); // image元素相对于关系详情panel位置的x坐标
		          var ty = parseInt(d3.select(this).attr("y")); // image元素相对于关系详情panel位置的y坐标
				  var px = dPanel.getX(); // 关系详情panel相对于整个docement文档对象位置的x坐标
				  var py = dPanel.getY(); // 关系详情panel相对于整个docement文档对象位置的y坐标
				  var menus = new Ext.menu.Menu();
				  
				  var menu0 = new Ext.menu.Item({
						text : "派生新的元模型",
						handler : function() {
							if(d.record) {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', d.record); //构造元模型的数据model
								controller.showAddInheritMetaModelWin(model); //调用元模型管理的控制器的弹出添加元模型界面的方法
								model = null;
							}
							menu0 = null;
						},
						icon : 'img/btn/add.png'
					});
				  var menu1 = new Ext.menu.Item({
						text : "添加组合关系",
						handler : function() {
							if(d.record) {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', d.record);
								controller.compositionRelationshipMng(model); //调用元模型管理的控制器的弹出添加组合关系界面的方法
								model = null;
							}
							menu1 = null;
						},
						icon : 'img/metamodel/comprelamng.png'
					});
				  var menu2 = new Ext.menu.Item({
						text : "添加依赖关系",
						handler : function() {
							if(d.record) {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', d.record);
								controller.dependencyRelationshipMng(model); //调用元模型管理的控制器的弹出添加依赖关系界面的方法
								model = null;
							}
							menu2 = null;
						},
						icon : 'img/metamodel/dependrelationmng.png'
					});
				  var menu3 = new Ext.menu.Item({
						text : "修改元模型",
						handler : function() {
							if(d.record) {
								var model = Ext.create('Dep.metamodel.modelmng.model.MetaModelModel', d.record);
								controller.showModifyMetaModelWin(model); //调用元模型管理的控制器的修改添加元模型界面的方法
								model = null;
							}
							menu3 = null;
						},
						icon : 'img/btn/mod.png'
					});
				  var menu4 = new Ext.menu.Item({
						text : "删除元模型",
						handler : function() {
							if(d.id) {
								controller.deleteMetaModel(d.id, d.name); //调用元模型管理的控制器的删除元模型的方法
							}
							menu4 = null;
						},
						icon : 'img/btn/delete.png'
					});
				  var menu5 = new Ext.menu.Item({
						text : "发布",
						handler : function() {
							if(d.id) {
								controller.showApprovalMetaModelWin(d.id, d.name); //调用元模型管理的控制器的发布元模型的方法
							}
							menu5 = null;
						},
						icon : 'img/btn/publish.png'
					});
				  var menu6 = new Ext.menu.Item({
						text : "撤销",
						handler : function() {
							if(d.name) {
								controller.repealPublish(d.id, d.name); //调用元模型管理的控制器的撤销已发布元模型的方法
							}
							menu6 = null;
						},
						icon : 'img/btn/repeal.png'
					});
				  var menu7 = new Ext.menu.Item({//暂时不用
						text : "添加到文件夹",
						handler : function() {
							if(d.name) {
								controller.addToFolder(d.name);
							}
							menu7 = null;
						},
						icon : ''
					});
				 if(d.status == 11) {//已发布
					menus.add(menu0);
					menus.add(menu1);
					menus.add(menu2);
					menus.add(menu6);
				 }else {//未发布
					menus.add(menu0);
				    menus.add(menu3);
				    menus.add(menu4);
				    menus.add(menu5);
				 }
				  menus.showAt(px+tx+15, py+ty+40);
			}	  
	})
	.on("mouseout",function(d,i){ // 当鼠标离开image元素时，移除tips所在的g元素
		d3.select("#tips").remove();
	}).call(force.drag);
	
	
	/**
	 * 绘制连接线
	 */
	//定义箭头
	var defs = svg.append("defs"); //给svg元素嵌套defs元素
	var arrowMarker = defs.append("marker") //给defs元素嵌套marker元素，并设置箭头的大小等基本属性
	.attr("id","arrow")
	.attr("markerUnits","strokeWidth")
    .attr("markerWidth","9")
    .attr("markerHeight","9")
    .attr("viewBox","0 0 12 12") 
    .attr("refX","6")
    .attr("refY","6")
    .attr("orient","auto");

	var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2"; //箭头路径的配置信息
	
	arrowMarker.append("path")
	.attr("d",arrow_path)
	.attr("fill","#000");
	
	
	//限制连线范围的边界对象
	var edges_line = svg.selectAll("link").data(datas.lines)
	.enter().append("line")
	.attr("x1",0)
	.attr("y1",0)
	.attr("x2",200)
	.attr("y2",20)
	.style("stroke","#ccc")
	.style("stroke-width",2)
//	.attr("marker-start","url(#arrow)") //在开始定点绘制箭头
//	.attr("marker-mid","url(#arrow)")
	.attr("marker-end","url(#arrow)")
	;
	
	//线上的文字
	var edges_text=svg.selectAll(".linetext")
	.data(datas.lines)
	.enter()
	.append("text")
	.style("font-size","12px")
	.style("fill","#0000FF")
	.style("font-family","SimSun")
	.text(function(d){
		return d.relation;
	})
	//给关系名称text元素绑定鼠标右键菜单事件
	.on("contextmenu", function(d, i) {
		if(d && d.data && d.data.type=="inherit") {
			return ;
		}
		if(d && d.relation=="继承关系") {
			return ;
		}
				  var controller = Dep.metamodel.modelmng.getApplication().getController("MetaModelController");
				  var dPanel = controller.getMmRelationshipDetailPanel();
				  var tx = parseInt(d3.select(this).attr("x")); // text元素相对于关系详情panel位置的x坐标
		          var ty = parseInt(d3.select(this).attr("y")); // text元素相对于关系详情panel位置的y坐标
				  var px = dPanel.getX(); // 关系详情panel相对于整个docement文档对象位置的x坐标
				  var py = dPanel.getY(); // 关系详情panel相对于整个docement文档对象位置的y坐标
				  var menus = new Ext.menu.Menu();
				  
				  var menu1 = new Ext.menu.Item({
						text : "修改关系信息",
						handler : function() {
							var raw = {}, model = null;
							if(d.data.type=="composition") { //右键单击的是组合关系名称的元素
								raw = {
									id : d.data.id,
									name : d.data.name,
									fromMID : d.data.startNodeId,
									toMID : d.data.endNodeId,
									ownerMultiplicity : d.data.ownerMultiplicity,
									toMultiplicity : d.data.toMultiplicity,
									remark : d.data.remark
								};
								model = Ext.create('Dep.metamodel.modelmng.model.CompRelationModel', raw);
								controller.showEditCompRelationWin(model); //弹出修改组合关系的弹窗界面
								model = null;
							}else if(d.data.type=="dependency") { //右键单击的是依赖关系名称的元素
								raw = {
									id : d.data.id,
									name : d.data.name,
									fromMid : d.data.startNodeId,
									toMid : d.data.endNodeId,
									remark : d.data.remark
								};
								model = Ext.create('Dep.metamodel.modelmng.model.DependRelationModel', raw);
								controller.showEditDependRelationWin(model); //弹出修改依赖关系的弹窗界面
								model = null;
							}
							menu1 = null;
						},
						icon : 'img/btn/mod.png'
				  });
				  var menu2 = new Ext.menu.Item({
						text : "删除",
						handler : function() {
							controller.deleteRelationLine(d.data.id, d.data.name, d.data.type, d.data.startNodeId); //删除一条关系
							menu2 = null;
						},
						icon : 'img/btn/delete.png'
				  });
				  menus.add(menu1);
				  menus.add(menu2);
				  menus.showAt(px+tx+15, py+ty+40);
	});
	
	//图片下面的文字
	var nodes_text  =svg.selectAll(".nodetext")
	.data(datas.nodes)
	.enter()
	.append("text")
	.style("font-size","12px")
	.attr("dx",-20)
	.attr("dy",20)
	.text(function(d){
		return d.name;
	});

	//设定力学图更新时调用的函数，使用 force.on(“tick”,function(){ })，表示每一步更新都调用 function 函数。
	var text_dy = 20,text_dx=-20;
	force.on("tick", function(){
		//限制结点的边界
		datas.nodes.forEach(function(d,i){
			d.x = d.x - img_w/2 < 0     ? img_w/2 : d.x ;
			d.x = d.x + img_w/2 > width ? width - img_w/2 : d.x ;
			d.y = d.y - img_h/2 < 0      ? img_h/2 : d.y ;
			d.y = d.y + img_h/2 + text_dy > height ? height - img_h/2 - text_dy : d.y ;
		});
	
		//更新连接线的位置
		 edges_line.attr("x1",function(d){ //根据相似三角形原理，计算连线和箭头总和减去图元半径后的连线起始端x坐标
		 	var diffX = d.target.x - d.source.x;
            var diffY = d.target.y - d.source.y;
            var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
            var offsetX = (diffX * 15) / pathLength;
		 	return d.source.x + offsetX;
		 });
		 edges_line.attr("y1",function(d){ //根据相似三角形原理，计算连线和箭头总和减去图元半径后的连线起始端y坐标
		 	var diffX = d.target.x - d.source.x;
            var diffY = d.target.y - d.source.y;
            var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
		 	var offsetY = (diffY * 15) / pathLength;
		 	return d.source.y + offsetY;
		 });
		 edges_line.attr("x2",function(d){ //根据相似三角形原理，计算连线和箭头总和减去图元半径后的连线终到端x坐标
		 	var diffX = d.target.x - d.source.x;
            var diffY = d.target.y - d.source.y;
            var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
            var offsetX = (diffX * 20) / pathLength;
		 	return d.target.x - offsetX;
		 });
		 edges_line.attr("y2",function(d){ //根据相似三角形原理，计算连线和箭头总和减去图元半径后的连线终到端y坐标
		 	var diffX = d.target.x - d.source.x;
            var diffY = d.target.y - d.source.y;
            var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
		 	var offsetY = (diffY * 20) / pathLength;
		 	return d.target.y - offsetY;
		 });
		 
		 //更新连接线上文字的位置
		 edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
		 edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });
		 
		 //更新结点图元的位置
		 nodes_img.attr("x",function(d){ return d.x - img_w/2; });
		 nodes_img.attr("y",function(d){ return d.y - img_h/2; });
		 
		 //更新结点图元下方文字的位置
		 nodes_text.attr("x",function(d){ return d.x;});
		 nodes_text.attr("y",function(d){ return d.y + img_w/2; });
	});	
}
