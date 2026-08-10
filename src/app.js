const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(express.json());

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'resources', 'swagger.json'), 'utf8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(noteRoutes);

module.exports = app;
