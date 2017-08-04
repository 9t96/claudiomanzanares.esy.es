function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("pruebaOrdenar");
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

function TablaAutosEgresados(autosegresados)
{
	$("#tabla").empty();
	
	var html = '<table id="pruebaOrdenar" class="table table-bordered table-responsive TableEgresos bg-tabla-egresos"><thead class="thead-inverse">'+
                  '<tr>'+
                    	'<th onclick="sortTable(0)">Marca</th>'+
                        '<th>Logo</th>'+  
                        '<th>Color</th>'+
                        '<th>Patente</th>'+
                        '<th>Entrada</th>'+
                        '<th>Salida</th>'+
                        '<th>Piso</th>'+
                        '<th>Lugar</th>'+
                        '<th>Pago</th>'+
                   '</tr>'+
                '</thead><tbody>';

	if (autosegresados !== 0) {
		
		for (var i = 0; i < autosegresados.length; i++) {
			html += '<tr>'; 
      html += '<td>' + autosegresados[i].marca + '</td>';
      html += '<td>' + FotoPorMarca(autosegresados[i].marca) + '</td>';
			html += '<td bgcolor="' + autosegresados[i].color + '"</td>';
			html += '<td>' + autosegresados[i].patente + '</td>';
			html += '<td>' + autosegresados[i].entrada + '</td>';
			html += '<td>' + autosegresados[i].salida+"HS" + '</td>';
			html += '<td>' + autosegresados[i].piso+'º</td>';
			html += '<td>' + autosegresados[i].lugar+'</td>';
			html += '<td>' +"$"+autosegresados[i].pago+'</td>';

			html += "</tr>";
		}
	}
	else
	{
		html += '<tr>'+
				'<td> NO HAY AUTOS PARA MOSTRAR </td>'+
				'</tr>';
	}	
				

	html += '</tbody></table>';

				$(html).appendTo("#tabla");
}


function MostrarAutosEgresados()
{	$(".loader").show();
	$("#es").empty();
	$("#tabla").empty();
	
	var inputs = '<h2 align="center">Autos Egresados</h2>';
   		inputs +='<form class="form-inline">'+
                    
                    '<div class="form-group">'+
                        '<label for="patente">Patente:</label>'+
                        '<input type="patente" class="form-control input-sm" id="patente" placeholder="Ingrese patente" required>'+
                    '</div>'+        
                    '  <button type="button"  name="btnBuscarPorPatente" id="btnBuscarPorPatente" class="btn btn-default" onclick="BuscarPorPatenteEgresado()">Buscar</button>'+
                '</form></br>';

	$(inputs).appendTo("#es");
	
    $.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/autosEgresados",
		crossDomain: true,
		async:true,
		})
		.done(function(autosegresados){
			$(".loader").hide();
			TablaAutosEgresados(autosegresados);
		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
		})
}

function BuscarPorPatenteEgresado()
{   
	$(".loader").show();
	var patente = $("#patente").val();
if(patente !==""){
	$.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/DameAutoEgresadoPorPatente/"+patente,
		crossDomain: true,
		async:true,
		})
		.done(function(valor){

				$(".loader").hide();

				if (valor.length == 0) {
					TablaParaAutosEstacionados(0);
				}
				else
				{
					TablaParaAutosEstacionados(valor);
				}


		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    })
    	}
	else
		createAutoClosingAlert('<div class="alert alert-danger" role="alert">Ingrese una patente valida y vuelva a intentar.</div>',"#resultadosOperaciones",5000);
}

function createAutoClosingAlert(codigo,selector, delay) {
   var alert = $(codigo).appendTo(selector);
   
   window.setTimeout(function() {  $(selector).empty(); }, delay);
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
  case "bmw":
		return '<img src="./FotosMarcas/volvo.png" height="50px">';	
			break;
	default:
		return '<img src="./FotosMarcas/noimage.png" height="50px">';
		break;
	}
}


