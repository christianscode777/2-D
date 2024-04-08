document.addEventListener('DOMContentLoaded', function() {
  var startDrawingButton = document.getElementById('start-drawing-button');
  var landingPage = document.getElementById('landing-page');
  var drawingApp = document.getElementById('drawing-app');

  startDrawingButton.addEventListener('click', function() {
    landingPage.style.display = 'none';
    drawingApp.style.display = 'block';
    // Adding a short delay 
    setTimeout(function() {
      drawingApp.style.opacity = '1';
    }, 100);
  });
  // Set up Paper.js on the canvas element
  paper.setup('drawing-canvas');

  // Create a tool for drawing
  var tool = new paper.Tool();

  // Define the default color
  var currentColor = 'black';

  // Function to resize canvas
  function resizeCanvas(width, height) {
    var canvas = document.getElementById('drawing-canvas');
    canvas.width = width;
    canvas.height = height;
    paper.view.viewSize = new paper.Size(width, height);
  }

  // Function to handle mouse drag for resizing
  var isResizing = false;
  var startX, startY, startWidth, startHeight;
  var canvasContainer = document.getElementById('drawing-canvas-container');
  canvasContainer.addEventListener('mousedown', function(e) {
    if (e.target === canvasContainer) {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = canvasContainer.offsetWidth;
      startHeight = canvasContainer.offsetHeight;
    }
  });

  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    
    var newWidth = startWidth + (e.clientX - startX);
    var newHeight = startHeight + (e.clientY - startY);
    
    resizeCanvas(newWidth, newHeight);
  });

  document.addEventListener('mouseup', function() {
    isResizing = false;
  });

  // Attach click event listener to color buttons
  var colorButtons = document.querySelectorAll('.color-button');
  colorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      currentColor = button.getAttribute('data-color');

      // Add 'clicked' class to initiate the animation
      button.classList.add('clicked');

      // Remove the 'clicked' class after a short delay to allow the animation to complete
      setTimeout(function() {
        button.classList.remove('clicked');
      }, 200); // Adjust the delay as needed to match the transition duration
    });
  });

  // Define the function to be called when the mouse is clicked
  tool.onMouseDown = function(event) {
    // Create a new path every time the mouse is clicked
    var path = new paper.Path();
    path.strokeColor = currentColor;
    path.strokeWidth = 2;
    path.add(event.point);

    // Define the function to be called when the mouse is dragged
    tool.onMouseDrag = function(event) {
      path.add(event.point);
    };
  };

  // Define the function to be called when the mouse is released
  tool.onMouseUp = function(event) {
    // Nothing needs to be done when the mouse is released for this basic drawing app
  };

  // Function to save canvas as image
  function saveCanvasAsImage() {
    // Get the canvas element
    var canvas = document.getElementById('drawing-canvas');

    // Create an anchor element
    var link = document.createElement('a');

    // Set the anchor's download attribute to specify the filename
    link.download = 'drawing.png';

    // Convert canvas content to data URL
    var imgURL = canvas.toDataURL('image/png');

    // Set the href attribute of the anchor to the data URL
    link.href = imgURL;

    // Append the anchor to the document body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the anchor from the document body
    document.body.removeChild(link);
  }

  // Attach click event listener to a button for saving the canvas
  document.getElementById('save-button').addEventListener('click', saveCanvasAsImage);
});

