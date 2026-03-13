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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test@example.com','12345','2025-09-28 22:25:19'),(2,'Tanmay','tanmay@example.com','5678987','2025-09-28 22:26:17'),(3,'Lakhshya','lakshya@example.com','124068','2025-09-28 22:26:48'),(4,'Shatrughna','shatrughna@example.com','124968','2025-09-28 22:27:33'),(5,'Shantanu','shtn@gmail.com','1234567','2025-10-06 18:48:09'),(82,'Avani','avani@example.com','$2b$10$163nHD3nIn0soAyw2k7VyetatQC/mLJXS7hmSPMa4evHmwj2jXpc.','2025-10-25 15:48:53'),(83,'Ohey jen','Ohy@gmail.com','$2b$10$aqb5xRBAQYJMQi/8x3guu.NnBfNS3wx7yKJcmwl0oqqE7D.EL32Q2','2025-10-25 19:50:13'),(84,'You','yu@example.com','$2b$10$7ckgckbwk9GOgmhdsdCeZeLvZ4IrQ2my3ZrJvih0wNYg2TEP9TD2C','2025-10-25 19:52:14'),(85,'Ohey jen','pass2@gmail.com','$2b$10$0phGMN0agNLOdSIUSwth7uRXwB.cwJmPm0b4tp9YF.gDfzwAcnn6y','2025-10-25 19:59:27'),(86,'Rehan','reh@gmail.com','$2b$10$jdenZ6rqvbK8u8jNYg9Mv.Z64lloOOQZ6C0Rs43bhPfjud8kzbCuS','2025-10-25 20:16:49'),(87,'yun yie','yun@gmail.com','$2b$10$4H2.bn8HZS5CRL7EXqMUq.DiBF9BYYRATB0tKnd/CGGcIo27WwMGS','2025-10-25 20:21:09'),(88,'jen','jen@gmail.com','$2b$10$dqJjLF475ZzKZCOEttWB/eWuNC8Fned//IMbkZFjmML3/hahK3Vqi','2025-10-26 15:30:54'),(89,'Yeon','yeon@gmail.com','$2b$10$5IDd.i1RIiAZYsRjTK8pO.7jRBKXgG2kicBXvXSo/NcnMvRUKicjy','2025-10-28 14:01:18'),(90,'Abhi','abhi@gmail.com','$2b$10$A4Ku5MyZl3bXDf/zBHGzq.TbTBvT59hNHm15lIvYyxbRj9L55OVF6','2025-10-28 15:09:34'),(91,'avani','av@gmail.com','$2b$10$c3ePdn/NGfrNqrwqypybSufBpoVmIEu049z8tChwvP0/VHgTmy8a6','2025-10-28 18:21:43'),(96,'abc','abc@gmail.com','$2b$10$3LoJPGVP6DrTwKPgZkq1Juq9NTxe87QYsKG.7NcCWI.UAX08JeHka','2025-10-29 14:37:47'),(97,'Rupal','rupal@gmail.com','$2b$10$0rZDrxebSCQQaMicdisjpepXfcoPV5euZRODHiYEuVbp9Zuj3CjzW','2025-10-29 14:38:17'),(98,'xyz this','xy@gmail.com','$2b$10$LI8Y8Fw8xra6pr1qvjySQOa.n7tUKan3gR/tD7BWrGqFmOcIwoZpC','2025-10-29 14:43:08'),(99,'fish','fish@gmail.com','$2b$10$y3gtccWz0/wpkDtEdOFQCeoDq4HA9yHg2hg3D5Qj.4npJatt9qURq','2025-10-29 14:50:36'),(100,'eon','eon@gmail.com','$2b$10$b3oRJJCTKxAgVELEMzQJL.hswChS.uoVV/6faEc.F6bW0tV2gvPgq','2025-10-29 14:52:58'),(101,'remote','remote@gmail.com','$2b$10$wsessjjVSwGNZKGVHxUWleBUnEm270OhCq/iFp.Dp9BncnBKeL1iO','2025-10-29 16:52:50'),(102,'remo','remo@gmail.com','$2b$10$zZQV5k0RTHWsZU/2PfVUGOed12BaZTUw..US5ZVM51s2Jzy.BDNNK','2025-10-29 16:55:11'),(103,'hens','hen@gmail.com','$2b$10$SwA50pigvD4UIijOr/DhfOkLgQQnFsm6uvw8tlvHPXy0LrLFzqu7S','2025-10-29 20:05:49'),(104,'hye','hye@gmail.com','$2b$10$QuKNPg8Zhhgwlshie0VKUe7aC4YZ6VY3F9RG6r4VjpzRq2BpKaC4S','2025-10-29 21:13:58'),(105,'yuh','yuh@gmail.com','$2b$10$zBqpnw.uz6nTpW1Bg5dwNOeikugBQHavxECgqNyRJySiXyjVEl.Oy','2025-10-29 21:17:10'),(106,'yash','yash@gmail.com','$2b$10$H10v8gpukircAjSIY5B/buE3REfVoHT4oqqNLAEFRsSMzPK/.qncW','2025-10-29 21:23:55'),(107,'yash67','ui@gmail.com','$2b$10$IC9SA7YiiBhFPY1GK32TW.0FN4e5knyfkxuJmhys.WQZIN747I9BO','2025-10-29 21:26:03'),(108,'usha','usha@gmail.com','$2b$10$DUkXEl1q6LAsZn30ySpJ1ugvuWRvenit5Twc7En053JuEV2.m1Mxy','2025-10-29 21:28:59'),(109,'isha','ish@gmail.com','$2b$10$yjzZsNN8H4ySPFrd5NVDsuf/aR6qC3Q2QGWP2TVIIDZaBhszM3I6C','2025-10-29 21:30:26'),(110,'yesh','ye@gmail.com','$2b$10$dY/pnNOu8.gTtkksX6eNveF7gRsuAFmUIbEHILnXTN0A6xuutm166','2025-10-29 21:32:43'),(111,'theon','th@gmail.com','$2b$10$bBkOXe772q3XuAWzDMJEFOokFlzfZK0RGgTZNfUWtCDA72XDzOdVK','2025-10-29 21:35:39'),(112,'hh','hh@gmail.com','$2b$10$mvWioHDhDn/GScbZ6cunFOaGFHupv7op6YCT3L1mf1unskd.Uo7L6','2025-11-06 19:46:22'),(113,'sea','sea@gmail.com','$2b$10$3UYjOGcC5a2sbWAoYFTH5.iNCgqJ7/5cDkGqbd6eLRal9QI02i1kK','2025-11-07 16:39:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-12 13:03:48
