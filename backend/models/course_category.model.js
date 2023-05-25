import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";
import Course from "./course.model.js";
import Category from "./category.model.js";

const course = Course(sequelize, DataTypes);
const category = Category(sequelize, DataTypes);

const courseCategory = (sequelize) => {
  const CourseCategory = sequelize.define(
    "Categoria_Curso",
    {},
    {
      tableName: "categoria_curso",
    }
  );

  course.belongsToMany(category, { through: CourseCategory });
  category.belongsToMany(course, { through: CourseCategory });

  return CourseCategory;
};

export default courseCategory;
