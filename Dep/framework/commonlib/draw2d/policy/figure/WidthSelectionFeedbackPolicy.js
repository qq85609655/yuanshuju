/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.figure.WidthSelectionFeedbackPolicy
 * This selection shows only selection handles for the width. It is only possible to change the width
 * of an shaped. The height stays always the same or is recalculated by the figure itself. 
 *
 *     @example preview small frame
 *     
 *       
 *       // add some demo figure to the canvas
 *       //
 *       var shape =new draw2d.shape.basic.Rectangle({width:50, height:100, x:10, y:30});
 *       canvas.add(shape);
 *
 *       // At this point you can only change the width of the shape
 *       //
 *       shape.installEditPolicy(new draw2d.policy.figure.WidthSelectionFeedbackPolicy());
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.WidthSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.figure.BusSelectionFeedbackPolicy",
    
    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function(){
        this._super();
    },
    

    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     * 
     * @param {boolean} isPrimarySelection
     */
    onSelect: function(canvas, figure, isPrimarySelection){
        if (figure.selectionHandles.isEmpty()) {
            var r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4); // 4 = RIGHT_MIDDLE
            var r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8); // 8 = LEFT_MIDDLE

            r4.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy());
            r8.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy());
            figure.selectionHandles.add(r4);
            figure.selectionHandles.add(r8);

            r4.setDraggable(figure.isResizeable());
            r8.setDraggable(figure.isResizeable());
            
            r4.show(canvas);
            r8.show(canvas);
        }
        this.moved(canvas, figure);
   },
    
    
    /**
     * @method
     * Callback if the figure has been moved
     * 
     * @param figure
     * 
     * @template
     */
    moved: function(canvas, figure){
        if(figure.selectionHandles.isEmpty()){
            return; // silently
        }
        var r4= figure.selectionHandles.first(); 
        var r8= figure.selectionHandles.last(); 

        var objWidth    = figure.getWidth();
        
        var xPos = figure.getX();
        var yPos = figure.getY();
        r4.setDimension(r4.getWidth(), figure.getHeight());
        r8.setDimension(r8.getWidth(), figure.getHeight());
        r4.setPosition(xPos+objWidth     , yPos);
        r8.setPosition(xPos-r8.getWidth(), yPos);
     }
    
    
});
