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
const Country = mongoose.model('Country');
const messages = require('../helpers/index').messages;
const utility = require('../helpers/utilityFunctions');
const postCountry = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let country = new Country(req.body);
        country = await country.save();
        return res.status(200).json(country);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        return res.status(500).json({ message: err.message });
    }

}
const getCountries = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let [countries, total] = await Promise.all([
            Country
                .find()
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            Country
                .count()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            countries
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    postCountry,
    getCountries
}