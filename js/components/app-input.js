import RootElement from './app-rootelement.js';
import Pubsub from '../pubsub/pubsub.js';

class appInput extends RootElement {
  constructor() {
    super();
    this.pubsub = Pubsub;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <form class="form">
    <p class="form__title">Select Number of Cards</p>
    <div>
      <input type="radio" id="Choice1" checked = "true"
       name="number" value=4 >
      <label for="Choice1" class="form__label">8</label>
  
      <input type="radio" id="Choice2"
       name="number" value=8>
      <label for="Choice2" class="form__label">16</label>
  
      <input type="radio" id="Choice3"
       name="number" value=12>
      <label for="Choice3" class="form__label">24</label>
    </div>
    <div>
      <input type="submit" name="submit" class="form__button" value="Confirm">
    </div>
  </form>`;
    this.querySelector('.form').onsubmit = this.getRadioValue;
  }
  getRadioValue(e) {
    e.preventDefault();
    var numberOfCards = document.querySelector('input[name="number"]:checked')
      .value;
    this.pubsub.publish('NumberOfCards', numberOfCards);
  }
}

customElements.define('app-input', appInput);

export default appInput;
