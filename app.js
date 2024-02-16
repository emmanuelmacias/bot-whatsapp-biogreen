 import "dotenv/config";
import bot from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";

import bienvenidaFlow from './flows/bienvenida.flow.js';
import menuFlow from './flows/menu.flow.js';
import biogreenFlow from './flows/biogreen.flow.js';
import gananciasFlow from './flows/ganancias.flow.js';
import pagosFlow from './flows/pagos.flow.js';
import enviosFlow from "./flows/envios.flow.js";
import pedidosFlow from './flows/pedidos.flow.js';
import empresarialFlow from './flows/empresarial.flow.js';
import registroFlow from './flows/registro.flow.js';
import pasosSeguirFlow from "./flows/pasosSeguir.flow.js";
import humanoFlow from "./flows/humano.flow.js";
import realizarPedidoFlow from "./flows/realizarPedido.flow.js";

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = bot.createFlow([
        bienvenidaFlow, 
        menuFlow, 
        biogreenFlow, 
        gananciasFlow, 
        pagosFlow, 
        enviosFlow, 
        pedidosFlow, 
        pedidosFlow, 
        empresarialFlow,
        registroFlow,
        pasosSeguirFlow,
        realizarPedidoFlow,
        humanoFlow])
    const adapterProvider = bot.createProvider(BaileysProvider)

    bot.createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
