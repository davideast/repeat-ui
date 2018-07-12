import { RepeatElement } from '../base/index.js';

export class RepeatButton extends RepeatElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  connectedCallback() {
    // const shadowRoot = this.attachShadow({ mode: 'open' });
    this.setAttribute('role', 'button');
  }
}

customElements.define('repeat-button', RepeatButton);
