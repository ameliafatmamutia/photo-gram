const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_photogram",
  port: 3306,
});

db.connect((err) => {
  const queries = [
    {
      name: "createTableUsers",
      value: `CREATE TABLE IF NOT EXISTS users (
        id_user INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        bio VARCHAR(300) DEFAULT NULL,
        profile_picture_url VARCHAR(300) DEFAULT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT FALSE
      );
      `,
    },
    {
      name: "createTablePosts",
      value: `CREATE TABLE IF NOT EXISTS posts (
        id_post INT PRIMARY KEY AUTO_INCREMENT,
        image_url VARCHAR(255),
        caption VARCHAR(255),
        id_user INT,
        FOREIGN KEY (id_user) REFERENCES users (id_user)
      );`,
    },
    {
      name: "createTableComments",
      value: `CREATE TABLE IF NOT EXISTS comments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        comment VARCHAR(255),
        id_user INT,
        id_post INT,
        FOREIGN KEY (id_user) REFERENCES users (id_user),
        FOREIGN KEY (id_post) REFERENCES posts (id_post)
      );`,
    },
    {
      name: "createTableLikes",
      value: `CREATE TABLE IF NOT EXISTS likes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_user INT,
            id_post INT,
            FOREIGN KEY (id_user) REFERENCES users (id_user),
            FOREIGN KEY (id_post) REFERENCES posts (id_post)
          );`,
    },
  ];

  // Loop through the queries and execute them
  queries.forEach((query) => {
    db.query(query.value, function (err, result) {
      if (err) throw err;
      if (result.warningCount === 0) {
        console.log(`${query.name} table created`);
      } else {
        console.log(`${query.name} table already exists`);
      }
    });
  });

  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to mysql server");
});

const query = util.promisify(db.query).bind(db);

module.exports = { db, query };
