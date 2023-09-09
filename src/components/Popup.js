class Popup {

  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector);
  }

  open() {
    this._popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupItem.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = evt => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupItem.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}

export { Popup };