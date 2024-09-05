import { FoodEntry } from "../../model/food.js";
import { getYesterday, ISOadjustTimezone } from "../time/date.js";

export function filterDevices(filter_by = "today", foodList: FoodEntry[], extra: Function) {
    const day = (d: FoodEntry) => {
        d.display();
        extra(1);
    };

    const week = (d: FoodEntry) => {
        d.display();
        extra(7);
    };

    foodList.forEach((d) => {
        if (filter_by === "today" && filterToday(d.date)) day(d);
        else if (filter_by === "yesterday" && filterYesterday(d.date)) day(d);
        else if (filter_by === "this-week" && filterThisWeek(d.date)) week(d);
        else if (filter_by === "last-week" && filterLastWeek(d.date)) week(d);
        else d.hide();
    });
}

function filterToday(date: Date): boolean {
    let today = ISOadjustTimezone(new Date()).split("T")[0].split("-")[2];
    let dateDay = ISOadjustTimezone(date).split("T")[0].split("-")[2];

    return dateDay === today;
}

function filterYesterday(date: Date): boolean {
    let yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    let yesterday = ISOadjustTimezone(yesterdayDate).split("T")[0].split("-")[2];
    let varDay = ISOadjustTimezone(date).split("T")[0].split("-")[2];

    return varDay === yesterday;
}

function filterThisWeek(date: Date): boolean {
    let today = new Date();
    let todayNumber = today.getDay();
    let firstDay = today.getDate() - todayNumber + 1;
    let list: number[] = [];
    let varDay = parseInt(ISOadjustTimezone(date).split("T")[0].split("-")[2]);

    for (let i = firstDay; i < firstDay + 7; i++) {
        list.push(i);
    }

    return list.includes(varDay);
}

function filterLastWeek(date: Date): boolean {
    let today = new Date();
    let todayNumber = today.getDay();
    let firstDay = today.getDate() - todayNumber + 1;
    let list: number[] = [];
    let varDay = parseInt(ISOadjustTimezone(date).split("T")[0].split("-")[2]);

    for (let i = firstDay - 7; i < firstDay; i++) {
        list.push(i);
    }

    return list.includes(varDay);
}

export function sortDevices(table: HTMLTableElement, headerIndex: number) {
    let rowList: HTMLCollectionOf<HTMLTableRowElement>;
    let current: Element;
    let next: Element;
    let switching = true;
    let dir = "asc";
    let switchCount = 0;
    let shouldSwitch = false;
    let row = 1;
    let isNumeric = headerIndex === 3;

    while (switching) {
        switching = false;
        rowList = table.rows;

        for (row = 1; row < rowList.length - 1; row++) {
            current = rowList[row].getElementsByTagName("TD")[headerIndex];
            next = rowList[row + 1].getElementsByTagName("TD")[headerIndex];
            shouldSwitch = false;

            if (dir == "asc") {
                if (current.innerHTML.toLowerCase() > next.innerHTML.toLowerCase() && !isNumeric) {
                    shouldSwitch = true;
                    break;
                } else if (Number(current.innerHTML) > Number(next.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (current.innerHTML.toLowerCase() < next.innerHTML.toLowerCase() && !isNumeric) {
                    shouldSwitch = true;
                    break;
                } else if (Number(current.innerHTML) < Number(next.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rowList[row].parentNode?.insertBefore(rowList[row + 1], rowList[row]);
            switching = true;

            switchCount++;
        } else {
            if (switchCount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
