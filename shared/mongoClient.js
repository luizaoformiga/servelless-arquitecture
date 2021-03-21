import { MongoClient } from 'mongodb';
import 'dotenv/config';

const config = {
  url: process.env.DATABASE_URL,
}

export default () => new Promise((resolve, reject) => {
  MongoClient
    .connect(config.url, { useNewUrlParser: true }, (error, mongoConnection) =>
      error
      ? reject(error)
      : resolve({
          client: mongoConnection.db(config.dbName),
          closeConnectionFn: () => setTimeout(() => {
            mongoConnection.close();
          }, 1000),
          mongoConnection
        })
    )
})