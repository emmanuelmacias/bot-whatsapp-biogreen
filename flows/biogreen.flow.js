import bot from "@bot-whatsapp/bot";
const regex = '/^1$/';

const biogreenFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer([
        '*¿Qué es Biogreen?* 💚',
        '',
        'Ofrecemos productos para aromatizar los ambientes. 100% ecológicos ♻️. Aromatizantes, Esencias, Fragancias y más.',
        '',
        'Podés convertirte en Vendedor/a, generar Ingresos extras en tu tiempo libre y liderar tu propio Equipo de Ventas.', 
        '',
        'Obtené Excelentes Ganancias del 60% 💵 en tu tiempo libre y Premios extra. ¡Vos elegís cuánto tiempo dedicar!.', 
        '',
        'Formá parte de una Empresa Líder. Para ambos sexos, sin límite de edad y en todo el País.' 
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

export default biogreenFlow;