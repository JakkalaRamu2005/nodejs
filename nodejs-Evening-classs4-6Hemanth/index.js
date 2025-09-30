const express = require("express");


const app = express();
const PORT = 5050;


app.use(express.json()); // middleware , converts incoming json to object


const students = [
    { id: 1, name: "Pranay", section: "IB-5" },
    { id: 2, name: "Seerisha", section: "IB-3" },
    { id: 3, name: "Hari", section: "IB-6" },
];


let nextId = 4;


app.get("/students", (request, response) => {
    const { name, section } = request.query;

    let copyOfStudents = [...students]
    if (name) {
        copyOfStudents = copyOfStudents.filter((student)=>student.name === name)
       
    }
    if (section) {

        copyOfStudents = copyOfStudents.filter((student) => student.section === section)
    }
    if(copyOfStudents.length>0) response.send(copyOfStudents);
    response.json(students);
});
// http://localhost:5050/students/1
app.get("/students/:id", (request, response) => {
    const studentId = parseInt(request.params.id);
    const student = students.find((student) => student.id === studentId);
    if (!student) {
        response
            .status(404)
            .json({ error: `Student with id ${studentId} is not found` });
    } else {
        response.json(student);
    }
});


/**
 *  const URL = ''
 *   const options = {
 *          'method' : "POST",
 *          'body' : JSON.stringify({name : "" , asdjsdhfjk : "sjdfkjf"})
 *      }
 */


app.post("/students", (request, response) => {
    const { name, section } = request.body;
    if (!name || !section) {
        return response
            .status(400)
            .json({ error: "Name and section is required.." });
    } else {
        const newStudent = {
            id: nextId++,
            name,
            section,
        };
        students.push(newStudent);
        response.status(201).json(newStudent);
    }
});


app.put("/students/:id", (request, response) => {
    const { name, section } = request.body; // getting data from postman body
    if (!name || !section) {
        return response
            .status(400)
            .json({ error: "Name and section is required.." });
    }
    const studentId = parseInt(request.params.id); // getting param from url and cvt to num
    // getting index of student object based on id
    const studentIndex = students.findIndex(
        (student) => student.id === studentId
    );
    if (studentIndex === -1) {
        return response
            .status(404)
            .json({ error: `Student with id - ${studentId} is not found` });
    } else {
        students[studentIndex] = { id: studentId, name, section };
        response.json(students[studentIndex]);
    }
});


app.delete("/students/:id", (request, response) => {
    const studentId = parseInt(request.params.id);
    const studentIndex = students.findIndex(
        (student) => student.id === studentId
    );
    if (studentIndex === -1) {
        return response
            .status(404)
            .json({ error: `Student with id - ${studentId} is not found` });
    } else {
        students.splice(studentIndex, 1);
        response.status(204).json();
    }
});


app.listen(PORT, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Server Started at http://localhost:${PORT}`);
    }
});



