

function DisplayFormIngreso()
{		
		$("#tabla").empty();
		$("#es").empty();
		
		var html = '<h2 align="center">Auto Ingresando</h2></br>';
		html += '<form  id="formEntrada" class="form-horizontal">'+
			
			'<div class="form-group">'+
				'<label class="control-label col-sm-2" for="marca">Marca:</label>'+
					'<div class="col-sm-10">'+
						'<input type="marca" class="form-control" id="marca" placeholder="Ingrese marca" name="marca" required>'+
					'</div>'+
		'</div>'+
			
			'<div class="form-group">'+
			'<label class="control-label col-sm-2" for="color">Color:</label>'+
				'<div class="col-sm-10">'+
					'<input type="color" class="form-control" id="color" name="color" required>'+
				'</div>'+
			'</div>'+

		'<div class="form-group">'+
				'<label class="control-label col-sm-2" for="patente">Patente:</label>'+
					'<div class="col-sm-10">'+
						'<input type="patente" class="form-control" id="patente" placeholder="Ingrese patente" name="patente" required>'+
					'</div>'+
		'</div>'+


			'<div class="form-group">'+
				'<label class="control-label col-sm-2" for="piso">Piso:</label>'+
				'<div class="col-sm-10">'+
					'<select class="form-control" id="selectorpiso"  onchange="CocheraPorPiso()"required>'+
							"<option value='-1' selected>Seleccione un piso</option>"+
							"<option value='1'>Primero</option>"+
							"<option value='2'>Segundo</option>"+
							"<option value='3'>Tercero</option>"+
					'</select>'+
				'</div>'+
			'</div>'+

			'<div id="CocherasDisponiblesEnElPiso" class="form-group"></div>'+

		'<div class="form-group">'+
		'<div class="col-sm-offset-2 col-sm-10">'+
			'<button type="button" class="btn btn-default" name="btnRegistrar" id="btnRegistrar" onclick="AgregarAuto()">Registrar</button>'+
		'</div>'+
		'</div>'+

	'</form>';
            
		$(html).appendTo("#es");
		CocheraPorPiso();  
}

function CocheraPorPiso()
{	
	 piso = $("#selectorpiso").val();

	$.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/cocheraXpiso/"+piso,
		crossDomain: true,
		async:true,
		})
		.done(function(cocheras){
				
				$("#CocherasDisponiblesEnElPiso").empty();
				
				if (cocheras !== null) {

					var html = '<label class="control-label col-sm-2" for="lugar">Lugar:</label>'+
								'<div class="col-sm-10">'+			
									'<select class="form-control" id="selectorLugar">';
								
								if (cocheras.length == 0) {
									html += "<option value ='-1' selected>No hay cocheras disponibles en este piso</option>";
								}
								else
								{	
									html += "<option value ='-1' selected>Seleccione un lugar</option>";
									for (var index = 0; index < cocheras.length; index++) {
										

										if (cocheras[index].piso == 1) {
											if (cocheras[index].lugar == 1 || cocheras[index].lugar == 2 || cocheras[index].lugar == 3 ) {
													html += "<option value='"+cocheras[index].lugar+"'>"+cocheras[index].lugar+"(Resevado Discapacitados)</option>";
											}
											else
												html += "<option value='"+cocheras[index].lugar+"'>"+cocheras[index].lugar+"</option>";
												
										}
										else
											html += "<option value='"+cocheras[index].lugar+"'selected>"+cocheras[index].lugar+"</option>";			
									}
								}

						html += "</select>";
						html += '</div>';			
					
						$(html).appendTo("#CocherasDisponiblesEnElPiso");
				}
				else
				{
					//no hay cocheras disponibles
				}
				
		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
		})
}


function DisplayTablaSalida()
{	
	$(".loader").show();
	$("#es").empty();
	
	var html = '<h2  align="center">Autos estacionados</h2>';
        html+=  '<form class="form-inline">'+
                    
                    '<div class="form-group">'+
                        '<label for="patente">Patente:</label>'+
                        '<input type="patente" class="form-control input-sm" id="patente" placeholder="Ingrese patente" required>'+
                    '</div>'+        
                    '  <button type="button"  name="btnBuscarPorPatente" id="btnBuscarPorPatente" class="btn btn-default" onclick="BuscarPorPatente()">Buscar</button>'+
                '</form></br>';

		$(html).appendTo("#es");
	
		$.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/autosLive",
		crossDomain: true,
		async:true,
		})
		.done(function(valor){
				
				$(".loader").hide();
				TablaParaAutosEstacionados(valor);
				
		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
		})
}

function createAutoClosingAlert(codigo,selector, delay) {
   var alert = $(codigo).appendTo(selector);
   
   window.setTimeout(function() {  $(selector).empty(); }, delay);
}


/*
* Argega el auto pasado.
*/
function AgregarAuto()
{
		var marca = $("#marca").val() ;
		var color = $("#color").val();
		var patente = $("#patente").val();
		var piso = $('#selectorpiso').val();
		var lugar = $('#selectorLugar').val();

		console.log("marca:"+marca+"patente:"+patente+"color:"+color+"piso:"+piso+"lugar:"+lugar);

		if (lugar == -1 || patente == "" || piso == -1 || marca == ""){
			
			$("#tabla").empty();
			
			var html = "<div class='alert alert-danger'>";
					html += "<strong>Error!</strong>Complete los campos correctamente y vuelva a intentar.</div>";	
			
			$(html).appendTo("#tabla");

		}
		else
		{		
			var datos = "marca=" +marca+ "&color=" +color + "&patente=" +patente  +"&piso="+piso+"&lugar="+lugar+ "&op=ingreso";

			$.ajax({
			type:"POST", 
			dataType:"Text", 
			url:"http://claudiomanzanares.esy.es/ingresarAuto",
			crossDomain: true,
			data:datos,
			async:true,
			})
			.done(function(valor){

				if (valor == "ok") {
					$('#formEntrada').get(0).reset();
					createAutoClosingAlert('<div class="alert alert-success" role="alert">Se registro el auto exitosamente!</div>',"#tabla",5000)
				}
				else if(valor == "full")
				{
					createAutoClosingAlert('<div class="alert alert-alert" role="alert">No hay espacio en el estacionamiento, espere a que se retire uno y vuelva intentar.</div>',"#tabla",5000)
				}
				else
				{	
					console.log(valor);
				}

			})		
			.fail(function(jqXHR, textStatus, errorThrown){
				alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
			})

		}
}


/*
* Llama a la api que elimina el auto pasado por id.
*/
function RetirarAuto(idAEliminar,importe)
{		
		
	    $('#myModalEliminarAuto').modal('hide');

		usuario = $("#usuarioOperante").text();
		
		var datos = "usuario="+usuario+"&importe="+importe+"&id="+idAEliminar;

		$.ajax({
		type:"POST", 
		dataType:"text", 
		url:"http://claudiomanzanares.esy.es/egresar",
		crossDomain: true,
		data:datos,
		async:true,
		})
		.done(function(valor){
			
			if (valor == "ok") {
				
				createAutoClosingAlert('<div class="alert alert-success" role="alert">Se retiro el auto exitosamente, pudes revisarlo en en Egresos.</div>',"#resultadosOperaciones",5000);
				DisplayTablaSalida();
			}
			else
			{	
				console.log(valor);
				alert("Ha ocurrido un error");
				window.location.href="miPagina.php";
			}

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
		})
}

function BuscarPorPatente()
{   $(".loader").show();
	var patente = $("#patente").val();
	if(patente !==""){
	$.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/dameesteauto/"+patente,
		crossDomain: true,
		async:true,
		})
		.done(function(valor){

				$(".loader").hide();
				TablaParaAutosEstacionados(valor);

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
		})
	}
	else
		createAutoClosingAlert('<div class="alert alert-danger" role="alert">Ingrese una patente valida y vuelva a intentar.</div>',"#resultadosOperaciones",5000);
}

function TablaParaAutosEstacionados(valor)
{	
	$("#tabla").empty();

	var html = '<table id="tablaSalidaAutos"class="table table-bordered table-responsive TableLiveCars bg-tabla-livecars" ><thead class="thead-inverse"><tr><th>Marca</th><th>Logo</th>'+
						'<th>Color</th><th>Patente</th><th>Hora Entrada</th><th>Tiempo Transcurrido (HS)</th><th>Importe a pagar</th><th>Piso</th><th>Lugar</th><th>Retirar</th></tr></thead><tbody>';
			
			if(valor.length !== 0){			
				for (var i = 0; i < valor.length; i++) {

					//Split timestamp into [ Y, M, D, h, m, s ]
					var t = valor[i].entrada.split(/[- :]/);

					// Apply each element to the Date function
					var horaDeEntrada = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

					//horaDeEntrada.setHours = horaDeEntrada.getHours() + 3;
					//Hora actual.
					var horaActual = new Date();
					
					//Devuelve en milisegundos y lo divido por el valor de una hora en milisegundos.
					
					var hourDiff = horaActual - horaDeEntrada;

					var hDiff = hourDiff / 3600 / 1000; //horas
					
					var minDiff = hourDiff / 60 / 1000; //minutos

					var hora = {};
					
					hora.hours = Math.floor(hDiff);
					
					hora.minutes = minDiff - 60 * hora.hours;

					html += '<td onclick="sortTable(0)">' + valor[i].marca + '</td>';
					html += '<td align="center">' + FotoPorMarca(valor[i].marca)+ '</td>';
				    html += '<td bgcolor="'+valor[i].color+'">'+'</td>';
				    html += '<td onclick="sortTable(1")>' + valor[i].patente + '</td>';
					html += '<td>' + valor[i].entrada + '</td>';
					html += '<td>' + hora.hours+'Hs '+Math.round(hora.minutes)+" Min" + '</td>';
					html += '<td>' +"$ "+CalcularImporte(hora.hours,hora.minutes)+'</td>';
					html += '<td>' + valor[i].piso+'º</td>';
					html += '<td>' + valor[i].lugar+'</td>';                                  

					html += '<td>' + '<a data-toggle="modal" data-target="#myModalEliminarAuto" class="btn btn-primary btn-md" onclick="ModalRetirarAuto(\''+valor[i].marca+'\',\''+valor[i].patente+'\',\''+valor[i].color+'\',\''+valor[i].piso+'\',\''+valor[i].lugar+'\',\''+valor[i].entrada+'\',\''+CalcularImporte(hora.hours,hora.minutes)+'\',\''+valor[i].id+'\')">Retirar Auto</a>' + '</td>'; 
					   
				    html += "</tr>";
				}
			}
			else
				html += '<td colspan="10" align="center">' + 'No hay autos estacionados' + '</td>';
				
				html += '</tbody></table>';

				$(html).appendTo("#tabla");
}

/*
* Calcula el importe a pagar segun las horas y los minutos transcurridos.
*/
function CalcularImporte(horas,minutos)
{
		var importeXhoras = 0;
		var importeXmediahoras = 0;
		var importeFinal = 0;
		var horasdedecimales = 0;
		var venticuatro = 0;
		var docehoras = 0;



        if(horas > 12 && horas < 24)
        {	
			//Cantidad de "12horas" que estuvo estacionado.
        	var docehoras = parseInt(horas) / 12;
			// Cantidad de  "decimales de doce horas" estuvo.
			var decimalesdedocehora  = horas - parseInt(horas);

			horasdedecimales = decimalesdedocehora * 12;
			
			importeXhoras = (docehoras * 90) +  parseInt(horasdedecimales);

        }
        else
        {
            var venticuatro = parseInt(horas) / 12;
			// Cantidad de  "decimales de doce horas" estuvo.
			var decimalesdeventicuatro  = horas - parseInt(horas);

			horasdedecimales = decimalesdeventicuatro * 12;
			
			importeXhoras = (venticuatro * 90) +  parseInt(horasdedecimales);


		}           
        
		if (minutos > 35) {
            importeXmediahoras = 10;
        }
        else
            importeXmediahoras = 5;

        importeFinal  = importeXhoras + importeXmediahoras;  

		return importeFinal;  

}


function ModalRetirarAuto(marca,patente,color,piso,lugar,entrada,importe,id)
{
	$("#textosDatosAutos").empty();
	$("#btnModalEliminar").empty();

	var datosAuto =			'<b>Marca: </b>'             +marca+"</br>";
		datosAuto +=			'<b>Logo: </b>'             +FotoPorMarca(marca)+"</br>";
		datosAuto +=		'<b>Patente: </b>' 			 +patente+"</br>";
		datosAuto +=		'<b>Color: </b>'             +'<input type="color" value="'+color+'"></br>';
		datosAuto +=		'<b>Piso :</b>' 			 +piso+"</br>";
		datosAuto +=		'<b>Lugar: </b>' 			 +lugar+"</br>";
		datosAuto +=		'<b>Hora entrada: </b>' 	 +entrada+"</br>";
		datosAuto +=		'<b>Importe a pagar: </b>'   +importe+"</br>"; 
	
	
	$("#botonesModalEliminarAuto").empty();
	var  botones  = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
		 botones += '<button type="button" id="btnConfrimarEliminar" class="btn btn-primary btn-md" onclick="RetirarAuto(\''+id+'\',\''+importe+'\')">Cobrar</button>';

	$(botones).appendTo("#botonesModalEliminarAuto");
	$(datosAuto).appendTo("#textosDatosAutos");
	
}


function FotoPorMarca(marca)
{
	marcaminusculas = marca.toLowerCase();

	switch (marcaminusculas) {
	
	case "alfaromeo":
		return '<img src="./FotosMarcas/alfaromeo.png" height="50px">';
			break;
	case "astonmartin":
		return '<img src="./FotosMarcas/astonmartin.png" height="50px">';
			break;
	case "audi":
		return '<img src="./FotosMarcas/audi.png" height="50px">';
			break;
	case "bugatti":
		return '<img src="./FotosMarcas/bugatti.png" height="50px">';
			break;
	case "chevrolet":
		return '<img src="./FotosMarcas/chevrolet.png" height="50px">';
			break;
	case "chrysler":
		return '<img src="./FotosMarcas/chrysler.png" height="50px">';
			break;
	case "citroen":
		return '<img src="./FotosMarcas/citroen.png" height="50px">';	
			break;
	case "dodge":
		return '<img src="./FotosMarcas/dodge.png" height="50px">';	
			break;
	case "ferrari":
		return '<img src="./FotosMarcas/ferrari.png" height="50px">';	
			break;
	case "fiat":
		return '<img src="./FotosMarcas/fiat.png" height="50px">';	
			break;
	case "ford":
		return '<img src="./FotosMarcas/ford.png" height="50px">';	
			break;
	case "honda":
		return '<img src="./FotosMarcas/honda.png" height="50px">';	
			break;
	case "hyundai":
		return '<img src="./FotosMarcas/hyundai.png" height="50px">';
			break;
	case "isuzu":
		return '<img src="./FotosMarcas/isuzu.png" height="50px">';	
			break;
	case "jaguar":
		return '<img src="./FotosMarcas/jaguar.png" height="50px">';	
			break;
	case "jeep":
		return '<img src="./FotosMarcas/jeep.png" height="50px">';	
			break;
	case "kia":
		return '<img src="./FotosMarcas/kia.png" height="50px">';
			break;
	case "lamborghini":
		return '<img src="./FotosMarcas/lamborghini.png" height="50px">';
			break;
	case "landrover":
		return '<img src="./FotosMarcas/landrover.png" height="50px">';
			break;
	case "mazda":
		return '<img src="./FotosMarcas/mazda.png" height="50px">';
			break;
	case "mercedes":
		return '<img src="./FotosMarcas/mercedes.png" height="50px">';
			break;
	case "mini":
		return '<img src="./FotosMarcas/mini.png" height="50px">';
			break;
	case "mitsubishi":
		return '<img src="./FotosMarcas/mitsubishi.png" height="50px">';	
			break;
	case "nissan":
		return '<img src="./FotosMarcas/nissan.png" height="50px">';	
			break;
	case "opel":
		return '<img src="./FotosMarcas/opel.png" height="50px">';	
			break;
	case "peugeot":
		return '<img src="./FotosMarcas/peugeot.png" height="50px">';	
			break;
	case "porsche":
		return '<img src="./FotosMarcas/porsche.png" height="50px">';	
			break;
	case "renault":
		return '<img src="./FotosMarcas/renault.png" height="50px">';	
			break;
	case "rolls royce":
		return '<img src="./FotosMarcas/rollsroyce.png" height="50px">';
			break;
	case "subaru":
		return '<img src="./FotosMarcas/subaru.png" height="50px">';	
			break;
	case "suzuki":
		return '<img src="./FotosMarcas/suzuki.png" height="50px">';	
			break;
	case "toyota":
		return '<img src="./FotosMarcas/toyota.png" height="50px">';	
			break;
	case "volkswagen":
		return '<img src="./FotosMarcas/volkswagen.png" height="50px">';	
			break;
	case "volvo":
		return '<img src="./FotosMarcas/volvo.png" height="50px">';	
			break;
	default:
		return '<img src="./FotosMarcas/noimage.png" height="50px">';
		break;
	}
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tablaSalidaAutos");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


