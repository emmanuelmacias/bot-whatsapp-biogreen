import bot from "@bot-whatsapp/bot";
import menuFlow from './menu.flow.js';
import GoogleSheetService from "../services/sheets/index.js";
import pasosSeguirFlow from "./pasosSeguir.flow.js";
const googleSheet = new GoogleSheetService(
    "1XC3cVejROpmkfV6IHlqPgmxv7ddBizDQHqXZEwah94w"
  );
  

const flujoUsuariosRegistrados = bot
.addKeyword('##_USER_REGISTERED_##')
.addAnswer('Dejame tu consulta y alguien del equipo de *Biogreen* te responderá a la brevedad 🦾')   
.addAnswer('Sino escribe *MENÚ* para mostrarte las opciones disponibles que ya conoces', null, null, [menuFlow, pasosSeguirFlow])

const flujoUsuariosNORegistrados = bot
.addKeyword('##_USER_NO_REGISTERED_##')
.addAnswer([
    '*Veo que no estas registrado como vendedor*, ¡no te preocupes!',
    'Soy Jade. Soy un *Bot* 🤖 y estoy para ayudarte en lo que necesites.', 
])
.addAnswer('Escribe *MENÚ* para mostrarte las opciones disponibles', null, null, [menuFlow])

const bienvenidaFlow = bot
    /* .addKeyword(bot.EVENTS.WELCOME) */
    .addKeyword('chingolo')
    .addAnswer('¡Hola👋🏼! Bienvenido a *Biogreen* 💚')
    .addAnswer('Estoy revisando si estas registrado/a ⌛...', null, async (ctx, {flowDynamic, gotoFlow, state }) => {

            const numeroTelefono = ctx.from;
            const consultados = await googleSheet.consultarDatos(numeroTelefono);

            console.log(consultados);

            if(consultados === false){
                gotoFlow(flujoUsuariosNORegistrados)
            }else{
                await flowDynamic(`Bienvenido de nuevo *${consultados.Nombre}*`)
                await state.update({ name: consultados.Nombre})
                gotoFlow(flujoUsuariosRegistrados)
            }

        });


/*     const bienvenidaFlow = bot
    .addKeyword(bot.EVENTS.WELCOME)
    .addAnswer([
        '¡Hola👋🏼! Bienvenido a *Biogreen* 💚',
        'Soy Jade. Soy un *Bot* y estoy para ayudarte en lo que necesites.', 
    ])
    .addAnswer('Escribe *MENÚ* para mostrarte las opciones disponibles', null, null, [menuFlow]) */

export default bienvenidaFlow;