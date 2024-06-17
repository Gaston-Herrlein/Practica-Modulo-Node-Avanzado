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

  const transport = nodemailer.createTransport(developmentOptions);
  return transport;
};
