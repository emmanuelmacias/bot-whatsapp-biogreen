import bot from "@bot-whatsapp/bot";
const regex = '/^4$/';

const pagosFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer([
        'Las Compras son de *Contado*.', 
        'Se paga por *Deposito o Transferencia Bancaria* home banking, o a través de *Mercado Pago.*'
    ])
    .addAnswer([
        'El pedido será enviado una vez corroborado el pago del mismo.', 
    ])
    .addAnswer(
        [
            'Escribe el *número* de la consulta si la recordás',
            'Escribe *MENÚ* para volver al Menú Principal'
        ],
        {capture: true},
        async (ctx, {fallBack}) => {
            if(!['1','2','3','4','5','6','7','8','menu','menú'].includes(ctx.body)){
            return fallBack('Por favor escribe el *número* de las opciones de la Lista o escribe *Menú* para volver al Menú Principal');
            }
        }
)

export default pagosFlow