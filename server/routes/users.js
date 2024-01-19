const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            return res.json({ errMsg: "User already exists!" });
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        res.json({ message: "Registered successfully!" });

    } catch (err) {
        res.status(500).json({errMsg: "Error when trying to register!", err})
    }
});

userRouter.post("/login", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });

    try {
        if (!user) {
            res.json({ err: "User does not exist!" });
            return;
        };

        const passIsValid = await bcrypt.compare(password, user.password);

        if (!passIsValid) {
            res.json({ err: "Incorrect credentials!" });
            return;
        };


        const token = jwt.sign({ id: user._id }, "secret");


        res.json({ token, userID: user._id });


    } catch (err) {
        res.json({ message: "Error when trying to log in!"})
    }

});

userRouter.get("/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user!" })
    }
})


module.exports = userRouter;