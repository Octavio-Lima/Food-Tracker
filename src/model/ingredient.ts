import { IngredientsManager } from "../mainpage/script.js";
import { Food } from "./food.js";

export class Ingredient {
    name: string;
    kcal: number;
    carb: number;
    fats: number;
    prot: number;
    fibe: number;
    sodi: number;

    constructor(data: IIngredient) {
        this.name = data.name;
        this.kcal = data.kcal;
        this.carb = data.carb;
        this.fats = data.fats;
        this.prot = data.prot;
        this.fibe = data.fibe;
        this.sodi = data.sodi;
    }
}

export class IngredientEntry extends Ingredient {
    #element!: HTMLElement;

    constructor(data: IIngredient) {
        super(data);
    }

    element(master: IngredientsManager) {
        let row = document.createElement("tr");
        let nameTD = document.createElement("td");
        let kcalTD = document.createElement("td");
        let carbTD = document.createElement("td");
        let fatsTD = document.createElement("td");
        let protTD = document.createElement("td");
        let fibeTD = document.createElement("td");
        let sodiTD = document.createElement("td");
        let removeTD = document.createElement("td");
        let nameInp = document.createElement("input");
        let kcalInp = document.createElement("input");
        let carbInp = document.createElement("input");
        let fatsInp = document.createElement("input");
        let protInp = document.createElement("input");
        let fibeInp = document.createElement("input");
        let sodiInp = document.createElement("input");
        let removeBtn = document.createElement("button");

        row.classList.add("food-table-entry");
        nameInp.classList.add("name");
        kcalInp.classList.add("kcal");
        carbInp.classList.add("carb");
        fatsInp.classList.add("fats");
        protInp.classList.add("prot");
        fibeInp.classList.add("fibe");
        sodiInp.classList.add("sodi");
        removeBtn.classList.add("remove-button");

        nameInp.type = "text";
        kcalInp.type = "number";
        carbInp.type = "number";
        fatsInp.type = "number";
        protInp.type = "number";
        fibeInp.type = "number";
        sodiInp.type = "number";
        removeBtn.type = "button";

        nameInp.value = this.name;
        kcalInp.value = this.kcal.toString();
        carbInp.value = this.carb.toString();
        fatsInp.value = this.fats.toString();
        protInp.value = this.prot.toString();
        fibeInp.value = this.fibe.toString();
        sodiInp.value = this.sodi.toString();
        removeBtn.textContent = "X";

        nameTD.append(nameInp);
        kcalTD.append(kcalInp);
        carbTD.append(carbInp);
        fatsTD.append(fatsInp);
        protTD.append(protInp);
        fibeTD.append(fibeInp);
        sodiTD.append(sodiInp);
        removeTD.append(removeBtn);

        row.append(nameTD);
        row.append(kcalTD);
        row.append(carbTD);
        row.append(fatsTD);
        row.append(protTD);
        row.append(fibeTD);
        row.append(sodiTD);
        row.append(removeTD);

        nameInp.addEventListener("keyup", () => (this.name = nameInp.value));
        kcalInp.addEventListener("keyup", () => {
            master.calculateTotal();
            this.kcal = isNaN(parseInt(kcalInp.value)) ? 0 : parseInt(kcalInp.value);
        });
        carbInp.addEventListener("keyup", () => {
            master.calculateTotal();
            this.carb = isNaN(parseInt(carbInp.value)) ? 0 : parseInt(carbInp.value);
        });
        protInp.addEventListener("keyup", () => {
            master.calculateTotal();
            this.prot = isNaN(parseInt(protInp.value)) ? 0 : parseInt(protInp.value);
        });
        fatsInp.addEventListener("keyup", () => {
            master.calculateTotal();
            this.fats = isNaN(parseInt(fatsInp.value)) ? 0 : parseInt(fatsInp.value);
        });
        fibeInp.addEventListener("keyup", () => {
            master.calculateTotal();
            this.fibe = isNaN(parseInt(fibeInp.value)) ? 0 : parseInt(fibeInp.value);
        });
        sodiInp.addEventListener("keyup", () => {
            master.calculateTotal();
            this.sodi = isNaN(parseInt(sodiInp.value)) ? 0 : parseInt(sodiInp.value);
        });

        removeBtn.addEventListener("click", () => master.remove(this));

        this.#element = row;
        return this.#element;
    }

    removeElement = () => this.#element.remove();
}

export interface IIngredient {
    name: string;
    kcal: number;
    carb: number;
    fats: number;
    prot: number;
    fibe: number;
    sodi: number;
}
