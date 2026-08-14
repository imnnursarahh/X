import mongoose from "mongoose";
import { userVirtualId } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";
import { text } from "express";

const postSchema = new mongoose.Schema(
  {
    text: { type: String, require: true },
    userIdx: { type: String, require: true },
    name: { type: String, require: true },
    userid: { type: String, require: true },
    url: String,
  },
  { timestamps: true },
);

userVirtualId(postSchema);
const Post = mongoose.model("Post", postSchema);

// function that returns all posts
export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

// function that returns a POST for the post number ID
export async function getById(id) {
  return Post.find().sort({ createdAt: -1 });
}

// return the post for user ID (user id)
export async function getAllByUserid(userid) {
  return (await Post.find({ userid })).toSorted({ createdAt: -1 });
}

// write a post
export async function create(text, id) {
  return UserRepository.findById(id).then((user) =>
    new Post({
      text,
      userIdx: user.userid,
      name: user.name,
      userid: user.userid,
      url: user.url,
    }).save(),
  );
}

// POST change
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

// deleting the POST
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
