var quizModel = require("../models/quizModel");

// SALVAR RESULTADO

function salvarResultado(req, res) {

    var fkPerfilResultado = req.body.fkPerfilResultadoServer;

    if (fkPerfilResultado == undefined) {

        res.status(400).send("Perfil undefined");

    } else {

        quizModel.salvarResultado(fkPerfilResultado)

            .then(function (resultado) {

                res.status(200).json(resultado);

            })

            .catch(function (erro) {

                console.log(erro);

                res.status(500).json(erro.sqlMessage);

            });

    }
}

// DASHBOARD

function buscarDadosDashboard(req, res) {

    quizModel.buscarDadosDashboard()

        .then(function (resultado) {

            res.status(200).json(resultado);

        })

        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);

        });
}

module.exports = {
    salvarResultado,
    buscarDadosDashboard
};