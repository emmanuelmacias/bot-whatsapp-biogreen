import bot from "@bot-whatsapp/bot";
import registroFlow from "./registro.flow.js";
import menuFlow from "./menu.flow.js";

const regex = ['/^B$/', 'PEDIDO', 'Pedido', 'pedido'];

const realizarPedidoFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer('¡Estas en la zona para realizar pedidos!') 
    .addAnswer('Enviame el archivo de Excel con tu pedido, una vez enviado, nos pondremos en contactocon vos para coordinar la entrega.')

export default realizarPedidoFlow;