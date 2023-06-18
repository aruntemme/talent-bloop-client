/* eslint-disable class-methods-use-this */
import { html, css, LitElement } from 'lit';

export default class BoneButton extends LitElement {
  static styles = css`.bone-btn {
    background: none;
    border: none;
    display: flex;
  }
  img {
    width: 30%;
    height: auto;
  }`;

  render() {
    return html`<button class="bone-btn">
    <img class="" src="/images/pawga/book-session.png" />
  </button>`;
  }
}

customElements.define('bone-button', BoneButton);
