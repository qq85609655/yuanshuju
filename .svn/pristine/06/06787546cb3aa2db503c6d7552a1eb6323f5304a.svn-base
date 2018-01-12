/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.layout.Layout
 * 
 * A base class for positioning child figures and determining the ideal size for 
 * a figure with children. 
 * 
 *     
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.layout.Layout= draw2d.shape.basic.Rectangle.extend({

	NAME : "draw2d.shape.layout.Layout",

    /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter )
    {
        this._super($.extend({bgColor:null, radius:0, stroke:0},attr), setter, getter);
         
        var _this = this;
        this.resizeListener = function(figure)
        {
            // propagate the event to the parent or other listener if existing
            //
            if(_this.getParent() instanceof draw2d.shape.layout.Layout){
                _this.fireEvent("resize");
            }
            // or we are the parent and must consume it self
            else {
                _this.setDimension(1,1);
            }
        };
        
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    
    /**
     * @inheritdoc
     */
    add : function(child, locator, index)
    {
       var r=this._super(child, locator, index);
       child.on("resize",this.resizeListener);
       child.on("change:visibility",this.resizeListener);
       this.setDimension(1,1);
      
       return r;
    },

    /**
     * @inheritdoc
     */
    remove : function(child)
    {
       var r= this._super(child);
       child.off(this.resizeListener);
       this.setDimension(1,1);
       
       return r;
    },


    /**
     * @inheritdoc
     */
    setRotationAngle: function(angle)
    {
    	// ignore them for the layout elements
        // Layout's can't rotate
    }
    
});



