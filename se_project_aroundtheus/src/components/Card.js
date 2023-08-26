// Card.js
export default class Card {

  constructor({cardData, cardSelector, handleCardPreview, handleDeleteClick, handleCardLike}) {
    this._id = cardData._id;
    this._text = cardData.name;
    this._link = cardData.link;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handleCardPreview;
    this._handleDeleteCard = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._likeCount = 0; // Initialize the like count to 0
    this._isLiked = false; // Initialize the like state to false
  }

  // Private methods
  _getTemplate() {
    // Template element from the DOM
    const cardTemplate = document.querySelector(this._cardSelector).content;
    // Return clone template
    const card = cardTemplate.querySelector(".card").cloneNode(true);
    card.id = `card_${this._id}`;
    return card;
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

  _setCardLike() {
    if (this._isLiked){
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }

  }

  _toggleLike() {
    // Toggle the like button class on click
    this._handleCardLike(this._id, this._isLiked);
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    // Open a modal with the image and text on click
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

  _deleteCard() {
    // Remove the card element
    this._handleDeleteCard(this._id);
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
    this._setCardLike();

    // Attach event listeners to card elements
    this._setEventListeners();

    // Return the card element
    return this._element;
  }

  updateLikes() {
    // Toggle the like state
    this._isLiked = !this._isLiked;

    // Update the like count
    if (this._isLiked) {
      this._likeCount++;
    } else {
      this._likeCount--;
  }

    // Update the like count display on the card
  const likeCountElement = this._element.querySelector(".card__like-count");
  likeCountElement.textContent = this._likeCount;
}
}
