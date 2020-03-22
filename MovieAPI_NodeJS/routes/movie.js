const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
//pulling spesif id

/// pulling data from db
router.get("/:movie_id", (req, res) => {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((movie) => {
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })
});
///saving to databasee
router.post("/", (req, res, next) => {

    // const{title,imdb_score,category,country,year}=req.body;
    const movie = new Movie(req.body);
    /*
        movie.save((err, data) => {
            if (err) {
                res.json(err);
            }
            res.json(data);
        });
    */
    const promise = movie.save();
    promise.then((data) => {
        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;