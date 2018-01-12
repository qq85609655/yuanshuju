<%@page import="com.gilight.dep.framework.util.string.StringUtil"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String msg = (String)request.getSession().getAttribute("ERROR_MSG");
	if(StringUtil.isEmpty(msg) || msg.equalsIgnoreCase("null"))msg="";	
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>元数据管理平台2.0版登录</title>
<%--<link rel="icon" href="<%=path%>/img/login/favicon.ico" mce_href="<%=path%>/img/login/favicon.ico" type="image/x-icon">  --%>
<%--<link rel="shortcut icon" href="<%=path%>/img/login/favicon.ico" mce_href="<%=path%>/img/login/favicon.ico" type="image/x-icon"> --%>
<%--<link href="Dep/metadata/resource/css/login-style.css" rel="stylesheet" type="text/css" />--%>

	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/login.css">

<script type="text/javascript" src="Dep/framework/commonlib/extjs/ext-all-debug.js"></script>
</head>
<body>
<div class="container"><div class="login-header login-mar-t50">
	<h3><a href="#"><img src="img/login/logo.png"  /></a></h3>
	<a class="login-header-infor" href="#">元数据管理平台</a></div></div>
<div class="login-bgcolor">
	<div class="login-bg">
		<div class="login-windows">
			<form action="<%=basePath%>auth/admin/login.do" method="post">
			<input id="loginName" name="loginName" class="login-zhanghao" type="text" placeholder="输入用户名"/>
			<input id="password" name="password" class="login-mima" type="password" placeholder="输入密码" />
			<%--<a href="#" class="login-button" >登 <span class="lg-mar-15">录</span></a></div>--%>
			<div class="login-fifth">
				<input style="text-align:center;line-height:1.2;padding-left:20px;letter-spacing:20px; border:0px" class="login-button" type="submit" value="登录"
					   onClick="return check()">
			</div>
			</form>
			<div id="errorMsg" class="login-message"></div>
			</div>
	</div>
</div>
<div class="login-footer">精华教育科技股份有限公司 版权所有</div>
</body>
<script>
    var msg ="<%=msg%>";
	var errorMsg = document.getElementById("errorMsg");
  	Ext.onReady(function () {
  	});
  	
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	function check(e) {

		var nameObj = document.getElementById("loginName");
		var passwordObj = document.getElementById("password");
		var errorMsg = document.getElementById("errorMsg");
		nameObj.value = nameObj.value.trim();
		passwordObj.value = passwordObj.value.trim();
		if (nameObj.value == "" || nameObj.value == "请输入用户名") {
			errorMsg.innerHTML ="<font color='red'>请输入用户名!</font>";
			nameObj.focus();
			return false;
		} else if (passwordObj.value == "" || passwordObj.value == "请输入密码") {
			errorMsg.innerHTML ="<font color='red'>请输入密码!</font>";
			passwordObj.focus();
			return false;
		}
		document.getElementById("loading-mask").style.display = "block";
		document.getElementById("loading").style.display = "block";			
		return true;
	}
    if(msg)errorMsg.innerHTML ="<font color='red'></font>";
	if(msg)errorMsg.innerHTML ="<font color='red'>"+msg+"</font>";
</script>
</html>