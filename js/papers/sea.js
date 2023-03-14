function sea()
{
  this.init();
}

sea.prototype =
{
  init: function()
  {
  },

  destroy: function()
  {
  },

  apply: function(stroke, paper)
  {
    if (stroke) 
    { // there is no paper effect of this paper, so we will just copy the strokes over
      context.clearRect(0, 0, screenWidth, screenHeight);  
      context.drawImage(strokeCanvas, 0, 0);
    }
    if (paper) 
    { // fill the paper with the blue color
        
      bgContext.fillStyle = 'rgb(0, 47, 167)';
      bgContext.fillRect(0, 0, screenWidth, screenHeight); 
      // Draw multiple white circles in the center of the canvas
      for(var o = 0; o < 10; o++){
        var x = Math.random() * screenWidth;
        var y = Math.random() * screenHeight;
        var radius = Math.random() * 50 + 10;
  
        bgContext.beginPath();
        bgContext.arc(x, y, radius, 0, 2*Math.PI);
        bgContext.lineWidth = 5;
        bgContext.strokeStyle = 'white';
        bgContext.stroke();
        
      }

    }
    
  }
};