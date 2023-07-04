const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(express.static('static'))

const mongoose = require('mongoose');
const bodyparser = require("body-parser")
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/contactDance');
}
const port = 80;
//define schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String 
  });

  const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS RELATED
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG RELATED
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const para = {}
    res.status(200).render('home.pug', para);
})
 
app.get('/contact', (req, res)=>{
    const para = {}
    res.status(200).render('contact.pug', para);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("Saved to database")
    })
    .catch(()=>{
        res.status(404).send("Not Saved")
    })
    // res.status(200).render('contact.pug');
})
 
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});