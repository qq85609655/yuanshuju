/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.layout.VerticalLayout
 * The VerticalLayout class arranges the layout elements in a vertical sequence, 
 * left to right, with optional gaps between the elements. 
 * 
 * During the execution of the setDimension() method, the minimum height of the container is calculated 
 * by accumulating the minimum sizes of the elements, including stroke, gaps and padding. 
 *     
 * See the example below with and without gap and border settings
 * 
 *     
 *     @example preview small frame
 *     
 *     // first container without any gap and a border of the parent
 *     // container
 *     var label1 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     var label2 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     var label3 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *     
 *     var container1 = new draw2d.shape.layout.VerticalLayout();
 *     
 *     container1.add(label1);
 *     container1.add(label2);
 *     container1.add(label3);
 *     container1.setGap(10);
 *     container1.setStroke(2);
 *     canvas.add(container1,50,10);
 *     
 *     // second container without any gab or border
 *     //
 *     var label11 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     var label12 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     var label13 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *     
 *     var container2 = new draw2d.shape.layout.VerticalLayout();
 *     
 *     container2.add(label11);
 *     container2.add(label12);
 *     container2.add(label13);
 *     
 *     canvas.add(container2,150,10);
 *     
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 */
draw2d.shape.layout.VerticalLayout= draw2d.shape.layout.Layout.extend({

	NAME : "draw2d.shape.layout.VerticalLayout",

    /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        // some layout parameter
        //
        this.gap = 0;

        // "this" shortcut to avoid $.proxy
        var _this = this;
        
        this.locator = {
            translate: function(figure, diff){
                figure.setPosition(figure.x+diff.x,figure.y+diff.y);
            },
            relocate:function(index, target)
            {
                var stroke = _this.getStroke();
                var yPos =stroke; // respect the border of the shape
                
                for (var i=0;i<index;i++){
                    var child = _this.children.get(i).figure;
                    if(child.isVisible())
                    	yPos=yPos+child.getHeight()+_this.gap;
                }
                
                target.setPosition(stroke,yPos);
             }
        };
        
        this._super(
                $.extend({width:10, height:10},attr),
                $.extend({
                    /** @attr {Number} gap the gap between the children shapes */
                    gap : this.setGap
                },setter),
                $.extend({
                    gap: this.getGap
                },getter));

    },
    
    /**
     * @inheritdoc
     */
    add : function(child, locator, index)
    {
    	// ignore the parameter "locator" and use the locator for the vertical layout instead
    	
       return this._super(child, this.locator, index);
    },


    /**
     * @method
     * Set the gap width between child components within this layout. 
     * This will only affect the space between components, not the space around all the components in the layout.
     * 
     * @param {Number} gap The space, in pixels, between items.
     */
    setGap: function(gap)
    {
        this.gap = gap;
        // this forces a relayout of the element
        this.setDimension(1,1);
    },
    
    /**
     * @inheritdoc
     */
    getMinWidth:function()
    {
        var width=10;
        this.children.each(function(i,e){
        	if(e.figure.isVisible())
        		width = Math.max(width, e.figure.isResizeable()? e.figure.getMinWidth(): e.figure.getWidth());
        });
        return width+(this.stroke*2);
    },
    
    /**
     * @inheritdoc
     */
    getMinHeight:function()
    {
    	var gap = 0;
        var height=2*this.stroke;
        this.children.each(function(i,e){
        	if(e.figure.isVisible()){
        		height += ((e.figure.isResizeable()?e.figure.getMinHeight():e.figure.getHeight())+gap);
        		// first element is iterated. Now we must add the gap to all next elements
        		gap = this.gap;
        	}
        }.bind(this));
        
        return height;
    },
    
    /**
     * @inheritdoc
     */
    setDimension:function( w, h)
    {
        this._super(w,h);

        var width=this.width-(2*this.stroke);
        this.children.each(function(i,e){
            if(e.figure.isResizeable() && e.figure.isVisible()){
                e.figure.setDimension(width,e.figure.getHeight());
            }
        });
    }
   

});



