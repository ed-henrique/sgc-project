const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Usuario",
    {
      nome_completo: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      whatsapp: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "usuario",
    }
  );
  return User;
};

export default user;
