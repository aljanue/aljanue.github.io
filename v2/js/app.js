document.addEventListener('mouseover', function(e) {
    var body = document.body;
    if (window.getComputedStyle(e.target).cursor === 'pointer') {
        body.classList.add('cursor-big');
    } else {
        body.classList.remove('cursor-big');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var flechas = document.querySelectorAll('.arrow svg');

    flechas.forEach(function(flecha) {
        flecha.addEventListener('click', function() {
            console.log('Evento de clic disparado'); // Verifica que el evento de clic se está disparando

            var cardActual = this.closest('.cards');
            var siguienteCard = cardActual ? cardActual.nextElementSibling : null;

            console.log('Siguiente card:', siguienteCard); // Verifica el valor de siguienteCard

            if (siguienteCard && siguienteCard.classList.contains('cards')) {
                siguienteCard.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});