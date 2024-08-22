import { Modal } from "../modal/modal.js";
import { makeRequest } from "../request.js";
import { clearRepairTable } from "./clear.js";
import { Repair } from "./repair.js";

export async function loadRepair(deviceId: number, table: HTMLTableElement, modal: Modal): Promise<Repair[]> {
  clearRepairTable(table);

  modal.loading();
  const repairList: Repair[] = await makeRequest(`/repair/?id=${deviceId}`, "get")
    .then((r) => r.json())
    .then((j) => j.map((d: any) => new Repair(d, deviceId)));
  modal.stop_loading();

  if (repairList.length > 0) repairList.forEach((r) => table.append(r.createElement(modal)));
  else table.append(new Repair({ noButtons: true }, -1).createElement(modal));

  return repairList;
}
