const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    logo: {type: String, required: true},
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Videos"}]
});

module.exports = mongoose.model('Platforms', PlatformSchema);