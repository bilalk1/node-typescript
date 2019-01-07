// /**********************************************************************
//  * Copyright (c) 2018 eActivate Manager , all rights reserved
//  * Proprietary and Confidential Information
//  *
//  * This source file is the property of eActivate Manager, and
//  * may not be copied or distributed in any isomorphic form without
//  * the prior written consent of eActivate Manager.
//  *
//  *
//  * Author: Bilal Iftikhar

//  */
let messages = require("../helpers/defaultMessages");
const { tokenHelper: tokenHelper } = require('../helpers');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: messages.account.unAuthorized });
  }
  var token = req.headers.authorization.split(" ")[1];
  if (!token) { return res.status(401).json({ message: messages.account.unAuthorized }); }
  tokenHelper.decodeToken(token)
    .then(payload => {
      req.payload = payload;
      next();
    })
    .catch(() => res.status(401).json({ message: messages.account.unAuthorized }));
};