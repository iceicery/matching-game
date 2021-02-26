import RootElement from './app-rootelement.js';
import Pubsub from '../pubsub/pubsub.js';

class appThemeInput extends RootElement {
  constructor() {
    super();
    this.pubsub = Pubsub;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <form class="form">
    <p class="form__title">Select Theme of Cards</p>
    <div>
      <input type="radio" id="Choice1" checked = "true"
       name="theme" value="color" >
      <label for="Choice1" class="form__label">Color</label>
      <input type="radio" id="Choice2"
       name="theme" value="text">
      <label for="Choice2" class="form__label">Text</label>
      <input type="radio" id="Choice3"
       name="theme" value="image">
      <label for="Choice3" class="form__label">Image</label>
    </div>
    <div>
      <input type="submit" name="submit" class="form__button" value="Confirm">
    </div>
  </form>`;
    this.querySelector('.form').onsubmit = this.getThemeValue;
  }
  getThemeValue(e) {
    e.preventDefault();
    var themeOfCards = document.querySelector('input[name="theme"]:checked')
      .value;
    this.pubsub.publish('ThemeOfCard', themeOfCards);
  }
}

customElements.define('app-input-theme', appThemeInput);

export default appThemeInput;
