import { colorCards } from '../data/color-cards.js';

let data = colorCards;

console.log(data);
for (let i = data.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [data[i], data[j]] = [data[j], data[i]];
}

class DataStore {
  constructor() {
    this.card = data;
    this.selectedCard = [];
  }

  getRequest(subscriber) {
    return this[subscriber.request](subscriber.parameters);
  }

  setRequest(request) {
    let req = 'set' + request.newInfo;
    let res = this[req](request.data);
    return res;
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
    console.log('setNewCard');
    console.log(newData);
    this.card = newData;
    console.log(this.card);
  }

  getCard() {
    return this.card;
  }
}

export default new DataStore();
