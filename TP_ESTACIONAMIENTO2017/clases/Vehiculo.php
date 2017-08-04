<?php
date_default_timezone_set("America/Argentina/Buenos_Aires");
class Vehiculo
{
    //--------------------------------------------------------------------------------//
//--ATRIBUTOS
	private $patente;
 	private $color;
  	private $marca;
	private $entrada; 
    private $salida;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
	public function GetPatente()
	{
		return $this->patente;
	}
	public function GetColor()
	{
		return $this->color;
	}
	public function GetMarca()
	{
		return $this->marca;
	}

    public function GetSalida()
	{
		return $this->saldia;
	}

	public function GetEntrada($valor)
	{
		return $this->entrada;
	}

	public function SetPatente($valor)
	{
		$this->patente = $valor;
	}
	public function Setcolor($valor)
	{
		$this->color = $valor;
	}
	public function SetMarca($valor)
	{
		$this->marca = $valor;
	}

	public function SetEntrada($valor)
	{
		$this->entrada = $valor;
	}

    public function SetSalida($valor)
	{
		$this->salida = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($patente=NULL, $color=NULL, $marca=NULL, $entrada = NULL, $salida = NULL)
	{
		if($patente !== NULL && $color !== NULL && $marca !== NULL && $entrada !== NULL && $salida !== NULL){
			
            $this->patente = $patente;
			$this->color = $color;
			$this->marca = $marca;
			$this->entrada = $entrada;
            $this->salida = $salida;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->patente." - ".$this->color." - ".$this->marca."-".$this->entrada."-".$this->salida."\r\n";
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODOS DE CLASE

	/*  FUNCIONAAA!!
	* Ingresa un auto en la chochera.
	*/
	/*  FUNCIONAAA!!
	* Ingresa un auto en la chochera.
	*/
	public static function IngresarAuto($autoIngresando)
    {	
		$hoyAhora = date("Y-m-d H:i:s"); 

		if ($autoIngresando !== NULL) {
			
			$conexion = AccesoDatos::dameUnObjetoAcceso();
			$statement = $conexion->RetornarConsulta("INSERT INTO cocheralive (`patente`, `color`, `marca`, `entrada`,`piso`,`lugar`) VALUES (?,?,?,?,?,?)");

			$statement->bindParam(1,$autoIngresando["patente"]);
			$statement->bindParam(2,$autoIngresando["color"]);
			$statement->bindParam(3,$autoIngresando["marca"]);
			$statement->bindParam(4,$hoyAhora);
			$statement->bindParam(5,$autoIngresando["piso"]);
			$statement->bindParam(6,$autoIngresando["lugar"]);
	
			if ($statement->execute()) {
				
				if (Estacionamiento::ActualizarEstado($autoIngresando,1)) 
					$rta = "ok";
				else
					$rta = "error";
			}
			else
				$rta =  "error";

			return $rta;
		}
		else
			return $cochera;
		
		
	}

	
	/*     FUNCIONAAA!!
	*	Remuve el auto de los estacionados y lo registra en la tabla de autos egresados.
	*/
    public static function EgresarAuto($id,$importe){	
		
		$succes = FALSE;
		
		if (isset($id)) {	
			
			$vehiculoaegresar = Vehiculo::DameUnAuto($id);
			
			if ($vehiculoaegresar !== NULL) {
				
				$conexion = AccesoDatos::dameUnObjetoAcceso();
				$statement = $conexion->RetornarConsulta("DELETE FROM cocheralive WHERE id=?");

				$statement->bindParam(1,$id);
				
				if($statement->execute()){   
				
					if (Vehiculo::RegistrarSalida($vehiculoaegresar,$importe) === TRUE && Estacionamiento::ActualizarEstado($vehiculoaegresar,0) === TRUE) {
						$succes = TRUE;
					}
				}	
			}
		}
		
		return $succes;
    }

	/*					FUNCIONA!!!
	*	Registra el auto que aca de salir en la tabla de los egresos.
	*/
	public static function RegistrarSalida($auto,$importe)
	{	
			$hoyAhora = date("Y-m-d H:i:s"); 

			$conexion = AccesoDatos::dameUnObjetoAcceso();
			$statement = $conexion->RetornarConsulta("INSERT INTO egresos (`color`, `patente`, `marca`, `entrada`, `salida`,`piso`,`lugar`,`pago`) VALUES (:color,:patente,:marca,:entrada,:salida,:piso,:lugar,:pago)");  

			$statement->bindParam(':color',$auto['color']);
			$statement->bindParam(':patente',$auto['patente']);
			$statement->bindParam(':marca',$auto['marca']);
			$statement->bindParam(':entrada',$auto['entrada']);
			$statement->bindParam(':salida',$hoyAhora);
			$statement->bindParam(':piso',$auto['piso']);
			$statement->bindParam(':lugar',$auto['lugar']);
			$statement->bindParam(':pago',$importe);
			

			if ($statement->execute()) {
				return TRUE;
			}
			else
				return FALSE;
	}

	/*     FUNCIONA!!!
	* Retorna el auto estacionado segun el id pasado.
	*/
		public static function DameUnAuto($id)
	{	
		$vehiculo = NULL;	
		
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM cocheralive WHERE id=?");  

		$statement->bindParam(1,$id);
		
		if($statement->execute()){   
			$vehiculo = $statement->fetchall(PDO::FETCH_ASSOC);	
		}
		else
			echo "error";

		return $vehiculo[0];	
	}

	/*          FUNCIONANDO!!
	* Devuelvue todos los autos estacionados en este momento.
	*/
	public static function TraerTodos()
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM `cocheralive`  WHERE 1");
		
		if($statement->execute()){       
			
			$autoslive = $statement->fetchall();

		}

		return $autoslive;
	}

	public static function DameAutoPorPatente($patente)
	{
		$vehiculo = NULL;	
		
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM cocheralive WHERE patente = ?");  

		$statement->bindParam(1,$patente);
		
		if($statement->execute()){   
			
			$vehiculo = $statement->fetchall(PDO::FETCH_ASSOC);	
		}
		else
			echo "error";

		return $vehiculo;	
	}

	public static function AutosEgresados()
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM egresos WHERE 1");
		
		if($statement->execute()){       
			
			$autoslive = $statement->fetchall(PDO::FETCH_ASSOC);

		}

		return $autoslive;
	}

	public static function DameAutoEgresadoPorPatente($patente)
	{
		$conexion = AccesoDatos::dameUnObjetoAcceso();
		$statement = $conexion->RetornarConsulta("SELECT * FROM egresos WHERE patente = ?");
		
		$statement->bindParam(1,$patente);

		if($statement->execute()){       
			
			$autoslive = $statement->fetchall(PDO::FETCH_ASSOC);

		}

		return $autoslive;
	}
//--------------------------------------------------------------------------------//
}

?>