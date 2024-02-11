import bot from "@bot-whatsapp/bot";
const regex = '/^6$/';

const pedidosFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer([
        'Los podes pasar cuando lo creas conveniente, considerando el ÍTEM anterior, que por tus compras *Iguales o Mayores* a $51.000 te reintegramos el Gasto del Envió.',
        'Y aunque podes hacer *Pedidos MENORES* al dicho importe *NO se reintegra* el gasto del envío.'
    ])  
    .addAnswer(
        'Cada 21 días hay *CIERRES DE CICLOS*, pero no significa que tengas que esperar ese día para pasar tus pedidos, Los *PEDIDOS* 🧾los podés pasar en cualquier momento; los cierres son para estadísticas de Compras que de acuerdo a las mismas hay *PREMIOS* 🎁 u *OFERTAS* 🏷️ según las mismas, que se informan ciclo a ciclo.'
    )
    .addAnswer(
        'Biogreen lanza *6 Catálogos al año*, presentando sus productos con el precio al público impreso en el mismo, sin aumentarlos por el lapso de *3 Ciclos o 60 días.*',
        'Luego se lanza un *Nuevo Catálogo, Nuevos Productos y Ajustes de Precios.*'
    )
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

export default pedidosFlow