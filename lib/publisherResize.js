const publisherConfig = require("./publisherConfig.js");

const EXCHANGE_NAME = "Article-task";

module.exports = async function publisherResize(name) {
  //Creo la coneccion a RabbitMQ
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

  //Si el canal esta desbordado, esperamos a poder enviar nuevamente tareas, y llamamos a la funcion de forma recursiva
  if (!keepSending) {
    await new Promise((resolve) => channel.on("drain", resolve));
    publisherResize(name);
  }

  //pasado 100ms desconecto la conexion a RabitMQ
  setTimeout(() => {
    connection.close();
  }, 100);
};
