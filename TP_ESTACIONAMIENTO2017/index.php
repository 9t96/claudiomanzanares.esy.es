<?php

date_default_timezone_set("America/Argentina/Buenos_Aires");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require "./vendor/autoload.php";
require_once('./php/AccesoDatos.php');
require_once('./clases/Vehiculo.php');
require_once('./clases/Empleado.php');
require_once('./clases/Estacionamiento.php');
require_once('./clases/Usuario.php');

use \Slim\App;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers-Allow-Origin: X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,UPDATE,OPTIONS");
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new App(["settings" => $config]);

session_start();




$app->get('/', function (Request $request,Response $response) {
    return $response->withRedirect("/miPagina.php");
});
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/****************************                 ALTAS Y BAJAS DE AUTOS                    ********************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/

/*
*   Ingresa un auto a la cochera.
*/
$app->POST('/ingresarAuto', function(Request $request, Response $response)  {

    $autoIngresando = $request->getParsedBody();

    if (isset($autoIngresando)) {
        $respuesta = Vehiculo::IngresarAuto($autoIngresando);
    }
    else
        $respuesta =  "error";

    echo $respuesta;    
});


/*                       FUNCIONANDO!!!
* Retorna JSON con tabla de autos estacionados en este momento.
*/ 
$app->get('/autosLive', function(Request$request, Response$response){

    $autoslive = Vehiculo::TraerTodos();
    
    $response->getBody()->write(json_encode($autoslive));
});

/*
*   Remuve un auto de acuerdo al id pasado.
*/
$app->POST('/egresar', function(Request $request, Response $response){
        
       $datos = $request->getParsedBody();

        if (Vehiculo::EgresarAuto($datos["id"],$datos["importe"]) && Usuario::SumarOperacion($datos["usuario"])) {
            echo "ok";
        }
        else
            echo "error";

});

$app->get('/autosEgresados', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Vehiculo::AutosEgresados()));
        
});

$app->get('/dameesteauto/{patente}', function(Request $request, Response $response){

    $patente = $request->getAttribute('patente');

    $response->getBody()->write(json_encode(Vehiculo::DameAutoPorPatente($patente)));
        
});

$app->get('/DameAutoEgresadoPorPatente/{patente}', function(Request $request, Response $response){

    $patente = $request->getAttribute('patente');

    $response->getBody()->write(json_encode(Vehiculo::DameAutoEgresadoPorPatente($patente)));
        
});
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/****************************     FUNCIONES DE EMPLEADOS                                ********************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/*
*   Agrega un nuevo empleado.
*/
$app->post('/nuevoempleado',function(Request $request, Response $response){
        
        $nuevoempleado = $request->getParsedBody();

        $respuesta = "error";     
             
        if (isset($nuevoempleado)) {
             
             if (Empleado::NuevoEmpleado($nuevoempleado)) {
                 $respuesta = "ok";
             }
        }

        $response->getBody()->write($respuesta);
});


/*
*   Remuve un auto de acuerdo al id pasado.
*/
$app->get('/dameXempleado', function(Request $request, Response $response){
        
        $respuesta = "error";     
        $nombre   = $_GET['nombre'];
        $apellido = $_GET['apellido'];
      
        if (isset($nombre) && isset($apellido)) {
            $response->getBody()->write(json_encode(Empleado::DameEsteEmpleado($nombre,$apellido)));
        }
});

/*
*
*/
$app->get('/traertodoslosempleados', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Empleado::TraerToodosLosEmpleados()));
        
});

$app->put('/actualizarestado', function(Request $request, Response $response){
   
        $usuario = $_GET['usuario'];
        $estado  = $_GET['estado'];
        
        if (isset($usuario) && isset($estado)) {
            $response->getBody()->write(json_encode(Empleado::ActualizarEstado($usuario,$estado)));
        }
});

$app->delete('/eliminarempleado', function(Request $request, Response $response){
   
        $nombre    = $_GET['nombre'];
        $apellido  = $_GET['apellido'];
        
        if (isset($nombre) && isset($apellido)) {
            $response->getBody()->write(Empleado::EliminarEmpleado($nombre,$apellido));
        }
});

$app->get('/operacionesUsuarios', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Usuario::OperacionesUsuarios()));
        
});

$app->get('/loginsUsuarios', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Usuario::LoginsUsuarios()));
        
});

/***********************************************************************************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/****************************             FUNCIONES DE COCHERAS                         ********************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/
/***********************************************************************************************************************/


$app->get('/cocheraMasUtilizada', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Estacionamiento::CocheraMasUtilizada()));
        
});

$app->get('/cocheraNoUtilizada', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Estacionamiento::CocheraNoUtilizada()));
        
});

$app->get('/cocheraMenosUtilizada', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Estacionamiento::CocheraMenosUtilizada()));
        
});

$app->get('/cocheraXpiso/{piso}', function(Request $request, Response $response){

     $piso = $request->getAttribute('piso');

    $response->getBody()->write(json_encode(Estacionamiento::DameCocheraDeEstePiso($piso)));
        
});

$app->get('/todaslascocheras', function(Request $request, Response $response){

    $response->getBody()->write(json_encode(Estacionamiento::DameTodasLasCocheras()));
        
});

$app->run();

?>