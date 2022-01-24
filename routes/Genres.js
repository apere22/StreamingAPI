const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const Genre = require('../models/Genres');
const Video = require('../models/Videos');

// Get all genre
router.get('/', async (req, res) => {
    Genre.find().populate('videos').exec((err, docs) => {
        if(!err) res.json(docs);
        else console.log(err);
    });
    return 
});
// Get specific genre
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    Genre.findById({_id: id}).populate('videos').exec((err, doc) => {
        if(!err)res.json(doc);     
        else res.send("Error: " + err);
    });
});
// Create new genre
router.post('/new', async (req,res) => {
    if(!req.body.videos) { 
        const newGenres = new Genre(req.body);
        const saveGenres = await newGenres.save();
        res.json(saveGenres);
    }
    else res.send("Videos must be empty");
});

// Delete specific genre
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    Genre.findByIdAndDelete({_id: id}).exec( async (genreErr, genreDoc) => {
        if(!genreErr) {
            // remove all genre in each videos
            await genreDoc.videos.map(async (video_id) => {
                await Video.findByIdAndUpdate({ _id: video_id }, { "$pull": { "genres": id }}).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            res.json(genreDoc)
        }
        else res.send("Error: "+genreErr);
    });
    
});

// Update specific genre
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    if(!req.body.videos){
        await Genre.updateOne({_id: id}, {$set: req.body}).exec((err, doc) => {
            if(!err) res.json(doc);
            else res.send("Error: "+err);
        });
    }
    else res.send("Videos must be empty"); 
});

module.exports = router;