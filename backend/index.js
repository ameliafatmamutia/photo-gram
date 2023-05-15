const express = require("express");
const PORT = 8000;
const app = express();
const {
  authRouter,
  postRouter,
  userRouter,
  likesRouter,
  commentRouter,
} = require("./routers");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comment", commentRouter);
app.use("/api/assets", express.static("assets"));

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
