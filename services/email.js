const Mailgen = require("mailgen");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const nodemailer = require("nodemailer");

const host = "https://node-mail-taraining.herokuapp.com";

const createEmailTemplate = (username, verificationToken) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Node email homework",
      link: host,
    },
  });

  const email = {
    body: {
      name: username,
      intro: "Welcome to Node email homework! I'm very excited to intoduce it.",
      action: {
        instructions: "To get started with Mailgen, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `${host}/api/auth/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  return mailGenerator.generate(email);
};

const sendEmailBySendGrid = async (email, template) => {
  const emailOptions = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: "Have a look at Node email homework",
    text: "Привет. Мы тестируем отправку писем!",
    html: template,
  };
  return await sgMail.send(emailOptions);
};

const sendEmailByNodemailer = async (email, template) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_NODEMAILER,
      pass: process.env.PASSWORD_NODEMAILER,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: process.env.USER_NODEMAILER,
    to: email,
    subject: "Nodemailer test",
    text: template,
  };
  return await transporter.sendMail(emailOptions);
};

module.exports = {
  createEmailTemplate,
  sendEmailByNodemailer,
  sendEmailBySendGrid,
};
