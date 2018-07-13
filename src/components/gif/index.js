
export class RepeatGIF extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(value) {
    this.setAttribute('src', value);
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = RepeatGIF.template;
    if(this.src !== null) {
      this.image = this._createImage(this.src);
      this.shadowRoot.appendChild(this.image);
    }
  }

  _createImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.height = '100%';
    img.style.width = '100%';
    return img;
  }

}

customElements.define('repeat-gif', RepeatGIF);
