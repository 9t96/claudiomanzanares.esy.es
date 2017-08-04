
<?php
session_start();

if(isset($_SESSION["user"]))
{
	header('location:userPage.php');
}
else if (isset($_SESSION["admin"]))
{
	header('location:adminPage.php');	
}
else
	header("login.php");
?>
