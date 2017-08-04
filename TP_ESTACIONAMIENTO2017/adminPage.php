<?php session_start();

if (isset($_SESSION["admin"])) {

 ?>
<!DOCTYPE html>
			<html>
			<head>
				<title>Estacionamiento 24/7</title>
					<meta name="viewport" content="width=device-width, initial-scale=1.0">


					<!-- jQuery library -->
					<script src="js/jquery-3.2.1.min.js"></script>				
					<!-- Latest compiled and minified CSS -->
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
					<!-- Latest compiled JavaScript -->
					<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
					

					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
					
					<!--Estilos propios y funciones-->
					<style  rel="stylesheet" type="text/css" src="css/estilos.css"></style>
					<script type="text/javascript" src="js/nexologin.js"></script>				
					<script type="text/javascript" src="js/nexoES.js"></script>
					<script type="text/javascript" src="js/nexoABMempleados.js"></script>
					<script type="text/javascript" src="js/estadisticasCocheras.js"></script>					
					<script type="text/javascript" src="js/estadisticasAutos.js"></script>					
					<script type="text/javascript" src="js/dinamicaHtml.js"></script>

					<!--FAVINCON-->					
					<link rel="icon" href="favicon.ico">
					
					<style>
						.yellow
						{
							color: red;
						}

						.infomodal {
								font-family:"Arial Black", Gadget, sans-serif;
							}

						.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

body { 
    padding-top: 80px; 
}

/**Este estilo es para el header de tablas de cocheras, no usa fondo porque usa estados**/
.StandardTable thead th{
    background: #5370b5; 
}

/**Background de tablas LIVECARS**/
.TableLiveCars thead th{
    background: #22723b; 
}

table.bg-tabla-livecars {
  background: #91d888;
}

/**background de tabla Egresoos**/
.TableEgresos thead th{
    background: #3b4951; 
}

table.bg-tabla-egresos {
  background: #6e818c;
}
/**TAbla usuarios**/
.TablaUsuarios thead th{
    background: #48594d; 
}

/**TAbla stas users**/
.TablaStatsUsuarios thead th{
    background: #306b65; 
}

table.bg-tabla-stats-users {
  background: #769b97;
}
				</style>

					<script>
					$(document).ready(function() {$(".loader").hide(); });
						     var navMain = $(".navbar-collapse");

     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });
					</script>



			</head>


						<nav class="navbar navbar-default navbar-fixed-top">
							<div class="container-fluid" style="background-color:  #222b3a">
								<!-- Brand and toggle get grouped for better mobile display -->
								<div class="navbar-header">      
									<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
										<span class="sr-only">Toggle navigation</span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										
									</button>
									
									<a class="navbar-brand" href="miPagina.php" >Estacionamiento 24HS</a>    
								</div>

								<!-- Collect the nav links, forms, and other content for toggling -->
								<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">      
									<ul class="nav navbar-nav">        
											<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Ingresar/Retirar Autos <span class="caret"></span></a>
												<ul class="dropdown-menu" >
													<li><a href="#" onclick="DisplayFormIngreso()">Ingresar Auto</a></li>
													<li><a href="#" onclick="DisplayTablaSalida()">Retirar Auto</a></li>
												</ul>
											</li>    
											
											<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Estadisticas Cocheras<span class="caret"></span></a>
												<ul class="dropdown-menu">
													<li><a href="#" onclick="DameTodas()">Mostrar todas las cocheras</a></li> 
													<li><a href="#" onclick="CocheraMasUtilizada()">Cochera mas utilizada</a></li>
													<li><a href="#" onclick="CocheraMenosUtilizada()">Cochera menos utilizada</a></li>
													<li><a href="#" onclick="CocheraNoUtilizada()">Cocheras no utilizadas</a></li>
												</ul>
											</li>
											
											<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Gestionar Empleados<span class="caret"></span></a>
												<ul class="dropdown-menu">
													<li><a href="#" onclick="DisplayFormAltaEmpleado()"><i class="group_add"></i>Nuevo empleados</a></li> 
													<li><a href="#" onclick="DisplayFormGestionarEmpleados()">Eliminar/Suspender</a></li> 
												</ul>
											</li>
											
											<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-info-sign"></span> Info Usuarios<span class="caret"></span></a>
												<ul class="dropdown-menu">
													<li><a href="#" onclick="OperacionesUsuarios()">Operaciones Usuarios</a></li> 
													<li><a href="#" onclick="MostrarLogins()">Logins Usuarios</a></li> 
												</ul>
        									</li>	

				
											<li><a href="#" onclick="MostrarAutosEgresados()">Autos Egresados</a></li> 

									</ul>

										<!--LO QUE VA HACIA LA DEReCHA-->
										<ul class="nav navbar-nav navbar-right">
										<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span ><?php echo $_SESSION["admin"]; ?><span class="caret"></span></a>
												<ul class="dropdown-menu" >
													<li><a href="#">Color Favorito:</a><input id="colorChange"type="color" onchange="cambiarcolor()"/></li>
												</ul>
											</li> 

											<li><a href="#" onclick="LogOut()"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>
										</ul>   

								</div><!-- /.navbar-collapse -->
					
							</div><!-- /.container-fluid -->
					</nav>
					

					<div class="container">
						<body id="divBg"  style="background-color: <?php if(isset($_COOKIE['color'])) { echo $_COOKIE["color"];}else echo "#804040"?>">
								<div id="es">

								</div>

						</body>
					</div>
					
					<div class="container">
						<body style="background-color: #8b9ebc">
								<div id="resultadosOperaciones">
									<div class="loader"></div>
								</div>
						</body>
					</div>
					
					
					<div class="container">
						<body >
								<div id="tabla" style="overflow-x:auto;">
									<div class="loader"></div>
								</div>

						</body>
					</div>


					<div class="container">
						  <div class="modal fade" id="myModalEliminar" role="dialog">
							<div class="modal-dialog">							
								<!-- Modal content-->
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
										<h4 class="modal-title"><span class="glyphicon glyphicon-warning-sign yellow"></span> ATENCION!</h4>
									</div>
									<div class="modal-body">
										<p>¿Esta seguro que desea eliminar el empleado?</p>
									</div>
									<div class="modal-footer" id="btnModalEliminar">
										

									</div>
								</div>
							
							</div>
						</div>
					</div>

					<div class="container">
						  <div class="modal fade" id="myModalSuspender" role="dialog">
							<div class="modal-dialog">							
								<!-- Modal content-->
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
										<h4 class="modal-title"><span class="glyphicon glyphicon-warning-sign yellow"></span> ATENCION!</h4>
									</div>
									<div class="modal-body">
										<p>¿Esta seguro que desea suspender el empleado?</p>
									</div>
									<div class="modal-footer" id="btnModalSuspender">

									</div>
								</div>
							
							</div>
						</div>
					</div>

					<div class="container">
						  <div class="modal fade" id="myModalReincorporar" role="dialog">
							<div class="modal-dialog">							
								<!-- Modal content-->
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
										<h4 class="modal-title"><span class="glyphicon glyphicon-warning-sign yellow"></span> ATENCION!</h4>
									</div>
									<div class="modal-body">
										<p>¿Esta seguro que desea reincorporar el empleado?</p>
									</div>
									<div class="modal-footer" id="btnModalReincorporar">

									</div>
								</div>
							
							</div>
						</div>
					</div>

					<div class="container">
						  <div class="modal fade" id="myModalEliminarAuto" role="dialog">
							<div class="modal-dialog">							
								<!-- Modal content-->
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
										<h4 class="modal-title"><span class="glyphicon glyphicon-warning-sign yellow"></span> Auto a retirar</h4>
									</div>
									<div class="modal-body" id="textosDatosAutos">
										<p id="eltextoaqui"></p>
									</div>
									<div class="modal-footer" id="botonesModalEliminarAuto">

									</div>
								</div>
							
							</div>
						</div>
					</div>



			</html>
<?
}
else
{
	header('location:login.php');	
}
?>