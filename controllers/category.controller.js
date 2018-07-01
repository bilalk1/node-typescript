// /**********************************************************************
//  * Copyright (c) 2018 PK Flyers , all rights reserved
//  * Proprietary and Confidential Information
//  *
//  * This source file is the property of PK Flyers, and
//  * may not be copied or distributed in any isomorphic form without
//  * the prior written consent of PK Flyers.
//  *
//  *
//  * Author: Bilal Iftikhar

//  */
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const messages = require('../helpers/index').messages;
const postCategory = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let category = new Category(req.body);
        category = await Category.save(category);
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    postCategory
}