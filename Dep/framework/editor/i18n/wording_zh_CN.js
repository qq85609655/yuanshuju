if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if(!Dep.framework.editor.I18N) Dep.framework.editor.I18N = {};
//Dep.framework.editor.I18N.BUSSTOOLBAR.XXX.XXX=XXX
Dep.framework.editor.I18N.STATUS=Dep.framework.editor.I18N.STATUS||{};

Dep.framework.editor.I18N.LAYOUT=Dep.framework.editor.I18N.LAYOUT||{};
Dep.framework.editor.I18N.LAYOUT.SODUKU="soduku";
Dep.framework.editor.I18N.LAYOUT.CIRCLE="circle";
Dep.framework.editor.I18N.LAYOUT.HORIZONTAL="horizontal";
Dep.framework.editor.I18N.LAYOUT.VERTTREE="vertTree";


Dep.framework.editor.I18N.MENUS=Dep.framework.editor.I18N.MENUS||{};
Dep.framework.editor.I18N.MENUS.START=Dep.framework.editor.I18N.MENUS.START||{};
Dep.framework.editor.I18N.MENUS.START.DES="启动逻辑节点";

Dep.framework.editor.I18N.PARMS=Dep.framework.editor.I18N.PARMS||{};
Dep.framework.editor.I18N.PARMS.NAME="节点名称";
Dep.framework.editor.I18N.PARMS.IP="IP地址";

Dep.framework.editor.I18N.Edit=Dep.framework.editor.I18N.Edit||{};
Dep.framework.editor.I18N.Edit.GROUP=Dep.framework.editor.I18N.Edit.GROUP||{};
Dep.framework.editor.I18N.Edit.GROUP.CLIP="clipBoard";
Dep.framework.editor.I18N.Edit.GROUP.ALIGNH="alignH";
Dep.framework.editor.I18N.Edit.GROUP.ALIGNV="alignV";
Dep.framework.editor.I18N.Edit.GROUP.DISTRIBUTE="distribute";
Dep.framework.editor.I18N.Edit.GROUP.PG="propertiesGrid";
Dep.framework.editor.I18N.Edit.GROUP.CANVAS="canvas";

//组合

//组合
Dep.framework.editor.I18N.Edit.GROUP.GROUP="group";
Dep.framework.editor.I18N.Edit.GROUP.LAYOUT="layout";
Dep.framework.editor.I18N.Edit.GROUP.ZOOM="zoom";
Dep.framework.editor.I18N.Edit.GROUP.EXPORT="export";

Dep.framework.editor.I18N.Edit.GROUP.MODEL_MANAGE="model";
Dep.framework.editor.I18N.Edit.GROUP.UNDO="undo";

Dep.framework.editor.I18N.DESCRIPTION=Dep.framework.editor.I18N.DESCRIPTION||{};
Dep.framework.editor.I18N.DESCRIPTION.CLIP=Dep.framework.editor.I18N.DESCRIPTION.CLIP||{};
Dep.framework.editor.I18N.DESCRIPTION.CLIP.COPY="复制";
Dep.framework.editor.I18N.DESCRIPTION.CLIP.CUT="剪切";
Dep.framework.editor.I18N.DESCRIPTION.CLIP.PASTE="粘贴";

Dep.framework.editor.I18N.DESCRIPTION.ALIGN=Dep.framework.editor.I18N.DESCRIPTION.ALIGN||{};
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.LEFT="左对齐";
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.CENTERH="水平居中";
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.RIGHT="右对齐";
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.TOP="顶部对齐";
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.CENTERV="垂直居中";
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.BOTTOM="底部对齐";

Dep.framework.editor.I18N.DESCRIPTION.ALIGN.DISTRIBUTEH="水平分散对齐";
Dep.framework.editor.I18N.DESCRIPTION.ALIGN.DISTRIBUTEV="垂直分散对齐";


Dep.framework.editor.I18N.DESCRIPTION.GROUP=Dep.framework.editor.I18N.DESCRIPTION.GROUP||{};
Dep.framework.editor.I18N.DESCRIPTION.GROUP.GROUP="组合";
Dep.framework.editor.I18N.DESCRIPTION.GROUP.UNGROUP="反组合";

Dep.framework.editor.I18N.DESCRIPTION.LAYOUT=Dep.framework.editor.I18N.DESCRIPTION.LAYOUT||{};
Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.DEFAULT="默认布局";
Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.HORI="水平布局";
Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.REFRESH="刷新布局";
Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.CIRCLE="圆形布局";
Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.DOLAY="自定义布局";
Dep.framework.editor.I18N.DESCRIPTION.LAYOUT.VERTTREE="垂直树形布局";

Dep.framework.editor.I18N.DESCRIPTION.ZOOM=Dep.framework.editor.I18N.DESCRIPTION.ZOOM||{};
Dep.framework.editor.I18N.DESCRIPTION.ZOOM.REVERSION="原始比例";
Dep.framework.editor.I18N.DESCRIPTION.ZOOM.ENLARGE="放大";
Dep.framework.editor.I18N.DESCRIPTION.ZOOM.REDUCE="缩小";

Dep.framework.editor.I18N.DESCRIPTION.EXPORT=Dep.framework.editor.I18N.DESCRIPTION.EXPORT||{};
Dep.framework.editor.I18N.DESCRIPTION.EXPORT.EXPORTSVG="导出svg";

Dep.framework.editor.I18N.DESCRIPTION.MOUSE=Dep.framework.editor.I18N.DESCRIPTION.MOUSE||{};
Dep.framework.editor.I18N.DESCRIPTION.MOUSE.DEFAULT="";
Dep.framework.editor.I18N.DESCRIPTION.MOUSE.HAND="拖拽画布";
Dep.framework.editor.I18N.DESCRIPTION.MOUSE.OUTLINE="展示/隐藏视口";


Dep.framework.editor.I18N.DESCRIPTION.MODEL=Dep.framework.editor.I18N.DESCRIPTION.MODEL||{};
Dep.framework.editor.I18N.DESCRIPTION.MODEL.ADD="添加图元";
Dep.framework.editor.I18N.DESCRIPTION.MODEL.REMOVE="删除图元";
Dep.framework.editor.I18N.DESCRIPTION.MODEL.UPDATE="更新图元";

Dep.framework.editor.I18N.DESCRIPTION.PROP=Dep.framework.editor.I18N.DESCRIPTION.PROP||{};
Dep.framework.editor.I18N.DESCRIPTION.PROP.SAVE = "保存";
Dep.framework.editor.I18N.DESCRIPTION.PROP.RESET = "重置";


Dep.framework.editor.I18N.DESCRIPTION.UNDO=Dep.framework.editor.I18N.DESCRIPTION.UNDO||{};
Dep.framework.editor.I18N.DESCRIPTION.UNDO.UNDO = "撤销";
Dep.framework.editor.I18N.DESCRIPTION.UNDO.REDO = "恢复";

Dep.framework.editor.I18N.TOOLBOX=Dep.framework.editor.I18N.TOOLBOX||{};
Dep.framework.editor.I18N.TOOLBOX.TITLE="图元工具箱";
Dep.framework.editor.I18N.TOOLBOX.NOCONFIG="当前图层未配置图元工具箱";

Dep.framework.editor.I18N.LAYERLISTGRID=Dep.framework.editor.I18N.LAYERLISTGRID||{};
Dep.framework.editor.I18N.LAYERLISTGRID.DRAGTEXT ="拖拽行记录可进行排序";

Dep.framework.editor.I18N.NODE=Dep.framework.editor.I18N.NODE||{};
Dep.framework.editor.I18N.NODE.CANNOTDELETE = "该节点上有链接图元,不可删除";

Dep.framework.editor.I18N.CANVAS=Dep.framework.editor.I18N.CANVAS||{};
Dep.framework.editor.I18N.CANVAS.VIEWDATAISNONE = "该图元图形信息为空,无法完成添加";

Dep.framework.editor.I18N.PG=Dep.framework.editor.I18N.PG||{};
Dep.framework.editor.I18N.PG.LOADCOMBOSTORE = "重新加载combox的数据";