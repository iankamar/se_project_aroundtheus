// Card.js
export default class Card {
  constructor(cardData, cardSelector) {
    this._text = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  // Private methods
  _getTemplate() {
    // Template element from the DOM
    const cardTemplate = document.querySelector(this._cardSelector).content;
    // Return clone template
    return cardTemplate.querySelector(".card").cloneNode(true);
  }

  _setCardText() {
    // Find the text element in the card and set its content
    const cardTitleElement = this._element.querySelector(".card__title");
    cardTitleElement.textContent = this._text;
  }

  _setCardImage() {
    // Find the image element in the card and set its attributes
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._image;
    cardImage.alt = this._text;
  }

  _toggleLike() {
    // Toggle the like button class on click
    this._likeButton.classList.toggle(".card__like-button_active");
  }

  _handleImageClick() {
    // Open a popup with the image and text on click
    const cardData = {
      name: this._text,
      link: this._image,
    };
    handlePreviewImage(cardData);
  }

  _setEventListeners() {
    // Add event listeners to the card elements
    this._likeButton.addEventListener("click", () => {
      this_toggleLike();
    });

    this._deleteButton.addEventListener("click", (e) => {
      this._deleteCard(e);
    });
    this.imageElement.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  // Public method
  getView() {
    // Card element using the template
    this._element = this._getTemplate();

    // References to elements
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._imageElement = this._element.querySelector(".card__image");

    // Card text and image
    this._setCardText();
    this._setCardImage();

    // Event listeners to card elements
    this._setEventListeners();

    // Card element returned
    return this._element;
  }

  _deleteCard(e) {
    // Card element from the DOM on click removed
    const card = e.target.closest(".card");
    card.remove();
    // Reference to the element removed
    this._element = null;
  }
}

