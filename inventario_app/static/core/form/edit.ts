import { Modal } from "../modal/modal.js";
import { makeRequest } from "../request.js";

export async function loadEditInfo(id: number, form: HTMLFormElement, modal: Modal) {
  modal.loading();
  let inputs = form.querySelectorAll<HTMLInputElement>("input, select");
  let data = await makeRequest(`/new-device/?id=${id}`, "get").then((r) => r.json());
  modal.stop_loading();

  inputs?.forEach((i) => (i.value = data[i.name]));
}
