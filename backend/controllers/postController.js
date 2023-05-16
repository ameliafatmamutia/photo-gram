const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { API_URL } = require("../config");

module.exports = {
  createPost: async (req, res) => {
    const { caption, id_user } = req.body;
    const imageUrl = req.file.path;
    const image_url = `${API_URL}/${imageUrl}`;
    let createPostQuery = `INSERT INTO posts (image_url, caption, id_user) 
    VALUES (${db.escape(image_url)}, ${db.escape(caption)}, ${db.escape(
      id_user
    )});`;
    try {
      let addProductResult = await query(createPostQuery);
      const getInsertedPostQuery = `SELECT * FROM posts WHERE id_post = ${addProductResult.insertId}`;
      const insertedPost = await query(getInsertedPostQuery);
      return res.status(201).send({
        code: 201,
        data: insertedPost[0],
        message: "Success create new post",
      });
    } catch (error) {
      return res.status(500).send({
        code: 201,
        data: req.body,
        message: "Error while creating post",
      });
    }
  },
  fetchPosts: async (req, res) => {
    let fetchQuery = "SELECT * FROM posts";
    let allPost = await query(fetchQuery);
    return res.status(200).send({ code: 200, data: allPost });
  },
  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;

      // Delete the post by ID
      await query("DELETE FROM likes WHERE id_post = ?", [postId]);
      await query("DELETE FROM comments WHERE id_post = ?", [postId]);
      await query("DELETE FROM posts WHERE id_post = ?", [postId]);

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  },
  getPostById: async (req, res) => {
    try {
      const postId = req.params.id;

      let detailedByIdQuery = `
      SELECT
        posts.id_post,
        users.username,
        users.id_user,
        users.fullname,
        users.profile_picture_url,
        posts.image_url,
        posts.caption,
        COUNT(DISTINCT likes.id) AS numberOfLikes,
        GROUP_CONCAT(DISTINCT likes.id_user) AS likedBy,
        COUNT(DISTINCT comments.id) AS numberOfComments
      FROM posts
      INNER JOIN users ON posts.id_user = users.id_user
      LEFT JOIN likes ON posts.id_post = likes.id_post
      LEFT JOIN comments ON posts.id_post = comments.id_post
      WHERE posts.id_post = ?
    `;

      // Fetch the post by ID
      const result = await query(detailedByIdQuery, [postId]);

      if (result.length === 0) {
        return res.status(404).json({ error: "Post not found" });
      }

      let post = result[0];
      post = {
        ...post,
        likedBy: post.likedBy ? post.likedBy.split(",").map(Number) : [],
      };
      res.status(200).json({
        code: 200,
        data: post,
        message: `success get post by id_post = ${postId}`,
      });
    } catch (error) {
      console.error("Error retrieving post:", error);
      res.status(400).json({ error: "Failed to retrieve post" });
    }
  },
  fetchDetailedPost: async (req, res) => {
    try {
      const { page = 1, pageLimit = 5, userId } = req.query;
      const offset = (page - 1) * pageLimit;

      let values = [];
      let condition = "";

      if (userId !== undefined) {
        condition = "WHERE users.id_user = ?";
        values.push(userId);
      }

      values.push(Number(pageLimit), offset);

      let countQuery = `
      SELECT COUNT(*) AS total
      FROM (
        SELECT
          posts.id_post,
          users.username,
          users.id_user,
          users.fullName,
          users.profile_picture_url,
          posts.image_url,
          posts.caption
        FROM posts
        INNER JOIN users ON posts.id_user = users.id_user
        LEFT JOIN likes ON posts.id_post = likes.id_post
        LEFT JOIN comments ON posts.id_post = comments.id_post
        ${condition}
        GROUP BY posts.id_post
      ) AS subquery;
    `;
      let totalCount = await query(countQuery, values);

      let postsQuery = `
      SELECT
        posts.id_post,
        users.username,
        users.id_user,
        users.fullName,
        users.profile_picture_url,
        posts.image_url,
        posts.caption,
        COUNT(DISTINCT likes.id) AS numberOfLikes,
        GROUP_CONCAT(DISTINCT likes.id_user) AS likedBy,
        COUNT(DISTINCT comments.id) AS numberOfComments
      FROM posts
      INNER JOIN users ON posts.id_user = users.id_user
      LEFT JOIN likes ON posts.id_post = likes.id_post
      LEFT JOIN comments ON posts.id_post = comments.id_post
      ${condition}
      GROUP BY posts.id_post
      ORDER BY posts.id_post DESC
      LIMIT ? OFFSET ?;
    `;

      let posts = await query(postsQuery, values);

      const response = posts.map((post) => ({
        ...post,
        likedBy: post.likedBy ? post.likedBy.split(",").map(Number) : [],
      }));

      // Convert likedBy from a string to an array of strings

      res.status(200).json({
        code: 200,
        message: "Success get post with data",
        data: response,
        totalCount: totalCount[0].total,
      });
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(400).json({ error: "Failed to retrieve posts" });
    }
  },
  uploadImage: async (req, res) => {
    try {
      console.log(req);
      const imageUrl = req.file.path;
      return res.status(200).json({ imageUrl: `${API_URL}/${imageUrl}` });
    } catch (error) {
      res.status(400).json({ error: "Failed to upload photo" });
    }
  },
  updateCaption: async (req, res) => {
    const postId = req.params.id;
    const { caption } = req.body;

    try {
      const updateQuery = "UPDATE posts SET caption = ? WHERE id_post = ?";
      console.log(updateQuery, "update caption");
      await query(updateQuery, [caption, postId]);
      res.status(200).json({ message: "Caption updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update caption" });
    }
  },
};
