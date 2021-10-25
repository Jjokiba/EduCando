CREATE SCHEMA `educando` ;

CREATE TABLE `educando`.`responsavel` (
  `codResponsavel` INT NOT NULL AUTO_INCREMENT,
  `nome_Res` VARCHAR(60) NULL,
  `email_Res` VARCHAR(45) NULL,
  `senha_Res` VARCHAR(45) NULL,
  `FK_CodCrianca` INT NULL,
  PRIMARY KEY (`codResponsavel`));


CREATE TABLE `educando`.`crianca` (
  `CodCrianca` INT NOT NULL AUTO_INCREMENT,
  `nome_Crianca` VARCHAR(60) NULL,
  `dataNasc_Crianca` DATE NOT NULL,
  `email_Crianca` VARCHAR(45) NULL,
  `senha_Crianca` VARCHAR(45) NULL,
  PRIMARY KEY (`CodCrianca`));
