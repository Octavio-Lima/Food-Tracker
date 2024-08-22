import { Modal } from "../modal/modal.js";
import { makeRequest } from "../request.js";
import { FormError } from "./error.js";
import { FormInput } from "./form-input.js";
import { getFormValues } from "./get-data.js";
import { isFormValid } from "./input-check.js";

export class DeviceForm {
  form: HTMLFormElement;
  error: FormError;
  inputs: FormInput[];

  constructor(formQuery: string, inputs: FormInput[]) {
    let form = document.querySelector<HTMLFormElement>(formQuery)!;

    this.inputs = inputs;
    this.form = form;
    this.error = new FormError(this.form);
  }

  async submit(modal: Modal, method: "put" | "post", id: number) {
    const self = this;
    self.error.close();

    if (!isFormValid(this.inputs)) return;

    modal.loading();
    let submit = self.isValid()
      ? await makeRequest("/new-device/", method, JSON.stringify(getFormValues(self.form, id))).then((r) => r.status)
      : 400;
    modal.stop_loading();

    if (submit == 200) location.reload();
    else self.error.display();
  }

  isValid(): boolean {
    let inputs = this.form?.querySelectorAll<HTMLInputElement>("input, select");
    let validList: boolean[] = [];

    inputs?.forEach((i) =>
      validList.push(
        (i.tagName == "SELECT" && i.value != "Selecione") || i.value != "" || i.value != null ? true : false
      )
    );

    return validList.every((b) => b == true);
  }
}
