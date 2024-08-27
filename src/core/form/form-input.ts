import { Validator } from "./validator.js";

export class FormInput {
    input: HTMLInputElement | null = null;
    errorMessage: Element | null = null;
    isValid = false;

    constructor(inputQuery: string, validator?: Validator, errorMessageQuery?: string) {
        this.input = document.querySelector(inputQuery);

        if (validator && this.input && errorMessageQuery) {
            this.errorMessage = document.querySelector(errorMessageQuery);
            this.input.addEventListener("keyup", () => this.action(validator));
        }

        if (this.input?.value != "" && validator) {
            this.action(validator);
        }
    }

    action(validator: Validator) {
        if (!validator.isValid(this.input!.value)) {
            this.errorMessage!.classList.remove("hide");
            this.errorMessage!.textContent = validator.errorMessage.join("\r\n");
            this.isValid = false;
            return;
        }

        this.isValid = true;
        this.errorMessage!.classList.add("hide");
    }

    value(): string {
        return this.input?.value ?? "";
    }

    trigger() {
        this.input?.dispatchEvent(new Event("keyup"));
    }
}
