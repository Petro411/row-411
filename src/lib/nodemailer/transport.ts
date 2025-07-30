import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  // secure: false,
  // auth: {
  //   user: "maddison53@ethereal.email",
  //   pass: "jn7jnAPss4f63QBp6D",
  // },

    // service: "smtp.gmail.com",
    // port: 587,
    auth:{
      user: 'hertha.nicolas85@ethereal.email',
      pass: 'F9ZyewvXbJtyE9QtU6',
    }
});

export {transporter}