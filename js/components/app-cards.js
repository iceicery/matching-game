import RootElement from './app-rootelement.js';
import PubSub from '../pubsub/pubsub.js';
import { colorBase } from '../data/cards-data.js';

class appCards extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.data = colorBase;
    this.renderData();
    this.pubsub.subscribe('NewCard', 'getCard', null, this.renderData);
    this.pubsub.subscribe('CardText', 'getCardText', null, this.renderData);
    this.pubsub.subscribe(
      'ThemeOfCard',
      'getThemeOfCard',
      null,
      this.renderData
    );
    this.pubsub.subscribe(
      'SelectedCard',
      'getSelectedCard',
      null,
      this.checkMatch
    );
  }

  renderData() {
    this.innerHTML = `
    <button class="shuffle">Start The Game!</button>
    <div id="cardlist" class="cardlist"></div>
        `;
    this.querySelector('.shuffle').addEventListener('click', this.shuffleCard);
    var theme = this.pubsub.getData('getThemeOfCard', null);
    var cards = this.pubsub.getData('getCard', null);
    if (theme === 'text') {
      cards = this.pubsub.getData('getCardText', null);
    }
    cards.map((item, i) => {
      var card = document.createElement('div');
      card.className = 'card';
      card.id = `card-${i}`;
      card.style.backgroundColor = 'black';
      card.addEventListener('click', () => {
        if (theme === 'color') {
          card.style.backgroundColor = item;
        }
        if (theme === 'text') {
          card.style.backgroundColor = '#dcdcdc';
          card.textContent = item;
        }
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
    let numberOfCards = this.pubsub.getData('getNumberOfCards', null);
    var theme = this.pubsub.getData('getThemeOfCard', null);
    var cards = this.pubsub.getData('getCard', null);
    var textcards = this.pubsub.getData('getCardText', null);
    var data = cards;
    if (theme === 'text') {
      data = textcards;
    }
    data = data.slice(0, numberOfCards);
    data.push(...data);
    for (let i = data.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    if (theme === 'color') {
      this.pubsub.publish('NewCard', data);
    }
    if (theme === 'text') {
      this.pubsub.publish('CardText', data);
    }
  }

  showTheGame() {
    this.pubsub.publish('isGameShow', true);
  }
}

customElements.define('app-cards', appCards);

export default appCards;
