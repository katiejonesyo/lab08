const express = require('express');
const Soups= require('./models/soups');
const Kts = require('./models/kts');
const app = express();

app.use(express.json());

// Kts endpoints
app.post('/api/v1/kts', (req, res, next) => {
  Kts
    .insert(req.body)
    .then(kts => res.send(kts))
    .catch(next);
});

app.get('/api/v1/kts', (req, res, next) => {
  Tree
    .find()
    .then(kts => res.send(kts))
    .catch(next);
});

app.get('/api/v1/kts/:id', (req, res, next) => {
  Kts
    .findById(req.params.id)
    .then(kts => res.send(kts))
    .catch(next);
});

app.put('/api/v1/kts/:id', (req, res, next) => {
  Kts
    .update(req.params.id, req.body)
    .then(tree => res.send(tree))
    .catch(next);
});

app.delete('/api/v1/kts/:id', (req, res, next) => {
  Kts
    .delete(req.params.id)
    .then(tree => res.send(tree))
    .catch(next);
});

// Soup endpoints
app.post('/soups', (req, res, next) => {
  Soups
    .insert(req.body)
    .then(soups => res.send(soups))
    .catch(next);
});

app.get('/api/v1/soups', (req, res, next) => {
  Soups
    .find()
    .then(soups => res.send(soups))
    .catch(next);
});

app.get('/api/v1/soups/:id', (req, res, next) => {
  Soups
    .findById(req.params.id)
    .then(soups => res.send(soups))
    .catch(next);
});

app.put('/api/v1/soups/:id', (req, res, next) => {
  Soups
    .update(req.params.id, req.body)
    .then(soups => res.send(soups))
    .catch(next);
});

app.delete('/api/v1/soups/:id', (req, res, next) => {
  Soups
    .delete(req.params.id)
    .then(soups => res.send(soups))
    .catch(next);
});

module.exports = app;