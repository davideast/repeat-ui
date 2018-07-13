
export class AcceptButton extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.setAttribute('role', 'button');
    this.shadowRoot.innerHTML = AcceptButton.template;
  }

}

customElements.define('repeat-accept-button', AcceptButton);
