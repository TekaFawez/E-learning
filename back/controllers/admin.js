// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
module.exports = {

    authenticate,



}