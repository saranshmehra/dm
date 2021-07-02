const express = require('express');
const app = express();
const { saveValidation, editValidation } = require('../middlewares');
const {
  saveUser,
  listUsers,
  editUser,
  deleteUser
} = require('../services');

app.post('/create', saveValidation, (req, res) => {
  saveUser(req.body)
    .then(user => {
      res.send(user)
    })
    .catch(error => {
      res.send(error.message);
    })
});

app.get('/read', (req, res) => {
  listUsers({}, {})
    .then(users => {
      res.send(users)
    })
    .catch(error => {
      res.send(error.message)
    });
});

app.put('/update', editValidation, (req, res) => {
  editUser({ name: 'Alok' }, req.body, { new: true })
    .then(user => {
      res.send(user)
    })
    .catch(error => {
      res.send(error.message)
    })
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  deleteUser(id)
    .then(() => {
      res.send('user deleted')
    })
    .catch(error => {
      res.send(error.message)
    })
});

module.exports = app;
