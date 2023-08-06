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