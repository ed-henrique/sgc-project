import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";
import Course from "./course.model.js";
import User from "./user.model.js";

const course = Course(sequelize, DataTypes);
const user = User(sequelize, DataTypes);

const subscription = (sequelize) => {
  const Subscription = sequelize.define(
    "Inscricao",
    {},
    {
      tableName: "inscricao",
    }
  );

  user.belongsToMany(course, { through: Subscription });
  course.belongsToMany(user, { through: Subscription });

  return Subscription;
};

export default subscription;
