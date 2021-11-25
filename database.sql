CREATE SCHEMA `educando` ;

CREATE TABLE `educando`.`crianca` (
  `CodCrianca` INT NOT NULL AUTO_INCREMENT,
  `nome_Crianca` VARCHAR(60) NULL,
  `dataNasc_Crianca` DATE NOT NULL,
  `email_Crianca` VARCHAR(45) NULL,
  `senha_Crianca` VARCHAR(45) NULL,
  PRIMARY KEY (`CodCrianca`));

CREATE TABLE `educando`.`responsavel` (
  `codResponsavel` INT NOT NULL AUTO_INCREMENT,
  `nome_Res` VARCHAR(60) NULL,
  `email_Res` VARCHAR(45) NULL,
  `senha_Res` VARCHAR(45) NULL,
  `FK_CodCrianca` INT NULL,
  PRIMARY KEY (`codResponsavel`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`));

  CREATE TABLE `educando`.`Tarefas` (
  `codTarefa` INT NOT NULL AUTO_INCREMENT,
  `titulo_Tarefa` VARCHAR(60) NULL,
  `descricao_Tarefa` VARCHAR(100) NULL,
  `data_tarefa` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `dataFinal_tarefa` DATETIME NULL,
  `concluido` INT DEFAULT 0,
  `FK_CodCrianca` INT NOT NULL,
  `FK_CodResponsavel` INT NOT NULL,
  PRIMARY KEY (`codTarefa`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`));

  CREATE TABLE `educando`.`Parabens` (
  `codParabens` INT NOT NULL AUTO_INCREMENT,
  `titulo_Parabens` VARCHAR(60) NULL,
  `descricao_Parabens` VARCHAR(100) NULL,
  `data_Parabens` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `visto` BOOLEAN DEFAULT 0,
  `FK_CodCrianca` INT NOT NULL,
  `FK_CodResponsavel` INT NOT NULL,
  PRIMARY KEY (`codParabens`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`));

  CREATE TABLE `educando`.`Ordem` (
  `codOrdem` INT NOT NULL AUTO_INCREMENT,
  `titulo_Ordem` VARCHAR(60) NULL,
  `descricao_Ordem` VARCHAR(100) NULL,
  `data_Ordem` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `visto` BOOLEAN DEFAULT 0,
  `FK_CodCrianca` INT NOT NULL,
  `FK_CodResponsavel` INT NOT NULL,
  PRIMARY KEY (`codOrdem`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`),
  FOREIGN KEY (`FK_CodCrianca`) REFERENCES `crianca`(`CodCrianca`));