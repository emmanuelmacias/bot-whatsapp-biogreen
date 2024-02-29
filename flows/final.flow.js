import bot from "@bot-whatsapp/bot";


const flujoFinal = bot
.addKeyword(bot.EVENTS.ACTION)
.addAnswer('Note inactividad en el chat, cuando quieras podés volver a comunicarte. Muchas gracias!');


export default flujoFinal;