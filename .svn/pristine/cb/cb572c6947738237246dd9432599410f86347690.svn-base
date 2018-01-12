
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


