/**
 * 某些时候一些弹出框中需要有详细内容说明，但 ExtJS中 并没有提供这种对话框
 * 插件的定义就是解决这种问题，插件修改于 Ext.Msg
 * 基于ExtJS5.1.1
 *
 * 同时特别修改对话框隐藏控制方法，当用户绑定有 callback 时 callback 需要返回 true 才可以让该对话框隐藏
 * 请参考以下 show 的配置示例
 *
 *     @example
 *     Ext.ux.DetailMsg.show({
 *         title:'标题',
 *         message: '要弹出的提示消息',
 *         buttons: Ext.Msg.YESNOCANCEL,
 *         icon: Ext.Msg.QUESTION,
 *         sdetail : '显示图标右侧的详细区域',
 *         bdetail : '显示在图标与文本下方详细区域',
 *         fn: function(btn) {
 *             if (btn === 'yes') {
 *                 console.log('Yes pressed');
 *             } else if (btn === 'no') {
 *                 console.log('No pressed');
 *             } else {
 *                 console.log('Cancel pressed');
 *             }
 *             return true;
 *         }
 *     });
 */
Ext.define('Ext.ux.window.DetailMessageBox', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.HBox'
    ],

    alias: 'widget.detailmessagebox',

    /**
     * @property
     * Button config that displays a single OK button
     */
    OK: 1,
    /**
     * @property
     * Button config that displays a single Yes button
     */
    YES: 2,
    /**
     * @property
     * Button config that displays a single No button
     */
    NO: 4,
    /**
     * @property
     * Button config that displays a single Cancel button
     */
    CANCEL: 8,
    /**
     * @property
     * Button config that displays OK and Cancel buttons
     */
    OKCANCEL: 9,
    /**
     * @property
     * Button config that displays Yes and No buttons
     */
    YESNO: 6,
    /**
     * @property
     * Button config that displays Yes, No and Cancel buttons
     */
    YESNOCANCEL: 14,
    /**
     * @property
     * The CSS class that provides the INFO icon image
     */
    INFO: Ext.baseCSSPrefix + 'message-box-info',
    /**
     * @property
     * The CSS class that provides the WARNING icon image
     */
    WARNING: Ext.baseCSSPrefix + 'message-box-warning',
    /**
     * @property
     * The CSS class that provides the QUESTION icon image
     */
    QUESTION: Ext.baseCSSPrefix + 'message-box-question',
    /**
     * @property
     * The CSS class that provides the ERROR icon image
     */
    ERROR: Ext.baseCSSPrefix + 'message-box-error',

    // hide it by offsets. Windows are hidden on render by default.
    hideMode: 'offsets',
    closeAction: 'hide',
    resizable: false,
    scrollable: true,
    title: '&#160;',

    defaultMinWidth: 250,
    defaultMaxWidth: 600,
    defaultMinHeight: 110,
    defaultMaxHeight: 500,

    // Forcibly set these to null on the prototype to override anything set higher in
    // the hierarchy
    minWidth: null,
    maxWidth: null,
    minHeight: null,
    maxHeight: null,
    constrain: true,

    cls: [Ext.baseCSSPrefix + 'message-box', Ext.baseCSSPrefix + 'hidden-offsets'],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    // We want to shrinkWrap around all docked items
    shrinkWrapDock: true,

    /**
     * @property
     * 设置最大 小/大详细框 高
     */
    smallDetailMaxHeight: 100,
    bigDetailMaxHeight: 200,
    bigDetailMaxWidth: 400,
    sCollapsed: true,
    bCollapsed: true,

    //<locale type="object">
    /**
     * @property
     * An object containing the default button text strings that can be overriden for localized language support.
     * Supported properties are: ok, cancel, yes and no.  Generally you should include a locale-specific
     * resource file for handling language support across the framework.
     * Customize the default text like so:
     *
     *     Ext.window.MessageBox.buttonText.yes = "oui"; //french
     */
    buttonText: {
        ok: '确认',
        yes: '是',
        no: '否',
        cancel: '取消'
    },
    //</locale>

    detailTitle: '详细信息',

    buttonIds: [
        'ok', 'yes', 'no', 'cancel'
    ],


    baseIconCls: Ext.baseCSSPrefix + 'message-box-icon',

    ariaRole: 'detaildialog',

    makeButton: function (btnIdx) {
        var btnId = this.buttonIds[btnIdx];
        return new Ext.button.Button({
            handler: this.btnCallback,
            itemId: btnId,
            scope: this,
            text: this.buttonText[btnId],
            minWidth: 75
        });
    },

    btnCallback: function (btn, event) {
        var me = this,
            autoHide = (typeof(me.cfg.autoHide) === 'undefined');

        // If this is caused by a keydown event (eg: SPACE on a Button), then the
        // hide will throw focus back to the previously focused element which will
        // then recieve an unexpected keyup event.
        // So defer callback handling until the upcoming keyup event.
        if (event && event.type === 'keydown' && !event.isSpecialKey()) {
            event.getTarget(null, null, true).on({
                keyup: function (e) {
                    me.btnCallback(btn, e);
                },
                single: true
            });
            return;
        }

        me.userCallback(btn.itemId, me);

        /*如果用户没有定义或用户定义为 true, 自动隐藏该窗口*/
        if (autoHide || me.cfg.autoHide) {
            me.hide();
        }
    },

    hide: function () {
        var me = this,
            cls = me.cfg ? me.cfg.cls : '',
            sDetailMsg = me.smallDetailMsg,
            bDetailMsg = me.bigDetailMsg;
        sDetailMsg.update('');
        bDetailMsg.update('');
        if (cls) {
            me.removeCls(cls);
        }
        me.callParent(arguments);
    },

    constructor: function (cfg) {
        var me = this;

        me.callParent(arguments);

        // set the default min/max/Width/Height to the initially configured min/max/Width/Height
        // so that it will be used as the default when reconfiguring.
        me.minWidth = me.defaultMinWidth = (me.minWidth || me.defaultMinWidth);
        me.maxWidth = me.defaultMaxWidth = (me.maxWidth || me.defaultMaxWidth);
        me.minHeight = me.defaultMinHeight = (me.minHeight || me.defaultMinHeight);
        me.maxHeight = me.defaultMaxHeight = (me.maxHeight || me.defaultMaxHeight);
    },

    initComponent: function (cfg) {
        var me = this,
            baseId = me.id,
            i, button;

        // A title or iconCls could have been passed in the config to the constructor.
        me.title = me.title || '&#160;';
        me.iconCls = me.iconCls || '';
        me.padding = 10;

        me.topContainer = new Ext.container.Container({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            padding: 10,
            style: {
                overflow: 'hidden'
            },
            items: [
                me.iconComponent = new Ext.Component({
                    cls: me.baseIconCls
                }),
                me.promptContainer = new Ext.container.Container({
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        me.msg = new Ext.Component({
                            id: baseId + '-msg',
                            cls: me.baseCls + '-text'
                        }),

                        me.smallDetailMsg = Ext.create('Ext.form.FieldSet',{
                            id: baseId + '-smalldetailmsg',
                            padding: '5 5 10 5',
                            title: me.detailTitle,
                            collapsible: true,
//                            collapsed: me.sCollapsed,
                            maxHeight: me.smallDetailMaxHeight
                        })
                    ]
                })
            ]
        });
//        me.bigDetailMsg = Ext.create('Ext.form.FieldSet',{
//            hidden: true,
//            id: baseId + '-bigdetailmsg',
//            title: me.detailTitle,
//            padding: '5 5 10 5',
//            collapsible: true,
////            collapsed: me.bCollapsed,
//            maxHeight: me.bigDetailMaxHeight
//        });
        me.bigDetailMsgField = Ext.create('Ext.form.FieldSet',{
        	hidden: true,
        	id: baseId + '-bigdetailmsg',
        	title: me.detailTitle,
        	padding: '5 5 10 5',
        	collapsible: true,
        	items:[me.bigDetailMsg = Ext.create('Ext.form.field.TextArea',{})],
//            collapsed: me.bCollapsed,
        	maxHeight: me.bigDetailMaxHeight,
        	maxWidth: me.bigDetailMaxWidth
        });

        me.items = [me.topContainer, me.bigDetailMsgField];

        // Create the buttons based upon passed bitwise config
        me.msgButtons = [];
        for (i = 0; i < 4; i++) {
            button = me.makeButton(i);
            me.msgButtons[button.itemId] = button;
            me.msgButtons.push(button);
        }
        me.bottomTb = new Ext.toolbar.Toolbar({
            id: baseId + '-detailmsgtoolbar',
            ui: 'footer',
            dock: 'bottom',
            layout: {
                pack: 'center'
            },
            items: [
                me.msgButtons[0],
                me.msgButtons[1],
                me.msgButtons[2],
                me.msgButtons[3]
            ]
        });
        me.dockedItems = [me.bottomTb];
        me.on('close', me.onClose, me);
        me.callParent();
    },

    onClose: function () {
        var btn = this.header.child('[type=close]');
        // Give a temporary itemId so it can act like the cancel button
        btn.itemId = 'cancel';
        this.btnCallback(btn);
        delete btn.itemId;
    },

    reconfigure: function (cfg) {
        var me = this,
            buttons = 0,
            hideToolbar = true,
            oldButtonText = me.buttonText,
            resizer = me.resizer,
            header = me.header,
            headerCfg = header && !header.isHeader,
            message = cfg && (cfg.message || cfg.msg),
            smallDetail = cfg && (cfg.smallDetail || cfg.sDetail),
            bigDetail = cfg && (cfg.bigDetail || cfg.bDetail),
            resizeTracker, width, height, i, sDetailMsg,
            bDetailMsg, msg, msgButtons;

        // Restore default buttonText before reconfiguring.
        me.updateButtonText();

        me.cfg = cfg = cfg || {};
        if (cfg.width) {
            width = cfg.width;
        }

        if (cfg.height) {
            height = cfg.height;
        }

        me.minWidth = cfg.minWidth || me.defaultMinWidth;
        me.maxWidth = cfg.maxWidth || me.defaultMaxWidth;
        me.minHeight = cfg.minHeight || me.defaultMinHeight;
        me.maxHeight = cfg.maxHeight || me.defaultMaxHeight;

        if (resizer) {
            resizeTracker = resizer.resizeTracker;
            resizer.minWidth = resizeTracker.minWidth = me.minWidth;
            resizer.maxWidth = resizeTracker.maxWidth = me.maxWidth;
            resizer.minHeight = resizeTracker.minHeight = me.minHeight;
            resizer.maxHeight = resizeTracker.maxHeight = me.maxHeight;
        }


        // clear any old animateTarget
        me.animateTarget = cfg.animateTarget || undefined;

        // Defaults to modal
        me.modal = cfg.modal !== false;

        // Show the title/icon if a title/iconCls config was passed in the config to either the constructor
        // or the show() method. Note that anything passed in the config should win.
        //
        // Note that if there is no title/iconCls in the config, check the headerCfg and default to the instance
        // properties. This works because there are default values defined in initComponent.
        me.setTitle(cfg.title || (headerCfg && header.title) || me.title);
        me.setIconCls(cfg.iconCls || (headerCfg && header.iconCls) || me.iconCls);

        me.sCollapsed = cfg.sCollapsed || me.sCollapsed;
        me.bCollapsed = cfg.bCollapsed || me.bCollapsed;
        me.smallDetailHeight = cfg.smallDetailHeight || me.smallDetailHeight;
        me.bigDetailHeight = cfg.bigDetailHeight || me.bigDetailHeight;


        // Extract button configs
        if (Ext.isObject(cfg.buttons)) {
            me.buttonText = cfg.buttons;
            buttons = 0;
        } else {
            me.buttonText = cfg.buttonText || me.buttonText;
            buttons = Ext.isNumber(cfg.buttons) ? cfg.buttons : 0;
        }

        // Apply custom-configured buttonText
        // Infer additional buttons from the specified property names in the buttonText object
        buttons = buttons | me.updateButtonText();

        // Restore buttonText. Next run of reconfigure will restore to prototype's buttonText
        me.buttonText = oldButtonText;

        // During the on render, or size resetting layouts, and in subsequent hiding and showing, we need to
        // suspend layouts, and flush at the end when the Window's children are at their final visibility.
        Ext.suspendLayouts();
        me.width = me.height = null;
        if (width || height) {
            if (width) {
                me.setWidth(width);
            }

            if (height) {
                me.setHeight(height);
            }
        }
        me.hidden = false;
        if (!me.rendered) {
            me.render(Ext.getBody());
        }

        // Hide or show the close tool
        me.closable = cfg.closable !== false && !cfg.wait;

        // We need to redefine `header` because me.setIconCls() could create a Header instance.
        header = me.header;

        if (header) {
            header.child('[type=close]').setVisible(me.closable);

            // Hide or show the header
            if (!cfg.title && !me.closable && !cfg.iconCls) {
                header.hide();
            } else {
                header.show();
            }
        }

        // Default to dynamic drag: drag the window, not a ghost
        me.liveDrag = !cfg.proxyDrag;

        // wrap the user callback
        me.userCallback = Ext.Function.bind(cfg.callback || cfg.fn || Ext.emptyFn,
            cfg.scope || Ext.global);

        // Hide or show the icon Component
        me.setIcon(cfg.icon);

        // Hide or show the message area
        msg = me.msg;
        sDetailMsg = me.smallDetailMsg;
        bDetailMsg = me.bigDetailMsg;
        if (message) {
            msg.getEl().setHTML(message);
            msg.show();
        } else {
            msg.hide();
        }

        if (smallDetail) {
            if (Ext.isArray(smallDetail)) {
                //将数组变成换行
                smallDetail = smallDetail.join('<br/>');
            }
            sDetailMsg.getEl().setHTML(smallDetail);
            sDetailMsg.show();
        } else {
            sDetailMsg.hide();
        }

        if (bigDetail) {
            if (Ext.isArray(bigDetail)) {
                //将数组变成换行
                bigDetail = bigDetail.join('<br/>');
            }
            bDetailMsg.getEl().setHTML(bigDetail);
//            bDetailMsg.show();
            me.bigDetailMsgField.show();
        } else {
        	 me.bigDetailMsgField.hide();
//            bDetailMsg.hide();
        }


        // Hide or show buttons depending on flag value sent.
        msgButtons = me.msgButtons;
        for (i = 0; i < 4; i++) {
            if (buttons & Math.pow(2, i)) {

                // Default to focus on the first visible button if focus not already set
                if (!me.defaultFocus) {
                    me.defaultFocus = msgButtons[i];
                }
                msgButtons[i].show();
                hideToolbar = false;
            } else {
                msgButtons[i].hide();
            }
        }

        // Hide toolbar if no buttons to show
        if (hideToolbar) {
            me.bottomTb.hide();
        } else {
            me.bottomTb.show();
        }
        Ext.resumeLayouts(true);
    },

    /**
     * @private
     * Set button text according to current buttonText property object
     * @return {Number} The buttons bitwise flag based upon the button IDs specified in the buttonText property.
     */
    updateButtonText: function () {
        var me = this,
            buttonText = me.buttonText,
            buttons = 0,
            btnId,
            btn;

        for (btnId in buttonText) {
            if (buttonText.hasOwnProperty(btnId)) {
                btn = me.msgButtons[btnId];
                if (btn) {
                    if (me.cfg && me.cfg.buttonText) {
                        buttons = buttons | Math.pow(2, Ext.Array.indexOf(me.buttonIds, btnId));
                    }
                    if (btn.text != buttonText[btnId]) {
                        btn.setText(buttonText[btnId]);
                    }
                }
            }
        }
        return buttons;
    },

    /**
     * Displays a new message box, or reinitializes an existing message box, based on the config options passed in. All
     * display functions (e.g. prompt, alert, etc.) on MessageBox call this function internally, although those calls
     * are basic shortcuts and do not support all of the config options allowed here.
     *
     * Example usage:
     *
     *     Ext.Msg.show({
     *         title: 'Address',
     *         message: 'Please enter your address:',
     *         width: 300,
     *         buttons: Ext.Msg.OKCANCEL,
     *         multiline: true,
     *         smallDetail : '',
     *         bigDetail : '',
     *         fn: saveAddress,
     *         animateTarget: 'addAddressBtn',
     *         icon: Ext.window.MessageBox.INFO
     *     });
     *
     * @param {Object} config The following config options are supported:
     *
     * @param {String/Ext.dom.Element} config.animateTarget
     * An id or Element from which the message box should animate as it opens and closes.
     *
     * @param {Number} [config.buttons=false]
     * A bitwise button specifier consisting of the sum of any of the following constants:
     *
     *  - Ext.MessageBox.OK
     *  - Ext.MessageBox.YES
     *  - Ext.MessageBox.NO
     *  - Ext.MessageBox.CANCEL
     *
     * Some common combinations have already been predefined:
     *
     *  - Ext.MessageBox.OKCANCEL
     *  - Ext.MessageBox.YESNO
     *  - Ext.MessageBox.YESNOCANCEL
     *
     * Or false to not show any buttons.
     *
     * This may also be specified as an object hash containing custom button text in the same format as the
     * {@link #buttonText} config. Button IDs present as property names will be made visible.
     *
     * @param {Boolean} config.closable
     * False to hide the top-right close button (defaults to true). Note that progress and wait dialogs will ignore this
     * property and always hide the close button as they can only be closed programmatically.
     *
     * @param {String} config.cls
     * A custom CSS class to apply to the message box's container element
     *
     *  @param {Number} [config.smallDetailHeight=100]
     *  设置小详细框高度
     *
     * @param {Number} [config.bigDetailHeight=200]
     * 设置大详细框高度.
     *
     * @param {Boolean} config.sCollapsed
     * False 展开小详细框 (默认 true)
     *
     * @param {Boolean} config.bCollapsed
     * False 展开大详细框 (默认 true)
     *
     * @param {Function} config.fn
     * A callback function which is called when the dialog is dismissed either by clicking on the configured buttons, or
     * on the dialog close button, or by pressing the return button to enter input.
     *
     * Progress and wait dialogs will ignore this option since they do not respond to user actions and can only be
     * closed programmatically, so any required function should be called by the same code after it closes the dialog.
     * Parameters passed:
     *
     *  @param {String} config.fn.buttonId The ID of the button pressed, one of:
     *
     * - ok
     * - yes
     * - no
     * - cancel
     *
     *
     *  @param {Object} config.fn.opt The config object passed to show.
     *
     * @param {Object} config.buttonText
     * An object containing string properties which override the system-supplied button text values just for this
     * invocation. The property names are:
     *
     * - ok
     * - yes
     * - no
     * - cancel
     *
     * @param {Object} config.scope
     * The scope (`this` reference) in which the function will be executed.
     *
     * @param {String} config.icon
     * A CSS class that provides a background image to be used as the body icon for the dialog.
     * One can use a predefined icon class:
     *
     *  - Ext.MessageBox.INFO
     *  - Ext.MessageBox.WARNING
     *  - Ext.MessageBox.QUESTION
     *  - Ext.MessageBox.ERROR
     *
     * or use just any `'custom-class'`. Defaults to empty string.
     *
     * @param {String} config.iconCls
     * The standard {@link Ext.window.Window#iconCls} to add an optional header icon (defaults to '')
     *
     * @param {String} config.defaultFocus
     * The button to focus when showing the dialog. If not specified, defaults to
     * the first visible button.
     *
     * @param {Number} config.maxWidth
     * The maximum width in pixels of the message box (defaults to 600)
     *
     * @param {Number} config.minWidth
     * The minimum width in pixels of the message box (defaults to 100)
     *
     * @param {Boolean} config.modal
     * False to allow user interaction with the page while the message box is displayed (defaults to true)
     *
     * @param {String} config.message
     * A string that will replace the existing message box body text (defaults to the XHTML-compliant non-breaking space
     * character '&#160;')
     *
     * @param {Boolean} config.proxyDrag
     * True to display a lightweight proxy while dragging (defaults to false)
     *
     * @param {String} config.title
     * The title text
     *
     * @param {Number} config.width
     * The width of the dialog in pixels
     *
     * @return {Ext.window.MessageBox} this
     */
    show: function (cfg) {
        var me = this;

        cfg = cfg || {};

        // If called during global layout suspension, make the call after layout resumption
        if (Ext.Component.layoutSuspendCount) {
            Ext.on({
                resumelayouts: function () {
                    me.show(cfg);
                },
                single: true
            });
            return me;
        }

        me.reconfigure(cfg);
        if (cfg.cls) {
            me.addCls(cfg.cls);
        }


        // Set the flag, so that the parent show method performs the show procedure that we need.
        // ie: animation from animTarget, onShow processing and focusing.
        me.hidden = true;
        me.callParent();
        return me;
    },

    onShow: function () {
        this.callParent(arguments);
        this.center();
    },

    updateText: function (text) {
        this.msg.getEl().setHTML(text);
    },

    /**
     * Adds the specified icon to the dialog.  By default, the class 'x-messagebox-icon' is applied for default
     * styling, and the class passed in is expected to supply the background image url. Pass in empty string ('')
     * to clear any existing icon. This method must be called before the MessageBox is shown.
     * The following built-in icon classes are supported, but you can also pass in a custom class name:
     *
     *     Ext.window.MessageBox.INFO
     *     Ext.window.MessageBox.WARNING
     *     Ext.window.MessageBox.QUESTION
     *     Ext.window.MessageBox.ERROR
     *
     * @param {String} icon A CSS classname specifying the icon's background image url, or empty string to clear the icon
     * @param {Number} [width] The width of the icon. If not specified, the default is used
     * @param {Number} [height] The height of the icon. If not specified, the default is used
     * @return {Ext.window.MessageBox} this
     */
    setIcon: function (icon, width, height) {
        var me = this,
            iconCmp = me.iconComponent,
            cls = me.messageIconCls;

        if (cls) {
            iconCmp.removeCls(cls);
        }

        if (icon) {
            iconCmp.show();
            if (width || height) {
                iconCmp.setSize(width || iconCmp.getWidth(), height || iconCmp.getHeight());
            }
            iconCmp.addCls(Ext.baseCSSPrefix + 'dlg-icon');
            iconCmp.addCls(me.messageIconCls = icon);
        } else {
            iconCmp.removeCls(Ext.baseCSSPrefix + 'dlg-icon');
            iconCmp.hide();
        }
        return me;
    },

    /**
     * 更新详细框中的文本内容
     *
     * @param {String} [target=s/b] 选择更新详细信息的目标框  smallDetailMsg / bigDetailMsg.
     * @param {String} [message] 文本内容
     * @return {Ext.window.MessageBox} this
     */
    updateDetailMsg: function (target, message) {
        if (target === 's') {
            this.smallDetailMsg.update(message);
        } else {
            this.bigDetailMsg.update(message);
        }
        return this;
    },

    onEsc: function () {
        if (this.closable !== false) {
            this.callParent(arguments);
        }
    }

}, function (MessageBox) {
    /**
     * @class Ext.ux.DetailMessageBox
     * @alternateClassName Ext.Msg
     * @extends Ext.window.MessageBox
     * @singleton
     */

    Ext.onReady(function () {
        Ext.ux.DetailMsg = new MessageBox();
    });
});