const express=require('express');
const app=express();
const StudentRouter= require('./routers/StudentRouter');
const userRouter =require('./routers/userRouter');
const authRouter=require('./routers/authRouter');
const morgan =require('morgan');

app.use(express.json())
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}


app.use('/api/student',StudentRouter);
app.use('/api/User',userRouter);
app.use('/api/auth', authRouter);

app.get('/',(req,res)=>{
    res.send("Hello from express Js ")
});



module.exports =app;