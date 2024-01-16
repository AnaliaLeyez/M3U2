-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-01-2024 a las 18:57:55
-- Versión del servidor: 8.0.35
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fotografia_profesional`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subtitulo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cuerpo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `img_id`, `subtitulo`, `cuerpo`) VALUES
(4, 'Casamiento de Gabi y Clau!', 'po75np7mcy6bjercse4c', 'Fotografiamos el evento en un salón en Tigre con 150 invitados.', 'Podes ver todas las fotos en nuestro Instagram'),
(5, 'Los 15 de Jose', 'n7lpyr66hn5erk3lfhvm', 'Así empezaba...', 'una noche única para Jose.'),
(6, 'Bautismo', 'ktbplnlvf7yg9wkd3lvo', 'Bautismo de Benja', 'Evento, Diciembre 2022'),
(7, 'Día de la primavera', 'sdjbup2dczc0g7mzdchg', 'Floreciendo', 'Feliz día!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ultimos_trabajos`
--

DROP TABLE IF EXISTS `ultimos_trabajos`;
CREATE TABLE IF NOT EXISTS `ultimos_trabajos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subtitulo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img_principal_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img_1_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img_2_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img_3_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ultimos_trabajos`
--

INSERT INTO `ultimos_trabajos` (`id`, `titulo`, `subtitulo`, `img_principal_id`, `img_1_id`, `img_2_id`, `img_3_id`) VALUES
(1, 'Casamiento de Jose y Clau', 'Evento del 8 de diciembre de 2022 en Tigre', 'j6v7vylrrtvujkhmfmfp', 'pyiwya3zabagazuxhrkt', 'bbvwafajjlmbadfhg8mt', NULL),
(2, 'Casamiento de Gabi y Luca', 'Boda celebrada el 11 de marzo de 2023', 'ywrbxe4ksxpop7l8kmcj', 'sfjcun5or7sf6rdnl1ii', 'b192vk4tsygxglcrnifx', 'iargdanp9a11uevat2pm'),
(3, 'Los 15 de Jose', 'Cumple de 15 festejado el 18 de marzo de 2023', 'thohspyri2osqh1j7rkp', 'tadtf4evh5n7fvepzqui', 'vkcebfrpisnvnrxfkjbz', 'e9f0u3b2ch9nq3el55hc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'analia', '827ccb0eea8a706c4c34a16891f84e7b'),
(2, 'maria', '01cfcd4f6b8770febfb40cb906715822'),
(3, 'flavia', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
