<?php
session_start();	

date_default_timezone_set("America/Argentina/Buenos_Aires");

require_once('../lib/nusoap.php');

$host = 'http://claudiomanzanares.esy.es/php/loginWS.php';

$client = new nusoap_client($host . '?wsdl');

$client->soap_defencoding = 'UTF-8';

$err = $client->getError();

$respuestaWS = "error";

if ($err) {
	echo "error contructor WS.";
	die();
}
else{
	
	if ($_POST["op"] == "login") {	

		$letLogin = FALSE;
		
		$user = $_POST["usuario"]  ? $_POST["usuario"]  : NULL;
		$pass = $_POST["password"] ? $_POST["password"] : NULL;

		if (isset($user) && isset($pass)) {

			$respuestaLogin  = $client->call('LetLogin',array($user,$pass));
			
			//0 refiere a error.
			if ($respuestaLogin == 3) {
				$respuestaWS = "denied";
			}
			else if($respuestaLogin !== 0)
			{
				$respuestaRegistro = $client->call('RegistrarLogin',array($user));

				if ($respuestaRegistro == "ok") {
					
					if ($respuestaLogin == 1) {
						$_SESSION["user"] = $user;	
					}
					else
						$_SESSION["admin"] = $user;	
					
					$respuestaWS = "ok";
				}
			}		
		}

	}
	elseif($_POST["op"] == "cambiarcolor")
	{
		setcookie("color",$_POST["color"],time()+60*60*24*30,"/");
		$respuestaWS = "ok";
	}
	else
	{	
		if (isset($_SESSION["admin"])) {
			$_SESSION["admin"] = NULL;
		}
		else
			$_SESSION["user"] = NULL;
		
		session_unset();
		session_destroy();
		$respuestaWS = "ok";
	}

	if ($client->fault) {
		print_r($respuestaWS);
	} 

	$err = $client->getError();
	
	if ($err) {
		print_r($err);
	} 
	else {
		print_r($respuestaWS);
	}

}

?>