const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

//top 10 listing
router.get("/top10", (req, res) => {
    const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});
//delete
router.delete("/:movie_id", (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);
    promise.then((movie) => {
        if (!movie)
            next('The movie you looking for is not found !');
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })
});
//update
router.put("/:movie_id", (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });
    promise.then((movie) => {
        if (!movie)
            next('The movie you looking for is not found !');
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    })
});



/// pulling all data from db
router.get("/", (req, res) => {
    const promise = Movie.aggregate({
        $lookup: {
            from: 'directors',
            localField: 'director_id',
            foreignField: '_id',
            as: 'director'
        }
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

//pulling specific id
router.get("/:movie_id", (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((movie) => {
        if (!movie)
            next('The movie you looking for is not found !');
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
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});
//between
router.get("/between/:start_year/:end_year", (req, res) => {
    const { start_year, end_year } = req.params;
    const promise = Movie.find({
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) } // gte büyük eşit lte küçük eşit, lt küçük gt büyük
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

module.exports = router;