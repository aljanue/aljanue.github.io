document.addEventListener('mouseover', function(e) {
    var body = document.body;
    if (window.getComputedStyle(e.target).cursor === 'pointer') {
        body.classList.add('cursor-big');
    } else {
        body.classList.remove('cursor-big');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Primero, selecciona todos los SVG de las flechas
    var flechas = document.querySelectorAll('.arrow svg');

    // Luego, para cada flecha...
    flechas.forEach(function(flecha) {
        // ...añade un escuchador de eventos de clic
        flecha.addEventListener('click', function() {
            // Encuentra el elemento padre más cercano con la clase "cards"
            var cardActual = this.closest('.cards');
            
            // Encuentra el siguiente elemento hermano con la clase "cards"
            var siguienteCard = cardActual ? cardActual.nextElementSibling : null;
            
            // Si existe un siguiente elemento "cards"...
            if (siguienteCard && siguienteCard.classList.contains('cards')) {
                // ...desplaza la página hasta ese elemento
                siguienteCard.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});