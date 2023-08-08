
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

/*
//Modal.js
export default class Modal {

  // Constructor to initialize the modal with given selector
  constructor(modalSelector) {
    // Store a reference to the modal element
    this._modal = document.querySelector(modalSelector);

    // Bind the closeModalEscape function to the instance of Modal
    this.closeModalEscape = this.closeModalEscape.bind(this);

    // Set up event listeners for the modal
    this.setEventListeners();
  }

  // Function to close the modal when the escape key is pressed
  closeModalEscape(e) {
    if (e.key === "Escape" || e.code === "Escape") {
      this.closeModalWindow(); // Call the closeModalWindow method
    }
  }

  // Function to open the modal window
  openModalWindow() {
    // Add the "modal_opened" class to show the modal
    this._modal.classList.add("modal_opened");

    // Add event listener to handle escape key press
    document.addEventListener("keydown", this.closeModalEscape);
  }

  // Function to close the modal window
  closeModalWindow() {
    if (this._modal.classList.contains("modal_opened")) {
      // Remove the "modal_opened" class to hide the modal
      this._modal.classList.remove("modal_opened");

      // Remove the event listener for escape key press
      document.removeEventListener("keydown", this.closeModalEscape);
    }
  }

  // Function to set event listeners for the modal
  setEventListeners() {
    // Add mousedown event listener to close modal if background is clicked
    this._modal.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModalWindow();
      }
    });
  }
}
*/

