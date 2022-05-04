const jwt = require("jsonwebtoken");

//this will check the staff is verified
staffAuth = async (req,res,next) => {
    try {

        let token

        if(!req.headers.authorization)
            res.status(401).json({success: false, message: "No authorization header found"})

        //checking the token type is Staff
        if(req.headers.authorization.startsWith("Staff")){
            //token is an array, this will take the data in the first index
            token = req.headers.authorization.split(" ")[1];
        }
        
        //get data from token
        let decodedData;
        decodedData = jwt.verify(token, process.env.JWT_SECRET);

        //add staff id to request
        req.staffID = decodedData?.id;

        //if all data is valid pass to next step
        next();
    } catch (error) {
        res.status(401).json({success: false, message: "Staff Authentication failed", error: error.message})
    }
}

module.exports = staffAuth;