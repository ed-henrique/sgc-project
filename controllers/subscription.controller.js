const { Op } = require("sequelize");
const { User } = require("../models/index.js");

class SubscriptionController {
	constructor(SubscriptionModel) {
		this.subscription = SubscriptionModel;
	}

	async readByUserId(id) {
		const subscriptions = await this.subscription.findAll({where: { UserId: id }});

		if (!subscriptions) throw new Error("Inscrições não encontradas!");

		return subscriptions;
	}

	async readByCourseId(id) {
		const subscriptions = await this.subscription.findAll({
			where: { CourseId: id },
			include: User,
		});

		if (!subscriptions) throw new Error("Inscrições não encontradas!");

		return subscriptions;
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
