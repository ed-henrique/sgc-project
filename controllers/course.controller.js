const { Category } = require("../models/index.js");

class CourseController {
	constructor(CourseModel) {
		this.course = CourseModel;
	}

	async readAll() {
		const courses = await this.course.findAll({
			include: Category,
		});

		if (!courses) throw new Error("Não há cursos!");

		courses.forEach(async course => {
			course.image = `data:${course.imageMimeType};base64,${btoa(course.image.reduce((data, byte) => data + String.fromCharCode(byte), ""))}`;
			course.status = course.status[0].toUpperCase() + course.status.slice(1);
		});
		
		return courses;
	}

	async readById(id) {
		const course = await this.course.findByPk(id, {
			include: Category,
		});

		if (!course) throw new Error("Curso não encontrado!");

		course.image = `data:${course.imageMimeType};base64,${btoa(course.image.reduce((data, byte) => data + String.fromCharCode(byte), ""))}`;
		course.status = course.status[0].toUpperCase() + course.status.slice(1);

		return course;
	}

	async create(course) {
		const courseExists = await this.course.findOne({
			where: { name: course.name },
		});

		if (!courseExists) {
			await this.course.create(course);
		} else {
			throw new Error("Curso já existe!");
		}
	}

	async update(id, data) {
		const courseExists = await this.course.findOne({
			where: { id },
		});

		if (courseExists) {
			await this.course.update(data, { where: { id } });
		} else {
			throw new Error("Curso não existe!");
		}
	}

	async delete(id) {
		await this.course.destroy({ where: { id } });
	}

	async close(id) {
		const course = await this.course.findByPk(id);

		if (!course) throw new Error("Curso não encontrado!");

		await this.course.update({ status: "closed" }, { where: { id } });
	}
};

module.exports = CourseController;
