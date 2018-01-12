/**
 * @author HeYuqing ServiceSokudaLayoutPlugin.js 2015年10月30日 上午10:27:01 TODO
 */
if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.metamodel) {
	Dep.metamodel = {};
}
if (!Dep.metamodel) {
	Dep.metamodel = {};
}
if (!Dep.metamodel.editor) {
	Dep.metamodel.editor = {};
}
if (!Dep.metamodel.editor.plugin) {
	Dep.metamodel.editor.plugin = {};
}
if (!Dep.metamodel.editor.plugin.containers) {
	Dep.metamodel.editor.plugin.containers = {};
}
if (!Dep.metamodel.editor.plugin.containers.canvas) {
	Dep.metamodel.editor.plugin.containers.canvas = {};
}
Dep.metamodel.editor.plugin.containers.canvas.MMLayoutPlugin = Dep.framework.editor.plugin.BasePlugin
		.extend({
			/**
			 * 插件名称
			 */
			NAME : "Dep.metamodel.editor.plugin.containers.canvas.MMLayoutPlugin",
			/**
			 * 图元排序事件
			 */
			init : function(container) {
				var me = this, canvas = null;
				me.setContainer(container);
				container.registLayout("MMLayout",
						draw2d.command.MMLayoutCommand);
			}
		});
/**
 * 
 */
draw2d.command.MMLayoutCommand = draw2d.command.CanvasSudokuLayoutCommand
		.extend({
			/**
			 * 类名
			 *
			 * @type String
			 */
			NAME : "draw2d.command.CanvasSudokuLayoutCommand",
			/**
			 * 图元集合中最大的宽度
			 * @type Number
			 */
			maxWidth : 0,
			/**
			 * 图元集合中最大的高度
			 * @type Number
			 */
			maxHeight : 0,
			/**
			 * 行间距
			 * @type Number
			 */
			ROWGAP : 80,
			/**
			 * 列间距
			 * @type Number
			 */
			COLUMNGAP: 50,
			/**
			 * 初始位置,可以简单理解为原点
			 * @type
			 */
			initPosition : {
				x : 100,
				y : 100
			},
			/**
			 * 初始化方法
			 *
			 * @param {}
			 *            canvas 需要排序的画布对象
			 * @param {}
			 *            figures 画布上所有需要排序的对象集合
			 */
			init : function(canvasPanel, figures) {
				this._super(canvasPanel, figures);
				//
			},
			/**
			 * 获取对图元经行排列时的command
			 */
			getMoveCommand : function() {
				var me = this, figures = me.getFigures(), canvasViewWidth = me
						.getCanvasViewWidth(), figureNum = figures.getSize(), columnNum = 0, rowNum = 0, command = null, rowIndex = 0, colIndex = 0, x = 0, y = 0;
				me.maxHeight = this.getMaxHeight();
				me.maxWidth = this.getMaxWidth();
				//计算列数,也就说计算每一行有几个图元.鉴于所有图元都要看得到,所以需要向下取整;
				columnNum = Math.floor(canvasViewWidth / (me.maxWidth+me.COLUMNGAP));
				//计算行数, 由图元总数除以每一行的个数,然后向上取整
				rowNum = Math.ceil(figureNum / columnNum);

				figures.each(function(n, figure) {
					command = new draw2d.command.CommandMoveByCenter(figure);
					//向下取整获得当前图元所在的行数.行列均从零开始计数
					rowIndex = Math.floor(n / columnNum);
					//取余数获得列数
					colIndex = n % columnNum;
					//这里设置的是图元的中心位置,由command负责转换
					x = me.initPosition.x + (colIndex - 1)
							* me.maxWidth + me.maxWidth / 2+me.COLUMNGAP*colIndex;
					y = me.initPosition.y + (rowIndex - 1)
							* me.maxHeight + me.maxHeight / 2+me.ROWGAP * rowIndex;
					command.setPosition(x, y);
					me.getRedoStack().add(command);
				});
			}

		});