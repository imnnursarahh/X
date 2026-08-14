import express from "express";
import * as authRepository from "../data/auth.mjs";

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const user = await authRepository.createUser(userid, password, name, email);
  if (user) {
    res.status(201).json(user);
  }
}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    res.status(200).json({ message: `login completed for user ${userid}` });
  } else {
    res
      .status(404)
      .json({ message: `please check your ID or password, user ${userid}` });
  }
}
