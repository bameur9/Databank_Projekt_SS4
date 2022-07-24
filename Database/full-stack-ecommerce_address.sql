CREATE DATABASE  IF NOT EXISTS `full-stack-ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `full-stack-ecommerce`;


DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




LOCK TABLES `address` WRITE;

INSERT INTO `address` VALUES (7,'Bremen','Germany','Bremen','bremer 23','28219'),(8,'Bremen','Germany','Bremen','bremer 23','28219'),(9,'Bremen',NULL,NULL,'123 Street','28882'),(10,'Bremen',NULL,NULL,'123 Street','28882'),(11,'Bremen','Germany','Baden-Württemberg','123 Street','28882'),(12,'Bremen','Germany','Baden-Württemberg','123 Street','28882'),(13,'Bremen','Germany','Bremen','bremer 23','28219'),(14,'Bremen','Germany','Bremen','bremer 23','28219'),(15,'Bremen','Germany','Bremen','123 Street','28219'),(16,'Bremen','Germany','Bremen','123 Street','28219'),(17,'Bremen','Germany','Bremen','123 Street','28882'),(18,'Bremen','Germany','Bremen','123 Street','28882');

UNLOCK TABLES;

