const mongoose = require('mongoose');
const foodpartnerModel = require('./foodpartner.model');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    video: { type: String, required: true }, //never store file in db it takes too much space instead use url of the videos and we will store the videos in cloud storage provider
    description: { type: String },
    foodPartner: { type: mongoose.Schema.Types.ObjectId, ref: foodpartnerModel }

});
const foodModel = mongoose.model('Food', foodSchema);
module.exports = foodModel;
