/**
 * 扩展d3功能,显示数据
 * by raojunjun
 */
d3 = d3||{};
d3.ShowDatas = function(divId,width,height,datas){
	var color = d3.scale.category20();
	var img_w = 32,img_h=32;
	var svg = d3.select("#"+divId).append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("id",divId+"-d3svg");
	
	//力学图的布局
	var force = d3.layout.force()
	.nodes(datas.nodes)
	.links(datas.lines)
	.size([width,height])
	.linkDistance(200)
	.charge(-1500)
	.start();	
	
	//扩展图片
	var nodes_img  =svg.selectAll("image")
	.data(datas.nodes)
	.enter()
	.append("image")
	.attr("x",35)
	.attr("y",35)
	.attr("width",img_w)
	.attr("height",img_h)
	.attr("xlink:href",function(d){return d.image;}) //默认图片
		//添加提示信息
	.on("mouseover",function(d,i){
		if(!d.detail) return "";
		
		var strAr = d.detail.split(",");
		var count = strAr.length,maxWidth =120;
		for(var i=0;i<count;i++){
			var wIndex =strAr[i].length * 15;
			if(wIndex>maxWidth)maxWidth = wIndex;
		}
		var tx=parseFloat(d3.select(this).attr("x"));
		var ty=parseFloat(d3.select(this).attr("y"));
		var tips=svg.append("g")
			.attr("id","tips");
		var tipRect=tips.append("rect")
			.attr("x",tx+15)
			.attr("y",ty+15)
			.attr("width",maxWidth)
			.attr("height",30*(strAr.length))
			.attr("fill","#E7E7E7")
			.attr("stroke-width",1)
			.attr("stroke","#CCC");
		
		var tipText=tips.append("text")
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
	.on("mouseout",function(d,i){
		d3.select("#tips").remove();
	}).call(force.drag);
	
	
	//绘制连接线
	//定义箭头
	var defs = svg.append("defs");
	var arrowMarker = defs.append("marker")
	.attr("id","arrow")
	.attr("markerUnits","strokeWidth")
    .attr("markerWidth","9")
    .attr("markerHeight","9")
    .attr("viewBox","0 0 12 12") 
    .attr("refX","6")
    .attr("refY","6")
    .attr("orient","auto");

	var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
	
	arrowMarker.append("path")
	.attr("d",arrow_path)
	.attr("fill","#000");
	
	
	
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
//	.style("fill-opacity","0.0")
	.style("font-family","SimSun")
	.text(function(d){
		return d.relation;
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
		 edges_line.attr("x1",function(d){ return d.source.x; });
		 edges_line.attr("y1",function(d){ return d.source.y; });
		 edges_line.attr("x2",function(d){
		 	var diffX = d.target.x - d.source.x;
            var diffY = d.target.y - d.source.y;
            var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
            var offsetX = (diffX * 20) / pathLength;
		 	return d.target.x - offsetX;
		 });
		 edges_line.attr("y2",function(d){
		 	var diffX = d.target.x - d.source.x;
            var diffY = d.target.y - d.source.y;
            var pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));
		 	var offsetY = (diffY * 20) / pathLength;
		 	return d.target.y - offsetY;
		 });
		 
		 //更新连接线上文字的位置
		 edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
		 edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });
		 
		 //更新结点图片和文字
		 nodes_img.attr("x",function(d){ return d.x - img_w/2; });
		 nodes_img.attr("y",function(d){ return d.y - img_h/2; });
		 
		 nodes_text.attr("x",function(d){ return d.x;});
		 nodes_text.attr("y",function(d){ return d.y + img_w/2; });
	});	
}
