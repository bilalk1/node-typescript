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
const utility = require('../helpers/utilityFunctions');
const postCategory = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let category = new Category(req.body);
        category = await category.save();
        return res.status(200).json(category);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        return res.status(500).json({ message: err.message });
    }

}
const getCategories = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let [categories, total] = await Promise.all([
            Category
                .find()
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            Category
                .count()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            categories
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    postCategory,
    getCategories
}