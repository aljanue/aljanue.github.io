

let language;
let dom = 'aljanue.github.io';




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

function chargeLanguage() {
    var language_aux = localStorage.getItem('language');
    console.log('Valor de language_aux:', language_aux); // Imprime el valor de language_aux
    
    if (language_aux !== null) {
        language = language_aux;
    }
    
    console.log('Valor de language:', language); // Imprime el valor de language
    console.log('Valor de window.location.href:', window.location.href); // Imprime el valor de window.location.href
    
    if(language == 'en' && window.location.href == dom+'/index.html'){
        console.log('Redirigiendo a ./en/index.html'); // Imprime un mensaje antes de redirigir
        window.location.href = dom+'/en/index.html';
    }
    else if(language == 'es' && window.location.href == dom+'/en/index.html'){
        console.log('Redirigiendo a ./index.html'); // Imprime un mensaje antes de redirigir
        window.location.href = dom+'/index.html';
    }
}

function changeLanguage(lang) {
    language = lang;
    localStorage.setItem('language', lang);
    console.log('Idioma cambiado a:', lang); // Imprime un mensaje cuando el idioma cambia
}

function invokeScript(divid)
{
	var scriptObj = divid.getElementsByTagName("SCRIPT");
	var len = scriptObj.length;

	for(var i=0; i<len; i++)
	{
		var scriptText = scriptObj[i].text;
		var scriptFile = scriptObj[i].src
		var scriptTag = document.createElement("SCRIPT");
		
		if ((scriptFile != null) && (scriptFile != "")){
			scriptTag.src = scriptFile;
		}
		scriptTag.text = scriptText;
		if (!document.getElementsByTagName("HEAD")[0]) {
			document.createElement("HEAD").appendChild(scriptTag)
		}
		else {
			document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
		}
	}
}

function nuevaConexion()
{
	var xmlhttp=false;

	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e)
	{
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E)
		{ 
			xmlhttp = false;
		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined')
	{ 
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp; 
}

function Cargar(url, capa)
{
	var contenido = document.getElementById(capa);
	var conexion = nuevaConexion();

	conexion.open("GET", url,true);
	conexion.onreadystatechange=function()
	{ 
		if((conexion.readyState == 4) && (conexion.status == 200))
		{
			contenido.innerHTML = conexion.responseText;
			invokeScript(document.getElementById(capa));
		}
	} 
	conexion.send(null);
} 