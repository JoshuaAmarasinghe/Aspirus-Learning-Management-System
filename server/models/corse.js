const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const corseSchema = new Schema({
    
    name : {
        type : String,
        required: true
    },
    disctription :{
        type : String,
        required: true
    },
    image : {
        type : String,
        required: true
    }


})

const Corse = mongoose.model("Corse", corseSchema);

module.exports = Corse;





