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
    const id = request.params.id;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      users.splice(userIndex, 1);
      response.status(200).send({ message: "User deleted!" });
    }
    response.status(404).send({ message: "User not found" });
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
  },
};
export default Controller;
