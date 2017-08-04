<?php
date_default_timezone_set("America/Argentina/Buenos_Aires");
class Usuario
{
    //--------------------------------------------------------------------------------//
	//--ATRIBUTOS
		
		private $usuario;
		private $password;

	//--------------------------------------------------------------------------------//

	//--------------------------------------------------------------------------------//
	//--GETTERS Y SETTERS
		public function GetUsuario()
		{
			return $this->usuario;
		}
		public function GetPass()
		{
			return $this->pass;
		}
		public function SetUsuario($valor)
		{
			$this->usuario = $valor;
		}

		public function SetPass($valor)
		{
			$this->password = $valor;
		}
    //--------------------------------------------------------------------------------//
	//--CONSTRUCTOR
		public function __construct($usuario=NULL, $password=NULL)
		{
			if($usuario !== NULL && $password !== NULL){
				$this->usuario = $usuario;
				$this->$password = $password;
			}
		}
    //--------------------------------------------------------------------------------//
	//--TOSTRING	
		public function ToString()
		{
			return $this->usuario." - ".$this->password."\r\n";
		}
	//--------------------------------------------------------------------------------//

	//--------------------------------------------------------------------------------//
	//--METODOS DE CLASE
        public static function ExisteUsuario($user,$pass)
		{	
			$letLogin = 0;
			$retorno  = 0;

			$usuarios = Usuario::TraerTodosLosUsuarios();

			if ($usuarios !== FALSE) {
				foreach ($usuarios as $value) {		

					if ($value["usuario"] == $user && $value["password"] == $pass) {				
						
						if ($value["estado"] == 2) {
							$letLogin = 3;
						}
						else
							$letLogin = $value["rol"];
							break;
					}
				}

				if($letLogin !== 0){
					$retorno = $letLogin;
				}
			}

			return $retorno;
		}


		public static function TraerTodosLosUsuarios()
		{
			$todoslosusuarios = FALSE;

			$conexion = AccesoDatos::dameUnObjetoAcceso();
			$statement = $conexion->RetornarConsulta("SELECT * FROM `usuarios` WHERE 1");

			if ($statement->execute()) {	

				$todoslosusuarios = $statement->fetchall();
			}
			
			return $todoslosusuarios;
		}

		public static function SeLogeo($user)
		{
			$hoyAhora = date("Y-m-d H:i:s");

			$conexion = AccesoDatos::dameUnObjetoAcceso();
    		$statement = $conexion->RetornarConsulta("INSERT INTO estadisticaslogin (`usuario`, `horalogin`) VALUES (?,?)");

			$statement->bindParam(1,$user);
			$statement->bindParam(2,$hoyAhora);

			if ($statement->execute()) {
				return TRUE;
			}	
			else
				return FALSE;
		}

		public static function SumarOperacion($usuario)
		{
			$conexion = AccesoDatos::dameUnObjetoAcceso();
    		$statement = $conexion->RetornarConsulta("UPDATE `estadisticasusuarios` SET `operaciones`=`operaciones`+1 WHERE `usuario`=?");

			$statement->bindParam(1,$usuario);

			if ($statement->execute()) {
				return TRUE;
			}
			else
				return FALSE;
		
		}

		public static function OperacionesUsuarios()
		{
			$conexion = AccesoDatos::dameUnObjetoAcceso();
    		$statement = $conexion->RetornarConsulta("SELECT * FROM `estadisticasusuarios` WHERE 1");

			if ($statement->execute()) {
				$usuarios = $statement->fetchall(PDO::FETCH_ASSOC);
				return $usuarios;
			}
			else
				return FALSE;
		}

		public static function LoginsUsuarios()
		{
			$conexion = AccesoDatos::dameUnObjetoAcceso();
    		$statement = $conexion->RetornarConsulta("SELECT * FROM `estadisticaslogin` WHERE 1");

			if ($statement->execute()) {
				$usuarios = $statement->fetchall(PDO::FETCH_ASSOC);
				return $usuarios;
			}
			else
				return FALSE;
		}

	//--------------------------------------------------------------------------------//    
 
}


?>