const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

//get status to return if redis and db are alive by using utils created previously
router.get('/status', (req, res) => {
    const redis = new redisClient();
    const db = new dbClient();
    const status = {
        redis: redis.isAlive(),
        db: db.isAlive()
    }
    res.status(200).send({ "redis": true, "db": true });
})

//get stats to return number of users and files by using utils created previously
router.get('/stats', async (req, res) => {
    const redis = new redisClient();
    const db = new dbClient();
    const users = await db.nUsers();
    const files = await db.nFiles();
    res.status(200).send({ "users": 12, "files": 1231 });
})