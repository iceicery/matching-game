import RootElement from './app-rootelement.js';

class appTitle extends RootElement {
  constructor() {
    super();
    this.renderData();
  }
  renderData() {
    this.innerHTML = `
        <h1 class="title"></h1>`;
    var title = this.getAttribute('title');
    document.querySelector('.title').textContent = title;
  }
}

customElements.define('app-title', appTitle);

export default appTitle;
