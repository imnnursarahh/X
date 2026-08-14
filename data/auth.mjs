import { userVirtualId } from "../db/database.mjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false },
);

userVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function login(userid, password) {
  return user;
}

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findById(id) {
  return User.findById(id);
}
