import RootElement from './app-rootelement.js';

class appFooter extends RootElement {
  constructor() {
    super();
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
    <div class="footer">
        <div class="footer-box">
            <a href="https://iceicery.github.io/pinwei/" target= _blank rel= noreferrer class="footer__text">&copy; Pinwei Wu</a>
            <a href="https://www.linkedin.com/in/pinwei-wu-514713120/" target= _blank rel= noreferrer>
                 <img src="../images/linkedin.svg" alt="link to linkedin" class="footer__icon"/>
            </a>
            <a href="https://github.com/iceicery" target= _blank rel= noreferrer>
                <img src="../../images/github.svg" alt="link to github" class="footer__icon"/>
            </a>
        </div>
        <p class="footer__text">Images from unsplash.com </p>
        <p class="footer__text">Icons from fontawesome.com</p>
    </div>
        `;
  }
}

customElements.define('app-footer', appFooter);
export default appFooter;
