const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    moduleId : {
        type : String,
        required: true
    },
    title : {
        type : String,
        required: true
    },
    description :{
        type : String,
        required: true
    }
    /*file:{
        type:Buffer,
        contentType:String
    }*/
    


})

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;





