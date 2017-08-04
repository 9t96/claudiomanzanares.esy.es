<?php 
session_start();

require_once('../lib/nusoap.php'); 
require_once('../clases/Usuario.php');
require_once('../php/AccesoDatos.php');

$server = new nusoap_server();

$server->configureWSDL('login service', 'urn:verificarLogin');

$server->register('LetLogin',                									// METODO
				array('usuario' => 'xsd:string','password' => 'xsd:string'),  	// PARAMETROS D ENTRADA
				array('return' => 'xsd:int'),    							 // PARAMETROS DE SALIDA
				'urn:verificarLogin',                							// NAMESPACE
				'urn:verificarLogin#LetLogin',               					// ACCION SOAP
				'rpc',                        								    // ESTILO
				'encoded',                    								    // CODIFICADO
				'deja logear si el usuario esta registrado'    					// DOCUMENTACION
);

$server->register('RegistrarLogin',                			// METODO
				array('user' => 'xsd:string'),  			// PARAMETROS D ENTRADA
				array('return' => 'xsd:string'),    		// PARAMETROS DE SALIDA
				'urn:verificarLogin',                		// NAMESPACE
				'urn:verificarLogin#RegistrarLogin',        // ACCION SOAP
				'rpc',                        				// ESTILO
				'encoded',                    				// CODIFICADO
				'guarda la hora y usuario logeado'    		// DOCUMENTACION
);


function LetLogin($usuario,$password)
{	
	return Usuario::ExisteUsuario($usuario,$password);
}

function RegistrarLogin($usuario)
{	
	$retorno = "errroenWS";

	if (Usuario::SeLogeo($usuario) === TRUE) {
		$retorno = "ok";
	}

	return $retorno;
}

$HTTP_RAW_POST_DATA = file_get_contents("php://input");
		
$server->service($HTTP_RAW_POST_DATA);

?>