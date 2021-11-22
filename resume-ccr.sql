CREATE TABLE IF NOT EXISTS usuarios (
`id_usuario` int(100) NOT NULL AUTO_INCREMENT,
`usuario` varchar(20) NOT NULL,      
`clave` varchar(20) NOT NULL,
`nombre` varchar(50) NOT NULL,      
`apellido` varchar(50) NOT NULL,          
PRIMARY KEY (`id_usuario`),
UNIQUE(usuario)   )


CREATE TABLE IF NOT EXISTS `items` (
  `id_item` int(100) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(100) NOT NULL,
  `fecha_item` varchar(20) NOT NULL,
  `desc_item` varchar(255) NOT NULL,
  PRIMARY KEY (`id_item`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

INSERT IGNORE INTO `usuarios` 
(`usuario`, `clave`, `nombre`, `apellido`) 
VALUES 
('guest', '1234', 'Guest', 'Welcome')
