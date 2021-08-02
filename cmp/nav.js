// @ts-nocheck
import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class nav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      ` <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.html" class="text-light">Sesión</a>
                </li>
      </ul> `;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
      async cambiaUsuario(usu) {
        if (usu && usu.email) {
          let html = "";
          const roles =
            await cargaRoles(
              usu.email);
          /* Enlaces para solo
           * para docentes. */
          if (roles.has("Docente")) {
            html += /* html */
              `<li class="nav-item active">
                    <a class="nav-link" href="chat.html" class="text-light">Chat</a>
                </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has(
            "Administrador")) {
            html += /* html */
              `<li class="nav-item active">
                    <a class="nav-link" href="docentes.html" class="text-light">Docentes</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="usuarios.html" class="text-light">Usuarios</a>
                </li>`;
          }
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define(
  "nav", nav);
