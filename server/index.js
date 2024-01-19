const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const productRouter = require("./routes/products");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/myapp')
    .then(console.log("Connected to DB successfully!"))
    .catch(err => console.log(err));

app.use("/users", userRouter); 
app.use("/products", productRouter);   

app.listen(3001, () => console.log("App is running on port 3001..."));



