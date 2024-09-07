import { Db } from "mongodb";
import { MongoClient } from "mongodb";

export abstract class MongoDBAdapter {
  abstract init(dbName: string): Promise<void>;

  abstract find(collection: string, queries: any): Promise<any>;
}

export class MongoDBAdapterImpl implements MongoDBAdapter {
  private client: MongoClient;
  private db: Db;

  async init(dbName: string): Promise<void> {
    try {
      const url = process.env.MONGODB_URL;
      console.log("DB url", url);
      this.client = new MongoClient(url);
      await this.client.connect();
      console.log("DB NAME", dbName);
      this.db = this.client.db(dbName);
    } catch (error) {
      console.error(error);
    }
  }

  async find(collectionName: string, queries: any): Promise<any> {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.find(queries).toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
