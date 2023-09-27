//ModalWithImages.js
// Import the Modal class from the specified path
import Modal from "../components/Modal.js";
export default class ModalWithImage extends Modal {

  // Constructor for initializing the image modal
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modal.querySelector(".modal__preview-image");
    this._modalCaption = this._modal.querySelector(".modal__caption");
  }

  // Method to open the image modal with provided card data
  open(cardData) {
    this._modalImage.src = cardData.link;
    this._modalImage.alt = cardData.name;
    this._modalCaption.textContent = cardData.name;
    super.open();
  }

}
