

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
    this.canvas = this.shadow.querySelector('canvas');
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

  takePhoto() {
    const imageWidth = this.video.videoWidth;
    const imageHeight = this.video.videoHeight;

    const context = this.canvas.getContext('2d');
    this.canvas.width = imageWidth;
    this.canvas.height = imageHeight;

    context.drawImage(this.video, 0, 0, imageWidth, imageHeight);

    const highRes = this.canvas.toDataURL('image/png');
    const lowRes = this.canvas.toDataURL('image/png', 0.3);
    
    return { highRes, lowRes, imageHeight, imageWidth };
  }
}

customElements.define('repeat-camera', RepeatCamera);
