CREATE DATABASE  IF NOT EXISTS `full-stack-ecommerce` 
USE `full-stack-ecommerce`;

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



LOCK TABLES `country` WRITE;

INSERT INTO `country` VALUES (1,'BR','Brazil'),(2,'CA','Canada'),(3,'DE','Germany'),(4,'IN','India'),(5,'TR','Turkey'),(6,'US','United States');

UNLOCK TABLES;


