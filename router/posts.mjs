import express from "express";

const router = express.Router();

// get posts for the corresponding id
// GET
// http://127.0.0.1:8080/post/:userid

// get post number
// GET
// http://127.0.0.1:8080/post/:id

// write post
// POST
// http://127.0.0.1:8080/post
// after inputting in json format, we can output all the added data as json

// post head
// PUT
// http://127.0.0.1:8080/post/:id
// after inputting in json format, we can output all the added data as json

// delete post
// DELETE
// http://127.0.0.1:8080/post/:id

export default router;
