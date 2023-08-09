// modal.js
/*
export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this.__handleEscClose = this._handleEscClose.bind(this);
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
    // listens for esc butt
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
*/
export default class modal {
  constructor() {
    this.openedModal = null;
    this.closeModalEscape = this.closeModalEscape.bind(this);
  }

  closeModalEscape(e) {
    if (e.key === "Escape" || e.code === "Escape") {
      this.closeModalWindow();
    }
  }

  openModalWindow(modal) {
    this.openedModal = modal;
    this.openedModal.classList.add("modal_opened");
    document.addEventListener("keydown", this.closeModalEscape);
  }

  closeModalWindow() {
    if (this.openedModal) {
      this.openedModal.classList.remove("modal_opened");
      document.removeEventListener("keydown", this.closeModalEscape);
      this.openedModal = null;
    }
  }

  addModalEventListener(modalElement, closeElements) {
    modalElement.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("modal") ||
        closeElements.some((element) => e.target.classList.contains(element))
      ) {
        this.closeModalWindow();
      }
    });
  }
}