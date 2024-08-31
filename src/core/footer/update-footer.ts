import { Forms } from "../form/form-func.js";

export const updateFooter = (table: HTMLElement, footer: HTMLElement) => {
    let fields = ["kcal", "carb", "fats", "prot", "fibe", "sodi"];
    let units = ["kcal", "g", "g", "g", "g", "mg"];

    console.log("asd");

    fields.forEach((f, i) => {
        let val = Array.from(table.querySelectorAll(`.${f}`))
            .filter((e) => !e.parentElement!.classList.contains("hide"))
            .reduce((v, c) => (v += parseInt(c.textContent!)), 0);

        Forms.setText(footer, `.total-${f}`, `${val.toString()}${units[i]}`);
    });
};
