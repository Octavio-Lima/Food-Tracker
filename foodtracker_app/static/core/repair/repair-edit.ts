import { Currency } from "../currency.js";
import { Modal } from "../modal/modal.js";
import { makeRequest } from "../request.js";
import { Repair } from "./repair.js";
import { FormInput } from "../form/form-input.js";
import { isFormValid } from "../form/input-check.js";

export function loadRepairEdit(repair: Repair, modal: Modal) {
  const name = document.querySelector<HTMLInputElement>("#input-edit-repair");
  const date = document.querySelector<HTMLInputElement>("#input-edit-repair-date");
  const pric = document.querySelector<HTMLInputElement>("#input-edit-repair-value");
  const id = document.querySelector<HTMLInputElement>("#input-edit-repair-id");

  name!.value = repair.name;
  date!.value = repair.date;
  pric!.value = Currency.toCurrency(repair.price);
  id!.value = repair.id.toString();

  modal.display(5);
}

export async function submitEditRepair(modal: Modal, deviceId: number, inputs: FormInput[]) {
  const id = parseInt(document.querySelector<HTMLInputElement>("#input-edit-repair-id")?.value ?? "-1");
  const name = document.querySelector<HTMLInputElement>("#input-edit-repair")?.value ?? "Erro ao salvar nome";
  const date = document.querySelector<HTMLInputElement>("#input-edit-repair-date")?.value ?? "2024-01-01";
  const pric = Currency.toFloat(document.querySelector<HTMLInputElement>("#input-edit-repair-value")?.value ?? "0");

  if (!isFormValid(inputs)) return;

  modal.loading();
  let repair = new Repair({ nome: name, dia: date, preco: pric, id: id }, deviceId);
  let submit = await makeRequest("/repair/", "put", JSON.stringify(repair)).then((r) => r.status);
  modal.stop_loading();

  if (submit == 200) location.reload();
  else modal.close();
}
