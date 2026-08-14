import express from "express";
import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

async function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretkey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function signup(req, res, next) {
  const { userid, password, name, email, url } = req.body;

  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid} already exists` });
  }

  const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);
  const user = await authRepository.createUser({
    userid,
    password: hashed,
    name,
    email,
    url,
  });
  const token = await createJwtToken(user);
  res.status(201).json({ token, userid });
}

export async function login(req, res, next) {
  const { userid, password } = req.body;

  const user = await authRepository.findByUserid(userid);
  if (!user) {
    res.status(401).json(`${userid} cannot be found`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: `check your ID or password` });
  }

  const token = await createJwtToken(user.id);
  res.status(200).json({ token, userid });
}

export async function me(req, res, next) {
  const user = await authRepository.findById(req.userid);
  if (!user) {
    return res.status(404).json({ message: "no matching user found" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
