const express =require('express')
const app =express();
const studentRouter=require('./routers/StudentRouter')
const morgan =require('morgan')
const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/my-db-2',{

})

.then(()=>console.log("Connected to mongodb"))
.catch(err=>console.log("MongoDb connection Failed!"))

app.use(express.json());
app.use(morgan('dev'))
app.use('/students',studentRouter)

app.get('/',(req,res)=>{
    res.send("Hello from express Js ")
})

const port =3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
})