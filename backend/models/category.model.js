
const category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Categoria",
    {
      nome_categoria: {
        type: DataTypes.STRING,
      },
      qtd_cursos: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "categoria",
    }
  );
  return Category;
};

export default category;
