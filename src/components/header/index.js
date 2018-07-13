
export class RepeatHeader extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  get profileURL() {
    return this.getAttribute('profileURL');
  }

  set profileURL(value) {
    this.setAttribute('profileURL', value);
  }

  get profile() {
    return this.shadowRoot.querySelector('.profileURL');
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = RepeatHeader.template;
    if(this.profileURL === null) {
      this.profile.style.display = 'none';
    }
  }

}

customElements.define('repeat-header', RepeatHeader);
