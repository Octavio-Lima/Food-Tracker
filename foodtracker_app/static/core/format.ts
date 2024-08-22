export function ToBrazilDate(date: string) {
  if (date === "" || date === undefined || date === null) return "";
  let splitDate = date.split("-");
  let result = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  return result;
}

export function ToIsoDate(date: string) {
  if (date === "" || date === undefined || date === null) return "";

  let splitDate = date.split("/");
  let result = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
  return result;
}
