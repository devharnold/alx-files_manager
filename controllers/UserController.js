import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UserController {
    // create a new user
    static async postNew(req, res) {
        const email = req.body ? req.body.email : null;
        const password = req.body ? req.body.password : null;

        if (!email) {
            res.status(400).json({ error: 'Missing email' });
            return;
        }
        if (!password) {
            res.status(400).json({ error: 'Missing password' });
            return;
        }
        const user = (await dbClient.usersCollection()).findOne({ email });
        if (user) {
            res.status(400).json({ error: 'Already exists'});
            return;
        }
        const insertInfo = await (await dbClient.usersCollection())
            .insertOne({ email, password: sha1(password) });
        const userId = insertonInfo.insertedId.toString();

        userQueue.add({ userId });
        res.status(201).json({ email, id: userId });
    }
    // get details of the authenticated user
    static async getMe(req, res) {
        const { user } = req;
        req.status(200).json({ email: user.email, id: user._id.toString() });
    }
}