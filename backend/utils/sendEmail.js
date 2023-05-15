const nodemailer = require("nodemailer");

module.exports = async (email, subject, url) => {
  try {
    const message = `<p>Click this link to verify: <a href='${url}'>${url}</a></p>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "pandu.mar23@gmail.com",
        pass: "naioawkixtogcpbc",
      },
    });

    await transporter.sendMail({
      from: "noreply.photogram@gmail.com",
      to: email,
      subject: subject,
      html: message,
    });
    console.log("Email is sent successfully");
  } catch (error) {
    console.log("Email is not sent");
    console.log(error);
  }
};
