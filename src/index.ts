import express, { Request, Response } from "express";
import usersRouter from "./routes/Users";
import usersSettingRouter from "./routes/UserSettings";
import cors from "cors";
import { findByQuery } from "./services/dataBase";

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

//Custom Middleware
app.use(async (req, _res, next) => {
  const verb = req.method;
  console.log("HTTP Verb:", verb);
  let endpoint = req.url;
  endpoint = endpoint.split("/").slice(0, -1).join("/") || "/";
  console.log("Endpoint:", endpoint);

  const idRole = Number(req.header("id"));
  console.log("Role id:", idRole);
  const result = await findByQuery("Roles", { role_id: idRole });
  const role_name = result[0]?.role_name;
  console.log("Role Name:", role_name);

  const resultACL = await findByQuery("ACL", { endPoint: endpoint });

  let list: string[];
  try {
    if (resultACL[0] && resultACL[0].powers) {
      const power = resultACL[0].powers.find(
        (item: { role: string }) => item.role === role_name,
      );
      if (power && power.list) {
        list = power.list;
      } else {
        throw new Error("User role not found");
      }
    } else {
      throw new Error("ResultACL or powers not found");
    }
  } catch (error) {
    console.error("Error accessing ACL data:", error);
    list = [];
  }

  let acces = false;
  if (list.includes(verb.toLowerCase())) {
    acces = true;
  }
  console.log("ACL Result:", acces);

  if (acces) {
    // Continue the process
    next();
  } else {
    // Stop the process and send an error message
    return _res.status(403).json({ error: "Access denied" });
  }
});

const PORT = 3000;

app.use("/api/users", usersRouter);
app.use("/api/usersSetting", usersSettingRouter);

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});

/*

app.get("/", async (_req: Request, res: Response) => {
  console.log("hello");
  res.json({
    hola: 1,
  });
});


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



*/
