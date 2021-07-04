const express = require('express');
const multer = require('multer');
const app = express();
const { saveValidation, editValidation } = require('../middlewares');
const {
  saveUser,
  listUsers,
  editUser,
  deleteUser
} = require('../services');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({
  storage,
  limits: { fileSize: 393216 }
});

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send('something went wrong');
  }
});

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

app.put('/update/:id', editValidation, (req, res) => {
  const { id } = req.params;
  editUser(id, req.body, { new: true })
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
