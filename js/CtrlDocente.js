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
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoDocente.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Docente} */
      const data = doc.data();
      forma.nafilacion.value = data.nafilacion;
      forma.nombre.value = data.nombre || "";
      forma.materia.value = data.materia || "";
      forma.turno.value = data.turno || "";
      forma.fechaalta.value = data.fechaalta || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraDocentes();
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
      doc(id).
      set(modelo);
    muestraDocentes();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoDocente.
        doc(id).
        delete();
      muestraDocentes();
    }
  } catch (e) {
    muestraError(e);
  }
}
