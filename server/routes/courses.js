const router = require("express").Router();
let Course = require("../models/course");


// add from hear http://Localhost:8070/course/add
router.route("/add").post((req,res)=>{
    const moduleId = req.body.moduleId;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
   

    const newCourse = new Course({
        moduleId,
        name,
        description,
        image
      
    })

    newCourse.save().then(()=>{
        res.json("Course Added")
    }).catch(()=>{
        console.log(err);
    })

})




//detailsv   http://Localhost:8070/corse

/*router.route("/").get((req,res)=>{
    Course.find().then((courses)=>{
        res.json(courses)
    }).catch((err)=>{
        console.log(err)
    })
})*/
router.get('/', async(req,res)=>{
    try{
        const allCourse = await Course.find();
        res.status(200).send({data : allCourse});
    }catch(err){
        res.status(500).send({data : err});
    }
})

//This route used to view specific notice or event from table
router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const onecourse = await Course.find({_id : id})
        res.status(200).send({data : onecourse});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//update from hear   http://Localhost:8070/course/update/

/*router.route("/update/:id").put(async (req,res) =>{
    let moduleCode = req.params.id;
    const {name, description} = req.body;

    const updateCourse = {
        name,
        description,
        
    }

    const update = await Course.findByIdAndUpdate(moduleCode, updateCourse).then(() =>{
        res.status(200).send({status: "course updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "error update"});
    })

})*/
//update notice or event
router.put("/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {name, description, image} = req.body;


        const updatecourse = new Course({
           _id,name, description, image
        }); 

        await Course.findByIdAndUpdate(_id,updatecourse)
        res.status(200).send({data : updatecourse});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//delete from hear
//This route used to delete notice or event from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedcourse = await Course.findByIdAndDelete(id)
        res.status(200).send({status: "course deleted"});
        //res.status(200).send({data : removedcourse});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;




