export default class Modal {
  constructor({ modalSelector }) {
    this._modal = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // opens modal
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes modal
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    // listens for esc button
    e.preventDefault();
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._modal.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());

    // sets event listeners
    this._modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}
