class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  addItem(element){
    this._container.append(element);
  }
}

export { Section };