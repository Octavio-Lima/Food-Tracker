export class FormError {
  warningMessage?: Element;

  constructor(form: Element) {
    this.warningMessage = form.querySelector(".submit-warning") ?? undefined;
  }

  display() {
    this.warningMessage?.classList.remove("hide");
  }

  close() {
    this.warningMessage?.classList.add("hide");
  }
}
