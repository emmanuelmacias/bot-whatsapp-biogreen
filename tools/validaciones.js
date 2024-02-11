// validaciones.js

// Expresión regular para validar un DNI argentino
export const regexDNI = /^[0-9]{7,8}$/;

// Expresión regular para validar fecha. Formato: DD/MM/AAAA
export const regexFechaNacimiento = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

// Expresión regular para validar Email
export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para validar un DNI argentino
export function validarDNI(dni) {
  if (!regexDNI.test(dni)) {
    return false;
  }

  const dniDigits = dni.substring(0, dni.length - 1);
  const verificador = dni.charAt(dni.length - 1);
  const calculatedVerificador = dniDigits % 23;

  return verificador === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(calculatedVerificador);
}

