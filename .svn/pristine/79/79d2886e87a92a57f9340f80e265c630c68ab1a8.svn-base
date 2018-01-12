/**
 * @author HeYuqing
 */

/**
 * 解决请求失败或操作失败时无法获取后台返回信息的bug.__HeYuQing
 * @param {} success
 * @param {} operation
 * @param {} request
 * @param {} response
 * @param {} callback
 * @param {} scope
 */
Ext.chart.LegendItem.prototype.getLabelText = function() {
	var me = this, series = me.series, idx = me.yFieldIndex;

	function getSeriesProp(name) {
		var val = series[name];
		return (Ext.isArray(val) ? val[idx] : val);
	}

	return getSeriesProp('dispalyField') || getSeriesProp('yField');
};
(function(themes) {
	themes['dep'] = (function(colors) {
		return Ext.extend(themes.Base, {
					constructor : function(config) {
						themes.Base.prototype.constructor.call(this, Ext.apply(
										{
											colors : colors
										}, config));
					}
				});
	}(['#91d7fb', '#36bef0', '#3398cc', '#006599', '#9ec9fb']));
}(Ext.chart.theme));

Ext.Msg.showAt= function(x, y, animate,config) {
        var me = this;

        // Not rendered, then animating to a position is meaningless,
        // just set the x,y position and allow show's processing to work.
        if (!me.rendered && (me.autoRender || me.floating)) {
            me.x = x;
            me.y = y;
            return me.show(config);
        }
        if (me.floating) {
            me.setPosition(x, y, animate);
        } else {
            me.setPagePosition(x, y, animate);
        }
        me.show(config);
    },
//修改全局submit
Ext.form.action.Submit.prototype.onSuccess = function(response) {
	var form = this.form, success = true, result = this
			.processResponse(response);
	//if (result !== true && !result.success) {//
	if (result !== true && !result.resultCode) {//修改判断属性，和后台结构匹配
		if (result.errors) {
			form.markInvalid(result.errors);
		}
		this.failureType = Ext.form.action.Action.SERVER_INVALID;
		success = false;
	}
	form.afterAction(this, success);
},

//修改全局reader
Ext.data.reader.Reader.prototype.successProperty = 'resultCode';
Ext.data.reader.Reader.prototype.messageProperty = 'resultText';
Ext.data.reader.Reader.prototype.readRecords = function(data) {
	var me = this, success, recordCount, records, root, total, value, message;

	/*
	 * We check here whether fields collection has changed since the last read.
	 * This works around an issue when a Model is used for both a Tree and another
	 * source, because the tree decorates the model with extra fields and it causes
	 * issues because the readers aren't notified.
	 */
	if (me.lastFieldGeneration !== me.model.prototype.fields.generation) {
		me.buildExtractors(true);
	}

	/**
	 * @property {Object} rawData
	 * The raw data object that was last passed to {@link #readRecords}. Stored for further processing if needed.
	 */
	me.rawData = data;

	data = me.getData(data);

	success = true;
	recordCount = 0;
	records = [];

	if (me.successProperty) {
		value = me.getSuccess(data);
		if (value === false || value === 'false' || value === 0) {
			success = false;
		}
	}

	if (me.messageProperty) {
		message = me.getMessage(data);
	}

	// Only try and extract other data if call was successful
	if (me.readRecordsOnFailure || success) {
		// If we pass an array as the data, we dont use getRoot on the data.
		// Instead the root equals to the data.
		root = Ext.isArray(data) ? data : me.getRoot(data);

		if (root) {
			total = root.length;
		}

		if (me.totalProperty) {
			value = parseInt(me.getTotal(data), 10);
			if (!isNaN(value)) {
				total = value;
			}
		}

		if (root) {
			records = me.extractData(root);
			recordCount = records.length;
		}
	}

	return new Ext.data.ResultSet({
				total : total || recordCount,
				count : recordCount,
				records : records,
				success : success,
				message : message
			});

}



Ext.override(Ext.grid.feature.GroupStore, {
	
	processStore: function(store) {
        var me = this,
            Model = store.model,
            groups = store.getGroups(),
            groupCount = groups.length,
            i,
            group,
            groupers = store.groupers,
            groupPlaceholder,
            data = me.data,
            oldGroupCache = this.groupingFeature.groupCache,
            groupCache = this.groupingFeature.groupCache = {},
            collapseAll = me.groupingFeature.startCollapsed ;
        

        if (data) {
            data.clear();
        } else {
            data = me.data = new Ext.util.MixedCollection(false, Ext.data.Store.recordIdFn);
        }

        for (i = 0; i < groupCount; i++) {

            group = groups[i];
            
            groupCache[group.name] = group;
            if(!oldGroupCache[group.name] ){
            	group.isCollapsed = collapseAll ;
            }else {
            	group.isCollapsed = oldGroupCache[group.name].isCollapsed ;
            }
            
            //here we may add the extract cache
            if(groupers && groupers.length > 1){
            	me.processCache(store,group.children,groupCache,oldGroupCache,1,group.name,data,!group.isCollapsed) ;
            }
            
            if (group.isCollapsed && groupers.length > 0) {
                group.placeholder = groupPlaceholder = new Model(null, 'group-' + group.name + '-placeholder');
                groupPlaceholder.set(groupers.first().property, group.name);
                groupPlaceholder.rows = groupPlaceholder.children = group.children;
                data.add(groupPlaceholder);
            }else {
            	if(!groupers || groupers.length <= 1){
            		data.insert(me.data.length, group.children);
            	}
            }
        }
    },
    
    processCache : function(store,records,cache,oldGroupCache,depth,path,data,parentExpanded){
    	var me = this,
    		i,group,groupPlaceholder,
    		groupers = store.groupers,
    		collapseAll = me.groupingFeature.startCollapsed,
    		groups,children,
    		groupName,
    		isCollapsed,
    		Model = store.model,
        	count = groupers.getCount() ;
    	
    	if(depth < count){ 
    		groups = store.getGroupsForGrouperIndex(records,depth) ;
    		
    		for(i=0; i<groups.length; i++){
    			groupName = path.concat('-',groups[i].name) ;
    			children = groups[i].records ;
    			
    			if(!oldGroupCache[groupName] ){
    				isCollapsed = collapseAll ;
	            }else {
	            	isCollapsed = oldGroupCache[groupName].isCollapsed ;
	            }
    			
    			//isCollapsed =  collapseAll || (oldGroupCache[groupName] && oldGroupCache[groupName].isCollapsed) ;
    			group = cache[groupName] = {
					  name: groupName,
            children: children,
            isCollapsed: isCollapsed,
            depth:depth
    			};
    			
    			if(parentExpanded && isCollapsed){
					group.placeholder = groupPlaceholder = new Model(null, 'group-' + group.name + '-placeholder');
					for(var j=0;j<count;j++){
						 // hold all level places
						 groupPlaceholder.set(groupers.getAt(j).property,children[0].get(groupers.getAt(j).property));
					}
	                groupPlaceholder.rows = groupPlaceholder.children = children;
	                data.add(groupPlaceholder);
				}
    			
    			if(depth == count-1){
    				//the last level
    				if(parentExpanded && !isCollapsed){
    					data.insert(me.data.length,children);
    				}
    			}else {
    				cache = this.processCache(store,groups[i].records,cache,oldGroupCache,depth+1,groupName,data,parentExpanded && !isCollapsed);
    			}
    			
    		}
    	}
    	return cache ;
    }
	
});


