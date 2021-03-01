import RootElement from './app-rootelement.js';
import PubSub from '../pubsub/pubsub.js';
//import medal from '../../image/medal-solid.svg';

class appResult extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData();
    this.numberOfCards = this.pubsub.getData('getNumberOfCards', null);
    this.pubsub.subscribe(
      'MatchedNumber',
      'getMatchedNumber',
      null,
      this.renderData
    );
    this.pubsub.subscribe(
      'RoundNumber',
      'getRoundNumber',
      null,
      this.renderData
    );
  }

  renderData() {
    this.innerHTML = `
        <p class="result"></p>
        <div class="result__done-container">
            <p class="result__done"></p>
            <img src="" alt="" class="result__done-img" />
        </div>
        `;
    var matchedNumber = this.pubsub.getData('getMatchedNumber', 0);
    var roundNumber = this.pubsub.getData('getRoundNumber', 0);

    this.querySelector(
      '.result'
    ).textContent = `You got ${matchedNumber} matches within ${roundNumber} rounds!`;
    if (matchedNumber === this.numberOfCards) {
      this.querySelector('.result__done').textContent =
        'You did it! Great job!';
      this.querySelector('.result__done-img').src =
        '../../images/medal-solid.svg';
    } else {
      this.querySelector('.result__done').textContent = '';
      this.querySelector('.result__done-img').src = '';
    }
  }
}

customElements.define('app-result', appResult);

export default appResult;
