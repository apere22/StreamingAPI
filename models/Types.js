const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Videos"}]
});

module.exports = mongoose.model('Types', TypeSchema);