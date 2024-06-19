const publisherConfig = require("../../config/publisherConfig.js");
const emailFormatter = require("../../lib/emailFormatter.js");

const EXCHANGE_NAME = "Article-task";

module.exports = async function publisherEmail(name) {
  const { channel, connection } = publisherConfig();

  let keepSending;

  let msg = {
    type: "email",
    content: emailFormatter(name),
  };

  keepSending = channel.publish(
    EXCHANGE_NAME,
    msg.type,
    Buffer.from(JSON.stringify(msg))
  );

  //If the channel is overflowing, we wait until we can send tasks again, and call the function recursively
  if (!keepSending) {
    await new Promise((resolve) => channel.on("drain", resolve));
    publisherEmail(name);
  }

  setTimeout(() => {
    connection.close();
  }, 100);
};
