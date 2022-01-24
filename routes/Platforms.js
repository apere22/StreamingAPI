const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const Platform = require('../models/Platforms');
const Video = require('../models/Videos');

// Get all Platform
router.get('/', async (req, res) => {
    Platform.find().populate('videos').exec((err, docs) => {
        if(!err) res.json(docs);
        else console.log(err);
    });
    return 
});
// Get specific Platform
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    Platform.findById({_id: id}).populate('videos').exec((err, doc) => {
        if(!err)res.json(doc);     
        else res.send("Error: " + err);
    });
});
// Create new Platform
router.post('/new', async (req,res) => {
    const newPlatforms = new Platform(req.body);
    const savePlatforms = await newPlatforms.save();
    // Update video
    if(req.body.videos){
        await req.body.videos.map(async (id) => {
            await Video.findByIdAndUpdate({ _id: id }, {platform: savePlatforms._id }).exec((err, doc) => {
                if(err) res.send("Error: " + err);
            });
        })
    }
    res.json(savePlatforms);
});

// Delete specific Platform
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Platform.findByIdAndDelete({_id: id}).exec(async (PlatformErr, PlatformDoc) => {
        if(!PlatformErr) {
            await PlatformDoc.videos.map(async (video_id) => {
                await Video.findByIdAndUpdate({ _id: video_id }, { platform: null }).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            res.json(PlatformDoc);
        }
        else res.send("Error: "+PlatformErr);
    });
    
});

// Update specific Platform
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    if(!req.body.videos){
        await Platform.updateOne({_id: id}, {$set: req.body}).exec((err, doc) => {
            if(!err) res.json(doc);
            else res.send("Error: "+err);
        });
    }
    else res.send("Videos must be empty"); 
});

module.exports = router;