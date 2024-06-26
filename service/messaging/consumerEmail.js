"use strict";
const publisherConfig = require("../../config/publisherConfig.js");
const { Article } = require("../../models");

require("dotenv").config();

const EXCHANGE_NAME = "Article-task";

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  const type = "email";

  const { channel, connection } = await publisherConfig();

  await channel.assertExchange(EXCHANGE_NAME, "direct", {
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  canal.bindQueue(q.queue, EXCHANGE_NAME, type);

  canal.consume(q.queue, async (msg) => {
    const payload = msg.content;
    const { type, content } = JSON.parse(payload);

    if (type === "email") {
      await Article.enviarEmail(content);
      canal.ack(msg);
    }
  });
}
