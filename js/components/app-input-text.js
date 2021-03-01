import RootElement from './app-rootelement.js';
import Pubsub from '../pubsub/pubsub.js';

class appInputText extends RootElement {
  constructor() {
    super();
    this.pubsub = Pubsub;
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <form class="form">
    <p class="form__title">Input Text for Matching Game</p>
    <div class="form__textinput-container">
      <input type="text" id="text1" name="text" placeholder="Enter Text" value='1' class="form__textinput">
      <input type="text" id="text2" name="text" placeholder="Enter Text" value='2' class="form__textinput">
      <input type="text" id="text3" name="text" placeholder="Enter Text" value='3' class="form__textinput">
      <input type="text" id="text4" name="text" placeholder="Enter Text" value='4' class="form__textinput">
      <input type="text" id="text5" name="text" placeholder="Enter Text" value='5' class="form__textinput">
      <input type="text" id="text6" name="text" placeholder="Enter Text" value='6' class="form__textinput">
      <input type="text" id="text7" name="text" placeholder="Enter Text" value='7' class="form__textinput">
      <input type="text" id="text8" name="text" placeholder="Enter Text" value='8' class="form__textinput">
      <input type="text" id="text9" name="text" placeholder="Enter Text" value='9' class="form__textinput">
      <input type="text" id="text10" name="text" placeholder="Enter Text" value='10' class="form__textinput">
      <input type="text" id="text11" name="text" placeholder="Enter Text" value='11' class="form__textinput">
      <input type="text" id="text12" name="text" placeholder="Enter Text" value='12' class="form__textinput">
    </div>
    <div>
      <input type="submit" name="submit" class="form__button" value="Confirm">
    </div>
  </form>`;
    this.querySelector('.form').onsubmit = this.getInputValue;
  }
  getInputValue(e) {
    e.preventDefault();
    var input = document.querySelectorAll('input[name="text"]');
    var inputValue = [];
    for (var i = 0; i < 12; i++) {
      inputValue.push(input[i].value);
    }
    this.pubsub.publish('OriginalCardText', inputValue);
    this.pubsub.publish('ThemeOfCard', 'text');
  }
}

customElements.define('app-input-text', appInputText);

export default appInputText;
