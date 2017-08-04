<?php
class Estacionamiento
{

	//--------------------------------------------------------------------------------//
	//--METODOS DE CLASE

	public static function DameTodasLasCocheras()
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM `cocheras` WHERE 1");

		if ($statement->execute()) {

			$cocheras = $statement->fetchall(PDO::FETCH_ASSOC);	

			return $cocheras;	
		}
		else
			return "error";
	}


	public static function DameUnaCochera($tipo)
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT `piso`, `lugar`, `discapacitado` FROM `cocheras` WHERE discapacitado = ? AND estado = 0");

		$statement->bindParam(1,$tipo);

		if ($statement->execute()) {
			
			if ($statement->rowCount() !== 0) {
				
				$cocheras = $statement->fetchall(PDO::FETCH_ASSOC);
				
				if (Estacionamiento::ActualizarEstado($cocheras[0],1)) {
					return $cocheras[0];
				}
				else
					return "error";
				
			}
			else
				return "full";
			
		}
		else
			
			return "error";
	
	}

	public static function DameCocheraDeEstePiso($piso)
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM `cocheras` WHERE piso = :piso AND estado = 0");

		$statement->bindParam(':piso',$piso);

		if ($statement->execute()) {
			
			 $cocheras = $statement->fetchall();

			 return $cocheras;
		}

		return FALSE;
	}

	public static function ActualizarEstado($cochera,$estado)
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("UPDATE `cocheras` SET `estado`= ?,`utilizada`=`utilizada`+1 WHERE `piso`=? AND `lugar`=?");

		$statement->bindParam(1,$estado);
		$statement->bindParam(2,$cochera['piso']);
		$statement->bindParam(3,$cochera['lugar']);

		if ($statement->execute()) {
			return TRUE;
		}
		else
			return FALSE;
	}

	public static function CocheraMasUtilizada()
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM  `cocheras` where utilizada = (SELECT max(utilizada) FROM  cocheras)");

		if ($statement->execute()) {
			$masUtilizada = $statement->fetchall(PDO::FETCH_ASSOC);

			return $masUtilizada;

		}
		else
			return FALSE;
	}

	public static function CocheraMenosUtilizada()
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM `cocheras` where utilizada = (SELECT min(NULLIF(`utilizada`, 0)) FROM cocheras)");

		if ($statement->execute()) {
			$menosUtilizada = $statement->fetchall(PDO::FETCH_ASSOC);

			return $menosUtilizada;

		}
		else
			return FALSE;
	}
	

	public static function CocheraNoUtilizada()
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM  `cocheras` where utilizada = 0");

		if ($statement->execute()) {
			$noUtilizada = $statement->fetchall(PDO::FETCH_ASSOC);

			return $noUtilizada;

		}
		else
			return FALSE;
	}
	

	//--------------------------------------------------------------------------------//
}

?>