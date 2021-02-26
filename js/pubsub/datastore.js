import { colorBase, cardText } from '../data/cards-data.js';
class DataStore {
  constructor() {
    this.card = colorBase;
    this.selectedCard = [];
    this.numberOfCards = 4;
    this.cardText = cardText;
    this.themeOfCard = 'color';
  }

  getRequest(subscriber) {
    return this[subscriber.request](subscriber.parameters);
  }

  setRequest(request) {
    let req = 'set' + request.newInfo;
    let res = this[req](request.data);
    return res;
  }

  setNumberOfCards(newData) {
    this.numberOfCards = newData;
  }

  getNumberOfCards() {
    return this.numberOfCards;
  }

  setCardText(newData) {
    this.cardText = newData;
  }

  getCardText() {
    return this.cardText;
  }

  setThemeOfCard(newData) {
    this.themeOfCard = newData;
  }

  getThemeOfCard() {
    return this.themeOfCard;
  }

  setSelectedCard(newData) {
    this.selectedCard.push(newData);
  }
  setSelectedCardBack() {
    this.selectedCard = [];
  }

  getSelectedCard() {
    return this.selectedCard;
  }

  setNewCard(newData) {
    this.card = newData;
  }
  /*
  shuffleCard(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }*/
  getCard() {
    return this.card;
  }
}

export default new DataStore();
