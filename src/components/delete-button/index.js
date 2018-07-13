
export class DeleteButton extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.setAttribute('role', 'button');
    this.shadowRoot.innerHTML = DeleteButton.template;
  }

}

customElements.define('repeat-delete-button', DeleteButton);
