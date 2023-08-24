// Card.js
export default class Card {

  constructor({cardData, cardSelector, handleCardPreview}) {
    this._text = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handleCardPreview;
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
    // Set the image source and alt attribute
    this._imageElement.src = this._link;
    this._imageElement.alt = this._text;
  }

  _toggleLike() {
    // Toggle the like button class on click
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    // Open a popup with the image and text on click
    const cardData = {
      name: this._text,
      link: this._link,
    };
    this._handlePreviewImage(cardData);
  }

  _setEventListeners() {
    // Add event listeners to the card elements
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCard(); // Call the deleteCard method
    });

    this._imageElement.addEventListener("click", () => {
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

    // Set card text and image
    this._setCardText();
    this._setCardImage();

    // Attach event listeners to card elements
    this._setEventListeners();

    // Return the card element
    return this._element;
  }

  _deleteCard() {
    // Remove the card element
    this._element.remove();
    this._element = null;
  }
}
