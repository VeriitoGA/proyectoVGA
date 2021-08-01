import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraDocentes
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoDocente =
  getFirestore().
    collection("Docente");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const nafilacion = getString(
        formData, "nafilacion").trim();  
    const nombre = getString(formData, "nombre").trim();
    const materia = getString(formData, "materia").trim();
    const turno = getString(formData, "turno").trim();
    const fechaalta = getString(formData, "fechaalta").trim();
    /**
     * @type {
        import("./tipos.js").
                Docente} */
    const modelo = {
      nafilacion,
      nombre,
      materia,
      turno,
      fechaalta 
    };
    await daoDocente.
      add(modelo);
    muestraDocentes();
  } catch (e) {
    muestraError(e);
  }
}
