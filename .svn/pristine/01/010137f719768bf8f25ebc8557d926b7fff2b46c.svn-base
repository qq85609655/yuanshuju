
/**
 * 重写grid的拖拽方法
 */
Ext.define('Dep.framework.editor.view.plugin.GridDragDrop', {
    extend: 'Ext.grid.plugin.DragDrop',
    alias: 'plugin.gridviewonerowdragdrop',
    /**
     * 重写onViewRender方法
     */
    onViewRender : function(view) {
        var me = this,
            scrollEl = null;

        if (me.enableDrag) {
            if (me.containerScroll) {
                scrollEl = view.getEl();
            }
            
            me.dragZone = new Ext.view.DragZone({
                view: view,
                ddGroup: me.dragGroup || me.ddGroup,
                dragText: me.dragText,
                containerScroll: me.containerScroll,
                scrollEl: scrollEl,
                /**
                 * 重写父类方法，修改拖拽传输数据
                 */
                getDragData: function(e) {
                    var view = this.view,me = this,
                        item = e.getTarget(view.getItemSelector());

                    if (item) {
                        return {
                            copy: view.copy || (view.allowCopy && e.ctrlKey),
                            event: new Ext.EventObjectImpl(e),
                            view: view,
                            ddel: this.ddel,
                            item: item,
                            //重写此行代码
                            records: me.dragRecord,
//                            records: view.getSelectionModel().getSelection(),
                            fromPosition: Ext.fly(item).getXY()
                        };
                    }
                },
                /**
                 * 重写此方法
                 */
            	onInitDrag : function(x, y) {
            		var me = this, data = me.dragData, view = data.view, record = view
            				.getRecord(data.item);
            		data.records = [ record ];
            		me.dragRecord = [ record ];
            		me.ddel.update(me.getDragText());
            		me.proxy.update(me.ddel.dom);
            		me.onStartDrag(x, y);
            		return true;
            	}
            });
        }

        if (me.enableDrop) {
            me.dropZone = new Ext.grid.ViewDropZone({
                view: view,
                ddGroup: me.dropGroup || me.ddGroup,
                /**
                 * 重写父类方法，不更新selectmodel
                 */
                handleNodeDrop : function(data, record, position) {
                    var view = this.view,
                        store = view.getStore(),
                        index, records, i, len;

                    // If the copy flag is set, create a copy of the models
                    if (data.copy) {
                        records = data.records;
                        data.records = [];
                        for (i = 0, len = records.length; i < len; i++) {
                            data.records.push(records[i].copy());
                        }
                    } else {
                        /*
                         * Remove from the source store. We do this regardless of whether the store
                         * is the same bacsue the store currently doesn't handle moving records
                         * within the store. In the future it should be possible to do this.
                         * Here was pass the isMove parameter if we're moving to the same view.
                         */
                        data.view.store.remove(data.records, data.view === view);
                    }

                    if (record && position) {
                        index = store.indexOf(record);

                        // 'after', or undefined (meaning a drop at index -1 on an empty View)...
                        if (position !== 'before') {
                            index++;
                        }
                        store.insert(index, data.records);
                    }
                    // No position specified - append.
                    else {
                        store.add(data.records);
                    }
                    //此处不更新model的select状态
//                    view.getSelectionModel().select(data.records);
                }
            });
        }
    }
    
});

