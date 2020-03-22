const express = require("express");
const app = express();
const movie = require('./routes/movie');
const bodyParser = require("body-parser");
///////
const db = require('./helper/db.js')();
///////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/movies', movie);
app.get("/", (req, res) => {
    res.send("Successful !");
});
app.listen(3100, () => {
    console.log("Server is running !");
});