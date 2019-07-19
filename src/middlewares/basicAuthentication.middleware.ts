import { Request, Response, NextFunction } from "express";
import { ICard } from "../interfaces/card";
import helpers from '../helpers';



export = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: helpers.messages.account.unAuthorized });
  }
  var token = req.headers.authorization.split(" ")[1];
  if (!token) { return res.status(401).json({ message: helpers.messages.account.unAuthorized }); }
  let decodedToken = helpers.token.decodeToken(token)
  if (decodedToken) {
    // req.payload = decodedToken; //issue
    next();
  }
  else {
    res.status(401).json({ message: helpers.messages.account.unAuthorized })
  }
};
