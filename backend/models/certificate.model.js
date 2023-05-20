const certificate = (sequelize, DataTypes) => {
  const Certificate = sequelize.define(
    "Certificado",
    {
      nome_curso: {
        type: DataTypes.STRING,
      },
      carga_horaria: {
        type: DataTypes.INTEGER,
      },
      nome_aluno: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "certificado",
    }
  );
  return Certificate;
};

export default certificate;
