import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  // secure: false,
  // auth: {
  //   user: "maddison53@ethereal.email",
  //   pass: "jn7jnAPss4f63QBp6D",
  // },

    // service: "smtp.gmail.com",
    // port: 587,
    auth:{
      user: 'hasnainalam1166@gmail.com',
      pass: 'zdbw ppso feph dzww',
    }
});

export {transporter}