var bubbleSketch = function( p ) {
    let dt = 0.1, r = 150, c_r, c_g, c_b;
    let pos_ini, p_particle, dir;
    let shotFired = false;

    p.setup = function() {
      let canvas = p.createCanvas(600, 300);
      canvas.parent('bubbleCanvas');
      pos_ini = p.createVector(p.width / 2, p.height);
      dir = p.createVector();
      p_particle = p.createVector();
    };

    p.draw = function() {
      p.background('#171717');

      p.stroke(255);
      p.fill('#171717');
      p.circle(pos_ini.x, pos_ini.y, r / 2);

      p.line(pos_ini.x, pos_ini.y, p.mouseX, p.mouseY);
      p.fill(c_r, c_g, c_b);
      p.stroke(255);

      if (shotFired) {
        p_particle.add(p5.Vector.mult(dir, dt));
        p.circle(p_particle.x, p_particle.y, 25);

        if (p_particle.y < 0 || p_particle.x < 0 || p_particle.x > p.width) {
          shotFired = false;
          p_particle.set(pos_ini);
        }
      }
    };

    p.mousePressed = function() {
      if (!shotFired) {
        c_r=p.random(150, 255);
        c_g=p.random(150, 255);
        c_b=p.random(150, 255);
        p_particle.set(pos_ini);
        dir = p5.Vector.sub(p.createVector(p.mouseX, p.mouseY), pos_ini).normalize().mult(45);
        shotFired = true;
      }
    };
  };