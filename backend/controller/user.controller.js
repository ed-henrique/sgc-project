import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../config/auth.js";

export class UserController {
  constructor(UserModel) {
    this.user = UserModel;
  }

  async getAll() {
    const users = await this.user.findAll();
    return users;
  }

  async add(userData) {
    let userExists = await this.user.findOne({
      where: { email: userData.email },
    });

    if (userExists) {
      return {
        error: true,
        message: "Usuário já existe",
      };
    }

    const { name, email, password } = userData;
    const newUser = { name, email, password };

    // Criptografar a senha
    newUser.password = await bcrypt.hash(newUser.password, 8);

    try {
      const createUser = await this.user.create(newUser);
      console.log("aqui 1'", createUser);
      return createUser;
    } catch (error) {
      console.log(error);
    }
  }

  async login(userData) {
    let userExists = await this.user.findOne({
      where: { email: userData.email },
    });

    if (!userExists) {
      return {
        error: true,
        message: "Usuário não existe",
      };
    }

    // Como o usuário existe vanmos verificar se a senha está correta
    if (!(await bcrypt.compare(userData.password, userExists.password))) {
      return {
        error: true,
        message: "Senha inválida",
      };
    }

    // Usuário existe E senha correta
    return {
      error: false,
      user: {
        name: userExists.name,
        email: userExists.email,
      },
      token: jwt.sign({ id: userExists.id }, auth.secret, {
        expiresIn: auth.expireIn,
      }),
    };
  }
}
