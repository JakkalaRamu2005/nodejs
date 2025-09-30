const express = require("express");
const app = express();
const loginRoute = require("./loginRoute.js")
app.use(express.json());


app.use(express.static("public"));

app.get("/", (request, response)=>{
  response.send("no Error");
})

function errorHandler(err, request, response, next){
  console.log(err.stack);
  console.log(err.status);
  response.status(err.status || 500).json({message:"internal server error"});
}
app.use(errorHandler);

app.get("/error", (request, response,next)=>{
  const error = new Error("This is Error");
  error.status = 400;
  next(error);
})



function requestLogger(request, response, next){
  console.log(`${request.originalUrl} ${request.method}`);
  next();
}


function dateLogger(request, response, next){
  console.log(`Date: ${new Date()}`);
  next();
}

function isAdmin(request, response, next){
  const {isadmin} = request.query;

  if(isadmin==="true"){
    next();
  }else{
    response.status(401).json({error:"Unauthorized"});
  }
}

function isAdminAgain(request, response, next){
  console.log("isAdmin check Again");
  next();
  
}

app.use(requestLogger);
app.use(dateLogger);

app.get("/about", (request, response)=>{
  response.send("About Page");
})


app.get("/admin", isAdmin, isAdminAgain, (request, response)=>{

  response.json({message: "Hi Admin"})
})


app.post("/about",(request, response)=>{
  response.send("Post About Page")
})

app.put("/about/:id", (request, response)=>{
  response.send("PUt About Page")
})



app.listen(3000,()=>{
  console.log("app is started at the port 3000");
})