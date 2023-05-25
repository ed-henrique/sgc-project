const course = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      nome_curso: {
        type: DataTypes.STRING,
      },
      carga_horaria: {
        type: DataTypes.INTEGER,
      },
      qtd_inscritos: {
        type: DataTypes.STRING,
      },
      data_inicio: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "course",
    }
  );
  return Course;
};

export default course;
