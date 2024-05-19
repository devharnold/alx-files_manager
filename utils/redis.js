import { createClient } from 'redis';
import { promisify } from 'util';

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
    async get(key){
        return promisify(this.client.GET).bind(this.client)(key);
    }

    async set(key, value, duration) {
        await promisify(this.client.SETEX)
        .bind(his.client)(key, duration, value);
    }

    async del(key) {
        return promisify(this.client.DEL).bind(this.client)(key);
    }
}

export const redisClient = new RedisClient();
export default redisClient;
