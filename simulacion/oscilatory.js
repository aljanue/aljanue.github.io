var oscilationSketch = function( p ) {
    let v = 0.5;
    let d_pos;
    let pos, pos_ini;

    p.setup = function() {
      let canvas = p.createCanvas(600, 150);
      canvas.parent('oscilationCanvas');
      pos_ini = p.createVector();
      pos_ini.x = 0;
      pos_ini.y = p.height / 2;
      pos = pos_ini;

      d_pos = [];
    };

    p.draw = function() {
      p.background('#171717');

      pos.x += v;

      pos.y = p.height / 2 + 10 * (0.5 * p.sin(1 * pos.x) + 2 * p.sin(2.5 * pos.x));

      d_pos.push(p.createVector(pos.x, pos.y));

      p.stroke(255, 0, 0);
      p.fill(255, 200, 200);
      p.ellipse(pos.x, pos.y, 25, 25);

      p.noFill();
      p.stroke(255, 0, 0);
      p.beginShape();
      for (let i = 0; i < d_pos.length; i++) {
        p.vertex(d_pos[i].x, d_pos[i].y);
      }
      p.endShape();
    };
  };