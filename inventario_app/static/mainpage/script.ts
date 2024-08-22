import { Modal } from "../core/modal/modal.js";
import { DeviceForm } from "../core/form/form.js";
import { Device, GetDeviceList } from "../core/device/device-listing.js";
import { setDetailValues } from "../core/detail/detail.js";
import { DeleteDevice } from "../core/device/device-remove.js";
import { loadEditInfo } from "../core/form/edit.js";
import { loadRepair } from "../core/repair/repair-list.js";
import { FormatInput, PhoneInput, PriceInput } from "../core/inputs.js";
import { filterDevices, sortDevices } from "../core/filters/filters.js";
import { Repair } from "../core/repair/repair.js";
import { submitNewRepair } from "../core/repair/repair-new.js";
import { submitEditRepair } from "../core/repair/repair-edit.js";
import { removeRepair } from "../core/repair/repair-remove.js";
import { inputsAddForm, inputsAddRepair, inputsEditForm, inputsEditRepair } from "../core/form/load-form-inputs.js";

let modal = new Modal();
let devices = GetDeviceList();
let selectedDevice: Device | null = null;
const addForm = new DeviceForm("#form-add-device", inputsAddForm());
const editForm = new DeviceForm("#form-edit-device", inputsEditForm());
const priceInputs = document.querySelectorAll<HTMLInputElement>(".price-input");
const phoneInputs = document.querySelectorAll<HTMLInputElement>(".phone-input");
let repairList: Repair[] = [];
const repairAddInputs = inputsAddRepair();
const repairEditInputs = inputsEditRepair();

priceInputs.forEach((i) => FormatInput(i, PriceInput));
phoneInputs.forEach((i) => FormatInput(i, PhoneInput));

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const deviceTable = document.querySelector<HTMLTableElement>("#device-table")!;
const btn_addDevice = document.querySelector("#add-device");
const btn_editDevice = document.querySelector("#btn-edit-device");
const btn_deleteDevice = document.querySelector("#delete-device");
const btn_confirmDelete = document.querySelector("#confirm-delete");
const btn_loadRepair = document.getElementById("btn-load-repair");
const btn_addNewRepair = document.getElementById("btn-add-new-repair");
const repairTable = document.querySelector<HTMLTableElement>("#repair-list");
const filterButtons = document.querySelectorAll(".filters__button");
const sortButtons = document.querySelectorAll(".head-sort");
const btn_submitRepair = document.getElementById("submit-repair");
const btn_submitEditRepair = document.getElementById("submit-edit-repair");
const btn_removeRepair = document.querySelector("#confirm-delete-repair");
const btn_goToDetail = document.querySelectorAll(".go-to-detail");
const btn_goToRepair = document.querySelectorAll(".go-to-repair");

/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */
btn_addDevice?.addEventListener("click", () => modal.display(0));
btn_goToDetail.forEach((b) => b.addEventListener("click", () => modal.display(1)));
btn_goToRepair.forEach((b) => b.addEventListener("click", () => modal.display(3)));
btn_editDevice?.addEventListener("click", async () => {
  if (!selectedDevice) return;

  await loadEditInfo(selectedDevice.id, editForm.form, modal);
  modal.display(2);
});
btn_loadRepair?.addEventListener("click", async () => {
  repairList = await loadRepair(selectedDevice!.id, repairTable!, modal);
  modal.display(3);
});
btn_addNewRepair?.addEventListener("click", () => modal.display(4));
btn_deleteDevice?.addEventListener("click", async () => modal.display(6));
btn_confirmDelete?.addEventListener("click", async () => {
  if (!selectedDevice) return;

  modal.loading();
  let request = await DeleteDevice(selectedDevice);
  modal.stop_loading();

  if (request == null) modal.display(1);
  else location.reload();
});
devices.forEach((d) =>
  d.element.addEventListener("dblclick", () => {
    selectedDevice = d;
    setDetailValues(d);
    modal.display(1);
  })
);

addForm.form?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  await addForm.submit(modal, "post", selectedDevice?.id ?? 0);
});

editForm.form?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  await editForm.submit(modal, "put", selectedDevice!.id);
});

filterButtons.forEach((b) => b.addEventListener("click", () => filterDevices(b.id, devices)));

sortButtons.forEach((b, i) => b.addEventListener("click", () => sortDevices(deviceTable, i)));

btn_submitRepair?.addEventListener("click", async (e: Event) => {
  e.preventDefault();
  await submitNewRepair(modal, selectedDevice!.id, repairAddInputs);
});

btn_submitEditRepair?.addEventListener("click", async (e: Event) => {
  e.preventDefault();
  await submitEditRepair(modal, selectedDevice!.id, repairEditInputs);
});

btn_removeRepair?.addEventListener("click", async () => await removeRepair(modal));
