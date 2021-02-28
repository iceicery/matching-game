import { colorBase, cardText, cardImgs } from '../data/cards-data.js';
class DataStore {
  constructor() {
    this.originCard = colorBase;
    this.originalCardText = cardText;
    this.originalImage = cardImgs;
    this.card = colorBase;
    this.card = this.card.splice(0, 4);
    this.card.push(...this.card);
    this.selectedCard = [];
    this.numberOfCards = 4;
    this.cardText = [];
    this.image = [];
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

  shuffleCard(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  getOriginalCard() {
    return this.originCard;
  }

  setOriginalCardText(newData) {
    this.originalCardText = newData;
  }

  getOriginalCardText() {
    return this.originalCardText;
  }

  getCard() {
    this.shuffleCard(this.card);
    return this.card;
  }

  getOriginalImage() {
    return this.originalImage;
  }

  setImage(newData) {
    this.image = newData;
  }

  getImage() {
    return this.image;
  }
}

export default new DataStore();
