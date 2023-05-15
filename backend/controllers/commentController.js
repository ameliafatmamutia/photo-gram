const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  fetchComment: async (req, res) => {
    try {
      const id = req.params.id;
      const fetchCommentQuery = `
        SELECT comments.id, comments.comment, users.profile_picture_url, users.id_user, users.fullname, users.username
        FROM comments
        INNER JOIN users ON comments.id_user = users.id_user
        WHERE comments.id_post = ?
        ORDER BY comments.id DESC;
      `;

      console.log(fetchCommentQuery, id)

      const response = await query(fetchCommentQuery, [id])
      console.log(response)
      res.status(200).send({ code: 200, message: `get all cooment post for id = ${id}`, data: response });
    } catch (error) {
      console.log(error)
      res.status(400).send({ code: 400, message: `failed to get comments` });
    }
  },
  createComment: async (req, res) => {
    const { id_user, comment, id_post } = req.body;
    console.log(req.body)
    let createComment = `INSERT INTO comments (id_user, id_post, comment) 
    VALUES (${db.escape(id_user)}, ${db.escape(id_post)}, ${db.escape(comment)});`;
    try {
      await query(createComment);
      return res.status(201).send({ message: `Success cooment post with id = ${id_post}` });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to give like' });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const id = req.params.id;
      let deleteCommentQuery = `DELETE FROM comments WHERE id = ${db.escape(id)}`;
      await query(deleteCommentQuery);
      return res.status(201).send({ message: `Success delete post with id = ${id}` });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  },
  getComment: async (req, res) => {
    let fetchQuery = "SELECT * FROM comments";
    let allComment = await query(fetchQuery);
    return res.status(200).send({ code: 200, data: allComment });
  }
};