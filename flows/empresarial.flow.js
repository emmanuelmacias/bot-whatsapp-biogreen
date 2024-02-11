import bot from "@bot-whatsapp/bot";
const regex = '/^7$/';

const empresarialFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer([
        '*PODÉS CRECER LABORALMENTE:*',
        '',
        'Vas a formar tu  Propio  Equipo  de  Ventas 🫂💪',
        'Cobrarás comisiones desde el 8% hasta un 40% sobre las Compras de tu Equipo según el *NIVEL DE PATROCINIO* en que te encuentres. Esta ganancia es aparte de tus *VENTAS PERSONALES* 💰',
        'Tendrás *capacitaciones* donde podrás participar de las mismas en Salas Virtuales en vivo 💻 o podrás verlas grabadas en tu tiempos libres 🏖️' ,
        'Contarás con todo nuestro apoyo y ayuda para que puedas alcanzar tus *Metas* y Cumplir tus *Sueños* tanto a Nivel Personal como de Equipo.'
    ])
    .addAnswer(
        'Esperamos tu respuesta y que te sumes a nuestra empresa, gracias por elegirnos 💚'
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

export default empresarialFlow;