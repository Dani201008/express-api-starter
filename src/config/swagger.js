// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Foodtruck API',
            version: '1.0.0',
            description: 'RESTful API for the foodtruck application.'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local dev server'
            }
        ],
        tags: [
            {
                name: 'Pizzas',
                description: 'Pizza management'
            },
            {
                name: 'Ingredients',
                description: 'Ingredient management'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;