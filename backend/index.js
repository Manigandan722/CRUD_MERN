const express = require('express');
const cors = require('cors');
const mongooes = require('mongoose');
const userRoute = require('./route/userRoute');

const app = express();

app.use(cors())
app.use(express.json())



app.use('/api',userRoute)


mongooes.connect('mongodb://localhost:27017')
.then(res=>console.log("db is connected"))
.catch((err)=>console.log(err))



app.listen(3001,()=>{
    console.log("App is running on 3000 port");
})