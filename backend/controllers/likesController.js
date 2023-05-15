const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createLike: async (req, res) => {
    const { id_user } = req.body;
    const postId = req.params.id;
    let createLike = `INSERT INTO likes (id_user, id_post) 
    VALUES (${db.escape(id_user)}, ${db.escape(postId)});`;
    try {
      let addLikeResult = await query(createLike);
      const userId = addLikeResult.insertId;
      return res.status(201).send({ id: userId, message: `Success like post with id = ${postId}` });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to give like' });
    }
  },
  createDislike: async (req, res) => {
   try {
    const { id_user } = req.body;
    const postId = req.params.id;
    let createDislikeQuery = `DELETE FROM likes WHERE id_post = ${db.escape(postId)} AND id_user = ${db.escape(id_user)}`;
    await query(createDislikeQuery);
    return res.status(201).send({ message: `Success dislike post with id = ${postId}` });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to dislike post' });
   }
  },
};