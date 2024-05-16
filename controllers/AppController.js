const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

router.get('/status', (req, res) => {
    const redis = new redisClient();
    const db = new dbClient();
    const status = {
        redis: redis.isAlive(),
        db: db.isAlive()
    }
    res.status(200).send(status);
})

router.get('/stats', async (req, res) => {
    const redis = new redisClient();
    const db = new dbClient();
    const users = await db.nUsers();
    const files = await db.nFiles();
    res.status(200).send({ users, files});
})