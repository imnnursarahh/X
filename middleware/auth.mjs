/* import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";

const AUTH_ERROR = { message: "authentication error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    console.log("header error occured");
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "abcdefg1234%^&*", async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded);
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    console.log("user.id: ", user.id);
    console.log("user.userid: ", user.userid);
    req.userid = user.id;
    next();
  });
}; */

import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
import { config } from "../config.mjs";

const AUTH_ERROR = { message: "authentication error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secretkey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }

    // Search by ID since decoded.id is '1786722282595'
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    req.userid = user.id;
    next();
  });
};
