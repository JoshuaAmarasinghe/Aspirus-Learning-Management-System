const router = require("express").Router();
let Content = require("../models/content");

http://Localhost:8070/corse/add
// add from hear
router.route("/add").post((req,res)=>{
    const title = req.body.title;
    const disctription = req.body.disctription;
    

    const newContent = new Content({
        title,
        disctription
        
    })

    newContent.save().then(()=>{
        res.json("Content Added")
    }).catch(()=>{
        console.log(err);
    })

})

http://Localhost:8070/corse


//details

router.route("/").get((req,res)=>{
    Content.find().then((contents)=>{
        res.json(contents)
    }).catch((err)=>{
        console.log(err)
    })
})



http://Localhost:8070/corse/update/

//update from hear

router.route("/update/:id").put(async (req,res) =>{
    let contentId = req.params.id;
    const {title, disctription} = req.body;

    const updateCorse = {
        title,
        disctription
    }

    const update = await Content.findByIdAndUpdate(contentId, updateCorse).then(() =>{
        res.status(200).send({status: "content updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "error update"});
    })

})


//delete from hear

router.route("/delete/:id").delete(async(req,res) =>{
    let moduleCode = req.params.id;

    await Content.findByIdAndDelete(moduleCode).then(()=>{
        res.status(200).send({status: "Content deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "error delete"});
    })
})

module.exports = router;




