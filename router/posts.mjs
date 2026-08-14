import express from "express";
import * as postController from "../controller/post.mjs";

const router = express.Router();

// create a complete post retrieval simultaneously
// get posts for the corresponding id
// GET
// http://127.0.0.1:8080/posts/:userid
router.get("/", postController.getPosts);

// get post number
// GET
// http://127.0.0.1:8080/post/:id
router.get("/:id", postController.getPost);

// write post
// POST
// http://127.0.0.1:8080/post
// after inputting in json format, we can output all the added data as json
router.post("/", postController.createPost);

// post head
// PUT
// http://127.0.0.1:8080/post/:id
// after inputting in json format, we can output all the added data as json
router.put("/:id", postController.updatePost);

// delete post
// DELETE
// http://127.0.0.1:8080/post/:id
router.delete("/:id", postController.deletePost);

export default router;
