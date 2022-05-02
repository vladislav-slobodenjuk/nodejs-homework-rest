const Mailgen = require("mailgen");

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require("nodemailer");

const host = "http://localhost:3000";

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
          link: `http://localhost:3000/api/auth/verify/${verificationToken}`,
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
    // text: "Привет. Мы тестируем отправку писем!",
    html: template,
  };
  // return await sgMail.send(emailOptions);
};

const sendEmailByNodemailer = async (email, template) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "vladjun@meta.ua",
      pass: "7751391Vladjun",
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "vladjun@meta.ua",
    to: "vladjun@gmail.com",
    subject: "Nodemailer test",
    text: `, Отправитель: `,
  };

  return await transporter.sendMail(emailOptions);

  transporter
    .sendMail(emailOptions)
    .then((info) => res.render("done"))
    .catch((err) => console.error(err));
};

// sendEmailByNodemailer();

module.exports = {
  createEmailTemplate,
  sendEmailByNodemailer,
  sendEmailBySendGrid,
};
