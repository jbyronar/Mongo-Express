import {
  DiaryEntry,
  NonSensitiveInfoDiaryEntry,
  Visibility,
  Weather,
} from "../types";
import diaryData from "./diaries.json";

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

export const getEntries = (): DiaryEntry[] => diaries;

export const findById = (
  id: number
): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  if (entry != null) {
    const { comment, ...restOfDiary } = entry;
    return restOfDiary;
  }
  return undefined;
};

export const getEntriesWithoutSensitiveInfo =
  (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
      id,
      date,
      weather,
      visibility,
    }));
  };

/*export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
    const newDiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...newDiaryEntry
    }
    diaries.push(newDiary)
    return newDiary
}*/

export const addDiary = (
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string
): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    date,
    weather,
    visibility,
    comment,
  };
  diaries.push(newDiary);
  return newDiary;
};

//const diariesWithoutSensitiveInfo = getEntriesWithoutSensitiveInfo()
//diariesWithoutSensitiveInfo[0].date
