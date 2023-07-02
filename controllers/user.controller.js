require("../dotenv.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
	constructor(UserModel) {
		this.user = UserModel;
		this.expiration = "6h";
	}

	async readAll() {
		const users = await this.user.findAll();

		if (!users) throw new Error("Não há usuários!");

		users.forEach(async user => {
			user.image = `data:${user.imageMimeType};base64,${btoa(user.image.reduce((data, byte) => data + String.fromCharCode(byte), ""))}`;
			user.role = user.role[0].toUpperCase() + user.role.slice(1);
			user.status = user.status[0].toUpperCase() + user.status.slice(1);
		});

		return users;
	}

	async readById(id) {
		const user = await this.user.findByPk(id);

		if (!user) throw new Error("Usuário não encontrado!");

		user.image = `data:${user.imageMimeType};base64,${btoa(user.image.reduce((data, byte) => data + String.fromCharCode(byte), ""))}`;
		user.role = user.role[0].toUpperCase() + user.role.slice(1);
		user.status = user.status[0].toUpperCase() + user.status.slice(1);

		return user;
	}

	async create(user) {
		const userExists = await this.user.findOne({
			where: { email: user.email },
		});

		if (!userExists) {
			user.password = await bcrypt.hash(user.password, 8);
			await this.user.create(user);

			const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role, createdAt: new Date() }, process.env.SECRET, {
				expiresIn: this.expiration,
			});

			return token;
		} else {
			throw new Error("Usuário já existe!");
		}
	}

	async update(id, data) {
		const userExists = await this.user.findOne({
			where: { id },
		});

		if (userExists) {
			await this.user.update(data, { where: { id } });
		} else {
			throw new Error("Usuário não existe!");
		}
	}

	async upgrade(id) {
		const userExists = await this.user.findOne({
			where: { id },
		});

		if (userExists) {
			await this.user.update({ role: "admin" }, { where: { id } });
		} else {
			throw new Error("Usuário não existe!");
		}
	}

	async suspend(id) {
		const userExists = await this.user.findOne({
			where: { id },
		});

		if (userExists && userExists.role !== "root") {
			const newStatus = userExists.status === "suspended" ? "active" : "suspended";
			await this.user.update({ status: newStatus }, { where: { id } });
		} else {
			throw new Error("Usuário não existe!");
		}
	}

	async delete(id) {
		await this.user.destroy({ where: { id } });
	}

	async login(user) {
		const userExists = await this.user.findOne({
			where: { email: user.email },
		});

		if (userExists) {
			if (!(await bcrypt.compare(user.password, userExists.password))) {
				throw new Error("Senha incorreta!");
			}
			
			const token = jwt.sign({ id: userExists.id, name: userExists.name, email: user.email, role: userExists.role, createdAt: new Date() }, process.env.SECRET, {
				expiresIn: this.expiration,
			});

			return token;
		} else {
			throw new Error("Usuário não existe!");
		}
	}
};

module.exports = UserController;
