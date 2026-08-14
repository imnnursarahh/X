import express from "express";
import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "abcdefg1234%^&*";
const bcryptSaltRounds = 10;
const jwtExpiresInDays = "2d";

async function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;

  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid} already exists` });
  }

  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);

  const user = await authRepository.createUser(userid, hashed, name, email);
  if (user) {
    res.status(201).json(user);
  }
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
  res.status(200).json({ token, user });
}
