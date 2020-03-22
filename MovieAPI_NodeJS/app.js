const express = require("express");
const app = express();
const movie = require('./routes/movie');
const director = require('./routes/director');
const bodyParser = require("body-parser");
///////
const db = require('./helper/db.js')();
///////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/movies', movie);
app.use('/api/directors', director);
app.get("/", (req, res) => {
    res.send("Successful !");
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};
    res.status(err.status || 500);
    res.json({ error: err.message });
});
app.listen(3100, () => {
    console.log("Server is running !");
});