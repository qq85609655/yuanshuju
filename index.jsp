<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.gilight.dep.metadata.entity.UserEntity"%>
<html>
<head>
<%
	 String path = request.getContextPath();
//加入单点登入注释下面代码
/*String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
	UserEntity user = (UserEntity)request.getSession().getAttribute("SESSION_CURRENT_USER");
	if(user==null){
		response.sendRedirect(basePath+"login.jsp");
		return ;
	} 
	String loginName = user.getLoginName();
	*/	
	String loginName = "admin";
%>
<title>元数据管理平台2.0版</title>
<link rel="icon" href="<%=path%>/img/login/favicon.ico" mce_href="<%=path%>/img/login/favicon.ico" type="image/x-icon">  
<link rel="shortcut icon" href="<%=path%>/img/login/favicon.ico" mce_href="<%=path%>/img/login/favicon.ico" type="image/x-icon"> 
<link rel="stylesheet" type="text/css" href="Dep/framework/commonlib/extjs/resources/css/ext-all.css" />
<link rel="stylesheet" href="Dep/metadata/resource/css/example.css" type="text/css"/>
<link rel="stylesheet" href="css/jquery-ui.min.css" type="text/css"/>
<link rel="stylesheet" href="css/slider.css" type="text/css"/>
<link rel="stylesheet" href="css/another.css" type="text/css"/>

</head>
<body>
	<script type="text/javascript">
		var currentUserName = "<%=loginName%>";
	</script>
	<!-- ext -->
	<script type="text/javascript" src="Dep/framework/commonlib/extjs/ext-all-debug.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/extjs/ux/TreePicker.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/extjs/ux/DateTime.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/extjs/local/ext-lang-zh_CN.js"></script>
	 
	<!-- draw2d 所需库加载-->
	<script type="text/javascript" src="Dep/framework/commonlib/jquery/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2ddepends/shifty.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2ddepends/raphael.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2ddepends/rgbcolor.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2ddepends/canvg.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/basic/Class.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2ddepends/json2.js"></script>

	<!-- 日志类库 -->
	<script type="text/javascript" src="Dep/framework/commonlib/log4j/log4javascript_uncompressed.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/log4j/log4jservice.js"></script>
	<!-- 绘图库 -->
	<script type="text/javascript" src="Dep/framework/commonlib/draw2d/draw2dmin.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2dextends/draw2dextendsrc.js"></script>
	<script type="text/javascript" src="Dep/framework/commonlib/draw2ddepends/raphael.export.js"></script>
	
	<script type="text/javascript" src="Dep/metadata/resource/i18n/Wording_zh_CN.js"></script>
	<script type="text/javascript" src="Dep/metadata/resource/Url.js"></script>
	<script type="text/javascript" src="Dep/metadata/resource/examples.js"></script>
	<script type="text/javascript" src="Dep/metadata/common/util/Fn.js"></script>
	
	<script type="text/javascript" src="js/d3.min.js"></script>
	<script type="text/javascript" src="js/d3Extends.js"></script>
	
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/jQueryUI.slider.extends.js"></script>

	<script type="text/javascript" src="Dep/framework/commonlib/deft/deft-dev.js"></script>

	<script type="text/javascript" src="initReady.js"></script>
	<div id = "div"> </div>
</body>
</html>
