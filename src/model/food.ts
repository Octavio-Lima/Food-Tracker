import { MainPage } from "../mainpage/script.js";
import { Time } from "../core/time/time.js";
import { IIngredient, IngredientEntry } from "./ingredient.js";

export class Food {
    id: number;
    name: string;
    date: Date;
    time: Time;
    kcal: number;
    carb: number;
    fats: number;
    prot: number;
    fibe: number;
    sodi: number;
    ingr: IngredientEntry[];

    constructor(entry: IFood) {
        this.id = entry.id;
        this.name = entry.name;
        this.date = new Date(entry.date);
        this.time = new Time().fromString(entry.time);
        this.kcal = entry.kcal;
        this.carb = entry.carb;
        this.fats = entry.fats;
        this.prot = entry.prot;
        this.fibe = entry.fibe;
        this.sodi = entry.sodi;
        this.ingr = JSON.parse(entry.ingr).map((d: IIngredient) => new IngredientEntry(d));
    }
}

export interface IFood {
    id: number;
    name: string;
    date: string;
    time: string;
    kcal: number;
    carb: number;
    fats: number;
    prot: number;
    fibe: number;
    sodi: number;
    ingr: string;
}

export interface IFoodNew {
    name: string;
    date: string;
    time: string;
    kcal: number;
    carb: number;
    fats: number;
    prot: number;
    fibe: number;
    sodi: number;
    ingr: string;
}

export class FoodEntry extends Food {
    element: HTMLElement | null = null;

    constructor(entry: IFood) {
        super(entry);
    }

    getElement(master: MainPage) {
        let entry = document.createElement("tr");
        let name = document.createElement("td");
        let date = document.createElement("td");
        let time = document.createElement("td");
        let kcal = document.createElement("td");
        let carb = document.createElement("td");
        let fats = document.createElement("td");
        let prot = document.createElement("td");
        let fibe = document.createElement("td");
        let sodi = document.createElement("td");

        entry.classList.add("device");
        kcal.classList.add("kcal");
        carb.classList.add("carb");
        fats.classList.add("fats");
        prot.classList.add("prot");
        fibe.classList.add("fibe");
        sodi.classList.add("sodi");

        name.textContent = this.name;
        date.textContent = this.date.toLocaleDateString("pt-BR");
        time.textContent = this.time.toString();
        kcal.textContent = this.kcal.toString() + "kcal";
        carb.textContent = this.carb.toString() + "g";
        fats.textContent = this.fats.toString() + "g";
        prot.textContent = this.prot.toString() + "g";
        fibe.textContent = this.fibe.toString() + "g";
        sodi.textContent = this.sodi.toString() + "mg";

        entry.append(name);
        entry.append(date);
        entry.append(time);
        entry.append(kcal);
        entry.append(carb);
        entry.append(fats);
        entry.append(prot);
        entry.append(fibe);
        entry.append(sodi);

        entry.addEventListener("dblclick", () => {
            master.selected = this;
            master.modal.display(0);
            master.ingrTable.load(master.selected);
        });

        this.element = entry;
        return entry;
    }

    display() {
        this.element?.classList.remove("hide");
    }

    hide() {
        this.element?.classList.add("hide");
    }
}
