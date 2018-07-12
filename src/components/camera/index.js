

export class RepeatCamera extends HTMLElement {
  static get template() {
    return `
    /** SHADOW:STYLES **/
     <!-- SHADOW:TEMPLATE -->
    `
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = RepeatCamera.template;

    this.video = this.shadow.querySelector('#repeatVideo');
    this.open();
  }

  open() {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    }).then(stream => {
      this.stream = stream;
      this.src = URL.createObjectURL(this.stream);
      this.video.src = this.src;
      this.video.play();
    })
    // const mediaSource = new MediaSource(this.stream);
    // try {
    //   this.video.srcObject = mediaSource;
    // } catch (error) {
    //   this.video.src = URL.createObjectURL(mediaSource);
    // }
  }

  close() {
    if (typeof this.stream !== 'undefined') {
      const track = this.stream.getTracks()[0];
      track.stop();
      this.video.pause();
    }
  }
}

customElements.define('repeat-camera', RepeatCamera);
