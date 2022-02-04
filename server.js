const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const mongoose =require('mongoose');
const app=require('./app')

mongoose.connect('mongodb://localhost:27017/NewDb2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})
.then(()=>console.log("Connected to Mongodb"))
.catch(err=>console.error("Mongodb Connection Failed"))


const port =process.env.PORT;

app.listen(port,()=>{
    console.log(`Listining on port ${port}`);

})