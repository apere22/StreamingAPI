const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const Type = require('../models/Types');
const Video = require('../models/Videos');

// Get all Type
router.get('/', async (req, res) => {
    Type.find().populate('videos').exec((err, docs) => {
        if(!err) res.json(docs);
        else console.log(err);
    });
    return 
});
// Get specific Type
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    Type.findById({_id: id}).populate('videos').exec((err, doc) => {
        if(!err)res.json(doc);     
        else res.send("Error: " + err);
    });
});
// Create new Type
router.post('/new', async (req,res) => {
    console.log("New");
    const newTypes = new Type(req.body);
    const saveTypes = await newTypes.save();
    if(req.body.videos){
        await req.body.videos.map(async (id) => {
            await Video.findByIdAndUpdate({ _id: id }, { type: saveTypes._id }).exec((err, doc) => {
                if(err) res.send("Error: " + err);
            });
        })
    }
    res.json(saveTypes);
});

// Delete specific Type
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Type.findByIdAndDelete({_id: id}).exec(async (typeErr, typeDoc) => {
        if(!typeErr) {
            await typeDoc.videos.map(async (video_id) => {
                await Video.findByIdAndUpdate({ _id: video_id }, { type: null }).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            res.json(typeDoc);
        }
        else res.send("Error: "+typeErr);
    });
    
});

// Update specific Type
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    if(!req.body.videos){
        await Type.updateOne({_id: id}, {$set: req.body}).exec((err, doc) => {
            if(!err) res.json(doc);
            else res.send("Error: "+err);
        });
    }
    else res.send("Videos must be empty"); 
});

module.exports = router;