const { validationResult } = require('express-validator');
const Ingredient = require('../entities/Ingredient');

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const ingredient = await Ingredient.create(req.body);
        res.status(201).json(ingredient);
    } catch (err) {
        next(err);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const ingredients = await Ingredient.findAll();
        res.json(ingredients);
    } catch (err) {
        next(err);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);

        if (!ingredient) {
            return res.status(404).json({
                error: 'Ingredient not found'
            });
        }

        res.json(ingredient);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const ingredient = await Ingredient.update(
            req.params.id,
            req.body
        );

        if (!ingredient) {
            return res.status(404).json({
                error: 'Ingredient not found'
            });
        }

        res.json(ingredient);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await Ingredient.delete(req.params.id);

        if (deleted === 0) {
            return res.status(404).json({
                error: 'Ingredient not found'
            });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};