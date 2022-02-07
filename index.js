import express from "express";
import crypto from "crypto";

const users = [
  {
    id: crypto.randomUUID(),
    name: "Keven Leone",
    email: "keven.leone@hotmail.com",
  },
  {
    id: crypto.randomUUID(),
    name: "Gustavo Morais",
    email: "gustavo.morais@hotmail.com",
  },
];
const app = express();

app.use(express.json());

app.get("/api/user", (request, response, next) => {
  response.send(users);
});

app.get("/api/user/:id", (request, response, next) => {
  const id = request.params.id;

  const user = users.find((user) => user.id === id);
  if (user) {
    response.send({ user });
  }
  response.status(404).send({ message: "User not found" });
});

app.post("/api/user", (request, response, next) => {
  const { name, email } = request.body;

  const user = { id: crypto.randomUUID(), name, email };
  users.push(user);
  response.send(users);
});

app.put("/api/user/:id", (request, response, next) => {
  const id = request.params.id;
  const userUpdate = { ...request.body };

  const user = users.find((user) => user.id === id);
  if (user) {
    for (const value in userUpdate) {
      user[value] = userUpdate[value];
    }
    response.send(user);
  }
  response.status(404).send({ message: "User not found" });

  //Retornar o usuário atualizado
});

app.delete("/api/user/:id", (request, response, next) => {
  const id = request.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    response.status(200).send({ message: "User deleted!" });
  }
  response.status(404).send({ message: "User not found" });
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000");
});
