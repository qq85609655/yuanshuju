if (!window.Dep) {
	window.Dep = {};
}
if (!Dep.framework) {
	Dep.framework = {};
}
if (!Dep.framework.editor) {
	Dep.framework.editor = {};
}
if (!Dep.framework.editor.EVENT) {
	Dep.framework.editor.EVENT = {};
}
// Dep.framework.editor.EVENT = Dep.framework.editor.EVENT;
/** ************** Event ******************** */

// 分模块（容器）整理事件
if (!Dep.framework.editor.EVENT.CANVAS) {
	Dep.framework.editor.EVENT.CANVAS = {};
}
// **************画布CANVAS*************************
Dep.framework.editor.EVENT.CANVAS.LOADCOMPLETE = "ca_loadcomplete";
Dep.framework.editor.EVENT.CANVAS.CONTAINERPANELRESIZE = "ca_containerpanelresize";
Dep.framework.editor.EVENT.CANVAS.CONTAINERSCROLL = "ca_containerscroll";
Dep.framework.editor.EVENT.CANVAS.CANVASSCROLL = 'ca_canvasscroll';
Dep.framework.editor.EVENT.CANVAS.CANVASZOOM = 'ca_canvaszoom';
Dep.framework.editor.EVENT.CANVAS.SELECT = 'ca_canvasselect';
Dep.framework.editor.EVENT.CANVAS.AFTERREDRAWFIGURE = "ca_afterredrawfigure";
Dep.framework.editor.EVENT.CANVAS.ADDFIGURE = "ca_addfigure";
Dep.framework.editor.EVENT.CANVAS.ADDCONNECTION = "ca_addconnection";
Dep.framework.editor.EVENT.CANVAS.AFTERADDAFIGURE = "ca_afteraddafigure";
Dep.framework.editor.EVENT.CANVAS.DBCLICK = "ca_dblclick";
Dep.framework.editor.EVENT.CANVAS.CLICK = "ca_click";

Dep.framework.editor.EVENT.CANVAS.CLICKTOADDFIGURE = "ca_clicktoaddfigure";

Dep.framework.editor.EVENT.CANVAS.BEFORERENDERFIGURE = "ca_beforerenderfigure";
Dep.framework.editor.EVENT.CANVAS.AFTERLAYERDATALOADED = "ca_afterlayerdataloaded";
Dep.framework.editor.EVENT.CANVAS.AFTERLAYERFIGUREDRAWED = "ca_afterlayerfiguredrawed";


Dep.framework.editor.EVENT.CANVAS.MOUSETYPEDEFAULT = "ca_mouseType_default";
Dep.framework.editor.EVENT.CANVAS.MOUSETYPEHAND = "ca_mouseType_hand";
Dep.framework.editor.EVENT.CANVAS.SHOWHIDEOUTLINE = "ca_showhide_outline";


// **************属性长宽CANVAS*************************
Dep.framework.editor.EVENT.PROPER = Dep.framework.editor.EVENT.PROPER || {};
Dep.framework.editor.EVENT.PROPER.COMBOX_BEFOREACTIVATE = "pr_combox_beforeactivate";
Dep.framework.editor.EVENT.PROPER.COMBOX_CHANGE = "pr_combox_change";
Dep.framework.editor.EVENT.PROPER.COMBOX_FOCUS = "pr_combox_focus";
Dep.framework.editor.EVENT.PROPER.COMP_BLUR = "pr_comp_blur";

// **************工具箱TOOLBOX*************************
if (!Dep.framework.editor.EVENT.TOOLBOX) {
	Dep.framework.editor.EVENT.TOOLBOX = {};
}
// Dep.framework.editor.EVENT.TOOLBOX.INADDLINKSTATE = "to_inAddLinkState";
// Dep.framework.editor.EVENT.TOOLBOX.OUTADDLINKSTATE = "to_outAddLinkState";
Dep.framework.editor.EVENT.TOOLBOX.GRIDITEMCLICKED = "to_griditemclicked";
Dep.framework.editor.EVENT.TOOLBOX.GRIDITEMDBLCLICKED = "to_griditemdblclicked";

// **************图层LAYER*************************
if (!Dep.framework.editor.EVENT.LAYER) {
	Dep.framework.editor.EVENT.LAYER = {};
}
Dep.framework.editor.EVENT.LAYER.CHANGE_EDIT_LAYER = 'layer_edit_change';
Dep.framework.editor.EVENT.LAYER.CHANGE_VISIBLE_LAYER = 'layer_visible_change';
Dep.framework.editor.EVENT.LAYER.INIT_COMPONENT = 'layer_init_complete';
// **************业务列表BL*************************
if (!Dep.framework.editor.EVENT.BL) {
	Dep.framework.editor.EVENT.BL = {};
}
Dep.framework.editor.EVENT.BL.ROWSELECT = "bl_rowSelect";

// 属性编辑区
if (!Dep.framework.editor.EVENT.PG) {
	Dep.framework.editor.EVENT.PG = {};
}
Dep.framework.editor.EVENT.PG.SAVE = "pg_save";
Dep.framework.editor.EVENT.PG.RESET = "pg_reset";
Dep.framework.editor.EVENT.PG.CHANGE_PROP = "pg_change_properties";

// 视口
if (!Dep.framework.editor.EVENT.OUTLINE) {
	Dep.framework.editor.EVENT.OUTLINE = {};
}
Dep.framework.editor.EVENT.OUTLINE.SIZERMOVED = "ou_sizermoved";

// 图形工具条
if (!Dep.framework.editor.EVENT.VIEWTB) {
	Dep.framework.editor.EVENT.VIEWTB = {};
}
Dep.framework.editor.EVENT.VIEWTB.XXX = "";

// 业务工具条
if (!Dep.framework.editor.EVENT.BUSSTB) {
	Dep.framework.editor.EVENT.BUSSTB = {};
}
Dep.framework.editor.EVENT.BUSSTB.XXX = "";

// 编辑器
if (!Dep.framework.editor.EVENT.EDITOR) {
	Dep.framework.editor.EVENT.EDITOR = {};
}
Dep.framework.editor.EVENT.EDITOR.MODEL_ADD = "ed_dmadd";
Dep.framework.editor.EVENT.EDITOR.MODEL_ADDED = "ed_dmadded";
Dep.framework.editor.EVENT.EDITOR.MODEL_MODIFY = "ed_dmmodify";
Dep.framework.editor.EVENT.EDITOR.MODEL_MODIFYED = "ed_dmmodifyed";
Dep.framework.editor.EVENT.EDITOR.MODEL_DELETE = "ed_dmdelete";
Dep.framework.editor.EVENT.EDITOR.MODEL_DELETED = "ed_dmdeleted";
Dep.framework.editor.EVENT.EDITOR.CONTAINER_ADD = "ed_containeradd";
Dep.framework.editor.EVENT.EDITOR.CONTAINER_MODIFY = "ed_containermodify";
Dep.framework.editor.EVENT.EDITOR.CONTAINER_DELETE = "ed_containerdelete";
Dep.framework.editor.EVENT.EDITOR.PLUGIN_LOADED_COMPLETE = "ed_pluginloadcomplete";
Dep.framework.editor.EVENT.EDITOR.MODEL_LOADED = "ed_modelload";
Dep.framework.editor.EVENT.EDITOR.DM_EDITABLE_CHANGE = "ed_editable_change";
Dep.framework.editor.EVENT.EDITOR.DM_VISIABLE_CHANGE = "ed_visible_change";
Dep.framework.editor.EVENT.EDITOR.DM_FTYPE_CLEAR = "fTypeClear";
Dep.framework.editor.EVENT.EDITOR.DM_DATA_LOAD = "ed_data_load";
Dep.framework.editor.EVENT.EDITOR.DM_LAYER_LOAD_DATA = "ed_layer_load_data";
Dep.framework.editor.EVENT.EDITOR.MODEL_SELECT = "ed_model_select";
Dep.framework.editor.EVENT.EDITOR.RERENDER_MODEL = "ed_rerender_model";

// 浏览器事件
Dep.framework.editor.EVENT.EXCUTE_COMMAND = "ed_executecommand";
Dep.framework.editor.EVENT.EVENT_MOUSEDOWN = "mousedown";
Dep.framework.editor.EVENT.EVENT_MOUSEUP = "mouseup";
Dep.framework.editor.EVENT.EVENT_MOUSEOVER = "mouseover";
Dep.framework.editor.EVENT.EVENT_MOUSEOUT = "mouseout";
Dep.framework.editor.EVENT.EVENT_MOUSEMOVE = "mousemove";
Dep.framework.editor.EVENT.EVENT_DBLCLICK = "dblclick";
Dep.framework.editor.EVENT.EVENT_CLICK = "click";
Dep.framework.editor.EVENT.EVENT_KEYDOWN = "keydown";
Dep.framework.editor.EVENT.EVENT_KEYUP = "keyup";

/** ************** ACTION ******************** */
if (!Dep.framework.editor.ACTION) {
	Dep.framework.editor.ACTION = {};
}
Dep.framework.editor.ACTION = Dep.framework.editor.ACTION;
// 画布
if (!Dep.framework.editor.ACTION.CANVAS) {
	Dep.framework.editor.ACTION.CANVAS = {};
}
Dep.framework.editor.ACTION.CANVAS.CUT = "clip_cut";
Dep.framework.editor.ACTION.CANVAS.PASTE = "clip_paste";
Dep.framework.editor.ACTION.CANVAS.COPY = "clip_copy";
Dep.framework.editor.ACTION.CANVAS.ALIGNLEFT = "figures_alignLeft";
Dep.framework.editor.ACTION.CANVAS.ALIGNRIGHT = "figures_alignRight";
Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERH = "figures_alignCenterH";
Dep.framework.editor.ACTION.CANVAS.ALIGNCENTERV = "figures_alignCenterV";
Dep.framework.editor.ACTION.CANVAS.ALIGNTOP = "figures_alignTop";
Dep.framework.editor.ACTION.CANVAS.ALIGNBOTTOM = "figures_alignBottom";

Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEH = "figures_distributeH";
Dep.framework.editor.ACTION.CANVAS.DISTRIBUTEV = "figures_distributeV";
// 组合 反组合
Dep.framework.editor.ACTION.CANVAS.GROUP = "figure_group";
Dep.framework.editor.ACTION.CANVAS.UNGROUP = "figure_ungroup";
// 对画布上的图元经行布局
Dep.framework.editor.ACTION.CANVAS.LAYOUT = Dep.framework.editor.ACTION.CANVAS.LAYOUT
		|| {};
// 默认布局方式
Dep.framework.editor.ACTION.CANVAS.LAYOUT.DEFAULT = "canvas_defaultlayout";
//刷新当前布局
Dep.framework.editor.ACTION.CANVAS.LAYOUT.REFRESH = "canvas_refreshlayout";
// 水平布局方式
Dep.framework.editor.ACTION.CANVAS.LAYOUT.HORI = "canvas_horilayout";
// 圆形布局方式
Dep.framework.editor.ACTION.CANVAS.LAYOUT.CIRCLE = "canvas_circlelayout";
// 用户自定义
Dep.framework.editor.ACTION.CANVAS.LAYOUT.DOLAY = "canvas_dolayout";
// 垂直树布局
Dep.framework.editor.ACTION.CANVAS.LAYOUT.VERTTREE = "canvas_verttreelayout"

// 原始比例
Dep.framework.editor.ACTION.CANVAS.REVERSION = "canvas_reversion";
Dep.framework.editor.ACTION.CANVAS.ENLARGE = "canvas_enlarged";
Dep.framework.editor.ACTION.CANVAS.REDUCE = "canvas_reduce";

Dep.framework.editor.ACTION.CANVAS.EXPORTSVG = "canvas_exportsvg";
//鼠标样式
if (!Dep.framework.editor.ACTION.MOUSE) {
	Dep.framework.editor.ACTION.MOUSE = {};
}
Dep.framework.editor.ACTION.MOUSE.NORMAL = "mouseType_normal";
Dep.framework.editor.ACTION.MOUSE.HAND = "mouseType_hand";
Dep.framework.editor.ACTION.MOUSE.OUTLINE = "showhide_outline";

// 工具箱
if (!Dep.framework.editor.ACTION.TOOLBOX) {
	Dep.framework.editor.ACTION.TOOLBOX = {};
}
Dep.framework.editor.ACTION.TOOLBOX.XXX = "";

// 图层
if (!Dep.framework.editor.ACTION.LAYER) {
	Dep.framework.editor.ACTION.LAYER = {};
}
Dep.framework.editor.ACTION.LAYER.XXX = "";

// 业务列表
if (!Dep.framework.editor.ACTION.BL) {
	Dep.framework.editor.ACTION.BL = {};
}
Dep.framework.editor.ACTION.BL.XXX = "";

// 属性编辑区
if (!Dep.framework.editor.ACTION.PG) {
	Dep.framework.editor.ACTION.PG = {};
}
Dep.framework.editor.ACTION.PG.LOADCOMBOSTORE="loadComboStore";

// 视口
if (!Dep.framework.editor.ACTION.OUTLINE) {
	Dep.framework.editor.ACTION.OUTLINE = {};
}
Dep.framework.editor.ACTION.OUTLINE.XXX = "";

// 图形工具条
if (!Dep.framework.editor.ACTION.VIEWTB) {
	Dep.framework.editor.ACTION.VIEWTB = {};
}
Dep.framework.editor.ACTION.VIEWTB.XXX = "";

// 业务工具条
if (!Dep.framework.editor.ACTION.BUSSTB) {
	Dep.framework.editor.ACTION.BUSSTB = {};
}
Dep.framework.editor.ACTION.BUSSTB.XXX = "";

// 编辑器
Dep.framework.editor.ACTION.EDITOR = Dep.framework.editor.ACTION.EDITOR || {};
Dep.framework.editor.ACTION.EDITOR.ADD_MODEL = "add_model";
Dep.framework.editor.ACTION.EDITOR.REMOVE_MODEL = "remove_model";
Dep.framework.editor.ACTION.EDITOR.UPDATE_MODEL = "update_model";
Dep.framework.editor.ACTION.EDITOR.UNDO = "editor_undo";
Dep.framework.editor.ACTION.EDITOR.REDO = "editor_redo";
/** ************** Key-Codes ******************** */
if (!Dep.framework.editor.KEYCODE) {
	Dep.framework.editor.KEYCODE = {};
}
Dep.framework.editor.KEYCODE.X = 88;
Dep.framework.editor.KEYCODE.C = 67;
Dep.framework.editor.KEYCODE.V = 86;
Dep.framework.editor.KEYCODE.Z = 90;
Dep.framework.editor.KEYCODE.Y = 89;
Dep.framework.editor.KEYCODE.G = 71;
Dep.framework.editor.KEYCODE.U = 85;
Dep.framework.editor.KEYCODE.DELETE = 46;
Dep.framework.editor.KEYCODE.META = 224;
Dep.framework.editor.KEYCODE.BACKSPACE = 8;
Dep.framework.editor.KEYCODE.LEFT = 37;
Dep.framework.editor.KEYCODE.RIGHT = 39;
Dep.framework.editor.KEYCODE.UP = 38;
Dep.framework.editor.KEYCODE.DOWN = 40;
Dep.framework.editor.KEYCODE.ENTRY = 12;
Dep.framework.editor.KEYCODE.META_KEY_CTRL = 100;
Dep.framework.editor.KEYCODE.META_KEY_SHIFT = 99;
Dep.framework.editor.KEYCODE.META_KEY_ALT = 101;
Dep.framework.editor.KEYCODE.KEY_ACTION_DOWN = "down";
Dep.framework.editor.KEYCODE.KEY_ACTION_UP = "up";
