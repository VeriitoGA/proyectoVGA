class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Veronica Gutierrez Aguirre.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
