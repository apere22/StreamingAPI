const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const Actor = require('../models/Actors');
const Video = require('../models/Videos');

// Get all Actor
router.get('/', async (req, res) => {
    Actor.find().populate('videos').exec((err, docs) => {
        if(!err) res.json(docs);
        else console.log(err);
    });
    return 
});
// Get specific Actor
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    Actor.findById({_id: id}).populate('videos').exec((err, doc) => {
        if(!err)res.json(doc);     
        else res.send("Error: " + err);
    });
});
// Create new Actor
router.post('/new', async (req,res) => {
    if(!req.body.videos) { 
        const newActors = new Actor(req.body);
        const saveActors = await newActors.save();
        res.json(saveActors);
    }
    else res.send("Videos must be empty");
});

// Delete specific Actor
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    Actor.findByIdAndDelete({_id: id}).exec( async (ActorErr, ActorDoc) => {
        if(!ActorErr) {
            // remove all Actor in each videos
            await ActorDoc.videos.map(async (video_id) => {
                await Video.findByIdAndUpdate({ _id: video_id }, { "$pull": { "Actors": id }}).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            res.json(ActorDoc)
        }
        else res.send("Error: "+ActorErr);
    });
    
});

// Update specific Actor
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    if(!req.body.videos){
        await Actor.updateOne({_id: id}, {$set: req.body}).exec((err, doc) => {
            if(!err) res.json(doc);
            else res.send("Error: "+err);
        });
    }
    else res.send("Videos must be empty"); 
});

module.exports = router;