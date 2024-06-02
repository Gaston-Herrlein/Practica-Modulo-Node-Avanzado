const nodemailer = require("nodemailer");

module.exports = async function () {
  const testAccount = await nodemailer.createTestAccount();

  const developmentOptions = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };

  /** Dejo el bloque comentado ya que para el ejercicio, no hace falta la configuracion de nodemailer para produccion
   *
    const productionOptions = {
    service: process.env.EMAIL_SERVICE_NAME,
        auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
        },
    };

    const transport = nodemailer.createTransport(
        process.env.NODEAPP_ENV === "development"
        ? developmentOptions
        : productionOptions
    );
   */

  const transport = nodemailer.createTransport(developmentOptions);
  return transport;
};
