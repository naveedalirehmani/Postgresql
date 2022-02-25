// third party libraries
const express = require("express");
const pool = require("./db/index.js");
const app = express();

const apiRoutes = require('./routes/index.js');

// port and env
const port = 5000;

// static files and body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// serving static files
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

//api routes
app.use('/',apiRoutes);

// middle ware for handling errors
app.use((error, request, response, next) => {
  response.send(error);
});


// serving files on incorrect routes
app.use("*", (request, response) => {
  response.sendFile(__dirname + "/public/404.html");
});

// listning for server
app.listen(port, () => console.log(`working on port ${port}`));
