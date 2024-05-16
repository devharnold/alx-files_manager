const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/status', (req, res) => {
    const { email, password } = res.body;
    if(!email) {
        res.status(400).send({' error': 'Missing email' });
    }
    if(!password) {
        res.status(400).send({ 'error': 'Missing password' });
    }
    try {
        const existingUser = User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
        const newUser = new UserActivation({ email, password: hashedPassword });
        newUser.save();
        res.status(201).json({ email: newUser.email, id: newUser._id });
    } catch(error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server Error' });
    }
})