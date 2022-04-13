const router= require ("express").Router();
let Student =require("../models/Student");

//.............................
router.route("/add").post((req,res)=>{

    const title=req.body.title;
    const fullname=req.body.fullname;
    const itnumber=req.body.itnumber;
    const gender=req.body.gender;
    const nic=req.body.nic;
    const birthday=req.body.birthday;
    const contactnumber=Number(req.body.contactnumber);
    const  address=req.body.address;
    const email=req.body.email;
    const batch=req.body.batch;
    const password=req.body.password;
   
     const newStudent =new Student({
         title,
         fullname,
         itnumber,
         gender,
         nic,
         birthday,
         contactnumber,
         address,
         email,
         batch,
         password
     })
 
      newStudent.save().then(()=>{
       
       res.json("Student Added")  

      }).catch((err)=>{

        console.log(err);
      })
})


//...................................
router.route("/view").get((req,res)=>{
    Student.find().then((student)=>{
        res.json(student)
    }).catch((err)=>{
        console.log(err)
    })
    })

    //..............................................
    router.route("/update/:id").put(async (req,res) =>{
       let userId=req.params.id;
       //distructure
       const {title,fullname,itnumber,gender,nic,birthday,contactnumber,address,email,batch,password}=req.body;
      
       const updateStudent=({
       
        title,
        fullname,
        itnumber,
        gender,
        nic,
        birthday,
        contactnumber,
        address,
        email,
        batch,
        password
       })
       
       const update= await Student.findByIdAndUpdate(userId,updateStudent).then(()=>{

        res.status(200).send({status:"user updated",user:updateStudent})
       }).catch((err) =>{
           console.log(err);
           res.status(500).send({status :"Error with updating data",error: err.message});
       })  

    })

    //............................
    router.route("/delete/:id").delete(async(req,res) =>{
         let userId=req.params.id;

         await Student.findByIdAndDelete(userId).then(()=>
        {
            res.status(200).send({status: "User delete"});
        }).catch((err) =>{
            console.log(err.message);
            res.status(500).send({status: "Error with deleting user",error: err.message})
        })
        })

        router.route("/get:id").get(async (req,res) =>{
           let userId=req.params.id;
           await Student.findById(userId) 
           .then(() =>{
               res.status(200).send({status: "User featch",user:user})
               .catch(()=>{
                   console.log(err.message);
                   res.status(500).send({status:"error with user"})
               })
           })
        })
    

module.exports = router;