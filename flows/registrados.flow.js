import bot from "@bot-whatsapp/bot";
import pasosSeguirFlow from "./pasosSeguir.flow.js";
import realizarPedidoFlow from "./realizarPedido.flow.js";
import humanoFlow from "./humano.flow.js";

const regex = '/^9$/';
const timeoutDuration = 60000; // Duración en milisegundos para el tiempo de espera

const registradosFlow = bot
.addKeyword(regex, { regex: true })
.addAnswer('Por favor ingresa la *LETRA* correspondiente a la consulta:')
.addAnswer(
    [
        '*A*. Paso a paso de como hacer un pedido 📝',
        '*B*. Realizar un pedido 📦',
        '*C*. Hablar con alguien del equipo de Biogreen 👩🏻‍💻',
    ],
    {capture: true},
    async (ctx, {fallBack, endflow}) => {
        const timeout = setTimeout(() => {
            endflow(); // termina flujo por inactividad
        }, timeoutDuration);

        if(!['A','B','C', 'a', 'b', 'c'].includes(ctx.body)){
            return fallBack('Por favor selecciona una de las opciones de la Lista');
        }

        //Reinicia temporizador si hay interaccion del usuario
        ctx.on ('message', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                endflow(); // termina flujo por inactividad
            }, timeoutDuration);
        });
    },
    [pasosSeguirFlow, realizarPedidoFlow, humanoFlow]
)

export default registradosFlow;