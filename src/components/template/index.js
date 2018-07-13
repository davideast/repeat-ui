
export class RepeatComponent extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }

}

customElements.define('repeat-component', RepeatComponent);
