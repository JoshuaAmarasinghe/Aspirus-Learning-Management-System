const router = require("express").Router();
const NoticesAndEvents = require("../models/NoticesandEventsModel");

//Add new notice or event
router.post('/add',async(req,res)=>{
    try{
        const {date,time,venue,to,createdby,category,topic,content} = req.body;
       
        const newNoticesAndEvents = new NoticesAndEvents({
            date,time,venue,to,createdby,category,topic,content
        });

        const savedNoticesAndEvents = await newNoticesAndEvents.save();
        res.status(200).send({data : savedNoticesAndEvents});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all notices and events
router.get('/', async(req,res)=>{
    try{
        const allNoticesAndEvents = await NoticesAndEvents.find();
        res.status(200).send({data : allNoticesAndEvents});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update notice or event
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {date,time,venue,to,createdby,category,topic,content} = req.body;


        const updateNoticesAndEvents = new NoticesAndEvents({
           _id,date,time,venue,to,createdby,category,topic,content
        }); 

        await NoticesAndEvents.findByIdAndUpdate(_id,updateNoticesAndEvents)
        res.status(200).send({data : updateNoticesAndEvents});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific notice or event from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const notices_and_events = await NoticesAndEvents.find({_id : id})
        res.status(200).send({data : notices_and_events});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete notice or event from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedNoticesAndEvents = await NoticesAndEvents.findByIdAndDelete(id)
        res.status(200).send({data : removedNoticesAndEvents});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;