const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

module.exports = {
  register: async (req, res) => {
    const { fullname, email, username, password, repeat_password } = req.body;

    // Check if all input fields are filled
    if (!fullname || !email || !username || !password || !repeat_password) {
      return res
        .status(200)
        .send({ code: 400, message: "Please fill all required fields" });
    }

    // check if passwords match
    if (password !== repeat_password) {
      return res
        .status(200)
        .send({ code: 400, message: "Passwords do not match" });
    }

    // check if password meets the requirements
    if (
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\,./?'":;<>~`])(?!.*\s).{8,}$/
      )
    ) {
      return res.status(200).send({
        code: 400,
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
        return res
          .status(200)
          .send({ code: 400, message: "Email already exists" });
      }

      // Check if username already exists in the database
      const usernameExist = await query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (usernameExist.length > 0) {
        return res
          .status(200)
          .send({ code: 400, message: "Username already exists" });
      }

      // Hash password before storing it in the database
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert user data into the database
      const result = await query(
        "INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)",
        [fullname, email, username, hashedPassword]
      );

      // Fetch new user data
      let userQuery = `SELECT * FROM users WHERE username = ${db.escape(
        username
      )}`;
      let newUserData = await query(userQuery);

      // Generate JWT token for verification
      const token = jwt.sign({ id_user: newUserData[0].id_user }, "secretkey");

      // Store verification token to database
      await query(
        "INSERT INTO verification_tokens (id_user, token) VALUES (?, ?)",
        [newUserData[0].id_user, token]
      );

      // URL for verification
      const url = `http://localhost:8000/auth/${newUserData[0].id_user}/verify/${token}`;

      // // verification email message
      // const message = `Clik this link to verify: ${url}`;

      // Send verification email
      await sendEmail(newUserData[0].email, "Verify Account", url);

      // Send success response with JWT token
      res.status(200).send({
        token,
        message:
          "Register success. A verification email has been sent. Please check your email and verify",
        code: 200,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  verify: async (req, res) => {
    const { id_user, token } = req.params;

    try {
      // Check token in database
      let checkTokenQuery = `SELECT * FROM verification_tokens WHERE token = ${db.escape(
        token
      )};`;
      const tokenData = await query(checkTokenQuery);
      if (tokenData.length === 0) {
        return res
          .status(200)
          .send({ code: 400, message: "Invalid or expired token" });
      }

      // Update user status to verified
      let verifyUserQuery = `UPDATE users SET is_verified = 1 WHERE id_user = ${db.escape(
        id_user
      )};`;
      await query(verifyUserQuery);

      // // Delete token from database
      // let deleteTokenQuery = `DELETE FROM verification_tokens WHERE token = ${token};`;
      // await query(deleteTokenQuery);

      // Send success message
      // res.status(200).send({ code: 200, message: "Verification success" });

      // Redirect to success verification page
      res.redirect("http://localhost:3000/verification-success");
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ code: 500, message: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { usernameOrEmail, password } = req.body;

      const user = await query(
        `SELECT * FROM users WHERE username = ${db.escape(
          usernameOrEmail
        )} OR email = ${db.escape(usernameOrEmail)}`
      );

      if (user.length === 0) {
        return res.status(200).send({
          code: 400,
          message: "Username, email, or password is invalid",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user[0].password);

      if (!isValidPassword) {
        return res.status(200).send({
          code: 400,
          message: "Username, email, or password is invalid",
        });
      }

      return res.status(200).send({
        code: 200,
        message: "Login successful",
        data: {
          id: user[0].id_user,
          username: user[0].username,
          email: user[0].email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },

  // To resend email verification
  resend_email: async (req, res) => {
    try {
      const { email } = req.body;

      // Check if email exists in users table
      let emailQuery = `SELECT * FROM users WHERE email = ${db.escape(email)}`;
      const rows = await query(emailQuery);

      if (!rows.length === 0) {
        return res
          .status(200)
          .send({ code: 400, message: "Email is not registered" });
      }

      const user = rows[0];

      // Generate new verification token
      const newToken = jwt.sign({ id_user: user.id_user }, "secretkey");

      // Update verification token in verification_tokens table
      let newTokenQuery = `UPDATE verification_tokens SET token = ${db.escape(
        newToken
      )} WHERE id_user = ${db.escape(user.id_user)}`;
      await query(newTokenQuery);

      // Send verification email with new token
      const verificationLink = `http://localhost:8000/auth/${user.id_user}/verify/${newToken}`;

      await sendEmail(user.email, "Verify Account", verificationLink);

      res.status(200).send({
        code: 200,
        message:
          "A verification email has been sent. Please check your email and verify",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
