const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "EduCando",
});

app.use(cors());
app.use(express.json());

app.listen(3001, ()=> {
    console.log("Server Up")
});

//#region  Crianças

app.post('/registrarCrianca', (req, res)=>{
    const { nome_Crianca } = req.body;
    const { dataNasc_Crianca } = req.body;
    const { email_Crianca } = req.body;
    const { senha_Crianca } = req.body;

    let sql = "INSERT INTO crianca ( nome_Crianca, dataNasc_crianca, email_Crianca, senha_Crianca) VALUES (?, STR_TO_DATE(?, '%d-%m-%Y'), ?, ?)"


    db.query(sql, [nome_Crianca, dataNasc_Crianca, email_Crianca, senha_Crianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    })
});

app.post('/loginCrianca', (req, res)=>{
    const { email_Crianca } = req.body;
    const { senha_Crianca } = req.body;

    let sql = "SELECT * FROM crianca WHERE email_Crianca = ? AND senha_Crianca = ?"


    db.query(sql, [email_Crianca, senha_Crianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(result){
            res.send(result);
        } 
    })
});


app.get('/getLastInsertId', (req, res)=>{

    let sql = "SELECT LAST_INSERT_ID() as lastID;"


    db.query(sql, [], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(err) res.send(err)
        else res.send(result)
    })
    //console.log(nome_Res);
    
});

//#endregion

//#region  Responsaveis
app.post('/loginAdulto', (req, res)=>{
    const { email_Res } = req.body;
    const { senha_Res } = req.body;

    let sql = "SELECT * FROM responsavel WHERE email_Res = ? AND senha_Res = ?";

    db.query(sql, [email_Res, senha_Res], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(result){
            res.send(result);
        } 
        else{
            res.send("");
        }
    })
});

app.post('/registrarAdulto', (req, res)=>{
    const { nome_Res } = req.body;
    const { email_Res } = req.body;
    const { senha_Res } = req.body;
    const { FK_CodCrianca } = req.body;

    let sql = "INSERT INTO responsavel ( nome_Res, email_Res, senha_Res, FK_CodCrianca) VALUES (?, ?, ?, ?)"


    db.query(sql, [nome_Res, email_Res, senha_Res, FK_CodCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    })
    console.log(nome_Res);
});


//#endregion

//#region Tarefas
app.post('/registrarTarefa', (req, res)=>{
    const { titulo_Tarefa } = req.body;
    const { descricao_Tarefa } = req.body;
    const { data_Tarefa } = req.body;
    const { dataFinal_Tarefa } = req.body;
    //const { concluido } = req.body; false automatic
    const { FK_CodCrianca } = req.body;
    const { FK_CodResponsavel } = req.body;

    let sql = "INSERT INTO Tarefas ( titulo_Tarefa, descricao_Tarefa, data_tarefa, dataFinal_tarefa, FK_CodCrianca, FK_CodResponsavel) VALUES (?, ?, STR_TO_DATE(?, '%d-%m-%Y %h:%i'), STR_TO_DATE(?, '%d-%m-%Y %h:%i'), ?, ?)"


    db.query(sql, [titulo_Tarefa, descricao_Tarefa, data_Tarefa, dataFinal_Tarefa, FK_CodCrianca, FK_CodResponsavel], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    })
    //console.log(nome_Res);
});

app.post('/getTarefasCrianca', (req, res)=>{
    const { FK_CodCrianca } = req.body;

    let sql = "SELECT * FROM Tarefas WHERE FK_CodCrianca = ? AND concluido = 0;"


    db.query(sql, [FK_CodCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(err) res.send(err)
        else res.send(result)
    })
    //console.log(nome_Res);
    
});

//#endregion