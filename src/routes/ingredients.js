const express = require('express');
const { body } = require('express-validator');
const ingredientsController = require('../controllers/ingredientsController');

const router = express.Router();

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of all ingredients
 */
router.get('/', ingredientsController.findAll);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingredient found
 *       404:
 *         description: Ingredient not found
 */
router.get('/:id', ingredientsController.findOne);

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Create an ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Champignons
 *               price:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Ingredient created
 *       400:
 *         description: Validation error
 */
router.post(
    '/',
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required'),

        body('price')
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number')
    ],
    ingredientsController.create
);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   put:
 *     summary: Update an ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Champignons frais
 *               price:
 *                 type: number
 *                 example: 1.5
 *     responses:
 *       200:
 *         description: Ingredient updated
 *       404:
 *         description: Ingredient not found
 */
router.put(
    '/:id',
    [
        body('name')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('Name cannot be empty'),

        body('price')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number')
    ],
    ingredientsController.update
);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */
router.delete('/:id', ingredientsController.delete);

module.exports = router;