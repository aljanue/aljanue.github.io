let particleSystemSketch = function(p) {
    let ps;
    let ellipsePosition;
    let isClicked = false;

    p.setup = function() {
        let canvas = p.createCanvas(1000, 300);
        canvas.parent('splashCanvas');
        ellipsePosition = p.createVector(p.width / 2, p.height / 3);
    };

    p.draw = function() {
        p.background('#171717');
        p.fill(255);
        p.ellipse(ellipsePosition.x, ellipsePosition.y, 30, 30); // Dibuja una elipse en el centro de la pantalla
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(28);
        p.text("Click me!", ellipsePosition.x, ellipsePosition.y - 50); // Añade texto encima de la elipse
        if (ps != null) {
            ps.run();
        }
    };

    p.mousePressed = function() {
        let d = p.dist(p.mouseX, p.mouseY, ellipsePosition.x, ellipsePosition.y);
        if (d < 15) { // Si el clic está dentro de la elipse
            ps = new ParticleSystem(p.createVector(p.mouseX, p.mouseY)); // Crea un nuevo sistema de partículas en la ubicación del clic
            ps.addParticle();
        }
    };

    class Particle {
        constructor(l) {
            this.acceleration = p.createVector(0, 3);
            this.velocity = p.createVector(p.random(-10, 10), p.random(-20, 10));
            this.position = l.copy();
            this.lifespan = 100.0;
            this.dt = 0.2;
        }

        run() {
            this.update();
            this.display();
        }

        // Method to update position
        update() {
            this.velocity.add(p5.Vector.mult(this.acceleration, this.dt));
            this.position.add(p5.Vector.mult(this.velocity, this.dt));
            this.lifespan -= 1.0;
        }

        // Method to display
        display() {
            p.stroke(255, this.lifespan);
            p.fill(255, this.lifespan);
            p.ellipse(this.position.x, this.position.y, 8, 8);
        }

        // Is the particle still useful?
        isDead() {
            return this.lifespan < 0.0;
        }
    }

    // A class to describe a group of Particles
    class ParticleSystem {
        constructor(position) {
            this.origin = position.copy();
            this.particles = [];
        }

        addParticle() {
            let numParticles = 100; // Número de partículas a añadir
            for (let i = 0; i < numParticles; i++) {
                this.particles.push(new Particle(this.origin));
            }
        }

        run() {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                let p = this.particles[i];
                p.run();
                if (p.isDead()) {
                    this.particles.splice(i, 1);
                }
            }
        }
    }
};

