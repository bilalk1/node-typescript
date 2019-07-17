import { Request, Response, NextFunction } from "express";
import { genericPayload } from "./authorization.middleware";
import { IUser } from "../models/user.model";
import { ICard } from "../models/card.model";

let messages = require("../helpers/defaultMessages");
const { tokenHelper: tokenHelper } = require('../helpers');

module.exports = (req: Request & genericPayload, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: messages.account.unAuthorized });
  }
  var token = req.headers.authorization.split(" ")[1];
  if (!token) { return res.status(401).json({ message: messages.account.unAuthorized }); }
  tokenHelper.decodeToken(token)
    .then((payload: IUser | ICard) => {

      // req.payload = payload; //issue
      next();
    })
    .catch(() => res.status(401).json({ message: messages.account.unAuthorized }));
};
