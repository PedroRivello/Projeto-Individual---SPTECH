var usuarioModel = require("../models/usuarioModel");
var quizModel = require("../models/quizModel");

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {

        res.status(400).send("Seu email está undefined!");

    } else if (senha == undefined) {

        res.status(400).send("Sua senha está undefined!");

    } else {

        usuarioModel.autenticar(email, senha)

            .then(function (resultadoAutenticar) {

                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {

                    res.json({
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        senha: resultadoAutenticar[0].senha,
                        dataCadastro: resultadoAutenticar[0].dataCadastro
                    });

                } else if (resultadoAutenticar.length == 0) {

                    res.status(403).send("Email e/ou senha inválido(s)");

                } else {

                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");

                }

            }).catch(function (erro) {

                console.log(erro);

                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);

            });
    }
}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkPerfilResultado = req.body.fkPerfilResultadoServer; //ADICIONAR

    if (!nome) return res.status(400).send("Seu nome está undefined!");
    if (!email) return res.status(400).send("Seu email está undefined!");
    if (!senha) return res.status(400).send("Sua senha está undefined!");

    usuarioModel.cadastrar(nome, email, senha)
        .then(function (resultado) {
            if (fkPerfilResultado) {
                const idNovoUsuario = resultado.insertId; //pega o ID gerado
                return quizModel.salvarResultado(fkPerfilResultado, idNovoUsuario)
                    .then(function () { res.json(resultado); });
            }
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar
}