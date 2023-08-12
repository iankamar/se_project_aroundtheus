// modal.js
export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = document.querySelector(".modal__close");
  }

  _handleEscClose(e) {
    if (e.key === "Escape" || e.code === "Escape") {
      this.close();
    }
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());

    this._modal.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal__wrapper")) {
        this.close();
      }
    });
  }
}
