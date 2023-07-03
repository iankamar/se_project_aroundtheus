const initialCards = [
  // Array of initial card data

  {
    name: "Yosemite Valley",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// DOM elements

const cardsWrap = document.querySelector("#cardList");

const profileEditButton = document.querySelector("#profileEditButton");

const profileEditModal = document.querySelector("#profileEditModal");

const profileCloseButton = document.querySelector("#profileCloseButton");

const profileName = document.querySelector("#profileName");

const profileDescription = document.querySelector("#profileDescription");

const profileNameInput = document.querySelector("#profileNameInput");

const profileDescriptionInput = document.querySelector(
  "#profileDescriptionInput"
);

const profileForm = profileEditModal.querySelector("#profileEditForm");

const profileAddButton = document.querySelector("#profileAddButton");

const cardTemplate = document.querySelector("#cardTemplate");

const cardAddModal = document.querySelector("#cardAddModal");

const cardCloseButton = document.querySelector("#cardCloseButton");

const cardTitleInput = document.querySelector("#cardTitleInput");

const cardImageInput = document.querySelector("#cardImageInput");

const cardImages = document.querySelectorAll("#cardImage");

const cardPreviewModal = document.querySelector("#cardPreviewModal");

const cardPreviewCloseButton = cardPreviewModal.querySelector(
  "#modalCardPreviewCloseButton"
);

const cardImage = cardPreviewModal.querySelector("#modalPreviewImage");

const cardCaption = cardPreviewModal.querySelector("#modalCaption");

// Function to close a popup modal

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

// Function to open a popup modal

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

// Event handler for profile form submission

function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileName.textContent = profileNameInput.value;

  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
}

// Event handler for the like button

function handleLikeButton(e) {
  e.target.classList.toggle("card__like-button_active");
}

// Event handler for deleting a card

function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}

// Event handler for previewing an image in a modal

function handlePreviewImage(cardData) {
  cardImage.src = cardData.link;

  cardImage.alt = cardData.name;

  cardCaption.textContent = cardData.name;

  openPopup(cardPreviewModal);
}

// Event handler for closing the preview modal

function handlePreviewModalClose() {
  closePopup(cardPreviewModal);
}

cardPreviewCloseButton.addEventListener("click", handlePreviewModalClose);

// Function to create a card element from card data

function getCardElement(cardData) {
  const cardElement = cardTemplate.content

    .querySelector(".card")

    .cloneNode(true);

  const cardImage = cardElement.querySelector("#cardImage");

  const cardTitle = cardElement.querySelector("#cardTitle");

  const likeButton = cardElement.querySelector("#cardLikeButton");

  const deleteButton = cardElement.querySelector("#cardDeleteButton");

  cardImage.src = cardData.link;

  cardImage.alt = cardData.name;

  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", handleLikeButton);

  deleteButton.addEventListener("click", handleDeleteCard);

  cardImage.addEventListener("click", () =>
    handlePreviewImage(cardData, cardImage)
  );

  return cardElement;
}

// Function to fill the profile form

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;

  profileDescriptionInput.value = profileDescription.textContent;
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Event handler for card form submission

function handleCardFormSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: cardTitleInput.value,

    link: cardImageInput.value,
  };

  const cardElement = getCardElement(cardData);

  cardsWrap.prepend(cardElement);

  e.target.reset();

  closePopup(cardAddModal);
}

cardAddForm.addEventListener("sumbit", handleCardFormSubmit);

// Event listeners

profileEditButton.addEventListener("click", () => {
  fillProfileForm();

  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileAddButton.addEventListener("click", () => openPopup(cardAddModal));

cardCloseButton.addEventListener("click", () => closePopup(cardAddModal));

cardAddForm.addEventListener("submit", handleCardFormSubmit);

// Initial rendering of cards

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardsWrap.prepend(cardElement);
});
