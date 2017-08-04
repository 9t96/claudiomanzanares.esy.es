function TablaParaCocheras(cocheras,header)
{	
	$("#es").empty();
    $("#tabla").empty();

	var html = '<h2 align="center">'+header+'</h2>'+
			    '<span class="label label-success">Cochera disponible</span>'+
                '<span class="label label-danger">Cochera ocupada</span>'+
			'<table class="table table-bordered table-responsive StandardTable">'+
                '<thead class="thead-inverse">'+
                    '<tr>'+
						'<th>Piso</th>'+
                        '<th>Lugar</th>'+
                        '<th>Veces utilizada</th>'+
                        '<th>Reservada discapacitados</th>'+                   
                    '</tr>'+
            '</thead><tbody>';
        
			if (cocheras.length !== 0) {
			
				for (var index = 0; index < cocheras.length; index++) {
					
					if (cocheras[index].estado == 0) {
						html += '<tr class="success">';
					}
					else
						html += '<tr class="danger">';
					
					html += '<td>' + cocheras[index].piso + 'º</td>';
					html += '<td>' + cocheras[index].lugar + '</td>';
					html += '<td>' + cocheras[index].utilizada + '</td>';
					
					if (cocheras[index].discapacitado == 1) {
						html += '<td>' + '<img centered src="./tick.png" height="50px" >' + '</td>';
					}
					else
						html += '<td>' +  '<img centered src="./crosswrong.png" height="50px" >' + '</td>';
								
					html += "</tr>";
				}
			}
			else
				html += '<td colspan="4" align="center">' + 'No hay cocheras que no hayan sido usadas' + '</td>';
		
		html += '</tbody></table>';

        $(html).appendTo("#tabla");
}

function DameTodas()
{  $(".loader").show();
	$("#es").empty();
    $("#tabla").empty();
	$.ajax({
		type:"GET", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/todaslascocheras",
		crossDomain: true,
		async:true,
		})
		.done(function(cocheras){
			$(".loader").hide();
            TablaParaCocheras(cocheras,"Cocheras");

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
	})
}


function CocheraMasUtilizada()
{	$(".loader").show();
	$("#es").empty();
    $("#tabla").empty();
    $.ajax({
		type:"GET", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/cocheraMasUtilizada",
		crossDomain: true,
		async:true,
		})
		.done(function(cocheraMasUtilizada){
			$(".loader").hide();
			TablaParaCocheras(cocheraMasUtilizada,"Cocheras mas utilizadas");
			

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
	})
}


function CocheraNoUtilizada()
{		$(".loader").show();
	$("#es").empty();
    $("#tabla").empty();
    $.ajax({
		type:"GET", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/cocheraNoUtilizada",
		crossDomain: true,
		async:true,
		})
		.done(function(cocheraNoUtilizada){
					$(".loader").hide();
            TablaParaCocheras(cocheraNoUtilizada,"Cocheras no utilizadas");

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
	})
}

function CocheraMenosUtilizada()
{	$(".loader").show();
	$("#es").empty();
    $("#tabla").empty();
    $.ajax({
		type:"GET", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/cocheraMenosUtilizada",
		crossDomain: true,
		async:true,
		})
		.done(function(cocheraMenosUtilizada){
			$(".loader").hide();
            TablaParaCocheras(cocheraMenosUtilizada,"Cocheras menos utilizadas");

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
	})
}