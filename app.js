const express = require('express');
const path = require("path");
const app = express();
const mongoose = require("mongoose");
//creating database
mongoose.connect('mongodb://localhost:27017/Payform'
).then(() => {
    console.log("Connection Successful");
}).catch(() => {
    console.log("Error");
})
const port = process.env.PORT || 8000;

//Define mongoose Schema

const formSchema = new mongoose.Schema({
    name: String,
    gender: String,
    address: String,
    email: String,
    userpassword: String,
    pincode: String,
    field: String,
    phone_number: String,
    date: String,
    time:String,
    check: String,
});
const Form = mongoose.model('Form', formSchema);


app.use('/static',express.static('static'));//Serving Static Files
app.use(express.urlencoded())

app.set('views', path.join(__dirname, 'views'))// Set the views directory


//ENDPOINTS
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/',(req,res)=>{
    var myData = new Form(req.body);
    myData.save().then(()=>{
        res.status(400).sendFile(path.join(__dirname+'/index.html'))
    }).catch(()=>{
        res.status(400).send("Item was not Saved to the Database")
    })
})




//Start the Server
app.listen(port, ()=>{
    console.log(`The Server is running on ${port}`);
})