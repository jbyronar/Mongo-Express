import express, { Request, Response } from "express";
import usersRouter from "./routes/Users";
import dotenv from "dotenv";
import { MongoDBAdapter, MongoDBAdapterImpl } from "./adapters/mongodb.adapter";
dotenv.config();

const mongodb: MongoDBAdapter = new MongoDBAdapterImpl();
const dbName = "example";
mongodb.init(dbName);

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});

/*

//app.use("/api/diaries", diaryRouter);

app.get("/ping/:id", async  (_req: Request, res: Response) => {
  console.log("Someone pinged here!!!" + "tomorrow");
  const id = Number.parseInt(_req.params.id);
  const result = await mongodb.find('diaries', {id: id});
  res.send(result);
});

app.get("/", async  (_req: Request,  res: Response) => {
  console.log("hello");
  res.json({
    hola: 1
  });

});

*/
