-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: postman_clone_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `collection_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `method` enum('GET','POST','PUT','DELETE','PATCH','OPTIONS','HEAD') NOT NULL,
  `url` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`),
  KEY `fk_request_collection` (`collection_id`),
  CONSTRAINT `fk_request_collection` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`collection_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (67,101,'GET http://localhost:5000/api/users/1','GET','http://localhost:5000/api/users/1','2025-10-28 17:00:41'),(68,101,'GET http://localhost:5000/api/users/2','GET','http://localhost:5000/api/users/2','2025-10-28 17:15:07'),(69,101,'GET http://localhost:5000/api/users/4','GET','http://localhost:5000/api/users/4','2025-10-28 17:15:20'),(70,102,'GET http://localhost:5000/api/users/2','GET','http://localhost:5000/api/users/2','2025-10-28 18:29:50'),(71,102,'GET http://localhost:5000/api/users/90','GET','http://localhost:5000/api/users/90','2025-10-28 18:31:57'),(72,102,'GET http://localhost:5000/api/workspace','GET','http://localhost:5000/api/workspace','2025-10-28 20:57:53'),(73,102,'GET http://localhost:5000/api/workspaces','GET','http://localhost:5000/api/workspaces','2025-10-28 20:58:03'),(74,102,'GET http://localhost:5000/api/workspaces/all','GET','http://localhost:5000/api/workspaces/all','2025-10-28 20:58:12'),(75,102,'GET http://localhost:5000/api/workspaces/133','GET','http://localhost:5000/api/workspaces/133','2025-10-28 20:58:52'),(76,103,'GET http://localhost:5000/api/workspaces/all','GET','http://localhost:5000/api/workspaces/all','2025-10-28 22:56:37'),(77,103,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-10-28 23:39:41'),(82,110,'GET  http://localhost:5000/api/users/all','GET',' http://localhost:5000/api/users/all','2025-10-29 14:54:01'),(83,110,'GET  http://localhost:5000/api/environments','GET',' http://localhost:5000/api/environments','2025-10-29 15:18:34'),(84,110,'GET  http://localhost:5000/api/environments/all','GET',' http://localhost:5000/api/environments/all','2025-10-29 15:22:05'),(85,113,'GET  http://localhost:5000/api/environments/all','GET',' http://localhost:5000/api/environments/all','2025-10-29 15:24:39'),(86,113,'GET  http://localhost:5000/api/environments/90','GET',' http://localhost:5000/api/environments/90','2025-10-29 15:26:11'),(87,113,'GET  http://localhost:5000/api/workspaces/all','GET',' http://localhost:5000/api/workspaces/all','2025-10-29 15:26:45'),(88,113,'GET  http://localhost:5000/api/workspaces','GET',' http://localhost:5000/api/workspaces','2025-10-29 15:27:04'),(89,113,'GET  http://localhost:5000/api/enviroments/all','GET',' http://localhost:5000/api/enviroments/all','2025-10-29 15:29:50'),(90,113,'GET  http://localhost:5000/api/enviroments','GET',' http://localhost:5000/api/enviroments','2025-10-29 15:30:09'),(91,113,'GET http://localhost:5000/api/environment_variables','GET','http://localhost:5000/api/environment_variables','2025-10-29 16:06:50'),(92,114,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-10-29 16:55:56'),(93,115,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-10-29 16:56:19'),(94,115,'GET http://localhost:5000/api/environments/all','GET','http://localhost:5000/api/environments/all','2025-10-29 17:03:25'),(95,115,'GET http://localhost:5000/api/environments/175','GET','http://localhost:5000/api/environments/175','2025-10-29 17:05:45'),(96,115,'GET http://localhost:5000/api/environments/workspace/178','GET','http://localhost:5000/api/environments/workspace/178','2025-10-29 17:06:35'),(97,117,'GET  http://localhost:5000/api/users/all','GET',' http://localhost:5000/api/users/all','2025-10-29 20:08:59'),(98,126,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-10-29 21:47:20'),(99,126,'GET http://localhost:5000/api/workspaces/all','GET','http://localhost:5000/api/workspaces/all','2025-10-29 21:59:53'),(100,126,'GET http://localhost:5000/api/workspaces/178','GET','http://localhost:5000/api/workspaces/178','2025-10-29 22:00:53'),(101,126,'GET http://localhost:5000/api/workspaces/90','GET','http://localhost:5000/api/workspaces/90','2025-10-29 22:01:01'),(102,126,'GET http://localhost:5000/api/workspaces/104','GET','http://localhost:5000/api/workspaces/104','2025-10-29 22:01:35'),(103,126,'GET http://localhost:5000/api/collections/104','GET','http://localhost:5000/api/collections/104','2025-10-29 22:02:59'),(104,126,'GET http://localhost:5000/api/collections/all','GET','http://localhost:5000/api/collections/all','2025-10-29 22:03:15'),(105,130,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-10-29 22:29:44'),(106,130,'GET http://localhost:5000/api/users/','GET','http://localhost:5000/api/users/','2025-10-29 22:30:14'),(107,132,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-11-06 22:43:05'),(108,132,'POST http://localhost:5000/api/users','POST','http://localhost:5000/api/users','2025-11-06 22:45:22'),(109,133,'GET http://localhost:5000/api/users/all','GET','http://localhost:5000/api/users/all','2025-11-07 16:43:11');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-12 13:03:47
