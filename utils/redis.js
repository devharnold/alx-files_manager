#!/usr/bin/env node

const redis = require('redis');
import { createClient } from 'redis';


class RedisClient{
    constructor(client) {
        this.client = client || createClient();
        this.connected = false
        this.client.on('connect', () => {
            this.connected = true
            console.log('Redis succesfully connected to the server');
        });
        this.client.on('error', () => {
            this.connected = false
            console.log('Redis failed to connect to the server');
        });
    }
    isAlive() {
        return this.client.connected;
    }
    async function() {
        
    }
}


























































        // function isAlive() {
        //     const client = createClient().on('error', (err) => 
        //         console.log('Redis client has not connected to the server', err.message)
        // )
        // console.log('Redis client has connected to the server')
        // }