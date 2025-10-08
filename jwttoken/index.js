const jwt = require("jsonwebtoken")
const express = require("express")
const user={
    id: 123
}
const SECRET_KEY = "123456dsfsdfasdf";
const payload = {
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
const token = jwt.sign(payload,SECRET_KEY);
console.log(token)

// const decodedPayload = jwt.verify(token, SECRET_KEY);
// console.log(decodedPayload);
const changed_key="alksdjfklaj";
try {
  const decoded = jwt.verify(token, changed_key);
  console.log("\n✅ Token verified successfully with correct key:");
  console.log(decoded);
} catch (err) {
  console.log("\n❌ Error verifying with correct key:", err.message);
}


const app = express.json()
// app.post("/login", async(request, response)=>{
//     const {username, password} = request.body;
// })