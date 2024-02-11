import bot from "@bot-whatsapp/bot";
import GoogleSheetService from "../services/sheets/index.js";
import menuFlow from './menu.flow.js';

import { regexDNI, validarDNI, regexFechaNacimiento, regexEmail } from '../tools/validaciones.js';

const googleSheet = new GoogleSheetService(
    "1XC3cVejROpmkfV6IHlqPgmxv7ddBizDQHqXZEwah94w"
  );

const registroFlow = bot
    .addKeyword(['8', 'ingresar', 'INGRESAR', 'Ingresar'], { sensitive: true })
    .addAnswer([
        'Gracias por querer *SUMARTE* a Biogreen!',
        'Te dejamos unas simples preguntas para poder registrarte. Podés cancelar el registro en cualquier momento escribiendo *CANCELAR*'
    ])
    .addAnswer('1. Nombre y Apellido', { capture: true }, async (ctx, { flowDynamic, state, endFlow, gotoFlow }) => {

      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{
        const nombreApellido = ctx.body;
        state.update({ nombreApellido });
        await flowDynamic('¡Gracias! Ahora necesito tu DNI. Sin puntos (.) separadores');
      }})

/*     .addAnswer('2. DNI', { capture: true }, async (ctx, { flowDynamic, state, endFlow }) => {

      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{
        const dni = ctx.body;
        state.update({ dni });
        await flowDynamic('¡Perfecto! Ahora necesito tu fecha de nacimiento.');
      }}) */

      .addAnswer('2. DNI', { capture: true }, async (ctx, { flowDynamic, state, endFlow, fallBack }) => {

        if (ctx.body.toLowerCase() === "cancelar") {
          await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
        } else {
          const dni = ctx.body;
      
          // Validar el formato del DNI
          if (!regexDNI.test(dni)) {
            await fallBack ('El formato del DNI no es válido. Por favor, ingresa un DNI válido.');
          } else {
            state.update({ dni });
            await flowDynamic('¡Perfecto! Ahora necesito tu fecha de nacimiento.');
          }
        }
      })

    .addAnswer('3. Fecha de Nacimiento. Formato de ejemplo: DD/MM/AAAA', { capture: true }, async (ctx, { flowDynamic, state, endFlow, fallBack }) => {

      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{

        const fechaNacimiento = ctx.body;

        // Validar el formato del DNI
        if (!regexFechaNacimiento.test(fechaNacimiento)) {
          await fallBack ('El formato de la fecha no es válido. Por favor, ingresa una fecha de nacimiento válida.');
        } else { 
        state.update({ fechaNacimiento });
        await flowDynamic('¡Excelente! Ahora necesito tu domicilio.');
        }
      }})

    .addAnswer('4. Domicilio:', { capture: true }, async (ctx, { flowDynamic, state, endFlow }) => {

      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{
        const domicilio = ctx.body;
        state.update({ domicilio });
        await flowDynamic('¡Genial! Ahora necesito tu localidad.');
      }})

    .addAnswer('5. Localidad', { capture: true }, async (ctx, { flowDynamic, state, endFlow }) => {
      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{
        const localidad = ctx.body;
        state.update({ localidad });
        await flowDynamic('¡Perfecto! Ahora necesito tu provincia.');
      }})

    .addAnswer('6. Provincia:', { capture: true }, async (ctx, { flowDynamic, state, endFlow }) => {
      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{
        const provincia = ctx.body;
        state.update({ provincia });
        await flowDynamic('¡Muy bien! Por último, necesito tu código postal.');
      }})

    .addAnswer('7. Código Postal:', { capture: true }, async (ctx, { flowDynamic, state, endFlow }) => {

      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');
      } else{
        const codigoPostal = ctx.body;
        state.update({ codigoPostal });
        await flowDynamic('¡Casi terminamos! Por favor, proporciona tu dirección de correo electrónico.');
      }})

    .addAnswer('8. Email:', { capture: true }, async (ctx, { flowDynamic, state, endFlow, fallBack, gotoFlow }) => {

      if(ctx.body.toLowerCase() === "cancelar"){
        await endFlow('¡Has cancelado el registro de Vendedores! Escribe *MENÚ* para volver a ver el menú principal. De lo contrario que tengas un BUEN DÍA.');

      } else{

        const email = ctx.body;
        const numeroTelefono = ctx.from;

        if(!regexEmail.test(email)) {
          await fallBack ('El formato del email no es correcto. Por favor, ingresa un email válido.');
        } else { 
          state.update({ email, numeroTelefono });

                  // Guardar los datos en la base de datos
    
        const datosUsuario = state.getMyState();
        /*  console.log(datosUsuario); */
     
         // Código para guardar los datos en la base de datos
         await googleSheet.saveUser({
             fecha: new Date().toDateString(),
             nombreApellido: datosUsuario.nombreApellido,
             dni: datosUsuario.dni,
             domicilio: datosUsuario.domicilio,
             localidad: datosUsuario.localidad,
             provincia: datosUsuario.provincia,
             codigoPostal: datosUsuario.codigoPostal,
             email: datosUsuario.email,
             numeroTelefono: ctx.from
           });
     
         
         await flowDynamic('¡Registro completado! Tus datos han sido guardados en nuestra base de datos.');
     
         // Redirigir al flujo de usuarios registrados
         await gotoFlow(pasosSeguir);
 
         /* Dentro del FLUJO, Se les muestra PASOS A SEGUIR y se le envia Lista de Precio y Excel para pedidos. Debes poner el Codigo del producto y la cantidad. 
         Si queres comunicarte con alguien Humano del equipo de Biogreen. Escribe *HUMANO*
         */

          
        }
      }})

export default registroFlow