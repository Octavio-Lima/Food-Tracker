export function StripRepairLetter(string: string | number) {
  let value = string.toString().replace(/[^0-9]/g, "");

  if (value.length > 2) {
    let commaPosition = value.length - 2;
    value = [value.slice(0, commaPosition), ".", value.slice(commaPosition, value.length)].join("");
  }

  return parseFloat(value);
}
