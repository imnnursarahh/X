import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

const validatePost = [
  body("text")
    .trim()
    .isLength({ min: 4 })
    .withMessage("input at least 4 characters"),
  validate,
];

// create a complete post retrieval simultaneously
// get posts for the corresponding id
// GET
// http://127.0.0.1:8080/posts/:userid
router.get("/", isAuth, postController.getPosts);

// get post number
// GET
// http://127.0.0.1:8080/post/:id
router.get("/:id", validatePost, isAuth, postController.getPost);

// write post
// POST
// http://127.0.0.1:8080/post
// after inputting in json format, we can output all the added data as json
router.post("/", isAuth, validatePost, postController.createPost);

// post head
// PUT
// http://127.0.0.1:8080/post/:id
// after inputting in json format, we can output all the added data as json
router.put("/:id", isAuth, postController.updatePost);

// delete post
// DELETE
// http://127.0.0.1:8080/post/:id
router.delete("/:id", isAuth, postController.deletePost);

export default router;
