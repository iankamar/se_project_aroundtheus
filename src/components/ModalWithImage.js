//ModalWithImages.js
// Import the Modal class from the specified path
import Modal from "../components/Modal.js";

// Define a class that extends the Modal class for image modals
export default class ModalWithImage extends Modal {

  // Constructor for initializing the image modal
  constructor(modalSelector) {
    // Call the parent class constructor
    super(modalSelector);
    /*
    // Store references to the modal image and caption elements
    this._modalImage = this._modal.querySelector(".modal__image");
    this._modalCaption = this._modal.querySelector(".modal__caption");
    */
  }

  // Method to open the image modal with provided card data
  open(cardData) {
    // Set the source and alt attributes of the modal image
    this._modalImage.src = cardData.link;
    this._modalImage.alt = cardData.name;

    // Set the text content of the modal caption
    this._modalCaption.textContent = cardData.caption;

    // Call the open method of the parent class to show the modal
    super.open();
  }
}
