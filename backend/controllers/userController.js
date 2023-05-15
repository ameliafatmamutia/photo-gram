const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { API_URL } = require("../config");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, url) => {
  try {
    const message = `<p>Click this link to verify: <a href='${url}'>${url}</a></p>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "thisisdummy",
        pass: "thisisdummy",
      },
    });

    await transporter.sendMail({
      from: "thisisdummy",
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
module.exports = {
  createUser: async (req, res) => {
    const { email, username, password } = req.body;
    let createUserQuery = `INSERT INTO users (email, username, password) 
    VALUES (${db.escape(email)}, ${db.escape(username)}, ${db.escape(password)});`;

    try {
      let addProductResult = await query(createUserQuery);
      const userId = addProductResult.insertId;
      return res.status(201).send({ id: userId, data: addProductResult });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },
  fetchUser: async (req, res) => {
    let fetchQuery = "SELECT * FROM users";
    let allPost = await query(fetchQuery);
    return res.status(200).send({ code: 200, data: allPost });
  },
  getUserById: async (req, res) => {
    const { id } = req.params;

    // Perform a database query to fetch the user by ID
    db.query(
      `
      SELECT id_user, email, username, fullname, bio, profile_picture_url
      FROM users
      WHERE id_user = ?;
      `,
      [id],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }

        // Check if a user with the given ID exists
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found.' });
        }

        // Retrieve the user from the results
        const user = results[0];
        return res.status(200).json({ code: 200, message: 'Get result user by id', data: user });
      }
    );
  },
  updateUserById: async (req, res) => {
    const {
      bio,
      fullname,
    } = req.body;
    const imageUrl = req.file.path;
    const { id } = req.params;
    const profile_picture_url = `${API_URL}/${imageUrl}`

    const updateUserQuery = `UPDATE users SET bio = ?, profile_picture_url = ?, fullname = ? WHERE id_user = ?`;
    const updateParams = [bio, profile_picture_url, fullname, id];

    console.log(updateParams)

    db.query(updateUserQuery, updateParams, (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  },
  forgotPasswordSendEmail: async (req, res) => {
    try {
      const { email } = req.body
      const emailExist = await query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      console.log(emailExist, email)

      if (emailExist.length === 0) {
        return res
          .status(400)
          .send({ code: 400, message: "Email not registered" });
      }

      const token = jwt.sign({ id_user: emailExist[0].id_user, email: emailExist[0].email }, "secretkey");
      console.log(token)

      await query(
        "INSERT INTO password_reset_tokens (id_user, token) VALUES (?, ?)",
        [emailExist[0].id_user, token]
      );

      const url = `http://localhost:8000/api/users/${emailExist[0].id_user}/verify-forgot-password/${token}`;

      await sendEmail(emailExist[0].email, "Verify Account", url);

      res.status(200).send({
        data: {
          token: token,
        },
        message:
          "Register success. A verification email has been sent. Please check your email and verify",
        code: 200,
      });
    } catch (error) {
      console.log(error)
    }
  },
  verifyForgotPassword: async (req, res) => {
    const { id_user, token } = req.params;

    try {
      // Check token in database
      let checkTokenQuery = `SELECT * FROM password_reset_tokens WHERE token = ${db.escape(
        token
      )};`;
      const tokenData = await query(checkTokenQuery);
      if (tokenData.length === 0) {
        return res
          .status(400)
          .send({ code: 400, message: "Invalid or expired token" });
      }

      res.redirect(`http://localhost:3000/reset-password?token=${token}`);

    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ code: 500, message: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    const { token, password } = req.body;

  try {
    // Decrypt the token using the secret or public key
    const payload = jwt.verify(token, 'secretkey');

    const hashedPassword = bcrypt.hashSync(password, 10);

    const queryUpdatePassword = 'UPDATE users SET password = ? WHERE email = ?';
    await query(queryUpdatePassword, [hashedPassword, payload.email]);
    const queryDeleteToken = 'DELETE FROM password_reset_tokens WHERE token = ?';
    await query(queryDeleteToken, [token]);

    if (result.affectedRows > 0) {
      // Password updated successfully
      res.status(201).json({ message: 'Success updating user password, please re-login' });
    } else {
      // User with the specified email does not exist
      res.status(404).json({ message: 'User not found, please use a valid URL' });
    }
  } catch (error) {
    // Token verification failed
    res.status(401).json({ error: 'Invalid token' });
  }
  }

};