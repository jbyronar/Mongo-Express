import { Db } from "mongodb";
import { MongoClient } from "mongodb";

export abstract class MongoDBAdapter {
  abstract init(dbName: string, from: string): Promise<void>;
  abstract find(collection: string, queries: any): Promise<any>;
  abstract insert(collection: string, document: any): Promise<any>;
  abstract delete(collection: string, query: any): Promise<any>;
  abstract update(collection: string, query: any, update: any): Promise<any>;
}

export class MongoDBAdapterImpl implements MongoDBAdapter {
  private client: MongoClient;
  private db: Db;

  async init(dbName: string, from: string): Promise<void> {
    try {
      const url = process.env.MONGODB_URL;
      console.log("DB url", url);
      this.client = new MongoClient(url);
      await this.client.connect();
      console.log(`${dbName} from ${from}`);
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

  async insert(collectionName: string, document: any): Promise<any> {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(document);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(collectionName: string, query: any): Promise<any> {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.deleteOne(query);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(collectionName: string, query: any, update: any): Promise<any> {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.updateOne(query, { $set: update });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
