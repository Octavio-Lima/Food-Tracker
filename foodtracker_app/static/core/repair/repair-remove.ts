import { Modal } from "../modal/modal.js";
import { makeRequest } from "../request.js";

export function deleteRepairDialog(modal: Modal, id: number) {
  document.querySelector("#confirm-delete-repair")?.setAttribute("data-id", id.toString());
  modal.display(7);
}

export async function removeRepair(modal: Modal) {
  const id = parseInt(
    document.querySelector<HTMLInputElement>("#confirm-delete-repair")?.getAttribute("data-id") ?? "-1"
  );

  modal.loading();
  let submit = await makeRequest(`/repair/?id=${id}`, "delete").then((r) => r.status);
  modal.stop_loading();

  if (submit == 200) location.reload();
  else modal.close();
}
