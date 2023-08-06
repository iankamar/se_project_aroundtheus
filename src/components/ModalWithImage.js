import Modal from "../components/Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }

  open(cardData) {
    this._modalImage.src = cardData.link;
    this.modalImage.alt = cardData.name;
    this.modalCaption.textContent = cardData.caption;
    super.open();
  }
}
