import crypto from "crypto";
import { users } from "../model/UserModel.js";

const Controller = {
  index: (request, response) => {
    response.send(users);
  },
  store: (request, response) => {
    const { name, email } = request.body;

    const user = { id: crypto.randomUUID(), name, email };
    users.push(user);
    response.send(users);
  },
  remove: (request, response) => {
    const { id } = request.params.id;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      response.status(404).send({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    response.status(200).send({ message: "User deleted!" });
  },
  getOne: (request, response) => {
    const id = request.params.id;

    const user = users.find((user) => user.id === id);
    if (user) {
      response.send({ user });
    }
    response.status(404).send({ message: "User not found" });
  },
  update: (request, response) => {
    const { id } = request.params.id;
    const { email, name } = request.body;

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      response.status(404).send({ message: "User not found" });
    }
    users[userIndex] = {
      id,
      name,
      email,
    };
    response.send({ user: user[userIndex] });
  },
};
export default Controller;
