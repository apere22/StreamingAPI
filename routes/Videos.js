const express = require('express');
const router = express.Router();
const Video = require('../models/Videos');
const Genre = require('../models/Genres');
const Type = require('../models/Types');
const Director = require('../models/Directors');
const Actor = require('../models/Actors');
const Platform = require('../models/Platforms');

// Get all videos
router.get('/', async (req, res) => {
    const Videos = await Video.find().populate('genres').exec((err,posts) => {
        if(!err)res.json(posts);
        else res.send("Error: "+ err);
    });
});
// Get specific videos
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    const Videos = await Video.findById({_id: id}).populate('genres').exec((err, post) => {
        if(!err) res.json(post)
        else res.send("Error: "+err);
    });
});
// Get result search videos
router.get('/search/:search', (req, res) => {
    const search = decodeURI(req.params.search).replace(" ", "-").toLocaleLowerCase();
    Video.find({code: { $regex: search }}).exec((err, docs)  => {
        if(!err) res.json(docs);
        else res.send("Error: " + err);
    });
})
// Get videos sort years
router.get('/order/year', (req, res) => {
    Video.find({}).sort({year: -1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err, docs) {
        if(!err) res.send(docs)
        else console.log("Erro to get data : " + err);
    });
})
// Create new quote
router.post('/new', async (req,res) => {
    const newVideos = new Video(req.body);
    const saveVideos = await newVideos.save();
    // Update Genres
    saveVideos.genres.map(async (genre_id) => {
        await Genre.findByIdAndUpdate({_id: genre_id}, {$push: {videos: saveVideos._id}}).exec((err, docs) => {
            if(err) res.send("Error: " + err);
        })
    });
    // Update Types
    await Type.findByIdAndUpdate({_id: req.body.type}, {$push: {videos: saveVideos._id}}).exec((err, docs) => {
        if(err) res.send("Error: " + err);
    })
    // Update Directors
    saveVideos.directors.map(async (director_id) => {
        await Director.findByIdAndUpdate({_id: director_id}, {$push: {videos: saveVideos._id}}).exec((err, docs) => {
            if(err) res.send("Error: " + err);
        })
    });
    // Update Actors
    saveVideos.actors.map(async (actor_id) => {
        await Actor.findByIdAndUpdate({_id: actor_id}, {$push: {videos: saveVideos._id}}).exec((err, docs) => {
            if(err) res.send("Error: " + err);
        })
    });
    res.json(saveVideos._id);
});

// Delete specific videos
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    // Delete Videos
    Video.findByIdAndDelete({_id: id}).exec(async(videoErr, videosDocs) => {
        if(!videoErr){
            // Delete video in Genres
            await videosDocs.genres.map(async (genre_id) => {
                await Genre.findByIdAndUpdate({ _id: genre_id }, { "$pull": { "videos": id }}).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            // Delete video in Director
            await videosDocs.directors.map(async (director_id) => {
                await Director.findByIdAndUpdate({ _id: director_id }, { "$pull": { "videos": id }}).exec((err, doc) => {
                    if(err) res.send("Error: " + err);
                });
            })
            // Delete video in Types 
            await Type.findByIdAndUpdate({ _id: videosDocs.type }, { "$pull": { "videos": id }}).exec((err, doc) => {
                if(err) res.send("Error: " + err);
            });
            res.json(videosDocs);
        } else res.send("Error: " + videoErr);
    });
});

// Update specific video
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const findVideos = await Video.findById({_id: id});
    // Delete all Genres before update
    if(req.body.genres){
        Video.findById({_id: id}).exec(async (videoErr, videoDoc) => {
            if(!videoErr){
                // Delete all genre in video
                await videoDoc.genres.map(async(genre_id) => {
                    await Genre.findByIdAndUpdate({ _id: genre_id }, { "$pull": { "videos": findVideos._id }}).exec((err, doc) => {
                        if(err) res.send("Error: "+ err)
                    });
                });
                // Add new genre in video
                await req.body.genres.map(async (genre_id) => {
                    await Genre.findByIdAndUpdate({_id: genre_id}, {$push: {videos: findVideos._id}}).exec((err, doc) => {
                        if(err) res.send("Error: " + err);
                    })
                });
            }
            else res.send("Error: "+videoErr)
        }); 
    }
    // Update type
    if(req.body.type){
        // Delete video in Types
        await Type.findByIdAndUpdate({_id: findVideos.type}, { $pull: { "videos": id }}).exec((err, doc) => {
            if(err) res.send("Error: "+ err)
        });
        // Update type
        await Type.findByIdAndUpdate({_id: req.body.type}, { $push: { "videos": id }}).exec((err, doc) => {
            if(err) res.send("Error: "+ err)
        });
    }
    // Update platform
    if(req.body.platform){
        // Delete video in Types
        await Platform.findByIdAndUpdate({_id: findVideos.platform}, { $pull: { "videos": id }}).exec((err, doc) => {
            if(err) res.send("Error: "+ err)
        });
        // Update type
        await Type.findByIdAndUpdate({_id: req.body.platform}, { $push: { "videos": id }}).exec((err, doc) => {
            if(err) res.send("Error: "+ err)
        });
    }
    // Update Director
    if(req.body.directors){
        Video.findById({_id: id}).exec(async(videoErr, videosDocs) => {
            if(!videoErr){
                console.log(videosDocs);
                // Delete all director in video
                await videosDocs.directors.map(async(director_id) => {
                    await Director.findByIdAndUpdate({ _id: director_id }, { "$pull": { "videos": findVideos._id }}).exec((err, doc) => {
                        if(err) res.send("Error: "+ err)
                    });
                });
                // Add new director in video
                await req.body.directors.map(async (director_id) => {
                    await Director.findByIdAndUpdate({_id: director_id}, {$push: {videos: findVideos._id}}).exec((err, doc) => {
                        if(err) res.send("Error: " + err);
                    })
                });
            }
            else res.send("Error: "+videoErr)
        }); 
    }
    await Video.updateOne({_id: id}, {$set: req.body}).exec((err, doc) => {
        if(!err) res.json(doc);
        else res.send("Error: " + err)
    });
});

// Add new Genre
router.patch('/update/genres/add/:id', async (req, res) => {
    const id = req.params.id;
    // Add Genres in Video
    Video.findByIdAndUpdate({_id: id}, {$push: {genres: req.body.flat()}}).exec( async (videoErr, videoDoc) => {
        if(!videoErr){
            // Loop on each genres
            await req.body.map(async (genre_id) => {
                // Update Genres
                await Genre.findByIdAndUpdate({_id: genre_id}, {$push: {videos: id}}).exec((err, doc) => {
                    if(err) res.send("Error: "+ err);
                })
            })
            res.json(videoDoc)
        } else res.send("Error: " + videoErr)
    })
});
// Remove specific genre
router.patch('/update/genres/delete/:id/:genre_id', async (req, res) => {
    const id = req.params.id;
    const genre_id = req.params.genre_id
    // Update Video
    Video.findByIdAndUpdate({_id: id}, {$pull: {genres: genre_id}}).exec((videoErr, videoDoc) => {
        if(!videoErr){
            // Update genre
            Genre.findByIdAndUpdate({_id: genre_id}, {$pull: {videos: id}}).exec((err, doc) => {
                if(!err) res.json(videoDoc)
                else res.send("Error: " + err);
            })
        } else res.send("Error: " + videoErr);
    })
});

// Add new Director
router.patch('/update/directors/add/:id', async (req, res) => {
    const id = req.params.id;
    // Add Director in Video
    Video.findByIdAndUpdate({_id: id}, {$push: {directors: req.body.flat()}}).exec( async (videoErr, videoDoc) => {
        if(!videoErr){
            // Loop on each director
            await req.body.map(async (director_id) => {
                // Update Director
                await Director.findByIdAndUpdate({_id: director_id}, {$push: {videos: id}}).exec((err, doc) => {
                    if(err) res.send("Error: "+ err);
                })
            })
            res.json(videoDoc)
        } else res.send("Error: " + videoErr)
    })
});
// Remove specific director
router.patch('/update/directors/delete/:id/:director_id', async (req, res) => {
    const id = req.params.id;
    const director_id = req.params.director_id
    // Update Video
    Video.findByIdAndUpdate({_id: id}, {$pull: {directors: director_id}}).exec((videoErr, videoDoc) => {
        if(!videoErr){
            // Update genre
            Director.findByIdAndUpdate({_id: director_id}, {$pull: {videos: id}}).exec((err, doc) => {
                if(!err) res.json(videoDoc)
                else res.send("Error: " + err);
            })
        } else res.send("Error: " + videoErr);
    })
});

// Add Actors
router.patch('/update/actors/add/:id', async (req, res) => {
    const id = req.params.id;
    // Add Actor in Video
    Video.findByIdAndUpdate({_id: id}, {$push: {actors: req.body.flat()}}).exec( async (videoErr, videoDoc) => {
        if(!videoErr){
            // Loop on each Actor
            await req.body.map(async (actor_id) => {
                // Update Actor
                await Actor.findByIdAndUpdate({_id: actor_id}, {$push: {videos: id}}).exec((err, doc) => {
                    if(err) res.send("Error: "+ err);
                })
            })
            res.json(videoDoc)
        } else res.send("Error: " + videoErr)
    })
});
// Remove specific actor
router.patch('/update/actors/delete/:id/:actor_id', async (req, res) => {
    const id = req.params.id;
    const actor_id = req.params.actor_id
    // Update Video
    Video.findByIdAndUpdate({_id: id}, {$pull: {actors: actor_id}}).exec((videoErr, videoDoc) => {
        if(!videoErr){
            // Update genre
            Actor.findByIdAndUpdate({_id: actor_id}, {$pull: {videos: id}}).exec((err, doc) => {
                if(!err) res.json(videoDoc)
                else res.send("Error: " + err);
            })
        } else res.send("Error: " + videoErr);
    })
});
module.exports = router;