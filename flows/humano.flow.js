import bot from "@bot-whatsapp/bot";
import registroFlow from "./registro.flow.js";
import menuFlow from "./menu.flow.js";
import flujoFinal from "./final.flow.js";

const regex = '/^C$/i';

const humanoFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer(
        'Dejame tu consulta por escrito (todo en un solo mensaje) o un audio y alguien del equipo de *Biogreen* te responderá a la brevedad 🦾'/* ,
        {capture: true, idle: 300000},
        async (ctx, {gotoFlow}) => {
            if (ctx?.idleFallBack) {
                return gotoFlow(flujoFinal);
            }
        } */
    )

    .addAction({capture: true}, async (ctx, {flowDynamic}) => {
        const respuesta = ctx.body;
        return flowDynamic("Tu consulta ya fue enviada al equipo de *Biogreen*. Nos pondremos en contacto con vos. ¡Gracias!");
    });

export default humanoFlow;



 