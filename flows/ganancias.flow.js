import bot from "@bot-whatsapp/bot";
const regex = '/^3$/';

const gananciasFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer([
        'Las Ganancias son del *60% promedio* tomadas de tus Compras, o del *40% promedio de descuento* sobre el precio de venta al Público…(que de cualquier forma da la misma ganancia).',
        '',
        '*UNA CUENTA SENCILLA*:', 
        'Venta - Costo = Ganancia🤑'
    ])
        .addAnswer(
            [
                'Escribe el *número* de la consulta si la recordás',
                'Escribe *MENÚ* para volver al Menú Principal'
            ],
            {capture: true},
            async (ctx, {fallBack}) => {
                if(!['1','2','3','4','5','6','7','8','menu','menú','Menu','Menú'].includes(ctx.body)){
                return fallBack('Por favor escribe el *número* de las opciones de la Lista o escribe *Menú* para volver al Menú Principal');
                }
            }
    )

export default gananciasFlow