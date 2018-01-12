/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
/**
 * This feature allows to display the grid rows aggregated into groups as specified by the {@link Ext.data.Store#groupers}
 * specified on the Store. The group will show the title for the group name and then the appropriate records for the group
 * underneath. The groups can also be expanded and collapsed.
 * 
 *
 * ## Menu Augmentation
 *
 * This feature adds extra options to the grid column menu to provide the user with functionality to modify the grouping.
 * This can be disabled by setting the {@link #enableGroupingMenu} option. The option to disallow grouping from being turned off
 * by the user is {@link #enableNoGroups}.
 *
 * ## Controlling Group Text
 *
 * The {@link #groupHeaderTpl} is used to control the rendered title for each group. It can modified to customized
 * the default display.
 *
 * ## Example Usage
 *
 * @example
 *     var store = Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['name', 'seniority', 'department'],
 *         groupField: 'department',
 *         data: {'employees':[
 *             { "name": "Michael Scott",  "seniority": 7, "department": "Management" },
 *             { "name": "Dwight Schrute", "seniority": 2, "department": "Sales" },
 *             { "name": "Jim Halpert",    "seniority": 3, "department": "Sales" },
 *             { "name": "Kevin Malone",   "seniority": 4, "department": "Accounting" },
 *             { "name": "Angela Martin",  "seniority": 5, "department": "Accounting" }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'employees'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Employees',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             { text: 'Name',     dataIndex: 'name' },
 *             { text: 'Seniority', dataIndex: 'seniority' }
 *         ],
 *         features: [{ftype:'grouping'}],
 *         width: 200,
 *         height: 275,
 *         renderTo: Ext.getBody()
 *     });
 *
 * **Note:** To use grouping with a grid that has {@link Ext.grid.column.Column#locked locked columns}, you need to supply
 * the grouping feature as a config object - so the grid can create two instances of the grouping feature.
 */
Ext.define('Ext.ux.grid.feature.MultiGrouping', {
	extend: 'Ext.grid.feature.Grouping',
	alias: 'feature.multigrouping',
  showSummaryRow: true,

  groupTpl: [
        '{%',
            'var me = this.groupingFeature;',
            // If grouping is disabled, do not call setupRowData, and do not wrap
            'if (me.disabled) {',
              'values.needsWrap = false;',
            '} else {',
              'me.setupRowData(values.record, values.recordIndex, values, values.depth);',
              'values.needsWrap = !me.disabled && (values.isFirstRow || values.summaryRecord);',
              'values.recordIndex += me.skippedRows;',
            '}',
        '%}',
        '<tpl if="needsWrap">',
            '<tr data-boundView="{view.id}" data-recordId="{record.internalId}" data-recordIndex="{[values.isCollapsedGroup ? -1 : values.recordIndex]}" class="{[values.itemClasses.join(" ")]} ' + Ext.baseCSSPrefix + 'grid-wrap-row">',
                '<td class="' + Ext.baseCSSPrefix + 'group-hd-container" colspan="{columns.length}" >',
                    '<tpl if="isFirstRow">',
                        '{%',
                            // Group title is visible if not locking, or we are the locked side, or the locked side has no columns/
                            // Use visibility to keep row heights synced without intervention.
                            'var groupTitleStyle = (!values.view.lockingPartner || (values.view.ownerCt === values.view.ownerCt.ownerLockable.lockedGrid) || (values.view.lockingPartner.headerCt.getVisibleGridColumns().length === 0)) ? "" : "visibility:hidden";',
                        '%}',

                        '<tpl for="groupInfos">' +
                          '<div id="{groupId}" grouppath="{groupPath}" depth="{depth}" class="' + Ext.baseCSSPrefix + 'grid-group-hd {collapsibleCls} {hdCollapsedCls}" tabIndex="0" style="padding-left:{[values.depth*20]}px;">',
                              '<div class="' + Ext.baseCSSPrefix + 'grid-group-title" style="{[groupTitleStyle]}">',
                                  '{[parent.groupHeaderTpl.apply(values, parent) || "&#160;"]}',
                              '</div>',
                          '</div>',

                          '<tpl if="summaryRecord && !lastGroup">',
                              '<table class="' + Ext.baseCSSPrefix + '{parent.view.id}-table ' + Ext.baseCSSPrefix + 'grid-table" border="0" cellspacing="0" cellpadding="0" style="width:100%">',
                                  '{[parent.view.renderColumnSizer(out)]}',
                                  '<tpl if="summaryRecord">',
                                      '{%me.outputSummaryRecord(values.summaryRecord, values, out);%}',
                                  '</tpl>',
                              '</table>',
                          '</tpl>',

                        '</tpl>',
                    '</tpl>',

                    // Only output the child rows if this is *not* a collapsed group
                    '<tpl if="summaryRecord || !isCollapsedGroup">',
                        '<table class="' + Ext.baseCSSPrefix + '{view.id}-table ' + Ext.baseCSSPrefix + 'grid-table" border="0" cellspacing="0" cellpadding="0" style="width:100%">',
                            '{[values.view.renderColumnSizer(out)]}',
                            // Only output the first row if this is *not* a collapsed group
                            '<tpl if="!isCollapsedGroup">',
                                '{%',
                                    'values.itemClasses.length = 0;',
                                    'this.nextTpl.applyOut(values, out, parent);',
                                '%}',
                            '</tpl>',
                            '<tpl if="summaryRecord">',
                                '{%me.outputSummaryRecord(values.summaryRecord, values, out);%}',
                            '</tpl>',
                        '</table>',
                    '</tpl>',
                '</td>',
            '</tr>',
            '{%',
                'if (values.isCollapsedGroup) {',
                    'me.skippedRows += me.getRecordGroup(values.record,values.whichDepthCollased).children.length - 1;',
                '}',
            '%}',
        '<tpl else>',
            '{%this.nextTpl.applyOut(values, out, parent);%}',
        '</tpl>', {
            priority: 200,
            syncRowHeights: function(firstRow, secondRow) {
              firstRow = Ext.fly(firstRow, 'syncDest');
              secondRow = Ext.fly(secondRow, 'sycSrc');
              var owner = this.owner,
                  firstHd = firstRow.down(owner.eventSelector, true),
                  secondHd,
                  firstSummaryRow = firstRow.down(owner.summaryRowSelector, true),
                  secondSummaryRow,
                  firstHeight, secondHeight;

              // Sync the heights of header elements in each row if they need it.
              if (firstHd && (secondHd = secondRow.down(owner.eventSelector, true))) {
                firstHd.style.height = secondHd.style.height = '';
                if ((firstHeight = firstHd.offsetHeight) > (secondHeight = secondHd.offsetHeight)) {
                  Ext.fly(secondHd).setHeight(firstHeight);
                }
                else if (secondHeight > firstHeight) {
                  Ext.fly(firstHd).setHeight(secondHeight);
                }
              }

              // Sync the heights of summary row in each row if they need it.
              if (firstSummaryRow && (secondSummaryRow = secondRow.down(owner.summaryRowSelector, true))) {
                firstSummaryRow.style.height = secondSummaryRow.style.height = '';
                if ((firstHeight = firstSummaryRow.offsetHeight) > (secondHeight = secondSummaryRow.offsetHeight)) {
                  Ext.fly(secondSummaryRow).setHeight(firstHeight);
                }
                else if (secondHeight > firstHeight) {
                  Ext.fly(firstSummaryRow).setHeight(secondHeight);
                }
              }
            },

            syncContent: function(destRow, sourceRow) {
              destRow = Ext.fly(destRow, 'syncDest');
              sourceRow = Ext.fly(sourceRow, 'sycSrc');
              var owner = this.owner,
                  destHd = destRow.down(owner.eventSelector, true),
                  sourceHd = sourceRow.down(owner.eventSelector, true),
                  destSummaryRow = destRow.down(owner.summaryRowSelector, true),
                  sourceSummaryRow = sourceRow.down(owner.summaryRowSelector, true);

              // Sync the content of header element.
              if (destHd && sourceHd) {
                Ext.fly(destHd).syncContent(sourceHd);
              }

              // Sync the content of summary row element.
              if (destSummaryRow && sourceSummaryRow) {
                Ext.fly(destSummaryRow).syncContent(sourceSummaryRow);
              }
            }
        }
    ],

    // Update first and last records in groups when column moves
    // Because of the RowWrap template, this will update the groups' headers and footers
    onColumnMove: function() {
      this.callParent();
      this.dataSource.onRefresh();
    },

    /**
     * Expand all groups
     */
    expandAll: function() {
        var me = this,
            view = me.view,
            groupCache = me.groupCache,
            groupName,
            lockingPartner = me.lockingPartner,
            partnerView;

        // Clear all collapsed flags
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                groupCache[groupName].isCollapsed = false;
            }
        }
        Ext.suspendLayouts();
        view.suspendEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
          partnerView = lockingPartner.view;
          partnerView.suspendEvent('beforerefresh', 'refresh');
        }
        me.dataSource.onRefresh();
        view.resumeEvent('beforerefresh', 'refresh');

        if (lockingPartner) {
          partnerView.resumeEvent('beforerefresh', 'refresh');
        }
        Ext.resumeLayouts(true);

        // Fire event for all groups post expand
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
              view.fireEvent('groupexpand', view, Ext.get(this.getHeaderNode(groupName)), groupName);
              if (lockingPartner) {
                lockingPartner.afterCollapseExpand(false, groupName);
              }
            }
        }
    },

  /**
     * Collapse all groups
     */
    collapseAll: function() {
        var me = this,
            view = me.view,
            groupCache = me.groupCache,
            groupName,
            lockingPartner = me.lockingPartner,
            partnerView;

        // Set all collapsed flags
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                groupCache[groupName].isCollapsed = true;
            }
        }
        Ext.suspendLayouts();
        view.suspendEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
          partnerView = lockingPartner.view;
          partnerView.suspendEvent('beforerefresh', 'refresh');
        }
        me.dataSource.onRefresh();
        view.resumeEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
          partnerView.resumeEvent('beforerefresh', 'refresh');
        }
        if (lockingPartner && !lockingPartner.isAllCollapsed()) {
          lockingPartner.collapseAll();
        }
        Ext.resumeLayouts(true);

        // Fire event for all groups post collapse
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
              view.fireEvent('groupcollapse', view, Ext.get(this.getHeaderNode(groupName)), groupName);
              if (lockingPartner) {
                lockingPartner.afterCollapseExpand(true, groupName);
              }
            }
        }
    },

    doCollapseExpand: function (collapsed, groupName, focus) {
      var me = this,
          view = me.view,
          groupCache = me.groupCache,
          lockingPartner = me.lockingPartner,
          header;

      if (groupCache.hasOwnProperty(groupName) && groupCache[groupName].isCollapsed != collapsed) {
        groupCache[groupName].isCollapsed = collapsed;
        // The GroupStore is shared by partnered Grouping features, so this will refresh both sides.
        // We only want one layout as a result though, so suspend layouts while refreshing.
        Ext.suspendLayouts();
        me.dataSource.onRefresh();

        header = Ext.get(this.getHeaderNode(groupName));
        view.fireEvent(collapsed ? 'groupcollapse' : 'groupexpand', view, header, groupName);
        // If we are one side of a locking view, the other side has to stay in sync
        if (lockingPartner) {
          lockingPartner.doCollapseExpand(collapsed, groupName, false);
        }
        Ext.resumeLayouts(true);

        // Sync the lockingPartner's group state.
        // Do not pass on focus flag. If we were told to focus, we must focus, not the other side.
        if (lockingPartner) {
          lockingPartner.afterCollapseExpand(collapsed, groupName, false);
        }
      }
      else {
        // not found, iterate over groupCache
        var grpName, tmpName, p;

        for (grpName in groupCache) {
          p = grpName.lastIndexOf(groupName);
          tmpName = (p > -1 ? grpName.substring(p) : grpName);
//          console.log(groupName);
//          console.log(tmpName);

          if (tmpName == groupName && groupCache.hasOwnProperty(grpName) && groupCache[grpName].isCollapsed != collapsed) {
//            console.log('Found: ' + tmpName);
            groupCache[grpName].isCollapsed = collapsed;
            Ext.suspendLayouts();
            me.dataSource.onRefresh();
            header = Ext.get(this.getHeaderNode(grpName));
            view.fireEvent(collapsed ? 'groupcollapse' : 'groupexpand', view, header, grpName);
            // If we are one side of a locking view, the other side has to stay in sync
            if (lockingPartner) {
              lockingPartner.doCollapseExpand(collapsed, grpName, false);
            }
            Ext.resumeLayouts(true);

            // Sync the lockingPartner's group state.
            // Do not pass on focus flag. If we were told to focus, we must focus, not the other side.
            if (lockingPartner) {
              lockingPartner.afterCollapseExpand(collapsed, grpName, false);
            }

            return;
          }
        }
      }
    },

    getGroupName: function(element) {
        var me = this,
            view = me.view,
            eventSelector = me.eventSelector,
            parts,
            targetEl,
            row;

        // See if element is, or is within a group header. If so, we can extract its name
        targetEl = Ext.fly(element).findParent(eventSelector);

        if (!targetEl) {
            // Otherwise, navigate up to the row and look down to see if we can find it    
            row = Ext.fly(element).findParent(view.itemSelector);
            if (row) {
                targetEl = row.down(eventSelector, true);
            }
        }

        if (targetEl) {
//          console.log("grouppath: " + targetEl.getAttribute("grouppath"));

        	if (targetEl.hasAttribute("grouppath")) {
        		return targetEl.getAttribute("grouppath") ;
        	}
          else {
            parts = targetEl.id.split(view.id + '-hd-');
            if (parts.length === 2) {
              return Ext.htmlDecode(parts[1]);
            }
        	}
        }
    },

    /**
     * Returns the group data object for the group to which the passed record belongs **if the Store is grouped**.
     *
     * @param {Ext.data.Model} record The record for which to return group information.
     * @param {Number} depth
     * @return {Object} A single group data block as returned from {@link Ext.data.Store#getGroups Store.getGroups}. Returns
     * `undefined` if the Store is not grouped.
     *
     */
    getRecordGroup: function(record,depth) {
    	/*
        var grouper = this.view.store.groupers.first();
        if (grouper) {
            return this.groupCache[grouper.getGroupString(record)];
        }*/
        var groupPath = this.getGroupPath(record,depth);
        var cache = this.groupCache[groupPath] ;
        if(!cache) return { children:[] } ;

        return cache ;
    },

    getGroupField: function(){
      //  return this.view.store.getGroupField();
        var groupers = this.view.store.groupers,
        i, count = groupers.getCount();
        if (count == 0) {
          return '';
        }
        var groups = groupers.first().property;
        for (i = 1; i < count; i++) {
          groups = groups.concat('-', groupers.getAt(i).property);
        }

        return groups;
    },

    getGroupPath: function(record, depth){
      var groupers = this.view.store.groupers,
          i, count = groupers.getCount();

      if (count == 0) {
        return '';
      }
      if(depth >= count) depth = count ;
      var groups = groupers.first().getGroupString(record);

      for (i = 1; i <= depth; i++) {
        groups = groups.concat('-', groupers.getAt(i).getGroupString(record));
      }

      return groups;
	  },

    setupRowData: function(record, idx, rowValues, depth) {
        var me = this,
            data = me.refreshData,
            groupInfo = me.groupInfo,
            header = data.header,
            //groupField = data.groupField,
            store = me.view.dataSource,
            groupers = me.view.store.groupers,
            grouper, groupName, prev, next, lastGrouper,
            grouperLength,
            groupInfos = [],
            k = 0, allExpand = true, whichDepthCollased = 0,
            expand, groupPath ;

        rowValues.isCollapsedGroup = false;
        rowValues.summaryRecord = null;

        if (data.doGrouping) {
        	grouper = groupers.first();
        	lastGrouper = groupers.last();
        	grouperLength = groupers.length;
        	
            // See if the current record is the last in the group
            rowValues.isFirstRow = idx === 0;
            if (!rowValues.isFirstRow) {
                prev = store.getAt(idx - 1);
                // If the previous row is of a different group, then we're at the first for a new group
                if (prev) {
                    // Must use Model's comparison because Date objects are never equal
                    rowValues.isFirstRow = !prev.isEqual(lastGrouper.getGroupString(prev), lastGrouper.getGroupString(record));
                    for(var i=0;i<grouperLength;i++){
                    	
                    var tempGrouper = groupers.getAt(i);
                    var prevGroupString = tempGrouper.getGroupString(prev) ;
                    var groupString = tempGrouper.getGroupString(record) ;

                    if(!prev.isEqual(prevGroupString,groupString)){
                      rowValues.isFirstRow = true ;
                    }
	            		
	            	  }
                }
            }

            // See if the current record is the last in the group
            rowValues.isLastRow = idx == store.getTotalCount() - 1;
            if (!rowValues.isLastRow) {
                next = store.getAt(idx + 1);
                if (next) {
                    // Must use Model's comparison because Date objects are never equal
                    rowValues.isLastRow = !next.isEqual(lastGrouper.getGroupString(next), lastGrouper.getGroupString(record));
                }
            }
            
            groupName = grouper.getGroupString(record);
            
            if (rowValues.isFirstRow) {
            	
            	//see which group is diffrenct to the pre ;
            	prev = store.getAt(idx - 1);
            	
            	if (prev){
	        		  for (var i=0;i<grouperLength;i++){
	            		
	            		var tempGrouper = groupers.getAt(i);
	            		var prevGroupString = tempGrouper.getGroupString(prev) ;
	            		var groupString = tempGrouper.getGroupString(record) ;
	            		
	            		if(!prev.isEqual(prevGroupString,groupString)){
	            			k = i ;
	            			break ;
	            		}
	            	} 
            	}
            	
            	for (var i=k;i<grouperLength;i++){
            		var lastPath = i == 0 ? groupName : me.getGroupPath(record,i-1) ;
            		
            		if (i==0 || me.isExpanded(lastPath)){
	            		groupInfo = {} ;
	            		var tempGrouper = groupers.getAt(i);
	            		groupPath = me.getGroupPath(record,i);
                  groupInfo.groupField = tempGrouper.property;
                  groupInfo.name = tempGrouper.getGroupString(record);
                  groupInfo.groupValue = tempGrouper.getGroupString(record);
                  groupInfo.columnName = header ? header.text : (tempGrouper.name || tempGrouper.property);
                  groupInfo.depth = i ;
                  groupInfo.groupId = me.createGroupId(groupInfo.name);
                  groupInfo.groupPath = groupPath;
                  groupInfo.collapsibleCls = me.collapsible ? me.collapsibleCls : me.hdNotCollapsibleCls;
                  groupInfo.lastGroup = (i == grouperLength - 1);
                  groupInfo.visibleColumns = rowValues.visibleColumns ;
                  groupInfo.view = rowValues.view ;
                  groupInfo.columns = rowValues.columns ;
	                    

                  // We only get passed a GroupStore if the store is not buffered
                  expand = me.isExpanded(groupPath) ;
                  allExpand = allExpand && expand ;

                  if(!expand){
                    groupInfo.hdCollapsedCls = me.hdCollapsedCls;
                  } else {
                    groupInfo.hdCollapsedCls = "";
                  }

                  if(!expand && !whichDepthCollased){
                    whichDepthCollased = i ;
                  }

                  if (me.showSummaryRow) {
                    groupInfo.summaryRecord = data.summaryData[groupPath];
                  }
	                    
	            		groupInfos.push(groupInfo);
            		}
            	}
            	
            	rowValues.groupInfos = groupInfos;
              if (!allExpand) {
                 // rowValues.itemClasses.push(me.hdCollapsedCls);
                  rowValues.isCollapsedGroup = true;
                  rowValues.whichDepthCollased = whichDepthCollased;
              }
            }

            if (rowValues.isLastRow) {
                // Add the group's summary record to the last record in the group
                if (me.showSummaryRow) {
                	groupPath = me.getGroupPath(record,grouperLength - 1);
                    rowValues.summaryRecord = data.summaryData[groupPath];
                }
            }
        }
    },
    destroy: function(){
      var me = this, dataSource = me.dataSource;

      me.view = me.prunedHeader = me.grid = me.groupCache = me.dataSource = null;
      delete me.view;
      delete me.prunedHeader;
      delete me.grid;
      delete me.groupCache;
      delete me.dataSource;
      this.callParent();

      if (dataSource) {
        dataSource.bindStore(null);
      }
    }

});