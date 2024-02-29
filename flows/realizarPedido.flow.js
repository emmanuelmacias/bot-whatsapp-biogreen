import bot from "@bot-whatsapp/bot";
import registroFlow from "./registro.flow.js";
import menuFlow from "./menu.flow.js";

const regex = '/^B$/i';

const realizarPedidoFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer('¡Estas en la zona para realizar pedidos!') 
    .addAnswer('Enviame el archivo de Excel con tu pedido, una vez enviado, nos pondremos en contacto con vos para coordinar la entrega.')
    .addAction({capture: true}, async (ctx, {flowDynamic}) => {
        const respuesta = ctx.body;
        return flowDynamic("Tu pedido ya fue enviado al equipo de *Biogreen*. Nos pondremos en contacto con vos. ¡Gracias!");
    });

export default realizarPedidoFlow;