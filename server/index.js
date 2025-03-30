const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("../server/model/user");
const dotenv=require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true, 
}));


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password==password){
                res.json("Success");
            }
        } else {
            return res.json("No record existed")
        }
    })
})

app.post("/login", (req, res) => {
    console.log(req.body.email, req.body.password);
    res.send("User login successfully!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
