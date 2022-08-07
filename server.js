const express = require("express")
const fs = require("fs")
const path = require("path")
const database = require("./develop/db/db")

// This sets up the Express App 

var app = express();
var PORT = process.env.PORT || 3000;

// link to my assets 
app.use(express.static('public'))

//Listening for the port & sets up the server

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
