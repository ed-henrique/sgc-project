class CategoryController {
	constructor(CategoryModel) {
		this.category = CategoryModel;
	}

	async readAll() {
		const categories = await this.category.findAll();

		if (!categories) throw new Error("Não há categorias!");

		return categories;
	}

	async readById(id) {
		const category = await this.category.findByPk(id);

		if (!category) throw new Error("Categoria não encontrada!");

		return category;
	}

	async create(category) {
		const categoryExists = await this.category.findOne({
			where: { name: category.name },
		});

		if (!categoryExists) {
			await this.category.create(category);
		} else {
			throw new Error("Categoria já existe!");
		}
	}

	async update(id, data) {
		const categoryExists = await this.category.findOne({ where: { id } });

		if (categoryExists) {
			await this.category.update(data, { where: { id } });
		} else {
			throw new Error("Categoria não existe!");
		}
	}

	async delete(id) {
		await this.category.destroy({ where: { id } });
	}
};

module.exports = CategoryController;
