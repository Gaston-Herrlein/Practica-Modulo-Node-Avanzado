const publisherConfig = require("./publisherConfig.js");

const EXCHANGE_NAME = "Article-task";

module.exports = async function publisherResize(name) {
  //I create the connection to RabbitMQ
  const { channel, connection } = await publisherConfig();

  let keepSending;

  let msg = {
    type: "resize",
    content: name,
  };

  keepSending = channel.publish(
    EXCHANGE_NAME,
    msg.type,
    Buffer.from(JSON.stringify(msg))
  );

  //If the channel is overflowing, we wait until we can send tasks again, and call the function recursively
  if (!keepSending) {
    await new Promise((resolve) => channel.on("drain", resolve));
    publisherResize(name);
  }

  setTimeout(() => {
    connection.close();
  }, 100);
};
