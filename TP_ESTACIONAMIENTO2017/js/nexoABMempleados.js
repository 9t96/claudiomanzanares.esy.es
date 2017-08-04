//porque no aparece la session.

function DisplayFormAltaEmpleado()
{       
        $("#tabla").empty();
        $("#es").empty();

    var html = '<h2 align="center">Nuevo Empleado</h2>';
    html += '<form class="form-horizontal">'+
        
        '<div class="form-group">'+
            '<label class="control-label col-sm-2" for="nombre">Nombre:</label>'+
                '<div class="col-sm-10">'+
                    '<input minlength="5" type="nombre" class="form-control" id="nombre" placeholder="Ingrese nombre" name="nombre" required>'+
                '</div>'+
       '</div>'+
        
        '<div class="form-group">'+
        '<label class="control-label col-sm-2" for="apellido">Apellido:</label>'+
            '<div class="col-sm-10">'+
                '<input type="apellido" class="form-control" id="apellido" placeholder="Ingrese apellido" name="apellido" required>'+
            '</div>'+
        '</div>'+

        '<div class="form-group">'+
            '<label class="control-label col-sm-2" for="turno">Turno:</label>'+
            '<div class="col-sm-10">'+
                '<select class="form-control" id="turno" required>'+
                    '<option value="-1" selected>Seleccione turno</option>'+
                    '<option value="1">Mañana</option>'+
                    '<option value="2">Tarde</option>'+
                    '<option value="3">Noche</option>'+
                '</select>'+
            '</div>'+
        '</div>'+

        '<div class="form-group">'+
            '<label class="control-label col-sm-2" for="rol">Rol:</label>'+
            '<div class="col-sm-10">'+
                '<select class="form-control" id="rol" required>'+
                    '<option value="-1" selected>Seleccione los permisos</option>'+
                    '<option value="1">Empleado</option>'+
                    '<option value="2">Admin</option>'+
                '</select>'+
            '</div>'+
        '</div>'+

        '<div class="form-group">'+
            '<label class="control-label col-sm-2" for="usuario">Usuario:</label>'+
                '<div class="col-sm-10">'+
                    '<input type="usuario" class="form-control" id="usuario" placeholder="Ingrese usuario" name="usuario" required>'+
                '</div>'+
        '</div>'+

        '<div class="form-group">'+
            '<label class="control-label col-sm-2" for="pass">Password:</label>'+
                '<div class="col-sm-10">'+
                    '<input type="password" class="form-control" id="pass" placeholder="Contraseña" name="password" required>'+
                '</div>'+
        '</div>'+
    
    '<div class="form-group">'+
      '<div class="col-sm-offset-2 col-sm-10">'+
        '<button type="button" class="btn btn-default" name="btnRegistrarEmp" id="btnRegistrarEmp" onclick="AgregarEmpleado()">Guardar</button>'+
      '</div>'+
    '</div>'+

  '</form>';
        
        $(html).appendTo("#es");
}

function DisplayFormGestionarEmpleados()
{
    $("#es").empty();
    var html = '<h2 align="center">Gestion de Empleados</h2>';
        html+=  '<form class="form-inline">'+
                    
                    '<div class="form-group">'+
                        '<label for="nombre">Nombre:</label>'+
                        '<input type="nombre" class="form-control input-sm" id="nombre" placeholder="Ingrese nombre" required>'+
                    '</div>'+
                    
                    '<div class="form-group">'+
                        '<label for="apellido">Apellido:</label>'+
                        '<input type="apellido" class="form-control input-sm" id="apellido" placeholder="Ingrese apellido" required>'+
                    '</div>'+
                    
                    '  <button type="button"  name="btnGestionarEmpleados" id="btnGestionarEmpleados" class="btn btn-default" onclick="GestionarEmpleados()">Buscar</button>'+
                '</form></br>'+
                '<span class="label label-success">Usuario activo</span>'+
                '<span class="label label-danger">Usuario suspendido</span>';

    $(html).appendTo("#es");

    MostrarTodosLosEmpleados();
}


function AgregarEmpleado()
{   
     $("#tabla").empty();

     nombre   = $("#nombre").val();
     apellido = $("#apellido").val();
     turno    = $("#turno").val();
     usuario  = $("#usuario").val();
     password = $("#pass").val() ;
     rol      = $("#rol").val();



     
     var datos = "nombre=" + nombre + 
                "&apellido=" + apellido + 
                "&turno=" +turno + 
                "&usuario=" +usuario + 
                "&password=" +password +
                "&rol=" +rol;

    
    if (nombre == "" || apellido == "" || turno == -1 || usuario == "" || password == "" || rol == -1) {
       createAutoClosingAlert('<div class="alert alert-danger" role="alert">Error! Revise los campos y vuelva a intentar</div>',"#resultadosOperaciones",5000); 
    }
    else
    {
        $.ajax({
		type:"POST", 
		dataType:"text", 
		url:"http://claudiomanzanares.esy.es/nuevoempleado",
		crossDomain: true,
        data:datos,
		async:true,
		})
		.done(function(valor){
			
           console.log(valor);
			
            if (valor == "ok") {
				createAutoClosingAlert('<div class="alert alert-success" role="alert">Se agrego el empleado correctamente!</div>',"#resultadosOperaciones",5000);
			}
			else
			{
				createAutoClosingAlert('<div class="alert alert-danger" role="alert">Erro! Ha ocurrido un erro al intentar agregar el empleado, vuelva a intentar.</div>',"#resultadosOperaciones",5000);
				window.location.href="miPagina.php";
			}

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        })
    }
}

function GestionarEmpleados()
{
    $(".loader").show();
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    
    $.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/dameXempleado?nombre="+nombre+"&apellido="+apellido,
		crossDomain: true,
		async:true,
		})
		.done(function(empleados){
            $(".loader").hide();
			if (empleados !== null) {
				TablaEmpleados(empleados);
			}
			else
			{
				alert("Ha ocurrido un error");
				window.location.href="miPagina.php";
			}

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
		})
}

function TablaEmpleados(empleados)
{
    var estadoToString  = "";
    var rolToString     = "";
    var turnoToString   = "";

    $("#tabla").empty();

    var html = '<table class="table table-responsive table-hover TablaUsuarios">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Nombre</th>'+
                        '<th>Apellido</th>'+
                        '<th>Turno</th>'+
                        '<th>Usuario</th>'+
                        '<th>Estado</th>'+
                        '<th>Rol</th>'+
                        '<th style="text-align: center">Acciones</th>'+
                    '</tr>'+
                '</thead>'
                '<tbody>';

        for (var i = 0; i < empleados.length; i++) {
            
            if (empleados[i].rol == 1) {
                rolToString = "Empleado";
            }
            else
                rolToString = "Admin";

            if (empleados[i].turno == 1)
                turnoToString = "Mañana";
            else if(empleados[i].turno == 2)
                turnoToString = "Tarde";
            else
                turnoToString = "Noche";

            if (empleados[i].estado == 1)                
                estadoToString = "Activo";  
            else
                estadoToString = "Suspendido";

            
            if (empleados[i].estado == 1) {
                 html += "<tr class='success'>";  
            }
            else
                html += "<tr class='danger'>";  

                    html += '<td>' + empleados[i].nombre + '</td>';
				    html += '<td>' + empleados[i].apellido + '</td>';
				    html += '<td>' + turnoToString + '</td>';
					html += '<td>' + empleados[i].usuario + '</td>';
                    html += '<td>' + estadoToString + '</td>';
                    html += '<td>' + rolToString + '</td>';
            
                    
           
        html += '<td style="text-align: center">' + '<a class="btn btn-danger btn-md" data-toggle="modal" data-target="#myModalEliminar" onclick="BotonParaEliminarEmpleadoPorModal(\''+empleados[i].nombre+'\',\''+ empleados[i].apellido+'\')"><span class="glyphicon glyphicon-trash"></span>Eliminar</a>';

            if (empleados[i].estado == 1) {
                html += '   <a class="btn btn-warning btn-md" data-toggle="modal" data-target="#myModalSuspender" onclick="BotonParaSupenderPorModal(\''+empleados[i].usuario+'\','+empleados[i].estado+')">Suspender</a>' + '</td>';  
            }
            else{
                html += '   <a class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalReincorporar" onclick="BotonParaReincorporarPorModal(\''+empleados[i].usuario+'\','+empleados[i].estado+')">Reincorporar</a>' + '</td>'; 
            }
            html += "</tr>";        

        }

        html += '</tbody></table>';

				$(html).appendTo("#tabla");
}

function ActualizarEstado(usuario,estado)
{      
        $("#tabla").empty();
        $(".loader").show();
        $('#myModalSuspender').modal('hide');
        $('#myModalReincorporar').modal('hide');
        
        $.ajax({
            type:"PUT", 
            dataType:"json", 
            url:"http://claudiomanzanares.esy.es/actualizarestado?usuario="+usuario+"&estado="+estado,
            crossDomain: true,
            async:true,
            })
            .done(function(valor){

                if (valor == "ok") {
                    $(".loader").hide();
                    createAutoClosingAlert('<div class="alert alert-success" role="alert">Se actualizo el estado correctamente!</div>',"#resultadosOperaciones",5000);
                    MostrarTodosLosEmpleados();
                }
                else
                {
                    createAutoClosingAlert('<div class="alert alert-success" role="alert">Error! Ha ocurrido un error, vuleva intentar mas tarde.</div>',"#resultadosOperaciones",5000);
                    window.location.href="miPagina.php";
                }

            })		
            .fail(function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
	        })
    
}

function MostrarTodosLosEmpleados()
{   
    $("#tabla").empty();
    $(".loader").show();
    $.ajax({
		type:"get", 
		dataType:"json", 
		url:"http://claudiomanzanares.esy.es/traertodoslosempleados",
		crossDomain: true,
		async:true,
		})
		.done(function(empleados){

			if (empleados !== null) {
                $(".loader").hide();
                TablaEmpleados(empleados);
			}
			else
			{
				alert("Ha ocurrido un error");
				window.location.href="miPagina.php";
			}

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
	})
}

function EliminarEmpleado(nombre,apellido)
{       

        $("#tabla").empty();
        $(".loader").show();
        $('#myModalEliminar').modal('hide');

        $.ajax({
            type:"delete", 
            dataType:"text", 
            url:"http://claudiomanzanares.esy.es/eliminarempleado?nombre="+nombre+"&apellido="+apellido,
            crossDomain: true,
            async:true,
            })
            .done(function(valor){

                if (valor == "ok") {
                    $(".loader").hide();
                    createAutoClosingAlert('<div class="alert alert-success" role="alert">Se ha elimino correctamente!</div>',"#resultadosOperaciones",5000);
                    
                    MostrarTodosLosEmpleados();
                }
                else
                {
                   reateAutoClosingAlert('<div class="alert alert-danger" role="alert">Discuple, ha habido un error. Vuelva a intentarlo</div>',"#resultadosOperaciones",5000);
                    window.location.href="miPagina.php";
                }

            })		
            .fail(function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        })

}

function createAutoClosingAlert(codigo,selector, delay) {
   $(selector).empty();
    var alert = $(codigo).appendTo(selector);
   
   window.setTimeout(function() {  $(selector).empty(); }, delay);
}


function OperacionesUsuarios()
{   $("#es").empty();
    $("#tabla").empty();
    $(".loader").show();
    $.ajax({
            type:"get", 
            dataType:"json", 
            url:"http://claudiomanzanares.esy.es/operacionesUsuarios",
            crossDomain: true,
            async:true,
            })
            .done(function(usuarios){
                $(".loader").hide();
                    TablaOperacionesUsuarios(usuarios);
            })      
            .fail(function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        })
}

function TablaOperacionesUsuarios(usuarios)
{
    $("#es").empty();
    $("#tabla").empty();

    var html = '<table class="table table-bordered table-responsive TablaStatsUsuarios bg-tabla-stats-users"><thead class="thead-inverse">'+
                  '<tr>'+
                        '<th>Usuario</th>'+
                        '<th>Cant.Operaciones</th>'+
                '</tr>'+
                '</thead><tbody>';
                
                for (var i = 0; i < usuarios.length; i++) {
                    html += '<tr>'; 
                        html += '<td>' + usuarios[i].usuario + '</td>';
                        html += '<td>' + usuarios[i].operaciones + '</td>';
                    html += "</tr>";
                }
                html += '</tbody></table>';

                $("<h2 align='center'>Operaciones por usuario</h2>").appendTo("#es");
                $(html).appendTo("#tabla");
                
}

function MostrarLogins()
{   $(".loader").show();
    $.ajax({
        type:"get", 
        dataType:"json", 
        url:"http://claudiomanzanares.esy.es/loginsUsuarios",
        crossDomain: true,
        async:true,
        })
        .done(function(usuarios){
            $(".loader").hide();
            TablaParaLogins(usuarios);
        })      
        .fail(function(jqXHR, textStatus, errorThrown){
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        })
}

function TablaParaLogins(usuarios)
{
    $("#es").empty();
    $("#tabla").empty();

     var html = '<table class="table table-bordered table-responsive TablaStatsUsuarios bg-tabla-stats-users"><thead class="thead-inverse">'+
                  '<tr>'+
                        '<th>Usuario</th>'+
                        '<th>Hora Login</th>'+
                '</tr>'+
                '</thead><tbody>';
                
                for (var i = 0; i < usuarios.length; i++) {
                    html += '<tr>'; 
                        html += '<td>' + usuarios[i].usuario + '</td>';
                        html += '<td>' + usuarios[i].horalogin + '</td>';
                    html += "</tr>";
                }
                html += '</tbody></table>';
    
    $("<h2 align='center'>Logins usuario</h2>").appendTo("#es");           
    $(html).appendTo("#tabla");
}

function BotonParaEliminarEmpleadoPorModal(nombre,apellido)
{   
    $("#btnModalEliminar").empty();
        
    var   html  = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
          html += '<button type="button" id="btnEliminarModal" class="btn btn-primary btn-md" onclick="EliminarEmpleado(\''+nombre+'\',\''+ apellido+'\')">Eliminar</button>';
        
    
    $(html).appendTo("#btnModalEliminar");
}

function BotonParaSupenderPorModal(usuario,estado)
{
    $("#btnModalSuspender").empty();
    
    var   html  = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
          html += '<button type="button" id="btnSuspenderModal" class="btn btn-primary btn-md" onclick="ActualizarEstado(\''+usuario+'\','+estado+')">Confirmar</button>';

    $(html).appendTo("#btnModalSuspender");
}

function BotonParaReincorporarPorModal(usuario,estado)
{
    $("#btnModalReincorporar").empty();
    
    var  html  = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
         html += '<button type="button" id="btnReincorporarModal" class="btn btn-primary btn-md" onclick="ActualizarEstado(\''+usuario+'\','+estado+')">Confirmar</button>';

    $(html).appendTo("#btnModalReincorporar");
}


