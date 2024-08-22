import { Device } from "../device/device-listing";

export function filterDevices(filter_by = "all", deviceList: Device[]) {
  deviceList.forEach((d) => {
    if (filter_by === "all" || filter_by.toLocaleLowerCase() === d.tipoDispositivo.toLocaleLowerCase()) d.display();
    else d.hide();
  });
}

export function sortDevices(table: HTMLTableElement, headerIndex: number) {
  let rowList: HTMLCollectionOf<HTMLTableRowElement>;
  let current: Element;
  let next: Element;
  let switching = true;
  let dir = "asc";
  let switchCount = 0;
  let shouldSwitch = false;
  let row = 1;
  let isNumeric = headerIndex === 3;

  while (switching) {
    switching = false;
    rowList = table.rows;

    for (row = 1; row < rowList.length - 1; row++) {
      current = rowList[row].getElementsByTagName("TD")[headerIndex];
      next = rowList[row + 1].getElementsByTagName("TD")[headerIndex];
      shouldSwitch = false;

      if (dir == "asc") {
        if (current.innerHTML.toLowerCase() > next.innerHTML.toLowerCase() && !isNumeric) {
          shouldSwitch = true;
          break;
        } else if (Number(current.innerHTML) > Number(next.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (current.innerHTML.toLowerCase() < next.innerHTML.toLowerCase() && !isNumeric) {
          shouldSwitch = true;
          break;
        } else if (Number(current.innerHTML) < Number(next.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rowList[row].parentNode?.insertBefore(rowList[row + 1], rowList[row]);
      switching = true;

      switchCount++;
    } else {
      if (switchCount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
