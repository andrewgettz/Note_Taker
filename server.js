const express = require("express")
const fs = require("fs")
const path = require("path")
const database = require("./db/db")

// This sets up the Express App 

var app = express();
var PORT = process.env.PORT || 3000;

// link to my assets 
app.use(express.static('public'))

//This sets up data parsing 

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Page load should start with index.html, get it and listen

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

//Notes html and it's url 
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})


//Get, POST, DELETE API Endpoints 

app.route("/api/notes")

//grab the notes list 
.get(function (req, res) {
    res.json(database)
})

//Add a new note to db 
.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json")
    let newNote = req.body

    //Allows the test not to be the original note 
    let highestID = 99

    //Loops through the array to find the highest id 
    for(let i = 0; i < database.length; i++) {
        let individualNote = database[i]

        if (individualNote.id > highestID){
            highestID = individualNote.id
        }
    }
    //Assigns an ID to the newNote 
    newNote.id = highestID + 1 
    //push it to db.json 
    database.push(newNote)

    //Write the db.json file again 
    fs.writeFile(jsonFilePath, JSON.stringify(database),
    function(err) {
        if (err){
            return console.log(err)
        }
        console.log("Your note was saved!")
    })
    //Responds with user's new note
    res.json(newNote)
})

//Listening for the port & sets up the server

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
