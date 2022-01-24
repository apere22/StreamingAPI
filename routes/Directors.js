const mongoose = require('mongoose');
const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const Director = require('../models/Directors');
const Video = require('../models/Videos');

// Get all Director
router.get('/', async (req, res) => {
    Director.find().populate('videos').exec((err, docs) => {
        if(!err) res.json(docs);
        else console.log(err);
    });
    return 
});
// Get specific Director
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    Director.findById({_id: id}).populate('videos').exec((err, doc) => {
        if(!err)res.json(doc);     
        else res.send("Error: " + err);
    });
});
// Get Number Videos
router.get('/count/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Director.aggregate([
        { $match : { _id : id } },
        {$project: { NumberOfVideos: { $size:"$videos" }}}
    ],(err, doc) => {
        if(!err) res.send(doc);
        else res.send("Error: "+err);
    })
}) 
// Create new Director
router.post('/new', async (req,res) => {
    if(!req.body.videos) { 
        const newDirectors = new Director(req.body);
        const saveDirectors = await newDirectors.save();
        res.json(saveDirectors);
    }
    else res.send("Videos must be empty");
});

// Delete specific Director
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    Director.findByIdAndDelete({_id: id}).exec( async (DirectorErr, DirectorDoc) => {
        if(!DirectorErr) {
            // remove all Director in each videos
            await DirectorDoc.videos.map(async (video_id) => {
                await Video.findByIdAndUpdate({ _id: video_id }, { "$pull": { "directors": id }}).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            res.json(DirectorDoc)
        }
        else res.send("Error: "+DirectorErr);
    });
    
});

// Update specific Director
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    if(!req.body.videos){
        await Director.updateOne({_id: id}, {$set: req.body}).exec((err, doc) => {
            if(!err) res.json(doc);
            else res.send("Error: "+err);
        });
    }
    else res.send("Videos must be empty"); 
});

// Add new Videos 
router.patch('/update/video/add/:id', async (req, res) => {
    const id = req.params.id;
    await req.body.map(video_id => {
        // Update directors in Videos
        Video.findByIdAndUpdate({_id: video_id}, { $push: { directors: id }}).exec((err, doc) => {
            if(err) res.send("Error: " + err);
        });

        // Update video in Directors
        Director.findByIdAndUpdate({_id: id}, {$push: {videos: video_id}}).exec((err, doc) => {
            if(err) res.send("Error: " + err);
        })
    });
    res.send("Director an videos is update")
});

// Remove Videos
router.patch('/update/video/remove/:id/:video_id', async (req, res) => {
    const id = req.params.id;
    const video_id = req.params.video_id;
    // Update directors in Videos
    await Video.findByIdAndUpdate({_id: video_id}, { $pull: { directors: id }}).exec((err, doc) => {
        if(err) res.send("Error: " + err);
    });

    // Update video in Directors
    await Director.findByIdAndUpdate({_id: id}, {$pull: {videos: video_id}}).exec((err, doc) => {
        if(err) res.send("Error: " + err);
    })
    res.send("Director an videos is update");
});
module.exports = router;