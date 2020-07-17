// Dependencies

var path = require("path");
const db = require("../db/db.json");
const fs = require("fs");
const bodyParser = require("body-parser");
const {v4:uuidv4}=require("uuid")

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        console.log("reading...")
        fs.readFile('db/db.json', 'utf8', (err, response)=>{
            console.log('read the file', response)
            res.json(JSON.parse(response))
        })
    });

    app.get("/api/notes:id", function(req, res) {
        var getId = req.params.id;
        console.log(getId);
    });
        

    app.post("/api/notes", function(req, res) {
        console.log(req.body);
        let data = req.body;
        data.id=uuidv4()
        res.json(db.push(req.body));
        console.log(db);
        fs.writeFile('db/db.json', JSON.stringify(db), function(err){
            console.log('wrote to the file')
        })
    });

    app.delete("/api/notes/:id", function(req, res) {
       let dataId =req.params.id;

      let newData= fs.readFileSync("./db/db.json","utf-8")

    let newDataParse = JSON.parse(newData)

      let newArr =newDataParse.filter(function(item){
          return item.id != dataId
      })

      fs.writeFile("./db/db.json",JSON.stringify(newArr),function(err){
          if(err) throw err;
          console.log("delete")
      })
        res.end()
        
        
    });
    
}