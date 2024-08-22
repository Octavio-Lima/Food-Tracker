import { Currency } from "../currency.js";
import { ToBrazilDate } from "../format.js";
import { Modal } from "../modal/modal.js";
import { loadRepairEdit } from "./repair-edit.js";
import { deleteRepairDialog } from "./repair-remove.js";

export class Repair {
  name: string;
  date: string;
  price: number;
  id: number;
  device_id?: number;
  noButtons = false;

  constructor(data: IRepair, deviceId: number) {
    this.name = data.nome ?? "Este dispositivo ainda não possui nenhum reparo";
    this.date = data.dia ?? "2021-04-02";
    this.price = data.preco ?? 0;
    this.id = data.id ?? -1;
    this.device_id = deviceId ?? -1;
    this.noButtons = data.noButtons ?? false;
  }

  createElement(modal: Modal): HTMLTableRowElement {
    const self = this;

    let entry = document.createElement("tr");
    entry.setAttribute("data-id", this.id.toString());

    let repairDate = document.createElement("td");
    repairDate.classList.add("repair-entry-date");
    repairDate.innerText = ToBrazilDate(this.date);
    entry.append(repairDate);

    let repairName = document.createElement("td");
    repairName.classList.add("repair-entry-name");
    repairName.innerText = this.name;
    entry.append(repairName);

    let repairValue = document.createElement("td");
    repairValue.classList.add("repair-entry-value");
    repairValue.innerText = this.price < 0 ? "" : Currency.toCurrency(this.price);
    entry.append(repairValue);

    let repairEdit = document.createElement("td");
    let repairEditButton = document.createElement("button");
    repairEditButton.addEventListener("click", () => loadRepairEdit(self, modal));
    repairEditButton.innerText = "✏";
    repairEditButton.classList.add("modal__button--special");
    repairEdit.append(repairEditButton);
    entry.append(repairEdit);
    if (this.noButtons) repairEditButton.remove();

    let repairDelete = document.createElement("td");
    let repairDeleteButton = document.createElement("button");
    repairDeleteButton.addEventListener("click", () => deleteRepairDialog(modal, self.id));
    repairDeleteButton.innerText = "✖";
    repairDeleteButton.classList.add("modal__button--danger");
    repairDelete.append(repairDeleteButton);
    entry.append(repairDelete);
    if (this.noButtons) repairDeleteButton.remove();

    return entry;
  }
}

interface IRepair {
  nome?: string;
  dia?: string;
  preco?: number;
  id?: number;
  noButtons?: boolean;
  dispositivo_id?: number;
}
