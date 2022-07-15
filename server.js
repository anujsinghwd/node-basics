const express = require("express");

const { getUsers, saveUser, readUsers, deleteUser } = require("./users");

const app = express();

app.use(express.json());

app.get("/users", (request, response) => {
  const users = readUsers();
  response.send({ success: true, data: users });
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;
  const users = getUsers();
  const newUser = {
    name,
    age,
  };

  const filteredUsers = users.filter((u) => u.name === name);

  if (filteredUsers.length === 0) {
    users.push(newUser);
    saveUser(JSON.stringify(users));
    response.send({ post: true });
  } else {
    response.send({ duplicate: true });
  }
});

app.delete("/users/:name", (request, response) => {
  const { name } = request.params;
  deleteUser(name);
  response.send({ delete: true });
});

app.listen(8000, () => {
  console.log("Server is started");
});
