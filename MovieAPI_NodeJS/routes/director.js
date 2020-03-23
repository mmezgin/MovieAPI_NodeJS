const express = require('express');
const router = express.Router();
const Director = require('../models/Director');
const mongoose = require("mongoose");

router.post("/", (req, res) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/', (req, res) => { //çokomelli function //directörleri filmleriyle birlikte listeler
    const promise = Director.aggregate([{
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        }, {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);



    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);

    });
});
///////////////////////////
router.get('/:director_id', (req, res) => { //çokomelli function //directör id sinden aratıp onun filmlerini listeler
    const promise = Director.aggregate([{
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        }, {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);



    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);

    });
});

router.put("/:director_id", (req, res, next) => { //update director by id
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true });
    promise.then((director) => {
        if (!director)
            next('The director you looking for is not found !'); //next ({message:'bulunamadı',code:99});
        res.json(director);
    }).catch((err) => {
        res.json(err);
    })
});

router.delete("/:director_id", (req, res, next) => { //delete director by id 
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then((director) => {
        if (!director)
            next('The director you looking for is not found !');
        res.json(director);
    }).catch((err) => {
        res.json(err);
    })
});







////////////////////
module.exports = router;