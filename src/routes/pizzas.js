// routes/pizzas.js
const express = require('express');
const { body, param } = require('express-validator');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

/**
 * @swagger
 * /api/pizzas:
 *   get:
 *     tags:
 *       - Pizzas
 *     summary: Get all pizzas
 *     responses:
 *       200:
 *         description: List of all pizzas
 *
 *   post:
 *     tags:
 *       - Pizzas
 *     summary: Create a pizza
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
 *                 example: Margherita
 *               ingredients:
 *                 type: string
 *                 example: Tomato, mozzarella, basil
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/margherita.jpg
 *               price:
 *                 type: number
 *                 example: 12.5
 *     responses:
 *       201:
 *         description: Pizza created
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /api/pizzas/{id}:
 *   get:
 *     tags:
 *       - Pizzas
 *     summary: Get a pizza by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza found
 *       404:
 *         description: Pizza not found
 *
 *   put:
 *     tags:
 *       - Pizzas
 *     summary: Update a pizza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizza updated
 *       404:
 *         description: Pizza not found
 *
 *   delete:
 *     tags:
 *       - Pizzas
 *     summary: Delete a pizza
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pizza deleted
 *       404:
 *         description: Pizza not found
 */
const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('ingredients').optional().isString(),
    body('imageUrl').optional().isString().isURL().withMessage('imageUrl must be a valid URL'),
    body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
];

router.get('/', pizzaController.findAll);
router.post('/', createAndUpdateValidations, pizzaController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzaController.findOne);
router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], pizzaController.update);
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzaController.delete);

module.exports = router;
