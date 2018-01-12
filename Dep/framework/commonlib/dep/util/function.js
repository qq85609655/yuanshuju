var Dep = Dep || {};
Dep.fn = Dep.fn || {};

/**
 * ajax请求
 */
Dep.fn.Request = function(url, asyncFlag, params, succCallback, failCallback,
		method) {
	var result = null;
	Ext.Ajax.request({
		url : url,
		params : params,
		method : method ? method : "POST",
		async : typeof (asyncFlag) != "undefined" ? asyncFlag : true,
		success : function(response) {
			var res = Ext.JSON.decode(response.responseText);
			result = res;
			if (succCallback && typeof (succCallback) == "function") {
				succCallback(result);
			}
		},
		failure : function(response) {
			if (failCallback) {
				failCallback(response);
			} else {
				Dep.Msg.failed("请求数据失败！", "提示");
			}
		}
	});
	return result;
};
/**
 * request请求方法，解析判断返回对象是成功对象还是失败对象。
 * 默认设置了失败回调函数，如果不希望有失败回调，可以简洁设置为'NONE'
 * ajax请求
 * requestObject = {
   url:'请求URL信息',
   async:'是否同步',
   params:'参数',
   method:'同步还是异步',
   succCallback:成功回调,
   failCallback:失败回调
 * 
 * }
 */
Dep.fn.Req = function(options) {
	var result = null,failCallback = options.failCallback,succCallback = options.succCallback;
	if(!failCallback){//没有设置，使用默认设置
		failCallback = function(msg,result){
			Dep.Msg.failed(msg, '错误');
		};
	}
	if(failCallback ==='NONE'){
		failCallback = null;
	}
	if(failCallback && typeof (failCallback) != "function"){
		failCallback = function(msg,result){
			Dep.Msg.failed(msg, '错误');
		};
	}
	var defaultOptions = {
			async:true,
			method:'POST',
			success : function(response) {
				Dep.fn.loadMask.hide();
				var res = Ext.JSON.decode(response.responseText);
				result = res;
				if(!result) {
					failCallback?failCallback('请求数据失败，服务器返回数据结构不正确'):'';
					return;
				}
				if(!result.resultCode ||result.resultCode != 1) {
					failCallback?failCallback(result.resultText,result.result):'';
					return;
				}
				if (succCallback && typeof (succCallback) == "function") {
					succCallback(result.resultText,result.result);
				}
			},
			failure : function(response) {
				Dep.fn.loadMask.hide();
				if (failCallback) {
					failCallback('连接服务器失败。请联系管理员。');
				} 
			}
	};
	options = Ext.apply(defaultOptions,options);
	if(!options.undisplayMask){
		Dep.fn.loadMask.show();
	}
	Ext.Ajax.request(options);
	return result;
};
/**
 * ajax请求
 */
Dep.fn.RequestDiffer = function(requestKey, url, params, method, asyncFlag) {
	var result = null;
	//	var deferred = $.Deferred();
	var deferred = Ext.create('Deft.Deferred');
	Ext.Ajax.request({
		url : url,
		params : params,
		method : method ? method : "POST",
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

/**
 * 等待窗口
 */
Dep.fn.loadMask = {
	show : function(text, panel) {
		//保证单例
		if (typeof (Dep.loadMask) != "undefined" || Dep.loadMask) {
			Dep.loadMask.hide();
			delete Dep.loadMask;
		}
		var target = panel ? panel : Ext.getBody();
		Dep.loadMask = new Ext.LoadMask(target, {
			manager : Ext.ZIndexManager,
			msg : text ? text : "数据加载中，请稍后..."
		});
		Dep.loadMask.show();
	},
	hide : function() {
		if (Dep.loadMask)
			Dep.loadMask.hide();
		delete Dep.loadMask;
	},
	close : function() {
		if (Dep.loadMask)
			Dep.loadMask.hide();
		delete Dep.loadMask;
	}
};
/**
 * 获取精确到日期的时间
 * @return {}
 */
Dep.fn.getDateWithOutHour = function(hour, min, sec) {
	var date = new Date();
	date.setHours(hour ? hour : 0);
	date.setMinutes(min ? min : 0);
	date.setSeconds(sec ? sec : 0);
	return date;
};


