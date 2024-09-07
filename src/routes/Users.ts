import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    //const { date, weather, visibility, comment } = req.body;

    res.json("Get User");
  } catch (e) {
    res.status(404).sendStatus;
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
