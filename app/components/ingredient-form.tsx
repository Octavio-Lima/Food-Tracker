import { clsx } from "clsx";
import Button from "./button";

function IngredientForm() {
    const grid = "gap-1 grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]";

    return (
        <div className="border p-4">
            <div className="flex flex-col gap-2">
                <div className={grid}>
                    <p>Name</p>
                    <p>Kcal</p>
                    <p>Carbs</p>
                    <p>Fats</p>
                    <p>Protein</p>
                    <p>Fiber</p>
                    <p>Sodium</p>
                    <p>Remove</p>
                </div>
                <div className={grid}>
                    <IngredientInput name="name" />
                    <IngredientInput name="kcal" />
                    <IngredientInput name="carb" />
                    <IngredientInput name="fats" />
                    <IngredientInput name="prot" />
                    <IngredientInput name="fibe" />
                    <IngredientInput name="sodi" />
                    <Button>X</Button>
                </div>
                <div className={grid}>
                    <p>Total</p>
                    <p>{0} kcal</p>
                    <p>{0}g</p>
                    <p>{0}g</p>
                    <p>{0}g</p>
                    <p>{0}g</p>
                    <p>{0}mm</p>
                </div>
            </div>
            <div className="add-button-container">
                <Button className="mt-4">Add</Button>
            </div>
        </div>
    );
}

function IngredientInput({ name }: InputProps) {
    const type = name === "name" ? "text" : "number";

    return (
        <input
            type={type}
            className={clsx(
                name,
                "bg-white border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black p-1",
            )}
        />
    );
}

type InputProps = {
    name: string;
};

export default IngredientForm;
