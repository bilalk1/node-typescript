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
const City = mongoose.model('City');
const messages = require('../helpers/index').messages;
const utility = require('../helpers/utilityFunctions');
const postCity = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let city = new City(req.body);
        city = await city.save();
        return res.status(200).json(city);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        return res.status(500).json({ message: err.message });
    }

}
const getcities = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let [cities, total] = await Promise.all([
            City
                .find()
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            City
                .count()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            cities
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    postCity,
    getcities
}