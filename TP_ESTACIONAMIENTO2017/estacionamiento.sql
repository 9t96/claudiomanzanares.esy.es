-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2017 a las 00:09:41
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `estacionamiento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cocheralive`
--

CREATE TABLE `cocheralive` (
  `id` int(255) NOT NULL,
  `patente` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `marca` varchar(20) DEFAULT NULL,
  `entrada` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `cocheralive`
--

INSERT INTO `cocheralive` (`id`, `patente`, `color`, `marca`, `entrada`) VALUES
(18, 'aaa111', 'rojo', 'Mazda ', '2017-07-03 20:19:12.000000'),
(20, 'uno234', 'Red', 'Maserattu', '2017-07-06 15:36:01.000000'),
(21, 'aaa555', 'rojo', 'ferrario', '2017-07-06 15:56:30.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresos`
--

CREATE TABLE `egresos` (
  `color` varchar(20) NOT NULL,
  `patente` varchar(10) NOT NULL,
  `marca` varchar(15) NOT NULL,
  `entrada` datetime(6) NOT NULL,
  `salida` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `egresos`
--

INSERT INTO `egresos` (`color`, `patente`, `marca`, `entrada`, `salida`) VALUES
('Amarillo', 'abf126', 'Ford', '2017-06-19 10:34:47.000000', '2017-06-19 10:40:27.000000'),
('mezcla', 'aaayyy555', 'chrevolethigh', '2017-06-24 16:23:12.000000', '2017-06-24 16:52:42.000000'),
('azul', 'abe125', 'Chevrolet', '2017-06-19 10:34:30.000000', '2017-06-24 16:54:00.000000'),
('rojo', 'abd124', 'VolskWagen', '2017-06-19 10:34:11.000000', '2017-06-25 15:37:08.000000'),
('amarillo', 'eee555', 'Mazda', '2017-06-25 15:41:14.000000', '2017-06-25 15:42:06.000000'),
('verde', 'ddd444', 'ford', '2017-06-25 15:40:59.000000', '2017-06-25 15:43:07.000000'),
('negro', 'ccc333', 'chevrolet', '2017-06-25 15:40:50.000000', '2017-06-25 15:44:32.000000'),
('blanco', 'bbb222', 'Ferrari', '2017-06-25 15:40:36.000000', '2017-06-25 15:45:33.000000'),
('rojo', 'aaa111', 'VW', '2017-06-25 15:40:17.000000', '2017-06-25 15:48:38.000000'),
('rertert', '44545gfgf', 'fghfghsdg', '2017-06-25 15:49:18.000000', '2017-06-25 15:49:49.000000'),
('fghfgh', '5555gh', 'fghfgh', '2017-06-25 15:49:11.000000', '2017-06-25 15:51:47.000000'),
('BBBB', 'ccccccc', 'AAAAA', '2017-06-25 15:54:00.000000', '2017-06-25 15:54:03.000000'),
('sdfsdf', 'sdfsdf', 'sfsdf', '2017-06-25 15:53:50.000000', '2017-06-25 15:58:14.000000'),
('fgdfgdfg', 'b555555', 'dfgd', '2017-06-25 15:59:40.000000', '2017-06-25 15:59:48.000000'),
('sdfsdf', 'vvvvvv', 'sdfsdf', '2017-06-25 15:59:46.000000', '2017-06-25 16:00:48.000000'),
('asdfasdf', 'asdf', 'safdasdf', '2017-06-25 16:01:46.000000', '2017-06-25 16:01:48.000000'),
('gdfgdfg', 'dfgdfgdfg', 'dfgdf', '2017-06-25 16:01:41.000000', '2017-06-25 16:04:56.000000'),
('gjfgfgjh', 'jjjj', 'fgjh', '2017-06-25 16:05:34.000000', '2017-06-25 16:05:38.000000'),
('gjfg', 'fgjhfgjh', 'fgjhfgghfjgfj', '2017-06-25 16:05:28.000000', '2017-06-25 16:06:01.000000'),
('Castaño', 'roj942', 'Mazda', '2017-07-03 20:18:43.000000', '2017-07-06 15:36:22.000000'),
('hjfgjh', 'fgjhfg', 'fgjhfg', '2017-06-25 16:05:24.000000', '2017-07-06 15:36:54.000000'),
('Azul', 'bbb222', 'Ferrari', '2017-07-03 20:19:23.000000', '2017-07-06 15:56:50.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticaslogin`
--

CREATE TABLE `estadisticaslogin` (
  `usuario` varchar(20) NOT NULL,
  `horalogin` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estadisticaslogin`
--

INSERT INTO `estadisticaslogin` (`usuario`, `horalogin`) VALUES
('user1', '2017-06-11 16:31:13.000000'),
('user1', '2017-06-11 16:32:10.000000'),
('user1', '2017-06-11 16:33:42.000000'),
('user1', '2017-06-11 16:35:59.000000'),
('user1', '2017-06-11 16:37:00.000000'),
('user1', '2017-06-11 16:37:53.000000'),
('user1', '2017-06-11 16:38:13.000000'),
('user1', '2017-06-11 16:39:15.000000'),
('user1', '2017-06-11 16:49:54.000000'),
('user1', '2017-06-11 16:52:08.000000'),
('user1', '2017-06-11 16:53:13.000000'),
('user1', '2017-06-24 16:18:15.000000'),
('user1', '2017-06-24 16:20:01.000000'),
('user1', '2017-06-24 16:20:42.000000'),
('user1', '2017-06-24 16:21:55.000000'),
('user1', '2017-06-24 16:22:49.000000'),
('user1', '2017-06-25 15:36:51.000000'),
('user1', '2017-06-25 17:30:00.000000'),
('user1', '2017-07-03 12:40:21.000000'),
('user1', '2017-07-03 20:06:31.000000'),
('user1', '2017-07-03 20:18:56.000000'),
('user1', '2017-07-04 15:02:14.000000'),
('user1', '2017-07-04 17:03:54.000000'),
('user1', '2017-07-04 17:06:08.000000'),
('user1', '2017-07-04 17:06:52.000000'),
('user1', '2017-07-04 17:08:07.000000'),
('user1', '2017-07-04 17:14:54.000000'),
('user1', '2017-07-04 17:17:23.000000'),
('user1', '2017-07-04 17:17:45.000000'),
('user1', '2017-07-04 17:21:04.000000'),
('user1', '2017-07-04 17:33:31.000000'),
('user1', '2017-07-04 17:49:01.000000'),
('user1', '2017-07-04 17:57:10.000000'),
('user1', '2017-07-04 18:05:01.000000'),
('user1', '2017-07-04 23:00:18.000000'),
('user1', '2017-07-04 23:03:21.000000'),
('user1', '2017-07-04 23:06:58.000000'),
('user1', '2017-07-04 23:07:03.000000'),
('user2', '2017-07-04 23:15:42.000000'),
('user1', '2017-07-04 23:16:38.000000'),
('user1', '2017-07-04 23:22:35.000000'),
('user1', '2017-07-04 23:35:55.000000'),
('user1', '2017-07-04 23:38:41.000000'),
('user1', '2017-07-05 09:49:34.000000'),
('user1', '2017-07-05 09:50:35.000000'),
('user1', '2017-07-05 10:01:53.000000'),
('user1', '2017-07-05 10:02:24.000000'),
('user2', '2017-07-05 10:10:26.000000'),
('user1', '2017-07-05 10:16:23.000000'),
('user1', '2017-07-05 10:17:31.000000'),
('user1', '2017-07-05 10:22:26.000000'),
('user1', '2017-07-05 10:25:22.000000'),
('user1', '2017-07-05 10:28:54.000000'),
('user1', '2017-07-05 10:31:50.000000'),
('user1', '2017-07-05 10:34:57.000000'),
('user1', '2017-07-05 10:37:18.000000'),
('user1', '2017-07-05 10:42:50.000000'),
('user1', '2017-07-05 10:43:59.000000'),
('user1', '2017-07-05 10:49:25.000000'),
('user1', '2017-07-05 10:50:07.000000'),
('user1', '2017-07-05 10:50:29.000000'),
('asdads', '2017-07-05 10:51:04.000000'),
('asd', '2017-07-05 10:51:33.000000'),
('dfgd', '2017-07-05 10:51:48.000000'),
('fgh', '2017-07-05 10:52:47.000000'),
('sdf', '2017-07-05 10:55:23.000000'),
('user1', '2017-07-05 10:56:23.000000'),
('user1', '2017-07-05 10:56:37.000000'),
('user1', '2017-07-05 10:58:17.000000'),
('user2', '2017-07-05 10:59:25.000000'),
('user1', '2017-07-05 11:02:11.000000'),
('user1', '2017-07-05 11:02:22.000000'),
('user1', '2017-07-05 11:02:40.000000'),
('user1', '2017-07-05 11:09:42.000000'),
('user1', '2017-07-05 11:10:10.000000'),
('user1', '2017-07-05 11:14:17.000000'),
('user1', '2017-07-06 15:19:23.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `turno` int(4) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `estado` int(2) NOT NULL,
  `rol` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `password`, `turno`, `nombre`, `apellido`, `estado`, `rol`) VALUES
('user1', '111', 1, 'Juan', 'Perez', 1, 1),
('user2', '222', 2, 'Martina', 'Sanchez', 1, 1),
('admin', 'admin1', 1, 'Juan', 'Frias', 1, 2),
('user3', '333', 3, 'juanjo', 'dequilmes', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cocheralive`
--
ALTER TABLE `cocheralive`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cocheralive`
--
ALTER TABLE `cocheralive`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
