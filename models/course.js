'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category);
      Course.belongsToMany(models.User, { through: models.Certificate });
      Course.belongsToMany(models.User, { through: models.Subscription });
    }
  }
  Course.init({
    image: DataTypes.BLOB("long"),
    imageMimeType: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    workload: DataTypes.INTEGER,
    start_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};