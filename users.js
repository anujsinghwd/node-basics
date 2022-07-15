const fs = require("fs");

function saveUser(users_data) {
  fs.writeFileSync("users-data.json", JSON.stringify(users_data));
}

function readUsers() {
  return JSON.parse(fs.readFileSync("users-data.json"));
}

function getUsers() {
  try {
    const userString = JSON.parse(fs.readFileSync("users-data.json"));
    return userString;
  } catch (e) {
    return [];
  }
}

function deleteUser(username) {
  const users = getUsers();
  const filteredUsers = users.filter((u) => u.name !== username);
  saveUser(filteredUsers);
  return filteredUsers;
}

module.exports = {
  saveUser,
  getUsers,
  readUsers,
  deleteUser,
};
