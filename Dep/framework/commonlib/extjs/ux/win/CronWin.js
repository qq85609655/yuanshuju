/**
 * @author He Yuqing
 * 
 */
Ext.define('Ext.ux.win.CronWin', {
	extend : 'Ext.window.Window',
	plain : true,
	alias : 'widget.cronwin',
	modal : true,
	resizable : false,
	maximizable : true,// 可最大化
	// layout : 'fit',
	closeAction : "hide", // 只是隐藏，不是销毁destroy
	height : 469,
	width : 778,
	/**
	 * 创建每次都执行的组件,一般的第一个代表每秒都执行或者每分钟都执行.
	 * 
	 * @param {}
	 *            name 保证radio每次都只能单击.多个raido配置同一个name则只能单击多个中的一个.
	 * @param {}
	 *            keyText
	 * @return {}
	 */
	getEveryComp : function(name, keyText) {
		var me = this;
		var radio = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					colspan : 4,
					boxLabel : "每" + keyText,
					name : name,
					rangeType : name,
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.everyTime(radio);
							}
						}
					}
				});
		return radio;
	},
	/**
	 * 获取循环执行的组件
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            cycleName
	 * @param {}
	 *            keyText
	 * @param {}
	 *            startValue 起始的值,一个包含三个数值的数组,第一项表示默认值,第二项表示最小值,第三项表示最大值
	 * @param {}
	 *            endValue 一个包含三个数值的数组,第一项表示默认值,第二项表示最小值,第三项表示最大值
	 * @return {}
	 */
	getCycleComp : function(name, cycleName, keyText, startValue, endValue) {
		var me = this;
		var radio1 = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					boxLabel : '周期',
					labelWidth : 20,
					colspan : 1,
					minValue : 0,
					maxValue : 59,
					name : name,
					rangeType : cycleName,
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.cycle(radio);
							}
						}
					}
				});
		var numberField1 = Ext.create('Ext.form.field.Number', {
					fieldLabel : '  从',
					labelWidth : 20,
					minValue : startValue ? startValue[1] || 0 : 0,
					value : startValue ? startValue[0] || 1 : 1,
					maxValue : startValue ? startValue[2] || 59 : 59,
					name : name,
					rangeType : cycleName,
					listeners : {
						change : {
							fn : function(radio, even) {
								me.cycle(radio);
							}
						}
					},
					colspan : 1
				});
		var numberField2 = Ext.create('Ext.form.field.Number', {
					fieldLabel : '  到',
					labelWidth : 20,
					minValue : endValue ? endValue[1] || 0 : 0,
					value : endValue ? endValue[0] || 2 : 2,
					maxValue : endValue ? endValue[2] || 59 : 59,
					name : name,
					rangeType : cycleName,
					listeners : {
						change : {
							fn : function(radio, even) {
								me.cycle(radio);
							}
						}
					},
					colspan : 1
				});
		var display = Ext.create('Ext.form.field.Display', {
					fieldLabel : keyText,
					labelSeparator : "",
					labelWidth : 60,
					name : name,
					rangeType : cycleName,
					colspan : 1
				});
		return [radio1, numberField1, numberField2, display];
	},
	/**
	 * 获取范围组件
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            rangeName
	 * @param {}
	 *            keyText
	 * @param {}
	 *            startValue一个包含三个数值的数组,第一项表示默认值,第二项表示最小值,第三项表示最大值
	 * @param {}
	 *            endValue一个包含三个数值的数组,第一项表示默认值,第二项表示最小值,第三项表示最大值
	 * @return {}
	 */
	getRangeComp : function(name, rangeName, keyText, startValue, endValue) {
		var me = this;
		var radio1 = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					name : name,
					rangeType : rangeName,
					boxLabel : '  从',
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.startOn(radio);
							}
						}
					},
					colspan : 1
				});
		var numberField1 = Ext.create('Ext.form.field.Number', {
					fieldLabel : '',
					name : name,
					rangeType : rangeName,
					minValue : startValue ? startValue[1] || 0 : 0,
					value : startValue ? startValue[0] || 1 : 1,
					maxValue : startValue ? startValue[2] || 59 : 59,
					listeners : {
						change : {
							fn : function(radio, even) {
								me.startOn(radio);
							}
						}
					},
					colspan : 1
				});
		var numberField2 = Ext.create('Ext.form.field.Number', {
					fieldLabel : keyText + '开始,每',
					labelWidth : 60,
					minValue : endValue ? endValue[1] || 0 : 0,
					value : endValue ? endValue[0] || 1 : 1,
					maxValue : endValue ? endValue[2] || 59 : 59,
					name : name,
					rangeType : rangeName,
					listeners : {
						change : {
							fn : function(radio, even) {
								me.startOn(radio);
							}
						}
					},
					colspan : 1
				});
		var display = Ext.create('Ext.form.field.Display', {
					fieldLabel : keyText + '执行一次',
					labelSeparator : "",
					labelWidth : 80,
					name : name,
					rangeType : rangeName,
					colspan : 1
				});
		return [radio1, numberField1, numberField2, display];

	},
	/**
	 * 获取指定组件
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            assignName
	 * @param {}
	 *            rangeArr 指定值的范围
	 * @return {}
	 */
	getAssignComp : function(name, assignName, rangeArr) {
		var me = this;
		var radio1 = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					boxLabel : '指定',
					minValue : 0,
					maxValue : 59,
					colspan : 1,
					name : name,
					rangeType : assignName,
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.setAssignedValue(radio);
							}
						}
					}
				});
		var numberField2 = Ext.create('Ext.form.field.Text', {
					fieldLabel : '',
					colspan : 2,
					minValue : rangeArr ? rangeArr[1] || 0 : 0,
					value : rangeArr ? rangeArr[0] || 1 : 1,
					maxValue : rangeArr ? rangeArr[2] || 59 : 59,
					name : name,
					rangeType : assignName,
					listeners : {
						blur : {
							fn : function(radio, even) {
								me.setAssignedValue(radio);
							}
						}
					}
				});
		return [radio1, numberField2];

	},
	/**
	 * 获取前三个panel,时分秒的三个
	 * 
	 * @param {}
	 *            title
	 * @param {}
	 *            name
	 * @param {}
	 *            cycleName
	 * @param {}
	 *            rangeName
	 * @param {}
	 *            assignName
	 * @param {}
	 *            keyText
	 * @return {}
	 */
	getTabContentPanel : function(title, name, cycleName, rangeName,
			assignName, keyText) {
		var me = this;
		var cycleArr = me.getCycleComp(name, cycleName, keyText);
		var rangeArr = me.getRangeComp(name, rangeName, keyText);
		var assignArr = me.getAssignComp(name, assignName, []);
		var panel = Ext.create("Ext.panel.Panel", {
					height : 265,
					panelType : "cron",
					width : 764,
					layout : "fit",
					title : title,
					items : [{
						xtype : 'radiogroup',
						layout : {
							type : 'table',
							columns : 4
						},
						defaultType : 'radio',
						items : [me.getEveryComp(name, keyText), cycleArr[0],
								cycleArr[1], cycleArr[2], cycleArr[3],
								rangeArr[0], rangeArr[1], rangeArr[2],
								rangeArr[3], assignArr[0], assignArr[1]]
					}]
				});
		return panel;
	},
	/**
	 * 获取[不指定]组件集
	 * 
	 * @param {}
	 *            name
	 * @return {}
	 */
	getUnAssignComp : function(name) {
		var me = this;
		var radio = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					colspan : 4,
					boxLabel : "不指定",
					name : name,
					unAssignComp : name,
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.unAppoint(radio);
							}
						}
					}
				});
		return radio;
	},
	/**
	 * 获取每月指定日期的工作日组件
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            nearType
	 * @param {}
	 *            startValue
	 * @return {}
	 */
	getNearWorkDay : function(name, nearType, startValue) {
		var me = this;
		var radio1 = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					name : name,
					rangeType : nearType,
					nearWorkDay : nearType,
					boxLabel : '每月',
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.workDay(radio);
							}
						}
					},
					colspan : 1
				});
		var numberField1 = Ext.create('Ext.form.field.Number', {
					fieldLabel : '',
					name : name,
					rangeType : nearType,
					nearWorkDay : nearType,
					minValue : startValue ? startValue[1] || 1 : 1,
					value : startValue ? startValue[0] || 1 : 1,
					maxValue : startValue ? startValue[2] || 31 : 31,
					listeners : {
						change : {
							fn : function(radio, even) {
								me.workDay(radio);
							}
						}
					},
					colspan : 1
				});
		var display = Ext.create('Ext.form.field.Display', {
					fieldLabel : '执行一次',
					labelSeparator : "号最接近的工作日",
					labelWidth : 160,
					name : name,
					rangeType : nearType,
					colspan : 2
				});
		return [radio1, numberField1, display];
	},
	/**
	 * 获取每月最后一天组件集
	 * 
	 * @param {}
	 *            name
	 * @return {}
	 */
	getLastDayComp : function(name) {
		var me = this;
		var radio = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					colspan : 4,
					boxLabel : "本月最后一天",
					name : name,
					lastDayComp : name,
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.lastDay(radio);
							}
						}
					}
				});
		return radio;

	},
	/**
	 * 获取设置日期的panel
	 * 
	 * @param {}
	 *            title
	 * @param {}
	 *            name
	 * @param {}
	 *            cycleName
	 * @param {}
	 *            rangeName
	 * @param {}
	 *            assignName
	 * @param {}
	 *            keyText
	 * @param {}
	 *            nearType
	 * @return {}
	 */
	getDayPanel : function(title, name, cycleName, rangeName, assignName,
			keyText, nearType) {
		var me = this;
		var cycleArr = me.getCycleComp(name, cycleName, keyText, [1, 1, 31], [
						2, 1, 31]);
		var rangeArr = me.getRangeComp(name, rangeName, keyText, [1, 1, 31], [
						1, 1, 31]);
		var assignArr = me.getAssignComp(name, assignName, [1, 1, 31]);
		var unApoint = me.getUnAssignComp(name, nearType);

		var nearWrkDay = me.getNearWorkDay(name, nearType);
		var lastDay = me.getLastDayComp(name);
		var panel = Ext.create("Ext.panel.Panel", {
					height : 265,
					panelType : "cron",
					width : 764,
					layout : "fit",
					title : title,
					items : [{
						xtype : 'radiogroup',
						layout : {
							type : 'table',
							columns : 4
						},
						defaultType : 'radio',
						items : [me.getEveryComp(name, keyText), unApoint,
								cycleArr[0], cycleArr[1], cycleArr[2],
								cycleArr[3], rangeArr[0], rangeArr[1],
								rangeArr[2], rangeArr[3], nearWrkDay[0],
								nearWrkDay[1], nearWrkDay[2], lastDay,
								assignArr[0], assignArr[1]]
					}]
				});
		return panel;
	},

	/**
	 * 获取每月最后一个星期组件集
	 * 
	 * @param {}
	 *            name
	 * @param {}
	 *            lastWeekType
	 * @return {}
	 */
	getLastWeekDayComp : function(name, lastWeekType) {
		var me = this;
		var radio1 = Ext.create('Ext.form.field.Radio', {
					fieldLabel : '',
					name : name,
					rangeType : lastWeekType,
					lastWeekComp : lastWeekType,
					boxLabel : '每月最后一个星期',
					listeners : {
						focus : {
							fn : function(radio, even) {
								me.lastWeek(radio);
							}
						}
					},
					colspan : 1
				});
		var numberField1 = Ext.create('Ext.form.field.Number', {
					fieldLabel : '',
					name : name,
					rangeType : lastWeekType,
					lastWeekComp : lastWeekType,
					value : 1,
					minValue : 1,
					maxValue : 7,
					listeners : {
						change : {
							fn : function(radio, even) {
								me.lastWeek(radio);
							}
						}
					},
					colspan : 3
				});
		return [radio1, numberField1];

	},
	/**
	 * 获取设置[周]的页面
	 * 
	 * @param {}
	 *            title
	 * @param {}
	 *            name
	 * @param {}
	 *            cycleName
	 * @param {}
	 *            rangeName
	 * @param {}
	 *            assignName
	 * @param {}
	 *            keyText
	 * @param {}
	 *            lastWeekType
	 * @return {}
	 */
	getWeekPanel : function(title, name, cycleName, rangeName, assignName,
			keyText, lastWeekType) {
		var me = this;
		var cycleArr = me.getCycleComp(name, cycleName, keyText, [1, 1, 7], [2,
						1, 7]);
		var rangeArr = me.getRangeComp(name, rangeName, keyText, [1, 1, 4], [1,
						1, 7]);
		var assignArr = me.getAssignComp(name, assignName, [1, 1, 7]);
		var unApoint = me.getUnAssignComp(name);
		var lastWeek = me.getLastWeekDayComp(name, lastWeekType);

		var panel = Ext.create("Ext.panel.Panel", {
					height : 265,
					panelType : "cron",
					width : 764,
					layout : "fit",
					title : title,
					items : [{
						xtype : 'radiogroup',
						layout : {
							type : 'table',
							columns : 4
						},
						defaultType : 'radio',
						items : [me.getEveryComp(name, keyText), unApoint,
								cycleArr[0], cycleArr[1], cycleArr[2],
								cycleArr[3], rangeArr[0], rangeArr[1],
								rangeArr[2], rangeArr[3], lastWeek[0],
								lastWeek[1], assignArr[0], assignArr[1]]
					}]
				});
		return panel;
	},
	/**
	 * 获取设置[月]的panel
	 * 
	 * @param {}
	 *            title
	 * @param {}
	 *            name
	 * @param {}
	 *            cycleName
	 * @param {}
	 *            rangeName
	 * @param {}
	 *            assignName
	 * @param {}
	 *            keyText
	 * @return {}
	 */
	getMonthPanel : function(title, name, cycleName, rangeName, assignName,
			keyText) {
		var me = this;
		var cycleArr = me.getCycleComp(name, cycleName, keyText, [1, 1, 12], [
						2, 1, 12]);
		var rangeArr = me.getRangeComp(name, rangeName, keyText, [1, 1, 31], [
						1, 1, 12]);
		var assignArr = me.getAssignComp(name, assignName, [1, 1, 31]);
		var unApoint = me.getUnAssignComp(name);
		var panel = Ext.create("Ext.panel.Panel", {
					height : 265,
					panelType : "cron",
					width : 764,
					layout : "fit",
					title : title,
					items : [{
						xtype : 'radiogroup',
						layout : {
							type : 'table',
							columns : 4
						},
						defaultType : 'radio',
						items : [me.getEveryComp(name, keyText), unApoint,
								cycleArr[0], cycleArr[1], cycleArr[2],
								cycleArr[3], rangeArr[0], rangeArr[1],
								rangeArr[2], rangeArr[3], assignArr[0],
								assignArr[1]]
					}]
				});
		return panel;
	},
	/**
	 * 获取设置[年]的panel
	 * 
	 * @param {}
	 *            title
	 * @param {}
	 *            name
	 * @param {}
	 *            cycleName
	 * @param {}
	 *            rangeName
	 * @param {}
	 *            assignName
	 * @param {}
	 *            keyText
	 * @return {}
	 */
	getYearPanel : function(title, name, cycleName, rangeName, assignName,
			keyText) {
		var me = this;
		var cycleArr = me.getCycleComp(name, cycleName, keyText, [2014, 1970,
						2020], [2015, 1970, 2020]);
		var unApoint = me.getUnAssignComp(name);
		var panel = Ext.create("Ext.panel.Panel", {
					height : 265,
					panelType : "cron",
					width : 764,
					layout : "fit",
					title : title,
					items : [{
						xtype : 'radiogroup',
						layout : {
							type : 'table',
							columns : 4
						},
						defaultType : 'radio',
						items : [me.getEveryComp(name, keyText), unApoint,
								cycleArr[0], cycleArr[1], cycleArr[2],
								cycleArr[3]]
					}]
				});
		return panel;
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
					items : [{
						xtype : 'tabpanel',
						height : 286,
						activeTab : 0,
						items : [
								me.getTabContentPanel("秒", "seconds",
										"cycleseconds", "rangeseconds",
										"assignseconds", "秒"),
								me.getTabContentPanel("分钟", "minutes",
										"cycleminutes", "rangeminutes",
										"assignminutes", "分钟"),
								me.getTabContentPanel("小时", "hours",
										"cyclehours", "rangehours",
										"assignhours", "小时"),
								me
										.getDayPanel("日", "day", "cycleday",
												"rangeday", "assignday", "日",
												"workDay"),
								me.getWeekPanel("周", "week", "cycleweek",
										"rangeweek", "assignweek", "周",
										"lastweek"),
								me.getMonthPanel("月", "month", "cyclemonth",
										"rangemonth", "assignmonth", "月"),
								me.getYearPanel("年", "year", "cycleyear",
										"rangeyear", "assignyear", "年")]
					}, {
						xtype : 'form',
						height : 158,
						layout : {
							type : 'table',
							columns : 7
						},
						header : false,
						bodyPadding : 10,
						title : 'My Form',
						items : [me.getFormPanelField('秒', "seconds", "*"),
								me.getFormPanelField('分钟', "minutes", "*"),
								me.getFormPanelField('小时', "hours", "*"),
								me.getFormPanelField('日', "day", "*"),
								me.getFormPanelField('月', "month", "*"),
								me.getFormPanelField('周', "week", "?"),
								me.getFormPanelField('年', "year"),
								me.getCronTextField()]
					}]
				});
		me.callParent(arguments);
	},

	/**
	 * 获取Formpanel中的textfield,用来展示已经设置好的每一类数据
	 * 
	 * @param {}
	 *            fieldName
	 * @param {}
	 *            type
	 * @param {}
	 *            defaultValue
	 * @return {}
	 */
	getFormPanelField : function(fieldName, type, defaultValue) {
		return Ext.create('Ext.form.field.Text', {
					xtype : 'textfield',
					labelWidth : 30,
					value : defaultValue ? defaultValue : "",
					cronType : type,
					disabled : true,
					disabledCls : " ",
					fieldLabel : fieldName,
					fieldInfo : "cornsegment"
				});
	},
	/**
	 * 获取展示最终cron表达式的组件.
	 * 
	 * @return {}
	 */
	getCronTextField : function() {
		var me = this;
		if (!me.cronField) {
			me.cronField = Ext.create('Ext.form.field.Text', {
						fieldLabel : 'Cron表达式',
						labelWidth : 70,
						colspan : 4,
						fieldType : "Corn",
//						listeners : {
//							blur : {
//								fn : function() {
//									console.log('click Corn');
//									me.renderCronValue();
//								}
//							}
//						}
					});
		}
		return me.cronField
	},
	/**
	 * 
	 */
	everyTime : function(radio) {
		console.log(radio.name);
		// var text = this.down('form textfield[cronType=seconds]');
		var filterStr = "form textfield[cronType=" + radio.name + "]";
		var text = this.down(filterStr);
		text.setValue('*');
		this.reSetCron();
	},
	cycle : function(radio) {
		var me = this, ranges = Ext.ComponentQuery
				.query("numberfield[rangeType=" + radio.rangeType + "]");
		var realRadio = this.down("radio[rangeType=" + radio.rangeType + "]");
		realRadio.setValue(true);
		var start = ranges[0].getValue();
		var end = ranges[1].getValue();
		var text = this.down("form textfield[cronType=" + radio.name + "]");
		text.setValue(start + "-" + end);
		this.reSetCron();
	},
	startOn : function(radio) {
		console.log(radio.rangeType);
		var me = this, ranges = Ext.ComponentQuery
				.query("numberfield[rangeType=" + radio.rangeType + "]");

		var realRadio = this.down("radio[rangeType=" + radio.rangeType + "]");
		realRadio.setValue(true);

		var start = ranges[0].getValue();
		var end = ranges[1].getValue();
		var text = this.down("form textfield[cronType=" + radio.name + "]");
		text.setValue(start + "/" + end);
		this.reSetCron();
	},
	unAppoint : function(radio) {
		var name = radio.name;
		var val = "?";
		if (name == "year")
			val = "";

		var text = this.down("form textfield[cronType=" + radio.name + "]");
		text.setValue(val);
		this.reSetCron();
	},
	workDay : function(radio) {
		console.log(radio.rangeType);
		var me = this, ranges = Ext.ComponentQuery
				.query("numberfield[rangeType=" + radio.rangeType + "]");

		var realRadio = this.down("radio[rangeType=" + radio.rangeType + "]");
		realRadio.setValue(true);

		var text = this.down("form textfield[cronType=" + radio.name + "]");
		var start = ranges[0].getValue();
		text.setValue(start + "W");
		this.reSetCron();
	},
	lastDay : function(radio) {
		console.log(radio.name);
		// var text = this.down('form textfield[cronType=seconds]');
		var filterStr = "form textfield[cronType=" + radio.name + "]";
		var text = this.down(filterStr);
		text.setValue("L");
		this.reSetCron();
	},
	lastWeek : function(radio) {
		var me = this, ranges = Ext.ComponentQuery
				.query("numberfield[rangeType=" + radio.rangeType + "]");

		var realRadio = this.down("radio[rangeType=" + radio.rangeType + "]");
		realRadio.setValue(true);

		var text = this.down("form textfield[cronType=" + radio.name + "]");
		var start = ranges[0].getValue();
		text.setValue(start + "L");
		this.reSetCron();
	},

	_resetFromField : function(cronType, value) {
		var filterStr = "form textfield[cronType=" + cronType + "]";
		var text = this.down(filterStr);
		text.setValue(value);
	},
	/**
	 * 当用户设置一个cron表达式时,解析该表达式并在各个组件panel中展示
	 */
	setValue : function(value) {
		// 获取参数中表达式的值
		var me = this;
		if (value) {
			me.getCronTextField().setValue(value);
			var regs = value.split(' ');
			me._resetFromField("seconds", regs[0]);
			me._resetFromField("minutes", regs[1]);
			me._resetFromField("hours", regs[2]);
			me._resetFromField("day", regs[3]);
			me._resetFromField("month", regs[4]);
			me._resetFromField("week", regs[5]);

			me.initObj(regs[0], "seconds");
			me.initObj(regs[1], "minutes");
			me.initObj(regs[2], "hours");
			me.initDay(regs[3]);
			me.initMonth(regs[4]);
			me.initWeek(regs[5]);

			if (regs.length > 6) {
				me._resetFromField("year", regs[6]);
				 me.initYear(regs[6]);
			}
		}
	},
	/**
	 * 根据设置的值在panel中展示
	 * @param {} strVal
	 * @param {} type
	 */
	initObj : function(strVal, type) {
		var me = this, ary = null;
		var objRadio = Ext.ComponentQuery.query(
				'radio[rangeType=' + type + ']', me)[0];
		if (strVal == "*") {
			objRadio.setValue(true);
		} else if (strVal.split('-').length > 1) {// 周期
			ary = strVal.split('-');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=cycle' + type
							+ ']', me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query(
					'numberfield[rangeType=cycle' + type + ']', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query(
					'numberfield[rangeType=cycle' + type + ']', me)[1]
					.setValue(ary[1]);
		} else if (strVal.split('/').length > 1) {// 几秒开始,几秒执行一次
			ary = strVal.split('/');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=range' + type
							+ ']', me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query(
					'numberfield[rangeType=range' + type + ']', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query(
					'numberfield[rangeType=range' + type + ']', me)[1]
					.setValue(ary[1]);
		} else {
			objRadio = Ext.ComponentQuery.query('radio[rangeType=assign' + type
							+ ']', me)[0];
			objRadio.setValue(true);
			if (strVal != "?") {
				Ext.ComponentQuery.query('textfield[rangeType=assign' + type
								+ ']', me)[0].setValue(strVal);
			}
		}
	},
	initDay : function(strVal) {
		var me = this, ary = null, objRadio = Ext.ComponentQuery.query(
				'radio[rangeType=day]', me)[0];
		if (strVal == "*") {
			objRadio.setValue(true);
		} else if (strVal == "?") {// 不指定
			objRadio = Ext.ComponentQuery.query('radio[unAssignComp=day]', me)[0];
			objRadio.setValue(true);
		} else if (strVal.split('-').length > 1) {
			ary = strVal.split('-');
			objRadio = Ext.ComponentQuery
					.query('radio[rangeType=cycleday]', me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=cycleday]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=cycleday]', me)[1]
					.setValue(ary[1]);
		} else if (strVal.split('/').length > 1) {
			ary = strVal.split('/');
			objRadio = Ext.ComponentQuery
					.query('radio[rangeType=rangeday]', me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=rangeday]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=rangeday]', me)[1]
					.setValue(ary[1]);
		} else if (strVal.split('W').length > 1) {
			ary = strVal.split('W');
			objRadio = Ext.ComponentQuery.query('radio[nearWorkDay=workDay]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[nearWorkDay=workDay]', me)[0]
					.setValue(ary[0]);
		} else if (strVal == "L") {

			objRadio = Ext.ComponentQuery.query('radio[lastDayComp=day]', me)[0];
			objRadio.setValue(true);
		} else {
			objRadio = Ext.ComponentQuery.query('radio[rangeType=assignday]',
					me)[0];
			objRadio.setValue(true);
			if (strVal != "?") {
				Ext.ComponentQuery.query('textfield[rangeType=assignday]', me)[0]
						.setValue(strVal);
			}
		}
	},

	initMonth : function(strVal) {
		var me = this, ary = null, objRadio = Ext.ComponentQuery.query(
				'radio[rangeType=month]', me)[0];
		if (strVal == "*") {
			objRadio.setValue(true);
		} else if (strVal == "?") {
			objRadio = Ext.ComponentQuery
					.query('radio[unAssignComp=month]', me)[0];
			objRadio.setValue(true);
		} else if (strVal.split('-').length > 1) {
			ary = strVal.split('-');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=cyclemonth]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=cyclemonth]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=cyclemonth]', me)[1]
					.setValue(ary[1]);
		} else if (strVal.split('/').length > 1) {
			ary = strVal.split('/');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=rangemonth]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=rangemonth]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=rangemonth]', me)[1]
					.setValue(ary[1]);
		} else {
			objRadio = Ext.ComponentQuery.query('radio[rangeType=assignmonth]',
					me)[0];
			objRadio.setValue(true);
			if (strVal != "?") {
				Ext.ComponentQuery
						.query('textfield[rangeType=assignmonth]', me)[0]
						.setValue(strVal);
			}
		}
	},
	initWeek : function(strVal) {
		var me = this, ary = null, objRadio = Ext.ComponentQuery.query(
				'radio[rangeType=week]', me)[0];
		if (strVal == "*") {
			objRadio.setValue(true);
		} else if (strVal == "?") {
			objRadio = Ext.ComponentQuery.query('radio[unAssignComp=week]', me)[0];
			objRadio.setValue(true);
		} else if (strVal.split('/').length > 1) {
			ary = strVal.split('/');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=rangeweek]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=rangeweek]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=rangeweek]', me)[1]
					.setValue(ary[1]);
		} else if (strVal.split('-').length > 1) {
			ary = strVal.split('-');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=cycleweek]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=cycleweek]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=cycleweek]', me)[1]
					.setValue(ary[1]);
		} else if (strVal.split('L').length > 1) {
			ary = strVal.split('L');
			objRadio = Ext.ComponentQuery.query('radio[lastWeekComp=lastweek]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[lastWeekComp=lastweek]', me)[0]
					.setValue(ary[0]);;
		} else {
			objRadio = Ext.ComponentQuery.query('radio[rangeType=assignweek]',
					me)[0];
			objRadio.setValue(true);
			if (strVal != "?") {
				Ext.ComponentQuery.query('textfield[rangeType=assignweek]', me)[0]
						.setValue(strVal);
			}
		}
	},
	initYear : function(strVal) {
		var me = this, ary = null, objRadio = Ext.ComponentQuery.query(
				'radio[rangeType=year]', me)[0];
		if (strVal == "*") {
			objRadio.setValue(true);
		} else if (strVal.split('-').length > 1) {
			ary = strVal.split('-');
			objRadio = Ext.ComponentQuery.query('radio[rangeType=cycleyear]',
					me)[0];
			objRadio.setValue(true);
			Ext.ComponentQuery.query('numberfield[rangeType=cycleyear]', me)[0]
					.setValue(ary[0]);
			Ext.ComponentQuery.query('numberfield[rangeType=cycleyear]', me)[1]
					.setValue(ary[1]);
		}else{
			objRadio = Ext.ComponentQuery.query('radio[unAssignComp=year]', me)[0];
			objRadio.setValue(true);
		}
	},
	setAssignedValue : function(radio) {
		var me = this, ranges = Ext.ComponentQuery.query("textfield[rangeType="
				+ radio.rangeType + "]");

		var realRadio = this.down("radio[rangeType=" + radio.rangeType + "]");
		realRadio.setValue(true);

		var value = ranges[0].getValue();
		var text = this.down("form textfield[cronType=" + radio.name + "]");
		text.setValue(value);
		this.reSetCron();
	},
	/**
	 * 
	 * @return {}
	 */
	getAllTextFieldValues : function() {
		var me = this, textFields = Ext.ComponentQuery.query(
				'form textfield[fieldInfo=cornsegment]', me), values = [];
		var tab = this.down('tabpanel');
		var activeTab = tab.getActiveTab();
		Ext.each(textFields, function(text, index) {
					values.push(text.getValue())
				});
		var panels = Ext.ComponentQuery.query('panel[panelType=cron]', me);

		var currentIndex = 0;
		Ext.each(panels, function(panel, n) {
					if (panel == activeTab) {
						currentIndex = n;
						return false;
					}
				});
		// currentIndex = 3;
		// 当前选中项之前的如果为*，则都设置成0
		for (var i = currentIndex; i >= 1; i--) {
			if (values[i] != "*" && values[i - 1] == "*") {
				values[i - 1] = "0";
			}
		}
		// 当前选中项之后的如果不为*则都设置成*
		if (values[currentIndex] == "*") {
			for (var i = currentIndex + 1; i < values.length; i++) {
				if (i == 5) {
					values[i] = "?";
				} else {
					values[i] = "*";
				}
			}
		}

		return values;
	},
	reSetCron : function() {
		var me = this, cornText = this.getCronTextField(), item = me
				.getAllTextFieldValues();
		cornText.setValue(item.join(" "));
	},
	getValue : function() {
		return this.getCronTextField().getValue();
	}
});