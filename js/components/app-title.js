import RootElement from './app-rootelement.js';

class appTitle extends RootElement {
  constructor() {
    super();
    this.renderData();
  }
  renderData() {
    this.innerHTML = `
        <h1 class="title">Matching Game</h1>
        `;
  }
}

customElements.define('app-title', appTitle);

export default appTitle;
