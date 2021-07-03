const user = require('../models');

const saveUser = async (payload = {}) =>
  new Promise((resolve, reject) => {
    const newUser = new user(payload);
    newUser.save()
      .then(resolve)
      .catch(reject);
  });

const listUsers = async (select, project) => user.find(select, project)
  .lean()
  .exec();

const editUser = async (id, update, options) =>
  user.findByIdAndUpdate(id, update, options)
    .lean()
    .exec();

const deleteUser = async (id) => user.findByIdAndDelete(id)
  .lean()
  .exec();

module.exports = { saveUser, listUsers, editUser, deleteUser };
