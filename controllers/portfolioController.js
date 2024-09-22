const nodemailer = require("nodemailer");
const mailjetTransport = require("nodemailer-mailjet-transport");

//transport
// const transporter = nodemailer.createTransport(
//   mailjet.MailjetTransport()
// )

const transporter = nodemailer.createTransport(
  mailjetTransport({
    auth: {
      apiKey: process.env.API_MAILJET,
      apiSecret: process.env.API_MAILJET_SECRET,
    },
  })
);
// const mail = {
//   from: "john.doe@example.org",
//   to: "jane.doe@example.org",
//   subject: "Hello",
//   text: "Hello",
//   html: "<h1>Hello</h1>",
// };

//Send Email Controller

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //email matter
    transporter.sendMail({
      from: "gunajee025@gmail.com",
      to: "gunajee1222@gmail.com",
      subject: "Regarding Mern Portfolio APP",
      // text: "Hello",
      html: `
      <h5> Detail Information</h5>
      <ul>
      <li><p>Name : ${name}</p></li>
      <li><p>Email ID : ${email}</p></li>
      <li><p>Message : ${msg}</p></li>
      </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
