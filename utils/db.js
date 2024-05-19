import { mongodb } from 'mongodb';
import { Collection } from 'mongodb/lib/collection';
import envLoader from './env_loader';

class DBClient {
    constructor() {
        envLoader();
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.PORT || 27017;
        const database = process.env.DATABASE || 'files_manager';
        const dbURL = `mongodb://${host}:${port}/${database}`;

        this.client = new mongodb.mongoClient(dbURL, { useUnifiedTopology: true });
        this.client.connect();        
    }
    isAlive() {
        return this.client.isConnected();
    }

    //retrieve number of users in the database
    async nbUsers() {
        return this.client.db().collection('users').countDocuments();
    }

    //retrieves number of files in the database
    async nbFiles() {
        return this.client.db().collection('files').countDocuments();
    }

    //retrieve a reference to the user collection
    async usersCollection() {
        return this.client.db().collection('users');
    }

    //retrieve a reference to the files collection
    async filesCollection() {
        return this.client.db().collection('files');
    }
}

export const dbClient = new DBClient();
export default dbClient;