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
const Store = mongoose.model('Store');
const messages = require('../helpers/index').messages;
const utility = require('../helpers/utilityFunctions');

const postStore = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let store = new Store(req.body);
        store = await store.save();
        return res.status(200).json(store);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        return res.status(500).json({ message: err.message });
    }

}

const getStores = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let [stores, total] = await Promise.all([
            Store
                .find()
                .populate('categories', 'name')
                .populate('cities', 'name')
                .populate('country', 'name')
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            Store
                .count()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            stores
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

const getStoresByCountryAndCity = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let { country, city } = req.params
        let query = {
            country: country,
            cities: city
        }
        let [stores, total] = await Promise.all([
            Store
                .find(query)
                .select('-updatedAt -createdAt -__v -isValid')
                .populate('country', 'name')
                .populate('cities', 'name')
                .populate('categories', 'name')
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            Store
                .count(query)
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            stores
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }


}

const getStoresByCategoryCountryAndCity = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let { category, country, city } = req.params
        let query = {
            country: country,
            cities: city,
            categories: category
        }
        let [stores, total] = await Promise.all([
            Store
                .find(query)
                .select('-updatedAt -createdAt -__v -isValid')
                .populate('country', 'name')
                .populate('cities', 'name')
                .populate('categories', 'name')
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            Store
                .count(query)
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            stores
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }


}
const getStoresById = async (req, res) => {
    try {
        // console.log(req.params)
        // let { id } = req.params
        let store = await Store
            .findById({ _id: req.params.id })
            .select('-updatedAt -createdAt -__v -isValid')
            .populate('country', 'name')
            .populate('cities', 'name')
            .populate('categories', 'name')
            .lean()
            .exec()
        if (store !== null) {
            res.status(200).json({ store });
        } else {
            res.status(400).json({ message: messages.generic.notExists });
        }


    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const getStoresByCategory = async (req, res) => {
    try {
        console.log("getStoresByCategory")
        let { category } = req.params;
        let pagination = utility.initializePagination(req);
        console.log(category)
        let [stores, total] = await Promise.all([
            Store
                .find({categories:category})
                .select('-updatedAt -createdAt -__v -isValid')
                .populate('country', 'name')
                .populate('cities', 'name')
                .populate('categories', 'name')
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .lean()
                .exec(),
            Store
                .count({categories:category})
        ]);
        if (stores !== null) {
            res.status(200).json({
                limit: pagination.limit,
                total,
                page: pagination.page,
                totalPages: Math.ceil(total / pagination.limit),
                stores
            });
        } else {
            res.status(400).json({ message: messages.generic.notExists });
        }



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    postStore,
    getStores,
    getStoresById,
    getStoresByCategory,
    getStoresByCountryAndCity,
    getStoresByCategoryCountryAndCity

}