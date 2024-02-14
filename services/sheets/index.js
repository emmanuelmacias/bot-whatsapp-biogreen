import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

class GoogleSheetService {
  jwtFromEnv = undefined;
  doc = undefined;

  constructor(id = undefined) {
    if (!id) {
      throw new Error("ID_UNDEFINED");
    }

    this.jwtFromEnv = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });

    this.doc = new GoogleSpreadsheet(id, this.jwtFromEnv);
  }

 /**
   * Recuperar cliente
   * @param {*} telefono
   * @returns
   */
  consultarDatos = async (telefono) => {

    try {
      await this.doc.loadInfo();

      const sheet = this.doc.sheetsByIndex[0];
  
  
      let rows = await sheet.getRows();
      
      let consultados = {
        'Nombre': '',
        'Email': ''
      };

      const row = rows.find(row => row._rawData[8] === telefono);

      if (row) {
        consultados['Nombre'] = row._rawData[1]; // Nombre en la posición 1
        consultados['Email'] = row._rawData[7]; // Email en la posición 7
      } else {
        return false; // Retorna false si no se encuentra el número de teléfono
      }

      return consultados;

    } catch (error) {
      console.log(error)
    }
};
           

  /**
   * Guardar pedido
   * @param {*} data
   */
  saveUser = async (data = {}) => {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[0]; // the first sheet
    /* console.log(sheet); */

    const user = {
      fecha: data.fecha,
      apellido: data.apellido,
      nombre: data.nombre,
      dni: data.dni,
      domicilio: data.domicilio,
      localidad: data.localidad,
      provincia: data.provincia,
      codigoPostal: data.codigoPostal,
      email: data.email,
      numeroTelefono: data.numeroTelefono
    };
    /* console.log(user); */
    await sheet.addRow(user);

    return user
  };
}

export default GoogleSheetService;