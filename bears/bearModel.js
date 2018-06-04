//create a model
const mongoose = require('mongoose');

//below we design our schema
const BearSchema = mongoose.Schema({
    species:{
        type: String,
        required: true, 
        unique: true
    },
    latinName:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now()
    } 
})

const bearsModel = mongoose.model('Bear', BearSchema); // this is where we declare this as a model.
// by passing our BearSchema to this model we declare that it will be a collection.

module.exports = bearsModel;