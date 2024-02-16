import bot from "@bot-whatsapp/bot";
import menuFlow from './menu.flow.js';
import GoogleSheetService from "../services/sheets/index.js";
import pasosSeguirFlow from "./pasosSeguir.flow.js";
import realizarPedidoFlow from "./realizarPedido.flow.js";
import humanoFlow from "./humano.flow.js";

const googleSheet = new GoogleSheetService(
    "1XC3cVejROpmkfV6IHlqPgmxv7ddBizDQHqXZEwah94w"
  );


const flujoUsuariosRegistrados = bot
.addKeyword('##_USER_REGISTERED_##')
.addAnswer('Por favor ingresa el *número* correspondiente a la consulta:')
.addAnswer(
    [
        '*A*. Paso a paso de como hacer un pedido 📝',
        '*B*. Realizar un pedido 📦',
        '*C*. Hablar con alguien del equipo de Biogreen 👩🏻‍💻',
    ],
    {capture: true},
    async (ctx, {fallBack}) => {
        if(!['/^A$/','/^B$/','/^C$/'].includes(ctx.body)){
            return fallBack('Por favor selecciona una de las opciones de la Lista');
        }
    },
    [pasosSeguirFlow, realizarPedidoFlow, humanoFlow]
)

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

export default bienvenidaFlow;