
export class PlayButton extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }


  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.setAttribute('role', 'button');
    this.shadow.innerHTML = PlayButton.template;
  }

}

customElements.define('repeat-play-button', PlayButton);
