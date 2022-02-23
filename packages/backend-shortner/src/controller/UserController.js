import crypto from "crypto";
import bcrypt from "bcryptjs";
import UserModel from "../model/UserModel.js";

class UserController {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

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
      password: this.hashPassword,
      phones,
    });
    response.send({ user });
  }

  async remove(request, response) {
    const { id } = request.params.id;

    const user = await UserModel.findById(id);
    if (user) {
      await user.remove();
      response.status(200).send({ message: "User deleted!" });
    }
    response.status(404).send({ message: "User not found" });
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
        password: this.hashPassword,
        createdAt,
        modifiedAt,
        phones,
      },
      { new: true }
    );
    response.json({ user });
  }
  async login(request, response) {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;

      const token = jsonwebtoken.sign(user, JWT_SECRET);

      return response.send({ token });
    }
    response.status(404).send({ message: "Password Invalid" });
  }
}
export default UserController;
