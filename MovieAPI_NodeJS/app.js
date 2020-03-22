const express = require("express");
const app = express();
const movie = require('./routes/movie');
///////
const db = require('./helper/db.js')();
///////

app.use('/api/movie', movie);
app.get("/", (req, res) => {
    res.send("Successful !");
});
app.listen(3100, () => {
    console.log("Server is running !");
});