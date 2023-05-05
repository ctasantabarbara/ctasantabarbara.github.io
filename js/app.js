var hoy = new Date();

// test
// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 12000);    
}

// para cambiar de tab de mail-whatsapp-telefono
function openContacto(medio) {
  var i;
  var x = document.getElementsByClassName("contacto");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(medio).style.display = "block";  
}


// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// fin test


	// hacer global la peticion ajax en variable myData
	// myData es un array de objetos.
	var url = 'https://josemamira.github.io/post/posts.json';

    var myData = getSomething();

    function getSomething(){
        var result = null;
        $.ajax({
            async: false,
            url: url,
            data: {},
            dataType: "json",
            success: function(data){
                result = data.posts;
            }
        });
        return result;
    }
    
    // Decomentar para test
    //console.log(myData);
    
    // load links.json
	var url2 = 'https://josemamira.github.io/post/links.json';
    var myLinks = getSomething2();

    function getSomething2(){
        var result2 = null;
        $.ajax({
            async: false,
            url: url2,
            data: {},
            dataType: "json",
            success: function(data){
                result2 = data.links;
            }
        });
        return result2;
    }    
    //console.log(myLinks);
    
    
    

// vaciamos la lista de post
document.getElementById("popularPosts").style.display = "none";
// listado temas
const themeArr = ["Programación", "Deportes", "Variado","Música", "SIG","Cartografía", "Otros"];
const authorArr = ["Jos&eacute; Manuel Mira", "Inmaculada Belmonte", "Paula Pira","Rubén Lira", "Sancho Panza","Alonso Quijano", "Javier Cercas"];	

// Analizar la URL para obtener enlace a un artículo
//comprueba si hay una url con el codigo del tipo http://localhost/index.html?id=3
var laURL = window.location.href;
var patron = /id=/i;
var res = laURL.match(patron);
if (res == "id=") {
	var id_art = window.location.href.split( '?id=' )[1];
	//alert('con id');
	loadPost(id_art);
	//lastPost();
	
} else {
	//alert('sin id');
	lastPost();
	
}	
makePagination();




function makePagination() {
	    //var divisor = 5;

		//console.log(myData);
		const numPost = myData.length;
		if (numPost <= 50) { var divisor = 5; } 
		else if (numPost > 50 && numPost <=100) { var divisor = 10; } 
		else if (numPost > 100 && numPost <=200) { var divisor = 20; } 
		else if (numPost > 200 && numPost <=500) { var divisor = 50; } 
		else if (numPost > 500 && numPost <=1000) { var divisor = 100; }
		else { var divisor = 100; }	
		//console.log("nº: "+ numPost);
		const numBot =numPost / divisor; // nº botones
		//console.log(numBot);
		const resto = numPost % divisor; //console.log('resto es ' + resto);		
		var bFin='';
		var paginador='';
		var paginas = '';
		var filtrado =[];
		
		if (numPost <= divisor) {
			//console.log('hay menos o igual a divisor (5)');
			
			for (var i = 1; i <= numPost; i++) {				
				paginas += '<button class="w3-button w3-light-grey w3-border w3-hover-red" onclick="onePost('+i+'); jump(\'marcador\')">'+i+'</button>';												
			}
			paginador = '<div class="pagination">'+paginas+'</div>';
			
			
		}
		else {
			//console.log('hay más de divisor(5). Paginar');
			var bFin=''; 
			if (resto == 0) {
				//console.log('justo');
				bFin=''; 
			} else {
				//console.log('sobran:  '+ resto);
				numIni =  Math.floor(numBot)*divisor;
				numFin = numIni + resto;
				const filtrado = myData.filter(post => post.id >= numIni ).filter(post => post.id <= numFin );
				bFin = '<button class="w3-button w3-light-grey w3-border w3-hover-red" onClick="listadoBoton('+numIni+','+numFin+')" >'+numIni+'-'+numFin+'</button>'; 

			}
			
			var paginas = '';
			for (var i = 1; i <= numBot; i++) {
				numIni = ((divisor*i)-divisor)+1;
				numFin = divisor * i;
				
				// para cada boton pasamos una función con su inicio y fin
				// filtramos el array para quedarnos con inicio y fin
				filtrado = myData.filter(post => post.id >= numIni ).filter(post => post.id <= numFin );
				paginas += '<button class="w3-button w3-light-grey w3-border w3-hover-red" onclick="listadoBoton('+numIni+','+numFin+')" >'+numIni+'-'+numFin+'</button>';	
			}				
			paginador = '<div class="pagination">'+paginas+bFin+'</div>';	
		}
		
		//console.log(paginador);
		$('#paginador').append(paginador);
		

		
}




// Vacia y rellena popularPosts
function listadoBoton(inicio,fin) {
	//console.log(' funcion listadoBoton ');
	//alert("The pagina begin with " + inicio + ", and end with "+ fin);
	//console.log( myData );
	var filtrado=[];
	$( "#popularPosts" ).empty();

	let txt = '<div class="w3-card-4 w3-margin w3-white">'+
		'<div class="w3-container w3-padding">'+
		  '<h4>Popular Posts del '+inicio+' al '+fin+'.</h4>'+
		'</div>'+
		'<ul class="w3-ul w3-hoverable w3-white">';
	filtrado = myData.filter(post => post.id >= inicio ).filter(post => post.id <= fin );
	filtrado.forEach(myFunction);

	function myFunction(obj, index, array) {
	  //txt += obj.titulo + '<br>';
	  txt += '<li class="w3-padding-16" onclick="onePost('+obj.id+'); jump(\'marcador\')">'+
				  '<img src="img/theme/min/'+obj.tema+'.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">'+
				  '<span class="w3-badge w3-green">'+obj.id+'</span>&nbsp;&nbsp;<span class="w3-large">'+obj.titulo+'</span><br>'+
				  '<span>  Tema: '+themeArr[obj.tema]+ '  Fecha: '+obj.fecha_publicacion+'</span>'+
			  '</li>';
	}
	//console.log(txt+'</ul></div><hr>');
	$('#popularPosts').append(txt);
	document.getElementById('popularPosts').style.display='block';
	

}
	
/*	function loadPost(id) {	
		//id = 1;	
		var url = 'https://josemamira.github.io/post/posts.json';
		$( "#divUnPost" ).empty();
		$.getJSON(url, function(data) {
			//console.log(data);
			// obtener nº de posts (length)
			const numPost = Object.keys(data.posts).length;
			console.log(numPost);
			const obj = data.posts[id-1];
			//const str = JSON.stringify(data);
			//console.log(obj); 
			//console.log(obj.titulo); 
			//console.log(obj.tema);
						
			var divBlog = '';
			divBlog += '<div class="w3-card-4 w3-margin w3-white">'+
					'<img src="img/theme/'+obj.tema+'.jpg" alt="Theme" style="width:100%">'+
					'<div class="w3-container">'+
						'<h3><b>'+obj.titulo+'</b></h3>'+
						'<h5>THEME: <span class="w3-opacity">'+themeArr[obj.tema]+', </span>, DATE <span class="w3-opacity">'+obj.fecha_articulo+'</span>, AUTHOR: <span class="w3-opacity">'+authorArr[obj.autor]+'</span></h5>'+
					'</div>	'+
					'<div class="w3-container">'+
						'<p>'+obj.texto_corto+'</p>'+
						'<div class="w3-row">'+						
						
						   '<div class="w3-col m8 s12">'+
							  '<p><button class="w3-button w3-padding-large w3-white w3-border" onclick="document.getElementById(\'expandText'+id+'\').style.display=\'block\'"><b>LEER M&Aacute;S &raquo;</b></button></p>'+
							'</div>'+
							'<div id="expandText'+id+'" class="w3-panel w3-display-container" style="display: none;">'+
								'<span onclick="this.parentElement.style.display=\'none\'"  class="w3-button w3-red w3-display-topright">x</span>'+
								 obj.texto_largo +
							'</div>'+	
												
						'</div>'+
					'</div>'+
				'</div>';

			$('#divBlogUltimo').append(divBlog);
			document.getElementById('divUnPost').style.display='block';
		});
	}

*/

	function loadPost(id) {	
		//id = 1;	
		var url = 'https://josemamira.github.io/post/posts.json';
		$('#divBlogUltimo').empty();
		$.getJSON(url, function(data) {
			console.log(data);
			// obtener nº de posts (length)
			const numPost = Object.keys(data.posts).length;
			console.log(numPost);
			const obj = data.posts[id-1];					
			var divBlog = '';			
			divBlog += '<div class="w3-card-4 w3-margin w3-white">'+
					'<img src="img/theme/'+obj.tema+'.jpg" alt="Theme" style="width:100%">'+
					'<div class="w3-container">'+
						'<h3><b>'+obj.titulo+'</b></h3>'+
				
							'<p class="w3-center">'+
							   '<span style="color: Dodgerblue;">'+
									'<a href="http://www.facebook.com/sharer.php?u='+encodeURIComponent('https://josemamira.github.io.es/index.html?id='+id)+'" target="_blank">'+
										'<i class="fa fa-facebook-official fa-2x w3-hover-opacity"></i></a></span>'+
								'<span style="color: green;">'+
									'<a href="https://wa.me/34601218853/?text='+encodeURIComponent(obj.titulo)+'" target="_blank">'+
										'<i class="fa fa-whatsapp fa-2x w3-hover-opacity"></i></a></span>'+
								'<span style="color: Dodgerblue;">'+
									'<a href="https://twitter.com/intent/tweet?text='+encodeURIComponent(obj.titulo)+'&url='+encodeURIComponent('https://josemamira.github.io.es/index.html?id='+id)+'&via=j3m&hashtags=geomatica,sig" target="_blank">'+
										'<i class="fa fa-twitter fa-2x w3-hover-opacity"></i></a></span>'+
							'</p>'+					
				
						'<h5>TEM&Aacute;TICA: '+themeArr[obj.tema]+', <span class="w3-opacity">DATE '+obj.fecha_articulo+'</span></h5>'+
					'</div>	'+
									
					'<div class="w3-container">'+
						'<p>'+obj.texto_corto+'</p>'+
						'<div class="w3-row">'+						
						
						   '<div class="w3-col m8 s12">'+
							  '<p><button class="w3-button w3-padding-large w3-white w3-border" onclick="document.getElementById(\'expandText'+id+'\').style.display=\'block\'"><b>LEER M&Aacute;S &raquo;</b></button></p>'+
							'</div>'+
							'<div id="expandText'+id+'" class="w3-panel w3-display-container" style="display: none;">'+
								'<span onclick="this.parentElement.style.display=\'none\'"  class="w3-button w3-red w3-display-topright">x</span>'+
								 obj.texto_largo +
							'</div>'+	
												
						'</div>'+
					'</div>'+
				'</div>';

			$('#divBlogUltimo').append(divBlog);
			document.getElementById('divBlogUltimo').style.display='block';
		});
	}	
	
	function loadLinks() {	
		$( '#links' ).empty();
			var txt = '';
			myLinks.forEach(myFunction);

			function myFunction(obj, index, array) {
				  txt += '<li class="w3-padding-16">'+
						'<img src="img/links/'+obj.logo+'" alt="Image" class="w3-left w3-margin-right" style="width:50px">'+
						'<span class="w3-large">'+obj.nombre+'</span><br>'+
						'<span><a href="'+obj.web+'" target="_blank">'+obj.web+'</a></span>'+
					'</li>'; 
			}
				
			$('#links').append(txt);
			document.getElementById('links').style.display='block';
	}
	loadLinks();

	function loadNextEvents() {	
		$( '#nextEvents' ).empty();
		const timeElapsed = Date.now();
		const hoy = new Date(timeElapsed).toISOString();
		let req = new XMLHttpRequest();
		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
			console.log(req.responseText);
			obj = JSON.parse(req.responseText);			
			//console.log(obj.record.eventos[0].title);
			//document.getElementById("demo").innerHTML = obj.record.eventos[0].title;
			evArr = obj.record.events;
			console.log(evArr);
			for (var key in evArr) {
				console.log(evArr[key]);
				console.log(evArr[key]['title']);
				$("#lista").append("<li>"+evArr[key]['title']+"</li>");
			}
			
			// filtrar por fecha
			const miFiltro = evArr.filter(unEv => {
				return unEv.start > hoy; //"2023-01-16T16:00:00";
			});
			console.log(miFiltro);
			for (var key in miFiltro) {
				//console.log(miFiltro[key]);
				//console.log(miFiltro[key]['title']);
				const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
				var miFecha =  new Date(miFiltro[key]['start']);
				miFecha = miFecha.getDate() + ' ' + monthNames[miFecha.getMonth()] +' de '+ miFecha.getFullYear();
				$('#nextEvents').append(
					      '<li class="w3-padding-16">'+
							'<img src="img/calendar_icon.png" alt="Image" class="w3-left w3-margin-right" style="width:50px">'+
							'<span class="w3-large"><a href="'+miFiltro[key]['url']+'">'+miFiltro[key]['title']+'</a></span><br>'+
							'<span>'+ miFecha +'</span>'+
						  '</li>'
				);
				document.getElementById('nextEvents').style.display='block';
			}	
		  }
		};
		req.open("GET", "https://api.jsonbin.io/v3/b/63dbecb5ebd26539d073eabb ", true);
		req.setRequestHeader("X-Master-Key", "$2b$10$NbcBbge09sMN8yjVPsaDhujUZHGFMQWJNxA.iwAaFP0sbjw6qu.MC");
		req.send();		
		
			/*var txt = '';
			myLinks.forEach(myFunction);

			function myFunction(obj, index, array) {
				  txt += '<li class="w3-padding-16">'+
						'<img src="img/links/'+obj.logo+'" alt="Image" class="w3-left w3-margin-right" style="width:50px">'+
						'<span class="w3-large">'+obj.nombre+'</span><br>'+
						'<span><a href="'+obj.web+'" target="_blank">'+obj.web+'</a></span>'+
					'</li>'; 
			}
				
			$('#nextEvents').append(txt);
			document.getElementById('nextEvents').style.display='block';*/
	}
	loadNextEvents();



	function lastPost() {	
			const numPost = myData.length;
			const obj = myData[numPost-1];
			id = numPost-1;		
			var divBlog = '';
			divBlog += '<div class="w3-card-4 w3-margin w3-white">'+
					'<img src="img/theme/'+obj.tema+'.jpg" alt="Theme" style="width:100%">'+
					'<div class="w3-container">'+
						'<h3><b>'+obj.titulo+'</b></h3>'+
				
							'<p class="w3-center">'+
							   '<span style="color: Dodgerblue;">'+
									'<a href="http://www.facebook.com/sharer.php?u='+encodeURIComponent('https://josemamira.github.io.es/index.html?id='+id)+'" target="_blank">'+
										'<i class="fa fa-facebook-official fa-2x w3-hover-opacity"></i></a></span>'+
								'<span style="color: green;">'+
									'<a href="https://wa.me/34601218853/?text='+encodeURIComponent(obj.titulo)+'" target="_blank">'+
										'<i class="fa fa-whatsapp fa-2x w3-hover-opacity"></i></a></span>'+
								'<span style="color: Dodgerblue;">'+
									'<a href="https://twitter.com/intent/tweet?text='+encodeURIComponent(obj.titulo)+'&url='+encodeURIComponent('https://josemamira.github.io.es/index.html?id='+id)+'&via=j3m&hashtags=geomatica,sig" target="_blank">'+
										'<i class="fa fa-twitter fa-2x w3-hover-opacity"></i></a></span>'+
							'</p>'+	
				
						'<h5>THEME: <span class="w3-opacity">'+themeArr[obj.tema]+', </span>, DATE <span class="w3-opacity">'+obj.fecha_articulo+'</span>, AUTHOR: <span class="w3-opacity">'+authorArr[obj.autor]+'</span></h5>'+
					'</div>	'+
				
					'<div class="w3-container">'+
						'<p>'+obj.texto_corto+'</p>'+
						'<div class="w3-row">'+
						   '<div class="w3-col m8 s12">'+
							  '<p><button class="w3-button w3-padding-large w3-white w3-border" onclick="document.getElementById(\'expandText'+id+'\').style.display=\'block\'"><b>LEER M&Aacute;S &raquo;</b></button></p>'+
							'</div>'+
							'<div id="expandText'+id+'" class="w3-panel w3-display-container" style="display: none;">'+
								'<span onclick="this.parentElement.style.display=\'none\'"  class="w3-button w3-red w3-display-topright">x</span>'+
								 obj.texto_largo +
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('#divBlogUltimo').append(divBlog);
			document.getElementById('divBlogUltimo').style.display='block';
		
	}
	
	function onePost(id) {
		    //console.log('onePost: ' + id);
			$('#divBlogUltimo').empty();
			const numPost = myData.length;
			const obj = myData[id-1];					
			var divBlog = '';
			divBlog += '<div class="w3-card-4 w3-margin w3-white">'+
					'<img src="img/theme/'+obj.tema+'.jpg" alt="Theme" style="width:100%">'+
					'<div class="w3-container">'+
						'<h3><b>'+obj.titulo+'</b></h3>'+
				
							'<p class="w3-center">'+
							   '<span style="color: Dodgerblue;">'+
									'<a href="http://www.facebook.com/sharer.php?u='+encodeURIComponent('https://josemamira.github.io.es/index.html?id='+id)+'" target="_blank">'+
										'<i class="fa fa-facebook-official fa-2x w3-hover-opacity"></i></a></span>'+
								'<span style="color: green;">'+
									'<a href="https://wa.me/34601218853/?text='+encodeURIComponent(obj.titulo)+'" target="_blank">'+
										'<i class="fa fa-whatsapp fa-2x w3-hover-opacity"></i></a></span>'+
								'<span style="color: Dodgerblue;">'+
									'<a href="https://twitter.com/intent/tweet?text='+encodeURIComponent(obj.titulo)+'&url='+encodeURIComponent('https://josemamira.github.io.es/index.html?id='+id)+'&via=j3m&hashtags=geomatica,sig" target="_blank">'+
										'<i class="fa fa-twitter fa-2x w3-hover-opacity"></i></a></span>'+
							'</p>'+					
				
						'<h5>TEM&Aacute;TICA: '+themeArr[obj.tema]+', <span class="w3-opacity">DATE '+obj.fecha_articulo+'</span></h5>'+
					'</div>	'+		
				
					'<div class="w3-container">'+
						'<p>'+obj.texto_corto+'</p>'+
						'<div class="w3-row">'+
						   '<div class="w3-col m8 s12">'+
							  '<p><button class="w3-button w3-padding-large w3-white w3-border" onclick="document.getElementById(\'expandText'+id+'\').style.display=\'block\'"><b>LEER M&Aacute;S &raquo;</b></button></p>'+
							'</div>'+
							'<div id="expandText'+id+'" class="w3-panel w3-display-container" style="display: none;">'+
								'<span onclick="this.parentElement.style.display=\'none\'"  class="w3-button w3-red w3-display-topright">x</span>'+
								 obj.texto_largo +
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('#divBlogUltimo').append(divBlog);
			document.getElementById('divBlogUltimo').style.display='block';
		
	}	
	// obtiene un array de tags sin duplicados para coloar en etiquetas
	function getTags() {
		var tags=[];
		myData.forEach(function (arrayItem) {			
			//var x = arrayItem.tags;
			arraySplit = arrayItem.tags.split(',');
			//console.log(arraySplit);

			arraySplit.forEach(function(elemento, indice, array) {
				tags.push(elemento)
				//console.log(elemento, indice);
			})		
		});

		// Elimina duplicados
		var uniqueTags = Array.from(new Set(tags))
		//console.log(uniqueTags);
		
		var contenido='';
		uniqueTags.forEach(function(element) {  
			//console.log(element);
			var colores = ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","aqua","teal","green","light-green","lime","sand","khaki","yellow","amber","orange","deep-orange","blue-gray","brown","light-gray","gray","dark-gray","pale-red","pale-yellow","pale-green","pale-blue"];
			var colorRand = colores[~~(Math.random() * colores.length)];
			contenido += '<button onClick="loadPostsByTag(\''+element+'\'); jump(\'popularPosts\')" class="w3-button w3-small  w3-'+colorRand+'">'+element+'</button> ';
		//<span class="w3-tag w3-light-grey w3-small w3-margin-bottom">
		});
		$("#tagsList").append(contenido);
		
	}
	getTags();
	
	function loadPostsByTag(tagName) {	
		$( "#popularPosts" ).empty();

		let txt = '<div class="w3-card-4 w3-margin w3-white">'+
			'<div class="w3-container w3-padding">'+
			  '<h4>Posts con el tag <strong>'+tagName+'</strong> :</h4>'+
			'</div>'+
			'<ul class="w3-ul w3-hoverable w3-white">';

		// Buscar palabra en array de objetos
		for(var i=0; i< myData.length; i++) {
			var index = myData[i].tags.indexOf(tagName);
			if(index >= 0) {
				//console.log("la palabra existe dentro de la cadena y se encuentra en la posición " + index);
				//console.log("la palabra está en el post con indice " + i);
				txt += '<li class="w3-padding-16" onclick="onePost('+myData[i].id+'); jump(\'marcador\')">'+
					  '<img src="img/theme/min/'+myData[i].tema+'.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">'+
					  '<span class="w3-badge w3-green">'+myData[i].id+'</span>&nbsp;&nbsp;<span class="w3-large">'+myData[i].titulo+'</span><br>'+
					  '<span>  Tema: '+themeArr[myData[i].tema]+ '  Fecha: '+myData[i].fecha_publicacion+'</span>'+
				  '</li>';
			}
		}
		$('#popularPosts').append(txt);
		document.getElementById('popularPosts').style.display='block';
		//jump('marcador');
	}
	
	// función para navegar (anchor) a un div como si fuera un marcador
	function jump(h){
		var top = document.getElementById(h).offsetTop;
		window.scrollTo(0, top);
	}



$(document).ready(function(){
	// Calendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: hoy,
        buttonIcons: true, // show the prev/next text
        weekNumbers: false,
        editable: true,
        eventLimit: true, // allow "more" link when too many events 
        events: { 
			  //url: 'https://api.jsonbin.io/v3/b/63dbb059c0e7653a056ce46e',
			  url: 'https://api.jsonbin.io/v3/b/63dbecb5ebd26539d073eabb',
			  type: 'GET',
			  dataType: 'json',
			  beforeSend: function(xhr) {				
				xhr.setRequestHeader('secret-key', '$2b$10$NbcBbge09sMN8yjVPsaDhujUZHGFMQWJNxA.iwAaFP0sbjw6qu.MC');
			  },
			  success: function(json) {				
				events = json.record.events;
				console.log(events);
				//callback(events);
				return events;

			  },
			  error: function() {
				alert('hay un error');
			  }
		}, // fin events 

	});// fin calendar
	
	
	
});	// fin ready		
