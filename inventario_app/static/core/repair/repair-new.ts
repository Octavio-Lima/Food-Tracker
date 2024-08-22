import { Currency } from "../currency.js";
import { FormInput } from "../form/form-input.js";
import { isFormValid } from "../form/input-check.js";
import { Modal } from "../modal/modal.js";
import { makeRequest } from "../request.js";
import { Repair } from "./repair.js";

export async function submitNewRepair(modal: Modal, deviceId: number, inputs: FormInput[]) {
  const name = document.querySelector<HTMLInputElement>("#input-repair")?.value ?? "Erro ao salvar nome";
  const date = document.querySelector<HTMLInputElement>("#input-repair-date")?.value ?? "2024-01-01";
  const pric = Currency.toFloat(document.querySelector<HTMLInputElement>("#input-repair-value")?.value ?? "0");

  if (!isFormValid(inputs)) return;

  modal.loading();
  let repair = new Repair({ nome: name, dia: date, preco: pric }, deviceId);
  let submit = await makeRequest("/repair/", "post", JSON.stringify(repair)).then((r) => r.status);
  modal.stop_loading();

  if (submit == 200) location.reload();
  else modal.close();
}
