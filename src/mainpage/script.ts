import { Modal } from "../core/modal/modal.js";
import { FoodEntry, IFoodNew } from "../model/food.js";
import { filterDevices, sortDevices } from "../core/filters/filters.js";
import { APIFoodEntry } from "../core/api/api-foodEntry.js";
import { Forms } from "../core/form/form-func.js";
import { IngredientEntry } from "../model/ingredient.js";
import { sumFromElement } from "../core/sum-element.js";
import { inputsFoodForm } from "../core/form/load-form-inputs.js";
import { FoodForm } from "../core/form/form.js";
import { getNow, ISOadjustTimezone } from "../core/time/date.js";

document.cookie = `django_tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

const btn_addDevice = document.querySelector("#add-device");
const filterButtons = document.querySelectorAll(".filters__button");
const sortButtons = document.querySelectorAll(".head-sort");
const btn_goToAdd = document.querySelectorAll(".go-to-add");

export class MainPage {
    foodEntries: FoodEntry[] = [];
    foodEntryApi = new APIFoodEntry();
    modal = new Modal();
    ingrTable = new IngredientsManager(this);
    selected: FoodEntry | null = null;
    foodForm = new FoodForm("#form-food", inputsFoodForm());
    isEditing = false;
    lastFilter = "today";

    btn_saveDelete = document.querySelector("#confirm-delete");
    btn_save = document.querySelector("#save-food");
    entryTable = document.querySelector<HTMLTableElement>("#food-entry-table")!;
    btn_deleteDevice = document.querySelector("#delete-food");

    constructor() {
        this.btn_save?.addEventListener("click", async () => await this.save());
        sortButtons.forEach((b, i) => b.addEventListener("click", () => sortDevices(this.entryTable, i)));
        filterButtons.forEach((b) =>
            b.addEventListener("click", () => {
                this.lastFilter = b.id;
                filterDevices(b.id, this.foodEntries);
            })
        );
        btn_addDevice?.addEventListener("click", () => this.ingrTable.load());
        btn_goToAdd.forEach((b) => b.addEventListener("click", () => this.modal.display(0)));
        this.btn_deleteDevice?.addEventListener("click", async () => this.modal.display(1));
        this.btn_saveDelete?.addEventListener("click", async () => await this.remove());
    }

    async load() {
        this.clearEntries();
        this.foodEntries = await this.foodEntryApi.getFoodTableEntries();
        this.foodEntries.forEach((e) => this.entryTable?.append(e.getElement(this)));
        filterDevices(this.lastFilter, this.foodEntries);
    }

    async remove() {
        if (!this.selected) return;

        this.modal.loading();
        let request = await this.foodEntryApi.remove(this.selected.id);
        this.modal.stop_loading();

        if (request.status !== 204) {
            this.modal.display(1);
            return;
        }

        await this.load();
    }

    clearEntries() {
        this.foodEntries = [];
        this.entryTable.innerHTML = "";
    }

    async save() {
        let canUpload = this.foodForm.canSave();

        if (!canUpload) {
            this.foodForm.error.display();
            return;
        }

        let data: IFoodNew = {
            name: Forms.get(this.ingrTable.form, "#name", ""),
            date: Forms.get(this.ingrTable.form, "#date", ""),
            time: Forms.get(this.ingrTable.form, "#time", ""),
            kcal: Forms.getTextInt(this.ingrTable.footer, ".kcal", 0),
            prot: Forms.getTextInt(this.ingrTable.footer, ".prot", 0),
            fats: Forms.getTextInt(this.ingrTable.footer, ".fats", 0),
            carb: Forms.getTextInt(this.ingrTable.footer, ".carb", 0),
            fibe: Forms.getTextInt(this.ingrTable.footer, ".fibe", 0),
            sodi: Forms.getTextInt(this.ingrTable.footer, ".sodi", 0),
            ingr: JSON.stringify(this.ingrTable.ingredients),
        };

        this.modal.loading();
        let request = await (this.isEditing
            ? this.foodEntryApi.update(this.selected!.id, data)
            : this.foodEntryApi.create(data));
        this.modal.stop_loading();

        if ((this.isEditing && request.status !== 200) || (!this.isEditing && request.status !== 201)) {
            this.foodForm.error.display();
            return;
        }

        await this.load();
    }

    editingState(state: boolean) {
        this.isEditing = state;
        if (state) this.btn_deleteDevice?.classList.remove("hide");
        else this.btn_deleteDevice?.classList.add("hide");
    }
}

export class IngredientsManager {
    master: MainPage;
    table = document.querySelector("#ingredient-table")!;
    form = document.querySelector<HTMLElement>("#form-food")!;
    ingredients: IngredientEntry[] = [];
    btn_addIngredient = document.querySelector("#add-ingredient");
    footer = document.querySelector<HTMLElement>("#ingredient-footer")!;

    constructor(mp: MainPage) {
        this.master = mp;

        this.btn_addIngredient?.addEventListener("click", () => this.add());
    }

    clear(clearIngredients = false) {
        this.table.innerHTML = "";
        if (clearIngredients) this.ingredients = [];
    }

    add(entry?: FoodEntry) {
        this.clear();

        if (!entry)
            this.ingredients.push(
                new IngredientEntry({ name: "", kcal: 0, carb: 0, prot: 0, fats: 0, fibe: 0, sodi: 0 })
            );

        this.ingredients.forEach((i) => this.table.append(i.element(this)));
        this.calculateTotal();
    }

    remove(ingredient: IngredientEntry) {
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
        ingredient.removeElement();
        this.calculateTotal();
    }

    load(entry?: FoodEntry) {
        this.clear(true);

        if (entry) {
            Forms.set(this.form, "#name", entry.name);
            Forms.set(this.form, "#date", ISOadjustTimezone(entry.date).split("T")[0]);
            Forms.set(this.form, "#time", entry.time.toString());

            this.ingredients = entry.ingr;
            this.master.editingState(true);
            this.add(entry);
        } else {
            Forms.set(this.form, "#name", "");
            Forms.set(this.form, "#date", ISOadjustTimezone(new Date()).split("T")[0]);
            Forms.set(this.form, "#time", getNow().toString());
            this.master.editingState(false);
        }

        this.calculateTotal();
        this.master.modal.display(0);
    }

    calculateTotal() {
        let kcal = sumFromElement(this.table.querySelectorAll(".kcal"));
        let prot = sumFromElement(this.table.querySelectorAll(".prot"));
        let carb = sumFromElement(this.table.querySelectorAll(".carb"));
        let fats = sumFromElement(this.table.querySelectorAll(".fats"));
        let fibe = sumFromElement(this.table.querySelectorAll(".fibe"));
        let sodi = sumFromElement(this.table.querySelectorAll(".sodi"));

        Forms.setText(this.footer, ".kcal", kcal.toString());
        Forms.setText(this.footer, ".prot", prot.toString());
        Forms.setText(this.footer, ".carb", carb.toString());
        Forms.setText(this.footer, ".fats", fats.toString());
        Forms.setText(this.footer, ".fibe", fibe.toString());
        Forms.setText(this.footer, ".sodi", sodi.toString());
    }
}

(async () => {
    let mainPage = new MainPage();

    await mainPage.load();
})();
