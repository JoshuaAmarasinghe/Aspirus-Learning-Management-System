const mongoose= require('mongoose');

const Schema =mongoose.Schema;

const studentSchema= new Schema({
    title :{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    itnumber:{
        type:String,
        required:true 
    },

    gender:{
        type:String,
        required:true 
    },

    nic:{
        type:String,
        required:true 
    },


    birthday:{
        type:String,
        required:true 
    },


    contactnumber:{
        type:Number,
        required:true 
    },
    address:{
        type:String,
        required:true 
    },

    email:{
        type:String,
        required:true 
    },

    batch:{
        type:String,
        required:true 
    },

    password:{
        type:String,
        required:true 
    }

})

const Student =mongoose.model("Student",studentSchema);

module.exports=Student;