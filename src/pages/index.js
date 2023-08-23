// Import necessary modules and constants
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  config,
  initialCards,
  validationConfig,
  selectors,
  settings,
  apiConfig,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Section from "../components/Section.js";
import Modal from "../components/Modal.js";
import Api from "../utils/Api.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

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
const profileAvatarEditLogo = document.querySelector("#profileAvatarEditLogo");

const profileForm = document.querySelector("#profileEditForm");
const profileAddButton = document.querySelector("#profileAddButton");
const cardAddButton = document.querySelector("#cardAddButton");
const cardTemplate = document.querySelector("#cardTemplate");
const cardAddModal = document.querySelector("#cardAddModal");
const cardCloseButton = document.querySelector("#cardCloseButton");
const cardTitleInput = document.querySelector("#cardTitleInput");
const cardImageInput = document.querySelector("#cardImageInput");
const cardPreviewModal = document.querySelector("#cardPreviewModal");
const cardPreviewCloseButton = document.querySelector(
  "#modalCardPreviewCloseButton"
);

const editProfileAvatar = document.querySelector("#profileImage");
const updateProfileImage = document.querySelector("#updateProfileImage");

const cardImage = cardPreviewModal.querySelector("#modalPreviewImage");
const cardCaption = cardPreviewModal.querySelector("#modalCaption");
const cardModalButton = cardPreviewModal.querySelector("#cardModalButton");

// Instance of the UserInfo class
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userImageSelector: ".profile__image",
});

// Create an instance of the API class
const api = new Api(apiConfig);

// Create and enable form validators for editing profile and adding cards
const editProfileValidator = new FormValidator(config, profileEditModal);
editProfileValidator.enableValidation();
const editCardValidator = new FormValidator(config, cardAddModal);
editCardValidator.enableValidation();
const updateProfileImageValidator = new FormValidator(
  config,
  updateProfileImage
);
/*updateProfileImageValidator.enableValidation();*/

// Fetch initial cards data from API
api
  .getInitialCards()
  .then((cardData) => {
    // Create an instance of the Section class
    const section = new Section(
      { items: cardData, renderer: (item) => renderCard(item, section) },
      ".cards"
    );

    // Function to render a card using the Card class
    function renderCard(cardData, section) {
      const card = new Card(cardData, "#cardTemplate", handlePreviewImage);
      const cardElement = card.getView();
      section.addItem(cardElement);
    }

    // Render initial cards
    section.renderItems();
  })
  .catch((err) =>
    console.log(`An error occurred when loading initial cards data: ${err}`)
  );

// Modify the renderCard function to pass the userId parameter when creating a new Card instance
function renderCard(cardData, section) {
  const card = new Card(cardData, "#cardTemplate", handlePreviewImage, userId);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

// Event handler for profile form submission
function handleProfileFormSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
  profileEditModalInstance.close();
}

function fillProfileForm() {
  const { userName, userDescription } = userInfo.getUserInfo();
  // Set the input values in the profile form
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
}

function handleCardFormSubmit(inputValues) {
  console.log(inputValues);
  // Get input values from the form
  const cardTitle = inputValues["card-title-input"];
  const cardImage = inputValues["card-image-input"];

  // Card data object
  const cardData = {
    name: cardTitle,
    link: cardImage,
  };

  // Render the new card
  renderCard(cardData, section);

  // Close the card add modal
  cardFormModalInstance.close();
}

// Event handler for previewing an image in a modal
function handlePreviewImage(cardData) {
  cardPreviewModalInstance.open(cardData);
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  editCardValidator.resetValidation();
  fillProfileForm();
  profileEditModalInstance.open();
});

// Event listeners
profileAddButton.addEventListener("click", () => {
  editCardValidator.resetValidation();
  cardFormModalInstance.open();
});

const profileEditModalInstance = new ModalWithForm({
  modalSelector: "#profileEditModal",
  handleFormSubmit: handleProfileFormSubmit,
});

const cardFormModalInstance = new ModalWithForm({
  modalSelector: "#cardAddModal",
  handleFormSubmit: handleCardFormSubmit,
});

const cardPreviewModalInstance = new ModalWithImage({
  modalSelector: "#cardPreviewModal",
  handleFormSubmit: handleCardFormSubmit,
});

profileEditModalInstance.setEventListeners();
cardFormModalInstance.setEventListeners();
cardPreviewModalInstance.setEventListeners();

/*
//Modal and previews.

const addModalWithImage = new ModalWithImage("#cardPreviewModal");
addModalWithImage.setEventListeners();
const addCardModal = new ModalWithForm({
  modalSelector: "#cardAddModal",

  handleFormSubmit: (cardData) => {
    addCardModal.setLoading(true);
    Api.addNewCard(data)
      .then((cardData) => {
        const card = createCard(cardData);
        cardSection.addItem(cardData);

        addCardModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardModal.setLoading(false, "Create");
      });
  },
});

addCardModal.setEventListeners();

// Create an instance of ModalWithConfirmation for delete confirmation
const deleteForm = new ModalWithConfirmation(selectors.deleteModal);
deleteForm.setEventListeners();

// Create a function to create card instances
const createCard = (data) => {
  const card = new Card(
    {
      data: { ...data, userId },
      handlePreview: (imgData) => {
        previewCardModal.open(imgData);
      },
      handleDeleteClick: () => {
        deleteForm.open(() => {
          deleteForm.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.handleDelete();
              deleteForm.close();
            })
            .catch((err) =>
              console.log(`An error occurred when deleting card: ${err}`)
            )
            .finally(() => deleteForm.renderLoading(false));
        });
      },
      handleCardLike: () => {
        if (card.cardLiked()) {
          api
            .removeLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) =>
              console.log(`An error occurred when removing a like: ${err}`)
            );
        } else {
          api
            .addLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) =>
              console.log(`An error occurred when adding a like: ${err}`)
            );
        }
      },
    },
    selectors.cardTemplate
  );
  return card.generateCard();
};

// Create an instance of ModalWithImage for card preview
const previewCardModal = new ModalWithImage(selectors.previewCardModal);
previewCardModal.setEventListeners();

// Fetch webpage info, cards, and user data from API
api
  .getWebpageInfo()
  .then(([cardData, userData]) => {
    userId = userData._id;
    section = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const cardEl = createCard(data);
          section.addItems(cardEl);
        },
      },
      ".cards__list"
    );
    section.renderItems();
    newUserInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    newUserInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) =>
    console.log(
      `An error occurred when loading initial user and card data: ${err}`
    )
  );

// Create an instance of ModalWithForm for adding a new card
const addForm = new ModalWithForm("#cardAdd", (data) => {
  const newCard = { name: data.title, link: data.link };
  addForm.renderLoading(true);
  api
    .addNewCard(newCard)
    .then((result) => {
      const newCardEl = createCard(result);
      section.prependItem(newCardEl);
      addForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading new card data: ${err}`)
    )
    .finally(() => addForm.renderLoading(false));
});
addForm.setEventListeners();

// Handle opening the add card form
addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addForm.open();
});

// Create a FormValidator instance for the add card form
const addFormValidator = new FormValidator(
  validationConfig,
  selectors.cardAddForm
);
addFormValidator.enableValidation();

// Create an instance of UserInfo for the user's profile information
const newUserInfo = new UserInfo({
  nameElement: profileName,
  descriptionElement: profileDescription,
  avatar: profileAvatar,
});

// Create an instance of ModalWithForm for updating user profile
const profileForm = new ModalWithForm(selectors.profileEditModal, (data) => {
  profileForm.renderLoading(true);
  api
    .updateProfileData(data.name, data.description)
    .then(() => {
      newUserInfo.setUserInfo(data);
      profileForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading user profile data: ${err}`)
    )
    .finally(() => profileForm.renderLoading(false));
});
profileForm.setEventListeners();

// Handle opening the edit profile form
profileEditButton.addEventListener("click", () => {
  const { profileNameInput, profileDescriptionInput } =
    newUserInfo.getUserInfo();
  profileNameInput.value = profileNameInput;
  profileDescriptionInput.value = profileDescriptionInput;
  profileForm.open();
});

// Create a FormValidator instance for the edit profile form
const editFormValidator = new FormValidator(
  validationConfig,
  selectors.profileForm
);
editFormValidator.enableValidation();

// Edit Profile

const userInfoModal = new ModalWithForm({
  modalSelector: "#profileEditModal",

  handleFormSubmit: (Data) => {
    userInfoModal.setLoading(true);
    Api.editUserProfile(Data)
      .then((userInfo) => {
        userInfo.setProfileInfo(userInfo.name, userInfo.description);

        userInfoModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userInfoModal.setLoading(false, "Save");
      });
  },
});

userInfoModal.setEventListeners();

// Modal Close

const confirmModal = new ModalWithForm({
  modalSelector: "#confirmDelete",
});
confirmModal.setEventListeners();

// Change Profile Picture

const updateProfileImage = new ModalWithForm({
  modalSelector: "#updateProfileImage",
  handleFormSubmit: (link) => {
    updateProfileImage.setLoading(true);
    Api.updateProfileImage({ avatar: link.url })
      .then((data) => {
        userInfo.setProfilePic(data.avatar);

        updateProfileImage.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateProfileImage.setLoading(false, "Save");
      });
  },
});
updateProfileImage.setEventListeners();

// profile avatar logo

profileAvatarEditLogo.addEventListener("click", () => {
  profileAvatarFormValidator.resetValidation();

  updateProfileImage.open();
});

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getProfileInfo();
  profileNameInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.description;

  userInfoModal.open();
});

// Create card function

function createCard(item) {
  const card = new Card(
    {
      data: item,
      userId: userId,
      handCardClick: (data) => {
        addModalWithImage.open(data);
      },
      handleLikeClick: (id, isLiked) => {
        return Api.updateCardLike(id, isLiked);
      },
      handleDeleteClick: (cardID) => {
        confirmModal.open();
        confirmModal.setSubmitAction(() => {
          Api.deleteCard(cardID)
            .then(() => {
              card.removeCard();

              confirmModal.close();
            })
            .catch(() => (err) => console.log(err));
        });
      },
    },
    selectors.cardTemplate
  );
  return card.getView();
}
let cardSection;

// Profile for UserInfo

Promise.all([Api.getInitialCards(), Api.getUserInfo()])
  .then(([initialCards, user]) => {
    userId = user._id;
    userInfo.setProfileInfo(user.name, user.description);
    userInfo.setProfileImage(user.avatar);
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const card = createCard(data);

          cardSection.addItem(card);
        },
      },
      selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch(() => (err) => console.log(err));

profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation();

  addCardModal.open();
});
*/
