import { colorBase } from '../data/cards-data.js';
class DataStore {
  constructor() {
    this.card = colorBase;
    this.card = this.card.slice(0, 4);
    this.card.push(...this.card);
    this.selectedCard = [];
    this.numberOfCards = 4;
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

  getCard() {
    for (let i = this.card.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.card[i], this.card[j]] = [this.card[j], this.card[i]];
    }
    return this.card;
  }
}

export default new DataStore();
