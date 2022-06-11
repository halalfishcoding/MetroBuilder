const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes')

dotenv.config()
app.use(express.static("../app"));
app.use(express.json())
app.use(routes)

mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true}, () => {
        console.log("Connected")
    }
)


app.listen(3000, () => {
    console.log("Server Running on port 3000")
})

