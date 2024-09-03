import { NewDiaryEntry, Weather } from "./types";

const parseComment = (commenFromRequest: any): string => {
    if(typeof commenFromRequest != 'string'){
        throw new Error('Incorrect or missig comment')
    }
    return commenFromRequest
}

const parseDate = (dateFromRequest: any): string => {
    if(!isString(dateFromRequest || !isDate(dateFromRequest))){
        throw new Error('Incorrect or missig date')
    }
    return dateFromRequest
}

const parseWeather = (weatherFromRequest: any): Weather =>{
    if(!isString(weatherFromRequest)){
        throw new Error('Incorrect or missig Weather')
    }
    return weatherFromRequest
}

const isString = (string: string): boolean => {
    return typeof string === 'string'
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const toNewDiaryEntry = (object: any): NewDiaryEntry =>{
    const newEntry: NewDiaryEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date)
    }
    return newEntry
}

export default toNewDiaryEntry