// Dependencies 

var express = require("express");
var html = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");

// Express Config

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes 
apiRoutes(app);

html(app);


// app.use("/", html);


// app.use("/", apiRoutes);




// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
});