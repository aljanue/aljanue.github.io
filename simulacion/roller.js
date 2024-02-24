var rollerCoasterSketch = function( p ) {
    let dt = 0.1, t = 0, acc1=0.8, acc2=1.3, acc3=-0.07, acc4=10, acc;
    let a, b, p_particle, c, d, e, vel1, vel2, vel3, vel4, vel;
    let endX;
    let initialConditionsSet = false;
    let initialPos;
    let initialVelocities = [];
    let initialAccelerations = [];

    p.setup = function() {
        let canvas = p.createCanvas(640, 300);
        canvas.parent('rollerCoasterCanvas');

        let px_init = 0.3 * p.width / 2;
        let py_init = p.height / 2;
        let px_end = 0.6 * p.width / 2;
        let py_end = 0.8 * p.height / 2;
        let px_end_2 = p.width / 2;
        let py_end_2 = p.height / 2;
        let px_end_3 = 1.3 * p.width / 2;
        let py_end_3 = 0.5 * p.height / 2;
        let px_end_4 = 1.6 * p.width / 2;
        let py_end_4 = 1.5 * p.height / 2;

        a = p.createVector(px_init, py_init); // Punto 1
        b = p.createVector(px_end, py_end); // Punto 2
        c = p.createVector(px_end_2, py_end_2); // Punto 3
        d = p.createVector(px_end_3, py_end_3); // Punto 4
        e = p.createVector(px_end_4, py_end_4); // Punto 5
        p_particle = p.createVector(px_init, py_init); // Particula

        // Obtenemos vector entre puntos
        vel1 = p5.Vector.sub(b, a); // Resta de vectores (Restamos los puntos para obtener el vector que los une)
        vel2 = p5.Vector.sub(c, b);
        vel3 = p5.Vector.sub(d, c);
        vel4 = p5.Vector.sub(e, d);

        // Normalizamos (obtenemos direccion a 1 pixel/segundo)
        vel1.normalize();
        vel2.normalize();
        vel3.normalize();
        vel4.normalize();

        // Aumentamos la velocidad
        vel1.mult(5);
        vel2.mult(20);
        vel3.mult(6);
        vel4.mult(35);

        // Determinar la posición x final
        endX = e.x;

        // Almacenar condiciones iniciales
        initialPos = p_particle.copy();
        initialVelocities = [vel1.copy(), vel2.copy(), vel3.copy(), vel4.copy()];
        initialAccelerations = [acc1, acc2, acc3, acc4];
        initialConditionsSet = true;
    };

    p.draw = function() { 
        p.background('#171717'); // Color de fondo (sirve para borrar lo que hay dibujado)

        p.stroke(255);
        p.line(a.x, a.y, b.x, b.y);
        p.line(b.x, b.y, c.x, c.y);
        p.line(c.x, c.y, d.x, d.y);
        p.line(d.x, d.y, e.x, e.y);

        p.fill(0);
        p.ellipse(p_particle.x, p_particle.y, 10, 10);

        p.stroke(255, 0, 0); // Color del contorno del circulo
        p.fill(255, 150, 150); // Color del circulo
        p.ellipse(a.x, a.y, 20, 20); // Creamos un circulo

        p.stroke(0, 0, 255); // Color del contorno del circulo
        p.fill(150, 150, 255); // Color del circulo
        p.ellipse(b.x, b.y, 20, 20);

        p.stroke(0, 255, 0); // Color del contorno del circulo
        p.fill(150, 255, 150); // Color del circulo
        p.ellipse(c.x, c.y, 20, 20);

        p.stroke(163, 73, 164); // Color del contorno del circulo
        p.fill(204, 169, 221); // Color del circulo
        p.ellipse(d.x, d.y, 20, 20);

        p.stroke(79, 49, 37); // Color del contorno del circulo
        p.fill(226, 196, 172); // Color del circulo
        p.ellipse(e.x, e.y, 20, 20);

        // Verificar si la bola ha llegado al final
        if (p_particle.x >= endX) {
            // Si llega al final, reiniciar la posición de la bola y las condiciones iniciales
            if (initialConditionsSet) {
                p_particle.set(initialPos);
                vel1.set(initialVelocities[0]);
                vel2.set(initialVelocities[1]);
                vel3.set(initialVelocities[2]);
                vel4.set(initialVelocities[3]);
                acc1 = initialAccelerations[0];
                acc2 = initialAccelerations[1];
                acc3 = initialAccelerations[2];
                acc4 = initialAccelerations[3];
                t = 0;
            }
        }

        t += dt;
        // Actualizamos la velocidad y la posición usando aceleración en función del tramo en el que nos encontramos
        if(p_particle.x < b.x){
            vel = vel1;
            acc = acc1;
        } else if(p_particle.x < c.x){
            vel = vel2;
            acc = acc2;
        } else if(p_particle.x < d.x){
            vel = vel3;
            acc = acc3;
        } else if(p_particle.x < e.x){
            vel = vel4;
            acc = acc4;
        } else {
            vel = p.createVector(0, 0);
            acc = 0;
        }

        let v_copy = vel.copy();
        v_copy.normalize();
        let a_t = acc*dt;
        vel.add(p5.Vector.mult(v_copy, a_t));
        p_particle.add(p5.Vector.mult(vel, dt));
    };
};