import bot from "@bot-whatsapp/bot";
import menuFlow from './menu.flow.js';
import GoogleSheetService from "../services/sheets/index.js";

const googleSheet = new GoogleSheetService(
    "1XC3cVejROpmkfV6IHlqPgmxv7ddBizDQHqXZEwah94w"
  );

  const regex = '/^A$/';

  const pasosSeguirFlow = bot
    .addKeyword(regex, { regex: true })
    .addAnswer('Ya estamos con tu ingreso a *Biogreen*')
    .addAnswer([
        'El  mismo  te  habilitará como *Distribuidor/a Oficial de Biogreen* y así obtener:',
        '',
        '👉 *Participación en los Eventos*', 
        '👉 *Capacitaciones y Fiestas que realice biogreen en cualquier parte del País*', 
        '👉 *Beneficios de descuentos especiales*', 
        '👉 *Promociones*',
        '👉 *Premios por cierres de ciclos de Ventas*'])

    .addAnswer([
      '*IMPORTANTE:*',
      'La Planilla de Excel que te voy a enviar a continuación es para pasar tu pedido y así fidelizarte como *Distribuidor/a Oficial.*',
      '',
      '*Tu Compra Mínima deberá ser de $20.000, Tanto sea con:*',
      '👉 1 Catálogo y/o Productos',
      '👉 1 Kit de trabajo.',
      '👉 o todo lo anterior.',
      'Asi luego tendrás tu propia plataforma de pedidos y capacitaciones al respecto.'
    ])
    .addAnswer('Te envío el Excel de Pedidos, debes poner el código del producto y la cantidad deseada.', 
      {
        media:'./archivos/PEDIDOS_BIOGREEN_2023.xlsx',
      })
    .addAnswer('Guardarlo y cuando me vuelvas a escribir te saldrá la opcion para *Realizar un pedido*, sino solo escribe *PEDIDO* en cualquier momento y saldrá la opción.')
    .addAnswer([
      'LUEGO, elegiremos la forma del ENVÍO, que puede ser por el Correo Argentino, Correo Andreani, Micro, o Comisionista.',
      'Y Recordarte que por tus compras IGUALES o MAYORES a $85.000 tendrás *EL GASTO del ENVIO* reintegrado con productos, para que al venderlos *RECUPERES EL 100% DE ESE GASTO.*'
    ])
    .addAnswer('Muchas Gracias por sumarte a la familia *Biogreen* 💚. Estamos en contacto!')
    
export default pasosSeguirFlow;