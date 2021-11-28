const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { json } = require("express");
const app = express();

//#region conexão
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
//#endregion

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

app.post('/selectCrianca', (req, res)=>{
    const { codCrianca } = req.body;

    let sql = "SELECT * FROM crianca WHERE CodCrianca = ?"
    console.log(codCrianca)

    db.query(sql, [codCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(result){
            console.log(JSON.stringify(result))
            res.send(result);
        } 
    })
});

app.post('/inserirPedido', (req,res)=>{
    const { codCrianca } = req.body;
    const { pedido } = req.body;
    const { entusiasmo } = req.body;
    //entusiasmo = parseInt(entusiasmo);

    console.log("CodCrianca: " + codCrianca + "\nPedido: " + pedido + "\nentusiasmo: " + entusiasmo);
    let sql = "UPDATE Crianca SET pedido = ?  WHERE codCrianca=?"

    db.query(sql, [pedido, entusiasmo, codCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + JSON.stringify(result));
        res.send(result);
    });

});

app.post('/inserirDiversao', (req,res)=>{
    const { codCrianca } = req.body;
    const { diversao } = req.body;
    //entusiasmo = parseInt(entusiasmo);
    //console.log("CodCrianca: " + codCrianca + "\nPedido: " + pedido + "\nentusiasmo: " + entusiasmo);
    let sql = "UPDATE Crianca SET pedido = ?  WHERE codCrianca=?"

    db.query(sql, [diversao, codCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + JSON.stringify(result));
        res.send(result);
    });
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

//#region Responsaveis
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
   // const { data_Tarefa } = req.body; default time atual 
    const { dataFinal_Tarefa } = req.body;
    //const { concluido } = req.body; false automatic
    const { FK_CodCrianca } = req.body;
    const { FK_CodResponsavel } = req.body;

    let sql = "INSERT INTO Tarefas ( titulo_Tarefa, descricao_Tarefa, dataFinal_tarefa, FK_CodCrianca, FK_CodResponsavel) VALUES (?, ?, STR_TO_DATE(?, '%d-%m-%Y %h:%i'), ?, ?)"


    db.query(sql, [titulo_Tarefa, descricao_Tarefa, dataFinal_Tarefa, FK_CodCrianca, FK_CodResponsavel], (err, result) =>{
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

app.post('/concluirTarefa', (req,res)=>{
    const { codTarefa } = req.body;
    const { concluido } = req.body;

    let sql = "UPDATE Tarefas SET concluido = ? WHERE codTarefa = ?"


    db.query(sql, [concluido , codTarefa], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    })
    //console.log(nome_Res);
});
//#endregion

//#region Parabens

app.post('/registrarParabens', (req, res)=>{
    const { titulo_Parabens } = req.body;
    const { descricao_Parabens } = req.body;
    //const { data_Parabens } = req.body;
    //const { visto } = req.body; false automatic
    const { FK_CodCrianca } = req.body;
    const { FK_CodResponsavel } = req.body;

    let sql = "INSERT INTO Parabens ( titulo_Parabens, descricao_Parabens, FK_CodCrianca, FK_CodResponsavel) VALUES (?, ?, ?, ?)"


    db.query(sql, [titulo_Parabens, descricao_Parabens, FK_CodCrianca, FK_CodResponsavel], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    });
    //console.log(nome_Res);
});

app.post('/getParabens', (req, res)=>{
    const { FK_CodCrianca } = req.body;

    let sql = "SELECT * FROM Parabens WHERE FK_CodCrianca = ?"


    db.query(sql, [FK_CodCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(err) res.send(err)
        else res.send(result)
    })
    //console.log(nome_Res);
    
});

app.post('/vizualizarParabens', (req,res)=>{
    const { codParabens } = req.body;
    const { visto } = req.body;

    let sql = "UPDATE Parabens SET visto = ? WHERE codParabens = ?"


    db.query(sql, [visto , codParabens], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    })
    //console.log(nome_Res);
});

//#endregion

//#region Ordem

app.post('/registrarOrdem', (req, res)=>{
    const { titulo_Ordem } = req.body;
    const { descricao_Ordem } = req.body;
    //const { data_Parabens } = req.body;
    //const { visto } = req.body; false automatic
    const { FK_CodCrianca } = req.body;
    const { FK_CodResponsavel } = req.body;

    let sql = "INSERT INTO Ordem ( titulo_Ordem, descricao_Ordem, FK_CodCrianca, FK_CodResponsavel) VALUES (?, ?, ?, ?)"


    db.query(sql, [titulo_Ordem, descricao_Ordem, FK_CodCrianca, FK_CodResponsavel], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        res.send(result);
    });
    //console.log(nome_Res);
});

app.post('/getOrdem', (req, res)=>{//aaaaaa
    const { FK_CodCrianca } = req.body;

    let sql = "SELECT * FROM ordem WHERE FK_CodCrianca = ?"


    db.query(sql, [FK_CodCrianca], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + result);
        if(err) res.send(err)
        else res.send(result)
    })
    //console.log(nome_Res);
    
});

app.post('/vizualizarOrdem', (req,res)=>{//aaaaaaaaa
    const { codOrdem } = req.body;
    const { visto } = req.body;
    console.log(codOrdem)
    let sql = "UPDATE Ordem SET visto = ? WHERE codOrdem = ?"


    db.query(sql, [visto , codOrdem], (err, result) =>{
        console.log('Erro: ' + err + "\nResultado:" + JSON.stringify(result));
        res.send(result);
    })
    //console.log(nome_Res);
});

//#endregion