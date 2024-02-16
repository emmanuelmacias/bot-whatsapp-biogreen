import bot from "@bot-whatsapp/bot";

const regex = '/^9$/'

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
    async (ctx, {fallBack}) => {
        if(!['A','B','C'].includes(ctx.body)){
            return fallBack('Por favor selecciona una de las opciones de la Lista');
        }
    },
    [pasosSeguirFlow, realizarPedidoFlow, humanoFlow]
)

export default registradosFlow;