const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  register: async (req, res) => {
    const { fullname, email, username, password, repeat_password } = req.body;

    // Check if all input fields are filled
    if (!fullname || !email || !username || !password || !repeat_password) {
      return res
        .status(400)
        .send({ message: "Please fill all required fields" });
    }

    // check if passwords match
    if (password !== repeat_password) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    // check if password meets the requirements
    if (
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\,./?'":;<>~`])(?!.*\s).{8,}$/
      )
    ) {
      return res.status(400).send({
        message:
          "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number",
      });
    }

    // Check if email already exists in the database
    try {
      const emailExist = await query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (emailExist.length > 0) {
        return res.status(400).send({ message: "Email already exists" });
      }

      // Check if username already exists in the database
      const usernameExist = await query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (usernameExist.length > 0) {
        return res.status(400).send({ message: "Username already exists" });
      }

      // Hash password before storing it in the database
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert user data into the database
      const result = await query(
        "INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)",
        [fullname, email, username, hashedPassword]
      );

      // Generate JWT token
      const token = jwt.sign({ id_user: result.id_user }, "secretkey");

      // Send success response with JWT token
      res.status(200).send({ token, message: "Register success" });

      // // create email transporter
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "your_email_address@gmail.com",
      //     pass: "your_email_password",
      //   },
      // });

      // // send email verification message
      // const message = {
      //   from: "your_email_address@gmail.com",
      //   to: email,
      //   subject: "Postgram - Verify your account",
      //   html: `<p>Thank you for registering on Postgram. Please click the link below to verify your account:</p><a href="http://localhost:3000/api/verify/${token}">Verify</a>`,
      // };

      // transporter.sendMail(message, (err, info) => {
      //   if (err) throw err;
      //   console.log("Email sent: " + info.response);
      // });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
