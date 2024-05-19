
const redis = require('redis');
import { createClient } from 'redis';


class RedisClient{
    constructor(client) {
        this.client = client || createClient();
        this.connected = false // on initial, client not connected
        this.client.on('connect', () => {
            this.connected = true
            console.log('Redis succesfully connected to the server'); // this happens when a successful connection has taken place
        });
        this.client.on('error', () => {
            this.connected = false
            console.log('Redis failed to connect to the server'); // failed connection
        });
    }
    isAlive() {
        return this.client.connected;
    }
    async getRedisValue(key) {
        const getAsync = promisify(this.client.get).bind(this.client); 
        const value = await getAsync(key);
        return value;
    }
    async setRedisValue(key, value, duration) {
        this.client.setex(key, duration, value);
    }
    async delRedisValue(key) {
        this.client.del(key);
    }
}

export default RedisClient; // export the class
