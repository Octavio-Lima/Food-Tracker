import { FormError } from "./error.js";
import { FormInput } from "./form-input.js";
import { isFormValid } from "./input-check.js";

export class FoodForm {
    form: HTMLFormElement;
    error: FormError;
    inputs: FormInput[];

    constructor(formQuery: string, inputs: FormInput[]) {
        let form = document.querySelector<HTMLFormElement>(formQuery)!;

        this.inputs = inputs;
        this.form = form;
        this.error = new FormError(this.form);
    }

    canSave(): boolean {
        const self = this;
        self.error.close();

        if (!isFormValid(this.inputs)) return false;

        return self.isValid();
    }

    isValid(): boolean {
        let inputs = this.form?.querySelectorAll<HTMLInputElement>("input, select");
        let validList: boolean[] = [];

        inputs?.forEach((i) =>
            validList.push(
                (i.tagName == "SELECT" && i.value != "Selecione") || i.value != "" || i.value != null ? true : false
            )
        );

        return validList.every((b) => b == true);
    }
}
