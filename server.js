const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const multer  = require('multer');
const database = require('./database.js');


database.createTableType();
database.createTableBooking();

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/files", express.static(path.join(__dirname, "files")));

app.post("/upload", async (req, res) => {
    //WEB SERVICE CHE PERMETTE DI AGGIUNGERE LE PRENOTAZIONI
    await database.insert(req);
    res.json({result: "ok"});
    console.log("AGGIUNTO -> ", req.file.originalname)
});

app.get('/get', async (req, res) => {
    //WEB SERVICE CHE RESTITUISCE L'ELENCO DI TUTTE LE PRENOTAZIONI
    const books = await database.select();
    res.json(books);
    console.log("URL IMMAGINI -> ", books);
})


app.delete('/delete/:id', async (req, res) => {
    await database.delete(req.params.id);
    res.json({result: "ok"});
    
})
const server = http.createServer(app);
server.listen(5500, () => {
  console.log("- server running");
});

