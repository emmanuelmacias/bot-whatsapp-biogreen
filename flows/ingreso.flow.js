import bot from "@bot-whatsapp/bot";
import registroFlow from "./registro.flow.js";
import menuFlow from "./menu.flow.js";

const regex = '/^2$/';

const ingresoFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer([
        'Podes ingresar adquiriendo algunos de los *Kit de trabajo* o *Muestrarios de Fragancias* para hacer las demostraciones olfativas a tus futuros clientes. Como así también el *Catálogo de productos.*'])  
    .addAnswer(
        'Estas herramientas _tienen un costo_ pero *TE REGALAMOS PRODUCTOS* para que al venderlos recuperes dicha INVERSIÓN y así obtendrás un *COSTO FINAL DE CERO PESOS*🤩')
    .addAnswer(
       '*OTRA OPCIÓN DE INGRESO:* Podés ingresar comprando solamente los productos a Precio *MAYORISTA* y obtener una *ganancia inmediata*. Luego podrás agregar los Muestrarios que desees.')
    .addAnswer(
    [
        'Si querés ingresar escrbí *INGRESAR*',
        'Podés escribir el *número* de la consulta si la recordás o escribe *MENÚ* para volver al Menú Principal'
    ],
    {capture: true},
    async (ctx, {fallBack}) => {
        if(!['1','2','3','4','5','6','7','8','ingresar','INGRESAR','Ingresar','menu','menú'].includes(ctx.body)){
        return fallBack('Por favor escribe el *número* de las opciones de la Lista o escribe *Menú* para volver al Menú Principal');
        }
    }, [registroFlow]
)

export default ingresoFlow;