import { FormInput } from "./form-input.js";
import { RequiredValidator } from "./validator.js";

export function inputsFoodForm() {
    return [
        new FormInput("#form-food #name", new RequiredValidator(), "#form-food #name_error"),
        new FormInput("#form-food #date", new RequiredValidator(), "#form-food #date_error"),
        new FormInput("#form-food #time", new RequiredValidator(), "#form-food #time_error"),
    ];
}
