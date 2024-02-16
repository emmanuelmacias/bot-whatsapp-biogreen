import bot from "@bot-whatsapp/bot";

import biogreenFlow from './biogreen.flow.js';
import ingresoFlow from './ingreso.flow.js';
import gananciasFlow from './ganancias.flow.js';
import pagosFlow from './pagos.flow.js';
import enviosFlow from './envios.flow.js';
import pedidosFlow from './pedidos.flow.js';
import empresarialFlow from './empresarial.flow.js';
import registroFlow from './registro.flow.js';
import registradosFlow from "./registrados.flow.js";

const menuFlow = bot
    .addKeyword(['menu', 'menú'])
    .addAnswer('Por favor ingresa el *número* correspondiente a la consulta:')
    .addAnswer(
        [
            '*1* ¿Qué es Biogreen? 💚',
            '*2* ¿Cómo ingreso en Biogreen? ✔️',
            '*3* ¿Cuales son las ganancias? 💲',
            '*4* ¿Cómo se Paga? 💵',
            '*5* Sobre los envíos de los pedidos 🚚📦',
            '*6* ¿Cada cuanto tiempo puedo pasar pedidos? 📝',
            '*7* Crecimiento Empresarial 📈',
            '*8* ¿Querés ingresar como Vendedor/a? 💪🏼',
            '*9* ¿Ya estas ingresado/a? 📂'

        ],
        {capture: true},
        async (ctx, {fallBack}) => {
            if(!['1','2','3','4','5','6','7','8','9'].includes(ctx.body)){
                return fallBack('Por favor selecciona una de las opciones de la Lista');
            }
        },
        [biogreenFlow, ingresoFlow, gananciasFlow, pagosFlow, enviosFlow, pedidosFlow, empresarialFlow, registroFlow, registradosFlow]
)

export default menuFlow;