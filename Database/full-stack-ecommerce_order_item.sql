CREATE DATABASE  IF NOT EXISTS `full-stack-ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `full-stack-ecommerce`;


DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(19,2) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `K_order_id` (`order_id`),
  KEY `FK_product_id` (`product_id`),
  CONSTRAINT `FK_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `order_item` WRITE;

INSERT INTO `order_item` VALUES (7,'assets/images/products/phone/phone-10.jpg',1,379.99,8,30),(8,'assets/images/products/phone/phone-09.jpg',1,524.90,8,29),(9,'assets/images/products/tv/tv-02.jpg',1,2899.99,9,2),(10,'assets/images/products/phone/phone-02.jpg',1,267.99,9,22);

UNLOCK TABLES;
