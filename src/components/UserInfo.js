export default class userInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userImageSelector,
  }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userImage = document.querySelector(userImageSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
      userImage: this._userImage.src,
    };
  }

  setUserInfo({ name, description, image }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
    this._userImage.src = image ? image : this._userImage.src;
  }
}
