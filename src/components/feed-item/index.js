
export class FeedItem extends HTMLElement {
  static template(state) {
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
    this.shadowRoot.innerHTML = FeedItem.template({ src: this.src });
  }

}

customElements.define('repeat-feed-item', FeedItem);
