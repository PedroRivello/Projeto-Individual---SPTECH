var database = require("../database/config");

// SALVAR RESULTADO

function salvarResultado(fkPerfilResultado, fkUsuario) {
    var instrucaoSql = `
        INSERT INTO resultadoQuiz (fkPerfilResultado, fkUsuario)
        VALUES (${fkPerfilResultado}, ${fkUsuario});
    `;
    return database.executar(instrucaoSql);
}

// DASHBOARD

function buscarDadosDashboard() {

    var instrucaoSql = `
        SELECT
            perfilGamer.nomePerfil,
            COUNT(resultadoQuiz.idResultado) AS quantidade
        FROM resultadoQuiz
        JOIN perfilGamer
        ON resultadoQuiz.fkPerfilResultado = perfilGamer.idPerfil
        GROUP BY perfilGamer.nomePerfil;
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    buscarDadosDashboard
};