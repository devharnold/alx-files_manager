import { v4 as uuid4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController{
    // request to connect a user
    static async getConnect(req, res) {
        const { user } = req;
        const token = uuid4();

        await redisClient.set(`auth_${token}`, user._id.toString(), 24, * 60 * 60);
        res.status(200).json({ token });
    }

    // request to disconnect a user
    static async getDisconnect(req, res) {
        const token = req.headers['x-token'];

        await redisClient.del(`auth_${token}`);
        res.status(204).send();
    }
}