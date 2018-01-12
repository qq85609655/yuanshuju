Ext.define('Dep.databackup.controller.DataBackupController', {
	extend : 'Ext.app.Controller',
	viewPanel : null, // 整体面板
	center : null, // 中心面板
	
	refs: [{
        ref: 'bakStartTime',//系统视图树
        selector: 'datefield[cmpTag=bakStartTime]'
		 },{
        ref: 'bakEndTime',//系统视图树
        selector: 'datefield[cmpTag=bakEndTime]'
		 }],
	init : function() {
		var me = this;
		me.initStores();
		me.showWin();
		me.bindEvent();
        window.application=me.getApplication();
	},
	/**
	 * 初始化数据集
	 */
	initStores : function() {
		var me = this;
		Ext.Ajax.async = false;
		if (!me.dataBackupListStore) {
			me.dataBackupListStore = Ext
					.create('Dep.databackup.store.DataBackupListStore');
		}
		Ext.Ajax.async = true;
	},
	
	
	/**
	 * 显示视图管理页面
	 */
	showWin : function(){
		var me = this;
		if(!me.window){
			me.initView();
		}
		me.window.show();
		if (me.dataBackupListStore) {
			me.queryData();
		}
	},
	
	/**
	 * 弹出窗口
	 */
	initView : function() {
		var me = this;
		var panel = me.createPanel();
		if(!me.window) {
			me.window = Ext.create('Dep.databackup.view.DataBackupWindow');
			me.window.add(panel);
		}
	},
	/**
	 * 绑定事件
	 * 
	 * @param obj
	 */
	bindEvent : function() {
		var me = this;
		// 绑定事件
		this.control({
			'button[cmpTag=searchBak]' : {
				click : me.queryData
			},
			'button[cmpTag=startBackup]' : {
				click : me.startBackup
			},
			'button[cmpTag=bakSetting]' : {
				click : me.bakSetting
			},
			scope : me
		})
	},

	/**
	 * 创建Panel
	 */
	createPanel : function() {
		var me = this;
		if (!me.panel) {
			me.panel = Ext.create('Dep.databackup.view.DataBackupListGrid', {
				store : me.dataBackupListStore,
			});
			me.panel.on('deleteTheBackup', me.deleteTheBackup, me);
			me.panel.on('recoverTheBackup', me.recoverTheBackup, me);
		}
		if (!me.startTimeCmpt) {
			me.startTimeCmpt = me.getBakStartTime();
//			Dep.fn.QueryCpt(
//					'datefield[cmpTag=bakStartTime]', me.panel)[0];
		}
		if (!me.endTimeCmpt) {
			me.endTimeCmpt = me.getBakEndTime();
//				Dep.fn.QueryCpt('datefield[cmpTag=bakEndTime]',
//					me.panel)[0];
		}
		return me.panel;
	},

	/**
	 * 显示面板
	 * 
	 * @param store
	 */
	showPanel : function(clickNode) {
		var me = this;
		Dep.EventManager.fireEvent('showTab', this.panel);
		me.queryData();
	},
	/**
	 * 查询数据
	 */
	queryData : function() {
		var me = this,endTime;
		var startD = me.startTimeCmpt.getValue();
		var endD = me.endTimeCmpt.getValue();
		if (startD > endD) {
			Dep.Msg.error(masterdata.databackup.wording.checkDate);
			return false;
		}
		var stStr = me.convertDateToStr(startD) + " 00:00:00:000";
		var etStr = me.convertDateToStr(endD) + " 23:59:59:999";
//		me.dataBackupListStore.on('beforeload', function() {
//
//			Ext.apply(me.dataBackupListStore.proxy.extraParams, {
//				startTime : stStr,
//				endTime : etStr
//			});
//
//		});
		
		me.dataBackupListStore.load();
		me.dataBackupListStore.clearFilter();
		me.dataBackupListStore.addFilter(new Ext.util.Filter({
		    filterFn: function(item) {
		    	endTime = item.get('endTime');
		        return (endTime > stStr) && (endTime<etStr);
		    }
		}));
	},
	
	/**
	 * 将日期值并转换为字符串
	 */
	convertDateToStr: function(val, formatStr) {
		var result = "";
		if (val) {
			formatStr = formatStr ? formatStr : "Y-m-d";
			result = Ext.Date.format(val, formatStr);
		}
		return result;
	},
	/**
	 * 新增备份
	 */
	startBackup : function() {
		var me = this;
		Ext.MessageBox.confirm('备份确认','您确定执行备份操作吗？',function(btn){
			if(btn=="yes"){
				//发送请求保存的事件，让报表结构插件实行保存的操作
				me._startBackup();
			}else{
				return;
			}
		});
	},
	/**
	 * 备份操作
	 */
	_startBackup : function() {
		var me = this;
		// 新建备份
		Ext.Ajax.request({
			url : "backup/start.do",
			// jsonData : Ext.JSON.encode({tabEntyMappId : me.tabMappId}),
			method : "POST",
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				me.dataBackupListStore.load();
			},
			failure : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				Dep.Msg.conFailed(res.resultText);
			}
		});
		
	},
	/**
	 * 删除备份
	 */
	deleteTheBackup : function(grid, index) {
		var me = this, name;
		store = grid.getStore();
		items = store.data.items;
		name = items[index].get("fileName");
		Ext.MessageBox.confirm('删除确认','您确定删除备份【'+name+'】？',function(btn){
			if(btn=="yes"){
				//发送请求保存的事件，让报表结构插件实行保存的操作
				me._deleteTheBackup(grid, index);
			}else{
				return;
			}
		});
	},
	
	_deleteTheBackup : function(grid, index) {
		var me = this, store, items, url = "backup/delete.do";
		store = grid.getStore();
		items = store.data.items;
		id = items[index].get("id");
		Ext.Ajax.request({
			url : url,
			params  : {
				id : id
			},
			method : "POST",
			success : function(response) {
				me.dataBackupListStore.load();
			},
			failure : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				Dep.Msg.conFailed(res.resultText);
			}
		});
	},
	/**
	 * 恢复备份
	 */
	recoverTheBackup : function(grid, index) {
		var me = this, name;
		store = grid.getStore();
		items = store.data.items;
		name = items[index].get("fileName");
		Ext.MessageBox.confirm('恢复确认','您确定恢复备份【'+name+'】？',function(btn){
			if(btn=="yes"){
				//发送请求保存的事件，让报表结构插件实行保存的操作
				me._recoverTheBackup(grid, index);
			}else{
				return;
			}
		});
	},
	_recoverTheBackup : function(grid, index) {
		var me = this, store, items, url = "backup/recover.do";
		store = grid.getStore();
		items = store.data.items;
		id = items[index].get("id");
		Ext.Ajax.request({
			url : url,
			params  : {
				id : id
			},
			method : "POST",
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				Dep.Msg.success(res.resultText);
			},
			failure : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				Dep.Msg.conFailed(res.resultText);
			}
		});
	},
		/**
	 * 备份任务设置
	 */
	bakSetting : function() {
		var me = this, bakSettingPanel = me.getBakSettingPanel(), configWin = me
				.getConfigWin(bakSettingPanel);
		configWin.show();
		// 请求备份任务设置的值
		Ext.Ajax.request({
			url : "systemBackup/current.do",
			// params : {
             //    resultCode : 1
			// },
			method : "GET",
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
                //将请求到的表达式转换格式
                var per=res.result.period;
                var s=res.result.backupTime;
                var str=s.split(' ');
                if(str.length==6 && str[0]!=='' && str[1]!=='' && str[2]!=='' && str[3]=='*' && str[4]=='*' && str[5]=='?'){
                    var everyDay='每天  '+str[2]+':'+str[1]+':'+str[0]
                }else if(str.length==6 && str[0]!=='' && str[1]!=='' && str[2]!=='' && str[3]=='?' && str[4]=='*'){
                    switch (str[5]){
                        case 'SUN':
                            var everyWeek='每周日'+str[2]+':'+str[1]+':'+str[0]
                            break;
                        case 'MON':
                            var everyWeek='每周一'+str[2]+':'+str[1]+':'+str[0]
                            break;
                        case 'TUE':
                            var everyWeek='每周二'+str[2]+':'+str[1]+':'+str[0]
                            break;
                        case 'WED':
                            var everyWeek='每周三'+str[2]+':'+str[1]+':'+str[0]
                            break;
                        case 'THU':
                            var everyWeek='每周四'+str[2]+':'+str[1]+':'+str[0]
                            break;
                        case 'FRI':
                            var everyWeek='每周五'+str[2]+':'+str[1]+':'+str[0]
                            break;
                        default:
                            var everyWeek='每周六'+str[2]+':'+str[1]+':'+str[0]
                            break;
                    }
                }else if(str.length==6 && str[0]!=='' && str[1]!=='' && str[2]!=='' && str[3]!=='' && str[4]=='*' && str[5]=='?'){
                    var everyMonth='每月'+str[3]+'日'+str[2]+':'+str[1]+':'+str[0]

                }else if(str.length==7 && str[0]!=='' && str[1]!=='' && str[2]!=='' && str[3]!=='' && str[4]!=='' && str[5]=='?' &&str[6]=='*'){
                    var everyYear='每年'+str[4]+'月'+str[3]+'日'+str[2]+':'+str[1]+':'+str[0]

                }else{
                    Ext.Msg.alert('警示','请求数据的格式不正确！！！');
                }
                //将转换过后的字符赋值给日历控件
                $('#cronStartTime1-inputEl').val(everyDay);
                $('#cronStartTime2-inputEl').val(everyWeek);
                $('#cronStartTime3-inputEl').val(everyMonth);
                $('#cronStartTime4-inputEl').val(everyYear);
				//根据判断period的值来选中不同的radiofield
                if(per == 'day'){
                   $('#day-inputEl').click();
                   Ext.getCmp('day').focus();
				}else if(per == 'week'){
                    $('#week-inputEl').click();
                    Ext.getCmp('week').focus();
				}else if(per == 'month'){
                    $('#month-inputEl').click();
                    Ext.getCmp('month').focus();
                }else if(per == 'year'){
                    $('#year-inputEl').click();
                    Ext.getCmp('year').focus();
                }
			},
			failure : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				Dep.Msg.conFailed(res.resultText);
			},

		});
	},
	/**
	 * 将请求回来的值渲染到对应的元素上
	 */
	setBaksettings : function(record){
		var me = this;
		if (record) {
			Ext.getCmp('period').setValue({
				period : record.period
			});
			Ext.getCmp('cronStartTime').setValue(
                record.startTimeStr);
		}
	},
	/**
	 * 创建备份设置容器
	 * 
	 * @return {}
	 */
	getBakSettingPanel : function() {
		var me = this;
		if (!me.bakSettingPanel) {
			// me.jobCronStore = Ext.create('Dep.databackup.store.JobCronStore');
			me.bakSettingPanel = Ext.create(
					'Dep.databackup.view.JobCronContainer', {
						store : me.jobCronStore,
					});
		}
		return me.bakSettingPanel;
	},
	/**
	 * 创建或者获取配置窗口
	 * 
	 * @return {}
	 */
	getConfigWin : function(bakSettingPanel) {
		var me = this;
		if (!me.configWin) {
			me.configWin = Ext.create(
					'Dep.databackup.view.JobCronContainer', {
						title : '备份任务设置',
						width : 400,
						height : 200,
						items : [ bakSettingPanel ],
						layout : {
							type : 'fit'
						},
					});
			me.configWin.on('save', me.saveBakChange, me);
		}
		return me.configWin;
	},
	/**
	 * 保存备份任务设置的修改
	 */
	saveBakChange : function(){
		var me = this,url = "systemBackup/start.do";
		var periodValue = Ext.getCmp('period').getValue();
        var str=me.configWin.pro1 || me.configWin.pro2 || me.configWin.pro3 || me.configWin.pro4;
        Ext.Ajax.request({
			url : url,
			params :{
				period : periodValue.period,
				backupTime : str
			},
			method : "POST",
		});
	}
});