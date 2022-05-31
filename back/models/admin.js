// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    email: {
        type: String,

        required: true
    },
    password: {
        type: String,

        required: true
    }
});

adminSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('admin', adminSchema);