// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.

const express = require('express');
const router = express.Router();


const users = require('../controllers/users');
const admin = require('../controllers/admin');

router.post('/register', users.create);
router.post('/authenticatea', users.authenticate);
router.post('/authenticate', admin.authenticate);




router.get('/user', users.getUser);

/*  router.post('/post-hopital', hopital.postHopital); */


router.get('/getuser/:id', users.showUser);

router.put('/updateuser/:id', users.updateUser);
router.delete('/deleteuser/:id', users.deleteUser);

module.exports = router;