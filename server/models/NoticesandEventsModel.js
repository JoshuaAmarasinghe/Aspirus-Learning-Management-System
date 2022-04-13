const mongoose = require("mongoose");

const NoticesAndEventsSchema = new mongoose.Schema({
    date : { type: Date, required : true },
    time : { type: String, required : true },
    venue : { type: String, required : true },
    to : { type: String, required : true },
    createdby : { type: String, required : true },
    category : { type: String, required : true },
    topic : { type: String, required : true },
    content : { type: String, required : true },
   
});

const NoticesAndEvents = mongoose.model("NoticesAndEvents",NoticesAndEventsSchema);

module.exports = NoticesAndEvents;
