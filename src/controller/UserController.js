import crypto from "crypto";
import UserModel from "../model/UserModel.js";

class UserController {
  async index(request, response) {
    const users = await UserModel.find().lean();

    response.json({ users });
  }
  async store(request, response) {
    const { name, email, password, phones } = request.body;
    const user = await UserModel.create({
      name,
      email,
      role,
      password,
      phones,
    });
    response.send({ user });
  }
  async remove(request, response) {
    const { id } = request.params.id;

    try {
      const user = await UserModel.findById(id);
      if (user) {
        await user.remove();
        response.status(200).send({ message: "User deleted!" });
      }
      response.status(404).send({ message: "User not found" });
    } catch (error) {
      response.status(400).json({ message: "Unexpected Error" });
    }
  }
  async getOne(request, response) {
    const { id } = request.params;
    try {
      const user = await UserModel.findById(id);
      if (user) {
        return response.json({ shortner });
      }
      response.status(404).json({ message: "User not exist" });
    } catch (error) {
      console.log(error.message);
      response.status(400).json({ message: "Unexpected Error" });
    }
  }
  async update(request, response) {
    const { id } = request.params;
    const { name, email, role, password, createdAt, modifiedAt, phones } =
      request.body;
    const user = await UserModel.findByIdAndUpdate(
      {
        id,
        name,
        email,
        role,
        password,
        createdAt,
        modifiedAt,
        phones,
      },
      { new: true }
    );
    response.json({ user });
  }
}
export default UserController;
