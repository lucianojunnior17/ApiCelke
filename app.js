const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com Banco de dados realizada com sucesso");
}).catch((erro) => {
    console.log("Errro Conexão falhou");
});

app.get("/",(req, res) => {
    return res.json({titulo: "Como criar API "})
});

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            erro: true,
            message: "Erro Artigo não foi cadastrado"
        });

        return res.status(200).json({
            erro: false,
            message: " Artigo cadastrado com sucesso "
        })
    });

});

app.listen(3000, () => {
    console.log("servidor iniciado na porta 3000");
});