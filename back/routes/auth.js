const express = require('express')
const router = express.Router()
const User = require('../models/users');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    // bcrypt.hash(req.body.password, 10)
    //     .then(hash => {
    //         const user = new User({
    //             email: req.body.email,
    //             firstName: req.body.firstName,
    //             lastName: req.body.lastName,
    //             password: hash,
    //             createdDate: Date.now()
    //         });
    //         user.save()
    //             .then(() => res.status(201).json({ message: 'User created!' }))
    //             .catch(error => res.status(400).json({ error }));
    //     })

        try {
            const user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                createdDate: Date.now()
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created!' }))
                .catch(error => res.status(400).json({ error }));
        } catch (error) {res.status(500).json({ error })};
})
router.post('/register', (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            createdDate: Date.now()
        });
        user.save()
            .then(() => res.status(201).json({ message: 'User created!' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {res.status(500).json({ error })};
})

module.exports = router