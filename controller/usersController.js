const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = mongoose.model('userModel');
const {JWT_SECRET} = require('../config');

const usersController = {
    signup: (req, res) => {
        const {fullName, email, password, profileImg} = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({error: "One or more mandatory fields are empty"});
        };

        userModel.findOne({email: email})
            .then((userInDb) => {
                if (userInDb) {
                    return res.status(500).json({error: "User with this email is already registered"});
                };
                bcrypt.hash(password, 16)
                    .then((hashedPassword) => {
                        const user = new userModel({fullName, email, password: hashedPassword, profileImg});
                        user.save()
                            .then((newUser) => {
                                res.status(201).json({result: "User signed up succefully!"});
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    },
    login: (req, res) => {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({error: "One or more mandatory fields are empty"});
        };

        userModel.findOne({email: email})
            .then((userInDb) => {
                if (!userInDb) {
                    return res.status(500).json({error: "Invalid credentials"});
                };
                bcrypt.compare(password, userInDb.password)
                    .then((didMatch) => {
                        if (didMatch) {
                            const jwtToken = jwt.sign({_id: userInDb._id}, JWT_SECRET);
                            const userInfo = {"email": userInDb.email, "fullName": userInDb.fullName, "_id": userInDb._id};
                            res.status(201).json({result: {token: jwtToken, user: userInfo}});
                        } else {
                            return res.status(500).json({error: "Invalid credentials"});
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

module.exports = usersController;