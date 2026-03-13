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
-- Table structure for table `workspaces`
--

DROP TABLE IF EXISTS `workspaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspaces` (
  `workspace_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_by` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`workspace_id`),
  KEY `fk_workspace_user` (`created_by`),
  CONSTRAINT `fk_workspace_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspaces`
--

LOCK TABLES `workspaces` WRITE;
/*!40000 ALTER TABLE `workspaces` DISABLE KEYS */;
INSERT INTO `workspaces` VALUES (104,'My Workspace','Test workspace',1,'2025-10-10 14:01:44'),(127,'Jest Workspace','Workspace for testing collections',1,'2025-10-10 14:37:00'),(128,'Test Workspace','Workspace for requests testing',1,'2025-10-10 14:37:01'),(131,'Env Workspace','Workspace for environment tests',1,'2025-10-10 14:37:03'),(132,'Jest Workspace','Workspace for testing collections',1,'2025-10-10 14:55:10'),(133,'Test Workspace','Workspace for requests testing',1,'2025-10-10 14:55:10'),(135,'Env Workspace','Workspace for environment tests',1,'2025-10-10 14:55:12'),(158,'Default Workspace','Auto-created workspace',89,'2025-10-28 14:01:18'),(159,'Default Workspace','Auto-created workspace',90,'2025-10-28 15:09:34'),(160,'Test',NULL,90,'2025-10-28 15:38:21'),(161,'Default Workspace','Auto-created workspace',91,'2025-10-28 18:21:43'),(171,'Default Workspace','Auto-created workspace',96,'2025-10-29 14:37:47'),(172,'Default Workspace','Auto-created workspace',97,'2025-10-29 14:38:17'),(173,'Default Workspace','Auto-created workspace',98,'2025-10-29 14:43:08'),(174,'Default Workspace','Auto-created workspace for new user',99,'2025-10-29 14:50:36'),(175,'Default Workspace','Auto-created workspace for new user',100,'2025-10-29 14:52:58'),(176,'Testers',NULL,100,'2025-10-29 15:24:22'),(177,'Default Workspace','Auto-created workspace for new user',101,'2025-10-29 16:52:50'),(178,'Default Workspace','Auto-created workspace for new user',102,'2025-10-29 16:55:11'),(179,'Default Workspace','Auto-created workspace for new user',103,'2025-10-29 20:05:49'),(180,'Default Workspace','Auto-created workspace for new user',104,'2025-10-29 21:13:58'),(181,'Default Workspace','Auto-created workspace for new user',105,'2025-10-29 21:17:10'),(182,'test',NULL,105,'2025-10-29 21:18:22'),(183,'Default Workspace','Auto-created workspace for new user',106,'2025-10-29 21:23:55'),(184,'Default Workspace','Auto-created workspace for new user',107,'2025-10-29 21:26:03'),(185,'Default Workspace','Auto-created workspace for new user',108,'2025-10-29 21:28:59'),(186,'Default Workspace','Auto-created workspace for new user',109,'2025-10-29 21:30:26'),(187,'Default Workspace','Auto-created workspace for new user',110,'2025-10-29 21:32:43'),(188,'Default Workspace','Auto-created workspace for new user',111,'2025-10-29 21:35:39'),(189,'Dev',NULL,111,'2025-10-29 22:23:51'),(190,'Default Workspace','Auto-created workspace for new user',112,'2025-11-06 19:46:22'),(191,'testing',NULL,112,'2025-11-06 19:55:58'),(192,'Default Workspace','Auto-created workspace for new user',113,'2025-11-07 16:39:12');
/*!40000 ALTER TABLE `workspaces` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-12 13:03:46
