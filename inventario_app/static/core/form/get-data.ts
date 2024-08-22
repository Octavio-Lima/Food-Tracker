export function getFormValues(form: HTMLFormElement, id: number) {
  let data: any = { id: id };

  form.querySelectorAll<HTMLInputElement>("input, select")?.forEach((i) => (data[i.name] = i.value));

  return data;
}
