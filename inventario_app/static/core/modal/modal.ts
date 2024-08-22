export class Modal {
  el_modal = document.querySelector("#main-modal");
  el_windowList = document.querySelectorAll(".modal__window");
  background = document.querySelector("#black-screen");
  btn_closeList = document.querySelectorAll(".close-modal");

  constructor() {
    this.btn_closeList.forEach((btn) => btn.addEventListener("click", () => this.close()));
    this.el_windowList.forEach((window) => window.classList.add("hide"));
  }

  display(windowIndex = 0) {
    this.el_windowList.forEach((window) => window.classList.add("hide"));
    this.el_modal?.classList.remove("hide");
    this.background?.classList.remove("hide");
    this.el_windowList[windowIndex].classList.remove("hide");
  }

  close() {
    this.el_windowList.forEach((window) => window.classList.add("hide"));
    this.el_modal?.classList.add("hide");
    this.background?.classList.add("hide");
  }

  loading() {
    this.el_windowList.forEach((window) => window.classList.add("hide"));
    this.el_modal?.classList.remove("hide");
    this.background?.classList.remove("hide");
    this.el_windowList[8].classList.remove("hide");
  }

  stop_loading() {
    this.el_windowList.forEach((window) => window.classList.add("hide"));
    this.el_modal?.classList.add("hide");
    this.background?.classList.add("hide");
  }
}
