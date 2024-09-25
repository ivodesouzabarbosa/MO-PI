-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd_verotur
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_verotur
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_verotur` DEFAULT CHARACTER SET utf8mb4 ;
USE `bd_verotur` ;

-- -----------------------------------------------------
-- Table `bd_verotur`.`tb_categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_verotur`.`tb_categorias` (
  `idtb_Categorias` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtb_Categorias`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bd_verotur`.`tb_pontos_turisticos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_verotur`.`tb_pontos_turisticos` (
  `idtable1` INT NOT NULL AUTO_INCREMENT,
  `imagem` BLOB NULL DEFAULT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `endereco` VARCHAR(45) NOT NULL,
  `horarios_fechamento` VARCHAR(45) NOT NULL,
  `lugares_pagos` VARCHAR(45) NOT NULL,
  `monitoria` VARCHAR(45) NOT NULL,
  `table1col` VARCHAR(45) NOT NULL,
  `latitude` VARCHAR(45) NOT NULL,
  `longitude` VARCHAR(45) NOT NULL,
  `ID_categorias` INT NOT NULL,
  PRIMARY KEY (`idtable1`),
  INDEX `fk_table1_tb_Categorias_idx` (`ID_categorias` ASC) VISIBLE,
  CONSTRAINT `fk_table1_tb_Categorias`
    FOREIGN KEY (`ID_categorias`)
    REFERENCES `bd_verotur`.`tb_categorias` (`idtb_Categorias`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
