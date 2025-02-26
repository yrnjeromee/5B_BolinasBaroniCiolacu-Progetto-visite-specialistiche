const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
//const multer  = require('multer');
const database = require('./database.js');


database.createTableType();
database.createTableBooking();

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/files", express.static(path.join(__dirname, "files")));

app.post("/upload", async (req, res) => {
    //WEB SERVICE CHE PERMETTE DI AGGIUNGERE LE PRENOTAZIONI
    await database.insert(req);
    res.json({result: "ok"});
    console.log("AGGIUNTO -> ", req.name)
});

app.get('/get', async (req, res) => {
    //WEB SERVICE CHE RESTITUISCE L'ELENCO DI TUTTE LE PRENOTAZIONI
    const books = await database.select();
    res.json(books);
    console.log("PRENOTAZIONI -> ", books);
})

app.get('/gettips', async (req, res) => {
    //WEB SERVICE CHE RESTITUISCE L'ELENCO DI TUTTE LE TIPOLOGIE DI VISITE
    const tips = await database.selectTips();
    res.json(tips);
    console.log("TIPOLOGIE -> ", tips);
})


app.delete('/delete/:id', async (req, res) => {
    //WEB SERVICE CHE ELIMINA L'ELEMENTO DAL DATABASE
    await database.delete(req.params.id);
    res.json({result: "ok"});
    
})

const server = http.createServer(app);
//CREAZIONE SERVER HTTP
server.listen(5500, () => {
  console.log("- server running");
});

