/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.layout.locator.BottomLocator
 * 
 * A bottomLocator is used to place figures at the bottom of a parent shape.
 *
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var circle = new draw2d.shape.basic.Circle({
 *         x:100,
 *         y:50,
 *         diameter:120,
 *         stroke: 3,
 *         color:"#A63343",
 *         bgColor:"#E65159"
 *     });
 *     
 *     circle.add(new draw2d.shape.basic.Label({text:"Bottom Label"}), new draw2d.layout.locator.BottomLocator());    
 *     canvas.add( circle);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.BottomLocator= draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.BottomLocator",
    
    /**
     * @constructor
     * 
     * 
     */
    init: function()
    {
      this._super();
    },
    
    
    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate:function(index, target)
    {
       var parent = target.getParent();
       var boundingBox = parent.getBoundingBox();
    
       var targetBoundingBox = target.getBoundingBox();
       if(target instanceof draw2d.Port){
           target.setPosition(boundingBox.w/2,boundingBox.h);
       }
       else{
           target.setPosition(boundingBox.w/2-targetBoundingBox.w/2,2+boundingBox.h);
       }
    }
});
