<?php


class Empleado
{
	//--------------------------------------------------------------------------------//
	//--ATRIBUTOS
		
		private $apellido;
		private $nombre;
		private $turno;
		private $estado; 
		private static $cantOperaciones;
	//--------------------------------------------------------------------------------//

	//--------------------------------------------------------------------------------//
	//--GETTERS Y SETTERS
		public function GetApellido()
		{
			return $this->apellido;
		}
		public function GetNombre()
		{
			return $this->nombre;
		}
		public function GetTurno()
		{
			return $this->turno;
		}

		public function GetEstado($valor)
		{
			return $this->estado;
		}

		public function SetApellido($valor)
		{
			$this->apellido = $valor;
		}
		public function SetNombre($valor)
		{
			$this->nombre = $valor;
		}
		public function SetTurno($valor)
		{
			$this->turno = $valor;
		}
		public function SetEstado($valor)
		{
			$this->estado = $valor;
		}
	//--------------------------------------------------------------------------------//
	//--CONSTRUCTOR
		public function __construct($apellido=NULL, $nombre=NULL, $turno=NULL, $estado = NULL)
		{
			if($apellido !== NULL && $nombre !== NULL && $turno !== NULL && $turno !== NULL){
				$this->apellido = $apellido;
				$this->nombre = $nombre;
				$this->turno = $turno;
				$this->estado = $estado;
			}
		}

	//--------------------------------------------------------------------------------//
	//--TOSTRING	
		public function ToString()
		{
			return $this->apellido." - ".$this->nombre." - ".$this->turno."-".$this->estado.  "\r\n";
		}
	//--------------------------------------------------------------------------------//

	//--------------------------------------------------------------------------------//
	//--METODOS DE CLASE

		public static function ExisteUsuario()
		{	
			$existe = FALSE;

			$conexion = AccesoDatos::dameUnObjetoAcceso();
			$statement = $conexion->RetornarConsulta("SELECT * FROM `usuarios` WHERE 1");

			if ($statement->execute()) {	

				$data = $statement->fetchall();

				foreach ($data as $value) {		
					
					if ($value["usuario"] == $user && $value["password"] == $pass) {
						$existe = TRUE;
						break;
					}
				}	
			}

			return $existe;
		}

		public static function NuevoEmpleado($empleado)
		{	
			$exito = FALSE;
			
			if (!Empleado::UsuarioYaRegistrado($empleado['nombre'],$empleado['apellido'])) {
			
				$conexion = AccesoDatos::dameUnObjetoAcceso();	
				$statement = $conexion->RetornarConsulta("INSERT INTO `usuarios`(`usuario`, `password`, `turno`, `nombre`, `apellido`, `estado`, `rol`) 
																VALUES (:usuario,:pass,:turno,:nombre,:apellido,1,:rol)");

				$statement->bindParam(':usuario',$empleado['usuario']);
				$statement->bindParam(':pass',$empleado['password']);
				$statement->bindParam(':turno',$empleado['turno']);
				$statement->bindParam(':nombre',$empleado['nombre']);
				$statement->bindParam(':apellido',$empleado['apellido']);
				$statement->bindParam(':rol',$empleado['rol']);


				if ($statement->execute()) {	
					$exito = TRUE;
				}
			}

			return $exito;
		}

		public static function UsuarioYaRegistrado($nombre,$apellido)
		{
			$existe = FALSE;

			$conexion = AccesoDatos::dameUnObjetoAcceso();
			$statement = $conexion->RetornarConsulta("SELECT * FROM `usuarios` WHERE 1");

			if ($statement->execute()) {	

				$data = $statement->fetchall();

				foreach ($data as $value) {		
					
					if ($value["nombre"] == $nombre && $value["apellido"] == $apellido) {
						$existe = TRUE;
						break;
					}
				}	
			}

			return $existe;
		}

		public static function DameEsteEmpleado($nombre,$apellido)
		{
			$coincidencias = NULL;

			$conexion = AccesoDatos::dameUnObjetoAcceso();
			$statement = $conexion->RetornarConsulta("SELECT `usuario`, `turno`, `nombre`, `apellido`, `estado`, `rol` FROM `usuarios` WHERE nombre = :nombre AND apellido = :apellido");

			$statement->bindParam(':nombre',$nombre);
			$statement->bindParam(':apellido',$apellido);

			if ($statement->execute()) {	

				$coincidencias = $statement->fetchall(PDO::FETCH_ASSOC);
			}

			return $coincidencias;
		}

		public static function ActualizarEstado($usuario,$estado)
		{
			$succes = "error";

			$conexion = AccesoDatos::dameUnObjetoAcceso();
			
			if ($estado == 1) {
				$query = "UPDATE `usuarios` SET `estado`= 2 WHERE `usuario` = :usuarioToUpdate";
			}
			else
				$query = "UPDATE `usuarios` SET `estado`= 1 WHERE `usuario` = :usuarioToUpdate";
			
			$statement = $conexion->RetornarConsulta($query);
			$statement->bindParam(':usuarioToUpdate',$usuario);

			if ($statement->execute()) {	
				$succes = "ok";
			}

			return $succes;
		}

		public static function TraerToodosLosEmpleados()
		{
			$empleados = NULL;

			$conexion = AccesoDatos::dameUnObjetoAcceso();	
			
			$statement = $conexion->RetornarConsulta("SELECT `usuario`,`turno`, `nombre`, `apellido`, `estado`, `rol` FROM `usuarios` WHERE 1");

			if ($statement->execute()) {
				
				$empleados = $statement->fetchall(PDO::FETCH_ASSOC);
			}

			return $empleados;
		}

		public static function EliminarEmpleado($nombre,$apellido)
		{
			$succes = "error";

			$conexion = AccesoDatos::dameUnObjetoAcceso();	
			
			$statement = $conexion->RetornarConsulta("DELETE FROM `usuarios` WHERE `nombre` = :nombre AND `apellido` = :apellido");

			$statement->bindParam(':nombre',$nombre);
			$statement->bindParam(':apellido',$apellido);

			if ($statement->execute()) {
				
				$succes = "ok";
			}

			return $succes;
		}
	//--------------------------------------------------------------------------------//
}


?>
