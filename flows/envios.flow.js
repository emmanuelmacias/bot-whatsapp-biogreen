import bot from "@bot-whatsapp/bot";
const regex = '/^5$/';

const enviosFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer('Enviamos por el Correo Argentino o Andreani 📦 y en algunos casos por Comisionista 🚛 o Micros 🚌. Te enviaremos un número de seguimiento correspondiente a tu pedido.')
    .addAnswer(
    'Por tus compras de *200 PUNTOS* o más, o el equivalente a *$96.000*, sin la Suma de algunos Accesorios de ventas (que no suman puntos), el gasto del Envío o Flete es *REINTEGRADO* con Productos para que al venderlos, recuperes dicho gasto.')
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

export default enviosFlow