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
    this.pubsub.subscribe('Image', 'getCardText', null, this.renderData);
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
    if (theme === 'image') {
      cards = this.pubsub.getData('getImage', null);
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
        if (theme === 'image') {
          card.style.backgroundColor = '#dcdcdc';
          card.style.backgroundImage = `url(${item})`;
        }
        this.pubsub.publish('SelectedCard', { id: i, item });
        this.checkMatch;
      });
      this.querySelector('#cardlist').appendChild(card);
    });
  }

  checkMatch(selectedCard) {
    var matchedNumber = this.pubsub.getData('getMatchedNumber', null);
    var roundNumber = this.pubsub.getData('getRoundNumber', null);
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
      this.pubsub.publish('MatchedNumber', matchedNumber + 1);
      this.pubsub.publish('RoundNumber', roundNumber + 1);
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
          `#card-${selectedCard[0].id}`
        ).style.backgroundImage = '';
        document.querySelector(
          `#card-${selectedCard[1].id}`
        ).style.backgroundColor = 'black';
        document.querySelector(
          `#card-${selectedCard[1].id}`
        ).style.backgroundImage = '';
      }, 500);
      this.pubsub.publish('SelectedCardBack', null);
      this.pubsub.publish('RoundNumber', roundNumber + 1);
    }
  }
  shuffleCard() {
    let numberOfCards = this.pubsub.getData('getNumberOfCards', null);
    var theme = this.pubsub.getData('getThemeOfCard', null);
    var cards = this.pubsub.getData('getOriginalCard', null);
    var textcards = this.pubsub.getData('getOriginalCardText', null);
    var images = this.pubsub.getData('getOriginalImage', null);
    var data = cards;
    this.pubsub.publish('MatchedNumber', 0);
    this.pubsub.publish('RoundNumber', 0);
    if (theme === 'text') {
      data = textcards;
    }
    if (theme === 'image') {
      data = images;
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
    if (theme === 'image') {
      this.pubsub.publish('Image', data);
    }
  }

  showTheGame() {
    this.pubsub.publish('isGameShow', true);
  }
}

customElements.define('app-cards', appCards);

export default appCards;
