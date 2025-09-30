const express = require("express");

const router = express.Router();


router.use(express.json());


router.use((request, response, next)=>{
    console.log("Login Route Invoked");
    next();
})

function loginCheck(request, response, next()){
    const {name} = request.body;

    if(name !== "admin"){
        response.status(401).json({message:"Your not admin"});
    }else{
        next();
    }
}


router("/login", (request, response)=>{
    response.send("Namastey")
})

module.exports = router;