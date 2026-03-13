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
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collections` (
  `collection_id` int NOT NULL AUTO_INCREMENT,
  `workspace_id` int NOT NULL,
  `collection_name` varchar(150) NOT NULL,
  `collection_description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_id`),
  KEY `fk_collection_workspace` (`workspace_id`),
  CONSTRAINT `fk_collection_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspaces` (`workspace_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
INSERT INTO `collections` VALUES (82,128,'Test Collection','Collection for requests','2025-10-10 14:37:01'),(85,133,'Test Collection','Collection for requests','2025-10-10 14:55:10'),(98,159,'Dev','','2025-10-28 15:13:40'),(99,159,'Testing','','2025-10-28 15:13:59'),(100,160,'Testing','','2025-10-28 15:38:33'),(101,160,'Test cases 45','','2025-10-28 15:38:43'),(102,161,'Dev','','2025-10-28 18:22:19'),(103,161,'Testing','','2025-10-28 22:56:28'),(109,172,'Cheking','','2025-10-29 14:40:43'),(110,175,'Default Collection','Auto-created collection for your workspace','2025-10-29 14:52:58'),(113,176,'follows','','2025-10-29 15:24:30'),(114,177,'Default Collection','Auto-created collection for your workspace','2025-10-29 16:52:50'),(115,178,'Default Collection','Auto-created collection for your workspace','2025-10-29 16:55:11'),(116,179,'Default Collection','Auto-created collection for your workspace','2025-10-29 20:05:49'),(117,179,'Tests','','2025-10-29 20:07:04'),(118,180,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:13:58'),(119,181,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:17:10'),(120,182,'Tests@','','2025-10-29 21:18:47'),(121,183,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:23:55'),(122,184,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:26:03'),(123,185,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:28:59'),(124,186,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:30:26'),(125,187,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:32:43'),(126,188,'Default Collection','Auto-created collection for your workspace','2025-10-29 21:35:39'),(129,189,'Default','','2025-10-29 22:28:23'),(130,189,'test','','2025-10-29 22:29:20'),(131,190,'Default Collection','Auto-created collection for your workspace','2025-11-06 19:46:22'),(132,191,'thes2','','2025-11-06 19:56:06'),(133,192,'Default Collection','Auto-created collection for your workspace','2025-11-07 16:39:12'),(134,192,'Testing','','2025-11-07 16:41:21');
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
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
