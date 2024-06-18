require("dotenv").config();

const amqp = require("amqplib");
const EXCHANGE_NAME = "Article-task";

module.exports = async function publisherConfig() {
  const connection = await amqp.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, "direct", {
    durable: false,
  });

  return { channel, connection };
};
