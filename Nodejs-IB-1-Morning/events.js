const { log, clear } = require("console");
const EventEmitter = require("events")

const downloadProgress = new EventEmitter

// const logger = new EventEmitter()


// logger.on("message",(user, message)=>{
//     console.log(`${user}: ${message}`);
// })


// // logger.emit("message","Person A", "hello World")
// logger.emit("message","Person B", "Testing")
// eventEmitter.emit("message","Hello World");
let percent = 0;

downloadProgress.on("progress",(present)=>{
    console.log(`Downloaded ${percent}%`)
})


const interValId = setInterval(()=>{

    if(percent<100){
        percent+=10;
        downloadProgress.emit("progress",percent);
    }else{
        clearInterval(interValId)
    }

},1000)