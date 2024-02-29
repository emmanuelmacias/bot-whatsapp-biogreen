import bot from "@bot-whatsapp/bot";
import pasosSeguirFlow from "./pasosSeguir.flow.js";
import realizarPedidoFlow from "./realizarPedido.flow.js";
import humanoFlow from "./humano.flow.js";

const regex = '/^9$/';

const flujoFinal = bot
.addKeyword(bot.EVENTS.ACTION)
.addAnswer('Note inactividad en el chat, cuando quieras podés volver a comunicarte. Muchas gracias!');

const registradosFlow = bot
.addKeyword(regex, { regex: true })
.addAnswer('Por favor ingresa la *LETRA* correspondiente a la consulta:')
.addAnswer(
    [
        '*A*. Paso a paso de como hacer un pedido 📝',
        '*B*. Realizar un pedido 📦',
        '*C*. Hablar con alguien del equipo de Biogreen 👩🏻‍💻',
    ],
    {capture: true, idle: 5000},
    async (ctx, {fallBack, gotoFlow, inRef}) => {

        if (ctx?.idleFallBack) {
            return gotoFlow(flujoFinal);
        }

        if(!['A','B','C', 'a', 'b', 'c'].includes(ctx.body)){
            return fallBack('Por favor selecciona una de las opciones de la Lista');
        }
    },
    [pasosSeguirFlow, realizarPedidoFlow, humanoFlow]
)

export default registradosFlow;