import { monthsInFrench } from "../types/constants";

export const handleGetTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const formattedDayMonthYear = getFormattedDayMonthYear(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formattedDayMonthYear} - ${hours}:${minutes}`;
};

export const getFormattedDayMonthYear = (date: Date) => {
    const day = date.getDay();
    const month = monthsInFrench[date.getMonth()];
    const year = date.getFullYear();
    const todaysDate = new Date();
    if (
        date.getDate() === todaysDate.getDate() &&
        date.getMonth() === todaysDate.getMonth() &&
        date.getFullYear() === todaysDate.getFullYear()
    ) {
        return "aujourd'hui";
    } else {
        return `${day} ${month} ${year}`;
    }
};

export function haveCommonElements(array1: string[], array2: string[]) {
    return array1.some(item => array2.includes(item));
}