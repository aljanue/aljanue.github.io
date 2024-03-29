let web_opened=false;
let language;
let dom = 'https://aljanue.github.io';

// Crear un nuevo evento
var event = new Event('contentLoaded');

function Cargar(url, capa) {
    var contenido = document.getElementById(capa);
    var conexion = nuevaConexion();

    conexion.open("GET", url,true);
    conexion.onreadystatechange=function()
    { 
        if((conexion.readyState == 4) && (conexion.status == 200))
        {
            contenido.innerHTML = conexion.responseText;
            invokeScript(document.getElementById(capa));
            document.dispatchEvent(event);
        }
    } 
    conexion.send(null);
}


document.addEventListener('DOMContentLoaded', function() {
    var flechas = document.querySelectorAll('.arrow svg');

    flechas.forEach(function(flecha) {
        flecha.addEventListener('click', function() {

            var cardActual = this.closest('.cards');
            var siguienteCard = cardActual ? cardActual.nextElementSibling : null;


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
    
    if (language_aux !== null) {
        language = language_aux;
    }
    
    
    if(language == 'en' && (window.location.href == dom+'/index.html' || window.location.href == dom+'/')){
        window.location.href = dom+'/en/index.html';
    }
    else if(language == 'es' && window.location.href == dom+'/en/index.html'){
        window.location.href = dom+'/index.html';
    }
}

function changeLanguage(lang) {
    language = lang;
    localStorage.setItem('language', lang);
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

