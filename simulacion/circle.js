var circleSketch = function( p ) {
    let r = 300;
    let p_circle;

    p.setup = function() {
      let canvas = p.createCanvas(350, 350);
      canvas.parent('circleCanvas');
      let x_0 = p.width / 2;
      let y_0 = p.height / 2;
      p_circle = p.createVector(x_0, y_0);
    };

    p.draw = function() {
      p.background('#171717');
      p.stroke(255);
      p.fill('#171717');
      p.circle(p_circle.x, p_circle.y, r);
      let pos = p.createVector(r, r);

      pos.x = p_circle.x + r / 2 * p.cos(2 * p.PI * 1 * p.millis() / 1000);
      pos.y = p_circle.y + r / 2 * p.sin(2 * p.PI * 1 * p.millis() / 1000);

      p.stroke(255, 0, 0);
      p.fill(255, 200, 200);
      p.circle(pos.x, pos.y, 30);
    };
  };