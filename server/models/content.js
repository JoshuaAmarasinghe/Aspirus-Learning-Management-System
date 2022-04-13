const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    
    title : {
        type : String,
        required: true
    },
    disctription :{
        type : String,
        required: true
    }
    


})

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;





