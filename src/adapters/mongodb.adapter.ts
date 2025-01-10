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

      //Data base start test
      console.log("Star test");
      const collectionNames = await this.db.listCollections().toArray();
      const existingCollections = collectionNames.map((c) => c.name);
      const requiredCollections = ["ACL", "Roles", "UsersSettings", "users"];

      for (const collection of requiredCollections) {
        if (!existingCollections.includes(collection)) {
          await this.db.createCollection(collection);
          console.log(`${collection} collection created`);

          if (collection === "ACL") {
            await this.insert("ACL", {
              endPoint: "/api/users",
              powers: [
                {
                  role: "admin",
                  list: ["get", "post", "delete"],
                },
                {
                  role: "auditor",
                  list: ["get", "put"],
                },
              ],
            });
          }

          if (collection === "Roles") {
            await this.insert("Roles", {
              role_id: 890,
              role_name: "admin",
            });
            await this.insert("Roles", {
              role_id: 714,
              role_name: "auditor",
            });
          }
        } else {
          console.log(`${collection} collection already exists`);
        }
      }
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
