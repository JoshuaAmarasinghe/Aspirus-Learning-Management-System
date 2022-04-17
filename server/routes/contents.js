const router = require("express").Router();
const Content = require("../models/content");
let Course = require("../models/content");


// add from hear http://Localhost:8070/course/add
router.route("/add").post((req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
   

    const newContent = new Content({
        title,
        description
      
    })

    newContent.save().then(()=>{
        res.json("Content added")
    }).catch(()=>{
        console.log(err);
    })

})




//detailsv   http://Localhost:8070/corse

router.get('/', async(req,res)=>{
    try{
        const allContent = await Content.find();
        res.status(200).send({data : allContent});
    }catch(err){
        res.status(500).send({data : err});
    }
})

//This route used to view specific notice or event from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const onecontent = await Content.find({_id : id})
        res.status(200).send({data : onecontent});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//update from hear   http://Localhost:8070/course/update/

//update notice or event
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {title, description} = req.body;


        const updatecontent = new Course({
           _id,title, description
        }); 

        await Course.findByIdAndUpdate(_id,updatecontent)
        res.status(200).send({data : updatecontent});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//delete from hear


//This route used to delete notice or event from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedcontent = await Course.findByIdAndDelete(id)
        res.status(200).send({status: "content deleted"});
        //res.status(200).send({data : removedcourse});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;




