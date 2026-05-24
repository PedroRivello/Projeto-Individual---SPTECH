-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE ProjetoInd;
USE ProjetoInd;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100),
	email VARCHAR(100) UNIQUE,
	senha VARCHAR(100),
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE perfilGamer (
	idPerfil INT PRIMARY KEY AUTO_INCREMENT,
	nomePerfil VARCHAR(50),
	descricao VARCHAR(200)
);

CREATE TABLE resultadoQuiz (
	idResultado INT PRIMARY KEY AUTO_INCREMENT,
	fkPerfilResultado INT,
	dataResposta DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fkResultadoPerfil
	FOREIGN KEY (fkPerfilResultado)
	REFERENCES perfilGamer(idPerfil)
);

ALTER TABLE resultadoQuiz
ADD COLUMN fkUsuario INT,
ADD CONSTRAINT fkResultadoUsuario
FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario);
    
    
INSERT INTO perfilGamer (nomePerfil, descricao) VALUES
('competitivo', 'Jogadores competitivos'),
('explorador', 'Jogadores exploradores'),
('historia', 'Jogadores narrativos'),
('criativo', 'Jogadores criativos');

SELECT * FROM resultadoQuiz;
select * from perfilGamer;
SELECT * FROM usuario;

SELECT usuario.nome,
    perfilGamer.nomePerfil AS Nome_Player,
    perfilGamer.descricao AS Descricao_perfil,
    usuario.dataCadastro AS dataQuiz
FROM resultadoQuiz
JOIN usuario
    ON resultadoQuiz.fkUsuario = usuario.idUsuario
JOIN perfilGamer
    ON resultadoQuiz.fkPerfilResultado = perfilGamer.idPerfil
ORDER BY usuario.dataCadastro DESC;