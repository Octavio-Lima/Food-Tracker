import { MainPage } from "../../mainpage/script.js";
import { Food, FoodEntry, IFood, IFoodNew } from "../../model/food.js";
import { API } from "./request.js";

const url_foodList = "/api/food-entries/";
const url_foodListId = (id: number) => `/api/food-entries/${id}`;

export class APIFoodEntry {
    api = new API();

    remove = async (id: number) => await this.api.delete(url_foodListId(id));

    update = async (id: number, data: IFoodNew) => await this.api.put(url_foodListId(id), data);

    create = async (data: IFoodNew) => await this.api.post(url_foodList, data);

    getFoodEntries = async () =>
        await this.api
            .get(url_foodList)
            .then((r) => r.json())
            .then((d: IFood[]) => d.map((f) => new Food(f)));

    getFoodTableEntries = async () =>
        await this.api
            .get(url_foodList)
            .then((r) => r.json())
            .then((d: IFood[]) => d.map((f) => new FoodEntry(f)));
}
