// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const createError = require('http-errors');



const create = (req, res, next) => {

    userModel.create({ name: req.body.name, phone: req.body.phone, email: req.body.email, password: req.body.password }, function(err, result) {
        if (err)
            next(err);
        else
            res.json({ status: "success", message: "User added successfully!!!", data: null });

    });
}
const authenticate = async(req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email }) //user mawjoud wala
    if (!user) {
        return res.status(400).send('the User not found!')

    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        //decode PasswordHash  and compard with Password enter
        const token = jwt.sign({
                userId: user.id,


            },
            "secret" //pass to creat your token
            , { expiresIn: '1d' } //kol nhar token yetbadel lel protection 
        )
        res.status(200).send({ user, token })
    } else {
        res.status(404).send('password Wrong');

    };
}


const getUser = (req, res, next) => {

    userModel.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json("Error getting User"))
}



// show one fleet
const showUser = (req, res, next) => {
    userModel.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json('Error getting the User'));
}
const updateUser = (req, res, next) => {
    userModel.findById(req.params.id)
        .then(user => {
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password

            user.save()
                .then(() => res.status(200).json('User Updated'))
                .catch(err => res.status(400).json('Error updating User'))
        })
        .catch(err => res.status(400).json('Error Getting User' + err))
}


// delete
const deleteUser = (req, res, next) => {
    userModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json('User Deleted')
        })
        .catch(err => res.status(400).json('Error deleting User' + err))
}
module.exports = {
    getUser,
    create,
    authenticate,

    showUser,
    updateUser,
    deleteUser

}