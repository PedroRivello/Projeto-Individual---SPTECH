var express = require("express");

var router = express.Router();

var quizController = require("../controllers/quizController");

// SALVAR QUIZ

router.post("/salvarResultado", function (req, res) {

    quizController.salvarResultado(req, res);

});

// DASHBOARD

router.get("/dashboard", function (req, res) {

    quizController.buscarDadosDashboard(req, res);

});

module.exports = router;