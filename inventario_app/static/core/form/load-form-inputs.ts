import { FormInput } from "./form-input.js";
import { MoneyValidator, PhoneValidator, RequiredValidator } from "./validator.js";

export function inputsAddForm() {
  return [
    new FormInput("#form-add-device #nome", new RequiredValidator(), "#form-add-device #nome_error"),
    new FormInput("#form-add-device #patri", new RequiredValidator(), "#form-add-device #patri_error"),
    new FormInput("#form-add-device #numeroCelular", new PhoneValidator(), "#form-add-device #cel_error"),
    new FormInput("#form-add-device #valor", new MoneyValidator(), "#form-add-device #preco_error"),
  ];
}
export function inputsEditForm() {
  return [
    new FormInput("#form-edit-device #nome", new RequiredValidator(), "#form-edit-device #nome_error"),
    new FormInput("#form-edit-device #patri", new RequiredValidator(), "#form-edit-device #patri_error"),
    new FormInput("#form-edit-device #numeroCelular", new PhoneValidator(), "#form-edit-device #cel_error"),
    new FormInput("#form-edit-device #valor", new MoneyValidator(), "#form-edit-device #preco_error"),
  ];
}
export function inputsAddRepair() {
  return [
    new FormInput("#add-repair #input-repair-date", new RequiredValidator(), "#add-repair #data_error"),
    new FormInput("#add-repair #input-repair", new RequiredValidator(), "#add-repair #nome_error"),
    new FormInput("#add-repair #input-repair-value", new MoneyValidator(), "#add-repair #preco_error"),
  ];
}
export function inputsEditRepair() {
  return [
    new FormInput("#edit-repair #input-edit-repair-date", new RequiredValidator(), "#edit-repair #data_error"),
    new FormInput("#edit-repair #input-edit-repair", new RequiredValidator(), "#edit-repair #nome_error"),
    new FormInput("#edit-repair #input-edit-repair-value", new MoneyValidator(), "#edit-repair #preco_error"),
  ];
}
