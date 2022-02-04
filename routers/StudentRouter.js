
const express=require('express');
const {Student}=require("../models/students");
const router=express.Router();


const newStudent =async (req,res)=>{
    const student = new Student(req.body);
    try{
        const result= await student.save();
        res.send(result);
    }catch (err){
        const errMsg=[];
        for (field in err.errors){
            errMsg.push(err.errors[field].message)
        }
        return res.status(400).send(errMsg);
    }
}

const studentList =async(req,res)=>{
    const student = await Student.find()
    .sort({name:1})
    res.send(student)
}

const studentDetails =async (req,res)=>{
    const id =req.params.id ;
    try {
        const student = await Student.findById(id)
        res.send(student)
    }catch (err){
        return res.status(404).send("ID NOT FOUND")
    }
}


const studentUpdate =async (req,res)=>{
    const id =req.params.id ;
    const updateData =req.body ;
    try {
        const student = await Student.findByIdAndUpdate(id,updateData,{
            new:true,useFindAndModify:false
        })
        res.send(student)
    }catch (err){
        return res.status(404).send("ID NOT FOUND")
    }
}

const studentDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findByIdAndDelete(id);

        if (!student) return res.status(404).send('ID not found!');
        res.send(student);

    } catch (err) {
        return res.status(404).send('ID not found!');
    }
};

router.route('/')
     .get(studentList)
     .post(newStudent)

 router.route('/:id')
     .get(studentDetails)
     .put(studentUpdate)
     .delete(studentDelete)

module.exports =router;