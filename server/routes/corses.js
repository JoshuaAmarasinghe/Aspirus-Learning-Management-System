const router = require("express").Router();
let Corse = require("../models/corse");

http://Localhost:8070/corse/add
// add from hear
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const disctription = req.body.disctription;
    const image = (req.body.image);

    const newCorse = new Corse({
        name,
        disctription,
        image
    })

    newCorse.save().then(()=>{
        res.json("Corse Added")
    }).catch(()=>{
        console.log(err);
    })

})

http://Localhost:8070/corse


//details

router.route("/").get((req,res)=>{
    Corse.find().then((Corses)=>{
        res.json(Corses)
    }).catch((err)=>{
        console.log(err)
    })
})



http://Localhost:8070/corse/update/

//update from hear

router.route("/update/:id").put(async (req,res) =>{
    let moduleCode = req.params.id;
    const {name, disctription, image} = req.body;

    const updateCorse = {
        name,
        disctription,
        image
    }

    const update = await Corse.findByIdAndUpdate(moduleCode, updateCorse).then(() =>{
        res.status(200).send({status: "corse updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "error update"});
    })

})


//delete from hear

router.route("/delete/:id").delete(async(req,res) =>{
    let moduleCode = req.params.id;

    await Corse.findByIdAndDelete(moduleCode).then(()=>{
        res.status(200).send({status: "corse deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "error delete"});
    })
})

module.exports = router;




