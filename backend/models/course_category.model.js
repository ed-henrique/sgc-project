import { Course } from "./course.model.js";
import { Category } from "./category.model.js";

const courseCategory = (sequelize) => {
  const CourseCategory = sequelize.define(
    "Categoria_Curso",
    {},
    {
      tableName: "categoria_curso",
    }
  );

  CourseCategory.hasOne(Course);
  Course.belongsTo(CourseCategory);
  CourseCategory.hasMany(Category);
  Category.belongsToMany(CourseCategory);

  return CourseCategory;
};

export default courseCategory;
