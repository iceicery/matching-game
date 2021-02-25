import RootElement from './app-rootelement.js';
import PubSub from '../pubsub/pubsub.js';
import { colorBase } from '../data/color-cards.js';

let data = colorBase;

class appCards extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.data = this.pubsub.getData('getCard', null);
    this.renderData(this.pubsub.getData('getCard', null));
    this.pubsub.subscribe('NewCard', 'getCard', null, this.renderData);
    this.pubsub.subscribe(
      'SelectedCard',
      'getSelectedCard',
      null,
      this.checkMatch
    );
  }

  renderData(cards) {
    this.innerHTML = `
    <button class="shuffle">Shuffle</button>
    <div id="cardlist" class="cardlist"></div>
        `;
    this.querySelector('.shuffle').addEventListener('click', this.shuffleCard);
    cards.map((item, i) => {
      var card = document.createElement('div');
      card.className = 'card';
      card.id = `card-${i}`;
      card.style.backgroundColor = 'black';
      card.addEventListener('click', () => {
        card.style.backgroundColor = item;
        this.pubsub.publish('SelectedCard', { id: i, item });
        this.checkMatch;
      });
      this.querySelector('#cardlist').appendChild(card);
    });
  }

  checkMatch(selectedCard) {
    if (
      selectedCard.length === 2 &&
      selectedCard[0].item === selectedCard[1].item
    ) {
      document.querySelector(
        `#card-${selectedCard[0].id}`
      ).style.pointerEvents = 'none';
      document.querySelector(
        `#card-${selectedCard[1].id}`
      ).style.pointerEvents = 'none';
      this.pubsub.publish('SelectedCardBack', null);
    }
    if (
      selectedCard.length === 2 &&
      selectedCard[0].item !== selectedCard[1].item
    ) {
      setTimeout(() => {
        document.querySelector(
          `#card-${selectedCard[0].id}`
        ).style.backgroundColor = 'black';
        document.querySelector(
          `#card-${selectedCard[1].id}`
        ).style.backgroundColor = 'black';
      }, 500);
      this.pubsub.publish('SelectedCardBack', null);
    }
  }

  shuffleCard() {
    for (let i = this.data.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
    this.pubsub.publish('NewCard', this.data);
  }
}

customElements.define('app-cards', appCards);

export default appCards;
