//UserInfo.js
export default class UserInfo {
  // Constructor to initialize selectors for user name and description
  constructor({ nameSelector, descSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descSelector);
    this._userImage = document.querySelector(avatarSelector);
  }

  getAvatar() {
    return this._userImage.src;
  }

  setAvatar(link) {
    this._userImage.src = link;
  }

  // Method to retrieve user information from DOM
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    };
  }

  // Method to set user information in the DOM
  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}
