const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/User.js')

dotenv.config()
app.use(express.static("../app"));
app.use(express.json())

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true

    }, () => {
        console.log("Connected")
    }
)

app.post('/register', async (req, res) => {
    console.log(req.body)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try {   
        const savedUser = await user.save();
        res.send(savedUser)
    } catch(err) {
        res.status(313).send(err)
    }
})




app.listen(3000, () => {
    console.log("Server Running on port 3000")
})