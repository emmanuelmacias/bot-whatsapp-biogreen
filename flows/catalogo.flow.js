import bot from "@bot-whatsapp/bot";
import registroFlow from "./registro.flow.js";
import menuFlow from "./menu.flow.js";

const regex = '/^C$/i';

const catalogoFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer('Este es el último *Catálogo de Productos Biogreen* 💚', 
      {
        media:'./archivos/Biogreen_marzo24_arg_Ventas.pdf',
      })
    .addAnswer('Estoy para lo que necesites, cualquier consulta me podés volver a escribir. Saludos! 👋🏻');

export default catalogoFlow;



 