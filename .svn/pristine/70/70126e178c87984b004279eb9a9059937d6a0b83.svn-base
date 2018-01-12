/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.policy.canvas.SnapToEditPolicy
 * 
 * A helper used by Tools for snapping certain mouse interactions. 
 * 
 * 
 * @author Andreas Herz
 * 
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SnapToEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME : "draw2d.policy.canvas.SnapToEditPolicy",
    
    /**
     * @constructor 
     * Creates a new constraint policy for snap to grid
     * 
     */
    init: function( )
    {
        this._super();
    },


    /**
     * @method
     * Adjust the coordinates to the given constraint of the policy.
     * 
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the figure to adjust
     * @param {draw2d.geo.Point} clientPos
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    snap: function(canvas, figure, clientPos)
    {
        return clientPos;
    }
});