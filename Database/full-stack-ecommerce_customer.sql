CREATE DATABASE  IF NOT EXISTS `full-stack-ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `full-stack-ecommerce`;

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `customer` WRITE;

INSERT INTO `customer` VALUES (8,'stephane','Dongmo','stephane.mbameur@yahoo.fr'),(9,'stephane','Dongmo','stephane.mbameur@yahoo.fr');

UNLOCK TABLES;

