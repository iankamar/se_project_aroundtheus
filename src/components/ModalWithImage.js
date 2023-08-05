import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modal.querySelector(".modal__preview-image");
    this._modalCaption = this._modal.querySelector(".modal__caption");
  }

  open(cardData) {
    this._modalImage.src = cardData.link;
    this.modalImage.alt = cardData.name;
    this.modalCaption.textContent = cardData.caption;
    super.open();
  }
}
