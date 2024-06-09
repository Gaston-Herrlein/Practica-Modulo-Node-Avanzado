"use strict";
const publisherConfig = require("./publisherConfig.js");
const { Article } = require("../../models");

require("dotenv").config();

const EXCHANGE_NAME = "Article-task";

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  const type = "email";

  const { channel, connection } = await publisherConfig();

  await channel.assertExchange(EXCHANGE_NAME, "direct", {
    //Para las pruebas mismo criterio y configuracion que publisher
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  canal.bindQueue(q.queue, EXCHANGE_NAME, type);

  canal.consume(q.queue, async (msg) => {
    const payload = msg.content;
    const { type, content } = JSON.parse(payload);
    //Vuelvo a comprobar el tipo anes de realizar la tarea asignada
    if (type === "email") {
      await Article.enviarEmail(content);
      canal.ack(msg);
    }
  });
}
