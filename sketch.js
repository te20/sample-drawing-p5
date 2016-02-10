/**
 * Sample drawing application using p5.js
 */

var origin = {x: 40, y:40};
var foregroundColor = 0;
var backgroundColor = 240;

var drawing = false;
var sliderRadius;

var tool = (function () {
  var radius = {'pen': 10, 'eraser': 70};
  var tool = 'pen';
  
  return {
    set: function (name) {
      radius[tool] = sliderRadius.value();
      tool = name;
      sliderRadius.value(radius[tool]);
    }
  }
})();

function setup() {
  var pen = createButton('鉛筆').size(30, 80).position(0, 40);
  pen.mousePressed(function() {
    tool.set('pen');
    stroke(foregroundColor);
  });

  var eraser = createButton("消しゴム").size(30, 80).position(0, 120);
  eraser.mousePressed(function() {
    tool.set('eraser');
    stroke(backgroundColor);
  });

  var radius_div = createDiv("太さ").position(40, 10);
  sliderRadius = createSlider(1, 100, 10);
  radius_div.child(sliderRadius);

  var cvs = createCanvas(windowWidth - origin.x - 10, windowHeight - origin.y - 10).position(origin.x, origin.y);

  background(backgroundColor);
  stroke(foregroundColor);
}

function draw() {
  // Do nothing in rendering loop
}

function drawStarted(x, y) {
  if ((x > origin.x && x < origin.x + width) && (y > origin.y && y < origin.y + height)) {
    drawing = true;
    strokeWeight(sliderRadius.value());
    point(x, y);

    return false;
  }
}

function drawLines(x0, y0, x1, y1) {
  if (drawing) {
    strokeWeight(sliderRadius.value());
    line(x0, y0, x1, y1);

    return false;
  }
}

function drawEnded() {
  drawing = false;
}

// mouse operation
function mousePressed() {
  return drawStarted(mouseX, mouseY);
}

function mouseDragged() {
  return drawLines(pmouseX, pmouseY, mouseX, mouseY);
}

function mouseReleased() {
  return drawEnded();
}

// touch panel operation
function touchStarted() {
  return drawStarted(touchX, touchY);
}

function touchMoved() {
  return drawLines(ptouchX, ptouchy, touchX, touchY);
}

function touchEnded() {
  return drawEnded();
}
