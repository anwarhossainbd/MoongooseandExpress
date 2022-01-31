const express =require('express');
const {Student}=require('../models/students');
const router= express.Router();

const newStudent = async (req, res) => {
    const student = new Student(req.body);
    try {
        const result = await student.save();
        res.send(result);
    } catch (err) {
        const errMsgs = [];
        for (field in err.errors) {
            errMsgs.push(err.errors[field].message);
        }
        return res.status(400).send(errMsgs);
    }

};

const studentList=async (req,res)=>{

    const students =await Student.find()
        .sort({name:1})
    res.send(students);
}

const studentDetails=async (req,res)=>{

    const id= req.params.id;

    try{
        const student =await Student.findById(id);
        if(!student){
            return res.status(404).send("ID NOT FOUND")
        }
        else {
            res.send(student)
        }

    }catch (err){
        return res.status(404).send("ID Not Found")
    }

}





router.route('/')
    .post(newStudent)
    .get(studentList)

router.route('/:id')
    .get(studentDetails)

module.exports=router