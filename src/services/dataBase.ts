import {
  MongoDBAdapter,
  MongoDBAdapterImpl,
} from "../adapters/mongodb.adapter";
import dotenv from "dotenv";
dotenv.config();

const mongodb: MongoDBAdapter = new MongoDBAdapterImpl();
const dbName = "example";
mongodb.init(dbName, "dataBase services");

export const findByQuery = async (collection: string, query: any) => {
  const result = await mongodb.find(collection, query);
  return result;
};

export const findById = async (collection: string, id: number) => {
  const result = await mongodb.find(collection, { id: id });
  return result;
};

export const findAll = async (collection: string) => {
  const result = await mongodb.find(collection, {});
  return result;
};

export const create = async (collection: string, data: object) => {
  const result = await mongodb.insert(collection, data);
  return result;
};

export const deleteById = async (collection: string, id: number) => {
  const result = await mongodb.delete(collection, { id: id });
  return result;
};

export const updateById = async (
  collection: string,
  id: number,
  data: object,
) => {
  const result = await mongodb.update(collection, { id: id }, data);
  return result;
};
