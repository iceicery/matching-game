import RootElement from './app-rootelement.js';

class appTitle extends RootElement {
  constructor() {
    super();
    this.renderData();
  }
  renderData() {
    this.innerHTML = `
        <h1 class="title"></h1>
        <p class="subtitle"></p>`;
    var title = this.getAttribute('title');
    document.querySelector('.title').textContent = title;
    var subtitle = this.getAttribute('subtitle');
    document.querySelector('.subtitle').textContent = subtitle;
  }
}

customElements.define('app-title', appTitle);

export default appTitle;
