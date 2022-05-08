const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    
    moduleId : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    description :{
        type : String,
        required: true
    },
    image :{
        type : String,
        required: true
    }
    

})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;





