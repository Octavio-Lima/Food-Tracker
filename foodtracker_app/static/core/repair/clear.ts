export function clearRepairTable(table: HTMLTableElement) {
  while (table.firstChild) table.removeChild(table.firstChild);
}
