CREATE DATABASE  IF NOT EXISTS `db_verotur` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_verotur`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: db_verotur
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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Categoria',7,'add_categorias'),(26,'Can change Categoria',7,'change_categorias'),(27,'Can delete Categoria',7,'delete_categorias'),(28,'Can view Categoria',7,'view_categorias'),(29,'Can add Ponto Turístico',8,'add_pontosturisticos'),(30,'Can change Ponto Turístico',8,'change_pontosturisticos'),(31,'Can delete Ponto Turístico',8,'delete_pontosturisticos'),(32,'Can view Ponto Turístico',8,'view_pontosturisticos'),(33,'Can add Senac',9,'add_senac'),(34,'Can change Senac',9,'change_senac'),(35,'Can delete Senac',9,'delete_senac'),(36,'Can view Senac',9,'view_senac');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$T64Bd4GnUslAlkec88BilP$WxQRcoU+9fALHga1q4i6ULgnLmwNe9cgmStf0NyETPs=','2026-01-28 23:17:56.718852',1,'fernando','','','',1,1,'2026-01-28 23:17:16.239343');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2026-01-28 23:18:26.786987','1','Igreja',1,'[{\"added\": {}}]',7,1),(2,'2026-01-28 23:33:55.958047','1','Catedral Metropolitana de Belém',1,'[{\"added\": {}}]',8,1),(3,'2026-01-28 23:35:04.168860','2','Praça',1,'[{\"added\": {}}]',7,1),(4,'2026-01-28 23:35:49.597228','3','Praia',1,'[{\"added\": {}}]',7,1),(5,'2026-01-28 23:57:48.450561','4','Culturais',1,'[{\"added\": {}}]',7,1),(6,'2026-01-28 23:58:06.437970','2','Centur',2,'[{\"changed\": {\"fields\": [\"Categoria\"]}}]',8,1),(7,'2026-01-28 23:58:41.909777','3','Estação das Docas',2,'[{\"changed\": {\"fields\": [\"Categoria\"]}}]',8,1),(8,'2026-01-29 00:08:49.130324','1','Igrejas',2,'[{\"changed\": {\"fields\": [\"Nome\", \"Nome [pt-br]\", \"Nome [en]\", \"Nome [es]\"]}}]',7,1),(9,'2026-01-29 00:09:28.683294','3','Ilhas',2,'[{\"changed\": {\"fields\": [\"Nome\", \"Nome [pt-br]\"]}}]',7,1),(10,'2026-01-29 00:11:32.167223','4','Prédios Históricos',2,'[{\"changed\": {\"fields\": [\"Nome\", \"Nome [pt-br]\"]}}]',7,1),(11,'2026-01-29 00:11:52.463356','2','Praças',2,'[{\"changed\": {\"fields\": [\"Nome\", \"Nome [pt-br]\", \"Nome [en]\", \"Nome [es]\"]}}]',7,1),(12,'2026-01-29 00:12:10.752187','5','Museus',1,'[{\"added\": {}}]',7,1),(13,'2026-01-29 00:13:41.920351','6','Terminais',1,'[{\"added\": {}}]',7,1),(14,'2026-01-29 00:14:28.248757','7','Shoppings',1,'[{\"added\": {}}]',7,1),(15,'2026-01-29 00:17:35.758958','8','Parques',1,'[{\"added\": {}}]',7,1),(16,'2026-01-29 00:17:53.687381','9','Atrações',1,'[{\"added\": {}}]',7,1),(17,'2026-01-29 00:18:10.966789','10','Restaurantes',1,'[{\"added\": {}}]',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(7,'veroturApp','categorias'),(8,'veroturApp','pontosturisticos'),(9,'veroturApp','senac');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-01-28 23:13:11.950841'),(2,'auth','0001_initial','2026-01-28 23:13:13.602385'),(3,'admin','0001_initial','2026-01-28 23:13:13.939162'),(4,'admin','0002_logentry_remove_auto_add','2026-01-28 23:13:13.950395'),(5,'admin','0003_logentry_add_action_flag_choices','2026-01-28 23:13:13.960007'),(6,'contenttypes','0002_remove_content_type_name','2026-01-28 23:13:14.207844'),(7,'auth','0002_alter_permission_name_max_length','2026-01-28 23:13:14.357999'),(8,'auth','0003_alter_user_email_max_length','2026-01-28 23:13:14.389602'),(9,'auth','0004_alter_user_username_opts','2026-01-28 23:13:14.400605'),(10,'auth','0005_alter_user_last_login_null','2026-01-28 23:13:14.519962'),(11,'auth','0006_require_contenttypes_0002','2026-01-28 23:13:14.531962'),(12,'auth','0007_alter_validators_add_error_messages','2026-01-28 23:13:14.543877'),(13,'auth','0008_alter_user_username_max_length','2026-01-28 23:13:14.698600'),(14,'auth','0009_alter_user_last_name_max_length','2026-01-28 23:13:14.841563'),(15,'auth','0010_alter_group_name_max_length','2026-01-28 23:13:14.872830'),(16,'auth','0011_update_proxy_permissions','2026-01-28 23:13:14.883563'),(17,'auth','0012_alter_user_first_name_max_length','2026-01-28 23:13:15.021353'),(18,'sessions','0001_initial','2026-01-28 23:13:15.115587'),(19,'veroturApp','0001_initial','2026-01-28 23:13:15.358043'),(20,'veroturApp','0002_alter_pontosturisticos_descricao_and_more','2026-01-28 23:13:15.735629'),(21,'veroturApp','0003_alter_pontosturisticos_endereco','2026-01-28 23:13:15.875631'),(22,'veroturApp','0004_categorias_nome_en_categorias_nome_es_and_more','2026-01-28 23:13:17.996639'),(23,'veroturApp','0005_alter_pontosturisticos_imagem','2026-01-28 23:13:18.096258'),(24,'veroturApp','0006_categorias_slug_alter_categorias_nome_and_more','2026-01-28 23:13:18.221382'),(25,'veroturApp','0007_alter_categorias_nome_alter_categorias_nome_en_and_more','2026-01-28 23:13:18.763029'),(26,'veroturApp','0008_alter_categorias_slug','2026-01-28 23:13:18.840677'),(27,'veroturApp','0009_alter_categorias_options_and_more','2026-01-28 23:13:19.426674'),(28,'veroturApp','0010_alter_pontosturisticos_imagem','2026-01-28 23:13:19.436631'),(29,'veroturApp','0011_alter_pontosturisticos_imagem','2026-01-28 23:13:19.446630'),(30,'veroturApp','0012_alter_pontosturisticos_imagem','2026-01-28 23:13:19.455975'),(31,'veroturApp','0013_alter_pontosturisticos_lugares_pagos_and_more','2026-01-28 23:13:19.996169'),(32,'veroturApp','0014_alter_pontosturisticos_horarios_funcionamento_and_more','2026-01-28 23:13:20.526008'),(33,'veroturApp','0015_senac','2026-01-28 23:13:20.582700'),(34,'veroturApp','0016_senac_link_alter_senac_descricao','2026-01-28 23:13:20.703347');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('wdqp574dezglnhgj6u5fqin8pq4m8nvz','.eJxVjEEOwiAQRe_C2hDqUAZcuu8ZCAyDVA0kpV0Z765NutDtf-_9l_BhW4vfOi9-TuIiBnH63WKgB9cdpHuotyap1XWZo9wVedAup5b4eT3cv4MSevnW6uyIEKMCEyFZjsawyhmNdoMeHSmHlNACWxvA2MyaXICYkQnsCCTeH90mN_g:1vlEnM:Xuc8APK-kuuZNm4qH4BiqxvqlkJJdnWx5qwLpJDX5cY','2026-02-11 23:17:56.726852');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veroturapp_categorias`
--

DROP TABLE IF EXISTS `veroturapp_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veroturapp_categorias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `nome_en` varchar(255) DEFAULT NULL,
  `nome_es` varchar(255) DEFAULT NULL,
  `nome_pt_br` varchar(255) DEFAULT NULL,
  `slug` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `veroturApp_categorias_slug_41c8f5a0` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veroturapp_categorias`
--

LOCK TABLES `veroturapp_categorias` WRITE;
/*!40000 ALTER TABLE `veroturapp_categorias` DISABLE KEYS */;
INSERT INTO `veroturapp_categorias` VALUES (1,'Igrejas','Churchs','Iglesias','Igrejas','igrejas'),(2,'Praças','Squares','Cuadrados','Praças','praças'),(3,'Ilhas','Beach','Playa','Ilhas','ilhas'),(4,'Prédios Históricos','Cultural','Cultural','Prédios Históricos','prédios-históricos'),(5,'Museus',NULL,NULL,'Museus','museus'),(6,'Terminais',NULL,NULL,'Terminais','terminais'),(7,'Shoppings',NULL,NULL,'Shoppings','shoppings'),(8,'Parques',NULL,NULL,'Parques','parques'),(9,'Atrações',NULL,NULL,'Atrações','atrações'),(10,'Restaurantes',NULL,NULL,'Restaurantes','restaurantes');
/*!40000 ALTER TABLE `veroturapp_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veroturapp_pontosturisticos`
--

DROP TABLE IF EXISTS `veroturapp_pontosturisticos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veroturapp_pontosturisticos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `descricao` longtext NOT NULL,
  `endereco` varchar(75) NOT NULL,
  `horarios_funcionamento` varchar(100) NOT NULL,
  `lugares_pagos` varchar(100) NOT NULL,
  `monitoria` varchar(45) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `categorias_ID_categorias` bigint NOT NULL,
  `descricao_en` longtext,
  `descricao_es` longtext,
  `descricao_pt_br` longtext,
  `endereco_en` varchar(75) DEFAULT NULL,
  `endereco_es` varchar(75) DEFAULT NULL,
  `endereco_pt_br` varchar(75) DEFAULT NULL,
  `horarios_funcionamento_en` varchar(100) DEFAULT NULL,
  `horarios_funcionamento_es` varchar(100) DEFAULT NULL,
  `horarios_funcionamento_pt_br` varchar(100) DEFAULT NULL,
  `lugares_pagos_en` varchar(100) DEFAULT NULL,
  `lugares_pagos_es` varchar(100) DEFAULT NULL,
  `lugares_pagos_pt_br` varchar(100) DEFAULT NULL,
  `monitoria_en` varchar(45) DEFAULT NULL,
  `monitoria_es` varchar(45) DEFAULT NULL,
  `monitoria_pt_br` varchar(45) DEFAULT NULL,
  `nome_en` varchar(100) DEFAULT NULL,
  `nome_es` varchar(100) DEFAULT NULL,
  `nome_pt_br` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `veroturApp_pontostur_categorias_ID_catego_f2676d58_fk_veroturAp` (`categorias_ID_categorias`),
  CONSTRAINT `veroturApp_pontostur_categorias_ID_catego_f2676d58_fk_veroturAp` FOREIGN KEY (`categorias_ID_categorias`) REFERENCES `veroturapp_categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veroturapp_pontosturisticos`
--

LOCK TABLES `veroturapp_pontosturisticos` WRITE;
/*!40000 ALTER TABLE `veroturapp_pontosturisticos` DISABLE KEYS */;
INSERT INTO `veroturapp_pontosturisticos` VALUES 
(1,'Catedral Metropolitana de Belém','Catedral_Metropolitana_de_Belém_Sé_u5emoZh.jpg','Localizada no centro histórico de Belém, a Catedral Metropolitana de Belém (Catedral da Sé) é a sede da Arquidiocese da cidade e o ponto de partida do Círio de Nazaré. Construída no século XVIII, sua arquitetura mistura os estilos barroco e neoclássico. O interior é imponente, destacando-se pelas telas de artistas europeus e o grande órgão francês, sendo um dos templos mais importantes do patrimônio paraense.','Praça Dom Frei Caetano Brandão, s/n - Cidade Velha','segunda a sexta 8h às 19h','Gratuito','Tem monitoria',-1.4559254,-48.5047352,1,'Located in the historic center of Belém, the Belém Metropolitan Cathedral (Catedral da Sé) is the seat of the citys Archdiocese and the starting point of the Círio de Nazaré procession. Built in the 18th century, its architecture blends Baroque and Neoclassical styles. The interior is grand, featuring paintings by European artists and a massive French organ, making it one of the most significant heritage sites in the state of Pará.','Situada en el centro histórico de Belén, la Catedral Metropolitana de Belén (Catedral da Sé) es la sede de la Archidiócesis de la ciudad y el punto de partida de la procesión del Círio de Nazaré. Construida en el siglo XVIII, su arquitectura combina los estilos barroco y neoclásico. El interior es majestuoso, destacando las pinturas de artistas europeos y un gran órgano francés, siendo uno de los templos más importantes del patrimonio de Pará.','Localizada no centro histórico de Belém, a Catedral Metropolitana de Belém (Catedral da Sé) é a sede da Arquidiocese da cidade e o ponto de partida do Círio de Nazaré. Construída no século XVIII, sua arquitetura mistura os estilos barroco e neoclássico. O interior é imponente, destacando-se pelas telas de artistas europeus e o grande órgão francês, sendo um dos templos mais importantes do patrimônio paraense.','Praça Dom Frei Caetano Brandão, s/n - Cidade Velha','Praça Dom Frei Caetano Brandão, s/n - Cidade Velha','Praça Dom Frei Caetano Brandão, s/n - Cidade Velha','monday to friday 8am - 7pm','lunes a viernes 8h - 19h','segunda a sexta 8h às 19h','Free','Gratis','Gratuito','Has monitoring','Tiene monitoreo','Tem monitoria','Catedral Metropolitana de Belém','Catedral Metropolitana de Belém','Catedral Metropolitana de Belém'),
(2,'Centur','centur.jpg','Centro de Turismo de Belém (Centur), espaço cultural com exposições e informações turísticas.','Av. Nazaré, s/n - Belém','terça a domingo 9h às 18h','Gratuito','Sem monitoria',-1.4555,-48.494,4,'Centur tourism center in Belém, cultural space with exhibitions and tourist information.','Centro de Turismo de Belén (Centur), espacio cultural con exposiciones e información turística.','Centro de Turismo de Belém (Centur), espaço cultural com exposições e informações turísticas.','Av. Nazaré, s/n - Belém','Av. Nazaré, s/n - Belén','Av. Nazaré, s/n - Belém','tuesday to sunday 9am - 6pm','martes a domingo 9h - 18h','terça a domingo 9h às 18h','Free','Gratis','Gratuito','No monitoring','Sin monitoreo','Sem monitoria','Centur','Centur','Centur'),
(3,'Estação das Docas','estacao_doca.png','Complexo turístico e cultural às margens do rio, com restaurantes, feiras e eventos.','Rua Siqueira Mendes, s/n - Cidade Velha','diariamente 10h às 22h','Gratuito','Sem monitoria',-1.454,-48.5025,4,'Riverfront cultural complex with restaurants, markets and events.','Complejo turístico y cultural junto al río, con restaurantes, ferias y eventos.','Complexo turístico e cultural às margens do rio, com restaurantes, feiras e eventos.','Rua Siqueira Mendes, s/n - Cidade Velha','Rua Siqueira Mendes, s/n - Ciudad Vieja','Rua Siqueira Mendes, s/n - Cidade Velha','daily 10am - 10pm','diariamente 10h - 22h','diariamente 10h às 22h','Free','Gratis','Gratuito','No monitoring','Sin monitoreo','Sem monitoria','Estação das Docas','Estación de las Docas','Estação das Docas'),
(4,'Ilha do Marajó','Ilha_de_Marajó.jpg','Grande ilha com praias, cultura ribeirinha e paisagens naturais, acessível por barco.','Ilha do Marajó - Pará','acesso diário - verificar horários de travessia','Variável','Sem monitoria',-0.973,-49.09,3,'Large island with beaches, riverine culture and natural landscapes, accessible by boat.','Isla grande con playas, cultura ribereña y paisajes naturales, accesible por barco.','Grande ilha com praias, cultura ribeirinha e paisagens naturais, acessível por barco.','Marajó Island - Pará','Isla Marajó - Pará','Ilha do Marajó - Pará','access daily - check ferry/boat schedules','acceso diario - verificar horarios de travesía','acesso diário - verificar horários de travessia','Variable','Variable','Variável','No monitoring','Sin monitoreo','Sem monitoria','Ilha do Marajó','Isla del Marajó','Ilha do Marajó'),
(5,'Igreja de São José','igreja_sao_jose.jpg','Igreja tradicional com fachada histórica e missas regulares.','R. São José, 123 - Cidade Velha','domingo 7h e 19h','Gratuito','Sem monitoria',-1.4548,-48.5038,1,'Historic church with regular services.','Iglesia tradicional con fachada histórica y misas regulares.','Igreja tradicional com fachada histórica e missas regulares.','R. São José, 123 - Cidade Velha','Calle São José, 123 - Ciudad Vieja','R. São José, 123 - Cidade Velha','sunday 7am and 7pm','domingo 7h y 19h','domingo 7h e 19h','Free','Gratis','Gratuito','No monitoring','Sin monitoreo','Sem monitoria','Church of São José','Iglesia de San José','Igreja de São José'),
(6,'Praça da República','praca_da_republica.jpg','Praça central com jardins e eventos ao ar livre.','Praça da República, s/n - Centro','aberto 24h','Gratuito','Sem monitoria',-1.4610,-48.5030,2,'Central square with gardens and outdoor events.','Plaza central con jardines y eventos al aire libre.','Praça central com jardins e eventos ao ar livre.','Republic Square, s/n - Downtown','Plaza de la República, s/n - Centro','Praça da República, s/n - Centro','open 24h','abierto 24h','aberto 24h','Free','Gratis','Gratuito','No monitoring','Sin monitoreo','Sem monitoria','Republic Square','Plaza de la República','Praça da República'),
(7,'Ilha de Mosqueiro','Ilha_do_Mosqueiro.png','Famosa ilha com praias de água doce e veraneio.','Ilha de Mosqueiro - Belém','acesso por barca; horários variam','Variável','Sem monitoria',-1.3188,-48.4450,3,'Popular island with freshwater beaches.','Isla popular con playas de agua dulce.','Famosa ilha com praias de água doce e veraneio.','Mosqueiro Island - Belém','Isla de Mosqueiro - Belén','Ilha de Mosqueiro - Belém','check boat schedules','verificar horarios de barco','verificar horários de travessia','Variable','Variable','Variável','No monitoring','Sin monitoreo','Sem monitoria','Mosqueiro Island','Isla de Mosqueiro','Ilha de Mosqueiro'),
(8,'Forte do Presépio','forte_presepio.jpg','Antigo forte histórico que marcou a fundação da cidade.','Praça do Forte, s/n - Cidade Velha','ter a dom 9h às 17h','Entrada paga','Com monitoria',-1.4542,-48.5035,4,'Historic fort marking the citys foundation.','Antiguo fuerte histórico que marcó la fundación de la ciudad.','Antigo forte histórico que marcou a fundação da cidade.','Fort Square, s/n - Cidade Velha','Plaza del Fuerte, s/n - Ciudad Vieja','Praça do Forte, s/n - Cidade Velha','tue-sun 9am - 5pm','mar a dom 9h - 17h','ter a dom 9h às 17h','Paid entry','Pago','Entrada paga','Guided tours available','Visitas guiadas disponibles','Com monitoria','Presépio Fort','Fuerte del Presépio','Forte do Presépio'),
(9,'Museu Paraense Emílio Goeldi','goeldi.jpg','Museu com exposições sobre biodiversidade e cultura amazônica.','Tv. Dr. Assis, s/n - Umarizal','ter a dom 9h às 17h','Entrada paga','Com monitoria',-1.4680,-48.4900,5,'Museum of Amazonian biodiversity and culture.','Museo sobre biodiversidad y cultura amazónica.','Museu com exposições sobre biodiversidade e cultura amazônica.','Dr. Assis St, s/n - Umarizal','T. Dr. Assis, s/n - Umarizal','Tv. Dr. Assis, s/n - Umarizal','tue-sun 9am - 5pm','mar a dom 9h - 17h','ter a dom 9h às 17h','Paid entry','Pago','Entrada paga','Guided tours','Visitas guiadas','Com monitoria','Goeldi Museum','Museo Emílio Goeldi','Museu Paraense Emílio Goeldi'),
(10,'Terminal Hidroviário','Terminal_Hidrovía_de_Belém.jpg','Principal terminal de embarque hidroviário da cidade.','Av. Presidente Vargas, s/n - Centro','diariamente 5h às 23h','Variável','Sem monitoria',-1.4515,-48.4825,6,'Main river terminal for boat departures.','Terminal hidroviario principal de la ciudad.','Principal terminal de embarque hidroviário da cidade.','Av. Presidente Vargas, s/n - Centro','Av. Presidente Vargas, s/n - Centro','Av. Presidente Vargas, s/n - Centro','daily 5am - 11pm','diariamente 5h - 23h','diariamente 5h às 23h','Variable','Variable','Variável','No monitoring','Sin monitoreo','Sem monitoria','Hidroviary Terminal','Terminal Hidroviario','Terminal Hidroviário'),
(11,'Shopping Pátio Belém','patiobelem.jpg','Shopping com lojas, praça de alimentação e cinema.','Tv. Padre Eutíquio, s/n - Batista Campos','diariamente 10h às 22h','Entrada gratuita','Sem monitoria',-1.4540,-48.4830,7,'Mall with shops, food court and cinema.','Centro comercial con tiendas, patio de comidas y cine.','Shopping com lojas, praça de alimentação e cinema.','Tv. Padre Eutíquio, s/n - Batista Campos','Tv. Padre Eutíquio, s/n - Batista Campos','Tv. Padre Eutíquio, s/n - Batista Campos','daily 10am - 10pm','diariamente 10h - 22h','diariamente 10h às 22h','Free entry','Entrada gratuita','Entrada gratuita','No monitoring','Sin monitoreo','Sem monitoria','Pátio Shopping','Centro Comercial Pátio','Shopping Pátio Belém'),
(12,'Parque da Residência','parque_residencia.jpg','Parque urbano com trilhas curtas e área de lazer.','R. Padre Champagnat, s/n - Batista Campos','aberto 5h às 21h','Gratuito','Sem monitoria',-1.4490,-48.4860,8,'Urban park with short trails and leisure areas.','Parque urbano con senderos cortos y zonas de ocio.','Parque urbano com trilhas curtas e área de lazer.','Padre Champagnat St, s/n - Batista Campos','R. Padre Champagnat, s/n - Batista Campos','R. Padre Champagnat, s/n - Batista Campos','5am - 9pm','5h - 21h','5h às 21h','Free','Gratis','Gratuito','No monitoring','Sin monitoreo','Sem monitoria','Residence Park','Parque de la Residencia','Parque da Residência'),
(13,'Mangal das Garças','mangaldasgarças.jpg','Atração ambiental com mirantes, jardins e fauna local.','Rua do Huarini, s/n - Cidade Velha','diariamente 8h às 18h','Entrada paga','Sem monitoria',-1.4556,-48.4985,9,'Environmental attraction with viewpoints and local fauna.','Atracción ambiental con miradores y fauna local.','Atração ambiental com mirantes, jardins e fauna local.','Huarini St, s/n - Cidade Velha','C. Huarini, s/n - Ciudad Vieja','Rua do Huarini, s/n - Cidade Velha','daily 8am - 6pm','diariamente 8h - 18h','diariamente 8h às 18h','Paid entry','Pago','Entrada paga','No monitoring','Sin monitoreo','Sem monitoria','Mangal das Garças','Mangal de las Garzas','Mangal das Garças'),
(14,'Tacacá da Gisela','tacaca_gisela.jpg','Restaurante típico que serve tacacá e pratos regionais.','R. 28 de Setembro, 50 - Cidade Velha','diariamente 11h às 22h','Pago','Sem monitoria',-1.4562,-48.5048,10,'Typical restaurant serving tacacá and regional dishes.','Restaurante típico que sirve tacacá y platos regionales.','Restaurante típico que serve tacacá e pratos regionais.','28 de Setembro St, 50 - Cidade Velha','C. 28 de Septiembre, 50 - Ciudad Vieja','R. 28 de Setembro, 50 - Cidade Velha','daily 11am - 10pm','diariamente 11h - 22h','diariamente 11h às 22h','Paid','Pago','Pago','No monitoring','Sin monitoreo','Sem monitoria','Tacacá da Gisela','Tacacá de Gisela','Tacacá da Gisela');
/*!40000 ALTER TABLE `veroturapp_pontosturisticos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veroturapp_senac`
--

DROP TABLE IF EXISTS `veroturapp_senac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veroturapp_senac` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `descricao` longtext NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `link` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veroturapp_senac`
--

LOCK TABLES `veroturapp_senac` WRITE;
/*!40000 ALTER TABLE `veroturapp_senac` DISABLE KEYS */;
/*!40000 ALTER TABLE `veroturapp_senac` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-28 21:20:01
