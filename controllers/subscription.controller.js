const { Op } = require("sequelize");

class SubscriptionController {
	constructor(SubscriptionModel) {
		this.subscription = SubscriptionModel;
	}

	async readAll() {
		const subscriptions = await this.subscription.findAll();

		if (!subscriptions) throw new Error("Não há inscrições!");

		return subscriptions;
	}

	async readById(id) {
		const subscription = await this.subscription.findByPk(id);

		if (!subscription) throw new Error("Inscrição não encontrada!");

		return subscription;
	}

	async create(subscription) {
		const subscriptionExists = await this.subscription.findOne({
			where: { [Op.and]: [
				{
					UserId: subscription.UserId
				},
				{
					CourseId: subscription.CourseId
				}
			]},
		});

		if (!subscriptionExists) {
			await this.subscription.create(subscription);
		} else {
			throw new Error("Inscrição já existe!");
		}
	}

	async update(id, data) {
		const subscriptionExists = await this.subscription.findOne({ where: { id } });

		if (subscriptionExists) {
			await this.subscription.update(data, { where: { id } });
		} else {
			throw new Error("Inscrição não existe!");
		}
	}

	async delete(id) {
		await this.subscription.destroy({ where: { id } });
	}
};

module.exports = SubscriptionController;
