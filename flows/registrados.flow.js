import bot from "@bot-whatsapp/bot";
import pasosSeguirFlow from "./pasosSeguir.flow.js";
import realizarPedidoFlow from "./realizarPedido.flow.js";
import humanoFlow from "./humano.flow.js";
import catalogoFlow from "./catalogo.flow.js";

const regex = '/^9$/';

const registradosFlow = bot
.addKeyword(regex, { regex: true })
.addAnswer('Por favor ingresa la *LETRA* correspondiente a la consulta:')
.addAnswer(
    [
        '*A*. Paso a paso de como hacer un pedido 📝',
        '*B*. Realizar un pedido 📦',
        '*C*. Descargar catálogo de productos📗',
        '*D*. Hablar con alguien del equipo de Biogreen 👩🏻‍💻',
    ],
    {capture: true},
    async (ctx, {fallBack}) => {
        if(!['A','B','C', 'D', 'a', 'b', 'c', 'd'].includes(ctx.body)){
            return fallBack('Por favor selecciona una de las opciones de la Lista');
        }
    },
    [pasosSeguirFlow, realizarPedidoFlow, catalogoFlow, humanoFlow]
)

export default registradosFlow;