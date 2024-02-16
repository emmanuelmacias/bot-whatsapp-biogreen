import bot from "@bot-whatsapp/bot";
import registroFlow from "./registro.flow.js";
import menuFlow from "./menu.flow.js";

const regex = '/^C$/i';

const humanoFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer('Dejame tu consulta por escrito o un audio y alguien del equipo de *Biogreen* te responderá a la brevedad 🦾') 

export default humanoFlow;



 