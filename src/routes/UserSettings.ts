import express from "express";
import {
  findById,
  findAll,
  create,
  deleteById,
  updateById,
} from "../services/dataBase";
import { UsersSettingsType } from "../types";

const collection = "UsersSettings";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userDocument = req.body as UsersSettingsType;
    const result = await create(collection, userDocument);
    res.json(result);
  } catch (e) {
    res.status(404).sendStatus;
  }
});

router.get("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const result = await findById(collection, id);
  res.json(result);
});

router.get("/", async (req, res) => {
  const result = await findAll(collection);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  try {
    const result = await deleteById(collection, id);
    res.json(result);
    if (result) {
      res.status(204).send();
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  console.log(id);
  try {
    const userDocument = req.body as UsersSettingsType;
    const result = await updateById(collection, id, userDocument);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;

/*


router.get("/", (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/:id", (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id));

  return diary != null ? res.send(diary) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const { date, weather, visibility, comment } = req.body;

    //const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedDiaryEntry = diaryServices.addDiary(date, weather, visibility, comment);
    res.json(addedDiaryEntry);
  } catch (e) {
    res.status(404).sendStatus;
  }
});
router.post('/',(req,res)=>{
    const {date, weather, visibility, comment} = req.body
    const newDiaryEntry = diaryServices.addDiary({
        date,
        weather,
        visibility,
        comment
    })
    res.json(newDiaryEntry)
})

*/
