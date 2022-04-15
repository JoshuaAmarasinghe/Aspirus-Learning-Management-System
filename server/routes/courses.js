const router = require("express").Router();
let Course = require("../models/course");


// add from hear http://Localhost:8070/course/add
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
   

    const newCourse = new Course({
        name,
        description
      
    })

    newCourse.save().then(()=>{
        res.json("Course Added")
    }).catch(()=>{
        console.log(err);
    })

})




//detailsv   http://Localhost:8070/corse

router.route("/").get((req,res)=>{
    Course.find().then((Courses)=>{
        res.json(Courses)
    }).catch((err)=>{
        console.log(err)
    })
})





//update from hear   http://Localhost:8070/course/update/

router.route("/update/:id").put(async (req,res) =>{
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

})


//delete from hear

router.route("/delete/:id").delete(async(req,res) =>{
    let moduleCode = req.params.id;

    await Course.findByIdAndDelete(moduleCode).then(()=>{
        res.status(200).send({status: "course deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "error delete"});
    })
})

module.exports = router;




