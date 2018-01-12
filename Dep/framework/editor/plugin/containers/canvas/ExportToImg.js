if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.plugin) {
	Dep.framework.editor.plugin = {};
}
if (!Dep.framework.editor.plugin.containers) {
	Dep.framework.editor.plugin.containers = {};
}
if (!Dep.framework.editor.plugin.containers.canvas) {
	Dep.framework.editor.plugin.containers.canvas = {};
}

/**
 * 注册图元导出svg图片功能
 * 
 */
Dep.framework.editor.plugin.containers.canvas.ExportToImg = Dep.framework.editor.plugin.BasePlugin
		.extend({
			/**
			 * 插件名称
			 */
			NAME : "Dep.framework.editor.plugin.containers.canvas.ExportToImg",
			svgData:null,
			/**
			 * 
			 */
			init : function(container) {
				var me = this, canvas = null;
				me.setContainer(container)
				canvas = container.getCanvas();
				me.container.regiestActions([ {
					name : Dep.framework.editor.ACTION.CANVAS.EXPORTSVG,
					description : Dep.framework.editor.I18N.DESCRIPTION.EXPORT.EXPORTSVG,
					icon : Dep.framework.editor.PATH + "img/canvas/exportTosvg.png",
					functionality : Ext.Function.bind(me._exportToSvg, me,
							[ canvas ]),
					group : Dep.framework.editor.I18N.Edit.GROUP.EXPORT
				} ]);

				container.on(Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE, me.initEvent
						.bind(me));
			},

			/**
			 * 在容器加载完成之后注册事件。
			 * 注意，必须要在容器加载完成之后注册事件，否则有可能会发送容器还没有安装，但是试图向容器注册事情的现象。
			 * 
			 * @param {Editor}
			 *            editor 编辑器
			 */
			initEvent : function(editor) {
				var me = this;
				// TODO
			},
			/**
			 * 将页面上所有图元导出成一张svg图片
			 * 
			 * @param canvas
			 *            画布对象
			 * @private
			 */
			_exportToSvg : function(canvas) {
				var me = this  ;
				me.svgData = canvas.paper.toSVG(), // Obtaining the SVG element
				parser = new DOMParser(),
				// 解析svg标签
				doc = parser.parseFromString(me.svgData, "text/xml");

				// 查询所有的image标签
				var images = doc.querySelectorAll("image");
				var deferreds = [];
				var len = images.length;
				// 遍历image标签，获取所有的图片源文件内容，将内容转换成base64编码串。
				for (var i = 0; i < images.length; i++) {
					deferred = me._createLoadDeferred(images[i]);
					// 存入数组
					deferreds.push(deferred);
				}
				// 当所有的image标签替换完毕之后，提交给后台生成svg文件
				Deft.Promise.all(deferreds).always(function() {
					Ext.Ajax.request({
						url : 'editor/extport.do',
						jsonData : {
							data : me.svgData
						},
						method : "POST",
						success : function(response) {
							var obj = Ext.decode(response.responseText);
							window.location.href = 'editor/extport_back.do?name='
									+ obj.root;
						}
					});
				      }).done(); 
				return;
			},
			
			
			/**
			 * 替换svg内容
			 */
			_createLoadDeferred:function(image) {
				 var deferred,me = this;
				 if (!image) {
					 return;
				 }
				  deferred = Ext.create('Deft.Deferred');
				  var canvas = document.createElement('canvas');
					canvg(canvas,image.href.baseVal,{renderCallback:function (image,canvas) {
						var can = canvas,img = image;
						return function() {
							me.svgData = me.svgData.replace(img.href.baseVal,
									can.toDataURL("image/svg"));
							deferred.resolve();
						};
					    }(image,canvas)});
				  
				  return deferred.promise;
			}
		});