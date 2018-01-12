var Fn = Fn || {};
/**
 * Request的Post请求，默认异步请求 asyncFlag ：是否异步请求，若false，则为同步请求，并有返回值
 * 
 * @param url
 * @param asyncFlag
 * @param params
 * @param errormsg
 * @param succCallback  
 * @param failCallback
 * @returns
 */
Fn.Request = function(url, asyncFlag, params, errormsg,succCallback,failCallback) {
	var result = null;
	Ext.Ajax.request({
		url : url,
		params : params,
		method : "POST",
		async : typeof (asyncFlag) != "undefined" ? asyncFlag : true,
		success : function(response) {
			var res = Ext.JSON.decode(response.responseText);
			result = res;
			if(succCallback && typeof(succCallback)=="function"){
				succCallback(result);
			}
		},
		failure : function(response) {
			if(failCallback){
				failCallback(result);
			}else{
				Dep.framework.editor.util.Msg.failed("请求数据失败！","提示");
			}
		}
	});
	return result;
};
/**
 * 请求对象数据
 * @param url
 * @param asyncFlag
 * @param obj   
 * @param errormsg
 * @param succCallback
 * @param failCallback
 * @returns
 */
Fn.RequestObj = function(url, asyncFlag, obj, errormsg,succCallback,failCallback) {
	var result = null;
	Ext.Ajax.request({
		url : url,
		jsonData : Ext.JSON.encode(obj),
		method : "POST",
		async : typeof (asyncFlag) != "undefined" ? asyncFlag : true,
		success : function(response) {
			var res = Ext.JSON.decode(response.responseText);
			result = res;
			if(succCallback){
				succCallback(result);
			}
		},
		failure : function(response) {
			if(failCallback){
				failCallback(result);
			}else{
				Dep.framework.editor.util.Msg.failed("请求数据失败！","提示");
			}
		}
	});
	return result;
};

/**
 * ajax请求
 */
Fn.RequestDiffer = function(requestKey, url,  params,method,asyncFlag) {
	var result = null;
//	var deferred = $.Deferred();
	var deferred = Ext.create('Deft.Deferred');
	Ext.Ajax.request({
		url : url,
		params : params,
		method : method?method:"POST",
		async : typeof (asyncFlag) != "undefined" ? asyncFlag : true,
		success : function(response) {
			var res = Ext.JSON.decode(response.responseText);
			if (res.resultCode != 1) {
				deferred.reject({
					requestKey : requestKey,
					result : res.resultText
				});
				return;
			}
			result = res.result;
			deferred.resolve({
				requestKey : requestKey,
				result : result
			});
		},
		failure : function(response) {
			deferred.reject({
				requestKey : requestKey,
				result : "请求数据失败"
			});
		}
	});
	return deferred.promise;
};

