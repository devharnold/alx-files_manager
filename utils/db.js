
const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        this.db = null;
        this.client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
        this.client.connect((err) => {
            if (err) {
                console.error('Error trying to connect to database...', err);
                return;
            }
            this.db = this.client.db('files_manager');
        })
    }
    isAlive() {
        if (this.db) return true;
        return false;
    }
    async nbUsers() {
        const users = this.db.collection('users');
        const count = await users.countDocuments();
        return count;
    }
    async nbFiles() {
        const files = this.db.collection('files');
        const count = await files.countDocuments();
        return count;
    }
}

export default DBClient;














// const { mongoClient } = require('mongodb');
// 
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// 
// const db_name = 'files_manager';
